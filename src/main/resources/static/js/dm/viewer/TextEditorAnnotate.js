goog.provide("dm.viewer.TextEditorAnnotate");

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.editor.Plugin');
goog.require('dm.viewer.ResourceListViewer');
goog.require('dm.events.ResourceClick');
goog.require('goog.userAgent.product');

goog.require("dm.widgets.ForegroundMenuDisplayer");
goog.require("dm.util.DomTraverser");//lolhack!

/**
 * Plugin to insert annotation highlights into an editable field.
 * @constructor
 * @extends {goog.editor.Plugin}
 */
dm.viewer.TextEditorAnnotate = function(viewer) {
	this.viewer = viewer;
    goog.editor.Plugin.call(this);

    this.clientApp = this.viewer.clientApp;
    this.databroker = this.clientApp.getDatabroker();

	this.lastStartNode = null;
	this.lastEndNode = null;//debug hack
};
goog.inherits(dm.viewer.TextEditorAnnotate, goog.editor.Plugin);


// Commands implemented by this plugin.
dm.viewer.TextEditorAnnotate.COMMAND = {
  ADD_ANNOTATION: 'addAnnotation'
};

// CONSTANTS
dm.viewer.TextEditorAnnotate.OA_EXACT_URI = 'http://www.w3.org/ns/oa#exact';
dm.viewer.TextEditorAnnotate.OA_TEXTQUOTESELECTOR_TYPE = 'http://www.w3.org/ns/oa#TextQuoteSelector';
dm.viewer.TextEditorAnnotate.ANNOTATION_CLASS = 'atb-editor-textannotation';
dm.viewer.TextEditorAnnotate.ANNOTATION_CLASS_SELECTED = 'atb-editor-textannotation-selected';
dm.viewer.TextEditorAnnotate.ANNOTATION_CLASS_HOVER = 'atb-editor-textannotation-hover';


/** @inheritDoc */
dm.viewer.TextEditorAnnotate.prototype.getTrogClassId = function() {
    return 'Annotation';
};

/** @inheritDoc */
dm.viewer.TextEditorAnnotate.prototype.isSupportedCommand = function(command) {
   return command == dm.viewer.TextEditorAnnotate.COMMAND.ADD_ANNOTATION;
};

dm.viewer.TextEditorAnnotate.prototype.execCommand = function (command) {

   var domHelper = this.fieldObject.getEditableDomHelper();
   var selectedAnnotation = domHelper.getElementByClass(dm.viewer.TextEditorAnnotate.ANNOTATION_CLASS_SELECTED);

   // if we have one selected assume we need to delete it, otherwise we're adding new.
   this.getFieldObject().dispatchBeforeChange();
   var fireEvents = true;
   if (selectedAnnotation) {
      this.deleteAnnotation(selectedAnnotation);
   }
	else {
	   fireEvents = this.addAnnotation(this.fieldObject.getRange());
   }

   if (fireEvents ) {
      this.getFieldObject().dispatchChange();
      this.getFieldObject().dispatchSelectionChangeEvent();
   }

   return true;
};

dm.viewer.TextEditorAnnotate.prototype.createAnnoSpan = function(uri) {
	var span = $("<span></span>");
   $(span).addClass(dm.viewer.TextEditorAnnotate.ANNOTATION_CLASS);
   $(span).attr('about', uri);
   $(span).attr('property', dm.viewer.TextEditorAnnotate.OA_EXACT_URI);
   $(span).attr('typeof', dm.viewer.TextEditorAnnotate.OA_TEXTQUOTESELECTOR_TYPE);
   this.addListeners(span[0]);
   return span[0];
};

dm.viewer.TextEditorAnnotate.prototype.getTextResource = function() {
    return this.databroker.getResource(this.viewer.uri);
};

/**
 * Create the RDF for a new highlight
 */
dm.viewer.TextEditorAnnotate.prototype.createHighlightResource = function(highlightUri, range) {
   var highlight = this.databroker.createResource(highlightUri);
   highlight.addProperty('rdf:type', 'oa:TextQuoteSelector');
   highlight.addProperty('oa:exact', dm.data.Term.wrapLiteral(range.getText()));

   var specificResource = this.databroker.createResource(this.databroker.createUuid());
   specificResource.addProperty('rdf:type', 'oa:SpecificResource');
   specificResource.addProperty('oa:hasSource', this.getTextResource().bracketedUri);
   specificResource.addProperty('oa:hasSelector', highlight.bracketedUri);

   return highlight;
};


