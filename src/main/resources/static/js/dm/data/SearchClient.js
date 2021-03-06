goog.provide('dm.data.SearchClient');

goog.require('dm.data.Quad');
goog.require('dm.data.Term');

dm.data.SearchClient = function(databroker) {
    this.databroker = databroker;
};

/**
 * Main search query method. Takes a query string and a function to call back with results.
 * @param {string} query The query string.
 * @param {Function(array, string, string)} callback A callback function which takes a list of results, an optional spelling suggestion, and the original query as parameters.
 * @param {Function?} opt_errorCallback A function to call in case of a network error.
 */
dm.data.SearchClient.prototype.query = function(query, callback, opt_errorCallback) {
    var projectUri = this.databroker.projectController.currentProject.uri;
    jQuery.ajax({
        'url': this.databroker.searchUrl(projectUri, query),
        'type': 'GET',
        'success': function(data, textStatus, jqXHR) {
            for (var i=0, len=data.results.length; i<len; i++) {
                var result = data.results[i];
                this.buildRdfForResult(result);
            }
            callback(data['results'], data['spelling_suggestion'], query);
        }.bind(this),
        'error': function(jqXHR, textStatus, errorThrown) {
            if (goog.isFunction(opt_errorCallback)) {
                opt_errorCallback(textStatus);
            }
        }
    });
};

dm.data.SearchClient.prototype.buildRdfForResult = function(result) {
    var ns = this.databroker.namespaces;

    var wrappedUri = dm.data.Term.wrapUri(result.uri);
    var projectUri = this.databroker.projectController.currentProject.bracketedUri;

    var rdfType = result.image
            ? ns.expand("oa", "Canvas")
            : ns.expand('dctypes', 'Text');

    this.databroker.quadStore.addQuads([
        new dm.data.Quad(wrappedUri, ns.expand('rdf', 'type'), rdfType, projectUri),
        new dm.data.Quad(wrappedUri, ns.expand('dc', 'title'), dm.data.Literal(result.title).n3(), projectUri),
        new dm.data.Quad(wrappedUri, ns.expand('ore', 'isDescribedBy'), dm.data.Term.wrapUri(result.url))
    ]);
};

dm.data.SearchClient.prototype.autocomplete = function(query, callback) {
    var projectUri = this.databroker.projectController.currentProject.uri;
    jQuery.ajax({
        'url': this.databroker.searchAutoCompleteUrl(projectUri, query),
        'type': 'GET',
        'success': function(data, textStatus, jqXHR) {
            callback(data);
        }.bind(this)
    });
};
