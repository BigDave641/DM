goog.provide('dm.canvas.FeatureControl');

goog.require('dm.canvas.Control');

/**
 * Base class for CanvasViewport controls which deal with svg features.
 *
 * @author tandres@drew.edu (Tim Andres)
 *
 * @constructor
 * @extends {dm.canvas.Control}
 *
 * @param {dm.canvas.CanvasViewport} viewport The viewport to control.
 * @param {dm.data.Databroker} databroker The databroker from which to request
 * new uris and post new shape data.
 */
dm.canvas.FeatureControl = function(viewport, databroker) {
    dm.canvas.Control.call(this, viewport);

    /** @type {dm.data.Databroker} */
    this.databroker = databroker;

    this.resetFeature();
};
goog.inherits(dm.canvas.FeatureControl, dm.canvas.Control);

dm.canvas.FeatureControl.prototype.resetFeature = function() {
    /**
     * The current feature being drawn.
     * @type {(Raphael.Element|null)}
     */
    this.feature = null;

    /**
     * The uri for the feature being drawn
     * @type {string}
     */
    this.uri = this.databroker.createUuid();
};

dm.canvas.FeatureControl.prototype.updateFeatureCoords = function() {
    this.feature.setCoords();
    if (this.feature._calcDimensions) {
        this.feature._calcDimensions(true);
    }
};

/**
 * This method should be called when the shape of a feature is updated.
 */
dm.canvas.FeatureControl.prototype.updateFeature = function() {
    var event = new goog.events.Event(dm.canvas.DrawFeatureControl.
                                      EVENT_TYPES.updateFeature, this.uri);
    event.feature = this.feature;

    this.updateFeatureCoords();

    this.viewport.requestFrameRender();

    this.dispatchEvent(event);
};

/**
 * If a feature is currently being drawn, it will be returned; otherwise, null
 * will be returned.
 * @return {(Raphael.Element|null)} The in progress drawing element or null if
 * drawing is not in progress.
 */
dm.canvas.FeatureControl.prototype.getInProgressFeature = function() {
    return this.feature;
};

/**
 * Converts page coordinates (such as those from a mouse event) into coordinates
 * on the canvas. (Useful with jQuery events, which calculate pageX and pageY
 * using client coordinates and window scroll values).
 *
 * @see dm.canvas.CanvasViewport.prototype.pageToCanvasCoord
 *
 * @param {(number|Object)} x The page x coordinate or an object with x and y
 * properties.
 * @param {?number} y The page y coordinate.
 * @return {Object} An object with x and y properties.
 */
dm.canvas.FeatureControl.prototype.pageToCanvasCoord = function(x, y) {
    return this.viewport.pageToCanvasCoord(x, y);
};

/**
 * Converts client coordinates (such as those from a mouse event) into
 * coordinates on the canvas.
 *
 * @see dm.Canvas.CanvasViewport.prototype.canvasToPageCoord
 *
 * @param {(number|Object)} x The client x coordinate or an object with x and y
 * properties.
 * @param {?number} y The client y coordinate.
 * @return {Object} An object with x and y properties.
 */
dm.canvas.FeatureControl.prototype.clientToCanvasCoord = function(x, y) {
    return this.viewport.clientToCanvasCoord(x, y);
};

dm.canvas.FeatureControl.prototype.layerToCanvasCoord = function(x, y) {
    return this.viewport.layerToCanvasCoord(x, y);
};

/**
 * Takes a Raphael feature and converts it to a string representation of an svg
 * feature
 *
 * @return {string} The svg representation.
 */
dm.canvas.FeatureControl.prototype.exportFeatureToSvg = function() {
    var canvas = this.viewport.canvas;

    var featureClone = canvas.getCanvasSizedFeatureClone(this.feature);

    var svgString = featureClone.toSVG();
    svgString = svgString.replace(/\"/g, "'");

    return svgString;
};

/**
 * Sends the finished drawn feature data to the databroker as new triples
 */
dm.canvas.FeatureControl.prototype.sendFeatureToDatabroker = function() {

    var svgString = this.exportFeatureToSvg();

    var contentUri = this.viewport.canvas.getFabricObjectUri(this.feature);
    var canvasUri = this.viewport.canvas.getUri();

    var selector = this.databroker.createResource(
        contentUri, 'oa:SvgSelector');
    selector.addType('cnt:ContentAsText');
    selector.addProperty('cnt:chars', '"' + svgString + '"');
    selector.addProperty('cnt:characterEncoding', '"UTF-8"');

    var specificResource = this.databroker.createResource(
        this.databroker.createUuid(), 'oa:SpecificResource');
    specificResource.addProperty('oa:hasSource', '<' + canvasUri + '>');
    specificResource.addProperty('oa:hasSelector', selector.bracketedUri);

    this.resetFeature();

    // Sync data with server after each anno is added
    this.databroker.sync();
};

/**
 * Returns the top left coordinates of the bounding box for a feature
 *
 * @return {Object} The x and y coordinates of the feature's bounding box.
 */
dm.canvas.FeatureControl.prototype.getFeatureCoordinates = function() {
    var feature = this.feature;

    return this.viewport.canvas.getFeatureCoords(feature);
};

/**
 * Effectively sets the x an y coordinates of the feature's bounding box using
 * transforms.
 *
 * @param {number} x The new x coordinate.
 * @param {number} y The new Y coordinate.
 */
dm.canvas.FeatureControl.prototype.setFeatureCoordinates = function(x, y) {
    var feature = this.feature;

    this.viewport.canvas.setFeatureCoords(feature, x, y);
};