dm.viewer.TextEditorAnnotate.prototype.deleteHighlightResource = function(highlightUri) {
   var highlight = this.databroker.getResource(highlightUri);
   var specificResource = this.databroker.getResource(this.databroker.dataModel.findSelectorSpecificResourceUri(highlightUri));

   var deleted = [];
   goog.structs.forEach(specificResource.getReferencingResources('oa:hasTarget'), function(anno) {
      var body = anno.getOneProperty('oa:hasBody');
      if (body != null) {
         var annoUri = anno.getUri();
         annoUri = annoUri.substring(1, annoUri.length - 1);
         deleted.push(annoUri);
      }
      anno.deleteProperty('oa:hasTarget', specificResource);
   }, this);

   goog.structs.forEach(specificResource.getReferencingResources('oa:hasTarget'), function(anno) {
      anno.deleteProperty('oa:hasTarget', specificResource);
   }, this);
   highlight.delete();
   specificResource.delete();
   this.viewer.saveContents();

   if (deleted.length > 0) {
      this.databroker.annotsDeleted(deleted);
   }
};


dm.viewer.TextEditorAnnotate.prototype.updateAllHighlightResources = function() {
    var elements = this.getAllAnnotationTags();
    goog.structs.forEach(elements, function(element) {
    	var highlightUri = dm.viewer.TextEditorAnnotate.getHighlightSelectorUri(element);
    	var highlightResource = this.databroker.getResource(highlightUri);

    	var text = jQuery(element).text();

    	if (highlightResource.getOneProperty('oa:exact') != text) {
    		highlightResource.setProperty('oa:exact', dm.data.Term.wrapLiteral(text));
    	}
    }, this);
};


/**
 * Add annotation wrapper to a selection
 * @param {string} range The range object for the selection
 */
dm.viewer.TextEditorAnnotate.prototype.addAnnotation = function(range) {
	if (range == null || range.getText() == '') {
		return false;
	}

	var htmlFrag = range.getHtmlFragment().replace(/\s+/g, ' ');
	var validHtml = normalizeFrag(range.getValidHtml());

	if ( htmlFrag != validHtml ) {
	   $("#addAnnotation").removeClass("goog-toolbar-button-checked");
		alert("You cannot make annotations across multiple styles of text.\n\nPlease normalize or remove styling and try again.");
		return false;
	}

	// find the caret position of the end of the current selection
	// within the iframe editor body
	var editorIframe = $("#" + this.fieldObject.id);
   var iframeContent = editorIframe.contents();
   var editorBody = $(iframeContent).find(".editable");
   var browserRange = range.getBrowserRangeObject();
   var preCaretRange = browserRange.cloneRange();
   preCaretRange.selectNodeContents( editorBody[0] );
   preCaretRange.setEnd(browserRange.endContainer, browserRange.endOffset);
   var caretOffset = preCaretRange.toString().length;
   var nodeTextLen = range.getEndNode().data.length;
   var atNodeEnd = (browserRange.endOffset==nodeTextLen);

   // Full length of the content
   var fullLen = editorBody.text().length;

   // Add the highlight markup
	var highlightUri = this.databroker.createUuid();
	var highlightResource = this.createHighlightResource(highlightUri, range);
	var span = this.createAnnoSpan(highlightUri);
	range.surroundContents(span);

	// If this is the end of the document, add an extra space so we are not locked out
	// of adding more non-highlighted content
   if ( fullLen == caretOffset || atNodeEnd ) {
      $(span).after("&nbsp;");
   }

	return true;
};

function normalizeFrag (frag) {
   clean = frag.replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
   clean = clean.replace(/&nbsp;/g, " ");
   return clean.replace(/\s+/g, ' ');
}

/**
 * Delete an annotation
 * @param {node} annotation The annotation to delete
 */
dm.viewer.TextEditorAnnotate.prototype.deleteAnnotation = function(element) {
	if (jQuery(element).children().length > 0) {
		jQuery(element).unwrap();
	}
	else {
		jQuery(element).replaceWith(jQuery(element).text());
	}

    var uri = dm.viewer.TextEditorAnnotate.getHighlightSelectorUri(element);
    this.deleteHighlightResource(uri);
};

/**
 * Add listeners to an annotation object.
 */
