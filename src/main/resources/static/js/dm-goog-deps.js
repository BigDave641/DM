// This file was autogenerated by closure-library/closure/bin/build/depswriter.py.
// Please do not edit.
goog.addDependency('../../../dm/ClientApp.js', ['dm.ClientApp'], ['dm.data.DataModel', 'dm.data.Databroker', 'dm.data.Quad', 'dm.data.Term', 'dm.events.LinkingModeEntered', 'dm.events.LinkingModeExited', 'dm.util.ReferenceUtil', 'dm.util.StyleUtil', 'dm.viewer.CanvasViewer', 'dm.viewer.ProjectViewer', 'dm.viewer.SearchViewer', 'dm.viewer.TextEditor', 'dm.viewer.ViewerGrid', 'dm.widgets.Bezel', 'goog.Uri', 'goog.dom', 'goog.events', 'goog.events.EventTarget', 'goog.fx.dom.FadeIn', 'goog.fx.dom.FadeOut', 'goog.ui.CustomButton', 'goog.ui.Dialog', 'goog.ui.KeyboardShortcutHandler', 'goog.ui.Popup'], false);
goog.addDependency('../../../dm/Util.js', ['dm.Util'], [], false);
goog.addDependency('../../../dm/canvas/CanvasToolbar.js', ['dm.canvas.CanvasToolbar'], ['dm.canvas.DragFeatureControl', 'dm.canvas.DrawEllipseControl', 'dm.canvas.DrawLineControl', 'dm.canvas.DrawPolygonControl', 'dm.canvas.DrawRectControl', 'dm.canvas.ImageChoicePicker', 'dm.canvas.PageChooser', 'dm.canvas.PanZoomGesturesControl', 'goog.dom', 'goog.events', 'goog.structs.Map', 'goog.ui.ToggleButton', 'goog.ui.Toolbar', 'goog.ui.ToolbarSeparator', 'goog.ui.editor.ToolbarFactory'], false);
goog.addDependency('../../../dm/canvas/CanvasViewer.js', ['dm.canvas.CanvasViewer'], ['dm.canvas.CanvasToolbar', 'dm.canvas.DragFeatureControl', 'dm.canvas.FabricCanvas', 'dm.canvas.FabricCanvasFactory', 'dm.canvas.FabricCanvasViewport', 'dm.canvas.ZoomSliderControl', 'goog.dom', 'goog.events', 'goog.math.Size'], false);
goog.addDependency('../../../dm/canvas/Control.js', ['dm.canvas.Control'], ['goog.events.Event', 'goog.events.EventTarget'], false);
goog.addDependency('../../../dm/canvas/DragFeatureControl.js', ['dm.canvas.DragFeatureControl'], ['dm.canvas.FeatureControl'], false);
goog.addDependency('../../../dm/canvas/DrawEllipseControl.js', ['dm.canvas.DrawEllipseControl'], ['dm.canvas.DrawFeatureControl'], false);
goog.addDependency('../../../dm/canvas/DrawFeatureControl.js', ['dm.canvas.DrawFeatureControl'], ['dm.canvas.FeatureControl', 'dm.util.svg', 'goog.events.Event'], false);
goog.addDependency('../../../dm/canvas/DrawLineControl.js', ['dm.canvas.DrawLineControl'], ['dm.canvas.DrawFeatureControl', 'goog.array', 'goog.events.KeyCodes'], false);
goog.addDependency('../../../dm/canvas/DrawPolygonControl.js', ['dm.canvas.DrawPolygonControl'], ['dm.canvas.DrawLineControl'], false);
goog.addDependency('../../../dm/canvas/DrawRectControl.js', ['dm.canvas.DrawRectControl'], ['dm.canvas.DrawFeatureControl'], false);
goog.addDependency('../../../dm/canvas/FabricCanvas.js', ['dm.canvas.FabricCanvas'], ['fabric', 'goog.events.EventTarget', 'goog.math.Coordinate', 'goog.math.Size', 'goog.structs.Map', 'goog.structs.Set'], false);
goog.addDependency('../../../dm/canvas/FabricCanvasFactory.js', ['dm.canvas.FabricCanvasFactory'], ['dm.canvas.FabricCanvas', 'goog.array'], false);
goog.addDependency('../../../dm/canvas/FabricCanvasViewport.js', ['dm.canvas.FabricCanvasViewport', 'dm.canvas.FabricCanvasViewportEvent'], ['fabric', 'goog.async.Throttle', 'goog.dom.DomHelper', 'goog.events.Event', 'goog.events.EventTarget', 'goog.object', 'goog.structs.Set'], false);
goog.addDependency('../../../dm/canvas/FeatureControl.js', ['dm.canvas.FeatureControl'], ['dm.canvas.Control'], false);
goog.addDependency('../../../dm/canvas/ImageChoicePicker.js', ['dm.canvas.ImageChoicePicker'], ['goog.structs.Set', 'goog.ui.Button', 'goog.ui.CustomButton'], false);
goog.addDependency('../../../dm/canvas/KeyboardShortcutsControl.js', ['dm.canvas.KeyboardShortcutsControl'], ['dm.canvas.Control', 'goog.events'], false);
goog.addDependency('../../../dm/canvas/PageChooser.js', ['dm.canvas.PageChooser'], ['goog.events.EventTarget'], false);
goog.addDependency('../../../dm/canvas/PanZoomGesturesControl.js', ['dm.canvas.PanZoomGesturesControl'], ['dm.canvas.Control', 'goog.events', 'jquery.event.drag', 'jquery.mousewheel'], false);
goog.addDependency('../../../dm/canvas/ZoomSliderControl.js', ['dm.canvas.ZoomSliderControl'], ['dm.canvas.Control'], false);
goog.addDependency('../../../dm/data/DataModel.js', ['dm.data.DataModel'], ['goog.structs.Map', 'goog.structs.Set'], false);
goog.addDependency('../../../dm/data/Databroker.js', ['dm.data.Databroker'], ['dm.data.BNode', 'dm.data.DataModel', 'dm.data.Graph', 'dm.data.NamespaceManager', 'dm.data.ProjectController', 'dm.data.Quad', 'dm.data.QuadStore', 'dm.data.Resource', 'dm.data.SearchClient', 'dm.data.Term', 'dm.data.TurtleSerializer', 'dm.util.DefaultDict', 'dm.util.DeferredCollection', 'goog.Uri', 'goog.events.Event', 'goog.events.EventTarget', 'goog.object', 'goog.string', 'goog.structs.Map', 'goog.structs.Set', 'n3.parser'], false);
goog.addDependency('../../../dm/data/Graph.js', ['dm.data.Graph'], ['dm.data.Quad', 'dm.data.Triple'], false);
goog.addDependency('../../../dm/data/NamespaceManager.js', ['dm.data.NamespaceManager'], ['goog.string', 'goog.structs.Map'], false);
goog.addDependency('../../../dm/data/ProjectController.js', ['dm.data.ProjectController'], ['goog.History', 'goog.events.EventTarget', 'goog.structs'], false);
goog.addDependency('../../../dm/data/Quad.js', ['dm.data.Quad'], [], false);
goog.addDependency('../../../dm/data/QuadStore.js', ['dm.data.QuadStore'], ['dm.util.DefaultDict', 'goog.structs.Set'], false);
goog.addDependency('../../../dm/data/Resource.js', ['dm.data.Resource'], ['dm.data.Quad', 'dm.data.Term', 'dm.data.TurtleSerializer', 'dm.util.DefaultDict', 'goog.array', 'goog.structs.Set'], false);
goog.addDependency('../../../dm/data/SearchClient.js', ['dm.data.SearchClient'], ['dm.data.Quad', 'dm.data.Term'], false);
goog.addDependency('../../../dm/data/Term.js', ['dm.data.BNode', 'dm.data.DateTimeLiteral', 'dm.data.Literal', 'dm.data.Term', 'dm.data.Uri'], ['goog.string'], false);
goog.addDependency('../../../dm/data/Triple.js', ['dm.data.Triple'], ['dm.data.Quad'], false);
goog.addDependency('../../../dm/data/TurtleSerializer.js', ['dm.data.TurtleSerializer'], ['dm.data.QuadStore'], false);
goog.addDependency('../../../dm/events/LinkingModeEntered.js', ['dm.events.LinkingModeEntered'], ['goog.events.Event'], false);
goog.addDependency('../../../dm/events/LinkingModeExited.js', ['dm.events.LinkingModeExited'], ['goog.events.Event'], false);
goog.addDependency('../../../dm/events/ResourceClick.js', ['dm.events.ResourceClick'], ['goog.events.Event'], false);
goog.addDependency('../../../dm/resource/AnnotationSummary.js', ['dm.resource.AnnotationSummary'], ['dm.Util', 'dm.resource.ResourceCollection'], false);
goog.addDependency('../../../dm/resource/AudioSummary.js', ['dm.resource.AudioSummary'], ['dm.resource.ResourceSummary'], false);
goog.addDependency('../../../dm/resource/CanvasSummary.js', ['dm.resource.CanvasSummary'], ['dm.canvas.FabricCanvasFactory', 'dm.canvas.FabricCanvasViewport', 'dm.resource.ResourceSummary', 'goog.math.Size'], false);
goog.addDependency('../../../dm/resource/ManuscriptSummary.js', ['dm.resource.ManuscriptSummary', 'dm.resource.ManuscriptSummary.PageNumberSummary'], ['dm.resource.ResourceSummary', 'goog.structs.Map'], false);
goog.addDependency('../../../dm/resource/MarkerAnnotationSummary.js', ['dm.resource.MarkerAnnotationSummary'], ['dm.resource.AnnotationSummary'], false);
goog.addDependency('../../../dm/resource/MarkerCollection.js', ['dm.resource.MarkerCollection'], ['dm.resource.ResourceCollection'], false);
goog.addDependency('../../../dm/resource/MarkerSummary.js', ['dm.resource.MarkerSummary'], ['dm.canvas.FabricCanvasFactory', 'dm.canvas.FabricCanvasViewport', 'dm.resource.ResourceSummary', 'goog.math.Size'], false);
goog.addDependency('../../../dm/resource/ResourceCollection.js', ['dm.resource.ResourceCollection'], ['dm.resource.ResourceSummary', 'dm.widgets.TwirlDown', 'goog.dom'], false);
goog.addDependency('../../../dm/resource/ResourceSummary.js', ['dm.resource.ResourceSummary'], ['goog.dom', 'goog.dom.DomHelper', 'goog.events', 'goog.events.EventTarget', 'goog.object'], false);
goog.addDependency('../../../dm/resource/ResourceSummaryFactory.js', ['dm.resource.ResourceSummaryFactory'], ['dm.resource.AudioSummary', 'dm.resource.CanvasSummary', 'dm.resource.ManuscriptSummary', 'dm.resource.MarkerSummary', 'dm.resource.TextHighlightSummary', 'dm.resource.TextSummary'], false);
goog.addDependency('../../../dm/resource/TextHighlightSummary.js', ['dm.resource.TextHighlightSummary'], ['dm.resource.ResourceSummary'], false);
goog.addDependency('../../../dm/resource/TextSummary.js', ['dm.resource.TextSummary'], ['dm.resource.ResourceSummary'], false);
goog.addDependency('../../../dm/util/Array.js', ['dm.Array'], [], false);
goog.addDependency('../../../dm/util/DefaultDict.js', ['dm.util.DefaultDict'], ['goog.structs.Map', 'goog.structs.Set'], false);
goog.addDependency('../../../dm/util/DeferredCollection.js', ['dm.util.DeferredCollection'], [], false);
goog.addDependency('../../../dm/util/DomTraverser.js', ['dm.util.DomTraverser'], ['dm.util.Map', 'dm.util.Set'], false);
goog.addDependency('../../../dm/util/LangUtil.js', ['dm.util.LangUtil'], ['dm.util.ReferenceUtil'], false);
goog.addDependency('../../../dm/util/Map.js', ['dm.util.Map'], ['dm.util.ReferenceUtil'], false);
goog.addDependency('../../../dm/util/ObjectMap.js', ['dm.util.ObjectMap'], ['dm.util.Map'], false);
goog.addDependency('../../../dm/util/OrderedSet.js', ['dm.util.OrderedSet'], ['goog.array', 'goog.structs.Set'], false);
goog.addDependency('../../../dm/util/ReferenceUtil.js', ['dm.util.ReferenceUtil'], [], false);
goog.addDependency('../../../dm/util/Set.js', ['dm.util.Set'], ['dm.util.ReferenceUtil'], false);
goog.addDependency('../../../dm/util/Size.js', ['dm.util.Size'], [], false);
goog.addDependency('../../../dm/util/Stack.js', ['dm.util.Stack'], [], false);
goog.addDependency('../../../dm/util/StyleUtil.js', ['dm.util.StyleUtil'], ['dm.util.ReferenceUtil', 'goog.dom.DomHelper', 'goog.math.Coordinate', 'goog.positioning.ClientPosition'], false);
goog.addDependency('../../../dm/util/Svg.js', ['dm.util.svg'], ['dm.data.NamespaceManager'], false);
goog.addDependency('../../../dm/util/stats.js', ['dm.util.stats'], ['goog.array'], false);
goog.addDependency('../../../dm/viewer/AnnoTitlesList.js', ['dm.viewer.AnnoTitlesList'], ['dm.resource.ResourceSummaryFactory', 'goog.dom.DomHelper', 'goog.structs.Map', 'goog.structs.Set'], false);
goog.addDependency('../../../dm/viewer/CanvasViewer.js', ['dm.viewer.CanvasViewer'], ['dm.canvas.CanvasViewer', 'dm.canvas.FabricCanvasFactory', 'dm.viewer.TextEditor', 'dm.viewer.Viewer'], false);
goog.addDependency('../../../dm/viewer/ProjectViewer.js', ['dm.viewer.ProjectViewer'], ['dm.data.Literal', 'dm.data.ProjectController', 'dm.viewer.ViewerContainer', 'dm.widgets.WorkingResources', 'goog.array', 'goog.dom.DomHelper', 'goog.events', 'goog.object', 'goog.string', 'goog.structs'], false);
goog.addDependency('../../../dm/viewer/ResourceListViewer.js', ['dm.viewer.ResourceListViewer'], ['dm.util.ReferenceUtil', 'dm.util.StyleUtil', 'dm.viewer.Viewer', 'goog.array', 'goog.dom', 'goog.events', 'goog.ui.ToolbarButton'], false);
goog.addDependency('../../../dm/viewer/SearchViewer.js', ['dm.viewer.SearchViewer'], ['dm.widgets.SearchResultItem', 'dm.widgets.WorkingResources', 'goog.dom.DomHelper', 'goog.events', 'goog.structs'], false);
goog.addDependency('../../../dm/viewer/TextEditor.js', ['dm.viewer.TextEditor'], ['dm.Util', 'dm.events.ResourceClick', 'dm.util.ReferenceUtil', 'dm.util.Set', 'dm.util.StyleUtil', 'dm.viewer.TextEditorAnnotate', 'dm.viewer.TextEditorProperties', 'dm.viewer.Viewer', 'dm.widgets.DialogWidget', 'dm.widgets.ForegroundMenuDisplayer', 'dm.widgets.GlassPane', 'dm.widgets.IMenu', 'dm.widgets.MenuItem', 'dm.widgets.MenuUtil', 'dm.widgets.Toolbar', 'goog.asserts', 'goog.cssom.iframe.style', 'goog.dom', 'goog.dom.DomHelper', 'goog.dom.classes', 'goog.editor.Command', 'goog.editor.Field', 'goog.editor.plugins.BasicTextFormatter', 'goog.editor.plugins.EnterHandler', 'goog.editor.plugins.HeaderFormatter', 'goog.editor.plugins.LinkBubble', 'goog.editor.plugins.LinkDialogPlugin', 'goog.editor.plugins.ListTabHandler', 'goog.editor.plugins.LoremIpsum', 'goog.editor.plugins.RemoveFormatting', 'goog.editor.plugins.SpacesTabHandler', 'goog.editor.plugins.UndoRedo', 'goog.string', 'goog.ui.ToolbarSeparator', 'goog.ui.editor.DefaultToolbar', 'goog.ui.editor.ToolbarController'], false);
goog.addDependency('../../../dm/viewer/TextEditorAnnotate.js', ['dm.viewer.TextEditorAnnotate'], ['dm.events.ResourceClick', 'dm.util.DomTraverser', 'dm.viewer.ResourceListViewer', 'dm.widgets.ForegroundMenuDisplayer', 'goog.dom', 'goog.dom.TagName', 'goog.editor.Plugin', 'goog.userAgent.product'], false);
goog.addDependency('../../../dm/viewer/TextEditorProperties.js', ['dm.viewer.TextEditorProperties'], ['goog.dom', 'goog.ui.ComboBox', 'goog.ui.ComboBoxItem', 'goog.ui.CustomButton'], false);
goog.addDependency('../../../dm/viewer/Viewer.js', ['dm.viewer.Viewer'], ['dm.Util', 'dm.util.StyleUtil', 'dm.viewer.AnnoTitlesList', 'dm.widgets.Toolbar', 'goog.events', 'goog.events.EventTarget', 'goog.events.EventType', 'goog.events.KeyCodes', 'goog.math.Coordinate', 'goog.math.Size', 'goog.ui.Popup'], false);
goog.addDependency('../../../dm/viewer/ViewerContainer.js', ['dm.viewer.ViewerContainer'], ['goog.dom.DomHelper', 'goog.events.EventTarget'], false);
goog.addDependency('../../../dm/viewer/ViewerGrid.js', ['dm.viewer.ViewerGrid'], ['goog.array', 'goog.dom', 'goog.dom.DomHelper', 'goog.events', 'goog.events.EventTarget', 'goog.fx.DragListGroup', 'goog.math.Size', 'goog.structs.Map', 'goog.structs.Set'], false);
goog.addDependency('../../../dm/widgets/Bezel.js', ['dm.widgets.Bezel'], ['dm.util.StyleUtil', 'goog.dom', 'goog.math.Coordinate', 'goog.math.Size'], false);
goog.addDependency('../../../dm/widgets/DialogWidget.js', ['dm.widgets.DialogWidget'], ['dm.util.ReferenceUtil', 'dm.util.StyleUtil', 'dm.widgets.MenuButtonSet', 'dm.widgets.MenuUtil', 'goog.dom', 'goog.ui.Dialog', 'goog.ui.Dialog.ButtonSet'], false);
goog.addDependency('../../../dm/widgets/ForegroundMenuDisplayer.js', ['dm.widgets.ForegroundMenuDisplayer'], ['dm.widgets.GlassPane', 'goog.events.EventType'], false);
goog.addDependency('../../../dm/widgets/GlassPane.js', ['dm.widgets.GlassPane'], ['dm.util.LangUtil', 'dm.util.ReferenceUtil', 'goog.events'], false);
goog.addDependency('../../../dm/widgets/IMenu.js', ['dm.widgets.IMenu'], ['dm.widgets.MenuActionEvent'], false);
goog.addDependency('../../../dm/widgets/MenuActionEvent.js', ['dm.widgets.MenuActionEvent'], [], false);
goog.addDependency('../../../dm/widgets/MenuButtonSet.js', ['dm.widgets.MenuButtonSet'], ['dm.util.ReferenceUtil', 'dm.widgets.MenuActionEvent', 'dm.widgets.MenuUtil', 'goog.asserts', 'goog.dom', 'goog.ui.Dialog.ButtonSet'], false);
goog.addDependency('../../../dm/widgets/MenuItem.js', ['dm.widgets.MenuItem'], ['dm.util.ReferenceUtil'], false);
goog.addDependency('../../../dm/widgets/MenuUtil.js', ['dm.widgets.MenuUtil'], ['dm.util.LangUtil', 'dm.util.ReferenceUtil', 'dm.widgets.MenuItem', 'goog.asserts'], false);
goog.addDependency('../../../dm/widgets/SearchResultItem.js', ['dm.widgets.SearchResultItem'], ['dm.widgets.WorkingResourcesItem'], false);
goog.addDependency('../../../dm/widgets/Toolbar.js', ['dm.widgets.Toolbar'], ['dm.util.Map', 'dm.util.ReferenceUtil', 'dm.widgets.IMenu', 'goog.events', 'goog.ui.Component.EventType', 'goog.ui.editor.DefaultToolbar', 'goog.ui.editor.ToolbarFactory'], false);
goog.addDependency('../../../dm/widgets/TwirlDown.js', ['dm.widgets.TwirlDown'], ['goog.ui.AnimatedZippy'], false);
goog.addDependency('../../../dm/widgets/VerticalToolbar.js', ['dm.widgets.VerticalToolbar'], ['dm.util.ReferenceUtil', 'dm.util.StyleUtil', 'dm.widgets.IMenu', 'goog.dom', 'goog.events', 'goog.ui.Component.EventType', 'goog.ui.Container', 'goog.ui.editor.DefaultToolbar', 'goog.ui.editor.ToolbarFactory'], false);
goog.addDependency('../../../dm/widgets/WorkingResources.js', ['dm.widgets.WorkingResources'], ['dm.util.StyleUtil', 'dm.widgets.WorkingResourcesItem', 'dm.widgets.WorkingResourcesText', 'goog.dom.DomHelper', 'goog.dom.classes', 'goog.events.Event', 'goog.events.EventTarget', 'goog.math.Coordinate', 'goog.math.Size', 'goog.positioning.ClientPosition', 'goog.structs.Map', 'goog.style', 'goog.ui.Popup'], false);
goog.addDependency('../../../dm/widgets/WorkingResourcesItem.js', ['dm.widgets.WorkingResourcesItem'], ['goog.dom.DomHelper', 'goog.events', 'goog.events.ActionEvent', 'goog.events.EventTarget'], false);
goog.addDependency('../../../dm/widgets/WorkingResourcesText.js', ['dm.widgets.WorkingResourcesText'], ['dm.widgets.WorkingResourcesItem'], false);
goog.addDependency('../../../fabric/fabric.js', ['fabric'], [], false);
goog.addDependency('../../../jquery/jquery-1.10.1.js', ['jquery.jQuery'], ['jquery.migrate'], false);
goog.addDependency('../../../jquery/jquery-migrate-1.2.1.js', ['jquery.migrate'], [], false);
goog.addDependency('../../../jquery/jquery-ui-1.10.3.custom.js', ['jquery.jQueryUI'], [], false);
goog.addDependency('../../../jquery/jquery.animate-enhanced.js', ['jquery.animate_enhanced'], [], false);
goog.addDependency('../../../jquery/jquery.event.drag-2.2.js', ['jquery.event.drag'], [], false);
goog.addDependency('../../../jquery/jquery.hammer.js', ['jquery.hammer'], [], false);
goog.addDependency('../../../jquery/jquery.hoverIntent.minified.js', ['jquery.hoverIntent'], [], false);
goog.addDependency('../../../jquery/jquery.jplayer.min.js', ['jquery.jPlayer'], [], false);
goog.addDependency('../../../jquery/jquery.mousewheel.js', ['jquery.mousewheel'], [], false);
goog.addDependency('../../../jquery/jquery.rdfquery.core-1.0.js', ['jquery.rdfquery'], [], false);
goog.addDependency('../../../jquery/plugins/jQuery.popout.js', ['jquery.popout'], ['jquery.hoverIntent'], false);
goog.addDependency('../../../n3/n3lexer.js', ['n3.lexer'], [], false);
goog.addDependency('../../../n3/n3parser.js', ['n3.parser'], ['n3.lexer', 'n3.store'], false);
goog.addDependency('../../../n3/n3store.js', ['n3.store'], [], false);