dm.viewer.TextEditorAnnotate.prototype.addListeners = function(object) {
	if (!this.isHighlightElement(object)) {
		console.error('attempting to add highlight event listeners to an element which is not a highlight', object);
		return;
	}

	var selector = this.getElementSelectorResource(object);
	var specificResourceUri = this.databroker.dataModel.findSelectorSpecificResourceUri(selector);

	var self = this;

	// Check for click listeners so that they aren't fired multiple times
	if(!goog.events.hasListener(object, goog.events.EventType.CLICK)) {
		goog.events.listen(object, goog.events.EventType.CLICK, function(mouseEvent) {
			mouseEvent.stopPropagation();
         this.selectAnnotationSpan(object, mouseEvent);
			return this.handleHighlightClick(object, mouseEvent);
		}, false, this);
	}

    if (!goog.events.hasListener(object, goog.events.EventType.MOUSEOVER)) {
        goog.events.listen(object, goog.events.EventType.MOUSEOVER, function( mouseEvent ) {
            this.hoverAnnotationSpan(object);
            return false;
        }, false, this);
    }

    if (!goog.events.hasListener(object, goog.events.EventType.MOUSEOUT)) {
        goog.events.listen(object, goog.events.EventType.MOUSEOUT, function( mouseEvent ) {
			return this.unhoverAnnotationSpan(object);
        }, false, this);
    }

    var createButtonGenerator = dm.widgets.MenuUtil.createDefaultDomGenerator;

    if (this.viewer.isEditable()) {
		var menuButtons = [
			new dm.widgets.MenuItem(
				"newTextAnno",
				createButtonGenerator("atb-radialmenu-button icon-pencil"),
				function(actionEvent) {
		            self.createNewAnnoBody(object);

		            if (self.annoTitlesList) {
		                self.annoTitlesList.loadForResource(specificResourceUri);
		            }
		        },
	            'Make annotation for this highlight'
			),

			new dm.widgets.MenuItem(
				"createLink",
				createButtonGenerator("atb-radialmenu-button atb-radialmenu-button-create-link"),
				function(actionEvent) {
		            self.linkAnnotation(object);

		            if (self.annoTitlesList) {
		                self.annoTitlesList.loadForResource(specificResourceUri);
		            }
				},
	            'Make a link to this highlight'
			),
			new dm.widgets.MenuItem(
				'delete_highlight_button',
				createButtonGenerator('atb-radialmenu-button icon-remove'),
				function(actionEvent) {
          var resp = confirm("Are you sure you wish to delete this highlight and its associate links?");
          if (resp) {
  					self.viewer.hideHoverMenu();
  					self.deleteAnnotation(object);
          }
				},
	            'Delete this highlight'
			)
		];
	    menuButtons.reverse();
    }
    else {
    	var menuButtons = [];
    }

    this.viewer.addHoverMenuListenersToElement(object, menuButtons, specificResourceUri);

	return true;
};

/**
 * Gets the command value.
 * @param {string} command The command value to get.
 * @return {string|boolean|null} The current value of the command in the given
 *     selection.
 */
dm.viewer.TextEditorAnnotate.prototype.queryCommandValue = function(command) {
    var isSelection = this.selectionIsAnnotation();
    var cnt = this.viewer.toolbarController.getToolbar().getChildCount();
    if (isSelection) {
       for (var i=1;i<cnt;i++) {
          this.viewer.toolbarController.getToolbar().getChildAt(i).setEnabled(false);
       }
    } else {
       for (var i=1;i<cnt;i++) {
          this.viewer.toolbarController.getToolbar().getChildAt(i).setEnabled(true);
       }
    }
};

dm.viewer.TextEditorAnnotate.prototype.addListenersToAllHighlights = function () {
    var annotations = this.getAllAnnotationTags();

    for(var i=0, len=annotations.length; i < len; i++) {
        var highlightTag = annotations[i];

    	this.addListeners(highlightTag);
    }
};

/**
 * getAnnotationId()
 * gets ID of existing annotation
 * @param annotation is the annontation to look at
 * @return annotationId, 1 or higher
 **/
dm.viewer.TextEditorAnnotate.getHighlightSelectorUri = function (element) {
    return jQuery(element).attr('about');
};

dm.viewer.TextEditorAnnotate.prototype.getElementSelectorResource = function(element) {
    return this.databroker.getResource(dm.viewer.TextEditorAnnotate.getHighlightSelectorUri(element));
};

dm.viewer.TextEditorAnnotate.prototype.isHighlightElement = function(element) {
    return jQuery(element).hasClass(dm.viewer.TextEditorAnnotate.ANNOTATION_CLASS) && dm.viewer.TextEditorAnnotate.getHighlightSelectorUri(element) != null;
};

dm.viewer.TextEditorAnnotate.prototype.getAllAnnotationTags = function () {
	var annotation_class = dm.viewer.TextEditorAnnotate.ANNOTATION_CLASS;

	if (this.viewer.isEditable()) {
		var domHelper = this.fieldObject.getEditableDomHelper();
		var spans = domHelper.getElementsByClass(annotation_class);
	}
	else {
		var spans = jQuery('#' + this.viewer.useID + ' .' + annotation_class).toArray();
	}

	var highlights = [];

	for (var i=0, len=spans.length; i<len; i++) {
		var span = spans[i];
		if (this.isHighlightElement(span)) {
			highlights.push(span);
		}
	}

	return highlights;
};

dm.viewer.TextEditorAnnotate.prototype.getHighlightElementByUri = function (uri) {
	if (this.viewer.isEditable()) {
		var domHelper = this.viewer.field.getEditableDomHelper();
		var editableDocument = domHelper.getDocument();

		return jQuery('.' + dm.viewer.TextEditorAnnotate.ANNOTATION_CLASS + '[about=\'' + uri + '\']', editableDocument).get(0);
	}
	else {
		return jQuery('#' + this.viewer.useID + ' .' + dm.viewer.TextEditorAnnotate.ANNOTATION_CLASS + '[about=\'' + uri + '\']').get(0);
	}
};

/**
 * selectionIsAnnotation(opt_textRange)
 * returns whether the selection or specified text range is surrounded by a span with the class
 * ANNOTATION_CLASS
 * Note: the function will return true if the selection contains text outside of the annotation span, or
 * if an element other than a span (such as a div) has the appropriate class
 * @param opt_range optionally specifies the goog.dom.AbstractRange to check
 * @return boolean true if the selection is an annotation
 **/
dm.viewer.TextEditorAnnotate.prototype.selectionIsAnnotation = function () {
   var selectionRange = this.fieldObject.getRange();
	var selectedHtml = selectionRange.getPastableHtml();
	return jQuery(selectedHtml).hasClass(dm.viewer.TextEditorAnnotate.ANNOTATION_CLASS);
};


/**
 * selectAnnotationSpan()
 **/
dm.viewer.TextEditorAnnotate.prototype.selectAnnotationSpan = function (tag) {
	this.deselectAllHighlights();
	$(tag).addClass(dm.viewer.TextEditorAnnotate.ANNOTATION_CLASS_SELECTED);
};

dm.viewer.TextEditorAnnotate.prototype.handleHighlightClick = function (tag) {
	var selectorUri = dm.viewer.TextEditorAnnotate.getHighlightSelectorUri(tag);
	var specificResourceUri = this.databroker.dataModel.findSelectorSpecificResourceUri(selectorUri);

    var eventDispatcher = this.viewer.clientApp.getEventDispatcher();
    var event = new dm.events.ResourceClick(specificResourceUri, eventDispatcher, this.viewer);

    eventDispatcher.dispatchEvent(event);
};

/**
 * hoverAnnotationSpan()
 **/
dm.viewer.TextEditorAnnotate.prototype.hoverAnnotationSpan = function(forSpan) {
   $(forSpan).addClass(dm.viewer.TextEditorAnnotate.ANNOTATION_CLASS_HOVER);
};

/**
 * unhoverAnnotationSpan()
 **/
dm.viewer.TextEditorAnnotate.prototype.unhoverAnnotationSpan = function(forSpan) {
    $(forSpan).removeClass(dm.viewer.TextEditorAnnotate.ANNOTATION_CLASS_HOVER);
};

dm.viewer.TextEditorAnnotate.prototype.deselectAllHighlights = function() {
   $(this.getAllAnnotationTags()).removeClass(dm.viewer.TextEditorAnnotate.ANNOTATION_CLASS_SELECTED);
};

dm.viewer.TextEditorAnnotate.prototype.showErrorMessage = function(msg) {
	this.viewer.showErrorMessage(msg);
};

/**
 * Create a new text annotation on this highlight
 */
dm.viewer.TextEditorAnnotate.prototype.createNewAnnoBody = function(spanElem) {
   var highlightUri = dm.viewer.TextEditorAnnotate.getHighlightSelectorUri(spanElem);
   var specificResourceUri = this.databroker.dataModel.findSelectorSpecificResourceUri(highlightUri);

   var databroker = this.databroker;
   var body = databroker.dataModel.createText('New annotation on ' + this.viewer.getTitle());

   var anno = databroker.dataModel.createAnno(body, specificResourceUri);

   var annoBodyEditor = new dm.viewer.TextEditor(this.clientApp);
   this.viewer.openRelatedViewer(body.uri, annoBodyEditor);

   var email = $.trim($("#logged-in-email").text());
   annoBodyEditor.lockStatus(body.uri,true,true, email, null);
   annoBodyEditor.lockResource(body.uri,null,null);

   annoBodyEditor.loadResourceByUri(body.uri);
};

/**
 * Start the process of linking to another highlight
 */
dm.viewer.TextEditorAnnotate.prototype.linkAnnotation = function(spanElem) {
   var highlightUri = dm.viewer.TextEditorAnnotate.getHighlightSelectorUri(spanElem);
   var specificResourceUri = this.databroker.dataModel.findSelectorSpecificResourceUri(highlightUri);
   this.viewer.clientApp.createAnnoLink(specificResourceUri);
   this.selectAnnotationSpan(spanElem);
};
