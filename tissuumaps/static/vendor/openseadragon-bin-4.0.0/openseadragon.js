//! openseadragon 4.0.0
//! Built on 2022-12-16
//! Git commit: v4.0.0-0-8e6196a
//! http://openseadragon.github.io
//! License: http://openseadragon.github.io/license/

/*
 * OpenSeadragon
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * Portions of this source file taken from jQuery:
 *
 * Copyright 2011 John Resig
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * Portions of this source file taken from mattsnider.com:
 *
 * Copyright (c) 2006-2022 Matt Snider
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
 * OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
 * THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


/**
 * @namespace OpenSeadragon
 * @version openseadragon 4.0.0
 * @classdesc The root namespace for OpenSeadragon.  All utility methods
 * and classes are defined on or below this namespace.
 *
 */


// Typedefs

 /**
  * All required and optional settings for instantiating a new instance of an OpenSeadragon image viewer.
  *
  * @typedef {Object} Options
  * @memberof OpenSeadragon
  *
  * @property {String} id
  *     Id of the element to append the viewer's container element to. If not provided, the 'element' property must be provided.
  *     If both the element and id properties are specified, the viewer is appended to the element provided in the element property.
  *
  * @property {Element} element
  *     The element to append the viewer's container element to. If not provided, the 'id' property must be provided.
  *     If both the element and id properties are specified, the viewer is appended to the element provided in the element property.
  *
  * @property {Array|String|Function|Object} [tileSources=null]
  *     Tile source(s) to open initially. This is a complex parameter; see
  *     {@link OpenSeadragon.Viewer#open} for details.
  *
  * @property {Number} [tabIndex=0]
  *     Tabbing order index to assign to the viewer element. Positive values are selected in increasing order. When tabIndex is 0
  *     source order is used. A negative value omits the viewer from the tabbing order.
  *
  * @property {Array} overlays Array of objects defining permanent overlays of
  *     the viewer. The overlays added via this option and later removed with
  *     {@link OpenSeadragon.Viewer#removeOverlay} will be added back when a new
  *     image is opened.
  *     To add overlays which can be definitively removed, one must use
  *     {@link OpenSeadragon.Viewer#addOverlay}
  *     If displaying a sequence of images, the overlays can be associated
  *     with a specific page by passing the overlays array to the page's
  *     tile source configuration.
  *     Expected properties:
  *     * x, y, (or px, py for pixel coordinates) to define the location.
  *     * width, height in point if using x,y or in pixels if using px,py. If width
  *       and height are specified, the overlay size is adjusted when zooming,
  *       otherwise the size stays the size of the content (or the size defined by CSS).
  *     * className to associate a class to the overlay
  *     * id to set the overlay element. If an element with this id already exists,
  *       it is reused, otherwise it is created. If not specified, a new element is
  *       created.
  *     * placement a string to define the relative position to the viewport.
  *       Only used if no width and height are specified. Default: 'TOP_LEFT'.
  *       See {@link OpenSeadragon.Placement} for possible values.
  *
  * @property {String} [xmlPath=null]
  *     <strong>DEPRECATED</strong>. A relative path to load a DZI file from the server.
  *     Prefer the newer Options.tileSources.
  *
  * @property {String} [prefixUrl='/images/']
  *     Prepends the prefixUrl to navImages paths, which is very useful
  *     since the default paths are rarely useful for production
  *     environments.
  *
  * @property {OpenSeadragon.NavImages} [navImages]
  *     An object with a property for each button or other built-in navigation
  *     control, eg the current 'zoomIn', 'zoomOut', 'home', and 'fullpage'.
  *     Each of those in turn provides an image path for each state of the button
  *     or navigation control, eg 'REST', 'GROUP', 'HOVER', 'PRESS'. Finally the
  *     image paths, by default assume there is a folder on the servers root path
  *     called '/images', eg '/images/zoomin_rest.png'.  If you need to adjust
  *     these paths, prefer setting the option.prefixUrl rather than overriding
  *     every image path directly through this setting.
  *
  * @property {Boolean} [debugMode=false]
  *     TODO: provide an in-screen panel providing event detail feedback.
  *
  * @property {String} [debugGridColor=['#437AB2', '#1B9E77', '#D95F02', '#7570B3', '#E7298A', '#66A61E', '#E6AB02', '#A6761D', '#666666']]
  *     The colors of grids in debug mode. Each tiled image's grid uses a consecutive color.
  *     If there are more tiled images than provided colors, the color vector is recycled.
  *
  * @property {Boolean} [silenceMultiImageWarnings=false]
  *     Silences warnings when calling viewport coordinate functions with multi-image.
  *     Useful when you're overlaying multiple images on top of one another.
  *
  * @property {Number} [blendTime=0]
  *     Specifies the duration of animation as higher or lower level tiles are
  *     replacing the existing tile.
  *
  * @property {Boolean} [alwaysBlend=false]
  *     Forces the tile to always blend.  By default the tiles skip blending
  *     when the blendTime is surpassed and the current animation frame would
  *     not complete the blend.
  *
  * @property {Boolean} [autoHideControls=true]
  *     If the user stops interacting with the viewport, fade the navigation
  *     controls.  Useful for presentation since the controls are by default
  *     floated on top of the image the user is viewing.
  *
  * @property {Boolean} [immediateRender=false]
  *     Render the best closest level first, ignoring the lowering levels which
  *     provide the effect of very blurry to sharp. It is recommended to change
  *     setting to true for mobile devices.
  *
  * @property {Number} [defaultZoomLevel=0]
  *     Zoom level to use when image is first opened or the home button is clicked.
  *     If 0, adjusts to fit viewer.
  *
  * @property {Number} [opacity=1]
  *     Default proportional opacity of the tiled images (1=opaque, 0=hidden)
  *     Hidden images do not draw and only load when preloading is allowed.
  *
  * @property {Boolean} [preload=false]
  *     Default switch for loading hidden images (true loads, false blocks)
  *
  * @property {String} [compositeOperation=null]
  *     Valid values are 'source-over', 'source-atop', 'source-in', 'source-out',
  *     'destination-over', 'destination-atop', 'destination-in', 'destination-out',
  *     'lighter', 'difference', 'copy', 'xor', etc.
  *     For complete list of modes, please @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation/ globalCompositeOperation}
  *
  * @property {Boolean} [imageSmoothingEnabled=true]
  *     Image smoothing for canvas rendering (only if canvas is used). Note: Ignored
  *     by some (especially older) browsers which do not support this canvas property.
  *     This property can be changed in {@link Viewer.Drawer.setImageSmoothingEnabled}.
  *
  * @property {String|CanvasGradient|CanvasPattern|Function} [placeholderFillStyle=null]
  *     Draws a colored rectangle behind the tile if it is not loaded yet.
  *     You can pass a CSS color value like "#FF8800".
  *     When passing a function the tiledImage and canvas context are available as argument which is useful when you draw a gradient or pattern.
  *
  * @property {Object} [subPixelRoundingForTransparency=null]
  *     Determines when subpixel rounding should be applied for tiles when rendering images that support transparency.
  *     This property is a subpixel rounding enum values dictionary [{@link BROWSERS}] --> {@link SUBPIXEL_ROUNDING_OCCURRENCES}.
  *     The key is a {@link BROWSERS} value, and the value is one of {@link SUBPIXEL_ROUNDING_OCCURRENCES},
  *     indicating, for a given browser, when to apply subpixel rounding.
  *     Key '*' is the fallback value for any browser not specified in the dictionary.
  *     This property has a simple mode, and one can set it directly to
  *     {@link SUBPIXEL_ROUNDING_OCCURRENCES.NEVER}, {@link SUBPIXEL_ROUNDING_OCCURRENCES.ONLY_AT_REST} or {@link SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS}
  *     in order to apply this rule for all browser. The values {@link SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS} would be equivalent to { '*', SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS }.
  *     The default is {@link SUBPIXEL_ROUNDING_OCCURRENCES.NEVER} for all browsers, for backward compatibility reason.
  *
  * @property {Number} [degrees=0]
  *     Initial rotation.
  *
  * @property {Boolean} [flipped=false]
  *     Initial flip state.
  *
  * @property {Number} [minZoomLevel=null]
  *
  * @property {Number} [maxZoomLevel=null]
  *
  * @property {Boolean} [homeFillsViewer=false]
  *     Make the 'home' button fill the viewer and clip the image, instead
  *     of fitting the image to the viewer and letterboxing.
  *
  * @property {Boolean} [panHorizontal=true]
  *     Allow horizontal pan.
  *
  * @property {Boolean} [panVertical=true]
  *     Allow vertical pan.
  *
  * @property {Boolean} [constrainDuringPan=false]
  *
  * @property {Boolean} [wrapHorizontal=false]
  *     Set to true to force the image to wrap horizontally within the viewport.
  *     Useful for maps or images representing the surface of a sphere or cylinder.
  *
  * @property {Boolean} [wrapVertical=false]
  *     Set to true to force the image to wrap vertically within the viewport.
  *     Useful for maps or images representing the surface of a sphere or cylinder.
  *
  * @property {Number} [minZoomImageRatio=0.9]
  *     The minimum percentage ( expressed as a number between 0 and 1 ) of
  *     the viewport height or width at which the zoom out will be constrained.
  *     Setting it to 0, for example will allow you to zoom out infinity.
  *
  * @property {Number} [maxZoomPixelRatio=1.1]
  *     The maximum ratio to allow a zoom-in to affect the highest level pixel
  *     ratio. This can be set to Infinity to allow 'infinite' zooming into the
  *     image though it is less effective visually if the HTML5 Canvas is not
  *     available on the viewing device.
  *
  * @property {Number} [smoothTileEdgesMinZoom=1.1]
  *     A zoom percentage ( where 1 is 100% ) of the highest resolution level.
  *     When zoomed in beyond this value alternative compositing will be used to
  *     smooth out the edges between tiles. This will have a performance impact.
  *     Can be set to Infinity to turn it off.
  *     Note: This setting is ignored on iOS devices due to a known bug (See {@link https://github.com/openseadragon/openseadragon/issues/952})
  *
  * @property {Boolean} [iOSDevice=?]
  *     True if running on an iOS device, false otherwise.
  *     Used to disable certain features that behave differently on iOS devices.
  *
  * @property {Boolean} [autoResize=true]
  *     Set to false to prevent polling for viewer size changes. Useful for providing custom resize behavior.
  *
  * @property {Boolean} [preserveImageSizeOnResize=false]
  *     Set to true to have the image size preserved when the viewer is resized. This requires autoResize=true (default).
  *
  * @property {Number} [minScrollDeltaTime=50]
  *     Number of milliseconds between canvas-scroll events. This value helps normalize the rate of canvas-scroll
  *     events between different devices, causing the faster devices to slow down enough to make the zoom control
  *     more manageable.
  *
  * @property {Number} [rotationIncrement=90]
  *     The number of degrees to rotate right or left when the rotate buttons or keyboard shortcuts are activated.
  *
  * @property {Number} [pixelsPerWheelLine=40]
  *     For pixel-resolution scrolling devices, the number of pixels equal to one scroll line.
  *
  * @property {Number} [pixelsPerArrowPress=40]
  *     The number of pixels viewport moves when an arrow key is pressed.
  *
  * @property {Number} [visibilityRatio=0.5]
  *     The percentage ( as a number from 0 to 1 ) of the source image which
  *     must be kept within the viewport.  If the image is dragged beyond that
  *     limit, it will 'bounce' back until the minimum visibility ratio is
  *     achieved.  Setting this to 0 and wrapHorizontal ( or wrapVertical ) to
  *     true will provide the effect of an infinitely scrolling viewport.
  *
  * @property {Object} [viewportMargins={}]
  *     Pushes the "home" region in from the sides by the specified amounts.
  *     Possible subproperties (Numbers, in screen coordinates): left, top, right, bottom.
  *
  * @property {Number} [imageLoaderLimit=0]
  *     The maximum number of image requests to make concurrently. By default
  *     it is set to 0 allowing the browser to make the maximum number of
  *     image requests in parallel as allowed by the browsers policy.
  *
  * @property {Number} [clickTimeThreshold=300]
  *      The number of milliseconds within which a pointer down-up event combination
  *      will be treated as a click gesture.
  *
  * @property {Number} [clickDistThreshold=5]
  *      The maximum distance allowed between a pointer down event and a pointer up event
  *      to be treated as a click gesture.
  *
  * @property {Number} [dblClickTimeThreshold=300]
  *      The number of milliseconds within which two pointer down-up event combinations
  *      will be treated as a double-click gesture.
  *
  * @property {Number} [dblClickDistThreshold=20]
  *      The maximum distance allowed between two pointer click events
  *      to be treated as a double-click gesture.
  *
  * @property {Number} [springStiffness=6.5]
  *
  * @property {Number} [animationTime=1.2]
  *     Specifies the animation duration per each {@link OpenSeadragon.Spring}
  *     which occur when the image is dragged, zoomed or rotated.
  *
  * @property {OpenSeadragon.GestureSettings} [gestureSettingsMouse]
  *     Settings for gestures generated by a mouse pointer device. (See {@link OpenSeadragon.GestureSettings})
  * @property {Boolean} [gestureSettingsMouse.dragToPan=true] - Pan on drag gesture
  * @property {Boolean} [gestureSettingsMouse.scrollToZoom=true] - Zoom on scroll gesture
  * @property {Boolean} [gestureSettingsMouse.clickToZoom=true] - Zoom on click gesture
  * @property {Boolean} [gestureSettingsMouse.dblClickToZoom=false] - Zoom on double-click gesture. Note: If set to true
  *     then clickToZoom should be set to false to prevent multiple zooms.
  * @property {Boolean} [gestureSettingsMouse.dblClickDragToZoom=false] - Zoom on dragging through
  * double-click gesture ( single click and next click to drag).  Note: If set to true
  *     then clickToZoom should be set to false to prevent multiple zooms.
  * @property {Boolean} [gestureSettingsMouse.pinchToZoom=false] - Zoom on pinch gesture
  * @property {Boolean} [gestureSettingsMouse.zoomToRefPoint=true] - If zoomToRefPoint is true, the zoom is centered at the pointer position. Otherwise,
  *     the zoom is centered at the canvas center.
  * @property {Boolean} [gestureSettingsMouse.flickEnabled=false] - Enable flick gesture
  * @property {Number} [gestureSettingsMouse.flickMinSpeed=120] - If flickEnabled is true, the minimum speed to initiate a flick gesture (pixels-per-second)
  * @property {Number} [gestureSettingsMouse.flickMomentum=0.25] - If flickEnabled is true, the momentum factor for the flick gesture
  * @property {Boolean} [gestureSettingsMouse.pinchRotate=false] - If pinchRotate is true, the user will have the ability to rotate the image using their fingers.
  *
  * @property {OpenSeadragon.GestureSettings} [gestureSettingsTouch]
  *     Settings for gestures generated by a touch pointer device. (See {@link OpenSeadragon.GestureSettings})
  * @property {Boolean} [gestureSettingsTouch.dragToPan=true] - Pan on drag gesture
  * @property {Boolean} [gestureSettingsTouch.scrollToZoom=false] - Zoom on scroll gesture
  * @property {Boolean} [gestureSettingsTouch.clickToZoom=false] - Zoom on click gesture
  * @property {Boolean} [gestureSettingsTouch.dblClickToZoom=true] - Zoom on double-click gesture. Note: If set to true
  *     then clickToZoom should be set to false to prevent multiple zooms.
    * @property {Boolean} [gestureSettingsTouch.dblClickDragToZoom=true] - Zoom on dragging through
  * double-click gesture ( single click and next click to drag).  Note: If set to true
  *     then clickToZoom should be set to false to prevent multiple zooms.

  * @property {Boolean} [gestureSettingsTouch.pinchToZoom=true] - Zoom on pinch gesture
  * @property {Boolean} [gestureSettingsTouch.zoomToRefPoint=true] - If zoomToRefPoint is true, the zoom is centered at the pointer position. Otherwise,
  *     the zoom is centered at the canvas center.
  * @property {Boolean} [gestureSettingsTouch.flickEnabled=true] - Enable flick gesture
  * @property {Number} [gestureSettingsTouch.flickMinSpeed=120] - If flickEnabled is true, the minimum speed to initiate a flick gesture (pixels-per-second)
  * @property {Number} [gestureSettingsTouch.flickMomentum=0.25] - If flickEnabled is true, the momentum factor for the flick gesture
  * @property {Boolean} [gestureSettingsTouch.pinchRotate=false] - If pinchRotate is true, the user will have the ability to rotate the image using their fingers.
  *
  * @property {OpenSeadragon.GestureSettings} [gestureSettingsPen]
  *     Settings for gestures generated by a pen pointer device. (See {@link OpenSeadragon.GestureSettings})
  * @property {Boolean} [gestureSettingsPen.dragToPan=true] - Pan on drag gesture
  * @property {Boolean} [gestureSettingsPen.scrollToZoom=false] - Zoom on scroll gesture
  * @property {Boolean} [gestureSettingsPen.clickToZoom=true] - Zoom on click gesture
  * @property {Boolean} [gestureSettingsPen.dblClickToZoom=false] - Zoom on double-click gesture. Note: If set to true
  *     then clickToZoom should be set to false to prevent multiple zooms.
  * @property {Boolean} [gestureSettingsPen.pinchToZoom=false] - Zoom on pinch gesture
  * @property {Boolean} [gestureSettingsPen.zoomToRefPoint=true] - If zoomToRefPoint is true, the zoom is centered at the pointer position. Otherwise,
  *     the zoom is centered at the canvas center.
  * @property {Boolean} [gestureSettingsPen.flickEnabled=false] - Enable flick gesture
  * @property {Number} [gestureSettingsPen.flickMinSpeed=120] - If flickEnabled is true, the minimum speed to initiate a flick gesture (pixels-per-second)
  * @property {Number} [gestureSettingsPen.flickMomentum=0.25] - If flickEnabled is true, the momentum factor for the flick gesture
  * @property {Boolean} [gestureSettingsPen.pinchRotate=false] - If pinchRotate is true, the user will have the ability to rotate the image using their fingers.
  *
  * @property {OpenSeadragon.GestureSettings} [gestureSettingsUnknown]
  *     Settings for gestures generated by unknown pointer devices. (See {@link OpenSeadragon.GestureSettings})
  * @property {Boolean} [gestureSettingsUnknown.dragToPan=true] - Pan on drag gesture
  * @property {Boolean} [gestureSettingsUnknown.scrollToZoom=true] - Zoom on scroll gesture
  * @property {Boolean} [gestureSettingsUnknown.clickToZoom=false] - Zoom on click gesture
  * @property {Boolean} [gestureSettingsUnknown.dblClickToZoom=true] - Zoom on double-click gesture. Note: If set to true
  *     then clickToZoom should be set to false to prevent multiple zooms.
  * @property {Boolean} [gestureSettingsUnknown.dblClickDragToZoom=false] - Zoom on dragging through
  * double-click gesture ( single click and next click to drag).  Note: If set to true
  *     then clickToZoom should be set to false to prevent multiple zooms.
  * @property {Boolean} [gestureSettingsUnknown.pinchToZoom=true] - Zoom on pinch gesture
  * @property {Boolean} [gestureSettingsUnknown.zoomToRefPoint=true] - If zoomToRefPoint is true, the zoom is centered at the pointer position. Otherwise,
  *     the zoom is centered at the canvas center.
  * @property {Boolean} [gestureSettingsUnknown.flickEnabled=true] - Enable flick gesture
  * @property {Number} [gestureSettingsUnknown.flickMinSpeed=120] - If flickEnabled is true, the minimum speed to initiate a flick gesture (pixels-per-second)
  * @property {Number} [gestureSettingsUnknown.flickMomentum=0.25] - If flickEnabled is true, the momentum factor for the flick gesture
  * @property {Boolean} [gestureSettingsUnknown.pinchRotate=false] - If pinchRotate is true, the user will have the ability to rotate the image using their fingers.
  *
  * @property {Number} [zoomPerClick=2.0]
  *     The "zoom distance" per mouse click or touch tap. <em><strong>Note:</strong> Setting this to 1.0 effectively disables the click-to-zoom feature (also see gestureSettings[Mouse|Touch|Pen].clickToZoom/dblClickToZoom).</em>
  *
  * @property {Number} [zoomPerScroll=1.2]
  *     The "zoom distance" per mouse scroll or touch pinch. <em><strong>Note:</strong> Setting this to 1.0 effectively disables the mouse-wheel zoom feature (also see gestureSettings[Mouse|Touch|Pen].scrollToZoom}).</em>
  *
  * @property {Number} [zoomPerDblClickDrag=1.2]
  *     The "zoom distance" per double-click mouse drag. <em><strong>Note:</strong> Setting this to 1.0 effectively disables the double-click-drag-to-Zoom feature (also see gestureSettings[Mouse|Touch|Pen].dblClickDragToZoom).</em>
  *
  * @property {Number} [zoomPerSecond=1.0]
  *     Sets the zoom amount per second when zoomIn/zoomOut buttons are pressed and held.
  *     The value is a factor of the current zoom, so 1.0 (the default) disables zooming when the zoomIn/zoomOut buttons
  *     are held. Higher values will increase the rate of zoom when the zoomIn/zoomOut buttons are held. Note that values
  *     < 1.0 will reverse the operation of the zoomIn/zoomOut buttons (zoomIn button will decrease the zoom, zoomOut will
  *     increase the zoom).
  *
  * @property {Boolean} [showNavigator=false]
  *     Set to true to make the navigator minimap appear.
  *
  * @property {Element} [navigatorElement=null]
  *     The element to hold the navigator minimap.
  *     If an element is specified, the Id option (see navigatorId) is ignored.
  *     If no element nor ID is specified, a div element will be generated accordingly.
  *
  * @property {String} [navigatorId=navigator-GENERATED DATE]
  *     The ID of a div to hold the navigator minimap.
  *     If an ID is specified, the navigatorPosition, navigatorSizeRatio, navigatorMaintainSizeRatio, navigator[Top|Left|Height|Width] and navigatorAutoFade options will be ignored.
  *     If an ID is not specified, a div element will be generated and placed on top of the main image.
  *
  * @property {String} [navigatorPosition='TOP_RIGHT']
  *     Valid values are 'TOP_LEFT', 'TOP_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_RIGHT', or 'ABSOLUTE'.<br>
  *     If 'ABSOLUTE' is specified, then navigator[Top|Left|Height|Width] determines the size and position of the navigator minimap in the viewer, and navigatorSizeRatio and navigatorMaintainSizeRatio are ignored.<br>
  *     For 'TOP_LEFT', 'TOP_RIGHT', 'BOTTOM_LEFT', and 'BOTTOM_RIGHT', the navigatorSizeRatio or navigator[Height|Width] values determine the size of the navigator minimap.
  *
  * @property {Number} [navigatorSizeRatio=0.2]
  *     Ratio of navigator size to viewer size. Ignored if navigator[Height|Width] are specified.
  *
  * @property {Boolean} [navigatorMaintainSizeRatio=false]
  *     If true, the navigator minimap is resized (using navigatorSizeRatio) when the viewer size changes.
  *
  * @property {Number|String} [navigatorTop=null]
  *     Specifies the location of the navigator minimap (see navigatorPosition).
  *
  * @property {Number|String} [navigatorLeft=null]
  *     Specifies the location of the navigator minimap (see navigatorPosition).
  *
  * @property {Number|String} [navigatorHeight=null]
  *     Specifies the size of the navigator minimap (see navigatorPosition).
  *     If specified, navigatorSizeRatio and navigatorMaintainSizeRatio are ignored.
  *
  * @property {Number|String} [navigatorWidth=null]
  *     Specifies the size of the navigator minimap (see navigatorPosition).
  *     If specified, navigatorSizeRatio and navigatorMaintainSizeRatio are ignored.
  *
  * @property {Boolean} [navigatorAutoResize=true]
  *     Set to false to prevent polling for navigator size changes. Useful for providing custom resize behavior.
  *     Setting to false can also improve performance when the navigator is configured to a fixed size.
  *
  * @property {Boolean} [navigatorAutoFade=true]
  *     If the user stops interacting with the viewport, fade the navigator minimap.
  *     Setting to false will make the navigator minimap always visible.
  *
  * @property {Boolean} [navigatorRotate=true]
  *     If true, the navigator will be rotated together with the viewer.
  *
  * @property {String} [navigatorBackground='#000']
  *     Specifies the background color of the navigator minimap
  *
  * @property {Number} [navigatorOpacity=0.8]
  *     Specifies the opacity of the navigator minimap.
  *
  * @property {String} [navigatorBorderColor='#555']
  *     Specifies the border color of the navigator minimap
  *
  * @property {String} [navigatorDisplayRegionColor='#900']
  *     Specifies the border color of the display region rectangle of the navigator minimap
  *
  * @property {Number} [controlsFadeDelay=2000]
  *     The number of milliseconds to wait once the user has stopped interacting
  *     with the interface before beginning to fade the controls. Assumes
  *     showNavigationControl and autoHideControls are both true.
  *
  * @property {Number} [controlsFadeLength=1500]
  *     The number of milliseconds to animate the controls fading out.
  *
  * @property {Number} [maxImageCacheCount=200]
  *     The max number of images we should keep in memory (per drawer).
  *
  * @property {Number} [timeout=30000]
  *     The max number of milliseconds that an image job may take to complete.
  *
  * @property {Boolean} [useCanvas=true]
  *     Set to false to not use an HTML canvas element for image rendering even if canvas is supported.
  *
  * @property {Number} [minPixelRatio=0.5]
  *     The higher the minPixelRatio, the lower the quality of the image that
  *     is considered sufficient to stop rendering a given zoom level.  For
  *     example, if you are targeting mobile devices with less bandwidth you may
  *     try setting this to 1.5 or higher.
  *
  * @property {Boolean} [mouseNavEnabled=true]
  *     Is the user able to interact with the image via mouse or touch. Default
  *     interactions include draging the image in a plane, and zooming in toward
  *     and away from the image.
  *
  * @property {Boolean} [showNavigationControl=true]
  *     Set to false to prevent the appearance of the default navigation controls.<br>
  *     Note that if set to false, the customs buttons set by the options
  *     zoomInButton, zoomOutButton etc, are rendered inactive.
  *
  * @property {OpenSeadragon.ControlAnchor} [navigationControlAnchor=TOP_LEFT]
  *     Placement of the default navigation controls.
  *     To set the placement of the sequence controls, see the
  *     sequenceControlAnchor option.
  *
  * @property {Boolean} [showZoomControl=true]
  *     If true then + and - buttons to zoom in and out are displayed.<br>
  *     Note: {@link OpenSeadragon.Options.showNavigationControl} is overriding
  *     this setting when set to false.
  *
  * @property {Boolean} [showHomeControl=true]
  *     If true then the 'Go home' button is displayed to go back to the original
  *     zoom and pan.<br>
  *     Note: {@link OpenSeadragon.Options.showNavigationControl} is overriding
  *     this setting when set to false.
  *
  * @property {Boolean} [showFullPageControl=true]
  *     If true then the 'Toggle full page' button is displayed to switch
  *     between full page and normal mode.<br>
  *     Note: {@link OpenSeadragon.Options.showNavigationControl} is overriding
  *     this setting when set to false.
  *
  * @property {Boolean} [showRotationControl=false]
  *     If true then the rotate left/right controls will be displayed as part of the
  *     standard controls. This is also subject to the browser support for rotate
  *     (e.g. viewer.drawer.canRotate()).<br>
  *     Note: {@link OpenSeadragon.Options.showNavigationControl} is overriding
  *     this setting when set to false.
  *
  * @property {Boolean} [showFlipControl=false]
  *     If true then the flip controls will be displayed as part of the
  *     standard controls.
  *
  * @property {Boolean} [showSequenceControl=true]
  *     If sequenceMode is true, then provide buttons for navigating forward and
  *     backward through the images.
  *
  * @property {OpenSeadragon.ControlAnchor} [sequenceControlAnchor=TOP_LEFT]
  *     Placement of the default sequence controls.
  *
  * @property {Boolean} [navPrevNextWrap=false]
  *     If true then the 'previous' button will wrap to the last image when
  *     viewing the first image and the 'next' button will wrap to the first
  *     image when viewing the last image.
  *
  * @property {String} zoomInButton
  *     Set the id of the custom 'Zoom in' button to use.
  *     This is useful to have a custom button anywhere in the web page.<br>
  *     To only change the button images, consider using
  *     {@link OpenSeadragon.Options.navImages}
  *
  * @property {String} zoomOutButton
  *     Set the id of the custom 'Zoom out' button to use.
  *     This is useful to have a custom button anywhere in the web page.<br>
  *     To only change the button images, consider using
  *     {@link OpenSeadragon.Options.navImages}
  *
  * @property {String} homeButton
  *     Set the id of the custom 'Go home' button to use.
  *     This is useful to have a custom button anywhere in the web page.<br>
  *     To only change the button images, consider using
  *     {@link OpenSeadragon.Options.navImages}
  *
  * @property {String} fullPageButton
  *     Set the id of the custom 'Toggle full page' button to use.
  *     This is useful to have a custom button anywhere in the web page.<br>
  *     To only change the button images, consider using
  *     {@link OpenSeadragon.Options.navImages}
  *
  * @property {String} rotateLeftButton
  *     Set the id of the custom 'Rotate left' button to use.
  *     This is useful to have a custom button anywhere in the web page.<br>
  *     To only change the button images, consider using
  *     {@link OpenSeadragon.Options.navImages}
  *
  * @property {String} rotateRightButton
  *     Set the id of the custom 'Rotate right' button to use.
  *     This is useful to have a custom button anywhere in the web page.<br>
  *     To only change the button images, consider using
  *     {@link OpenSeadragon.Options.navImages}
  *
  * @property {String} previousButton
  *     Set the id of the custom 'Previous page' button to use.
  *     This is useful to have a custom button anywhere in the web page.<br>
  *     To only change the button images, consider using
  *     {@link OpenSeadragon.Options.navImages}
  *
  * @property {String} nextButton
  *     Set the id of the custom 'Next page' button to use.
  *     This is useful to have a custom button anywhere in the web page.<br>
  *     To only change the button images, consider using
  *     {@link OpenSeadragon.Options.navImages}
  *
  * @property {Boolean} [sequenceMode=false]
  *     Set to true to have the viewer treat your tilesources as a sequence of images to
  *     be opened one at a time rather than all at once.
  *
  * @property {Number} [initialPage=0]
  *     If sequenceMode is true, display this page initially.
  *
  * @property {Boolean} [preserveViewport=false]
  *     If sequenceMode is true, then normally navigating through each image resets the
  *     viewport to 'home' position.  If preserveViewport is set to true, then the viewport
  *     position is preserved when navigating between images in the sequence.
  *
  * @property {Boolean} [preserveOverlays=false]
  *     If sequenceMode is true, then normally navigating through each image
  *     resets the overlays.
  *     If preserveOverlays is set to true, then the overlays added with {@link OpenSeadragon.Viewer#addOverlay}
  *     are preserved when navigating between images in the sequence.
  *     Note: setting preserveOverlays overrides any overlays specified in the global
  *     "overlays" option for the Viewer. It's also not compatible with specifying
  *     per-tileSource overlays via the options, as those overlays will persist
  *     even after the tileSource is closed.
  *
  * @property {Boolean} [showReferenceStrip=false]
  *     If sequenceMode is true, then display a scrolling strip of image thumbnails for
  *     navigating through the images.
  *
  * @property {String} [referenceStripScroll='horizontal']
  *
  * @property {Element} [referenceStripElement=null]
  *
  * @property {Number} [referenceStripHeight=null]
  *
  * @property {Number} [referenceStripWidth=null]
  *
  * @property {String} [referenceStripPosition='BOTTOM_LEFT']
  *
  * @property {Number} [referenceStripSizeRatio=0.2]
  *
  * @property {Boolean} [collectionMode=false]
  *     Set to true to have the viewer arrange your TiledImages in a grid or line.
  *
  * @property {Number} [collectionRows=3]
  *     If collectionMode is true, specifies how many rows the grid should have. Use 1 to make a line.
  *     If collectionLayout is 'vertical', specifies how many columns instead.
  *
  * @property {Number} [collectionColumns=0]
  *     If collectionMode is true, specifies how many columns the grid should have. Use 1 to make a line.
  *     If collectionLayout is 'vertical', specifies how many rows instead. Ignored if collectionRows is not set to a falsy value.
  *
  * @property {String} [collectionLayout='horizontal']
  *     If collectionMode is true, specifies whether to arrange vertically or horizontally.
  *
  * @property {Number} [collectionTileSize=800]
  *     If collectionMode is true, specifies the size, in viewport coordinates, for each TiledImage to fit into.
  *     The TiledImage will be centered within a square of the specified size.
  *
  * @property {Number} [collectionTileMargin=80]
  *     If collectionMode is true, specifies the margin, in viewport coordinates, between each TiledImage.
  *
  * @property {String|Boolean} [crossOriginPolicy=false]
  *     Valid values are 'Anonymous', 'use-credentials', and false. If false, canvas requests will
  *     not use CORS, and the canvas will be tainted.
  *
  * @property {Boolean} [ajaxWithCredentials=false]
  *     Whether to set the withCredentials XHR flag for AJAX requests.
  *     Note that this can be overridden at the {@link OpenSeadragon.TileSource} level.
  *
  * @property {Boolean} [loadTilesWithAjax=false]
  *     Whether to load tile data using AJAX requests.
  *     Note that this can be overridden at the {@link OpenSeadragon.TileSource} level.
  *
  * @property {Object} [ajaxHeaders={}]
  *     A set of headers to include when making AJAX requests for tile sources or tiles.
  *
  * @property {Boolean} [splitHashDataForPost=false]
  *     Allows to treat _first_ hash ('#') symbol as a separator for POST data:
  *     URL to be opened by a {@link OpenSeadragon.TileSource} can thus look like: http://some.url#postdata=here.
  *     The whole URL is used to fetch image info metadata and it is then split to 'http://some.url' and
  *     'postdata=here'; post data is given to the {@link OpenSeadragon.TileSource} of the choice and can be further
  *     used within tile requests (see TileSource methods).
  *     NOTE: {@link OpenSeadragon.TileSource.prototype.configure} return value should contain the post data
  *     if you want to use it later - so that it is given to your constructor later.
  *     NOTE: usually, post data is expected to be ampersand-separated (just like GET parameters), and is NOT USED
  *     to fetch tile image data unless explicitly programmed, or if loadTilesWithAjax=false 4
  *     (but it is still used for the initial image info request).
  *     NOTE: passing POST data from URL by this feature only supports string values, however,
  *     TileSource can send any data using POST as long as the header is correct
  *     (@see OpenSeadragon.TileSource.prototype.getTilePostData)
  */

 /**
  * Settings for gestures generated by a pointer device.
  *
  * @typedef {Object} GestureSettings
  * @memberof OpenSeadragon
  *
  * @property {Boolean} dragToPan
  *     Set to false to disable panning on drag gestures.
  *
  * @property {Boolean} scrollToZoom
  *     Set to false to disable zooming on scroll gestures.
  *
  * @property {Boolean} clickToZoom
  *     Set to false to disable zooming on click gestures.
  *
  * @property {Boolean} dblClickToZoom
  *     Set to false to disable zooming on double-click gestures. Note: If set to true
  *     then clickToZoom should be set to false to prevent multiple zooms.
  *
  * @property {Boolean} pinchToZoom
  *     Set to false to disable zooming on pinch gestures.
  *
  * @property {Boolean} flickEnabled
  *     Set to false to disable the kinetic panning effect (flick) at the end of a drag gesture.
  *
  * @property {Number} flickMinSpeed
  *     If flickEnabled is true, the minimum speed (in pixels-per-second) required to cause the kinetic panning effect (flick) at the end of a drag gesture.
  *
  * @property {Number} flickMomentum
  *     If flickEnabled is true, a constant multiplied by the velocity to determine the distance of the kinetic panning effect (flick) at the end of a drag gesture.
  *     A larger value will make the flick feel "lighter", while a smaller value will make the flick feel "heavier".
  *     Note: springStiffness and animationTime also affect the "spring" used to stop the flick animation.
  *
  */

/**
  * The names for the image resources used for the image navigation buttons.
  *
  * @typedef {Object} NavImages
  * @memberof OpenSeadragon
  *
  * @property {Object} zoomIn - Images for the zoom-in button.
  * @property {String} zoomIn.REST
  * @property {String} zoomIn.GROUP
  * @property {String} zoomIn.HOVER
  * @property {String} zoomIn.DOWN
  *
  * @property {Object} zoomOut - Images for the zoom-out button.
  * @property {String} zoomOut.REST
  * @property {String} zoomOut.GROUP
  * @property {String} zoomOut.HOVER
  * @property {String} zoomOut.DOWN
  *
  * @property {Object} home - Images for the home button.
  * @property {String} home.REST
  * @property {String} home.GROUP
  * @property {String} home.HOVER
  * @property {String} home.DOWN
  *
  * @property {Object} fullpage - Images for the full-page button.
  * @property {String} fullpage.REST
  * @property {String} fullpage.GROUP
  * @property {String} fullpage.HOVER
  * @property {String} fullpage.DOWN
  *
  * @property {Object} rotateleft - Images for the rotate left button.
  * @property {String} rotateleft.REST
  * @property {String} rotateleft.GROUP
  * @property {String} rotateleft.HOVER
  * @property {String} rotateleft.DOWN
  *
  * @property {Object} rotateright - Images for the rotate right button.
  * @property {String} rotateright.REST
  * @property {String} rotateright.GROUP
  * @property {String} rotateright.HOVER
  * @property {String} rotateright.DOWN
  *
  * @property {Object} flip - Images for the flip button.
  * @property {String} flip.REST
  * @property {String} flip.GROUP
  * @property {String} flip.HOVER
  * @property {String} flip.DOWN
  *
  * @property {Object} previous - Images for the previous button.
  * @property {String} previous.REST
  * @property {String} previous.GROUP
  * @property {String} previous.HOVER
  * @property {String} previous.DOWN
  *
  * @property {Object} next - Images for the next button.
  * @property {String} next.REST
  * @property {String} next.GROUP
  * @property {String} next.HOVER
  * @property {String} next.DOWN
  *
  */

/* eslint-disable no-redeclare */
function OpenSeadragon( options ){
    return new OpenSeadragon.Viewer( options );
}

(function( $ ){


    /**
     * The OpenSeadragon version.
     *
     * @member {Object} OpenSeadragon.version
     * @property {String} versionStr - The version number as a string ('major.minor.revision').
     * @property {Number} major - The major version number.
     * @property {Number} minor - The minor version number.
     * @property {Number} revision - The revision number.
     * @since 1.0.0
     */
    $.version = {
        versionStr: '4.0.0',
        major: parseInt('4', 10),
        minor: parseInt('0', 10),
        revision: parseInt('0', 10)
    };


    /**
     * Taken from jquery 1.6.1
     * [[Class]] -> type pairs
     * @private
     */
    var class2type = {
            '[object Boolean]':     'boolean',
            '[object Number]':      'number',
            '[object String]':      'string',
            '[object Function]':    'function',
            '[object Array]':       'array',
            '[object Date]':        'date',
            '[object RegExp]':      'regexp',
            '[object Object]':      'object'
        },
        // Save a reference to some core methods
        toString    = Object.prototype.toString,
        hasOwn      = Object.prototype.hasOwnProperty;

    /**
     * Taken from jQuery 1.6.1
     * @function isFunction
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.isFunction = function( obj ) {
        return $.type(obj) === "function";
    };


    /**
     * Taken from jQuery 1.6.1
     * @function isArray
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.isArray = Array.isArray || function( obj ) {
        return $.type(obj) === "array";
    };


    /**
     * A crude way of determining if an object is a window.
     * Taken from jQuery 1.6.1
     * @function isWindow
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.isWindow = function( obj ) {
        return obj && typeof obj === "object" && "setInterval" in obj;
    };


    /**
     * Taken from jQuery 1.6.1
     * @function type
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.type = function( obj ) {
        return ( obj === null ) || ( obj === undefined ) ?
            String( obj ) :
            class2type[ toString.call(obj) ] || "object";
    };


    /**
     * Taken from jQuery 1.6.1
     * @function isPlainObject
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.isPlainObject = function( obj ) {
        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if ( !obj || OpenSeadragon.type(obj) !== "object" || obj.nodeType || $.isWindow( obj ) ) {
            return false;
        }

        // Not own constructor property must be Object
        if ( obj.constructor &&
            !hasOwn.call(obj, "constructor") &&
            !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
            return false;
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.

        var lastKey;
        for (var key in obj ) {
            lastKey = key;
        }

        return lastKey === undefined || hasOwn.call( obj, lastKey );
    };


    /**
     * Taken from jQuery 1.6.1
     * @function isEmptyObject
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.isEmptyObject = function( obj ) {
        for ( var name in obj ) {
            return false;
        }
        return true;
    };

    /**
     * Shim around Object.freeze. Does nothing if Object.freeze is not supported.
     * @param {Object} obj The object to freeze.
     * @returns {Object} obj The frozen object.
     */
    $.freezeObject = function(obj) {
        if (Object.freeze) {
            $.freezeObject = Object.freeze;
        } else {
            $.freezeObject = function(obj) {
                return obj;
            };
        }
        return $.freezeObject(obj);
    };

    /**
     * True if the browser supports the HTML5 canvas element
     * @member {Boolean} supportsCanvas
     * @memberof OpenSeadragon
     */
    $.supportsCanvas = (function () {
        var canvasElement = document.createElement( 'canvas' );
        return !!( $.isFunction( canvasElement.getContext ) &&
                    canvasElement.getContext( '2d' ) );
    }());

    /**
     * Test whether the submitted canvas is tainted or not.
     * @argument {Canvas} canvas The canvas to test.
     * @returns {Boolean} True if the canvas is tainted.
     */
    $.isCanvasTainted = function(canvas) {
        var isTainted = false;
        try {
            // We test if the canvas is tainted by retrieving data from it.
            // An exception will be raised if the canvas is tainted.
            canvas.getContext('2d').getImageData(0, 0, 1, 1);
        } catch (e) {
            isTainted = true;
        }
        return isTainted;
    };

    /**
     * True if the browser supports the EventTarget.addEventListener() method
     * @member {Boolean} supportsAddEventListener
     * @memberof OpenSeadragon
     */
    $.supportsAddEventListener = (function () {
        return !!(document.documentElement.addEventListener && document.addEventListener);
    }());

    /**
     * True if the browser supports the EventTarget.removeEventListener() method
     * @member {Boolean} supportsRemoveEventListener
     * @memberof OpenSeadragon
     */
    $.supportsRemoveEventListener = (function () {
        return !!(document.documentElement.removeEventListener && document.removeEventListener);
    }());

    /**
     * True if the browser supports the newer EventTarget.addEventListener options argument
     * @member {Boolean} supportsEventListenerOptions
     * @memberof OpenSeadragon
     */
    $.supportsEventListenerOptions = (function () {
        var supported = 0;

        if ( $.supportsAddEventListener ) {
            try {
                var options = {
                    get capture() {
                        supported++;
                        return false;
                    },
                    get once() {
                        supported++;
                        return false;
                    },
                    get passive() {
                        supported++;
                        return false;
                    }
                };
                window.addEventListener("test", null, options);
                window.removeEventListener("test", null, options);
            } catch ( e ) {
                supported = 0;
            }
        }

        return supported >= 3;
    }());

    /**
     * A ratio comparing the device screen's pixel density to the canvas's backing store pixel density,
     * clamped to a minimum of 1. Defaults to 1 if canvas isn't supported by the browser.
     * @member {Number} pixelDensityRatio
     * @memberof OpenSeadragon
     */
    $.getCurrentPixelDensityRatio = function() {
        if ( $.supportsCanvas ) {
            var context = document.createElement('canvas').getContext('2d');
            var devicePixelRatio = window.devicePixelRatio || 1;
            var backingStoreRatio = context.webkitBackingStorePixelRatio ||
                                    context.mozBackingStorePixelRatio ||
                                    context.msBackingStorePixelRatio ||
                                    context.oBackingStorePixelRatio ||
                                    context.backingStorePixelRatio || 1;
            return Math.max(devicePixelRatio, 1) / backingStoreRatio;
        } else {
            return 1;
        }
    };

    /**
     * @member {Number} pixelDensityRatio
     * @memberof OpenSeadragon
     */
    $.pixelDensityRatio = $.getCurrentPixelDensityRatio();

}( OpenSeadragon ));

/**
 *  This closure defines all static methods available to the OpenSeadragon
 *  namespace.  Many, if not most, are taken directly from jQuery for use
 *  to simplify and reduce common programming patterns.  More static methods
 *  from jQuery may eventually make their way into this though we are
 *  attempting to avoid an explicit dependency on jQuery only because
 *  OpenSeadragon is a broadly useful code base and would be made less broad
 *  by requiring jQuery fully.
 *
 *  Some static methods have also been refactored from the original OpenSeadragon
 *  project.
 */
(function( $ ){

    /**
     * Taken from jQuery 1.6.1
     * @function extend
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.extend = function() {
        var options,
            name,
            src,
            copy,
            copyIsArray,
            clone,
            target  = arguments[ 0 ] || {},
            length  = arguments.length,
            deep    = false,
            i       = 1;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep    = target;
            target  = arguments[ 1 ] || {};
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !OpenSeadragon.isFunction( target ) ) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if ( length === i ) {
            target = this;
            --i;
        }

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            options = arguments[ i ];
            if ( options !== null || options !== undefined ) {
                // Extend the base object
                for ( name in options ) {
                    var descriptor = Object.getOwnPropertyDescriptor(options, name);

                    if (descriptor !== undefined) {
                        if (descriptor.get || descriptor.set) {
                            Object.defineProperty(target, name, descriptor);
                            continue;
                        }

                        copy = descriptor.value;
                    } else {
                        $.console.warn('Could not copy inherited property "' + name + '".');
                        continue;
                    }

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( OpenSeadragon.isPlainObject( copy ) || ( copyIsArray = OpenSeadragon.isArray( copy ) ) ) ) {
                        src = target[ name ];

                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && OpenSeadragon.isArray( src ) ? src : [];

                        } else {
                            clone = src && OpenSeadragon.isPlainObject( src ) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = OpenSeadragon.extend( deep, clone, copy );

                    // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    var isIOSDevice = function () {
        if (typeof navigator !== 'object') {
            return false;
        }
        var userAgent = navigator.userAgent;
        if (typeof userAgent !== 'string') {
            return false;
        }
        return userAgent.indexOf('iPhone') !== -1 ||
               userAgent.indexOf('iPad') !== -1 ||
               userAgent.indexOf('iPod') !== -1;
    };

    $.extend( $, /** @lends OpenSeadragon */{
        /**
         * The default values for the optional settings documented at {@link OpenSeadragon.Options}.
         * @static
         * @type {Object}
         */
        DEFAULT_SETTINGS: {
            //DATA SOURCE DETAILS
            xmlPath:                null,
            tileSources:            null,
            tileHost:               null,
            initialPage:            0,
            crossOriginPolicy:      false,
            ajaxWithCredentials:    false,
            loadTilesWithAjax:      false,
            ajaxHeaders:            {},
            splitHashDataForPost:   false,

            //PAN AND ZOOM SETTINGS AND CONSTRAINTS
            panHorizontal:          true,
            panVertical:            true,
            constrainDuringPan:     false,
            wrapHorizontal:         false,
            wrapVertical:           false,
            visibilityRatio:        0.5, //-> how much of the viewer can be negative space
            minPixelRatio:          0.5, //->closer to 0 draws tiles meant for a higher zoom at this zoom
            defaultZoomLevel:       0,
            minZoomLevel:           null,
            maxZoomLevel:           null,
            homeFillsViewer:        false,

            //UI RESPONSIVENESS AND FEEL
            clickTimeThreshold:     300,
            clickDistThreshold:     5,
            dblClickTimeThreshold:  300,
            dblClickDistThreshold:  20,
            springStiffness:        6.5,
            animationTime:          1.2,
            gestureSettingsMouse:   {
                dragToPan: true,
                scrollToZoom: true,
                clickToZoom: true,
                dblClickToZoom: false,
                dblClickDragToZoom: false,
                pinchToZoom: false,
                zoomToRefPoint: true,
                flickEnabled: false,
                flickMinSpeed: 120,
                flickMomentum: 0.25,
                pinchRotate: false
            },
            gestureSettingsTouch:   {
                dragToPan: true,
                scrollToZoom: false,
                clickToZoom: false,
                dblClickToZoom: true,
                dblClickDragToZoom: true,
                pinchToZoom: true,
                zoomToRefPoint: true,
                flickEnabled: true,
                flickMinSpeed: 120,
                flickMomentum: 0.25,
                pinchRotate: false
            },
            gestureSettingsPen:     {
                dragToPan: true,
                scrollToZoom: false,
                clickToZoom: true,
                dblClickToZoom: false,
                dblClickDragToZoom: false,
                pinchToZoom: false,
                zoomToRefPoint: true,
                flickEnabled: false,
                flickMinSpeed: 120,
                flickMomentum: 0.25,
                pinchRotate: false
            },
            gestureSettingsUnknown: {
                dragToPan: true,
                scrollToZoom: false,
                clickToZoom: false,
                dblClickToZoom: true,
                dblClickDragToZoom: false,
                pinchToZoom: true,
                zoomToRefPoint: true,
                flickEnabled: true,
                flickMinSpeed: 120,
                flickMomentum: 0.25,
                pinchRotate: false
            },
            zoomPerClick:           2,
            zoomPerScroll:          1.2,
            zoomPerDblClickDrag:    1.2,
            zoomPerSecond:          1.0,
            blendTime:              0,
            alwaysBlend:            false,
            autoHideControls:       true,
            immediateRender:        false,
            minZoomImageRatio:      0.9, //-> closer to 0 allows zoom out to infinity
            maxZoomPixelRatio:      1.1, //-> higher allows 'over zoom' into pixels
            smoothTileEdgesMinZoom: 1.1, //-> higher than maxZoomPixelRatio disables it
            iOSDevice:              isIOSDevice(),
            pixelsPerWheelLine:     40,
            pixelsPerArrowPress:    40,
            autoResize:             true,
            preserveImageSizeOnResize: false, // requires autoResize=true
            minScrollDeltaTime:     50,
            rotationIncrement:      90,

            //DEFAULT CONTROL SETTINGS
            showSequenceControl:     true,  //SEQUENCE
            sequenceControlAnchor:   null,  //SEQUENCE
            preserveViewport:        false, //SEQUENCE
            preserveOverlays:        false, //SEQUENCE
            navPrevNextWrap:         false, //SEQUENCE
            showNavigationControl:   true,  //ZOOM/HOME/FULL/ROTATION
            navigationControlAnchor: null,  //ZOOM/HOME/FULL/ROTATION
            showZoomControl:         true,  //ZOOM
            showHomeControl:         true,  //HOME
            showFullPageControl:     true,  //FULL
            showRotationControl:     false, //ROTATION
            showFlipControl:         false,  //FLIP
            controlsFadeDelay:       2000,  //ZOOM/HOME/FULL/SEQUENCE
            controlsFadeLength:      1500,  //ZOOM/HOME/FULL/SEQUENCE
            mouseNavEnabled:         true,  //GENERAL MOUSE INTERACTIVITY

            //VIEWPORT NAVIGATOR SETTINGS
            showNavigator:              false,
            navigatorElement:           null,
            navigatorId:                null,
            navigatorPosition:          null,
            navigatorSizeRatio:         0.2,
            navigatorMaintainSizeRatio: false,
            navigatorTop:               null,
            navigatorLeft:              null,
            navigatorHeight:            null,
            navigatorWidth:             null,
            navigatorAutoResize:        true,
            navigatorAutoFade:          true,
            navigatorRotate:            true,
            navigatorBackground:        '#000',
            navigatorOpacity:           0.8,
            navigatorBorderColor:       '#555',
            navigatorDisplayRegionColor: '#900',

            // INITIAL ROTATION
            degrees:                    0,

            // INITIAL FLIP STATE
            flipped:                    false,

            // APPEARANCE
            opacity:                           1,
            preload:                           false,
            compositeOperation:                null,
            imageSmoothingEnabled:             true,
            placeholderFillStyle:              null,
            subPixelRoundingForTransparency:   null,

            //REFERENCE STRIP SETTINGS
            showReferenceStrip:          false,
            referenceStripScroll:       'horizontal',
            referenceStripElement:       null,
            referenceStripHeight:        null,
            referenceStripWidth:         null,
            referenceStripPosition:      'BOTTOM_LEFT',
            referenceStripSizeRatio:     0.2,

            //COLLECTION VISUALIZATION SETTINGS
            collectionRows:         3, //or columns depending on layout
            collectionColumns:      0, //columns in horizontal layout, rows in vertical layout
            collectionLayout:       'horizontal', //vertical
            collectionMode:         false,
            collectionTileSize:     800,
            collectionTileMargin:   80,

            //PERFORMANCE SETTINGS
            imageLoaderLimit:       0,
            maxImageCacheCount:     200,
            timeout:                30000,
            useCanvas:              true,  // Use canvas element for drawing if available

            //INTERFACE RESOURCE SETTINGS
            prefixUrl:              "/images/",
            navImages: {
                zoomIn: {
                    REST:   'zoomin_rest.png',
                    GROUP:  'zoomin_grouphover.png',
                    HOVER:  'zoomin_hover.png',
                    DOWN:   'zoomin_pressed.png'
                },
                zoomOut: {
                    REST:   'zoomout_rest.png',
                    GROUP:  'zoomout_grouphover.png',
                    HOVER:  'zoomout_hover.png',
                    DOWN:   'zoomout_pressed.png'
                },
                home: {
                    REST:   'home_rest.png',
                    GROUP:  'home_grouphover.png',
                    HOVER:  'home_hover.png',
                    DOWN:   'home_pressed.png'
                },
                fullpage: {
                    REST:   'fullpage_rest.png',
                    GROUP:  'fullpage_grouphover.png',
                    HOVER:  'fullpage_hover.png',
                    DOWN:   'fullpage_pressed.png'
                },
                rotateleft: {
                    REST:   'rotateleft_rest.png',
                    GROUP:  'rotateleft_grouphover.png',
                    HOVER:  'rotateleft_hover.png',
                    DOWN:   'rotateleft_pressed.png'
                },
                rotateright: {
                    REST:   'rotateright_rest.png',
                    GROUP:  'rotateright_grouphover.png',
                    HOVER:  'rotateright_hover.png',
                    DOWN:   'rotateright_pressed.png'
                },
                flip: { // Flip icon designed by Yaroslav Samoylov from the Noun Project and modified by Nelson Campos ncampos@criteriamarathon.com, https://thenounproject.com/term/flip/136289/
                    REST:   'flip_rest.png',
                    GROUP:  'flip_grouphover.png',
                    HOVER:  'flip_hover.png',
                    DOWN:   'flip_pressed.png'
                },
                previous: {
                    REST:   'previous_rest.png',
                    GROUP:  'previous_grouphover.png',
                    HOVER:  'previous_hover.png',
                    DOWN:   'previous_pressed.png'
                },
                next: {
                    REST:   'next_rest.png',
                    GROUP:  'next_grouphover.png',
                    HOVER:  'next_hover.png',
                    DOWN:   'next_pressed.png'
                }
            },

            //DEVELOPER SETTINGS
            debugMode:              false,
            debugGridColor:         ['#437AB2', '#1B9E77', '#D95F02', '#7570B3', '#E7298A', '#66A61E', '#E6AB02', '#A6761D', '#666666'],
            silenceMultiImageWarnings: false

        },


        /**
         * TODO: get rid of this.  I can't see how it's required at all.  Looks
         *       like an early legacy code artifact.
         * @static
         * @ignore
         */
        SIGNAL: "----seadragon----",


        /**
         * Returns a function which invokes the method as if it were a method belonging to the object.
         * @function
         * @param {Object} object
         * @param {Function} method
         * @returns {Function}
         */
        delegate: function( object, method ) {
            return function(){
                var args = arguments;
                if ( args === undefined ){
                    args = [];
                }
                return method.apply( object, args );
            };
        },


        /**
         * An enumeration of Browser vendors.
         * @static
         * @type {Object}
         * @property {Number} UNKNOWN
         * @property {Number} IE
         * @property {Number} FIREFOX
         * @property {Number} SAFARI
         * @property {Number} CHROME
         * @property {Number} OPERA
         * @property {Number} EDGE
         * @property {Number} CHROMEEDGE
         */
        BROWSERS: {
            UNKNOWN:    0,
            IE:         1,
            FIREFOX:    2,
            SAFARI:     3,
            CHROME:     4,
            OPERA:      5,
            EDGE:       6,
            CHROMEEDGE: 7
        },

        /**
         * An enumeration of when subpixel rounding should occur.
         * @static
         * @type {Object}
         * @property {Number} NEVER Never apply subpixel rounding for transparency.
         * @property {Number} ONLY_AT_REST Do not apply subpixel rounding for transparency during animation (panning, zoom, rotation) and apply it once animation is over.
         * @property {Number} ALWAYS Apply subpixel rounding for transparency during animation and when animation is over.
         */
        SUBPIXEL_ROUNDING_OCCURRENCES: {
            NEVER:        0,
            ONLY_AT_REST: 1,
            ALWAYS:       2
        },

        /**
         * Keep track of which {@link Viewer}s have been created.
         * - Key: {@link Element} to which a Viewer is attached.
         * - Value: {@link Viewer} of the element defined by the key.
         * @private
         * @static
         * @type {Object}
         */
        _viewers: new Map(),

       /**
         * Returns the {@link Viewer} attached to a given DOM element. If there is
         * no viewer attached to the provided element, undefined is returned.
         * @function
         * @param {String|Element} element Accepts an id or element.
         * @returns {Viewer} The viewer attached to the given element, or undefined.
         */
        getViewer: function(element) {
            return $._viewers.get(this.getElement(element));
        },

        /**
         * Returns a DOM Element for the given id or element.
         * @function
         * @param {String|Element} element Accepts an id or element.
         * @returns {Element} The element with the given id, null, or the element itself.
         */
        getElement: function( element ) {
            if ( typeof ( element ) === "string" ) {
                element = document.getElementById( element );
            }
            return element;
        },


        /**
         * Determines the position of the upper-left corner of the element.
         * @function
         * @param {Element|String} element - the element we want the position for.
         * @returns {OpenSeadragon.Point} - the position of the upper left corner of the element.
         */
        getElementPosition: function( element ) {
            var result = new $.Point(),
                isFixed,
                offsetParent;

            element      = $.getElement( element );
            isFixed      = $.getElementStyle( element ).position === "fixed";
            offsetParent = getOffsetParent( element, isFixed );

            while ( offsetParent ) {

                result.x += element.offsetLeft;
                result.y += element.offsetTop;

                if ( isFixed ) {
                    result = result.plus( $.getPageScroll() );
                }

                element = offsetParent;
                isFixed = $.getElementStyle( element ).position === "fixed";
                offsetParent = getOffsetParent( element, isFixed );
            }

            return result;
        },


        /**
         * Determines the position of the upper-left corner of the element adjusted for current page and/or element scroll.
         * @function
         * @param {Element|String} element - the element we want the position for.
         * @returns {OpenSeadragon.Point} - the position of the upper left corner of the element adjusted for current page and/or element scroll.
         */
        getElementOffset: function( element ) {
            element = $.getElement( element );

            var doc = element && element.ownerDocument,
                docElement,
                win,
                boundingRect = { top: 0, left: 0 };

            if ( !doc ) {
                return new $.Point();
            }

            docElement = doc.documentElement;

            if ( typeof element.getBoundingClientRect !== typeof undefined ) {
                boundingRect = element.getBoundingClientRect();
            }

            win = ( doc === doc.window ) ?
                doc :
                ( doc.nodeType === 9 ) ?
                    doc.defaultView || doc.parentWindow :
                    false;

            return new $.Point(
                boundingRect.left + ( win.pageXOffset || docElement.scrollLeft ) - ( docElement.clientLeft || 0 ),
                boundingRect.top + ( win.pageYOffset || docElement.scrollTop ) - ( docElement.clientTop || 0 )
            );
        },


        /**
         * Determines the height and width of the given element.
         * @function
         * @param {Element|String} element
         * @returns {OpenSeadragon.Point}
         */
        getElementSize: function( element ) {
            element = $.getElement( element );

            return new $.Point(
                element.clientWidth,
                element.clientHeight
            );
        },


        /**
         * Returns the CSSStyle object for the given element.
         * @function
         * @param {Element|String} element
         * @returns {CSSStyle}
         */
        getElementStyle:
            document.documentElement.currentStyle ?
            function( element ) {
                element = $.getElement( element );
                return element.currentStyle;
            } :
            function( element ) {
                element = $.getElement( element );
                return window.getComputedStyle( element, "" );
            },

        /**
         * Returns the property with the correct vendor prefix appended.
         * @param {String} property the property name
         * @returns {String} the property with the correct prefix or null if not
         * supported.
         */
        getCssPropertyWithVendorPrefix: function(property) {
            var memo = {};

            $.getCssPropertyWithVendorPrefix = function(property) {
                if (memo[property] !== undefined) {
                    return memo[property];
                }
                var style = document.createElement('div').style;
                var result = null;
                if (style[property] !== undefined) {
                    result = property;
                } else {
                    var prefixes = ['Webkit', 'Moz', 'MS', 'O',
                        'webkit', 'moz', 'ms', 'o'];
                    var suffix = $.capitalizeFirstLetter(property);
                    for (var i = 0; i < prefixes.length; i++) {
                        var prop = prefixes[i] + suffix;
                        if (style[prop] !== undefined) {
                            result = prop;
                            break;
                        }
                    }
                }
                memo[property] = result;
                return result;
            };
            return $.getCssPropertyWithVendorPrefix(property);
        },

        /**
         * Capitalizes the first letter of a string
         * @param {String} string
         * @returns {String} The string with the first letter capitalized
         */
        capitalizeFirstLetter: function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },

        /**
         * Compute the modulo of a number but makes sure to always return
         * a positive value (also known as Euclidean modulo).
         * @param {Number} number the number to compute the modulo of
         * @param {Number} modulo the modulo
         * @returns {Number} the result of the modulo of number
         */
        positiveModulo: function(number, modulo) {
            var result = number % modulo;
            if (result < 0) {
                result += modulo;
            }
            return result;
        },


        /**
         * Determines if a point is within the bounding rectangle of the given element (hit-test).
         * @function
         * @param {Element|String} element
         * @param {OpenSeadragon.Point} point
         * @returns {Boolean}
         */
        pointInElement: function( element, point ) {
            element = $.getElement( element );
            var offset = $.getElementOffset( element ),
                size = $.getElementSize( element );
            return point.x >= offset.x && point.x < offset.x + size.x && point.y < offset.y + size.y && point.y >= offset.y;
        },


        /**
         * Gets the position of the mouse on the screen for a given event.
         * @function
         * @param {Event} [event]
         * @returns {OpenSeadragon.Point}
         */
        getMousePosition: function( event ) {

            if ( typeof ( event.pageX ) === "number" ) {
                $.getMousePosition = function( event ){
                    var result = new $.Point();

                    result.x = event.pageX;
                    result.y = event.pageY;

                    return result;
                };
            } else if ( typeof ( event.clientX ) === "number" ) {
                $.getMousePosition = function( event ){
                    var result = new $.Point();

                    result.x =
                        event.clientX +
                        document.body.scrollLeft +
                        document.documentElement.scrollLeft;
                    result.y =
                        event.clientY +
                        document.body.scrollTop +
                        document.documentElement.scrollTop;

                    return result;
                };
            } else {
                throw new Error(
                    "Unknown event mouse position, no known technique."
                );
            }

            return $.getMousePosition( event );
        },


        /**
         * Determines the page's current scroll position.
         * @function
         * @returns {OpenSeadragon.Point}
         */
        getPageScroll: function() {
            var docElement  = document.documentElement || {},
                body        = document.body || {};

            if ( typeof ( window.pageXOffset ) === "number" ) {
                $.getPageScroll = function(){
                    return new $.Point(
                        window.pageXOffset,
                        window.pageYOffset
                    );
                };
            } else if ( body.scrollLeft || body.scrollTop ) {
                $.getPageScroll = function(){
                    return new $.Point(
                        document.body.scrollLeft,
                        document.body.scrollTop
                    );
                };
            } else if ( docElement.scrollLeft || docElement.scrollTop ) {
                $.getPageScroll = function(){
                    return new $.Point(
                        document.documentElement.scrollLeft,
                        document.documentElement.scrollTop
                    );
                };
            } else {
                // We can't reassign the function yet, as there was no scroll.
                return new $.Point(0, 0);
            }

            return $.getPageScroll();
        },

        /**
         * Set the page scroll position.
         * @function
         * @returns {OpenSeadragon.Point}
         */
        setPageScroll: function( scroll ) {
            if ( typeof ( window.scrollTo ) !== "undefined" ) {
                $.setPageScroll = function( scroll ) {
                    window.scrollTo( scroll.x, scroll.y );
                };
            } else {
                var originalScroll = $.getPageScroll();
                if ( originalScroll.x === scroll.x &&
                    originalScroll.y === scroll.y ) {
                    // We are already correctly positioned and there
                    // is no way to detect the correct method.
                    return;
                }

                document.body.scrollLeft = scroll.x;
                document.body.scrollTop = scroll.y;
                var currentScroll = $.getPageScroll();
                if ( currentScroll.x !== originalScroll.x &&
                    currentScroll.y !== originalScroll.y ) {
                    $.setPageScroll = function( scroll ) {
                        document.body.scrollLeft = scroll.x;
                        document.body.scrollTop = scroll.y;
                    };
                    return;
                }

                document.documentElement.scrollLeft = scroll.x;
                document.documentElement.scrollTop = scroll.y;
                currentScroll = $.getPageScroll();
                if ( currentScroll.x !== originalScroll.x &&
                    currentScroll.y !== originalScroll.y ) {
                    $.setPageScroll = function( scroll ) {
                        document.documentElement.scrollLeft = scroll.x;
                        document.documentElement.scrollTop = scroll.y;
                    };
                    return;
                }

                // We can't find anything working, so we do nothing.
                $.setPageScroll = function( scroll ) {
                };
            }

            $.setPageScroll( scroll );
        },

        /**
         * Determines the size of the browsers window.
         * @function
         * @returns {OpenSeadragon.Point}
         */
        getWindowSize: function() {
            var docElement = document.documentElement || {},
                body    = document.body || {};

            if ( typeof ( window.innerWidth ) === 'number' ) {
                $.getWindowSize = function(){
                    return new $.Point(
                        window.innerWidth,
                        window.innerHeight
                    );
                };
            } else if ( docElement.clientWidth || docElement.clientHeight ) {
                $.getWindowSize = function(){
                    return new $.Point(
                        document.documentElement.clientWidth,
                        document.documentElement.clientHeight
                    );
                };
            } else if ( body.clientWidth || body.clientHeight ) {
                $.getWindowSize = function(){
                    return new $.Point(
                        document.body.clientWidth,
                        document.body.clientHeight
                    );
                };
            } else {
                throw new Error("Unknown window size, no known technique.");
            }

            return $.getWindowSize();
        },


        /**
         * Wraps the given element in a nest of divs so that the element can
         * be easily centered using CSS tables
         * @function
         * @param {Element|String} element
         * @returns {Element} outermost wrapper element
         */
        makeCenteredNode: function( element ) {
            // Convert a possible ID to an actual HTMLElement
            element = $.getElement( element );

            /*
                CSS tables require you to have a display:table/row/cell hierarchy so we need to create
                three nested wrapper divs:
             */

            var wrappers = [
                $.makeNeutralElement( 'div' ),
                $.makeNeutralElement( 'div' ),
                $.makeNeutralElement( 'div' )
            ];

            // It feels like we should be able to pass style dicts to makeNeutralElement:
            $.extend(wrappers[0].style, {
                display: "table",
                height: "100%",
                width: "100%"
            });

            $.extend(wrappers[1].style, {
                display: "table-row"
            });

            $.extend(wrappers[2].style, {
                display: "table-cell",
                verticalAlign: "middle",
                textAlign: "center"
            });

            wrappers[0].appendChild(wrappers[1]);
            wrappers[1].appendChild(wrappers[2]);
            wrappers[2].appendChild(element);

            return wrappers[0];
        },


        /**
         * Creates an easily positionable element of the given type that therefor
         * serves as an excellent container element.
         * @function
         * @param {String} tagName
         * @returns {Element}
         */
        makeNeutralElement: function( tagName ) {
            var element = document.createElement( tagName ),
                style   = element.style;

            style.background = "transparent none";
            style.border     = "none";
            style.margin     = "0px";
            style.padding    = "0px";
            style.position   = "static";

            return element;
        },


        /**
         * Returns the current milliseconds, using Date.now() if available
         * @function
         */
        now: function( ) {
            if (Date.now) {
                $.now = Date.now;
            } else {
                $.now = function() {
                    return new Date().getTime();
                };
            }

            return $.now();
        },


        /**
         * Ensures an image is loaded correctly to support alpha transparency.
         * @function
         * @param {String} src
         * @returns {Element}
         */
        makeTransparentImage: function( src ) {
            var img = $.makeNeutralElement( "img" );

            img.src = src;

            return img;
        },


        /**
         * Sets the opacity of the specified element.
         * @function
         * @param {Element|String} element
         * @param {Number} opacity
         * @param {Boolean} [usesAlpha]
         */
        setElementOpacity: function( element, opacity, usesAlpha ) {

            var ieOpacity,
                ieFilter;

            element = $.getElement( element );

            if ( usesAlpha && !$.Browser.alpha ) {
                opacity = Math.round( opacity );
            }

            if ( $.Browser.opacity ) {
                element.style.opacity = opacity < 1 ? opacity : "";
            } else {
                if ( opacity < 1 ) {
                    ieOpacity = Math.round( 100 * opacity );
                    ieFilter  = "alpha(opacity=" + ieOpacity + ")";
                    element.style.filter = ieFilter;
                } else {
                    element.style.filter = "";
                }
            }
        },


        /**
         * Sets the specified element's touch-action style attribute to 'none'.
         * @function
         * @param {Element|String} element
         */
        setElementTouchActionNone: function( element ) {
            element = $.getElement( element );
            if ( typeof element.style.touchAction !== 'undefined' ) {
                element.style.touchAction = 'none';
            } else if ( typeof element.style.msTouchAction !== 'undefined' ) {
                element.style.msTouchAction = 'none';
            }
        },


        /**
         * Sets the specified element's pointer-events style attribute to the passed value.
         * @function
         * @param {Element|String} element
         * @param {String} value
         */
        setElementPointerEvents: function( element, value ) {
            element = $.getElement( element );
            if (typeof element.style !== 'undefined' && typeof element.style.pointerEvents !== 'undefined' ) {
                element.style.pointerEvents = value;
            }
        },


        /**
         * Sets the specified element's pointer-events style attribute to 'none'.
         * @function
         * @param {Element|String} element
         */
        setElementPointerEventsNone: function( element ) {
            $.setElementPointerEvents( element, 'none' );
        },


        /**
         * Add the specified CSS class to the element if not present.
         * @function
         * @param {Element|String} element
         * @param {String} className
         */
        addClass: function( element, className ) {
            element = $.getElement( element );

            if (!element.className) {
                element.className = className;
            } else if ( ( ' ' + element.className + ' ' ).
                indexOf( ' ' + className + ' ' ) === -1 ) {
                element.className += ' ' + className;
            }
        },

        /**
         * Find the first index at which an element is found in an array or -1
         * if not present.
         *
         * Code taken and adapted from
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Compatibility
         *
         * @function
         * @param {Array} array The array from which to find the element
         * @param {Object} searchElement The element to find
         * @param {Number} [fromIndex=0] Index to start research.
         * @returns {Number} The index of the element in the array.
         */
        indexOf: function( array, searchElement, fromIndex ) {
            if ( Array.prototype.indexOf ) {
                this.indexOf = function( array, searchElement, fromIndex ) {
                    return array.indexOf( searchElement, fromIndex );
                };
            } else {
                this.indexOf = function( array, searchElement, fromIndex ) {
                    var i,
                        pivot = ( fromIndex ) ? fromIndex : 0,
                        length;
                    if ( !array ) {
                        throw new TypeError( );
                    }

                    length = array.length;
                    if ( length === 0 || pivot >= length ) {
                        return -1;
                    }

                    if ( pivot < 0 ) {
                        pivot = length - Math.abs( pivot );
                    }

                    for ( i = pivot; i < length; i++ ) {
                        if ( array[i] === searchElement ) {
                            return i;
                        }
                    }
                    return -1;
                };
            }
            return this.indexOf( array, searchElement, fromIndex );
        },

        /**
         * Remove the specified CSS class from the element.
         * @function
         * @param {Element|String} element
         * @param {String} className
         */
        removeClass: function( element, className ) {
            var oldClasses,
                newClasses = [],
                i;

            element = $.getElement( element );
            oldClasses = element.className.split( /\s+/ );
            for ( i = 0; i < oldClasses.length; i++ ) {
                if ( oldClasses[ i ] && oldClasses[ i ] !== className ) {
                    newClasses.push( oldClasses[ i ] );
                }
            }
            element.className = newClasses.join(' ');
        },

        /**
         * Convert passed addEventListener() options to boolean or options object,
         * depending on browser support.
         * @function
         * @param {Boolean|Object} [options] Boolean useCapture, or if [supportsEventListenerOptions]{@link OpenSeadragon.supportsEventListenerOptions}, can be an object
         * @param {Boolean} [options.capture]
         * @param {Boolean} [options.passive]
         * @param {Boolean} [options.once]
         * @returns {String} The protocol (http:, https:, file:, ftp: ...)
         */
        normalizeEventListenerOptions: function (options) {
            var opts;
            if ( typeof options !== 'undefined' ) {
                if ( typeof options === 'boolean' ) {
                    // Legacy Boolean useCapture
                    opts = $.supportsEventListenerOptions ? { capture: options } : options;
                } else {
                    // Options object
                    opts = $.supportsEventListenerOptions ? options :
                        ( ( typeof options.capture !== 'undefined' ) ? options.capture : false );
                }
            } else {
                // No options specified - Legacy optional useCapture argument
                //   (for IE, first supported on version 9, so we'll pass a Boolean)
                opts = $.supportsEventListenerOptions ? { capture: false } : false;
            }
            return opts;
        },

        /**
         * Adds an event listener for the given element, eventName and handler.
         * @function
         * @param {Element|String} element
         * @param {String} eventName
         * @param {Function} handler
         * @param {Boolean|Object} [options] Boolean useCapture, or if [supportsEventListenerOptions]{@link OpenSeadragon.supportsEventListenerOptions}, can be an object
         * @param {Boolean} [options.capture]
         * @param {Boolean} [options.passive]
         * @param {Boolean} [options.once]
         */
        addEvent: (function () {
            if ( $.supportsAddEventListener ) {
                return function ( element, eventName, handler, options ) {
                    options = $.normalizeEventListenerOptions(options);
                    element = $.getElement( element );
                    element.addEventListener( eventName, handler, options );
                };
            } else if ( document.documentElement.attachEvent && document.attachEvent ) {
                return function ( element, eventName, handler ) {
                    element = $.getElement( element );
                    element.attachEvent( 'on' + eventName, handler );
                };
            } else {
                throw new Error( "No known event model." );
            }
        }()),


        /**
         * Remove a given event listener for the given element, event type and
         * handler.
         * @function
         * @param {Element|String} element
         * @param {String} eventName
         * @param {Function} handler
         * @param {Boolean|Object} [options] Boolean useCapture, or if [supportsEventListenerOptions]{@link OpenSeadragon.supportsEventListenerOptions}, can be an object
         * @param {Boolean} [options.capture]
         */
        removeEvent: (function () {
            if ( $.supportsRemoveEventListener ) {
                return function ( element, eventName, handler, options ) {
                    options = $.normalizeEventListenerOptions(options);
                    element = $.getElement( element );
                    element.removeEventListener( eventName, handler, options );
                };
            } else if ( document.documentElement.detachEvent && document.detachEvent ) {
                return function( element, eventName, handler ) {
                    element = $.getElement( element );
                    element.detachEvent( 'on' + eventName, handler );
                };
            } else {
                throw new Error( "No known event model." );
            }
        }()),


        /**
         * Cancels the default browser behavior had the event propagated all
         * the way up the DOM to the window object.
         * @function
         * @param {Event} [event]
         */
        cancelEvent: function( event ) {
            event.preventDefault();
        },


        /**
         * Returns true if {@link OpenSeadragon.cancelEvent|cancelEvent} has been called on
         * the event, otherwise returns false.
         * @function
         * @param {Event} [event]
         */
        eventIsCanceled: function( event ) {
            return event.defaultPrevented;
        },


        /**
         * Stops the propagation of the event through the DOM in the capturing and bubbling phases.
         * @function
         * @param {Event} [event]
         */
        stopEvent: function( event ) {
            event.stopPropagation();
        },


        /**
         * Similar to OpenSeadragon.delegate, but it does not immediately call
         * the method on the object, returning a function which can be called
         * repeatedly to delegate the method. It also allows additional arguments
         * to be passed during construction which will be added during each
         * invocation, and each invocation can add additional arguments as well.
         *
         * @function
         * @param {Object} object
         * @param {Function} method
         * @param [args] any additional arguments are passed as arguments to the
         *  created callback
         * @returns {Function}
         */
        createCallback: function( object, method ) {
            //TODO: This pattern is painful to use and debug.  It's much cleaner
            //      to use pinning plus anonymous functions.  Get rid of this
            //      pattern!
            var initialArgs = [],
                i;
            for ( i = 2; i < arguments.length; i++ ) {
                initialArgs.push( arguments[ i ] );
            }

            return function() {
                var args = initialArgs.concat( [] ),
                    i;
                for ( i = 0; i < arguments.length; i++ ) {
                    args.push( arguments[ i ] );
                }

                return method.apply( object, args );
            };
        },


        /**
         * Retrieves the value of a url parameter from the window.location string.
         * @function
         * @param {String} key
         * @returns {String} The value of the url parameter or null if no param matches.
         */
        getUrlParameter: function( key ) {
            // eslint-disable-next-line no-use-before-define
            var value = URLPARAMS[ key ];
            return value ? value : null;
        },

        /**
         * Retrieves the protocol used by the url. The url can either be absolute
         * or relative.
         * @function
         * @private
         * @param {String} url The url to retrieve the protocol from.
         * @returns {String} The protocol (http:, https:, file:, ftp: ...)
         */
        getUrlProtocol: function( url ) {
            var match = url.match(/^([a-z]+:)\/\//i);
            if ( match === null ) {
                // Relative URL, retrive the protocol from window.location
                return window.location.protocol;
            }
            return match[1].toLowerCase();
        },

        /**
         * Create an XHR object
         * @private
         * @param {type} [local] If set to true, the XHR will be file: protocol
         * compatible if possible (but may raise a warning in the browser).
         * @returns {XMLHttpRequest}
         */
        createAjaxRequest: function( local ) {
            // IE11 does not support window.ActiveXObject so we just try to
            // create one to see if it is supported.
            // See: http://msdn.microsoft.com/en-us/library/ie/dn423948%28v=vs.85%29.aspx
            var supportActiveX;
            try {
                /* global ActiveXObject:true */
                supportActiveX = !!new ActiveXObject( "Microsoft.XMLHTTP" );
            } catch( e ) {
                supportActiveX = false;
            }

            if ( supportActiveX ) {
                if ( window.XMLHttpRequest ) {
                    $.createAjaxRequest = function( local ) {
                        if ( local ) {
                            return new ActiveXObject( "Microsoft.XMLHTTP" );
                        }
                        return new XMLHttpRequest();
                    };
                } else {
                    $.createAjaxRequest = function() {
                        return new ActiveXObject( "Microsoft.XMLHTTP" );
                    };
                }
            } else if ( window.XMLHttpRequest ) {
                $.createAjaxRequest = function() {
                    return new XMLHttpRequest();
                };
            } else {
                throw new Error( "Browser doesn't support XMLHttpRequest." );
            }
            return $.createAjaxRequest( local );
        },

        /**
         * Makes an AJAX request.
         * @param {Object} options
         * @param {String} options.url - the url to request
         * @param {Function} options.success - a function to call on a successful response
         * @param {Function} options.error - a function to call on when an error occurs
         * @param {Object} options.headers - headers to add to the AJAX request
         * @param {String} options.responseType - the response type of the AJAX request
         * @param {String} options.postData - HTTP POST data (usually but not necessarily in k=v&k2=v2... form,
         *      see TileSource::getPostData), GET method used if null
         * @param {Boolean} [options.withCredentials=false] - whether to set the XHR's withCredentials
         * @throws {Error}
         * @returns {XMLHttpRequest}
         */
        makeAjaxRequest: function( url, onSuccess, onError ) {
            var withCredentials;
            var headers;
            var responseType;
            var postData;

            // Note that our preferred API is that you pass in a single object; the named
            // arguments are for legacy support.
            if( $.isPlainObject( url ) ){
                onSuccess = url.success;
                onError = url.error;
                withCredentials = url.withCredentials;
                headers = url.headers;
                responseType = url.responseType || null;
                postData = url.postData || null;
                url = url.url;
            }

            var protocol = $.getUrlProtocol( url );
            var request = $.createAjaxRequest( protocol === "file:" );

            if ( !$.isFunction( onSuccess ) ) {
                throw new Error( "makeAjaxRequest requires a success callback" );
            }

            request.onreadystatechange = function() {
                // 4 = DONE (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#Properties)
                if ( request.readyState === 4 ) {
                    request.onreadystatechange = function(){};

                    // With protocols other than http/https, a successful request status is in
                    // the 200's on Firefox and 0 on other browsers
                    if ( (request.status >= 200 && request.status < 300) ||
                        ( request.status === 0 &&
                          protocol !== "http:" &&
                          protocol !== "https:" )) {
                        onSuccess( request );
                    } else {
                        if ( $.isFunction( onError ) ) {
                            onError( request );
                        } else {
                            $.console.error( "AJAX request returned %d: %s", request.status, url );
                        }
                    }
                }
            };

            var method = postData ? "POST" : "GET";
            try {
                request.open( method, url, true );

                if (responseType) {
                    request.responseType = responseType;
                }

                if (headers) {
                    for (var headerName in headers) {
                        if (Object.prototype.hasOwnProperty.call(headers, headerName) && headers[headerName]) {
                            request.setRequestHeader(headerName, headers[headerName]);
                        }
                    }
                }

                if (withCredentials) {
                    request.withCredentials = true;
                }

                request.send(postData);
            } catch (e) {
                $.console.error( "%s while making AJAX request: %s", e.name, e.message );

                request.onreadystatechange = function(){};

                if ( $.isFunction( onError ) ) {
                    onError( request, e );
                }
            }

            return request;
        },

        /**
         * Taken from jQuery 1.6.1
         * @function
         * @param {Object} options
         * @param {String} options.url
         * @param {Function} options.callback
         * @param {String} [options.param='callback'] The name of the url parameter
         *      to request the jsonp provider with.
         * @param {String} [options.callbackName=] The name of the callback to
         *      request the jsonp provider with.
         */
        jsonp: function( options ){
            var script,
                url     = options.url,
                head    = document.head ||
                    document.getElementsByTagName( "head" )[ 0 ] ||
                    document.documentElement,
                jsonpCallback = options.callbackName || 'openseadragon' + $.now(),
                previous      = window[ jsonpCallback ],
                replace       = "$1" + jsonpCallback + "$2",
                callbackParam = options.param || 'callback',
                callback      = options.callback;

            url = url.replace( /(=)\?(&|$)|\?\?/i, replace );
            // Add callback manually
            url += (/\?/.test( url ) ? "&" : "?") + callbackParam + "=" + jsonpCallback;

            // Install callback
            window[ jsonpCallback ] = function( response ) {
                if ( !previous ){
                    try{
                        delete window[ jsonpCallback ];
                    }catch(e){
                        //swallow
                    }
                } else {
                    window[ jsonpCallback ] = previous;
                }
                if( callback && $.isFunction( callback ) ){
                    callback( response );
                }
            };

            script = document.createElement( "script" );

            //TODO: having an issue with async info requests
            if( undefined !== options.async || false !== options.async ){
                script.async = "async";
            }

            if ( options.scriptCharset ) {
                script.charset = options.scriptCharset;
            }

            script.src = url;

            // Attach handlers for all browsers
            script.onload = script.onreadystatechange = function( _, isAbort ) {

                if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

                    // Handle memory leak in IE
                    script.onload = script.onreadystatechange = null;

                    // Remove the script
                    if ( head && script.parentNode ) {
                        head.removeChild( script );
                    }

                    // Dereference the script
                    script = undefined;
                }
            };
            // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
            // This arises when a base node is used (#2709 and #4378).
            head.insertBefore( script, head.firstChild );

        },


        /**
         * Fully deprecated. Will throw an error.
         * @function
         * @deprecated use {@link OpenSeadragon.Viewer#open}
         */
        createFromDZI: function() {
            throw "OpenSeadragon.createFromDZI is deprecated, use Viewer.open.";
        },

        /**
         * Parses an XML string into a DOM Document.
         * @function
         * @param {String} string
         * @returns {Document}
         */
        parseXml: function( string ) {
            if ( window.DOMParser ) {

                $.parseXml = function( string ) {
                    var xmlDoc = null,
                        parser;

                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString( string, "text/xml" );
                    return xmlDoc;
                };

            } else if ( window.ActiveXObject ) {

                $.parseXml = function( string ) {
                    var xmlDoc = null;

                    xmlDoc = new ActiveXObject( "Microsoft.XMLDOM" );
                    xmlDoc.async = false;
                    xmlDoc.loadXML( string );
                    return xmlDoc;
                };

            } else {
                throw new Error( "Browser doesn't support XML DOM." );
            }

            return $.parseXml( string );
        },

        /**
         * Parses a JSON string into a Javascript object.
         * @function
         * @param {String} string
         * @returns {Object}
         */
        parseJSON: function(string) {
            $.parseJSON = window.JSON.parse;
            return $.parseJSON(string);
        },

        /**
         * Reports whether the image format is supported for tiling in this
         * version.
         * @function
         * @param {String} [extension]
         * @returns {Boolean}
         */
        imageFormatSupported: function( extension ) {
            extension = extension ? extension : "";
            // eslint-disable-next-line no-use-before-define
            return !!FILEFORMATS[ extension.toLowerCase() ];
        },

        /**
         * Updates supported image formats with user-specified values.
         * Preexisting formats that are not being updated are left unchanged.
         * By default, the defined formats are
         * <pre><code>{
         *      bmp:  false,
         *      jpeg: true,
         *      jpg:  true,
         *      png:  true,
         *      tif:  false,
         *      wdp:  false
         * }
         * </code></pre>
         * @function
         * @example
         * // sets webp as supported and png as unsupported
         * setImageFormatsSupported({webp: true, png: false});
         * @param {Object} formats An object containing format extensions as
         * keys and booleans as values.
         */
        setImageFormatsSupported: function(formats) {
            // eslint-disable-next-line no-use-before-define
            $.extend(FILEFORMATS, formats);
        }

    });


    //TODO: $.console is often used inside a try/catch block which generally
    //      prevents allowings errors to occur with detection until a debugger
    //      is attached.  Although I've been guilty of the same anti-pattern
    //      I eventually was convinced that errors should naturally propagate in
    //      all but the most special cases.
    /**
     * A convenient alias for console when available, and a simple null
     * function when console is unavailable.
     * @static
     * @private
     */
    var nullfunction = function( msg ){
        //document.location.hash = msg;
    };

    $.console = window.console || {
        log:    nullfunction,
        debug:  nullfunction,
        info:   nullfunction,
        warn:   nullfunction,
        error:  nullfunction,
        assert: nullfunction
    };


    /**
     * The current browser vendor, version, and related information regarding detected features.
     * @member {Object} Browser
     * @memberof OpenSeadragon
     * @static
     * @type {Object}
     * @property {OpenSeadragon.BROWSERS} vendor - One of the {@link OpenSeadragon.BROWSERS} enumeration values.
     * @property {Number} version
     * @property {Boolean} alpha - Does the browser support image alpha transparency.
     */
    $.Browser = {
        vendor:     $.BROWSERS.UNKNOWN,
        version:    0,
        alpha:      true
    };


    var FILEFORMATS = {
            bmp:  false,
            jpeg: true,
            jpg:  true,
            png:  true,
            tif:  false,
            wdp:  false
        },
        URLPARAMS = {};

    (function() {
        //A small auto-executing routine to determine the browser vendor,
        //version and supporting feature sets.
        var ver = navigator.appVersion,
            ua  = navigator.userAgent,
            regex;

        //console.error( 'appName: ' + navigator.appName );
        //console.error( 'appVersion: ' + navigator.appVersion );
        //console.error( 'userAgent: ' + navigator.userAgent );

        switch( navigator.appName ){
            case "Microsoft Internet Explorer":
                if( !!window.attachEvent &&
                    !!window.ActiveXObject ) {

                    $.Browser.vendor = $.BROWSERS.IE;
                    $.Browser.version = parseFloat(
                        ua.substring(
                            ua.indexOf( "MSIE" ) + 5,
                            ua.indexOf( ";", ua.indexOf( "MSIE" ) ) )
                        );
                }
                break;
            case "Netscape":
                if (window.addEventListener) {
                    if ( ua.indexOf( "Edge" ) >= 0 ) {
                        $.Browser.vendor = $.BROWSERS.EDGE;
                        $.Browser.version = parseFloat(
                            ua.substring( ua.indexOf( "Edge" ) + 5 )
                        );
                    } else if ( ua.indexOf( "Edg" ) >= 0 ) {
                        $.Browser.vendor = $.BROWSERS.CHROMEEDGE;
                        $.Browser.version = parseFloat(
                            ua.substring( ua.indexOf( "Edg" ) + 4 )
                        );
                    } else if ( ua.indexOf( "Firefox" ) >= 0 ) {
                        $.Browser.vendor = $.BROWSERS.FIREFOX;
                        $.Browser.version = parseFloat(
                            ua.substring( ua.indexOf( "Firefox" ) + 8 )
                        );
                    } else if ( ua.indexOf( "Safari" ) >= 0 ) {
                        $.Browser.vendor = ua.indexOf( "Chrome" ) >= 0 ?
                            $.BROWSERS.CHROME :
                            $.BROWSERS.SAFARI;
                        $.Browser.version = parseFloat(
                            ua.substring(
                                ua.substring( 0, ua.indexOf( "Safari" ) ).lastIndexOf( "/" ) + 1,
                                ua.indexOf( "Safari" )
                            )
                        );
                    } else {
                        regex = new RegExp( "Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
                        if ( regex.exec( ua ) !== null ) {
                            $.Browser.vendor = $.BROWSERS.IE;
                            $.Browser.version = parseFloat( RegExp.$1 );
                        }
                    }
                }
                break;
            case "Opera":
                $.Browser.vendor = $.BROWSERS.OPERA;
                $.Browser.version = parseFloat( ver );
                break;
        }

            // ignore '?' portion of query string
        var query = window.location.search.substring( 1 ),
            parts = query.split('&'),
            part,
            sep,
            i;

        for ( i = 0; i < parts.length; i++ ) {
            part = parts[ i ];
            sep  = part.indexOf( '=' );

            if ( sep > 0 ) {
                var key = part.substring( 0, sep ),
                    value = part.substring( sep + 1 );
                try {
                    URLPARAMS[ key ] = decodeURIComponent( value );
                } catch (e) {
                    $.console.error( "Ignoring malformed URL parameter: %s=%s", key, value );
                }
            }
        }

        //determine if this browser supports image alpha transparency
        $.Browser.alpha = !(
            $.Browser.vendor === $.BROWSERS.CHROME && $.Browser.version < 2
        );

        //determine if this browser supports element.style.opacity
        $.Browser.opacity = true;

        if ( $.Browser.vendor === $.BROWSERS.IE && $.Browser.version < 11 ) {
            $.console.error('Internet Explorer versions < 11 are not supported by OpenSeadragon');
        }
    })();


    // Adding support for HTML5's requestAnimationFrame as suggested by acdha.
    // Implementation taken from matt synder's post here:
    // http://mattsnider.com/cross-browser-and-legacy-supported-requestframeanimation/
    (function( w ) {

        // most browsers have an implementation
        var requestAnimationFrame = w.requestAnimationFrame ||
            w.mozRequestAnimationFrame ||
            w.webkitRequestAnimationFrame ||
            w.msRequestAnimationFrame;

        var cancelAnimationFrame = w.cancelAnimationFrame ||
            w.mozCancelAnimationFrame ||
            w.webkitCancelAnimationFrame ||
            w.msCancelAnimationFrame;

        // polyfill, when necessary
        if ( requestAnimationFrame && cancelAnimationFrame ) {
            // We can't assign these window methods directly to $ because they
            // expect their "this" to be "window", so we call them in wrappers.
            $.requestAnimationFrame = function(){
                return requestAnimationFrame.apply( w, arguments );
            };
            $.cancelAnimationFrame = function(){
                return cancelAnimationFrame.apply( w, arguments );
            };
        } else {
            var aAnimQueue = [],
                processing = [],
                iRequestId = 0,
                iIntervalId;

            // create a mock requestAnimationFrame function
            $.requestAnimationFrame = function( callback ) {
                aAnimQueue.push( [ ++iRequestId, callback ] );

                if ( !iIntervalId ) {
                    iIntervalId = setInterval( function() {
                        if ( aAnimQueue.length ) {
                            var time = $.now();
                            // Process all of the currently outstanding frame
                            // requests, but none that get added during the
                            // processing.
                            // Swap the arrays so we don't have to create a new
                            // array every frame.
                            var temp = processing;
                            processing = aAnimQueue;
                            aAnimQueue = temp;
                            while ( processing.length ) {
                                processing.shift()[ 1 ]( time );
                            }
                        } else {
                            // don't continue the interval, if unnecessary
                            clearInterval( iIntervalId );
                            iIntervalId = undefined;
                        }
                    }, 1000 / 50);  // estimating support for 50 frames per second
                }

                return iRequestId;
            };

            // create a mock cancelAnimationFrame function
            $.cancelAnimationFrame = function( requestId ) {
                // find the request ID and remove it
                var i, j;
                for ( i = 0, j = aAnimQueue.length; i < j; i += 1 ) {
                    if ( aAnimQueue[ i ][ 0 ] === requestId ) {
                        aAnimQueue.splice( i, 1 );
                        return;
                    }
                }

                // If it's not in the queue, it may be in the set we're currently
                // processing (if cancelAnimationFrame is called from within a
                // requestAnimationFrame callback).
                for ( i = 0, j = processing.length; i < j; i += 1 ) {
                    if ( processing[ i ][ 0 ] === requestId ) {
                        processing.splice( i, 1 );
                        return;
                    }
                }
            };
        }
    })( window );

    /**
     * @private
     * @inner
     * @function
     * @param {Element} element
     * @param {Boolean} [isFixed]
     * @returns {Element}
     */
    function getOffsetParent( element, isFixed ) {
        if ( isFixed && element !== document.body ) {
            return document.body;
        } else {
            return element.offsetParent;
        }
    }

}(OpenSeadragon));


// Universal Module Definition, supports CommonJS, AMD and simple script tag
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // expose as amd module
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // expose as commonjs module
        module.exports = factory();
    } else {
        // expose as window.OpenSeadragon
        root.OpenSeadragon = factory();
    }
}(this, function () {
    return OpenSeadragon;
}));

/*
 * OpenSeadragon - full-screen support functions
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ) {
    /**
     * Determine native full screen support we can get from the browser.
     * @member fullScreenApi
     * @memberof OpenSeadragon
     * @type {object}
     * @property {Boolean} supportsFullScreen Return true if full screen API is supported.
     * @property {Function} isFullScreen Return true if currently in full screen mode.
     * @property {Function} getFullScreenElement Return the element currently in full screen mode.
     * @property {Function} requestFullScreen Make a request to go in full screen mode.
     * @property {Function} exitFullScreen Make a request to exit full screen mode.
     * @property {Function} cancelFullScreen Deprecated, use exitFullScreen instead.
     * @property {String} fullScreenEventName Event fired when the full screen mode change.
     * @property {String} fullScreenErrorEventName Event fired when a request to go
     * in full screen mode failed.
     */
    var fullScreenApi = {
        supportsFullScreen: false,
        isFullScreen: function() { return false; },
        getFullScreenElement: function() { return null; },
        requestFullScreen: function() {},
        exitFullScreen: function() {},
        cancelFullScreen: function() {},
        fullScreenEventName: '',
        fullScreenErrorEventName: ''
    };

    // check for native support
    if ( document.exitFullscreen ) {
        // W3C standard
        fullScreenApi.supportsFullScreen = true;
        fullScreenApi.getFullScreenElement = function() {
            return document.fullscreenElement;
        };
        fullScreenApi.requestFullScreen = function( element ) {
            return element.requestFullscreen();
        };
        fullScreenApi.exitFullScreen = function() {
            document.exitFullscreen();
        };
        fullScreenApi.fullScreenEventName = "fullscreenchange";
        fullScreenApi.fullScreenErrorEventName = "fullscreenerror";
    } else if ( document.msExitFullscreen ) {
        // IE 11
        fullScreenApi.supportsFullScreen = true;
        fullScreenApi.getFullScreenElement = function() {
            return document.msFullscreenElement;
        };
        fullScreenApi.requestFullScreen = function( element ) {
            return element.msRequestFullscreen();
        };
        fullScreenApi.exitFullScreen = function() {
            document.msExitFullscreen();
        };
        fullScreenApi.fullScreenEventName = "MSFullscreenChange";
        fullScreenApi.fullScreenErrorEventName = "MSFullscreenError";
    } else if ( document.webkitExitFullscreen ) {
        // Recent webkit
        fullScreenApi.supportsFullScreen = true;
        fullScreenApi.getFullScreenElement = function() {
            return document.webkitFullscreenElement;
        };
        fullScreenApi.requestFullScreen = function( element ) {
            return element.webkitRequestFullscreen();
        };
        fullScreenApi.exitFullScreen = function() {
            document.webkitExitFullscreen();
        };
        fullScreenApi.fullScreenEventName = "webkitfullscreenchange";
        fullScreenApi.fullScreenErrorEventName = "webkitfullscreenerror";
    } else if ( document.webkitCancelFullScreen ) {
        // Old webkit
        fullScreenApi.supportsFullScreen = true;
        fullScreenApi.getFullScreenElement = function() {
            return document.webkitCurrentFullScreenElement;
        };
        fullScreenApi.requestFullScreen = function( element ) {
            return element.webkitRequestFullScreen();
        };
        fullScreenApi.exitFullScreen = function() {
            document.webkitCancelFullScreen();
        };
        fullScreenApi.fullScreenEventName = "webkitfullscreenchange";
        fullScreenApi.fullScreenErrorEventName = "webkitfullscreenerror";
    } else if ( document.mozCancelFullScreen ) {
        // Firefox
        fullScreenApi.supportsFullScreen = true;
        fullScreenApi.getFullScreenElement = function() {
            return document.mozFullScreenElement;
        };
        fullScreenApi.requestFullScreen = function( element ) {
            return element.mozRequestFullScreen();
        };
        fullScreenApi.exitFullScreen = function() {
            document.mozCancelFullScreen();
        };
        fullScreenApi.fullScreenEventName = "mozfullscreenchange";
        fullScreenApi.fullScreenErrorEventName = "mozfullscreenerror";
    }
    fullScreenApi.isFullScreen = function() {
        return fullScreenApi.getFullScreenElement() !== null;
    };
    fullScreenApi.cancelFullScreen = function() {
        $.console.error("cancelFullScreen is deprecated. Use exitFullScreen instead.");
        fullScreenApi.exitFullScreen();
    };

    // export api
    $.extend( $, fullScreenApi );

})( OpenSeadragon );

/*
 * OpenSeadragon - EventSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function($){

/**
 * Event handler method signature used by all OpenSeadragon events.
 *
 * @callback EventHandler
 * @memberof OpenSeadragon
 * @param {Object} event - See individual events for event-specific properties.
 */


/**
 * @class EventSource
 * @classdesc For use by classes which want to support custom, non-browser events.
 *
 * @memberof OpenSeadragon
 */
$.EventSource = function() {
    this.events = {};
};

/** @lends OpenSeadragon.EventSource.prototype */
$.EventSource.prototype = {

    /**
     * Add an event handler to be triggered only once (or a given number of times)
     * for a given event.
     * @function
     * @param {String} eventName - Name of event to register.
     * @param {OpenSeadragon.EventHandler} handler - Function to call when event
     * is triggered.
     * @param {Object} [userData=null] - Arbitrary object to be passed unchanged
     * to the handler.
     * @param {Number} [times=1] - The number of times to handle the event
     * before removing it.
     */
    addOnceHandler: function(eventName, handler, userData, times) {
        var self = this;
        times = times || 1;
        var count = 0;
        var onceHandler = function(event) {
            count++;
            if (count === times) {
                self.removeHandler(eventName, onceHandler);
            }
            handler(event);
        };
        this.addHandler(eventName, onceHandler, userData);
    },

    /**
     * Add an event handler for a given event.
     * @function
     * @param {String} eventName - Name of event to register.
     * @param {OpenSeadragon.EventHandler} handler - Function to call when event is triggered.
     * @param {Object} [userData=null] - Arbitrary object to be passed unchanged to the handler.
     */
    addHandler: function ( eventName, handler, userData ) {
        var events = this.events[ eventName ];
        if ( !events ) {
            this.events[ eventName ] = events = [];
        }
        if ( handler && $.isFunction( handler ) ) {
            events[ events.length ] = { handler: handler, userData: userData || null };
        }
    },

    /**
     * Remove a specific event handler for a given event.
     * @function
     * @param {String} eventName - Name of event for which the handler is to be removed.
     * @param {OpenSeadragon.EventHandler} handler - Function to be removed.
     */
    removeHandler: function ( eventName, handler ) {
        var events = this.events[ eventName ],
            handlers = [],
            i;
        if ( !events ) {
            return;
        }
        if ( $.isArray( events ) ) {
            for ( i = 0; i < events.length; i++ ) {
                if ( events[i].handler !== handler ) {
                    handlers.push( events[ i ] );
                }
            }
            this.events[ eventName ] = handlers;
        }
    },

    /**
     * Get the amount of handlers registered for a given event.
     * @param {String} eventName - Name of event to inspect.
     * @returns {number} amount of events
     */
    numberOfHandlers: function (eventName) {
        var events = this.events[ eventName ];
        if ( !events ) {
            return 0;
        }
        return events.length;
    },

    /**
     * Remove all event handlers for a given event type. If no type is given all
     * event handlers for every event type are removed.
     * @function
     * @param {String} eventName - Name of event for which all handlers are to be removed.
     */
    removeAllHandlers: function( eventName ) {
        if ( eventName ){
            this.events[ eventName ] = [];
        } else{
            for ( var eventType in this.events ) {
                this.events[ eventType ] = [];
            }
        }
    },

    /**
     * Get a function which iterates the list of all handlers registered for a given event, calling the handler for each.
     * @function
     * @param {String} eventName - Name of event to get handlers for.
     */
    getHandler: function ( eventName ) {
        var events = this.events[ eventName ];
        if ( !events || !events.length ) {
            return null;
        }
        events = events.length === 1 ?
            [ events[ 0 ] ] :
            Array.apply( null, events );
        return function ( source, args ) {
            var i,
                length = events.length;
            for ( i = 0; i < length; i++ ) {
                if ( events[ i ] ) {
                    args.eventSource = source;
                    args.userData = events[ i ].userData;
                    events[ i ].handler( args );
                }
            }
        };
    },

    /**
     * Trigger an event, optionally passing additional information.
     * @function
     * @param {String} eventName - Name of event to register.
     * @param {Object} eventArgs - Event-specific data.
     */
    raiseEvent: function( eventName, eventArgs ) {
        //uncomment if you want to get a log of all events
        //$.console.log( eventName );
        var handler = this.getHandler( eventName );

        if ( handler ) {
            if ( !eventArgs ) {
                eventArgs = {};
            }

            handler( this, eventArgs );
        }
    }
};

}( OpenSeadragon ));

/*
 * OpenSeadragon - MouseTracker
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ( $ ) {

    // All MouseTracker instances
    var MOUSETRACKERS  = [];

    // dictionary from hash to private properties
    var THIS           = {};


    /**
     * @class MouseTracker
     * @classdesc Provides simplified handling of common pointer device (mouse, touch, pen, etc.) gestures
     *            and keyboard events on a specified element.
     * @memberof OpenSeadragon
     * @param {Object} options
     *      Allows configurable properties to be entirely specified by passing
     *      an options object to the constructor.  The constructor also supports
     *      the original positional arguments 'element', 'clickTimeThreshold',
     *      and 'clickDistThreshold' in that order.
     * @param {Element|String} options.element
     *      A reference to an element or an element id for which the pointer/key
     *      events will be monitored.
     * @param {Boolean} [options.startDisabled=false]
     *      If true, event tracking on the element will not start until
     *      {@link OpenSeadragon.MouseTracker.setTracking|setTracking} is called.
     * @param {Number} options.clickTimeThreshold
     *      The number of milliseconds within which a pointer down-up event combination
     *      will be treated as a click gesture.
     * @param {Number} options.clickDistThreshold
     *      The maximum distance allowed between a pointer down event and a pointer up event
     *      to be treated as a click gesture.
     * @param {Number} options.dblClickTimeThreshold
     *      The number of milliseconds within which two pointer down-up event combinations
     *      will be treated as a double-click gesture.
     * @param {Number} options.dblClickDistThreshold
     *      The maximum distance allowed between two pointer click events
     *      to be treated as a click gesture.
     * @param {Number} [options.stopDelay=50]
     *      The number of milliseconds without pointer move before the stop
     *      event is fired.
     * @param {OpenSeadragon.EventHandler} [options.preProcessEventHandler=null]
     *      An optional handler for controlling DOM event propagation and processing.
     * @param {OpenSeadragon.EventHandler} [options.contextMenuHandler=null]
     *      An optional handler for contextmenu.
     * @param {OpenSeadragon.EventHandler} [options.enterHandler=null]
     *      An optional handler for pointer enter.
     * @param {OpenSeadragon.EventHandler} [options.leaveHandler=null]
     *      An optional handler for pointer leave.
     * @param {OpenSeadragon.EventHandler} [options.exitHandler=null]
     *      An optional handler for pointer leave. <span style="color:red;">Deprecated. Use leaveHandler instead.</span>
     * @param {OpenSeadragon.EventHandler} [options.overHandler=null]
     *      An optional handler for pointer over.
     * @param {OpenSeadragon.EventHandler} [options.outHandler=null]
     *      An optional handler for pointer out.
     * @param {OpenSeadragon.EventHandler} [options.pressHandler=null]
     *      An optional handler for pointer press.
     * @param {OpenSeadragon.EventHandler} [options.nonPrimaryPressHandler=null]
     *      An optional handler for pointer non-primary button press.
     * @param {OpenSeadragon.EventHandler} [options.releaseHandler=null]
     *      An optional handler for pointer release.
     * @param {OpenSeadragon.EventHandler} [options.nonPrimaryReleaseHandler=null]
     *      An optional handler for pointer non-primary button release.
     * @param {OpenSeadragon.EventHandler} [options.moveHandler=null]
     *      An optional handler for pointer move.
     * @param {OpenSeadragon.EventHandler} [options.scrollHandler=null]
     *      An optional handler for mouse wheel scroll.
     * @param {OpenSeadragon.EventHandler} [options.clickHandler=null]
     *      An optional handler for pointer click.
     * @param {OpenSeadragon.EventHandler} [options.dblClickHandler=null]
     *      An optional handler for pointer double-click.
     * @param {OpenSeadragon.EventHandler} [options.dragHandler=null]
     *      An optional handler for the drag gesture.
     * @param {OpenSeadragon.EventHandler} [options.dragEndHandler=null]
     *      An optional handler for after a drag gesture.
     * @param {OpenSeadragon.EventHandler} [options.pinchHandler=null]
     *      An optional handler for the pinch gesture.
     * @param {OpenSeadragon.EventHandler} [options.keyDownHandler=null]
     *      An optional handler for keydown.
     * @param {OpenSeadragon.EventHandler} [options.keyUpHandler=null]
     *      An optional handler for keyup.
     * @param {OpenSeadragon.EventHandler} [options.keyHandler=null]
     *      An optional handler for keypress.
     * @param {OpenSeadragon.EventHandler} [options.focusHandler=null]
     *      An optional handler for focus.
     * @param {OpenSeadragon.EventHandler} [options.blurHandler=null]
     *      An optional handler for blur.
     * @param {Object} [options.userData=null]
     *      Arbitrary object to be passed unchanged to any attached handler methods.
     */
    $.MouseTracker = function ( options ) {

        MOUSETRACKERS.push( this );

        var args = arguments;

        if ( !$.isPlainObject( options ) ) {
            options = {
                element:            args[ 0 ],
                clickTimeThreshold: args[ 1 ],
                clickDistThreshold: args[ 2 ]
            };
        }

        this.hash               = Math.random(); // An unique hash for this tracker.
        /**
         * The element for which pointer events are being monitored.
         * @member {Element} element
         * @memberof OpenSeadragon.MouseTracker#
         */
        this.element            = $.getElement( options.element );
        /**
         * The number of milliseconds within which a pointer down-up event combination
         * will be treated as a click gesture.
         * @member {Number} clickTimeThreshold
         * @memberof OpenSeadragon.MouseTracker#
         */
        this.clickTimeThreshold = options.clickTimeThreshold || $.DEFAULT_SETTINGS.clickTimeThreshold;
        /**
         * The maximum distance allowed between a pointer down event and a pointer up event
         * to be treated as a click gesture.
         * @member {Number} clickDistThreshold
         * @memberof OpenSeadragon.MouseTracker#
         */
        this.clickDistThreshold = options.clickDistThreshold || $.DEFAULT_SETTINGS.clickDistThreshold;
        /**
         * The number of milliseconds within which two pointer down-up event combinations
         * will be treated as a double-click gesture.
         * @member {Number} dblClickTimeThreshold
         * @memberof OpenSeadragon.MouseTracker#
         */
        this.dblClickTimeThreshold = options.dblClickTimeThreshold || $.DEFAULT_SETTINGS.dblClickTimeThreshold;
        /**
         * The maximum distance allowed between two pointer click events
         * to be treated as a double-click gesture.
         * @member {Number} dblClickDistThreshold
         * @memberof OpenSeadragon.MouseTracker#
         */
        this.dblClickDistThreshold = options.dblClickDistThreshold || $.DEFAULT_SETTINGS.dblClickDistThreshold;
        /*eslint-disable no-multi-spaces*/
        this.userData              = options.userData          || null;
        this.stopDelay             = options.stopDelay         || 50;

        this.preProcessEventHandler   = options.preProcessEventHandler   || null;
        this.contextMenuHandler       = options.contextMenuHandler       || null;
        this.enterHandler             = options.enterHandler             || null;
        this.leaveHandler             = options.leaveHandler             || null;
        this.exitHandler              = options.exitHandler              || null; // Deprecated v2.5.0
        this.overHandler              = options.overHandler              || null;
        this.outHandler               = options.outHandler               || null;
        this.pressHandler             = options.pressHandler             || null;
        this.nonPrimaryPressHandler   = options.nonPrimaryPressHandler   || null;
        this.releaseHandler           = options.releaseHandler           || null;
        this.nonPrimaryReleaseHandler = options.nonPrimaryReleaseHandler || null;
        this.moveHandler              = options.moveHandler              || null;
        this.scrollHandler            = options.scrollHandler            || null;
        this.clickHandler             = options.clickHandler             || null;
        this.dblClickHandler          = options.dblClickHandler          || null;
        this.dragHandler              = options.dragHandler              || null;
        this.dragEndHandler           = options.dragEndHandler           || null;
        this.pinchHandler             = options.pinchHandler             || null;
        this.stopHandler              = options.stopHandler              || null;
        this.keyDownHandler           = options.keyDownHandler           || null;
        this.keyUpHandler             = options.keyUpHandler             || null;
        this.keyHandler               = options.keyHandler               || null;
        this.focusHandler             = options.focusHandler             || null;
        this.blurHandler              = options.blurHandler              || null;
        /*eslint-enable no-multi-spaces*/

        //Store private properties in a scope sealed hash map
        var _this = this;

        /**
         * @private
         * @property {Boolean} tracking
         *      Are we currently tracking pointer events for this element.
         */
        THIS[ this.hash ] = {
            click:                 function ( event ) { onClick( _this, event ); },
            dblclick:              function ( event ) { onDblClick( _this, event ); },
            keydown:               function ( event ) { onKeyDown( _this, event ); },
            keyup:                 function ( event ) { onKeyUp( _this, event ); },
            keypress:              function ( event ) { onKeyPress( _this, event ); },
            focus:                 function ( event ) { onFocus( _this, event ); },
            blur:                  function ( event ) { onBlur( _this, event ); },
            contextmenu:           function ( event ) { onContextMenu( _this, event ); },

            wheel:                 function ( event ) { onWheel( _this, event ); },
            mousewheel:            function ( event ) { onMouseWheel( _this, event ); },
            DOMMouseScroll:        function ( event ) { onMouseWheel( _this, event ); },
            MozMousePixelScroll:   function ( event ) { onMouseWheel( _this, event ); },

            losecapture:           function ( event ) { onLoseCapture( _this, event ); },

            mouseenter:            function ( event ) { onPointerEnter( _this, event ); },
            mouseleave:            function ( event ) { onPointerLeave( _this, event ); },
            mouseover:             function ( event ) { onPointerOver( _this, event ); },
            mouseout:              function ( event ) { onPointerOut( _this, event ); },
            mousedown:             function ( event ) { onPointerDown( _this, event ); },
            mouseup:               function ( event ) { onPointerUp( _this, event ); },
            mousemove:             function ( event ) { onPointerMove( _this, event ); },

            touchstart:            function ( event ) { onTouchStart( _this, event ); },
            touchend:              function ( event ) { onTouchEnd( _this, event ); },
            touchmove:             function ( event ) { onTouchMove( _this, event ); },
            touchcancel:           function ( event ) { onTouchCancel( _this, event ); },

            gesturestart:          function ( event ) { onGestureStart( _this, event ); }, // Safari/Safari iOS
            gesturechange:         function ( event ) { onGestureChange( _this, event ); }, // Safari/Safari iOS

            gotpointercapture:     function ( event ) { onGotPointerCapture( _this, event ); },
            lostpointercapture:    function ( event ) { onLostPointerCapture( _this, event ); },
            pointerenter:          function ( event ) { onPointerEnter( _this, event ); },
            pointerleave:          function ( event ) { onPointerLeave( _this, event ); },
            pointerover:           function ( event ) { onPointerOver( _this, event ); },
            pointerout:            function ( event ) { onPointerOut( _this, event ); },
            pointerdown:           function ( event ) { onPointerDown( _this, event ); },
            pointerup:             function ( event ) { onPointerUp( _this, event ); },
            pointermove:           function ( event ) { onPointerMove( _this, event ); },
            pointercancel:         function ( event ) { onPointerCancel( _this, event ); },
            pointerupcaptured:     function ( event ) { onPointerUpCaptured( _this, event ); },
            pointermovecaptured:   function ( event ) { onPointerMoveCaptured( _this, event ); },

            tracking:              false,

            // Active pointers lists. Array of GesturePointList objects, one for each pointer device type.
            // GesturePointList objects are added each time a pointer is tracked by a new pointer device type (see getActivePointersListByType()).
            // Active pointers are any pointer being tracked for this element which are in the hit-test area
            //     of the element (for hover-capable devices) and/or have contact or a button press initiated in the element.
            activePointersLists:   [],

            // Tracking for double-click gesture
            lastClickPos:          null,
            dblClickTimeOut:       null,

            // Tracking for pinch gesture
            pinchGPoints:          [],
            lastPinchDist:         0,
            currentPinchDist:      0,
            lastPinchCenter:       null,
            currentPinchCenter:    null,

            // Tracking for drag
            sentDragEvent:         false
        };

        this.hasGestureHandlers = !!( this.pressHandler || this.nonPrimaryPressHandler ||
                                this.releaseHandler || this.nonPrimaryReleaseHandler ||
                                this.clickHandler || this.dblClickHandler ||
                                this.dragHandler || this.dragEndHandler ||
                                this.pinchHandler );
        this.hasScrollHandler = !!this.scrollHandler;

        if ( $.MouseTracker.havePointerEvents ) {
            $.setElementPointerEvents( this.element, 'auto' );
        }

        if (this.exitHandler) {
            $.console.error("MouseTracker.exitHandler is deprecated. Use MouseTracker.leaveHandler instead.");
        }

        if ( !options.startDisabled ) {
            this.setTracking( true );
        }
    };

    /** @lends OpenSeadragon.MouseTracker.prototype */
    $.MouseTracker.prototype = {

        /**
         * Clean up any events or objects created by the tracker.
         * @function
         */
        destroy: function () {
            var i;

            stopTracking( this );
            this.element = null;

            for ( i = 0; i < MOUSETRACKERS.length; i++ ) {
                if ( MOUSETRACKERS[ i ] === this ) {
                    MOUSETRACKERS.splice( i, 1 );
                    break;
                }
            }

            THIS[ this.hash ] = null;
            delete THIS[ this.hash ];
        },

        /**
         * Are we currently tracking events on this element.
         * @deprecated Just use this.tracking
         * @function
         * @returns {Boolean} Are we currently tracking events on this element.
         */
        isTracking: function () {
            return THIS[ this.hash ].tracking;
        },

        /**
         * Enable or disable whether or not we are tracking events on this element.
         * @function
         * @param {Boolean} track True to start tracking, false to stop tracking.
         * @returns {OpenSeadragon.MouseTracker} Chainable.
         */
        setTracking: function ( track ) {
            if ( track ) {
                startTracking( this );
            } else {
                stopTracking( this );
            }
            //chain
            return this;
        },

        /**
         * Returns the {@link OpenSeadragon.MouseTracker.GesturePointList|GesturePointList} for the given pointer device type,
         * creating and caching a new {@link OpenSeadragon.MouseTracker.GesturePointList|GesturePointList} if one doesn't already exist for the type.
         * @function
         * @param {String} type - The pointer device type: "mouse", "touch", "pen", etc.
         * @returns {OpenSeadragon.MouseTracker.GesturePointList}
         */
        getActivePointersListByType: function ( type ) {
            var delegate = THIS[ this.hash ],
                i,
                len = delegate.activePointersLists.length,
                list;

            for ( i = 0; i < len; i++ ) {
                if ( delegate.activePointersLists[ i ].type === type ) {
                    return delegate.activePointersLists[ i ];
                }
            }

            list = new $.MouseTracker.GesturePointList( type );
            delegate.activePointersLists.push( list );
            return list;
        },

        /**
         * Returns the total number of pointers currently active on the tracked element.
         * @function
         * @returns {Number}
         */
        getActivePointerCount: function () {
            var delegate = THIS[ this.hash ],
                i,
                len = delegate.activePointersLists.length,
                count = 0;

            for ( i = 0; i < len; i++ ) {
                count += delegate.activePointersLists[ i ].getLength();
            }

            return count;
        },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
         */
        preProcessEventHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefault
         *      Set to true to prevent the default user-agent's handling of the contextmenu event.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        contextMenuHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Number} event.pointers
         *      Number of pointers (all types) active in the tracked element.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.buttonDownAny
         *      Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        enterHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @since v2.5.0
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Number} event.pointers
         *      Number of pointers (all types) active in the tracked element.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.buttonDownAny
         *      Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        leaveHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @deprecated v2.5.0 Use leaveHandler instead
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Number} event.pointers
         *      Number of pointers (all types) active in the tracked element.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.buttonDownAny
         *      Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        exitHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @since v2.5.0
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Number} event.pointers
         *      Number of pointers (all types) active in the tracked element.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.buttonDownAny
         *      Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        overHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @since v2.5.0
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Number} event.pointers
         *      Number of pointers (all types) active in the tracked element.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.buttonDownAny
         *      Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        outHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        pressHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.button
         *      Button which caused the event.
         *      -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        nonPrimaryPressHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.insideElementReleased
         *      True if the cursor inside the tracked element when the button was released.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        releaseHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.button
         *      Button which caused the event.
         *      -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        nonPrimaryReleaseHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        moveHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.scroll
         *      The scroll delta for the event.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead. Touch devices no longer generate scroll event.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefault
         *      Set to true to prevent the default user-agent's handling of the wheel event.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        scrollHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Boolean} event.quick
         *      True only if the clickDistThreshold and clickTimeThreshold are both passed. Useful for ignoring drag events.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Element} event.originalTarget
         *      The DOM element clicked on.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        clickHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        dblClickHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {OpenSeadragon.Point} event.delta
         *      The x,y components of the difference between the current position and the last drag event position.  Useful for ignoring or weighting the events.
         * @param {Number} event.speed
         *     Current computed speed, in pixels per second.
         * @param {Number} event.direction
         *     Current computed direction, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        dragHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.speed
         *     Speed at the end of a drag gesture, in pixels per second.
         * @param {Number} event.direction
         *     Direction at the end of a drag gesture, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        dragEndHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {Array.<OpenSeadragon.MouseTracker.GesturePoint>} event.gesturePoints
         *      Gesture points associated with the gesture. Velocity data can be found here.
         * @param {OpenSeadragon.Point} event.lastCenter
         *      The previous center point of the two pinch contact points relative to the tracked element.
         * @param {OpenSeadragon.Point} event.center
         *      The center point of the two pinch contact points relative to the tracked element.
         * @param {Number} event.lastDistance
         *      The previous distance between the two pinch contact points in CSS pixels.
         * @param {Number} event.distance
         *      The distance between the two pinch contact points in CSS pixels.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        pinchHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        stopHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Number} event.keyCode
         *      The key code that was pressed.
         * @param {Boolean} event.ctrl
         *      True if the ctrl key was pressed during this event.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.alt
         *      True if the alt key was pressed during this event.
         * @param {Boolean} event.meta
         *      True if the meta key was pressed during this event.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefault
         *      Set to true to prevent the default user-agent's handling of the keydown event.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        keyDownHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Number} event.keyCode
         *      The key code that was pressed.
         * @param {Boolean} event.ctrl
         *      True if the ctrl key was pressed during this event.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.alt
         *      True if the alt key was pressed during this event.
         * @param {Boolean} event.meta
         *      True if the meta key was pressed during this event.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefault
         *      Set to true to prevent the default user-agent's handling of the keyup event.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        keyUpHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Number} event.keyCode
         *      The key code that was pressed.
         * @param {Boolean} event.ctrl
         *      True if the ctrl key was pressed during this event.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.alt
         *      True if the alt key was pressed during this event.
         * @param {Boolean} event.meta
         *      True if the meta key was pressed during this event.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefault
         *      Set to true to prevent the default user-agent's handling of the keypress event.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        keyHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        focusHandler: function () { },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        blurHandler: function () { }
    };

    // https://github.com/openseadragon/openseadragon/pull/790
    /**
     * True if inside an iframe, otherwise false.
     * @member {Boolean} isInIframe
     * @private
     * @inner
     */
    var isInIframe = (function() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    })();

    // https://github.com/openseadragon/openseadragon/pull/790
    /**
     * @function
     * @private
     * @inner
     * @returns {Boolean} True if the target supports DOM Level 2 event subscription methods, otherwise false.
     */
    function canAccessEvents (target) {
        try {
            return target.addEventListener && target.removeEventListener;
        } catch (e) {
            return false;
        }
    }

    /**
     * Provides continuous computation of velocity (speed and direction) of active pointers.
     * This is a singleton, used by all MouseTracker instances, as it is unlikely there will ever be more than
     * two active gesture pointers at a time.
     *
     * @private
     * @member gesturePointVelocityTracker
     * @memberof OpenSeadragon.MouseTracker
     */
    $.MouseTracker.gesturePointVelocityTracker = (function () {
        var trackerPoints = [],
            intervalId = 0,
            lastTime = 0;

        // Generates a unique identifier for a tracked gesture point
        var _generateGuid = function ( tracker, gPoint ) {
            return tracker.hash.toString() + gPoint.type + gPoint.id.toString();
        };

        // Interval timer callback. Computes velocity for all tracked gesture points.
        var _doTracking = function () {
            var i,
                len = trackerPoints.length,
                trackPoint,
                gPoint,
                now = $.now(),
                elapsedTime,
                distance,
                speed;

            elapsedTime = now - lastTime;
            lastTime = now;

            for ( i = 0; i < len; i++ ) {
                trackPoint = trackerPoints[ i ];
                gPoint = trackPoint.gPoint;
                // Math.atan2 gives us just what we need for a velocity vector, as we can simply
                //   use cos()/sin() to extract the x/y velocity components.
                gPoint.direction = Math.atan2( gPoint.currentPos.y - trackPoint.lastPos.y, gPoint.currentPos.x - trackPoint.lastPos.x );
                // speed = distance / elapsed time
                distance = trackPoint.lastPos.distanceTo( gPoint.currentPos );
                trackPoint.lastPos = gPoint.currentPos;
                speed = 1000 * distance / ( elapsedTime + 1 );
                // Simple biased average, favors the most recent speed computation. Smooths out erratic gestures a bit.
                gPoint.speed = 0.75 * speed + 0.25 * gPoint.speed;
            }
        };

        // Public. Add a gesture point to be tracked
        var addPoint = function ( tracker, gPoint ) {
            var guid = _generateGuid( tracker, gPoint );

            trackerPoints.push(
                {
                    guid: guid,
                    gPoint: gPoint,
                    lastPos: gPoint.currentPos
                } );

            // Only fire up the interval timer when there's gesture pointers to track
            if ( trackerPoints.length === 1 ) {
                lastTime = $.now();
                intervalId = window.setInterval( _doTracking, 50 );
            }
        };

        // Public. Stop tracking a gesture point
        var removePoint = function ( tracker, gPoint ) {
            var guid = _generateGuid( tracker, gPoint ),
                i,
                len = trackerPoints.length;
            for ( i = 0; i < len; i++ ) {
                if ( trackerPoints[ i ].guid === guid ) {
                    trackerPoints.splice( i, 1 );
                    // Only run the interval timer if theres gesture pointers to track
                    len--;
                    if ( len === 0 ) {
                        window.clearInterval( intervalId );
                    }
                    break;
                }
            }
        };

        return {
            addPoint:    addPoint,
            removePoint: removePoint
        };
    } )();


///////////////////////////////////////////////////////////////////////////////
// Pointer event model and feature detection
///////////////////////////////////////////////////////////////////////////////

    $.MouseTracker.captureElement = document;

    /**
     * Detect available mouse wheel event name.
     */
    $.MouseTracker.wheelEventName = ( $.Browser.vendor === $.BROWSERS.IE && $.Browser.version > 8 ) ||
                                                ( 'onwheel' in document.createElement( 'div' ) ) ? 'wheel' : // Modern browsers support 'wheel'
                                    document.onmousewheel !== undefined ? 'mousewheel' :                     // Webkit and IE support at least 'mousewheel'
                                    'DOMMouseScroll';                                                        // Assume old Firefox

    /**
     * Detect browser pointer device event model(s) and build appropriate list of events to subscribe to.
     */
    $.MouseTracker.subscribeEvents = [ "click", "dblclick", "keydown", "keyup", "keypress", "focus", "blur", "contextmenu", $.MouseTracker.wheelEventName ];

    if( $.MouseTracker.wheelEventName === "DOMMouseScroll" ) {
        // Older Firefox
        $.MouseTracker.subscribeEvents.push( "MozMousePixelScroll" );
    }

    if ( window.PointerEvent ) {
        // IE11 and other W3C Pointer Event implementations (see http://www.w3.org/TR/pointerevents)
        $.MouseTracker.havePointerEvents = true;
        $.MouseTracker.subscribeEvents.push( "pointerenter", "pointerleave", "pointerover", "pointerout", "pointerdown", "pointerup", "pointermove", "pointercancel" );
        // Pointer events capture support
        $.MouseTracker.havePointerCapture = (function () {
            var divElement = document.createElement( 'div' );
            return $.isFunction( divElement.setPointerCapture ) && $.isFunction( divElement.releasePointerCapture );
        }());
        if ( $.MouseTracker.havePointerCapture ) {
            $.MouseTracker.subscribeEvents.push( "gotpointercapture", "lostpointercapture" );
        }
    } else {
        // Legacy W3C mouse events
        $.MouseTracker.havePointerEvents = false;
        $.MouseTracker.subscribeEvents.push( "mouseenter", "mouseleave", "mouseover", "mouseout", "mousedown", "mouseup", "mousemove" );
        $.MouseTracker.mousePointerId = "legacy-mouse";
        // Legacy mouse events capture support (IE/Firefox only?)
        $.MouseTracker.havePointerCapture = (function () {
            var divElement = document.createElement( 'div' );
            return $.isFunction( divElement.setCapture ) && $.isFunction( divElement.releaseCapture );
        }());
        if ( $.MouseTracker.havePointerCapture ) {
            $.MouseTracker.subscribeEvents.push( "losecapture" );
        }
        // Legacy touch events
        if ( 'ontouchstart' in window ) {
            // iOS, Android, and other W3c Touch Event implementations
            //    (see http://www.w3.org/TR/touch-events/)
            //    (see https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html)
            //    (see https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html)
            $.MouseTracker.subscribeEvents.push( "touchstart", "touchend", "touchmove", "touchcancel" );
        }
        if ( 'ongesturestart' in window ) {
            // iOS (see https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html)
            //   Subscribe to these to prevent default gesture handling
            $.MouseTracker.subscribeEvents.push( "gesturestart", "gesturechange" );
        }
    }


///////////////////////////////////////////////////////////////////////////////
// Classes and typedefs
///////////////////////////////////////////////////////////////////////////////

    /**
     * Used for the processing/disposition of DOM events (propagation, default handling, capture, etc.)
     *
     * @typedef {Object} EventProcessInfo
     * @memberof OpenSeadragon.MouseTracker
     * @since v2.5.0
     *
     * @property {OpenSeadragon.MouseTracker} eventSource
     *      A reference to the tracker instance.
     * @property {Object} originalEvent
     *      The original DOM event object.
     * @property {Number} eventPhase
     *      0 == NONE, 1 == CAPTURING_PHASE, 2 == AT_TARGET, 3 == BUBBLING_PHASE.
     * @property {String} eventType
     *     "keydown", "keyup", "keypress", "focus", "blur", "contextmenu", "gotpointercapture", "lostpointercapture", "pointerenter", "pointerleave", "pointerover", "pointerout", "pointerdown", "pointerup", "pointermove", "pointercancel", "wheel", "click", "dblclick".
     * @property {String} pointerType
     *     "mouse", "touch", "pen", etc.
     * @property {Boolean} isEmulated
     *      True if this is an emulated event. If true, originalEvent is either the event that caused
     *      the emulated event, a synthetic event object created with values from the actual DOM event,
     *      or null if no DOM event applies. Emulated events can occur on eventType "wheel" on legacy mouse-scroll
     *      event emitting user agents.
     * @property {Boolean} isStoppable
     *      True if propagation of the event (e.g. bubbling) can be stopped with stopPropagation/stopImmediatePropagation.
     * @property {Boolean} isCancelable
     *      True if the event's default handling by the browser can be prevented with preventDefault.
     * @property {Boolean} defaultPrevented
     *      True if the event's default handling has already been prevented by a descendent element.
     * @property {Boolean} preventDefault
     *      Set to true to prevent the event's default handling by the browser.
     * @property {Boolean} preventGesture
     *      Set to true to prevent this MouseTracker from generating a gesture from the event.
     *      Valid on eventType "pointerdown".
     * @property {Boolean} stopPropagation
     *      Set to true prevent the event from propagating to ancestor/descendent elements on capture/bubble phase.
     * @property {Boolean} shouldCapture
     *      (Internal Use) Set to true if the pointer should be captured (events (re)targeted to tracker element).
     * @property {Boolean} shouldReleaseCapture
     *      (Internal Use) Set to true if the captured pointer should be released.
     * @property {Object} userData
     *      Arbitrary user-defined object.
     */


    /**
     * Represents a point of contact on the screen made by a mouse cursor, pen, touch, or other pointer device.
     *
     * @typedef {Object} GesturePoint
     * @memberof OpenSeadragon.MouseTracker
     *
     * @property {Number} id
     *     Identifier unique from all other active GesturePoints for a given pointer device.
     * @property {String} type
     *     The pointer device type: "mouse", "touch", "pen", etc.
     * @property {Boolean} captured
     *     True if events for the gesture point are captured to the tracked element.
     * @property {Boolean} isPrimary
     *     True if the gesture point is a master pointer amongst the set of active pointers for each pointer type. True for mouse and primary (first) touch/pen pointers.
     * @property {Boolean} insideElementPressed
     *     True if button pressed or contact point initiated inside the screen area of the tracked element.
     * @property {Boolean} insideElement
     *     True if pointer or contact point is currently inside the bounds of the tracked element.
     * @property {Number} speed
     *     Current computed speed, in pixels per second.
     * @property {Number} direction
     *     Current computed direction, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
     * @property {OpenSeadragon.Point} contactPos
     *     The initial pointer contact position, relative to the page including any scrolling. Only valid if the pointer has contact (pressed, touch contact, pen contact).
     * @property {Number} contactTime
     *     The initial pointer contact time, in milliseconds. Only valid if the pointer has contact (pressed, touch contact, pen contact).
     * @property {OpenSeadragon.Point} lastPos
     *     The last pointer position, relative to the page including any scrolling.
     * @property {Number} lastTime
     *     The last pointer contact time, in milliseconds.
     * @property {OpenSeadragon.Point} currentPos
     *     The current pointer position, relative to the page including any scrolling.
     * @property {Number} currentTime
     *     The current pointer contact time, in milliseconds.
     */


    /**
     * @class GesturePointList
     * @classdesc Provides an abstraction for a set of active {@link OpenSeadragon.MouseTracker.GesturePoint|GesturePoint} objects for a given pointer device type.
     *            Active pointers are any pointer being tracked for this element which are in the hit-test area
     *            of the element (for hover-capable devices) and/or have contact or a button press initiated in the element.
     * @memberof OpenSeadragon.MouseTracker
     * @param {String} type - The pointer device type: "mouse", "touch", "pen", etc.
     */
    $.MouseTracker.GesturePointList = function ( type ) {
        this._gPoints = [];
        /**
         * The pointer device type: "mouse", "touch", "pen", etc.
         * @member {String} type
         * @memberof OpenSeadragon.MouseTracker.GesturePointList#
         */
        this.type = type;
        /**
         * Current buttons pressed for the device.
         * Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @member {Number} buttons
         * @memberof OpenSeadragon.MouseTracker.GesturePointList#
         */
        this.buttons = 0;
        /**
         * Current number of contact points (touch points, mouse down, etc.) for the device.
         * @member {Number} contacts
         * @memberof OpenSeadragon.MouseTracker.GesturePointList#
         */
        this.contacts = 0;
        /**
         * Current number of clicks for the device. Used for multiple click gesture tracking.
         * @member {Number} clicks
         * @memberof OpenSeadragon.MouseTracker.GesturePointList#
         */
        this.clicks = 0;
        /**
         * Current number of captured pointers for the device.
         * @member {Number} captureCount
         * @memberof OpenSeadragon.MouseTracker.GesturePointList#
         */
        this.captureCount = 0;
    };

    /** @lends OpenSeadragon.MouseTracker.GesturePointList.prototype */
    $.MouseTracker.GesturePointList.prototype = {
        /**
         * @function
         * @returns {Number} Number of gesture points in the list.
         */
        getLength: function () {
            return this._gPoints.length;
        },
        /**
         * @function
         * @returns {Array.<OpenSeadragon.MouseTracker.GesturePoint>} The list of gesture points in the list as an array (read-only).
         */
        asArray: function () {
            return this._gPoints;
        },
        /**
         * @function
         * @param {OpenSeadragon.MouseTracker.GesturePoint} gesturePoint - A gesture point to add to the list.
         * @returns {Number} Number of gesture points in the list.
         */
        add: function ( gp ) {
            return this._gPoints.push( gp );
        },
        /**
         * @function
         * @param {Number} id - The id of the gesture point to remove from the list.
         * @returns {Number} Number of gesture points in the list.
         */
        removeById: function ( id ) {
            var i,
                len = this._gPoints.length;
            for ( i = 0; i < len; i++ ) {
                if ( this._gPoints[ i ].id === id ) {
                    this._gPoints.splice( i, 1 );
                    break;
                }
            }
            return this._gPoints.length;
        },
        /**
         * @function
         * @param {Number} index - The index of the gesture point to retrieve from the list.
         * @returns {OpenSeadragon.MouseTracker.GesturePoint|null} The gesture point at the given index, or null if not found.
         */
        getByIndex: function ( index ) {
            if ( index < this._gPoints.length) {
                return this._gPoints[ index ];
            }

            return null;
        },
        /**
         * @function
         * @param {Number} id - The id of the gesture point to retrieve from the list.
         * @returns {OpenSeadragon.MouseTracker.GesturePoint|null} The gesture point with the given id, or null if not found.
         */
        getById: function ( id ) {
            var i,
                len = this._gPoints.length;
            for ( i = 0; i < len; i++ ) {
                if ( this._gPoints[ i ].id === id ) {
                    return this._gPoints[ i ];
                }
            }
            return null;
        },
        /**
         * @function
         * @returns {OpenSeadragon.MouseTracker.GesturePoint|null} The primary gesture point in the list, or null if not found.
         */
        getPrimary: function ( id ) {
            var i,
                len = this._gPoints.length;
            for ( i = 0; i < len; i++ ) {
                if ( this._gPoints[ i ].isPrimary ) {
                    return this._gPoints[ i ];
                }
            }
            return null;
        },

        /**
         * Increment this pointer list's contact count.
         * It will evaluate whether this pointer type is allowed to have multiple contacts.
         * @function
         */
        addContact: function() {
            ++this.contacts;

            if (this.contacts > 1 && (this.type === "mouse" || this.type === "pen")) {
                $.console.warn('GesturePointList.addContact() Implausible contacts value');
                this.contacts = 1;
            }
        },

        /**
         * Decrement this pointer list's contact count.
         * It will make sure the count does not go below 0.
         * @function
         */
        removeContact: function() {
            --this.contacts;

            if (this.contacts < 0) {
                this.contacts = 0;
            }
        }
    };


///////////////////////////////////////////////////////////////////////////////
// Utility functions
///////////////////////////////////////////////////////////////////////////////

    /**
     * Removes all tracked pointers.
     * @private
     * @inner
     */
    function clearTrackedPointers( tracker ) {
        var delegate = THIS[ tracker.hash ],
            i, j,
            pointsList,
            gPoints,
            gPointsToRemove,
            pointerListCount = delegate.activePointersLists.length;

        for ( i = 0; i < pointerListCount; i++ ) {
            pointsList = delegate.activePointersLists[ i ];

            if ( pointsList.getLength() > 0 ) {
                // Make an array containing references to the gPoints in the pointer list
                //   (because calls to stopTrackingPointer() are going to modify the pointer list)
                gPointsToRemove = [];
                gPoints = pointsList.asArray();
                for ( j = 0; j < gPoints.length; j++ ) {
                    gPointsToRemove.push( gPoints[ j ] );
                }

                // Release and remove all gPoints from the pointer list
                for ( j = 0; j < gPointsToRemove.length; j++ ) {
                    stopTrackingPointer( tracker, pointsList, gPointsToRemove[ j ] );
                }
            }
        }

        for ( i = 0; i < pointerListCount; i++ ) {
            delegate.activePointersLists.pop();
        }

        delegate.sentDragEvent = false;
    }

    /**
     * Starts tracking pointer events on the tracked element.
     * @private
     * @inner
     */
    function startTracking( tracker ) {
        var delegate = THIS[ tracker.hash ],
            event,
            i;

        if ( !delegate.tracking ) {
            for ( i = 0; i < $.MouseTracker.subscribeEvents.length; i++ ) {
                event = $.MouseTracker.subscribeEvents[ i ];
                $.addEvent(
                    tracker.element,
                    event,
                    delegate[ event ],
                    event === $.MouseTracker.wheelEventName ? { passive: true, capture: false } : false
                );
            }

            clearTrackedPointers( tracker );

            delegate.tracking = true;
        }
    }

    /**
     * Stops tracking pointer events on the tracked element.
     * @private
     * @inner
     */
    function stopTracking( tracker ) {
        var delegate = THIS[ tracker.hash ],
            event,
            i;

        if ( delegate.tracking ) {
            for ( i = 0; i < $.MouseTracker.subscribeEvents.length; i++ ) {
                event = $.MouseTracker.subscribeEvents[ i ];
                $.removeEvent(
                    tracker.element,
                    event,
                    delegate[ event ],
                    false
                );
            }

            clearTrackedPointers( tracker );

            delegate.tracking = false;
        }
    }

    /**
     * @private
     * @inner
     */
    function getCaptureEventParams( tracker, pointerType ) {
        var delegate = THIS[ tracker.hash ];

        if ( pointerType === 'pointerevent' ) {
            return {
                upName: 'pointerup',
                upHandler: delegate.pointerupcaptured,
                moveName: 'pointermove',
                moveHandler: delegate.pointermovecaptured
            };
        } else if ( pointerType === 'mouse' ) {
            return {
                upName: 'pointerup',
                upHandler: delegate.pointerupcaptured,
                moveName: 'pointermove',
                moveHandler: delegate.pointermovecaptured
            };
        } else if ( pointerType === 'touch' ) {
            return {
                upName: 'touchend',
                upHandler: delegate.touchendcaptured,
                moveName: 'touchmove',
                moveHandler: delegate.touchmovecaptured
            };
        } else {
            throw new Error( "MouseTracker.getCaptureEventParams: Unknown pointer type." );
        }
    }

    /**
     * Begin capturing pointer events to the tracked element.
     * @private
     * @inner
     */
    function capturePointer( tracker, gPoint ) {
        var eventParams;

        if ( $.MouseTracker.havePointerCapture ) {
            if ( $.MouseTracker.havePointerEvents ) {
                // Can throw NotFoundError (InvalidPointerId Firefox < 82)
                //   (should never happen so we'll log a warning)
                try {
                    tracker.element.setPointerCapture( gPoint.id );
                    //$.console.log('element.setPointerCapture() called');
                } catch ( e ) {
                    $.console.warn('setPointerCapture() called on invalid pointer ID');
                    return;
                }
            } else {
                tracker.element.setCapture( true );
                //$.console.log('element.setCapture() called');
            }
        } else {
            // Emulate mouse capture by hanging listeners on the document object.
            //    (Note we listen on the capture phase so the captured handlers will get called first)
            // eslint-disable-next-line no-use-before-define
            //$.console.log('Emulated mouse capture set');
            eventParams = getCaptureEventParams( tracker, $.MouseTracker.havePointerEvents ? 'pointerevent' : gPoint.type );
            // https://github.com/openseadragon/openseadragon/pull/790
            if (isInIframe && canAccessEvents(window.top)) {
                $.addEvent(
                    window.top,
                    eventParams.upName,
                    eventParams.upHandler,
                    true
                );
            }
            $.addEvent(
                $.MouseTracker.captureElement,
                eventParams.upName,
                eventParams.upHandler,
                true
            );
            $.addEvent(
                $.MouseTracker.captureElement,
                eventParams.moveName,
                eventParams.moveHandler,
                true
            );
        }

        updatePointerCaptured( tracker, gPoint, true );
    }


    /**
     * Stop capturing pointer events to the tracked element.
     * @private
     * @inner
     */
    function releasePointer( tracker, gPoint ) {
        var eventParams;
        var pointsList;
        var cachedGPoint;

        if ( $.MouseTracker.havePointerCapture ) {
            if ( $.MouseTracker.havePointerEvents ) {
                pointsList = tracker.getActivePointersListByType( gPoint.type );
                cachedGPoint = pointsList.getById( gPoint.id );
                if ( !cachedGPoint || !cachedGPoint.captured ) {
                    return;
                }
                // Can throw NotFoundError (InvalidPointerId Firefox < 82)
                //   (should never happen, but it does on Firefox 79 touch so we won't log a warning)
                try {
                    tracker.element.releasePointerCapture( gPoint.id );
                    //$.console.log('element.releasePointerCapture() called');
                } catch ( e ) {
                    //$.console.warn('releasePointerCapture() called on invalid pointer ID');
                }
            } else {
                tracker.element.releaseCapture();
                //$.console.log('element.releaseCapture() called');
            }
        } else {
            // Emulate mouse capture by hanging listeners on the document object.
            //    (Note we listen on the capture phase so the captured handlers will get called first)
            //$.console.log('Emulated mouse capture release');
            eventParams = getCaptureEventParams( tracker, $.MouseTracker.havePointerEvents ? 'pointerevent' : gPoint.type );
            // https://github.com/openseadragon/openseadragon/pull/790
            if (isInIframe && canAccessEvents(window.top)) {
                $.removeEvent(
                    window.top,
                    eventParams.upName,
                    eventParams.upHandler,
                    true
                );
            }
            $.removeEvent(
                $.MouseTracker.captureElement,
                eventParams.moveName,
                eventParams.moveHandler,
                true
            );
            $.removeEvent(
                $.MouseTracker.captureElement,
                eventParams.upName,
                eventParams.upHandler,
                true
            );
        }

        updatePointerCaptured( tracker, gPoint, false );
    }


    /**
     * Note: Called for both pointer events and legacy mouse events
     *         ($.MouseTracker.havePointerEvents determines which)
     * @private
     * @inner
     */
    function getPointerId( event ) {
        return ( $.MouseTracker.havePointerEvents ) ? event.pointerId : $.MouseTracker.mousePointerId;
    }


    /**
     * Gets a W3C Pointer Events model compatible pointer type string from a DOM pointer event.
     * IE10 used a long integer value, but the W3C specification (and IE11+) use a string "mouse", "touch", "pen", etc.
     *
     * Note: Called for both pointer events and legacy mouse events
     *         ($.MouseTracker.havePointerEvents determines which)
     * @private
     * @inner
     */
    function getPointerType( event ) {
        if ( $.MouseTracker.havePointerEvents ) {
            // Note: IE pointer events bug - sends invalid pointerType on lostpointercapture events
            //    and possibly other events. We rely on sane, valid property values in DOM events, so for
            //    IE, when the pointerType is missing, we'll default to 'mouse'...should be right most of the time
            return event.pointerType || (( $.Browser.vendor === $.BROWSERS.IE ) ? 'mouse' : '');
        } else {
            return 'mouse';
        }
    }


    /**
     * Note: Called for both pointer events and legacy mouse events
     *         ($.MouseTracker.havePointerEvents determines which)
     * @private
     * @inner
     */
    function getIsPrimary( event ) {
        return ( $.MouseTracker.havePointerEvents ) ? event.isPrimary : true;
    }


    /**
     * @private
     * @inner
     */
    function getMouseAbsolute( event ) {
        return $.getMousePosition( event );
    }

    /**
     * @private
     * @inner
     */
    function getMouseRelative( event, element ) {
        return getPointRelativeToAbsolute( getMouseAbsolute( event ), element );
    }

    /**
     * @private
     * @inner
     */
    function getPointRelativeToAbsolute( point, element ) {
        var offset = $.getElementOffset( element );
        return point.minus( offset );
    }

    /**
     * @private
     * @inner
     */
    function getCenterPoint( point1, point2 ) {
        return new $.Point( ( point1.x + point2.x ) / 2, ( point1.y + point2.y ) / 2 );
    }


///////////////////////////////////////////////////////////////////////////////
// Device-specific DOM event handlers
///////////////////////////////////////////////////////////////////////////////

    /**
     * @private
     * @inner
     */
    function onClick( tracker, event ) {
        //$.console.log('click ' + (tracker.userData ? tracker.userData.toString() : ''));

        var eventInfo = {
            originalEvent: event,
            eventType: 'click',
            pointerType: 'mouse',
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        if ( eventInfo.preventDefault && !eventInfo.defaultPrevented ) {
            $.cancelEvent( event );
        }
        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
    }


    /**
     * @private
     * @inner
     */
    function onDblClick( tracker, event ) {
        //$.console.log('dblclick ' + (tracker.userData ? tracker.userData.toString() : ''));

        var eventInfo = {
            originalEvent: event,
            eventType: 'dblclick',
            pointerType: 'mouse',
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        if ( eventInfo.preventDefault && !eventInfo.defaultPrevented ) {
            $.cancelEvent( event );
        }
        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
    }


    /**
     * @private
     * @inner
     */
    function onKeyDown( tracker, event ) {
        //$.console.log( "keydown %s %s %s %s %s", event.keyCode, event.charCode, event.ctrlKey, event.shiftKey, event.altKey );
        var eventArgs = null;

        var eventInfo = {
            originalEvent: event,
            eventType: 'keydown',
            pointerType: '',
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        if ( tracker.keyDownHandler && !eventInfo.preventGesture && !eventInfo.defaultPrevented ) {
            eventArgs = {
                eventSource:          tracker,
                keyCode:              event.keyCode ? event.keyCode : event.charCode,
                ctrl:                 event.ctrlKey,
                shift:                event.shiftKey,
                alt:                  event.altKey,
                meta:                 event.metaKey,
                originalEvent:        event,
                preventDefault:       eventInfo.preventDefault || eventInfo.defaultPrevented,
                userData:             tracker.userData
            };

            tracker.keyDownHandler( eventArgs );
        }

        if ( ( eventArgs && eventArgs.preventDefault ) || ( eventInfo.preventDefault && !eventInfo.defaultPrevented ) ) {
                $.cancelEvent( event );
        }
        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
    }


    /**
     * @private
     * @inner
     */
    function onKeyUp( tracker, event ) {
        //$.console.log( "keyup %s %s %s %s %s", event.keyCode, event.charCode, event.ctrlKey, event.shiftKey, event.altKey );

        var eventArgs = null;

        var eventInfo = {
            originalEvent: event,
            eventType: 'keyup',
            pointerType: '',
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        if ( tracker.keyUpHandler && !eventInfo.preventGesture && !eventInfo.defaultPrevented ) {
            eventArgs = {
                eventSource:          tracker,
                keyCode:              event.keyCode ? event.keyCode : event.charCode,
                ctrl:                 event.ctrlKey,
                shift:                event.shiftKey,
                alt:                  event.altKey,
                meta:                 event.metaKey,
                originalEvent:        event,
                preventDefault:       eventInfo.preventDefault || eventInfo.defaultPrevented,
                userData:             tracker.userData
            };

            tracker.keyUpHandler( eventArgs );
        }

        if ( ( eventArgs && eventArgs.preventDefault ) || ( eventInfo.preventDefault && !eventInfo.defaultPrevented ) ) {
            $.cancelEvent( event );
        }
        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
    }


    /**
     * @private
     * @inner
     */
    function onKeyPress( tracker, event ) {
        //$.console.log( "keypress %s %s %s %s %s", event.keyCode, event.charCode, event.ctrlKey, event.shiftKey, event.altKey );

        var eventArgs = null;

        var eventInfo = {
            originalEvent: event,
            eventType: 'keypress',
            pointerType: '',
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        if ( tracker.keyHandler && !eventInfo.preventGesture && !eventInfo.defaultPrevented ) {
            eventArgs = {
                eventSource:          tracker,
                keyCode:              event.keyCode ? event.keyCode : event.charCode,
                ctrl:                 event.ctrlKey,
                shift:                event.shiftKey,
                alt:                  event.altKey,
                meta:                 event.metaKey,
                originalEvent:        event,
                preventDefault:       eventInfo.preventDefault || eventInfo.defaultPrevented,
                userData:             tracker.userData
            };

            tracker.keyHandler( eventArgs );
        }

        if ( ( eventArgs && eventArgs.preventDefault ) || ( eventInfo.preventDefault && !eventInfo.defaultPrevented ) ) {
            $.cancelEvent( event );
        }
        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
    }


    /**
     * @private
     * @inner
     */
    function onFocus( tracker, event ) {
        //$.console.log('focus  ' + (tracker.userData ? tracker.userData.toString() : ''));

        // focus doesn't bubble and is not cancelable, but we call
        //   preProcessEvent() so it's dispatched to preProcessEventHandler
        //   if necessary
        var eventInfo = {
            originalEvent: event,
            eventType: 'focus',
            pointerType: '',
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        if ( tracker.focusHandler && !eventInfo.preventGesture ) {
            tracker.focusHandler(
                {
                    eventSource:          tracker,
                    originalEvent:        event,
                    userData:             tracker.userData
                }
            );
        }
    }


    /**
     * @private
     * @inner
     */
    function onBlur( tracker, event ) {
        //$.console.log('blur  ' + (tracker.userData ? tracker.userData.toString() : ''));

        // blur doesn't bubble and is not cancelable, but we call
        //   preProcessEvent() so it's dispatched to preProcessEventHandler
        //   if necessary
        var eventInfo = {
            originalEvent: event,
            eventType: 'blur',
            pointerType: '',
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        if ( tracker.blurHandler && !eventInfo.preventGesture ) {
            tracker.blurHandler(
                {
                    eventSource:          tracker,
                    originalEvent:        event,
                    userData:             tracker.userData
                }
            );
        }
    }


    /**
     * @private
     * @inner
     */
    function onContextMenu( tracker, event ) {
        //$.console.log('contextmenu ' + (tracker.userData ? tracker.userData.toString() : '') + ' ' + (event.target === tracker.element ? 'tracker.element' : ''));

        var eventArgs = null;

        var eventInfo = {
            originalEvent: event,
            eventType: 'contextmenu',
            pointerType: 'mouse',
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        // ContextMenu
        if ( tracker.contextMenuHandler && !eventInfo.preventGesture && !eventInfo.defaultPrevented ) {
            eventArgs = {
                eventSource:          tracker,
                position:             getPointRelativeToAbsolute( getMouseAbsolute( event ), tracker.element ),
                originalEvent:        eventInfo.originalEvent,
                preventDefault:       eventInfo.preventDefault || eventInfo.defaultPrevented,
                userData:             tracker.userData
            };

            tracker.contextMenuHandler( eventArgs );
        }

        if ( ( eventArgs && eventArgs.preventDefault ) || ( eventInfo.preventDefault && !eventInfo.defaultPrevented ) ) {
            $.cancelEvent( event );
        }
        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
    }


    /**
     * Handler for 'wheel' events
     *
     * @private
     * @inner
     */
    function onWheel( tracker, event ) {
        handleWheelEvent( tracker, event, event );
    }


    /**
     * Handler for 'mousewheel', 'DOMMouseScroll', and 'MozMousePixelScroll' events
     *
     * @private
     * @inner
     */
    function onMouseWheel( tracker, event ) {
        // Simulate a 'wheel' event
        var simulatedEvent = {
            target:     event.target || event.srcElement,
            type:       "wheel",
            shiftKey:   event.shiftKey || false,
            clientX:    event.clientX,
            clientY:    event.clientY,
            pageX:      event.pageX ? event.pageX : event.clientX,
            pageY:      event.pageY ? event.pageY : event.clientY,
            deltaMode:  event.type === "MozMousePixelScroll" ? 0 : 1, // 0=pixel, 1=line, 2=page
            deltaX:     0,
            deltaZ:     0
        };

        // Calculate deltaY
        if ( $.MouseTracker.wheelEventName === "mousewheel" ) {
            simulatedEvent.deltaY = -event.wheelDelta / $.DEFAULT_SETTINGS.pixelsPerWheelLine;
        } else {
            simulatedEvent.deltaY = event.detail;
        }

        handleWheelEvent( tracker, simulatedEvent, event );
    }


    /**
     * Handles 'wheel' events.
     * The event may be simulated by the legacy mouse wheel event handler (onMouseWheel()).
     *
     * @private
     * @inner
     */
    function handleWheelEvent( tracker, event, originalEvent ) {
        var nDelta = 0,
            eventInfo;

        var eventArgs = null;

        // The nDelta variable is gated to provide smooth z-index scrolling
        //   since the mouse wheel allows for substantial deltas meant for rapid
        //   y-index scrolling.
        // event.deltaMode: 0=pixel, 1=line, 2=page
        // TODO: Deltas in pixel mode should be accumulated then a scroll value computed after $.DEFAULT_SETTINGS.pixelsPerWheelLine threshold reached
        nDelta = event.deltaY ? (event.deltaY < 0 ? 1 : -1) : 0;
        eventInfo = {
            originalEvent: event,
            eventType: 'wheel',
            pointerType: 'mouse',
            isEmulated: event !== originalEvent
        };
        preProcessEvent( tracker, eventInfo );

        if ( tracker.scrollHandler && !eventInfo.preventGesture && !eventInfo.defaultPrevented ) {
            eventArgs = {
                eventSource:          tracker,
                pointerType:          'mouse',
                position:             getMouseRelative( event, tracker.element ),
                scroll:               nDelta,
                shift:                event.shiftKey,
                isTouchEvent:         false,
                originalEvent:        originalEvent,
                preventDefault:       eventInfo.preventDefault || eventInfo.defaultPrevented,
                userData:             tracker.userData
            };


            tracker.scrollHandler( eventArgs );
        }

        if ( eventInfo.stopPropagation ) {
            $.stopEvent( originalEvent );
        }
        if ( ( eventArgs && eventArgs.preventDefault ) || ( eventInfo.preventDefault && !eventInfo.defaultPrevented ) ) {
            //$.cancelEvent( originalEvent );
        }
}


    /**
     * TODO Never actually seen this event fired, and documentation is tough to find
     * @private
     * @inner
     */
    function onLoseCapture( tracker, event ) {
        //$.console.log('losecapture ' + (tracker.userData ? tracker.userData.toString() : '') + ' ' + (event.target === tracker.element ? 'tracker.element' : ''));

        var gPoint = {
            id: $.MouseTracker.mousePointerId,
            type: 'mouse'
        };

        var eventInfo = {
            originalEvent: event,
            eventType: 'lostpointercapture',
            pointerType: 'mouse',
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        if ( event.target === tracker.element ) {
            updatePointerCaptured( tracker, gPoint, false );
        }

        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
    }


    /**
     * @private
     * @inner
     */
    function onTouchStart( tracker, event ) {
        var time,
            i,
            touchCount = event.changedTouches.length,
            gPoint,
            pointsList = tracker.getActivePointersListByType( 'touch' );

        time = $.now();

        //$.console.log('touchstart ' + (tracker.userData ? tracker.userData.toString() : '') + ' ' + (event.target === tracker.element ? 'tracker.element' : ''));

        if ( pointsList.getLength() > event.touches.length - touchCount ) {
            $.console.warn('Tracked touch contact count doesn\'t match event.touches.length');
        }

        var eventInfo = {
            originalEvent: event,
            eventType: 'pointerdown',
            pointerType: 'touch',
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        for ( i = 0; i < touchCount; i++ ) {
            gPoint = {
                id: event.changedTouches[ i ].identifier,
                type: 'touch',
                // Simulate isPrimary
                isPrimary: pointsList.getLength() === 0,
                currentPos: getMouseAbsolute( event.changedTouches[ i ] ),
                currentTime: time
            };

            // simulate touchenter on our tracked element
            updatePointerEnter( tracker, eventInfo, gPoint );

            updatePointerDown( tracker, eventInfo, gPoint, 0 );

            updatePointerCaptured( tracker, gPoint, true );
        }

        if ( eventInfo.preventDefault && !eventInfo.defaultPrevented ) {
            $.cancelEvent( event );
        }
        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
    }


    /**
     * @private
     * @inner
     */
    function onTouchEnd( tracker, event ) {
        var time,
            i,
            touchCount = event.changedTouches.length,
            gPoint;

        time = $.now();

        //$.console.log('touchend ' + (tracker.userData ? tracker.userData.toString() : '') + ' ' + (event.target === tracker.element ? 'tracker.element' : ''));

        var eventInfo = {
            originalEvent: event,
            eventType: 'pointerup',
            pointerType: 'touch',
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        for ( i = 0; i < touchCount; i++ ) {
            gPoint = {
                id: event.changedTouches[ i ].identifier,
                type: 'touch',
                currentPos: getMouseAbsolute( event.changedTouches[ i ] ),
                currentTime: time
            };

            updatePointerUp( tracker, eventInfo, gPoint, 0 );

            updatePointerCaptured( tracker, gPoint, false );

            // simulate touchleave on our tracked element
            updatePointerLeave( tracker, eventInfo, gPoint );
        }

        if ( eventInfo.preventDefault && !eventInfo.defaultPrevented ) {
            $.cancelEvent( event );
        }
        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
    }


    /**
     * @private
     * @inner
     */
    function onTouchMove( tracker, event ) {
        var time,
            i,
            touchCount = event.changedTouches.length,
            gPoint;

        time = $.now();

        var eventInfo = {
            originalEvent: event,
            eventType: 'pointermove',
            pointerType: 'touch',
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        for ( i = 0; i < touchCount; i++ ) {
            gPoint = {
                id: event.changedTouches[ i ].identifier,
                type: 'touch',
                currentPos: getMouseAbsolute( event.changedTouches[ i ] ),
                currentTime: time
            };

            updatePointerMove( tracker, eventInfo, gPoint );
        }

        if ( eventInfo.preventDefault && !eventInfo.defaultPrevented ) {
            $.cancelEvent( event );
        }
        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
    }


    /**
     * @private
     * @inner
     */
    function onTouchCancel( tracker, event ) {
        var touchCount = event.changedTouches.length,
            i,
            gPoint;

        //$.console.log('touchcancel ' + (tracker.userData ? tracker.userData.toString() : ''));

        var eventInfo = {
            originalEvent: event,
            eventType: 'pointercancel',
            pointerType: 'touch',
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        for ( i = 0; i < touchCount; i++ ) {
            gPoint = {
                id: event.changedTouches[ i ].identifier,
                type: 'touch'
            };

            //TODO need to only do this if our element is target?
            updatePointerCancel( tracker, eventInfo, gPoint );
        }

        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
    }


    /**
     * @private
     * @inner
     */
    function onGestureStart( tracker, event ) {
        if ( !$.eventIsCanceled( event ) ) {
            event.preventDefault();
        }
        return false;
    }


    /**
     * @private
     * @inner
     */
    function onGestureChange( tracker, event ) {
        if ( !$.eventIsCanceled( event ) ) {
            event.preventDefault();
        }
        return false;
    }


    /**
     * @private
     * @inner
     */
    function onGotPointerCapture( tracker, event ) {
        //$.console.log('gotpointercapture ' + (tracker.userData ? tracker.userData.toString() : '') + ' ' + (event.target === tracker.element ? 'tracker.element' : ''));

        var eventInfo = {
            originalEvent: event,
            eventType: 'gotpointercapture',
            pointerType: getPointerType( event ),
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        if ( event.target === tracker.element ) {
            //$.console.log('gotpointercapture ' + (tracker.userData ? tracker.userData.toString() : ''));
            updatePointerCaptured( tracker, {
                id: event.pointerId,
                type: getPointerType( event )
            }, true );
        }

        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
    }


    /**
     * @private
     * @inner
     */
    function onLostPointerCapture( tracker, event ) {
        //$.console.log('lostpointercapture ' + (tracker.userData ? tracker.userData.toString() : '') + ' ' + (event.target === tracker.element ? 'tracker.element' : ''));

        var eventInfo = {
            originalEvent: event,
            eventType: 'lostpointercapture',
            pointerType: getPointerType( event ),
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        if ( event.target === tracker.element ) {
            //$.console.log('lostpointercapture ' + (tracker.userData ? tracker.userData.toString() : ''));
            updatePointerCaptured( tracker, {
                id: event.pointerId,
                type: getPointerType( event )
            }, false );
        }

        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
    }


    /**
     * Note: Called for both pointer events and legacy mouse events
     *         ($.MouseTracker.havePointerEvents determines which)
     *
     * @private
     * @inner
     */
    function onPointerEnter( tracker, event ) {
        //$.console.log('pointerenter ' + (tracker.userData ? tracker.userData.toString() : ''));

        var gPoint = {
            id: getPointerId( event ),
            type: getPointerType( event ),
            isPrimary: getIsPrimary( event ),
            currentPos: getMouseAbsolute( event ),
            currentTime: $.now()
        };

        // pointerenter doesn't bubble and is not cancelable, but we call
        //   preProcessEvent() so it's dispatched to preProcessEventHandler
        //   if necessary
        var eventInfo = {
            originalEvent: event,
            eventType: 'pointerenter',
            pointerType: gPoint.type,
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        updatePointerEnter( tracker, eventInfo, gPoint );
    }


    /**
     * Note: Called for both pointer events and legacy mouse events
     *         ($.MouseTracker.havePointerEvents determines which)
     *
     * @private
     * @inner
     */
    function onPointerLeave( tracker, event ) {
        //$.console.log('pointerleave ' + (tracker.userData ? tracker.userData.toString() : ''));

        var gPoint = {
            id: getPointerId( event ),
            type: getPointerType( event ),
            isPrimary: getIsPrimary( event ),
            currentPos: getMouseAbsolute( event ),
            currentTime: $.now()
        };

        // pointerleave doesn't bubble and is not cancelable, but we call
        //   preProcessEvent() so it's dispatched to preProcessEventHandler
        //   if necessary
        var eventInfo = {
            originalEvent: event,
            eventType: 'pointerleave',
            pointerType: gPoint.type,
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        updatePointerLeave( tracker, eventInfo, gPoint );
    }


    /**
     * Note: Called for both pointer events and legacy mouse events
     *         ($.MouseTracker.havePointerEvents determines which)
     *
     * @private
     * @inner
     */
    function onPointerOver( tracker, event ) {
        //$.console.log('pointerover ' + (tracker.userData ? tracker.userData.toString() : '') + ' ' + (event.target === tracker.element ? 'tracker.element' : ''));

        var gPoint = {
            id: getPointerId( event ),
            type: getPointerType( event ),
            isPrimary: getIsPrimary( event ),
            currentPos: getMouseAbsolute( event ),
            currentTime: $.now()
        };

        var eventInfo = {
            originalEvent: event,
            eventType: 'pointerover',
            pointerType: gPoint.type,
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        updatePointerOver( tracker, eventInfo, gPoint );

        if ( eventInfo.preventDefault && !eventInfo.defaultPrevented ) {
            $.cancelEvent( event );
        }
        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
    }


    /**
     * Note: Called for both pointer events and legacy mouse events
     *         ($.MouseTracker.havePointerEvents determines which)
     *
     * @private
     * @inner
     */
    function onPointerOut( tracker, event ) {
        //$.console.log('pointerout ' + (tracker.userData ? tracker.userData.toString() : '') + ' ' + (event.target === tracker.element ? 'tracker.element' : ''));

        var gPoint = {
            id: getPointerId( event ),
            type: getPointerType( event ),
            isPrimary: getIsPrimary( event ),
            currentPos: getMouseAbsolute( event ),
            currentTime: $.now()
        };

        var eventInfo = {
            originalEvent: event,
            eventType: 'pointerout',
            pointerType: gPoint.type,
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        updatePointerOut( tracker, eventInfo, gPoint );

        if ( eventInfo.preventDefault && !eventInfo.defaultPrevented ) {
            $.cancelEvent( event );
        }
        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
    }


    /**
     * Note: Called for both pointer events and legacy mouse events
     *         ($.MouseTracker.havePointerEvents determines which)
     *
     * @private
     * @inner
     */
    function onPointerDown( tracker, event ) {
        var gPoint = {
            id: getPointerId( event ),
            type: getPointerType( event ),
            isPrimary: getIsPrimary( event ),
            currentPos: getMouseAbsolute( event ),
            currentTime: $.now()
        };

        // Most browsers implicitly capture touch pointer events
        // Note no IE versions have element.hasPointerCapture() so no implicit
        //    pointer capture possible
        // var implicitlyCaptured = ($.MouseTracker.havePointerEvents &&
        //                         event.target.hasPointerCapture &&
        //                         $.Browser.vendor !== $.BROWSERS.IE) ?
        //                         event.target.hasPointerCapture(event.pointerId) : false;
        var implicitlyCaptured = $.MouseTracker.havePointerEvents &&
                                gPoint.type === 'touch' &&
                                $.Browser.vendor !== $.BROWSERS.IE;

        //$.console.log('pointerdown ' + (tracker.userData ? tracker.userData.toString() : '') + ' ' + (event.target === tracker.element ? 'tracker.element' : ''));

        var eventInfo = {
            originalEvent: event,
            eventType: 'pointerdown',
            pointerType: gPoint.type,
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        updatePointerDown( tracker, eventInfo, gPoint, event.button );

        if ( eventInfo.preventDefault && !eventInfo.defaultPrevented ) {
            $.cancelEvent( event );
        }
        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
        if ( eventInfo.shouldCapture ) {
            if ( implicitlyCaptured ) {
                updatePointerCaptured( tracker, gPoint, true );
            } else {
                capturePointer( tracker, gPoint );
            }
        }
    }


    /**
     * Note: Called for both pointer events and legacy mouse events
     *         ($.MouseTracker.havePointerEvents determines which)
     *
     * @private
     * @inner
     */
    function onPointerUp( tracker, event ) {
        handlePointerUp( tracker, event );
    }


    /**
     * Note: Called for both pointer events and legacy mouse events
     *         ($.MouseTracker.havePointerEvents determines which)
     *
     * This handler is attached to the window object (on the capture phase) to emulate mouse capture.
     * onPointerUp is still attached to the tracked element, so stop propagation to avoid processing twice.
     *
     * @private
     * @inner
     */
    function onPointerUpCaptured( tracker, event ) {
        var pointsList = tracker.getActivePointersListByType( getPointerType( event ) );
        if ( pointsList.getById( event.pointerId ) ) {
            handlePointerUp( tracker, event );
        }
        $.stopEvent( event );
    }


    /**
     * Note: Called for both pointer events and legacy mouse events
     *         ($.MouseTracker.havePointerEvents determines which)
     *
     * @private
     * @inner
     */
    function handlePointerUp( tracker, event ) {
        var gPoint;

        //$.console.log('pointerup ' + (tracker.userData ? tracker.userData.toString() : '') + ' ' + (event.target === tracker.element ? 'tracker.element' : ''));

        gPoint = {
            id: getPointerId( event ),
            type: getPointerType( event ),
            isPrimary: getIsPrimary( event ),
            currentPos: getMouseAbsolute( event ),
            currentTime: $.now()
        };

        var eventInfo = {
            originalEvent: event,
            eventType: 'pointerup',
            pointerType: gPoint.type,
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        updatePointerUp( tracker, eventInfo, gPoint, event.button );

        if ( eventInfo.preventDefault && !eventInfo.defaultPrevented ) {
            $.cancelEvent( event );
        }
        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }

        // Per spec, pointerup events are supposed to release capture. Not all browser
        //   versions have adhered to the spec, and there's no harm in releasing
        //   explicitly
        if ( eventInfo.shouldReleaseCapture ) {
            if ( event.target === tracker.element ) {
                releasePointer( tracker, gPoint );
            } else {
                updatePointerCaptured( tracker, gPoint, false );
            }
        }
    }


    /**
     * Note: Called for both pointer events and legacy mouse events
     *         ($.MouseTracker.havePointerEvents determines which)
     *
     * @private
     * @inner
     */
    function onPointerMove( tracker, event ) {
        handlePointerMove( tracker, event );
    }


    /**
     * Note: Called for both pointer events and legacy mouse events
     *         ($.MouseTracker.havePointerEvents determines which)
     *
     * This handler is attached to the window object (on the capture phase) to emulate mouse capture.
     * onPointerMove is still attached to the tracked element, so stop propagation to avoid processing twice.
     *
     * @private
     * @inner
     */
    function onPointerMoveCaptured( tracker, event ) {
        var pointsList = tracker.getActivePointersListByType( getPointerType( event ) );
        if ( pointsList.getById( event.pointerId ) ) {
            handlePointerMove( tracker, event );
        }
        $.stopEvent( event );
    }


    /**
     * Note: Called for both pointer events and legacy mouse events
     *         ($.MouseTracker.havePointerEvents determines which)
     *
     * @private
     * @inner
     */
    function handlePointerMove( tracker, event ) {
        // Pointer changed coordinates, button state, pressure, tilt, or contact geometry (e.g. width and height)

        var gPoint = {
            id: getPointerId( event ),
            type: getPointerType( event ),
            isPrimary: getIsPrimary( event ),
            currentPos: getMouseAbsolute( event ),
            currentTime: $.now()
        };

        var eventInfo = {
            originalEvent: event,
            eventType: 'pointermove',
            pointerType: gPoint.type,
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        updatePointerMove( tracker, eventInfo, gPoint );

        if ( eventInfo.preventDefault && !eventInfo.defaultPrevented ) {
            $.cancelEvent( event );
        }
        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
    }


    /**
     * @private
     * @inner
     */
    function onPointerCancel( tracker, event ) {
        //$.console.log('pointercancel ' + (tracker.userData ? tracker.userData.toString() : '') + ' ' + (event.target === tracker.element ? 'tracker.element' : ''));

        var gPoint = {
            id: event.pointerId,
            type: getPointerType( event )
        };

        var eventInfo = {
            originalEvent: event,
            eventType: 'pointercancel',
            pointerType: gPoint.type,
            isEmulated: false
        };
        preProcessEvent( tracker, eventInfo );

        //TODO need to only do this if our element is target?
        updatePointerCancel( tracker, eventInfo, gPoint );

        if ( eventInfo.stopPropagation ) {
            $.stopEvent( event );
        }
    }


///////////////////////////////////////////////////////////////////////////////
// Device-agnostic DOM event handlers
///////////////////////////////////////////////////////////////////////////////

    /**
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker.GesturePointList} pointsList
     *     The GesturePointList to track the pointer in.
     * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
     *      Gesture point to track.
     * @returns {Number} Number of gesture points in pointsList.
     */
    function startTrackingPointer( pointsList, gPoint ) {
        //$.console.log('startTrackingPointer *** ' + pointsList.type + ' ' + gPoint.id.toString());
        gPoint.speed = 0;
        gPoint.direction = 0;
        gPoint.contactPos = gPoint.currentPos;
        gPoint.contactTime = gPoint.currentTime;
        gPoint.lastPos = gPoint.currentPos;
        gPoint.lastTime = gPoint.currentTime;

        return pointsList.add( gPoint );
    }


    /**
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker} tracker
     *     A reference to the MouseTracker instance.
     * @param {OpenSeadragon.MouseTracker.GesturePointList} pointsList
     *     The GesturePointList to stop tracking the pointer on.
     * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
     *      Gesture point to stop tracking.
     * @returns {Number} Number of gesture points in pointsList.
     */
    function stopTrackingPointer( tracker, pointsList, gPoint ) {
        //$.console.log('stopTrackingPointer *** ' + pointsList.type + ' ' + gPoint.id.toString());
        var listLength;

        var trackedGPoint = pointsList.getById( gPoint.id );

        if ( trackedGPoint ) {
            if ( trackedGPoint.captured ) {
                $.console.warn('stopTrackingPointer() called on captured pointer');
                releasePointer( tracker, trackedGPoint );
            }

            // If child element relinquishes capture to a parent we may get here
            //   from a pointerleave event while a pointerup event will never be received.
            //   In that case, we'll clean up the contact count
            pointsList.removeContact();

            listLength = pointsList.removeById( gPoint.id );
        } else {
            listLength = pointsList.getLength();
        }

        return listLength;
    }


    /**
     * @function
     * @private
     * @inner
     */
    function getEventProcessDefaults( tracker, eventInfo ) {
        switch ( eventInfo.eventType ) {
            case 'pointermove':
                eventInfo.isStoppable = true;
                eventInfo.isCancelable = true;
                eventInfo.preventDefault = false;
                eventInfo.preventGesture = !tracker.hasGestureHandlers;
                eventInfo.stopPropagation = false;
                break;
            case 'pointerover':
            case 'pointerout':
            case 'contextmenu':
            case 'keydown':
            case 'keyup':
            case 'keypress':
                eventInfo.isStoppable = true;
                eventInfo.isCancelable = true;
                eventInfo.preventDefault = false; // onContextMenu(), onKeyDown(), onKeyUp(), onKeyPress() may set true
                eventInfo.preventGesture = false;
                eventInfo.stopPropagation = false;
                break;
            case 'pointerdown':
                eventInfo.isStoppable = true;
                eventInfo.isCancelable = true;
                eventInfo.preventDefault = false; // updatePointerDown() may set true (tracker.hasGestureHandlers)
                eventInfo.preventGesture = !tracker.hasGestureHandlers;
                eventInfo.stopPropagation = false;
                break;
            case 'pointerup':
                eventInfo.isStoppable = true;
                eventInfo.isCancelable = true;
                eventInfo.preventDefault = false;
                eventInfo.preventGesture = !tracker.hasGestureHandlers;
                eventInfo.stopPropagation = false;
                break;
            case 'wheel':
                eventInfo.isStoppable = true;
                eventInfo.isCancelable = true;
                eventInfo.preventDefault = false; // handleWheelEvent() may set true
                eventInfo.preventGesture = !tracker.hasScrollHandler;
                eventInfo.stopPropagation = false;
                break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
                eventInfo.isStoppable = true;
                eventInfo.isCancelable = false;
                eventInfo.preventDefault = false;
                eventInfo.preventGesture = false;
                eventInfo.stopPropagation = false;
                break;
            case 'click':
                eventInfo.isStoppable = true;
                eventInfo.isCancelable = true;
                eventInfo.preventDefault = !!tracker.clickHandler;
                eventInfo.preventGesture = false;
                eventInfo.stopPropagation = false;
                break;
            case 'dblclick':
                eventInfo.isStoppable = true;
                eventInfo.isCancelable = true;
                eventInfo.preventDefault = !!tracker.dblClickHandler;
                eventInfo.preventGesture = false;
                eventInfo.stopPropagation = false;
                break;
            case 'focus':
            case 'blur':
            case 'pointerenter':
            case 'pointerleave':
            default:
                eventInfo.isStoppable = false;
                eventInfo.isCancelable = false;
                eventInfo.preventDefault = false;
                eventInfo.preventGesture = false;
                eventInfo.stopPropagation = false;
                break;
        }
    }


    /**
     * Sets up for and calls preProcessEventHandler. Call with the following parameters -
     * this function will fill in the rest of the preProcessEventHandler event object
     * properties
     *
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker} tracker
     *     A reference to the MouseTracker instance.
     * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
     * @param {Object} eventInfo.originalEvent
     * @param {String} eventInfo.eventType
     * @param {String} eventInfo.pointerType
     * @param {Boolean} eventInfo.isEmulated
     */
    function preProcessEvent( tracker, eventInfo ) {
        eventInfo.eventSource = tracker;
        eventInfo.eventPhase = eventInfo.originalEvent ?
                        ((typeof eventInfo.originalEvent.eventPhase !== 'undefined') ?
                                            eventInfo.originalEvent.eventPhase : 0) : 0;
        eventInfo.defaultPrevented = $.eventIsCanceled( eventInfo.originalEvent );
        eventInfo.shouldCapture = false;
        eventInfo.shouldReleaseCapture = false;
        eventInfo.userData = tracker.userData;

        getEventProcessDefaults( tracker, eventInfo );

        if ( tracker.preProcessEventHandler ) {
            tracker.preProcessEventHandler( eventInfo );
        }
    }


    /**
     * Sets or resets the captured property on the tracked pointer matching the passed gPoint's id/type
     *
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker} tracker
     *     A reference to the MouseTracker instance.
     * @param {Object} gPoint
     *     An object with id and type properties describing the pointer to update.
     * @param {Boolean} isCaptured
     *      Value to set the captured property to.
     */
    function updatePointerCaptured( tracker, gPoint, isCaptured ) {
        var pointsList = tracker.getActivePointersListByType( gPoint.type );
        var updateGPoint = pointsList.getById( gPoint.id );

        if ( updateGPoint ) {
            if ( isCaptured && !updateGPoint.captured ) {
                updateGPoint.captured = true;
                pointsList.captureCount++;
            } else if ( !isCaptured && updateGPoint.captured ) {
                updateGPoint.captured = false;
                pointsList.captureCount--;
                if ( pointsList.captureCount < 0 ) {
                    pointsList.captureCount = 0;
                    $.console.warn('updatePointerCaptured() - pointsList.captureCount went negative');
                }
            }
        } else {
            $.console.warn('updatePointerCaptured() called on untracked pointer');
        }
    }


    /**
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker} tracker
     *     A reference to the MouseTracker instance.
     * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
     *     Processing info for originating DOM event.
     * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
     *      Gesture point associated with the event.
     */
    function updatePointerEnter( tracker, eventInfo, gPoint ) {
        var pointsList = tracker.getActivePointersListByType( gPoint.type ),
            updateGPoint;

        updateGPoint = pointsList.getById( gPoint.id );

        if ( updateGPoint ) {
            // Already tracking the pointer...update it
            updateGPoint.insideElement = true;
            updateGPoint.lastPos = updateGPoint.currentPos;
            updateGPoint.lastTime = updateGPoint.currentTime;
            updateGPoint.currentPos = gPoint.currentPos;
            updateGPoint.currentTime = gPoint.currentTime;

            gPoint = updateGPoint;
        } else {
            // Initialize for tracking and add to the tracking list
            gPoint.captured = false; // Handled by updatePointerCaptured()
            gPoint.insideElementPressed = false;
            gPoint.insideElement = true;
            startTrackingPointer( pointsList, gPoint );
        }

        // Enter (doesn't bubble and not cancelable)
        if ( tracker.enterHandler ) {
            tracker.enterHandler(
                {
                    eventSource:          tracker,
                    pointerType:          gPoint.type,
                    position:             getPointRelativeToAbsolute( gPoint.currentPos, tracker.element ),
                    buttons:              pointsList.buttons,
                    pointers:             tracker.getActivePointerCount(),
                    insideElementPressed: gPoint.insideElementPressed,
                    buttonDownAny:        pointsList.buttons !== 0,
                    isTouchEvent:         gPoint.type === 'touch',
                    originalEvent:        eventInfo.originalEvent,
                    userData:             tracker.userData
                }
            );
        }
    }


    /**
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker} tracker
     *     A reference to the MouseTracker instance.
     * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
     *     Processing info for originating DOM event.
     * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
     *      Gesture point associated with the event.
     */
    function updatePointerLeave( tracker, eventInfo, gPoint ) {
        var pointsList = tracker.getActivePointersListByType(gPoint.type),
            updateGPoint,
            dispatchEventObj;

        updateGPoint = pointsList.getById( gPoint.id );

        if ( updateGPoint ) {
            // Already tracking the pointer. If captured then update it, else stop tracking it
            if ( updateGPoint.captured ) {
                updateGPoint.insideElement = false;
                updateGPoint.lastPos = updateGPoint.currentPos;
                updateGPoint.lastTime = updateGPoint.currentTime;
                updateGPoint.currentPos = gPoint.currentPos;
                updateGPoint.currentTime = gPoint.currentTime;
            } else {
                stopTrackingPointer( tracker, pointsList, updateGPoint );
            }

            gPoint = updateGPoint;
        } else {
            gPoint.captured = false; // Handled by updatePointerCaptured()
            gPoint.insideElementPressed = false;
        }

        // Leave (doesn't bubble and not cancelable)
        //   Note: exitHandler is deprecated (v2.5.0), replaced by leaveHandler
        if ( tracker.leaveHandler || tracker.exitHandler ) {
            dispatchEventObj = {
                eventSource:          tracker,
                pointerType:          gPoint.type,
                // GitHub PR: https://github.com/openseadragon/openseadragon/pull/1754 (gPoint.currentPos && )
                position:             gPoint.currentPos && getPointRelativeToAbsolute( gPoint.currentPos, tracker.element ),
                buttons:              pointsList.buttons,
                pointers:             tracker.getActivePointerCount(),
                insideElementPressed: gPoint.insideElementPressed,
                buttonDownAny:        pointsList.buttons !== 0,
                isTouchEvent:         gPoint.type === 'touch',
                originalEvent:        eventInfo.originalEvent,
                userData:             tracker.userData
            };

            if ( tracker.leaveHandler ) {
                tracker.leaveHandler( dispatchEventObj );
            }
            // Deprecated
            if ( tracker.exitHandler ) {
                tracker.exitHandler( dispatchEventObj );
            }
        }
    }


    /**
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker} tracker
     *     A reference to the MouseTracker instance.
     * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
     *     Processing info for originating DOM event.
     * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
     *      Gesture point associated with the event.
     */
    function updatePointerOver( tracker, eventInfo, gPoint ) {
        var pointsList,
            updateGPoint;

        pointsList = tracker.getActivePointersListByType( gPoint.type );

        updateGPoint = pointsList.getById( gPoint.id );

        if ( updateGPoint ) {
            gPoint = updateGPoint;
        } else {
            gPoint.captured = false;
            gPoint.insideElementPressed = false;
            //gPoint.insideElement = true; // Tracked by updatePointerEnter
        }

        if ( tracker.overHandler ) {
            // Over
            tracker.overHandler(
                {
                    eventSource:          tracker,
                    pointerType:          gPoint.type,
                    position:             getPointRelativeToAbsolute( gPoint.currentPos, tracker.element ),
                    buttons:              pointsList.buttons,
                    pointers:             tracker.getActivePointerCount(),
                    insideElementPressed: gPoint.insideElementPressed,
                    buttonDownAny:        pointsList.buttons !== 0,
                    isTouchEvent:         gPoint.type === 'touch',
                    originalEvent:        eventInfo.originalEvent,
                    userData:             tracker.userData
                }
            );
        }
    }

    /**
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker} tracker
     *     A reference to the MouseTracker instance.
     * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
     *     Processing info for originating DOM event.
     * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
     *      Gesture point associated with the event.
     */
    function updatePointerOut( tracker, eventInfo, gPoint ) {
        var pointsList,
            updateGPoint;

        pointsList = tracker.getActivePointersListByType(gPoint.type);

        updateGPoint = pointsList.getById( gPoint.id );

        if ( updateGPoint ) {
            gPoint = updateGPoint;
        } else {
            gPoint.captured = false;
            gPoint.insideElementPressed = false;
            //gPoint.insideElement = true; // Tracked by updatePointerEnter
        }

        if ( tracker.outHandler ) {
            // Out
            tracker.outHandler( {
                eventSource:          tracker,
                pointerType:          gPoint.type,
                position:             gPoint.currentPos && getPointRelativeToAbsolute( gPoint.currentPos, tracker.element ),
                buttons:              pointsList.buttons,
                pointers:             tracker.getActivePointerCount(),
                insideElementPressed: gPoint.insideElementPressed,
                buttonDownAny:        pointsList.buttons !== 0,
                isTouchEvent:         gPoint.type === 'touch',
                originalEvent:        eventInfo.originalEvent,
                userData:             tracker.userData
            } );
        }
    }


    /**
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker} tracker
     *     A reference to the MouseTracker instance.
     * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
     *     Processing info for originating DOM event.
     * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
     *      Gesture point associated with the event.
     * @param {Number} buttonChanged
     *      The button involved in the event: -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
     *      Note on chorded button presses (a button pressed when another button is already pressed): In the W3C Pointer Events model,
     *      only one pointerdown/pointerup event combo is fired. Chorded button state changes instead fire pointermove events.
     */
    function updatePointerDown( tracker, eventInfo, gPoint, buttonChanged ) {
        var delegate = THIS[ tracker.hash ],
            pointsList = tracker.getActivePointersListByType( gPoint.type ),
            updateGPoint;

        if ( typeof eventInfo.originalEvent.buttons !== 'undefined' ) {
            pointsList.buttons = eventInfo.originalEvent.buttons;
        } else {
            if ( buttonChanged === 0 ) {
                // Primary
                pointsList.buttons |= 1;
            } else if ( buttonChanged === 1 ) {
                // Aux
                pointsList.buttons |= 4;
            } else if ( buttonChanged === 2 ) {
                // Secondary
                pointsList.buttons |= 2;
            } else if ( buttonChanged === 3 ) {
                // X1 (Back)
                pointsList.buttons |= 8;
            } else if ( buttonChanged === 4 ) {
                // X2 (Forward)
                pointsList.buttons |= 16;
            } else if ( buttonChanged === 5 ) {
                // Pen Eraser
                pointsList.buttons |= 32;
            }
        }

        // Only capture and track primary button, pen, and touch contacts
        if ( buttonChanged !== 0 ) {
            eventInfo.shouldCapture = false;
            eventInfo.shouldReleaseCapture = false;

            // Aux Press
            if ( tracker.nonPrimaryPressHandler &&
                                !eventInfo.preventGesture &&
                                !eventInfo.defaultPrevented ) {
                eventInfo.preventDefault = true;

                tracker.nonPrimaryPressHandler(
                    {
                        eventSource:          tracker,
                        pointerType:          gPoint.type,
                        position:             getPointRelativeToAbsolute( gPoint.currentPos, tracker.element ),
                        button:               buttonChanged,
                        buttons:              pointsList.buttons,
                        isTouchEvent:         gPoint.type === 'touch',
                        originalEvent:        eventInfo.originalEvent,
                        userData:             tracker.userData
                    }
                );
            }

            return;
        }

        updateGPoint = pointsList.getById( gPoint.id );

        if ( updateGPoint ) {
            // Already tracking the pointer...update it
            //updateGPoint.captured = true; // Handled by updatePointerCaptured()
            updateGPoint.insideElementPressed = true;
            updateGPoint.insideElement = true;
            updateGPoint.originalTarget = eventInfo.originalEvent.target;
            updateGPoint.contactPos = gPoint.currentPos;
            updateGPoint.contactTime = gPoint.currentTime;
            updateGPoint.lastPos = updateGPoint.currentPos;
            updateGPoint.lastTime = updateGPoint.currentTime;
            updateGPoint.currentPos = gPoint.currentPos;
            updateGPoint.currentTime = gPoint.currentTime;

            gPoint = updateGPoint;
        } else {
            // Initialize for tracking and add to the tracking list (no pointerenter event occurred before this)
            // NOTE: pointerdown event on untracked pointer
            gPoint.captured = false; // Handled by updatePointerCaptured()
            gPoint.insideElementPressed = true;
            gPoint.insideElement = true;
            gPoint.originalTarget = eventInfo.originalEvent.target;
            startTrackingPointer( pointsList, gPoint );
        }

        pointsList.addContact();
        //$.console.log('contacts++ ', pointsList.contacts);

        if ( !eventInfo.preventGesture && !eventInfo.defaultPrevented ) {
            eventInfo.shouldCapture = true;
            eventInfo.shouldReleaseCapture = false;
            eventInfo.preventDefault = true;

            if ( tracker.dragHandler || tracker.dragEndHandler || tracker.pinchHandler ) {
                $.MouseTracker.gesturePointVelocityTracker.addPoint( tracker, gPoint );
            }

            if ( pointsList.contacts === 1 ) {
                // Press
                if ( tracker.pressHandler && !eventInfo.preventGesture ) {
                    tracker.pressHandler(
                        {
                            eventSource:          tracker,
                            pointerType:          gPoint.type,
                            position:             getPointRelativeToAbsolute( gPoint.contactPos, tracker.element ),
                            buttons:              pointsList.buttons,
                            isTouchEvent:         gPoint.type === 'touch',
                            originalEvent:        eventInfo.originalEvent,
                            userData:             tracker.userData
                        }
                    );
                }
            } else if ( pointsList.contacts === 2 ) {
                if ( tracker.pinchHandler && gPoint.type === 'touch' ) {
                    // Initialize for pinch
                    delegate.pinchGPoints = pointsList.asArray();
                    delegate.lastPinchDist = delegate.currentPinchDist = delegate.pinchGPoints[ 0 ].currentPos.distanceTo( delegate.pinchGPoints[ 1 ].currentPos );
                    delegate.lastPinchCenter = delegate.currentPinchCenter = getCenterPoint( delegate.pinchGPoints[ 0 ].currentPos, delegate.pinchGPoints[ 1 ].currentPos );
                }
            }
        } else {
            eventInfo.shouldCapture = false;
            eventInfo.shouldReleaseCapture = false;
        }
    }


    /**
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker} tracker
     *     A reference to the MouseTracker instance.
     * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
     *     Processing info for originating DOM event.
     * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
     *      Gesture points associated with the event.
     * @param {Number} buttonChanged
     *      The button involved in the event: -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
     *      Note on chorded button presses (a button pressed when another button is already pressed): In the W3C Pointer Events model,
     *      only one pointerdown/pointerup event combo is fired. Chorded button state changes instead fire pointermove events.
     */
    function updatePointerUp( tracker, eventInfo, gPoint, buttonChanged ) {
        var delegate = THIS[ tracker.hash ],
            pointsList = tracker.getActivePointersListByType( gPoint.type ),
            releasePoint,
            releaseTime,
            updateGPoint,
            wasCaptured = false,
            quick;

        if ( typeof eventInfo.originalEvent.buttons !== 'undefined' ) {
            pointsList.buttons = eventInfo.originalEvent.buttons;
        } else {
            if ( buttonChanged === 0 ) {
                // Primary
                pointsList.buttons ^= ~1;
            } else if ( buttonChanged === 1 ) {
                // Aux
                pointsList.buttons ^= ~4;
            } else if ( buttonChanged === 2 ) {
                // Secondary
                pointsList.buttons ^= ~2;
            } else if ( buttonChanged === 3 ) {
                // X1 (Back)
                pointsList.buttons ^= ~8;
            } else if ( buttonChanged === 4 ) {
                // X2 (Forward)
                pointsList.buttons ^= ~16;
            } else if ( buttonChanged === 5 ) {
                // Pen Eraser
                pointsList.buttons ^= ~32;
            }
        }

        eventInfo.shouldCapture = false;

        // Only capture and track primary button, pen, and touch contacts
        if ( buttonChanged !== 0 ) {
            eventInfo.shouldReleaseCapture = false;

            // Aux Release
            if ( tracker.nonPrimaryReleaseHandler &&
                                !eventInfo.preventGesture &&
                                !eventInfo.defaultPrevented ) {
                eventInfo.preventDefault = true;

                tracker.nonPrimaryReleaseHandler(
                    {
                        eventSource:           tracker,
                        pointerType:           gPoint.type,
                        position:              getPointRelativeToAbsolute(gPoint.currentPos, tracker.element),
                        button:                buttonChanged,
                        buttons:               pointsList.buttons,
                        isTouchEvent:          gPoint.type === 'touch',
                        originalEvent:         eventInfo.originalEvent,
                        userData:              tracker.userData
                    }
                );
            }

            return;
        }

        updateGPoint = pointsList.getById( gPoint.id );

        if ( updateGPoint ) {
            pointsList.removeContact();
            //$.console.log('contacts-- ', pointsList.contacts);

            // Update the pointer, stop tracking it if not still in this element
            if ( updateGPoint.captured ) {
                //updateGPoint.captured = false; // Handled by updatePointerCaptured()
                wasCaptured = true;
            }
            updateGPoint.lastPos = updateGPoint.currentPos;
            updateGPoint.lastTime = updateGPoint.currentTime;
            updateGPoint.currentPos = gPoint.currentPos;
            updateGPoint.currentTime = gPoint.currentTime;
            if ( !updateGPoint.insideElement ) {
                stopTrackingPointer( tracker, pointsList, updateGPoint );
            }

            releasePoint = updateGPoint.currentPos;
            releaseTime = updateGPoint.currentTime;
        } else {
            // NOTE: updatePointerUp(): pointerup on untracked gPoint
            // ...we'll start to track pointer again
            gPoint.captured = false; // Handled by updatePointerCaptured()
            gPoint.insideElementPressed = false;
            gPoint.insideElement = true;
            startTrackingPointer( pointsList, gPoint );

            updateGPoint = gPoint;
        }

        if ( !eventInfo.preventGesture && !eventInfo.defaultPrevented ) {
            if ( wasCaptured ) {
                // Pointer was activated in our element but could have been removed in any element since events are captured to our element

                eventInfo.shouldReleaseCapture = true;
                eventInfo.preventDefault = true;

                if ( tracker.dragHandler || tracker.dragEndHandler || tracker.pinchHandler ) {
                    $.MouseTracker.gesturePointVelocityTracker.removePoint( tracker, updateGPoint );
                }

                if ( pointsList.contacts === 0 ) {

                    // Release (pressed in our element)
                    if ( tracker.releaseHandler && releasePoint ) {
                        tracker.releaseHandler(
                            {
                                eventSource:           tracker,
                                pointerType:           updateGPoint.type,
                                position:              getPointRelativeToAbsolute( releasePoint, tracker.element ),
                                buttons:               pointsList.buttons,
                                insideElementPressed:  updateGPoint.insideElementPressed,
                                insideElementReleased: updateGPoint.insideElement,
                                isTouchEvent:          updateGPoint.type === 'touch',
                                originalEvent:         eventInfo.originalEvent,
                                userData:              tracker.userData
                            }
                        );
                    }

                    // Drag End
                    if ( tracker.dragEndHandler && delegate.sentDragEvent ) {
                        tracker.dragEndHandler(
                            {
                                eventSource:          tracker,
                                pointerType:          updateGPoint.type,
                                position:             getPointRelativeToAbsolute( updateGPoint.currentPos, tracker.element ),
                                speed:                updateGPoint.speed,
                                direction:            updateGPoint.direction,
                                shift:                eventInfo.originalEvent.shiftKey,
                                isTouchEvent:         updateGPoint.type === 'touch',
                                originalEvent:        eventInfo.originalEvent,
                                userData:             tracker.userData
                            }
                        );
                    }

                    // We want to clear this flag regardless of whether we fired the dragEndHandler
                    delegate.sentDragEvent = false;

                    // Click / Double-Click
                    if ( ( tracker.clickHandler || tracker.dblClickHandler ) && updateGPoint.insideElement ) {
                        quick = releaseTime - updateGPoint.contactTime <= tracker.clickTimeThreshold &&
                                        updateGPoint.contactPos.distanceTo( releasePoint ) <= tracker.clickDistThreshold;

                        // Click
                        if ( tracker.clickHandler ) {
                            tracker.clickHandler(
                                {
                                    eventSource:          tracker,
                                    pointerType:          updateGPoint.type,
                                    position:             getPointRelativeToAbsolute( updateGPoint.currentPos, tracker.element ),
                                    quick:                quick,
                                    shift:                eventInfo.originalEvent.shiftKey,
                                    isTouchEvent:         updateGPoint.type === 'touch',
                                    originalEvent:        eventInfo.originalEvent,
                                    originalTarget:       updateGPoint.originalTarget,
                                    userData:             tracker.userData
                                }
                            );
                        }

                        // Double-Click
                        if ( tracker.dblClickHandler && quick ) {
                            pointsList.clicks++;
                            if ( pointsList.clicks === 1 ) {
                                delegate.lastClickPos = releasePoint;
                                /*jshint loopfunc:true*/
                                delegate.dblClickTimeOut = setTimeout( function() {
                                    pointsList.clicks = 0;
                                }, tracker.dblClickTimeThreshold );
                                /*jshint loopfunc:false*/
                            } else if ( pointsList.clicks === 2 ) {
                                clearTimeout( delegate.dblClickTimeOut );
                                pointsList.clicks = 0;
                                if ( delegate.lastClickPos.distanceTo( releasePoint ) <= tracker.dblClickDistThreshold ) {
                                    tracker.dblClickHandler(
                                        {
                                            eventSource:          tracker,
                                            pointerType:          updateGPoint.type,
                                            position:             getPointRelativeToAbsolute( updateGPoint.currentPos, tracker.element ),
                                            shift:                eventInfo.originalEvent.shiftKey,
                                            isTouchEvent:         updateGPoint.type === 'touch',
                                            originalEvent:        eventInfo.originalEvent,
                                            userData:             tracker.userData
                                        }
                                    );
                                }
                                delegate.lastClickPos = null;
                            }
                        }
                    }
                } else if ( pointsList.contacts === 2 ) {
                    if ( tracker.pinchHandler && updateGPoint.type === 'touch' ) {
                        // Reset for pinch
                        delegate.pinchGPoints = pointsList.asArray();
                        delegate.lastPinchDist = delegate.currentPinchDist = delegate.pinchGPoints[ 0 ].currentPos.distanceTo( delegate.pinchGPoints[ 1 ].currentPos );
                        delegate.lastPinchCenter = delegate.currentPinchCenter = getCenterPoint( delegate.pinchGPoints[ 0 ].currentPos, delegate.pinchGPoints[ 1 ].currentPos );
                    }
                }
            } else {
                // Pointer was activated in another element but removed in our element

                eventInfo.shouldReleaseCapture = false;

                // Release (pressed in another element)
                if ( tracker.releaseHandler && releasePoint ) {
                    tracker.releaseHandler(
                        {
                            eventSource:           tracker,
                            pointerType:           updateGPoint.type,
                            position:              getPointRelativeToAbsolute( releasePoint, tracker.element ),
                            buttons:               pointsList.buttons,
                            insideElementPressed:  updateGPoint.insideElementPressed,
                            insideElementReleased: updateGPoint.insideElement,
                            isTouchEvent:          updateGPoint.type === 'touch',
                            originalEvent:         eventInfo.originalEvent,
                            userData:              tracker.userData
                        }
                    );
                    eventInfo.preventDefault = true;
                }
            }
        }
    }


    /**
     * Call when pointer(s) change coordinates, button state, pressure, tilt, or contact geometry (e.g. width and height)
     *
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker} tracker
     *     A reference to the MouseTracker instance.
     * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
     *     Processing info for originating DOM event.
     * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
     *      Gesture points associated with the event.
     */
    function updatePointerMove( tracker, eventInfo, gPoint ) {
        var delegate = THIS[ tracker.hash ],
            pointsList = tracker.getActivePointersListByType( gPoint.type ),
            updateGPoint,
            gPointArray,
            delta;

        if ( typeof eventInfo.originalEvent.buttons !== 'undefined' ) {
            pointsList.buttons = eventInfo.originalEvent.buttons;
        }

        updateGPoint = pointsList.getById( gPoint.id );

        if ( updateGPoint ) {
            // Already tracking the pointer...update it
            updateGPoint.lastPos = updateGPoint.currentPos;
            updateGPoint.lastTime = updateGPoint.currentTime;
            updateGPoint.currentPos = gPoint.currentPos;
            updateGPoint.currentTime = gPoint.currentTime;
        } else {
            // Should never get here, but due to user agent bugs (e.g. legacy touch) it sometimes happens
            return;
        }

        eventInfo.shouldCapture = false;
        eventInfo.shouldReleaseCapture = false;

        // Stop (mouse only)
        if ( tracker.stopHandler && gPoint.type === 'mouse' ) {
            clearTimeout( tracker.stopTimeOut );
            tracker.stopTimeOut = setTimeout( function() {
                handlePointerStop( tracker, eventInfo.originalEvent, gPoint.type );
            }, tracker.stopDelay );
        }

        if ( pointsList.contacts === 0 ) {
            // Move (no contacts: hovering mouse or other hover-capable device)
            if ( tracker.moveHandler ) {
                tracker.moveHandler(
                    {
                        eventSource:          tracker,
                        pointerType:          gPoint.type,
                        position:             getPointRelativeToAbsolute( gPoint.currentPos, tracker.element ),
                        buttons:              pointsList.buttons,
                        isTouchEvent:         gPoint.type === 'touch',
                        originalEvent:        eventInfo.originalEvent,
                        userData:             tracker.userData
                    }
                );
            }
        } else if ( pointsList.contacts === 1 ) {
            // Move (1 contact)
            if ( tracker.moveHandler ) {
                updateGPoint = pointsList.asArray()[ 0 ];
                tracker.moveHandler(
                    {
                        eventSource:          tracker,
                        pointerType:          updateGPoint.type,
                        position:             getPointRelativeToAbsolute( updateGPoint.currentPos, tracker.element ),
                        buttons:              pointsList.buttons,
                        isTouchEvent:         updateGPoint.type === 'touch',
                        originalEvent:        eventInfo.originalEvent,
                        userData:             tracker.userData
                    }
                );
            }

            // Drag
            if ( tracker.dragHandler && !eventInfo.preventGesture && !eventInfo.defaultPrevented ) {
                updateGPoint = pointsList.asArray()[ 0 ];
                delta = updateGPoint.currentPos.minus( updateGPoint.lastPos );
                tracker.dragHandler(
                    {
                        eventSource:          tracker,
                        pointerType:          updateGPoint.type,
                        position:             getPointRelativeToAbsolute( updateGPoint.currentPos, tracker.element ),
                        buttons:              pointsList.buttons,
                        delta:                delta,
                        speed:                updateGPoint.speed,
                        direction:            updateGPoint.direction,
                        shift:                eventInfo.originalEvent.shiftKey,
                        isTouchEvent:         updateGPoint.type === 'touch',
                        originalEvent:        eventInfo.originalEvent,
                        userData:             tracker.userData
                    }
                );
                eventInfo.preventDefault = true;
                delegate.sentDragEvent = true;
            }
        } else if ( pointsList.contacts === 2 ) {
            // Move (2 contacts, use center)
            if ( tracker.moveHandler ) {
                gPointArray = pointsList.asArray();
                tracker.moveHandler(
                    {
                        eventSource:          tracker,
                        pointerType:          gPointArray[ 0 ].type,
                        position:             getPointRelativeToAbsolute( getCenterPoint( gPointArray[ 0 ].currentPos, gPointArray[ 1 ].currentPos ), tracker.element ),
                        buttons:              pointsList.buttons,
                        isTouchEvent:         gPointArray[ 0 ].type === 'touch',
                        originalEvent:        eventInfo.originalEvent,
                        userData:             tracker.userData
                    }
                );
            }

            // Pinch
            if ( tracker.pinchHandler && gPoint.type === 'touch' &&
                                !eventInfo.preventGesture && !eventInfo.defaultPrevented ) {
                delta = delegate.pinchGPoints[ 0 ].currentPos.distanceTo( delegate.pinchGPoints[ 1 ].currentPos );
                if ( delta !== delegate.currentPinchDist ) {
                    delegate.lastPinchDist = delegate.currentPinchDist;
                    delegate.currentPinchDist = delta;
                    delegate.lastPinchCenter = delegate.currentPinchCenter;
                    delegate.currentPinchCenter = getCenterPoint( delegate.pinchGPoints[ 0 ].currentPos, delegate.pinchGPoints[ 1 ].currentPos );
                    tracker.pinchHandler(
                        {
                            eventSource:          tracker,
                            pointerType:          'touch',
                            gesturePoints:        delegate.pinchGPoints,
                            lastCenter:           getPointRelativeToAbsolute( delegate.lastPinchCenter, tracker.element ),
                            center:               getPointRelativeToAbsolute( delegate.currentPinchCenter, tracker.element ),
                            lastDistance:         delegate.lastPinchDist,
                            distance:             delegate.currentPinchDist,
                            shift:                eventInfo.originalEvent.shiftKey,
                            originalEvent:        eventInfo.originalEvent,
                            userData:             tracker.userData
                        }
                    );
                    eventInfo.preventDefault = true;
                }
            }
        }
    }


    /**
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker} tracker
     *     A reference to the MouseTracker instance.
     * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
     *     Processing info for originating DOM event.
     * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
     *      Gesture points associated with the event.
     */
    function updatePointerCancel( tracker, eventInfo, gPoint ) {
        var pointsList = tracker.getActivePointersListByType( gPoint.type ),
            updateGPoint;

        updateGPoint = pointsList.getById( gPoint.id );

        if ( updateGPoint ) {
            stopTrackingPointer( tracker, pointsList, updateGPoint );
        }
    }


    /**
     * @private
     * @inner
     */
    function handlePointerStop( tracker, originalMoveEvent, pointerType ) {
        if ( tracker.stopHandler ) {
            tracker.stopHandler( {
                eventSource:          tracker,
                pointerType:          pointerType,
                position:             getMouseRelative( originalMoveEvent, tracker.element ),
                buttons:              tracker.getActivePointersListByType( pointerType ).buttons,
                isTouchEvent:         pointerType === 'touch',
                originalEvent:        originalMoveEvent,
                userData:             tracker.userData
            } );
        }
    }

}(OpenSeadragon));

/*
 * OpenSeadragon - Control
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * An enumeration of supported locations where controls can be anchored.
 * The anchoring is always relative to the container.
 * @member ControlAnchor
 * @memberof OpenSeadragon
 * @static
 * @type {Object}
 * @property {Number} NONE
 * @property {Number} TOP_LEFT
 * @property {Number} TOP_RIGHT
 * @property {Number} BOTTOM_LEFT
 * @property {Number} BOTTOM_RIGHT
 * @property {Number} ABSOLUTE
 */
$.ControlAnchor = {
    NONE: 0,
    TOP_LEFT: 1,
    TOP_RIGHT: 2,
    BOTTOM_RIGHT: 3,
    BOTTOM_LEFT: 4,
    ABSOLUTE: 5
};

/**
 * @class Control
 * @classdesc A Control represents any interface element which is meant to allow the user
 * to interact with the zoomable interface. Any control can be anchored to any
 * element.
 *
 * @memberof OpenSeadragon
 * @param {Element} element - the control element to be anchored in the container.
 * @param {Object } options - All required and optional settings for configuring a control element.
 * @param {OpenSeadragon.ControlAnchor} [options.anchor=OpenSeadragon.ControlAnchor.NONE] - the position of the control
 *  relative to the container.
 * @param {Boolean} [options.attachToViewer=true] - Whether the control should be added directly to the viewer, or
 *  directly to the container
 * @param {Boolean} [options.autoFade=true] - Whether the control should have the autofade behavior
 * @param {Element} container - the element to control will be anchored too.
 */
$.Control = function ( element, options, container ) {

    var parent = element.parentNode;
    if (typeof options === 'number')
    {
        $.console.error("Passing an anchor directly into the OpenSeadragon.Control constructor is deprecated; " +
                        "please use an options object instead.  " +
                        "Support for this deprecated variant is scheduled for removal in December 2013");
         options = {anchor: options};
    }
    options.attachToViewer = (typeof options.attachToViewer === 'undefined') ? true : options.attachToViewer;
    /**
     * True if the control should have autofade behavior.
     * @member {Boolean} autoFade
     * @memberof OpenSeadragon.Control#
     */
    this.autoFade = (typeof options.autoFade === 'undefined') ? true : options.autoFade;
    /**
     * The element providing the user interface with some type of control (e.g. a zoom-in button).
     * @member {Element} element
     * @memberof OpenSeadragon.Control#
     */
    this.element    = element;
    /**
     * The position of the Control relative to its container.
     * @member {OpenSeadragon.ControlAnchor} anchor
     * @memberof OpenSeadragon.Control#
     */
    this.anchor     = options.anchor;
    /**
     * The Control's containing element.
     * @member {Element} container
     * @memberof OpenSeadragon.Control#
     */
    this.container  = container;
    /**
     * A neutral element surrounding the control element.
     * @member {Element} wrapper
     * @memberof OpenSeadragon.Control#
     */
    if ( this.anchor === $.ControlAnchor.ABSOLUTE ) {
        this.wrapper    = $.makeNeutralElement( "div" );
        this.wrapper.style.position = "absolute";
        this.wrapper.style.top = typeof (options.top) === "number" ? (options.top + 'px') : options.top;
        this.wrapper.style.left  = typeof (options.left) === "number" ? (options.left + 'px') : options.left;
        this.wrapper.style.height = typeof (options.height) === "number" ? (options.height + 'px') : options.height;
        this.wrapper.style.width  = typeof (options.width) === "number" ? (options.width + 'px') : options.width;
        this.wrapper.style.margin = "0px";
        this.wrapper.style.padding = "0px";

        this.element.style.position = "relative";
        this.element.style.top = "0px";
        this.element.style.left = "0px";
        this.element.style.height = "100%";
        this.element.style.width = "100%";
    } else {
        this.wrapper    = $.makeNeutralElement( "div" );
        this.wrapper.style.display = "inline-block";
        if ( this.anchor === $.ControlAnchor.NONE ) {
            // IE6 fix
            this.wrapper.style.width = this.wrapper.style.height = "100%";
        }
    }
    this.wrapper.appendChild( this.element );

    if (options.attachToViewer ) {
        if ( this.anchor === $.ControlAnchor.TOP_RIGHT ||
             this.anchor === $.ControlAnchor.BOTTOM_RIGHT ) {
            this.container.insertBefore(
                this.wrapper,
                this.container.firstChild
            );
        } else {
            this.container.appendChild( this.wrapper );
        }
    } else {
        parent.appendChild( this.wrapper );
    }

};

/** @lends OpenSeadragon.Control.prototype */
$.Control.prototype = {

    /**
     * Removes the control from the container.
     * @function
     */
    destroy: function() {
        this.wrapper.removeChild( this.element );
        if (this.anchor !== $.ControlAnchor.NONE) {
            this.container.removeChild(this.wrapper);
        }
    },

    /**
     * Determines if the control is currently visible.
     * @function
     * @returns {Boolean} true if currently visible, false otherwise.
     */
    isVisible: function() {
        return this.wrapper.style.display !== "none";
    },

    /**
     * Toggles the visibility of the control.
     * @function
     * @param {Boolean} visible - true to make visible, false to hide.
     */
    setVisible: function( visible ) {
        this.wrapper.style.display = visible ?
            ( this.anchor === $.ControlAnchor.ABSOLUTE ? 'block' : 'inline-block' ) :
            "none";
    },

    /**
     * Sets the opacity level for the control.
     * @function
     * @param {Number} opactiy - a value between 1 and 0 inclusively.
     */
    setOpacity: function( opacity ) {
        if ( this.element[ $.SIGNAL ] && $.Browser.vendor === $.BROWSERS.IE ) {
            $.setElementOpacity( this.element, opacity, true );
        } else {
            $.setElementOpacity( this.wrapper, opacity, true );
        }
    }
};

}( OpenSeadragon ));

/*
 * OpenSeadragon - ControlDock
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){
    /**
     * @class ControlDock
     * @classdesc Provides a container element (a &lt;form&gt; element) with support for the layout of control elements.
     *
     * @memberof OpenSeadragon
     */
    $.ControlDock = function( options ){
        var layouts = [ 'topleft', 'topright', 'bottomright', 'bottomleft'],
            layout,
            i;

        $.extend( true, this, {
            id: 'controldock-' + $.now() + '-' + Math.floor(Math.random() * 1000000),
            container: $.makeNeutralElement( 'div' ),
            controls: []
        }, options );

        // Disable the form's submit; otherwise button clicks and return keys
        // can trigger it.
        this.container.onsubmit = function() {
            return false;
        };

        if( this.element ){
            this.element = $.getElement( this.element );
            this.element.appendChild( this.container );
            this.element.style.position = 'relative';
            this.container.style.width = '100%';
            this.container.style.height = '100%';
        }

        for( i = 0; i < layouts.length; i++ ){
            layout = layouts[ i ];
            this.controls[ layout ] = $.makeNeutralElement( "div" );
            this.controls[ layout ].style.position = 'absolute';
            if ( layout.match( 'left' ) ){
                this.controls[ layout ].style.left = '0px';
            }
            if ( layout.match( 'right' ) ){
                this.controls[ layout ].style.right = '0px';
            }
            if ( layout.match( 'top' ) ){
                this.controls[ layout ].style.top = '0px';
            }
            if ( layout.match( 'bottom' ) ){
                this.controls[ layout ].style.bottom = '0px';
            }
        }

        this.container.appendChild( this.controls.topleft );
        this.container.appendChild( this.controls.topright );
        this.container.appendChild( this.controls.bottomright );
        this.container.appendChild( this.controls.bottomleft );
    };

    /** @lends OpenSeadragon.ControlDock.prototype */
    $.ControlDock.prototype = {

        /**
         * @function
         */
        addControl: function ( element, controlOptions ) {
            element = $.getElement( element );
            var div = null;

            if ( getControlIndex( this, element ) >= 0 ) {
                return;     // they're trying to add a duplicate control
            }

            switch ( controlOptions.anchor ) {
                case $.ControlAnchor.TOP_RIGHT:
                    div = this.controls.topright;
                    element.style.position = "relative";
                    element.style.paddingRight = "0px";
                    element.style.paddingTop = "0px";
                    break;
                case $.ControlAnchor.BOTTOM_RIGHT:
                    div = this.controls.bottomright;
                    element.style.position = "relative";
                    element.style.paddingRight = "0px";
                    element.style.paddingBottom = "0px";
                    break;
                case $.ControlAnchor.BOTTOM_LEFT:
                    div = this.controls.bottomleft;
                    element.style.position = "relative";
                    element.style.paddingLeft = "0px";
                    element.style.paddingBottom = "0px";
                    break;
                case $.ControlAnchor.TOP_LEFT:
                    div = this.controls.topleft;
                    element.style.position = "relative";
                    element.style.paddingLeft = "0px";
                    element.style.paddingTop = "0px";
                    break;
                case $.ControlAnchor.ABSOLUTE:
                    div = this.container;
                    element.style.margin = "0px";
                    element.style.padding = "0px";
                    break;
                default:
                case $.ControlAnchor.NONE:
                    div = this.container;
                    element.style.margin = "0px";
                    element.style.padding = "0px";
                    break;
            }

            this.controls.push(
                new $.Control( element, controlOptions, div )
            );
            element.style.display = "inline-block";
        },


        /**
         * @function
         * @returns {OpenSeadragon.ControlDock} Chainable.
         */
        removeControl: function ( element ) {
            element = $.getElement( element );
            var i = getControlIndex( this, element );

            if ( i >= 0 ) {
                this.controls[ i ].destroy();
                this.controls.splice( i, 1 );
            }

            return this;
        },

        /**
         * @function
         * @returns {OpenSeadragon.ControlDock} Chainable.
         */
        clearControls: function () {
            while ( this.controls.length > 0 ) {
                this.controls.pop().destroy();
            }

            return this;
        },


        /**
         * @function
         * @returns {Boolean}
         */
        areControlsEnabled: function () {
            var i;

            for ( i = this.controls.length - 1; i >= 0; i-- ) {
                if ( this.controls[ i ].isVisible() ) {
                    return true;
                }
            }

            return false;
        },


        /**
         * @function
         * @returns {OpenSeadragon.ControlDock} Chainable.
         */
        setControlsEnabled: function( enabled ) {
            var i;

            for ( i = this.controls.length - 1; i >= 0; i-- ) {
                this.controls[ i ].setVisible( enabled );
            }

            return this;
        }

    };


    ///////////////////////////////////////////////////////////////////////////////
    // Utility methods
    ///////////////////////////////////////////////////////////////////////////////
    function getControlIndex( dock, element ) {
        var controls = dock.controls,
            i;

        for ( i = controls.length - 1; i >= 0; i-- ) {
            if ( controls[ i ].element === element ) {
                return i;
            }
        }

        return -1;
    }

}( OpenSeadragon ));

/*
 * OpenSeadragon - Placement
 *
 * Copyright (C) 2010-2016 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function($) {

    /**
     * An enumeration of positions to anchor an element.
     * @member Placement
     * @memberOf OpenSeadragon
     * @static
     * @readonly
     * @property {OpenSeadragon.Placement} CENTER
     * @property {OpenSeadragon.Placement} TOP_LEFT
     * @property {OpenSeadragon.Placement} TOP
     * @property {OpenSeadragon.Placement} TOP_RIGHT
     * @property {OpenSeadragon.Placement} RIGHT
     * @property {OpenSeadragon.Placement} BOTTOM_RIGHT
     * @property {OpenSeadragon.Placement} BOTTOM
     * @property {OpenSeadragon.Placement} BOTTOM_LEFT
     * @property {OpenSeadragon.Placement} LEFT
     */
    $.Placement = $.freezeObject({
        CENTER:       0,
        TOP_LEFT:     1,
        TOP:          2,
        TOP_RIGHT:    3,
        RIGHT:        4,
        BOTTOM_RIGHT: 5,
        BOTTOM:       6,
        BOTTOM_LEFT:  7,
        LEFT:         8,
        properties: {
            0: {
                isLeft: false,
                isHorizontallyCentered: true,
                isRight: false,
                isTop: false,
                isVerticallyCentered: true,
                isBottom: false
            },
            1: {
                isLeft: true,
                isHorizontallyCentered: false,
                isRight: false,
                isTop: true,
                isVerticallyCentered: false,
                isBottom: false
            },
            2: {
                isLeft: false,
                isHorizontallyCentered: true,
                isRight: false,
                isTop: true,
                isVerticallyCentered: false,
                isBottom: false
            },
            3: {
                isLeft: false,
                isHorizontallyCentered: false,
                isRight: true,
                isTop: true,
                isVerticallyCentered: false,
                isBottom: false
            },
            4: {
                isLeft: false,
                isHorizontallyCentered: false,
                isRight: true,
                isTop: false,
                isVerticallyCentered: true,
                isBottom: false
            },
            5: {
                isLeft: false,
                isHorizontallyCentered: false,
                isRight: true,
                isTop: false,
                isVerticallyCentered: false,
                isBottom: true
            },
            6: {
                isLeft: false,
                isHorizontallyCentered: true,
                isRight: false,
                isTop: false,
                isVerticallyCentered: false,
                isBottom: true
            },
            7: {
                isLeft: true,
                isHorizontallyCentered: false,
                isRight: false,
                isTop: false,
                isVerticallyCentered: false,
                isBottom: true
            },
            8: {
                isLeft: true,
                isHorizontallyCentered: false,
                isRight: false,
                isTop: false,
                isVerticallyCentered: true,
                isBottom: false
            }
        }
    });

}(OpenSeadragon));

/*
 * OpenSeadragon - Viewer
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

// dictionary from hash to private properties
var THIS = {};
var nextHash = 1;

/**
 *
 * The main point of entry into creating a zoomable image on the page.<br>
 * <br>
 * We have provided an idiomatic javascript constructor which takes
 * a single object, but still support the legacy positional arguments.<br>
 * <br>
 * The options below are given in order that they appeared in the constructor
 * as arguments and we translate a positional call into an idiomatic call.<br>
 * <br>
 * To create a viewer, you can use either of this methods:<br>
 * <ul>
 * <li><code>var viewer = new OpenSeadragon.Viewer(options);</code></li>
 * <li><code>var viewer = OpenSeadragon(options);</code></li>
 * </ul>
 * @class Viewer
 * @classdesc The main OpenSeadragon viewer class.
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.EventSource
 * @extends OpenSeadragon.ControlDock
 * @param {OpenSeadragon.Options} options - Viewer options.
 *
 **/
$.Viewer = function( options ) {

    var args  = arguments,
        _this = this,
        i;


    //backward compatibility for positional args while preferring more
    //idiomatic javascript options object as the only argument
    if( !$.isPlainObject( options ) ){
        options = {
            id:                 args[ 0 ],
            xmlPath:            args.length > 1 ? args[ 1 ] : undefined,
            prefixUrl:          args.length > 2 ? args[ 2 ] : undefined,
            controls:           args.length > 3 ? args[ 3 ] : undefined,
            overlays:           args.length > 4 ? args[ 4 ] : undefined
        };
    }

    //options.config and the general config argument are deprecated
    //in favor of the more direct specification of optional settings
    //being pass directly on the options object
    if ( options.config ){
        $.extend( true, options, options.config );
        delete options.config;
    }

    //Public properties
    //Allow the options object to override global defaults
    $.extend( true, this, {

        //internal state and dom identifiers
        id:             options.id,
        hash:           options.hash || nextHash++,
        /**
         * Index for page to be shown first next time open() is called (only used in sequenceMode).
         * @member {Number} initialPage
         * @memberof OpenSeadragon.Viewer#
         */
        initialPage:    0,

        //dom nodes
        /**
         * The parent element of this Viewer instance, passed in when the Viewer was created.
         * @member {Element} element
         * @memberof OpenSeadragon.Viewer#
         */
        element:        null,
        /**
         * A &lt;div&gt; element (provided by {@link OpenSeadragon.ControlDock}), the base element of this Viewer instance.<br><br>
         * Child element of {@link OpenSeadragon.Viewer#element}.
         * @member {Element} container
         * @memberof OpenSeadragon.Viewer#
         */
        container:      null,
        /**
         * A &lt;div&gt; element, the element where user-input events are handled for panning and zooming.<br><br>
         * Child element of {@link OpenSeadragon.Viewer#container},
         * positioned on top of {@link OpenSeadragon.Viewer#keyboardCommandArea}.<br><br>
         * The parent of {@link OpenSeadragon.Drawer#canvas} instances.
         * @member {Element} canvas
         * @memberof OpenSeadragon.Viewer#
         */
        canvas:         null,

        // Overlays list. An overlay allows to add html on top of the viewer.
        overlays:           [],
        // Container inside the canvas where overlays are drawn.
        overlaysContainer:  null,

        //private state properties
        previousBody:   [],

        //This was originally initialized in the constructor and so could never
        //have anything in it.  now it can because we allow it to be specified
        //in the options and is only empty by default if not specified. Also
        //this array was returned from get_controls which I find confusing
        //since this object has a controls property which is treated in other
        //functions like clearControls.  I'm removing the accessors.
        customControls: [],

        //These are originally not part options but declared as members
        //in initialize.  It's still considered idiomatic to put them here
        //source is here for backwards compatibility. It is not an official
        //part of the API and should not be relied upon.
        source:         null,
        /**
         * Handles rendering of tiles in the viewer. Created for each TileSource opened.
         * @member {OpenSeadragon.Drawer} drawer
         * @memberof OpenSeadragon.Viewer#
         */
        drawer:             null,
        /**
         * Keeps track of all of the tiled images in the scene.
         * @member {OpenSeadragon.World} world
         * @memberof OpenSeadragon.Viewer#
         */
        world:              null,
        /**
         * Handles coordinate-related functionality - zoom, pan, rotation, etc. Created for each TileSource opened.
         * @member {OpenSeadragon.Viewport} viewport
         * @memberof OpenSeadragon.Viewer#
         */
        viewport:       null,
        /**
         * @member {OpenSeadragon.Navigator} navigator
         * @memberof OpenSeadragon.Viewer#
         */
        navigator:      null,

        //A collection viewport is a separate viewport used to provide
        //simultaneous rendering of sets of tiles
        collectionViewport:     null,
        collectionDrawer:       null,

        //UI image resources
        //TODO: rename navImages to uiImages
        navImages:      null,

        //interface button controls
        buttonGroup:        null,

        //TODO: this is defunct so safely remove it
        profiler:       null

    }, $.DEFAULT_SETTINGS, options );

    if ( typeof ( this.hash) === "undefined" ) {
        throw new Error("A hash must be defined, either by specifying options.id or options.hash.");
    }
    if ( typeof ( THIS[ this.hash ] ) !== "undefined" ) {
        // We don't want to throw an error here, as the user might have discarded
        // the previous viewer with the same hash and now want to recreate it.
        $.console.warn("Hash " + this.hash + " has already been used.");
    }

    //Private state properties
    THIS[ this.hash ] = {
        fsBoundsDelta:     new $.Point( 1, 1 ),
        prevContainerSize: null,
        animating:         false,
        forceRedraw:       false,
        needsResize:       false,
        forceResize:       false,
        mouseInside:       false,
        group:             null,
        // whether we should be continuously zooming
        zooming:           false,
        // how much we should be continuously zooming by
        zoomFactor:        null,
        lastZoomTime:      null,
        fullPage:          false,
        onfullscreenchange: null,
        lastClickTime: null,
        draggingToZoom: false,
    };

    this._sequenceIndex = 0;
    this._firstOpen = true;
    this._updateRequestId = null;
    this._loadQueue = [];
    this.currentOverlays = [];
    this._updatePixelDensityRatioBind = null;

    this._lastScrollTime = $.now(); // variable used to help normalize the scroll event speed of different devices

    //Inherit some behaviors and properties
    $.EventSource.call( this );

    this.addHandler( 'open-failed', function ( event ) {
        var msg = $.getString( "Errors.OpenFailed", event.eventSource, event.message);
        _this._showMessage( msg );
    });

    $.ControlDock.call( this, options );

    //Deal with tile sources
    if (this.xmlPath) {
        //Deprecated option.  Now it is preferred to use the tileSources option
        this.tileSources = [ this.xmlPath ];
    }

    this.element              = this.element || document.getElementById( this.id );
    this.canvas               = $.makeNeutralElement( "div" );

    this.canvas.className = "openseadragon-canvas";
    (function( style ){
        style.width    = "100%";
        style.height   = "100%";
        style.overflow = "hidden";
        style.position = "absolute";
        style.top      = "0px";
        style.left     = "0px";
    }(this.canvas.style));
    $.setElementTouchActionNone( this.canvas );
    if (options.tabIndex !== "") {
        this.canvas.tabIndex = (options.tabIndex === undefined ? 0 : options.tabIndex);
    }

    //the container is created through applying the ControlDock constructor above
    this.container.className = "openseadragon-container";
    (function( style ){
        style.width     = "100%";
        style.height    = "100%";
        style.position  = "relative";
        style.overflow  = "hidden";
        style.left      = "0px";
        style.top       = "0px";
        style.textAlign = "left";  // needed to protect against
    }( this.container.style ));
    $.setElementTouchActionNone( this.container );

    this.container.insertBefore( this.canvas, this.container.firstChild );
    this.element.appendChild( this.container );

    //Used for toggling between fullscreen and default container size
    //TODO: these can be closure private and shared across Viewer
    //      instances.
    this.bodyWidth      = document.body.style.width;
    this.bodyHeight     = document.body.style.height;
    this.bodyOverflow   = document.body.style.overflow;
    this.docOverflow    = document.documentElement.style.overflow;

    this.innerTracker = new $.MouseTracker({
        userData:                 'Viewer.innerTracker',
        element:                  this.canvas,
        startDisabled:            !this.mouseNavEnabled,
        clickTimeThreshold:       this.clickTimeThreshold,
        clickDistThreshold:       this.clickDistThreshold,
        dblClickTimeThreshold:    this.dblClickTimeThreshold,
        dblClickDistThreshold:    this.dblClickDistThreshold,
        contextMenuHandler:       $.delegate( this, onCanvasContextMenu ),
        keyDownHandler:           $.delegate( this, onCanvasKeyDown ),
        keyHandler:               $.delegate( this, onCanvasKeyPress ),
        clickHandler:             $.delegate( this, onCanvasClick ),
        dblClickHandler:          $.delegate( this, onCanvasDblClick ),
        dragHandler:              $.delegate( this, onCanvasDrag ),
        dragEndHandler:           $.delegate( this, onCanvasDragEnd ),
        enterHandler:             $.delegate( this, onCanvasEnter ),
        leaveHandler:             $.delegate( this, onCanvasLeave ),
        pressHandler:             $.delegate( this, onCanvasPress ),
        releaseHandler:           $.delegate( this, onCanvasRelease ),
        nonPrimaryPressHandler:   $.delegate( this, onCanvasNonPrimaryPress ),
        nonPrimaryReleaseHandler: $.delegate( this, onCanvasNonPrimaryRelease ),
        scrollHandler:            $.delegate( this, onCanvasScroll ),
        pinchHandler:             $.delegate( this, onCanvasPinch )
    });

    this.outerTracker = new $.MouseTracker({
        userData:              'Viewer.outerTracker',
        element:               this.container,
        startDisabled:         !this.mouseNavEnabled,
        clickTimeThreshold:    this.clickTimeThreshold,
        clickDistThreshold:    this.clickDistThreshold,
        dblClickTimeThreshold: this.dblClickTimeThreshold,
        dblClickDistThreshold: this.dblClickDistThreshold,
        enterHandler:          $.delegate( this, onContainerEnter ),
        leaveHandler:          $.delegate( this, onContainerLeave )
    });

    if( this.toolbar ){
        this.toolbar = new $.ControlDock({ element: this.toolbar });
    }

    this.bindStandardControls();

    THIS[ this.hash ].prevContainerSize = _getSafeElemSize( this.container );

    if(window.ResizeObserver){
        this._autoResizePolling = false;
        this._resizeObserver = new ResizeObserver(function(){
            THIS[_this.hash].needsResize = true;
        });

        this._resizeObserver.observe(this.container, {});
    } else {
        this._autoResizePolling = true;
    }

    // Create the world
    this.world = new $.World({
        viewer: this
    });

    this.world.addHandler('add-item', function(event) {
        // For backwards compatibility, we maintain the source property
        _this.source = _this.world.getItemAt(0).source;

        THIS[ _this.hash ].forceRedraw = true;

        if (!_this._updateRequestId) {
            _this._updateRequestId = scheduleUpdate( _this, updateMulti );
        }
    });

    this.world.addHandler('remove-item', function(event) {
        // For backwards compatibility, we maintain the source property
        if (_this.world.getItemCount()) {
            _this.source = _this.world.getItemAt(0).source;
        } else {
            _this.source = null;
        }

        THIS[ _this.hash ].forceRedraw = true;
    });

    this.world.addHandler('metrics-change', function(event) {
        if (_this.viewport) {
            _this.viewport._setContentBounds(_this.world.getHomeBounds(), _this.world.getContentFactor());
        }
    });

    this.world.addHandler('item-index-change', function(event) {
        // For backwards compatibility, we maintain the source property
        _this.source = _this.world.getItemAt(0).source;
    });

    // Create the viewport
    this.viewport = new $.Viewport({
        containerSize:              THIS[ this.hash ].prevContainerSize,
        springStiffness:            this.springStiffness,
        animationTime:              this.animationTime,
        minZoomImageRatio:          this.minZoomImageRatio,
        maxZoomPixelRatio:          this.maxZoomPixelRatio,
        visibilityRatio:            this.visibilityRatio,
        wrapHorizontal:             this.wrapHorizontal,
        wrapVertical:               this.wrapVertical,
        defaultZoomLevel:           this.defaultZoomLevel,
        minZoomLevel:               this.minZoomLevel,
        maxZoomLevel:               this.maxZoomLevel,
        viewer:                     this,
        degrees:                    this.degrees,
        flipped:                    this.flipped,
        navigatorRotate:            this.navigatorRotate,
        homeFillsViewer:            this.homeFillsViewer,
        margins:                    this.viewportMargins,
        silenceMultiImageWarnings:  this.silenceMultiImageWarnings
    });

    this.viewport._setContentBounds(this.world.getHomeBounds(), this.world.getContentFactor());

    // Create the image loader
    this.imageLoader = new $.ImageLoader({
        jobLimit: this.imageLoaderLimit,
        timeout: options.timeout
    });

    // Create the tile cache
    this.tileCache = new $.TileCache({
        maxImageCacheCount: this.maxImageCacheCount
    });

    // Create the drawer
    this.drawer = new $.Drawer({
        viewer:             this,
        viewport:           this.viewport,
        element:            this.canvas,
        debugGridColor:     this.debugGridColor
    });

    // Overlay container
    this.overlaysContainer    = $.makeNeutralElement( "div" );
    this.canvas.appendChild( this.overlaysContainer );

    // Now that we have a drawer, see if it supports rotate. If not we need to remove the rotate buttons
    if (!this.drawer.canRotate()) {
        // Disable/remove the rotate left/right buttons since they aren't supported
        if (this.rotateLeft) {
            i = this.buttonGroup.buttons.indexOf(this.rotateLeft);
            this.buttonGroup.buttons.splice(i, 1);
            this.buttonGroup.element.removeChild(this.rotateLeft.element);
        }
        if (this.rotateRight) {
            i = this.buttonGroup.buttons.indexOf(this.rotateRight);
            this.buttonGroup.buttons.splice(i, 1);
            this.buttonGroup.element.removeChild(this.rotateRight.element);
        }
    }

    this._addUpdatePixelDensityRatioEvent();

    //Instantiate a navigator if configured
    if ( this.showNavigator){
        this.navigator = new $.Navigator({
            element:           this.navigatorElement,
            id:                this.navigatorId,
            position:          this.navigatorPosition,
            sizeRatio:         this.navigatorSizeRatio,
            maintainSizeRatio: this.navigatorMaintainSizeRatio,
            top:               this.navigatorTop,
            left:              this.navigatorLeft,
            width:             this.navigatorWidth,
            height:            this.navigatorHeight,
            autoResize:        this.navigatorAutoResize,
            autoFade:          this.navigatorAutoFade,
            prefixUrl:         this.prefixUrl,
            viewer:            this,
            navigatorRotate:   this.navigatorRotate,
            background:        this.navigatorBackground,
            opacity:           this.navigatorOpacity,
            borderColor:       this.navigatorBorderColor,
            displayRegionColor: this.navigatorDisplayRegionColor,
            crossOriginPolicy: this.crossOriginPolicy,
            animationTime:     this.animationTime,
        });
    }

    // Sequence mode
    if (this.sequenceMode) {
        this.bindSequenceControls();
    }

    // Open initial tilesources
    if (this.tileSources) {
        this.open( this.tileSources );
    }

    // Add custom controls
    for ( i = 0; i < this.customControls.length; i++ ) {
        this.addControl(
            this.customControls[ i ].id,
            {anchor: this.customControls[ i ].anchor}
        );
    }

    // Initial fade out
    $.requestAnimationFrame( function(){
        beginControlsAutoHide( _this );
    } );

    // Initial canvas options
    if ( this.imageSmoothingEnabled !== undefined && !this.imageSmoothingEnabled){
        this.drawer.setImageSmoothingEnabled(this.imageSmoothingEnabled);
    }

    // Register the viewer
    $._viewers.set(this.element, this);
};

$.extend( $.Viewer.prototype, $.EventSource.prototype, $.ControlDock.prototype, /** @lends OpenSeadragon.Viewer.prototype */{


    /**
     * @function
     * @returns {Boolean}
     */
    isOpen: function () {
        return !!this.world.getItemCount();
    },

    // deprecated
    openDzi: function ( dzi ) {
        $.console.error( "[Viewer.openDzi] this function is deprecated; use Viewer.open() instead." );
        return this.open( dzi );
    },

    // deprecated
    openTileSource: function ( tileSource ) {
        $.console.error( "[Viewer.openTileSource] this function is deprecated; use Viewer.open() instead." );
        return this.open( tileSource );
    },

    //deprecated
    get buttons () {
        $.console.warn('Viewer.buttons is deprecated; Please use Viewer.buttonGroup');
        return this.buttonGroup;
    },

    /**
     * Open tiled images into the viewer, closing any others.
     * To get the TiledImage instance created by open, add an event listener for
     * {@link OpenSeadragon.Viewer.html#.event:open}, which when fired can be used to get access
     * to the instance, i.e., viewer.world.getItemAt(0).
     * @function
     * @param {Array|String|Object|Function} tileSources - This can be a TiledImage
     * specifier, a TileSource specifier, or an array of either. A TiledImage specifier
     * is the same as the options parameter for {@link OpenSeadragon.Viewer#addTiledImage},
     * except for the index property; images are added in sequence.
     * A TileSource specifier is anything you could pass as the tileSource property
     * of the options parameter for {@link OpenSeadragon.Viewer#addTiledImage}.
     * @param {Number} initialPage - If sequenceMode is true, display this page initially
     * for the given tileSources. If specified, will overwrite the Viewer's existing initialPage property.
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:open
     * @fires OpenSeadragon.Viewer.event:open-failed
     */
    open: function (tileSources, initialPage) {
        var _this = this;

        this.close();

        if (!tileSources) {
            return this;
        }

        if (this.sequenceMode && $.isArray(tileSources)) {
            if (this.referenceStrip) {
                this.referenceStrip.destroy();
                this.referenceStrip = null;
            }

            if (typeof initialPage !== 'undefined' && !isNaN(initialPage)) {
              this.initialPage = initialPage;
            }

            this.tileSources = tileSources;
            this._sequenceIndex = Math.max(0, Math.min(this.tileSources.length - 1, this.initialPage));
            if (this.tileSources.length) {
                this.open(this.tileSources[this._sequenceIndex]);

                if ( this.showReferenceStrip ){
                    this.addReferenceStrip();
                }
            }

            this._updateSequenceButtons( this._sequenceIndex );
            return this;
        }

        if (!$.isArray(tileSources)) {
            tileSources = [tileSources];
        }

        if (!tileSources.length) {
            return this;
        }

        this._opening = true;

        var expected = tileSources.length;
        var successes = 0;
        var failures = 0;
        var failEvent;

        var checkCompletion = function() {
            if (successes + failures === expected) {
                if (successes) {
                    if (_this._firstOpen || !_this.preserveViewport) {
                        _this.viewport.goHome( true );
                        _this.viewport.update();
                    }

                    _this._firstOpen = false;

                    var source = tileSources[0];
                    if (source.tileSource) {
                        source = source.tileSource;
                    }

                    // Global overlays
                    if( _this.overlays && !_this.preserveOverlays ){
                        for ( var i = 0; i < _this.overlays.length; i++ ) {
                            _this.currentOverlays[ i ] = getOverlayObject( _this, _this.overlays[ i ] );
                        }
                    }

                    _this._drawOverlays();
                    _this._opening = false;

                    /**
                     * Raised when the viewer has opened and loaded one or more TileSources.
                     *
                     * @event open
                     * @memberof OpenSeadragon.Viewer
                     * @type {object}
                     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
                     * @property {OpenSeadragon.TileSource} source - The tile source that was opened.
                     * @property {?Object} userData - Arbitrary subscriber-defined object.
                     */
                    // TODO: what if there are multiple sources?
                    _this.raiseEvent( 'open', { source: source } );
                } else {
                    _this._opening = false;

                    /**
                     * Raised when an error occurs loading a TileSource.
                     *
                     * @event open-failed
                     * @memberof OpenSeadragon.Viewer
                     * @type {object}
                     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
                     * @property {String} message - Information about what failed.
                     * @property {String} source - The tile source that failed.
                     * @property {?Object} userData - Arbitrary subscriber-defined object.
                     */
                    _this.raiseEvent( 'open-failed', failEvent );
                }
            }
        };

        var doOne = function(options) {
            if (!$.isPlainObject(options) || !options.tileSource) {
                options = {
                    tileSource: options
                };
            }

            if (options.index !== undefined) {
                $.console.error('[Viewer.open] setting indexes here is not supported; use addTiledImage instead');
                delete options.index;
            }

            if (options.collectionImmediately === undefined) {
                options.collectionImmediately = true;
            }

            var originalSuccess = options.success;
            options.success = function(event) {
                successes++;

                // TODO: now that options has other things besides tileSource, the overlays
                // should probably be at the options level, not the tileSource level.
                if (options.tileSource.overlays) {
                    for (var i = 0; i < options.tileSource.overlays.length; i++) {
                        _this.addOverlay(options.tileSource.overlays[i]);
                    }
                }

                if (originalSuccess) {
                    originalSuccess(event);
                }

                checkCompletion();
            };

            var originalError = options.error;
            options.error = function(event) {
                failures++;

                if (!failEvent) {
                    failEvent = event;
                }

                if (originalError) {
                    originalError(event);
                }

                checkCompletion();
            };

            _this.addTiledImage(options);
        };

        // TileSources
        for (var i = 0; i < tileSources.length; i++) {
            doOne(tileSources[i]);
        }

        return this;
    },


    /**
     * @function
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:close
     */
    close: function ( ) {
        if ( !THIS[ this.hash ] ) {
            //this viewer has already been destroyed: returning immediately
            return this;
        }

        this._opening = false;

        if ( this.navigator ) {
            this.navigator.close();
        }

        if (!this.preserveOverlays) {
            this.clearOverlays();
            this.overlaysContainer.innerHTML = "";
        }

        THIS[ this.hash ].animating = false;

        this.world.removeAll();
        this.imageLoader.clear();

        /**
         * Raised when the viewer is closed (see {@link OpenSeadragon.Viewer#close}).
         *
         * @event close
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'close' );

        return this;
    },


    /**
     * Function to destroy the viewer and clean up everything created by OpenSeadragon.
     *
     * Example:
     * var viewer = OpenSeadragon({
     *   [...]
     * });
     *
     * //when you are done with the viewer:
     * viewer.destroy();
     * viewer = null; //important
     *
     * @function
     * @fires OpenSeadragon.Viewer.event:before-destroy
     * @fires OpenSeadragon.Viewer.event:destroy
     */
    destroy: function( ) {
        if ( !THIS[ this.hash ] ) {
            //this viewer has already been destroyed: returning immediately
            return;
        }

        /**
         * Raised when the viewer is about to be destroyed (see {@link OpenSeadragon.Viewer#before-destroy}).
         *
         * @event before-destroy
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'before-destroy' );

        this._removeUpdatePixelDensityRatioEvent();

        this.close();

        this.clearOverlays();
        this.overlaysContainer.innerHTML = "";

        //TODO: implement this...
        //this.unbindSequenceControls()
        //this.unbindStandardControls()
        if (this._resizeObserver){
            this._resizeObserver.disconnect();
        }

        if (this.referenceStrip) {
            this.referenceStrip.destroy();
            this.referenceStrip = null;
        }

        if ( this._updateRequestId !== null ) {
            $.cancelAnimationFrame( this._updateRequestId );
            this._updateRequestId = null;
        }

        if ( this.drawer ) {
            this.drawer.destroy();
        }

        if ( this.navigator ) {
            this.navigator.destroy();
            THIS[ this.navigator.hash ] = null;
            delete THIS[ this.navigator.hash ];
            this.navigator = null;
        }


        if (this.buttonGroup) {
            this.buttonGroup.destroy();
        } else if (this.customButtons) {
            while (this.customButtons.length) {
                this.customButtons.pop().destroy();
            }
        }

        if (this.paging) {
            this.paging.destroy();
        }

        // Go through top element (passed to us) and remove all children
        // Use removeChild to make sure it handles SVG or any non-html
        // also it performs better - http://jsperf.com/innerhtml-vs-removechild/15
        if (this.element){
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }
        }

        this.container.onsubmit = null;
        this.clearControls();

        // destroy the mouse trackers
        if (this.innerTracker){
            this.innerTracker.destroy();
        }
        if (this.outerTracker){
            this.outerTracker.destroy();
        }

        THIS[ this.hash ] = null;
        delete THIS[ this.hash ];

        // clear all our references to dom objects
        this.canvas = null;
        this.container = null;

        // Unregister the viewer
        $._viewers.delete(this.element);

        // clear our reference to the main element - they will need to pass it in again, creating a new viewer
        this.element = null;

        /**
         * Raised when the viewer is destroyed (see {@link OpenSeadragon.Viewer#destroy}).
         *
         * @event destroy
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'destroy' );

        this.removeAllHandlers();
    },

    /**
     * @function
     * @returns {Boolean}
     */
    isMouseNavEnabled: function () {
        return this.innerTracker.isTracking();
    },

    /**
     * @function
     * @param {Boolean} enabled - true to enable, false to disable
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:mouse-enabled
     */
    setMouseNavEnabled: function( enabled ){
        this.innerTracker.setTracking( enabled );
        this.outerTracker.setTracking( enabled );
        /**
         * Raised when mouse/touch navigation is enabled or disabled (see {@link OpenSeadragon.Viewer#setMouseNavEnabled}).
         *
         * @event mouse-enabled
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {Boolean} enabled
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'mouse-enabled', { enabled: enabled } );
        return this;
    },


    /**
     * @function
     * @returns {Boolean}
     */
    areControlsEnabled: function () {
        var enabled = this.controls.length,
            i;
        for( i = 0; i < this.controls.length; i++ ){
            enabled = enabled && this.controls[ i ].isVisible();
        }
        return enabled;
    },


    /**
     * Shows or hides the controls (e.g. the default navigation buttons).
     *
     * @function
     * @param {Boolean} true to show, false to hide.
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:controls-enabled
     */
    setControlsEnabled: function( enabled ) {
        if( enabled ){
            abortControlsAutoHide( this );
        } else {
            beginControlsAutoHide( this );
        }
        /**
         * Raised when the navigation controls are shown or hidden (see {@link OpenSeadragon.Viewer#setControlsEnabled}).
         *
         * @event controls-enabled
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {Boolean} enabled
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'controls-enabled', { enabled: enabled } );
        return this;
    },

    /**
     * Turns debugging mode on or off for this viewer.
     *
     * @function
     * @param {Boolean} true to turn debug on, false to turn debug off.
     */
    setDebugMode: function(debugMode){

        for (var i = 0; i < this.world.getItemCount(); i++) {
            this.world.getItemAt(i).debugMode = debugMode;
        }

        this.debugMode = debugMode;
        this.forceRedraw();
    },

    /**
     * @function
     * @returns {Boolean}
     */
    isFullPage: function () {
        return THIS[ this.hash ].fullPage;
    },


    /**
     * Toggle full page mode.
     * @function
     * @param {Boolean} fullPage
     *      If true, enter full page mode.  If false, exit full page mode.
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:pre-full-page
     * @fires OpenSeadragon.Viewer.event:full-page
     */
    setFullPage: function( fullPage ) {

        var body = document.body,
            bodyStyle = body.style,
            docStyle = document.documentElement.style,
            _this = this,
            nodes,
            i;

        //don't bother modifying the DOM if we are already in full page mode.
        if ( fullPage === this.isFullPage() ) {
            return this;
        }

        var fullPageEventArgs = {
            fullPage: fullPage,
            preventDefaultAction: false
        };
        /**
         * Raised when the viewer is about to change to/from full-page mode (see {@link OpenSeadragon.Viewer#setFullPage}).
         *
         * @event pre-full-page
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {Boolean} fullPage - True if entering full-page mode, false if exiting full-page mode.
         * @property {Boolean} preventDefaultAction - Set to true to prevent full-page mode change. Default: false.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'pre-full-page', fullPageEventArgs );
        if ( fullPageEventArgs.preventDefaultAction ) {
            return this;
        }

        if ( fullPage ) {

            this.elementSize = $.getElementSize( this.element );
            this.pageScroll = $.getPageScroll();

            this.elementMargin = this.element.style.margin;
            this.element.style.margin = "0";
            this.elementPadding = this.element.style.padding;
            this.element.style.padding = "0";

            this.bodyMargin = bodyStyle.margin;
            this.docMargin = docStyle.margin;
            bodyStyle.margin = "0";
            docStyle.margin = "0";

            this.bodyPadding = bodyStyle.padding;
            this.docPadding = docStyle.padding;
            bodyStyle.padding = "0";
            docStyle.padding = "0";

            this.bodyWidth = bodyStyle.width;
            this.docWidth = docStyle.width;
            bodyStyle.width = "100%";
            docStyle.width = "100%";

            this.bodyHeight = bodyStyle.height;
            this.docHeight = docStyle.height;
            bodyStyle.height = "100%";
            docStyle.height = "100%";

            this.bodyDisplay = bodyStyle.display;
            bodyStyle.display = "block";

            //when entering full screen on the ipad it wasn't sufficient to leave
            //the body intact as only only the top half of the screen would
            //respond to touch events on the canvas, while the bottom half treated
            //them as touch events on the document body.  Thus we remove and store
            //the bodies elements and replace them when we leave full screen.
            this.previousBody = [];
            THIS[ this.hash ].prevElementParent = this.element.parentNode;
            THIS[ this.hash ].prevNextSibling = this.element.nextSibling;
            THIS[ this.hash ].prevElementWidth = this.element.style.width;
            THIS[ this.hash ].prevElementHeight = this.element.style.height;
            nodes = body.childNodes.length;
            for ( i = 0; i < nodes; i++ ) {
                this.previousBody.push( body.childNodes[ 0 ] );
                body.removeChild( body.childNodes[ 0 ] );
            }

            //If we've got a toolbar, we need to enable the user to use css to
            //preserve it in fullpage mode
            if ( this.toolbar && this.toolbar.element ) {
                //save a reference to the parent so we can put it back
                //in the long run we need a better strategy
                this.toolbar.parentNode = this.toolbar.element.parentNode;
                this.toolbar.nextSibling = this.toolbar.element.nextSibling;
                body.appendChild( this.toolbar.element );

                //Make sure the user has some ability to style the toolbar based
                //on the mode
                $.addClass( this.toolbar.element, 'fullpage' );
            }

            $.addClass( this.element, 'fullpage' );
            body.appendChild( this.element );

            this.element.style.height = '100vh';
            this.element.style.width = '100vw';

            if ( this.toolbar && this.toolbar.element ) {
                this.element.style.height = (
                    $.getElementSize( this.element ).y - $.getElementSize( this.toolbar.element ).y
                ) + 'px';
            }

            THIS[ this.hash ].fullPage = true;

            // mouse will be inside container now
            $.delegate( this, onContainerEnter )( {} );

        } else {

            this.element.style.margin = this.elementMargin;
            this.element.style.padding = this.elementPadding;

            bodyStyle.margin = this.bodyMargin;
            docStyle.margin = this.docMargin;

            bodyStyle.padding = this.bodyPadding;
            docStyle.padding = this.docPadding;

            bodyStyle.width = this.bodyWidth;
            docStyle.width = this.docWidth;

            bodyStyle.height = this.bodyHeight;
            docStyle.height = this.docHeight;

            bodyStyle.display = this.bodyDisplay;

            body.removeChild( this.element );
            nodes = this.previousBody.length;
            for ( i = 0; i < nodes; i++ ) {
                body.appendChild( this.previousBody.shift() );
            }

            $.removeClass( this.element, 'fullpage' );
            THIS[ this.hash ].prevElementParent.insertBefore(
                this.element,
                THIS[ this.hash ].prevNextSibling
            );

            //If we've got a toolbar, we need to enable the user to use css to
            //reset it to its original state
            if ( this.toolbar && this.toolbar.element ) {
                body.removeChild( this.toolbar.element );

                //Make sure the user has some ability to style the toolbar based
                //on the mode
                $.removeClass( this.toolbar.element, 'fullpage' );

                this.toolbar.parentNode.insertBefore(
                    this.toolbar.element,
                    this.toolbar.nextSibling
                );
                delete this.toolbar.parentNode;
                delete this.toolbar.nextSibling;
            }

            this.element.style.width = THIS[ this.hash ].prevElementWidth;
            this.element.style.height = THIS[ this.hash ].prevElementHeight;

            // After exiting fullPage or fullScreen, it can take some time
            // before the browser can actually set the scroll.
            var restoreScrollCounter = 0;
            var restoreScroll = function() {
                $.setPageScroll( _this.pageScroll );
                var pageScroll = $.getPageScroll();
                restoreScrollCounter++;
                if (restoreScrollCounter < 10 &&
                    (pageScroll.x !== _this.pageScroll.x ||
                    pageScroll.y !== _this.pageScroll.y)) {
                    $.requestAnimationFrame( restoreScroll );
                }
            };
            $.requestAnimationFrame( restoreScroll );

            THIS[ this.hash ].fullPage = false;

            // mouse will likely be outside now
            $.delegate( this, onContainerLeave )( { } );

        }

        if ( this.navigator && this.viewport ) {
            this.navigator.update( this.viewport );
        }

        /**
         * Raised when the viewer has changed to/from full-page mode (see {@link OpenSeadragon.Viewer#setFullPage}).
         *
         * @event full-page
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {Boolean} fullPage - True if changed to full-page mode, false if exited full-page mode.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'full-page', { fullPage: fullPage } );

        return this;
    },

    /**
     * Toggle full screen mode if supported. Toggle full page mode otherwise.
     * @function
     * @param {Boolean} fullScreen
     *      If true, enter full screen mode.  If false, exit full screen mode.
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:pre-full-screen
     * @fires OpenSeadragon.Viewer.event:full-screen
     */
    setFullScreen: function( fullScreen ) {
        var _this = this;

        if ( !$.supportsFullScreen ) {
            return this.setFullPage( fullScreen );
        }

        if ( $.isFullScreen() === fullScreen ) {
            return this;
        }

        var fullScreeEventArgs = {
            fullScreen: fullScreen,
            preventDefaultAction: false
        };
        /**
         * Raised when the viewer is about to change to/from full-screen mode (see {@link OpenSeadragon.Viewer#setFullScreen}).
         * Note: the pre-full-screen event is not raised when the user is exiting
         * full-screen mode by pressing the Esc key. In that case, consider using
         * the full-screen, pre-full-page or full-page events.
         *
         * @event pre-full-screen
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {Boolean} fullScreen - True if entering full-screen mode, false if exiting full-screen mode.
         * @property {Boolean} preventDefaultAction - Set to true to prevent full-screen mode change. Default: false.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'pre-full-screen', fullScreeEventArgs );
        if ( fullScreeEventArgs.preventDefaultAction ) {
            return this;
        }

        if ( fullScreen ) {

            this.setFullPage( true );
            // If the full page mode is not actually entered, we need to prevent
            // the full screen mode.
            if ( !this.isFullPage() ) {
                return this;
            }

            this.fullPageStyleWidth = this.element.style.width;
            this.fullPageStyleHeight = this.element.style.height;
            this.element.style.width = '100%';
            this.element.style.height = '100%';

            var onFullScreenChange = function() {
                var isFullScreen = $.isFullScreen();
                if ( !isFullScreen ) {
                    $.removeEvent( document, $.fullScreenEventName, onFullScreenChange );
                    $.removeEvent( document, $.fullScreenErrorEventName, onFullScreenChange );

                    _this.setFullPage( false );
                    if ( _this.isFullPage() ) {
                        _this.element.style.width = _this.fullPageStyleWidth;
                        _this.element.style.height = _this.fullPageStyleHeight;
                    }
                }
                if ( _this.navigator && _this.viewport ) {
                    //09/08/2018 - Fabroh : Fix issue #1504 : Ensure to get the navigator updated on fullscreen out with custom location with a timeout
                    setTimeout(function(){
                        _this.navigator.update( _this.viewport );
                    });
                }
                /**
                 * Raised when the viewer has changed to/from full-screen mode (see {@link OpenSeadragon.Viewer#setFullScreen}).
                 *
                 * @event full-screen
                 * @memberof OpenSeadragon.Viewer
                 * @type {object}
                 * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
                 * @property {Boolean} fullScreen - True if changed to full-screen mode, false if exited full-screen mode.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent( 'full-screen', { fullScreen: isFullScreen } );
            };
            $.addEvent( document, $.fullScreenEventName, onFullScreenChange );
            $.addEvent( document, $.fullScreenErrorEventName, onFullScreenChange );

            $.requestFullScreen( document.body );

        } else {
            $.exitFullScreen();
        }
        return this;
    },

    /**
     * @function
     * @returns {Boolean}
     */
    isVisible: function () {
        return this.container.style.visibility !== "hidden";
    },


    //
    /**
     * @function
     * @returns {Boolean} returns true if the viewer is in fullscreen
     */
     isFullScreen: function () {
        return $.isFullScreen() && this.isFullPage();
    },

    /**
     * @function
     * @param {Boolean} visible
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:visible
     */
    setVisible: function( visible ){
        this.container.style.visibility = visible ? "" : "hidden";
        /**
         * Raised when the viewer is shown or hidden (see {@link OpenSeadragon.Viewer#setVisible}).
         *
         * @event visible
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {Boolean} visible
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'visible', { visible: visible } );
        return this;
    },

    /**
     * Add a tiled image to the viewer.
     * options.tileSource can be anything that {@link OpenSeadragon.Viewer#open}
     *  supports except arrays of images.
     * Note that you can specify options.width or options.height, but not both.
     * The other dimension will be calculated according to the item's aspect ratio.
     * If collectionMode is on (see {@link OpenSeadragon.Options}), the new image is
     * automatically arranged with the others.
     * @function
     * @param {Object} options
     * @param {String|Object|Function} options.tileSource - The TileSource specifier.
     * A String implies a url used to determine the tileSource implementation
     *      based on the file extension of url. JSONP is implied by *.js,
     *      otherwise the url is retrieved as text and the resulting text is
     *      introspected to determine if its json, xml, or text and parsed.
     * An Object implies an inline configuration which has a single
     *      property sufficient for being able to determine tileSource
     *      implementation. If the object has a property which is a function
     *      named 'getTileUrl', it is treated as a custom TileSource.
     * @param {Number} [options.index] The index of the item. Added on top of
     * all other items if not specified.
     * @param {Boolean} [options.replace=false] If true, the item at options.index will be
     * removed and the new item is added in its place. options.tileSource will be
     * interpreted and fetched if necessary before the old item is removed to avoid leaving
     * a gap in the world.
     * @param {Number} [options.x=0] The X position for the image in viewport coordinates.
     * @param {Number} [options.y=0] The Y position for the image in viewport coordinates.
     * @param {Number} [options.width=1] The width for the image in viewport coordinates.
     * @param {Number} [options.height] The height for the image in viewport coordinates.
     * @param {OpenSeadragon.Rect} [options.fitBounds] The bounds in viewport coordinates
     * to fit the image into. If specified, x, y, width and height get ignored.
     * @param {OpenSeadragon.Placement} [options.fitBoundsPlacement=OpenSeadragon.Placement.CENTER]
     * How to anchor the image in the bounds if options.fitBounds is set.
     * @param {OpenSeadragon.Rect} [options.clip] - An area, in image pixels, to clip to
     * (portions of the image outside of this area will not be visible). Only works on
     * browsers that support the HTML5 canvas.
     * @param {Number} [options.opacity=1] Proportional opacity of the tiled images (1=opaque, 0=hidden)
     * @param {Boolean} [options.preload=false]  Default switch for loading hidden images (true loads, false blocks)
     * @param {Number} [options.degrees=0] Initial rotation of the tiled image around
     * its top left corner in degrees.
     * @param {Boolean} [options.flipped=false] Whether to horizontally flip the image.
     * @param {String} [options.compositeOperation] How the image is composited onto other images.
     * @param {String} [options.crossOriginPolicy] The crossOriginPolicy for this specific image,
     * overriding viewer.crossOriginPolicy.
     * @param {Boolean} [options.ajaxWithCredentials] Whether to set withCredentials on tile AJAX
     * @param {Boolean} [options.loadTilesWithAjax]
     *      Whether to load tile data using AJAX requests.
     *      Defaults to the setting in {@link OpenSeadragon.Options}.
     * @param {Object} [options.ajaxHeaders]
     *      A set of headers to include when making tile AJAX requests.
     *      Note that these headers will be merged over any headers specified in {@link OpenSeadragon.Options}.
     *      Specifying a falsy value for a header will clear its existing value set at the Viewer level (if any).
     * requests.
     * @param {Function} [options.success] A function that gets called when the image is
     * successfully added. It's passed the event object which contains a single property:
     * "item", which is the resulting instance of TiledImage.
     * @param {Function} [options.error] A function that gets called if the image is
     * unable to be added. It's passed the error event object, which contains "message"
     * and "source" properties.
     * @param {Boolean} [options.collectionImmediately=false] If collectionMode is on,
     * specifies whether to snap to the new arrangement immediately or to animate to it.
     * @param {String|CanvasGradient|CanvasPattern|Function} [options.placeholderFillStyle] - See {@link OpenSeadragon.Options}.
     * @fires OpenSeadragon.World.event:add-item
     * @fires OpenSeadragon.Viewer.event:add-item-failed
     */
    addTiledImage: function( options ) {
        $.console.assert(options, "[Viewer.addTiledImage] options is required");
        $.console.assert(options.tileSource, "[Viewer.addTiledImage] options.tileSource is required");
        $.console.assert(!options.replace || (options.index > -1 && options.index < this.world.getItemCount()),
            "[Viewer.addTiledImage] if options.replace is used, options.index must be a valid index in Viewer.world");

        var _this = this;

        if (options.replace) {
            options.replaceItem = _this.world.getItemAt(options.index);
        }

        this._hideMessage();

        if (options.placeholderFillStyle === undefined) {
            options.placeholderFillStyle = this.placeholderFillStyle;
        }
        if (options.opacity === undefined) {
            options.opacity = this.opacity;
        }
        if (options.preload === undefined) {
            options.preload = this.preload;
        }
        if (options.compositeOperation === undefined) {
            options.compositeOperation = this.compositeOperation;
        }
        if (options.crossOriginPolicy === undefined) {
            options.crossOriginPolicy = options.tileSource.crossOriginPolicy !== undefined ? options.tileSource.crossOriginPolicy : this.crossOriginPolicy;
        }
        if (options.ajaxWithCredentials === undefined) {
            options.ajaxWithCredentials = this.ajaxWithCredentials;
        }
        if (options.loadTilesWithAjax === undefined) {
            options.loadTilesWithAjax = this.loadTilesWithAjax;
        }
        if (options.ajaxHeaders === undefined || options.ajaxHeaders === null) {
            options.ajaxHeaders = this.ajaxHeaders;
        } else if ($.isPlainObject(options.ajaxHeaders) && $.isPlainObject(this.ajaxHeaders)) {
            options.ajaxHeaders = $.extend({}, this.ajaxHeaders, options.ajaxHeaders);
        }

        var myQueueItem = {
            options: options
        };

        function raiseAddItemFailed( event ) {
            for (var i = 0; i < _this._loadQueue.length; i++) {
                if (_this._loadQueue[i] === myQueueItem) {
                    _this._loadQueue.splice(i, 1);
                    break;
                }
            }

            if (_this._loadQueue.length === 0) {
                refreshWorld(myQueueItem);
            }

             /**
             * Raised when an error occurs while adding a item.
             * @event add-item-failed
             * @memberOf OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {String} message
             * @property {String} source
             * @property {Object} options The options passed to the addTiledImage method.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            _this.raiseEvent( 'add-item-failed', event );

            if (options.error) {
                options.error(event);
            }
        }

        function refreshWorld(theItem) {
            if (_this.collectionMode) {
                _this.world.arrange({
                    immediately: theItem.options.collectionImmediately,
                    rows: _this.collectionRows,
                    columns: _this.collectionColumns,
                    layout: _this.collectionLayout,
                    tileSize: _this.collectionTileSize,
                    tileMargin: _this.collectionTileMargin
                });
                _this.world.setAutoRefigureSizes(true);
            }
        }

        if ($.isArray(options.tileSource)) {
            setTimeout(function() {
                raiseAddItemFailed({
                    message: "[Viewer.addTiledImage] Sequences can not be added; add them one at a time instead.",
                    source: options.tileSource,
                    options: options
                });
            });
            return;
        }

        this._loadQueue.push(myQueueItem);

        function processReadyItems() {
            var queueItem, tiledImage, optionsClone;
            while (_this._loadQueue.length) {
                queueItem = _this._loadQueue[0];
                if (!queueItem.tileSource) {
                    break;
                }

                _this._loadQueue.splice(0, 1);

                if (queueItem.options.replace) {
                    var newIndex = _this.world.getIndexOfItem(queueItem.options.replaceItem);
                    if (newIndex !== -1) {
                        queueItem.options.index = newIndex;
                    }
                    _this.world.removeItem(queueItem.options.replaceItem);
                }

                tiledImage = new $.TiledImage({
                    viewer: _this,
                    source: queueItem.tileSource,
                    viewport: _this.viewport,
                    drawer: _this.drawer,
                    tileCache: _this.tileCache,
                    imageLoader: _this.imageLoader,
                    x: queueItem.options.x,
                    y: queueItem.options.y,
                    width: queueItem.options.width,
                    height: queueItem.options.height,
                    fitBounds: queueItem.options.fitBounds,
                    fitBoundsPlacement: queueItem.options.fitBoundsPlacement,
                    clip: queueItem.options.clip,
                    placeholderFillStyle: queueItem.options.placeholderFillStyle,
                    opacity: queueItem.options.opacity,
                    preload: queueItem.options.preload,
                    degrees: queueItem.options.degrees,
                    flipped: queueItem.options.flipped,
                    compositeOperation: queueItem.options.compositeOperation,
                    springStiffness: _this.springStiffness,
                    animationTime: _this.animationTime,
                    minZoomImageRatio: _this.minZoomImageRatio,
                    wrapHorizontal: _this.wrapHorizontal,
                    wrapVertical: _this.wrapVertical,
                    immediateRender: _this.immediateRender,
                    blendTime: _this.blendTime,
                    alwaysBlend: _this.alwaysBlend,
                    minPixelRatio: _this.minPixelRatio,
                    smoothTileEdgesMinZoom: _this.smoothTileEdgesMinZoom,
                    iOSDevice: _this.iOSDevice,
                    crossOriginPolicy: queueItem.options.crossOriginPolicy,
                    ajaxWithCredentials: queueItem.options.ajaxWithCredentials,
                    loadTilesWithAjax: queueItem.options.loadTilesWithAjax,
                    ajaxHeaders: queueItem.options.ajaxHeaders,
                    debugMode: _this.debugMode,
                    subPixelRoundingForTransparency: _this.subPixelRoundingForTransparency
                });

                if (_this.collectionMode) {
                    _this.world.setAutoRefigureSizes(false);
                }

                if (_this.navigator) {
                    optionsClone = $.extend({}, queueItem.options, {
                        replace: false, // navigator already removed the layer, nothing to replace
                        originalTiledImage: tiledImage,
                        tileSource: queueItem.tileSource
                    });

                    _this.navigator.addTiledImage(optionsClone);
                }

                _this.world.addItem( tiledImage, {
                    index: queueItem.options.index
                });

                if (_this._loadQueue.length === 0) {
                    //this restores the autoRefigureSizes flag to true.
                    refreshWorld(queueItem);
                }

                if (_this.world.getItemCount() === 1 && !_this.preserveViewport) {
                    _this.viewport.goHome(true);
                }

                if (queueItem.options.success) {
                    queueItem.options.success({
                        item: tiledImage
                    });
                }
            }
        }

        getTileSourceImplementation( this, options.tileSource, options, function( tileSource ) {

            myQueueItem.tileSource = tileSource;

            // add everybody at the front of the queue that's ready to go
            processReadyItems();
        }, function( event ) {
            event.options = options;
            raiseAddItemFailed(event);

            // add everybody at the front of the queue that's ready to go
            processReadyItems();
        } );
    },

    /**
     * Add a simple image to the viewer.
     * The options are the same as the ones in {@link OpenSeadragon.Viewer#addTiledImage}
     * except for options.tileSource which is replaced by options.url.
     * @function
     * @param {Object} options - See {@link OpenSeadragon.Viewer#addTiledImage}
     * for all the options
     * @param {String} options.url - The URL of the image to add.
     * @fires OpenSeadragon.World.event:add-item
     * @fires OpenSeadragon.Viewer.event:add-item-failed
     */
    addSimpleImage: function(options) {
        $.console.assert(options, "[Viewer.addSimpleImage] options is required");
        $.console.assert(options.url, "[Viewer.addSimpleImage] options.url is required");

        var opts = $.extend({}, options, {
            tileSource: {
                type: 'image',
                url:  options.url
            }
        });
        delete opts.url;
        this.addTiledImage(opts);
    },

    // deprecated
    addLayer: function( options ) {
        var _this = this;

        $.console.error( "[Viewer.addLayer] this function is deprecated; use Viewer.addTiledImage() instead." );

        var optionsClone = $.extend({}, options, {
            success: function(event) {
                _this.raiseEvent("add-layer", {
                    options: options,
                    drawer: event.item
                });
            },
            error: function(event) {
                _this.raiseEvent("add-layer-failed", event);
            }
        });

        this.addTiledImage(optionsClone);
        return this;
    },

    // deprecated
    getLayerAtLevel: function( level ) {
        $.console.error( "[Viewer.getLayerAtLevel] this function is deprecated; use World.getItemAt() instead." );
        return this.world.getItemAt(level);
    },

    // deprecated
    getLevelOfLayer: function( drawer ) {
        $.console.error( "[Viewer.getLevelOfLayer] this function is deprecated; use World.getIndexOfItem() instead." );
        return this.world.getIndexOfItem(drawer);
    },

    // deprecated
    getLayersCount: function() {
        $.console.error( "[Viewer.getLayersCount] this function is deprecated; use World.getItemCount() instead." );
        return this.world.getItemCount();
    },

    // deprecated
    setLayerLevel: function( drawer, level ) {
        $.console.error( "[Viewer.setLayerLevel] this function is deprecated; use World.setItemIndex() instead." );
        return this.world.setItemIndex(drawer, level);
    },

    // deprecated
    removeLayer: function( drawer ) {
        $.console.error( "[Viewer.removeLayer] this function is deprecated; use World.removeItem() instead." );
        return this.world.removeItem(drawer);
    },

    /**
     * Force the viewer to redraw its contents.
     * @returns {OpenSeadragon.Viewer} Chainable.
     */
    forceRedraw: function() {
        THIS[ this.hash ].forceRedraw = true;
        return this;
    },

    /**
     * Force the viewer to reset its size to match its container.
     */
    forceResize: function() {
        THIS[this.hash].needsResize = true;
        THIS[this.hash].forceResize = true;
    },

    /**
     * @function
     * @returns {OpenSeadragon.Viewer} Chainable.
     */
    bindSequenceControls: function(){

        //////////////////////////////////////////////////////////////////////////
        // Image Sequence Controls
        //////////////////////////////////////////////////////////////////////////
        var onFocusHandler          = $.delegate( this, onFocus ),
            onBlurHandler           = $.delegate( this, onBlur ),
            onNextHandler           = $.delegate( this, this.goToNextPage ),
            onPreviousHandler       = $.delegate( this, this.goToPreviousPage ),
            navImages               = this.navImages,
            useGroup                = true;

        if( this.showSequenceControl ){

            if( this.previousButton || this.nextButton ){
                //if we are binding to custom buttons then layout and
                //grouping is the responsibility of the page author
                useGroup = false;
            }

            this.previousButton = new $.Button({
                element:    this.previousButton ? $.getElement( this.previousButton ) : null,
                clickTimeThreshold: this.clickTimeThreshold,
                clickDistThreshold: this.clickDistThreshold,
                tooltip:    $.getString( "Tooltips.PreviousPage" ),
                srcRest:    resolveUrl( this.prefixUrl, navImages.previous.REST ),
                srcGroup:   resolveUrl( this.prefixUrl, navImages.previous.GROUP ),
                srcHover:   resolveUrl( this.prefixUrl, navImages.previous.HOVER ),
                srcDown:    resolveUrl( this.prefixUrl, navImages.previous.DOWN ),
                onRelease:  onPreviousHandler,
                onFocus:    onFocusHandler,
                onBlur:     onBlurHandler
            });

            this.nextButton = new $.Button({
                element:    this.nextButton ? $.getElement( this.nextButton ) : null,
                clickTimeThreshold: this.clickTimeThreshold,
                clickDistThreshold: this.clickDistThreshold,
                tooltip:    $.getString( "Tooltips.NextPage" ),
                srcRest:    resolveUrl( this.prefixUrl, navImages.next.REST ),
                srcGroup:   resolveUrl( this.prefixUrl, navImages.next.GROUP ),
                srcHover:   resolveUrl( this.prefixUrl, navImages.next.HOVER ),
                srcDown:    resolveUrl( this.prefixUrl, navImages.next.DOWN ),
                onRelease:  onNextHandler,
                onFocus:    onFocusHandler,
                onBlur:     onBlurHandler
            });

            if( !this.navPrevNextWrap ){
                this.previousButton.disable();
            }

            if (!this.tileSources || !this.tileSources.length) {
                this.nextButton.disable();
            }

            if( useGroup ){
                this.paging = new $.ButtonGroup({
                    buttons: [
                        this.previousButton,
                        this.nextButton
                    ],
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold
                });

                this.pagingControl = this.paging.element;

                if( this.toolbar ){
                    this.toolbar.addControl(
                        this.pagingControl,
                        {anchor: $.ControlAnchor.BOTTOM_RIGHT}
                    );
                }else{
                    this.addControl(
                        this.pagingControl,
                        {anchor: this.sequenceControlAnchor || $.ControlAnchor.TOP_LEFT}
                    );
                }
            }
        }
        return this;
    },


    /**
     * @function
     * @returns {OpenSeadragon.Viewer} Chainable.
     */
    bindStandardControls: function(){
        //////////////////////////////////////////////////////////////////////////
        // Navigation Controls
        //////////////////////////////////////////////////////////////////////////
        var beginZoomingInHandler   = $.delegate( this, beginZoomingIn ),
            endZoomingHandler       = $.delegate( this, endZooming ),
            doSingleZoomInHandler   = $.delegate( this, doSingleZoomIn ),
            beginZoomingOutHandler  = $.delegate( this, beginZoomingOut ),
            doSingleZoomOutHandler  = $.delegate( this, doSingleZoomOut ),
            onHomeHandler           = $.delegate( this, onHome ),
            onFullScreenHandler     = $.delegate( this, onFullScreen ),
            onRotateLeftHandler     = $.delegate( this, onRotateLeft ),
            onRotateRightHandler    = $.delegate( this, onRotateRight ),
            onFlipHandler           = $.delegate( this, onFlip),
            onFocusHandler          = $.delegate( this, onFocus ),
            onBlurHandler           = $.delegate( this, onBlur ),
            navImages               = this.navImages,
            buttons                 = [],
            useGroup                = true;


        if ( this.showNavigationControl ) {

            if( this.zoomInButton || this.zoomOutButton ||
                this.homeButton || this.fullPageButton ||
                this.rotateLeftButton || this.rotateRightButton ||
                this.flipButton ) {
                //if we are binding to custom buttons then layout and
                //grouping is the responsibility of the page author
                useGroup = false;
            }

            if ( this.showZoomControl ) {
                buttons.push( this.zoomInButton = new $.Button({
                    element:    this.zoomInButton ? $.getElement( this.zoomInButton ) : null,
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold,
                    tooltip:    $.getString( "Tooltips.ZoomIn" ),
                    srcRest:    resolveUrl( this.prefixUrl, navImages.zoomIn.REST ),
                    srcGroup:   resolveUrl( this.prefixUrl, navImages.zoomIn.GROUP ),
                    srcHover:   resolveUrl( this.prefixUrl, navImages.zoomIn.HOVER ),
                    srcDown:    resolveUrl( this.prefixUrl, navImages.zoomIn.DOWN ),
                    onPress:    beginZoomingInHandler,
                    onRelease:  endZoomingHandler,
                    onClick:    doSingleZoomInHandler,
                    onEnter:    beginZoomingInHandler,
                    onExit:     endZoomingHandler,
                    onFocus:    onFocusHandler,
                    onBlur:     onBlurHandler
                }));

                buttons.push( this.zoomOutButton = new $.Button({
                    element:    this.zoomOutButton ? $.getElement( this.zoomOutButton ) : null,
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold,
                    tooltip:    $.getString( "Tooltips.ZoomOut" ),
                    srcRest:    resolveUrl( this.prefixUrl, navImages.zoomOut.REST ),
                    srcGroup:   resolveUrl( this.prefixUrl, navImages.zoomOut.GROUP ),
                    srcHover:   resolveUrl( this.prefixUrl, navImages.zoomOut.HOVER ),
                    srcDown:    resolveUrl( this.prefixUrl, navImages.zoomOut.DOWN ),
                    onPress:    beginZoomingOutHandler,
                    onRelease:  endZoomingHandler,
                    onClick:    doSingleZoomOutHandler,
                    onEnter:    beginZoomingOutHandler,
                    onExit:     endZoomingHandler,
                    onFocus:    onFocusHandler,
                    onBlur:     onBlurHandler
                }));
            }

            if ( this.showHomeControl ) {
                buttons.push( this.homeButton = new $.Button({
                    element:    this.homeButton ? $.getElement( this.homeButton ) : null,
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold,
                    tooltip:    $.getString( "Tooltips.Home" ),
                    srcRest:    resolveUrl( this.prefixUrl, navImages.home.REST ),
                    srcGroup:   resolveUrl( this.prefixUrl, navImages.home.GROUP ),
                    srcHover:   resolveUrl( this.prefixUrl, navImages.home.HOVER ),
                    srcDown:    resolveUrl( this.prefixUrl, navImages.home.DOWN ),
                    onRelease:  onHomeHandler,
                    onFocus:    onFocusHandler,
                    onBlur:     onBlurHandler
                }));
            }

            if ( this.showFullPageControl ) {
                buttons.push( this.fullPageButton = new $.Button({
                    element:    this.fullPageButton ? $.getElement( this.fullPageButton ) : null,
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold,
                    tooltip:    $.getString( "Tooltips.FullPage" ),
                    srcRest:    resolveUrl( this.prefixUrl, navImages.fullpage.REST ),
                    srcGroup:   resolveUrl( this.prefixUrl, navImages.fullpage.GROUP ),
                    srcHover:   resolveUrl( this.prefixUrl, navImages.fullpage.HOVER ),
                    srcDown:    resolveUrl( this.prefixUrl, navImages.fullpage.DOWN ),
                    onRelease:  onFullScreenHandler,
                    onFocus:    onFocusHandler,
                    onBlur:     onBlurHandler
                }));
            }

            if ( this.showRotationControl ) {
                buttons.push( this.rotateLeftButton = new $.Button({
                    element:    this.rotateLeftButton ? $.getElement( this.rotateLeftButton ) : null,
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold,
                    tooltip:    $.getString( "Tooltips.RotateLeft" ),
                    srcRest:    resolveUrl( this.prefixUrl, navImages.rotateleft.REST ),
                    srcGroup:   resolveUrl( this.prefixUrl, navImages.rotateleft.GROUP ),
                    srcHover:   resolveUrl( this.prefixUrl, navImages.rotateleft.HOVER ),
                    srcDown:    resolveUrl( this.prefixUrl, navImages.rotateleft.DOWN ),
                    onRelease:  onRotateLeftHandler,
                    onFocus:    onFocusHandler,
                    onBlur:     onBlurHandler
                }));

                buttons.push( this.rotateRightButton = new $.Button({
                    element:    this.rotateRightButton ? $.getElement( this.rotateRightButton ) : null,
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold,
                    tooltip:    $.getString( "Tooltips.RotateRight" ),
                    srcRest:    resolveUrl( this.prefixUrl, navImages.rotateright.REST ),
                    srcGroup:   resolveUrl( this.prefixUrl, navImages.rotateright.GROUP ),
                    srcHover:   resolveUrl( this.prefixUrl, navImages.rotateright.HOVER ),
                    srcDown:    resolveUrl( this.prefixUrl, navImages.rotateright.DOWN ),
                    onRelease:  onRotateRightHandler,
                    onFocus:    onFocusHandler,
                    onBlur:     onBlurHandler
                }));
            }

            if ( this.showFlipControl ) {
                buttons.push( this.flipButton = new $.Button({
                    element:    this.flipButton ? $.getElement( this.flipButton ) : null,
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold,
                    tooltip:    $.getString( "Tooltips.Flip" ),
                    srcRest:    resolveUrl( this.prefixUrl, navImages.flip.REST ),
                    srcGroup:   resolveUrl( this.prefixUrl, navImages.flip.GROUP ),
                    srcHover:   resolveUrl( this.prefixUrl, navImages.flip.HOVER ),
                    srcDown:    resolveUrl( this.prefixUrl, navImages.flip.DOWN ),
                    onRelease:  onFlipHandler,
                    onFocus:    onFocusHandler,
                    onBlur:     onBlurHandler
                }));
            }

            if ( useGroup ) {
                this.buttonGroup = new $.ButtonGroup({
                    buttons:            buttons,
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold
                });

                this.navControl  = this.buttonGroup.element;
                this.addHandler( 'open', $.delegate( this, lightUp ) );

                if( this.toolbar ){
                    this.toolbar.addControl(
                        this.navControl,
                        {anchor: this.navigationControlAnchor || $.ControlAnchor.TOP_LEFT}
                    );
                } else {
                    this.addControl(
                        this.navControl,
                        {anchor: this.navigationControlAnchor || $.ControlAnchor.TOP_LEFT}
                    );
                }
            } else {
                this.customButtons = buttons;
            }

        }
        return this;
    },

    /**
     * Gets the active page of a sequence
     * @function
     * @returns {Number}
     */
    currentPage: function() {
        return this._sequenceIndex;
    },

    /**
     * @function
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:page
     */
    goToPage: function( page ){
        if( this.tileSources && page >= 0 && page < this.tileSources.length ){
            this._sequenceIndex = page;

            this._updateSequenceButtons( page );

            this.open( this.tileSources[ page ] );

            if( this.referenceStrip ){
                this.referenceStrip.setFocus( page );
            }

            /**
             * Raised when the page is changed on a viewer configured with multiple image sources (see {@link OpenSeadragon.Viewer#goToPage}).
             *
             * @event page
             * @memberof OpenSeadragon.Viewer
             * @type {Object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {Number} page - The page index.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent( 'page', { page: page } );
        }

        return this;
    },

   /**
     * Adds an html element as an overlay to the current viewport.  Useful for
     * highlighting words or areas of interest on an image or other zoomable
     * interface. The overlays added via this method are removed when the viewport
     * is closed which include when changing page.
     * @method
     * @param {Element|String|Object} element - A reference to an element or an id for
     *      the element which will be overlaid. Or an Object specifying the configuration for the overlay.
     *      If using an object, see {@link OpenSeadragon.Overlay} for a list of
     *      all available options.
     * @param {OpenSeadragon.Point|OpenSeadragon.Rect} location - The point or
     *      rectangle which will be overlaid. This is a viewport relative location.
     * @param {OpenSeadragon.Placement} [placement=OpenSeadragon.Placement.TOP_LEFT] - The position of the
     *      viewport which the location coordinates will be treated as relative
     *      to.
     * @param {function} [onDraw] - If supplied the callback is called when the overlay
     *      needs to be drawn. It it the responsibility of the callback to do any drawing/positioning.
     *      It is passed position, size and element.
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:add-overlay
     */
    addOverlay: function( element, location, placement, onDraw ) {
        var options;
        if( $.isPlainObject( element ) ){
            options = element;
        } else {
            options = {
                element: element,
                location: location,
                placement: placement,
                onDraw: onDraw
            };
        }

        element = $.getElement( options.element );

        if ( getOverlayIndex( this.currentOverlays, element ) >= 0 ) {
            // they're trying to add a duplicate overlay
            return this;
        }

        var overlay = getOverlayObject( this, options);
        this.currentOverlays.push(overlay);
        overlay.drawHTML( this.overlaysContainer, this.viewport );

        /**
         * Raised when an overlay is added to the viewer (see {@link OpenSeadragon.Viewer#addOverlay}).
         *
         * @event add-overlay
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {Element} element - The overlay element.
         * @property {OpenSeadragon.Point|OpenSeadragon.Rect} location
         * @property {OpenSeadragon.Placement} placement
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'add-overlay', {
            element: element,
            location: options.location,
            placement: options.placement
        });
        return this;
    },

    /**
     * Updates the overlay represented by the reference to the element or
     * element id moving it to the new location, relative to the new placement.
     * @method
     * @param {Element|String} element - A reference to an element or an id for
     *      the element which is overlaid.
     * @param {OpenSeadragon.Point|OpenSeadragon.Rect} location - The point or
     *      rectangle which will be overlaid. This is a viewport relative location.
     * @param {OpenSeadragon.Placement} [placement=OpenSeadragon.Placement.TOP_LEFT] - The position of the
     *      viewport which the location coordinates will be treated as relative
     *      to.
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:update-overlay
     */
    updateOverlay: function( element, location, placement ) {
        var i;

        element = $.getElement( element );
        i = getOverlayIndex( this.currentOverlays, element );

        if ( i >= 0 ) {
            this.currentOverlays[ i ].update( location, placement );
            THIS[ this.hash ].forceRedraw = true;
            /**
             * Raised when an overlay's location or placement changes
             * (see {@link OpenSeadragon.Viewer#updateOverlay}).
             *
             * @event update-overlay
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the
             * Viewer which raised the event.
             * @property {Element} element
             * @property {OpenSeadragon.Point|OpenSeadragon.Rect} location
             * @property {OpenSeadragon.Placement} placement
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent( 'update-overlay', {
                element: element,
                location: location,
                placement: placement
            });
        }
        return this;
    },

    /**
     * Removes an overlay identified by the reference element or element id
     * and schedules an update.
     * @method
     * @param {Element|String} element - A reference to the element or an
     *      element id which represent the ovelay content to be removed.
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:remove-overlay
     */
    removeOverlay: function( element ) {
        var i;

        element = $.getElement( element );
        i = getOverlayIndex( this.currentOverlays, element );

        if ( i >= 0 ) {
            this.currentOverlays[ i ].destroy();
            this.currentOverlays.splice( i, 1 );
            THIS[ this.hash ].forceRedraw = true;
            /**
             * Raised when an overlay is removed from the viewer
             * (see {@link OpenSeadragon.Viewer#removeOverlay}).
             *
             * @event remove-overlay
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the
             * Viewer which raised the event.
             * @property {Element} element - The overlay element.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent( 'remove-overlay', {
                element: element
            });
        }
        return this;
    },

    /**
     * Removes all currently configured Overlays from this Viewer and schedules
     * an update.
     * @method
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:clear-overlay
     */
    clearOverlays: function() {
        while ( this.currentOverlays.length > 0 ) {
            this.currentOverlays.pop().destroy();
        }
        THIS[ this.hash ].forceRedraw = true;
        /**
         * Raised when all overlays are removed from the viewer (see {@link OpenSeadragon.Drawer#clearOverlays}).
         *
         * @event clear-overlay
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'clear-overlay', {} );
        return this;
    },

     /**
     * Finds an overlay identified by the reference element or element id
     * and returns it as an object, return null if not found.
     * @method
     * @param {Element|String} element - A reference to the element or an
     *      element id which represents the overlay content.
     * @returns {OpenSeadragon.Overlay} the matching overlay or null if none found.
     */
    getOverlayById: function( element ) {
        var i;

        element = $.getElement( element );
        i = getOverlayIndex( this.currentOverlays, element );

        if (i >= 0) {
            return this.currentOverlays[i];
        } else {
            return null;
        }
    },

    /**
     * Updates the sequence buttons.
     * @function OpenSeadragon.Viewer.prototype._updateSequenceButtons
     * @private
     * @param {Number} Sequence Value
     */
    _updateSequenceButtons: function( page ) {

            if ( this.nextButton ) {
                if(!this.tileSources || this.tileSources.length - 1 === page) {
                    //Disable next button
                    if ( !this.navPrevNextWrap ) {
                        this.nextButton.disable();
                    }
                } else {
                    this.nextButton.enable();
                }
            }
            if ( this.previousButton ) {
                if ( page > 0 ) {
                    //Enable previous button
                    this.previousButton.enable();
                } else {
                    if ( !this.navPrevNextWrap ) {
                        this.previousButton.disable();
                    }
                }
            }
      },

    /**
     * Display a message in the viewport
     * @function OpenSeadragon.Viewer.prototype._showMessage
     * @private
     * @param {String} text message
     */
    _showMessage: function ( message ) {
        this._hideMessage();

        var div = $.makeNeutralElement( "div" );
        div.appendChild( document.createTextNode( message ) );

        this.messageDiv = $.makeCenteredNode( div );

        $.addClass(this.messageDiv, "openseadragon-message");

        this.container.appendChild( this.messageDiv );
    },

    /**
     * Hide any currently displayed viewport message
     * @function OpenSeadragon.Viewer.prototype._hideMessage
     * @private
     */
    _hideMessage: function () {
        var div = this.messageDiv;
        if (div) {
            div.parentNode.removeChild(div);
            delete this.messageDiv;
        }
    },

    /**
     * Gets this viewer's gesture settings for the given pointer device type.
     * @method
     * @param {String} type - The pointer device type to get the gesture settings for ("mouse", "touch", "pen", etc.).
     * @returns {OpenSeadragon.GestureSettings}
     */
    gestureSettingsByDeviceType: function ( type ) {
        switch ( type ) {
            case 'mouse':
                return this.gestureSettingsMouse;
            case 'touch':
                return this.gestureSettingsTouch;
            case 'pen':
                return this.gestureSettingsPen;
            default:
                return this.gestureSettingsUnknown;
        }
    },

    // private
    _drawOverlays: function() {
        var i,
            length = this.currentOverlays.length;
        for ( i = 0; i < length; i++ ) {
            this.currentOverlays[ i ].drawHTML( this.overlaysContainer, this.viewport );
        }
    },

    /**
     * Cancel the "in flight" images.
     */
    _cancelPendingImages: function() {
        this._loadQueue = [];
    },

    /**
     * Removes the reference strip and disables displaying it.
     * @function
     */
    removeReferenceStrip: function() {
        this.showReferenceStrip = false;

        if (this.referenceStrip) {
            this.referenceStrip.destroy();
            this.referenceStrip = null;
        }
    },

    /**
     * Enables and displays the reference strip based on the currently set tileSources.
     * Works only when the Viewer has sequenceMode set to true.
     * @function
     */
    addReferenceStrip: function() {
        this.showReferenceStrip = true;

        if (this.sequenceMode) {
            if (this.referenceStrip) {
                return;
            }

            if (this.tileSources.length && this.tileSources.length > 1) {
                this.referenceStrip = new $.ReferenceStrip({
                    id:          this.referenceStripElement,
                    position:    this.referenceStripPosition,
                    sizeRatio:   this.referenceStripSizeRatio,
                    scroll:      this.referenceStripScroll,
                    height:      this.referenceStripHeight,
                    width:       this.referenceStripWidth,
                    tileSources: this.tileSources,
                    prefixUrl:   this.prefixUrl,
                    useCanvas:   this.useCanvas,
                    viewer:      this
                });

                this.referenceStrip.setFocus( this._sequenceIndex );
            }
        } else {
            $.console.warn('Attempting to display a reference strip while "sequenceMode" is off.');
        }
    },

    /**
     * Adds _updatePixelDensityRatio to the window resize event.
     * @private
     */
    _addUpdatePixelDensityRatioEvent: function() {
        this._updatePixelDensityRatioBind = this._updatePixelDensityRatio.bind(this);
        $.addEvent( window, 'resize', this._updatePixelDensityRatioBind );
    },

    /**
     * Removes _updatePixelDensityRatio from the window resize event.
     * @private
     */
    _removeUpdatePixelDensityRatioEvent: function() {
        $.removeEvent( window, 'resize', this._updatePixelDensityRatioBind );
    },

    /**
     * Update pixel density ratio, clears all tiles and triggers updates for
     * all items if the ratio has changed.
     * @private
     */
     _updatePixelDensityRatio: function() {
        var previusPixelDensityRatio = $.pixelDensityRatio;
        var currentPixelDensityRatio = $.getCurrentPixelDensityRatio();
        if (previusPixelDensityRatio !== currentPixelDensityRatio) {
            $.pixelDensityRatio = currentPixelDensityRatio;
            this.world.resetItems();
            this.forceRedraw();
        }
    },

    /**
     * Sets the image source to the source with index equal to
     * currentIndex - 1. Changes current image in sequence mode.
     * If specified, wraps around (see navPrevNextWrap in
     * {@link OpenSeadragon.Options})
     *
     * @method
     */

    goToPreviousPage: function () {
        var previous = this._sequenceIndex - 1;
        if(this.navPrevNextWrap && previous < 0){
            previous += this.tileSources.length;
        }
        this.goToPage( previous );
    },

    /**
     * Sets the image source to the source with index equal to
     * currentIndex + 1. Changes current image in sequence mode.
     * If specified, wraps around (see navPrevNextWrap in
     * {@link OpenSeadragon.Options})
     *
     * @method
     */
    goToNextPage: function () {
        var next = this._sequenceIndex + 1;
        if(this.navPrevNextWrap && next >= this.tileSources.length){
            next = 0;
        }
        this.goToPage( next );
    },

    isAnimating: function () {
        return THIS[ this.hash ].animating;
    },
});


/**
 * _getSafeElemSize is like getElementSize(), but refuses to return 0 for x or y,
 * which was causing some calling operations to return NaN.
 * @returns {Point}
 * @private
 */
function _getSafeElemSize (oElement) {
    oElement = $.getElement( oElement );

    return new $.Point(
        (oElement.clientWidth === 0 ? 1 : oElement.clientWidth),
        (oElement.clientHeight === 0 ? 1 : oElement.clientHeight)
    );
}


/**
 * @function
 * @private
 */
function getTileSourceImplementation( viewer, tileSource, imgOptions, successCallback,
    failCallback ) {
    var _this = viewer;

    //allow plain xml strings or json strings to be parsed here
    if ( $.type( tileSource ) === 'string' ) {
        //xml should start with "<" and end with ">"
        if ( tileSource.match( /^\s*<.*>\s*$/ ) ) {
            tileSource = $.parseXml( tileSource );
        //json should start with "{" or "[" and end with "}" or "]"
        } else if ( tileSource.match(/^\s*[{[].*[}\]]\s*$/ ) ) {
            try {
              var tileSourceJ = $.parseJSON(tileSource);
              tileSource = tileSourceJ;
            } catch (e) {
              //tileSource = tileSource;
            }
        }
    }

    function waitUntilReady(tileSource, originalTileSource) {
        if (tileSource.ready) {
            successCallback(tileSource);
        } else {
            tileSource.addHandler('ready', function () {
                successCallback(tileSource);
            });
            tileSource.addHandler('open-failed', function (event) {
                failCallback({
                    message: event.message,
                    source: originalTileSource
                });
            });
        }
    }

    setTimeout( function() {
        if ( $.type( tileSource ) === 'string' ) {
            //If its still a string it means it must be a url at this point
            tileSource = new $.TileSource({
                url: tileSource,
                crossOriginPolicy: imgOptions.crossOriginPolicy !== undefined ?
                    imgOptions.crossOriginPolicy : viewer.crossOriginPolicy,
                ajaxWithCredentials: viewer.ajaxWithCredentials,
                ajaxHeaders: imgOptions.ajaxHeaders ?
                    imgOptions.ajaxHeaders : viewer.ajaxHeaders,
                splitHashDataForPost: viewer.splitHashDataForPost,
                useCanvas: viewer.useCanvas,
                success: function( event ) {
                    successCallback( event.tileSource );
                }
            });
            tileSource.addHandler( 'open-failed', function( event ) {
                failCallback( event );
            } );

        } else if ($.isPlainObject(tileSource) || tileSource.nodeType) {
            if (tileSource.crossOriginPolicy === undefined &&
                (imgOptions.crossOriginPolicy !== undefined || viewer.crossOriginPolicy !== undefined)) {
                tileSource.crossOriginPolicy = imgOptions.crossOriginPolicy !== undefined ?
                    imgOptions.crossOriginPolicy : viewer.crossOriginPolicy;
            }
            if (tileSource.ajaxWithCredentials === undefined) {
                tileSource.ajaxWithCredentials = viewer.ajaxWithCredentials;
            }
            if (tileSource.useCanvas === undefined) {
                tileSource.useCanvas = viewer.useCanvas;
            }

            if ( $.isFunction( tileSource.getTileUrl ) ) {
                //Custom tile source
                var customTileSource = new $.TileSource( tileSource );
                customTileSource.getTileUrl = tileSource.getTileUrl;
                successCallback( customTileSource );
            } else {
                //inline configuration
                var $TileSource = $.TileSource.determineType( _this, tileSource );
                if ( !$TileSource ) {
                    failCallback( {
                        message: "Unable to load TileSource",
                        source: tileSource
                    });
                    return;
                }
                var options = $TileSource.prototype.configure.apply( _this, [ tileSource ] );
                waitUntilReady(new $TileSource(options), tileSource);
            }
        } else {
            //can assume it's already a tile source implementation
            waitUntilReady(tileSource, tileSource);
        }
    });
}

function getOverlayObject( viewer, overlay ) {
    if ( overlay instanceof $.Overlay ) {
        return overlay;
    }

    var element = null;
    if ( overlay.element ) {
        element = $.getElement( overlay.element );
    } else {
        var id = overlay.id ?
            overlay.id :
            "openseadragon-overlay-" + Math.floor( Math.random() * 10000000 );

        element = $.getElement( overlay.id );
        if ( !element ) {
            element         = document.createElement( "a" );
            element.href    = "#/overlay/" + id;
        }
        element.id = id;
        $.addClass( element, overlay.className ?
            overlay.className :
            "openseadragon-overlay"
        );
    }

    var location = overlay.location;
    var width = overlay.width;
    var height = overlay.height;
    if (!location) {
        var x = overlay.x;
        var y = overlay.y;
        if (overlay.px !== undefined) {
            var rect = viewer.viewport.imageToViewportRectangle(new $.Rect(
                overlay.px,
                overlay.py,
                width || 0,
                height || 0));
            x = rect.x;
            y = rect.y;
            width = width !== undefined ? rect.width : undefined;
            height = height !== undefined ? rect.height : undefined;
        }
        location = new $.Point(x, y);
    }

    var placement = overlay.placement;
    if (placement && $.type(placement) === "string") {
        placement = $.Placement[overlay.placement.toUpperCase()];
    }

    return new $.Overlay({
        element: element,
        location: location,
        placement: placement,
        onDraw: overlay.onDraw,
        checkResize: overlay.checkResize,
        width: width,
        height: height,
        rotationMode: overlay.rotationMode
    });
}

/**
 * @private
 * @inner
 * Determines the index of the given overlay in the given overlays array.
 */
function getOverlayIndex( overlays, element ) {
    var i;
    for ( i = overlays.length - 1; i >= 0; i-- ) {
        if ( overlays[ i ].element === element ) {
            return i;
        }
    }

    return -1;
}

///////////////////////////////////////////////////////////////////////////////
// Schedulers provide the general engine for animation
///////////////////////////////////////////////////////////////////////////////
function scheduleUpdate( viewer, updateFunc ){
    return $.requestAnimationFrame( function(){
        updateFunc( viewer );
    } );
}


//provides a sequence in the fade animation
function scheduleControlsFade( viewer ) {
    $.requestAnimationFrame( function(){
        updateControlsFade( viewer );
    });
}


//initiates an animation to hide the controls
function beginControlsAutoHide( viewer ) {
    if ( !viewer.autoHideControls ) {
        return;
    }
    viewer.controlsShouldFade = true;
    viewer.controlsFadeBeginTime =
        $.now() +
        viewer.controlsFadeDelay;

    window.setTimeout( function(){
        scheduleControlsFade( viewer );
    }, viewer.controlsFadeDelay );
}


//determines if fade animation is done or continues the animation
function updateControlsFade( viewer ) {
    var currentTime,
        deltaTime,
        opacity,
        i;
    if ( viewer.controlsShouldFade ) {
        currentTime = $.now();
        deltaTime = currentTime - viewer.controlsFadeBeginTime;
        opacity = 1.0 - deltaTime / viewer.controlsFadeLength;

        opacity = Math.min( 1.0, opacity );
        opacity = Math.max( 0.0, opacity );

        for ( i = viewer.controls.length - 1; i >= 0; i--) {
            if (viewer.controls[ i ].autoFade) {
                viewer.controls[ i ].setOpacity( opacity );
            }
        }

        if ( opacity > 0 ) {
            // fade again
            scheduleControlsFade( viewer );
        }
    }
}


//stop the fade animation on the controls and show them
function abortControlsAutoHide( viewer ) {
    var i;
    viewer.controlsShouldFade = false;
    for ( i = viewer.controls.length - 1; i >= 0; i-- ) {
        viewer.controls[ i ].setOpacity( 1.0 );
    }
}



///////////////////////////////////////////////////////////////////////////////
// Default view event handlers.
///////////////////////////////////////////////////////////////////////////////
function onFocus(){
    abortControlsAutoHide( this );
}

function onBlur(){
    beginControlsAutoHide( this );

}

function onCanvasContextMenu( event ) {
    var eventArgs = {
        tracker: event.eventSource,
        position: event.position,
        originalEvent: event.originalEvent,
        preventDefault: event.preventDefault
    };

    /**
     * Raised when a contextmenu event occurs in the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-contextmenu
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Object} originalEvent - The original DOM event.
     * @property {Boolean} preventDefault - Set to true to prevent the default user-agent's handling of the contextmenu event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'canvas-contextmenu', eventArgs );

    event.preventDefault = eventArgs.preventDefault;
}

function onCanvasKeyDown( event ) {
    var canvasKeyDownEventArgs = {
      originalEvent: event.originalEvent,
      preventDefaultAction: false,
      preventVerticalPan: event.preventVerticalPan || !this.panVertical,
      preventHorizontalPan: event.preventHorizontalPan || !this.panHorizontal
    };

    /**
     * Raised when a keyboard key is pressed and the focus is on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-key
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {Boolean} preventDefaultAction - Set to true to prevent default keyboard behaviour. Default: false.
     * @property {Boolean} preventVerticalPan - Set to true to prevent keyboard vertical panning. Default: false.
     * @property {Boolean} preventHorizontalPan - Set to true to prevent keyboard horizontal panning. Default: false.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */

    this.raiseEvent('canvas-key', canvasKeyDownEventArgs);

    if ( !canvasKeyDownEventArgs.preventDefaultAction && !event.ctrl && !event.alt && !event.meta ) {
        switch( event.keyCode ){
            case 38://up arrow
                if (!canvasKeyDownEventArgs.preventVerticalPan) {
                  if ( event.shift ) {
                    this.viewport.zoomBy(1.1);
                  } else {
                    this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(0, -this.pixelsPerArrowPress)));
                  }
                  this.viewport.applyConstraints();
                }
                event.preventDefault = true;
                break;
            case 40://down arrow
                if (!canvasKeyDownEventArgs.preventVerticalPan) {
                  if ( event.shift ) {
                    this.viewport.zoomBy(0.9);
                  } else {
                    this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(0, this.pixelsPerArrowPress)));
                  }
                  this.viewport.applyConstraints();
                }
                event.preventDefault = true;
                break;
            case 37://left arrow
                if (!canvasKeyDownEventArgs.preventHorizontalPan) {
                  this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(-this.pixelsPerArrowPress, 0)));
                  this.viewport.applyConstraints();
                }
                event.preventDefault = true;
                break;
            case 39://right arrow
                if (!canvasKeyDownEventArgs.preventHorizontalPan) {
                  this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(this.pixelsPerArrowPress, 0)));
                  this.viewport.applyConstraints();
                }
                event.preventDefault = true;
                break;
            default:
                //console.log( 'navigator keycode %s', event.keyCode );
                event.preventDefault = false;
                break;
        }
    } else {
        event.preventDefault = false;
    }
}
function onCanvasKeyPress( event ) {
    var canvasKeyPressEventArgs = {
      originalEvent: event.originalEvent,
      preventDefaultAction: false,
      preventVerticalPan: event.preventVerticalPan || !this.panVertical,
      preventHorizontalPan: event.preventHorizontalPan || !this.panHorizontal
    };

    // This event is documented in onCanvasKeyDown
    this.raiseEvent('canvas-key', canvasKeyPressEventArgs);

    if ( !canvasKeyPressEventArgs.preventDefaultAction && !event.ctrl && !event.alt && !event.meta ) {
        switch( event.keyCode ){
            case 43://=|+
            case 61://=|+
                this.viewport.zoomBy(1.1);
                this.viewport.applyConstraints();
                event.preventDefault = true;
                break;
            case 45://-|_
                this.viewport.zoomBy(0.9);
                this.viewport.applyConstraints();
                event.preventDefault = true;
                break;
            case 48://0|)
                this.viewport.goHome();
                this.viewport.applyConstraints();
                event.preventDefault = true;
                break;
            case 119://w
            case 87://W
                if (!canvasKeyPressEventArgs.preventVerticalPan) {
                    if ( event.shift ) {
                        this.viewport.zoomBy(1.1);
                    } else {
                        this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(0, -40)));
                    }
                    this.viewport.applyConstraints();
                  }
                  event.preventDefault = true;
                  break;
            case 115://s
            case 83://S
                if (!canvasKeyPressEventArgs.preventVerticalPan) {
                  if ( event.shift ) {
                    this.viewport.zoomBy(0.9);
                  } else {
                    this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(0, 40)));
                  }
                  this.viewport.applyConstraints();
                }
                event.preventDefault = true;
                break;
            case 97://a
                if (!canvasKeyPressEventArgs.preventHorizontalPan) {
                    this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(-40, 0)));
                    this.viewport.applyConstraints();
                }
                event.preventDefault = true;
                break;
            case 100://d
                if (!canvasKeyPressEventArgs.preventHorizontalPan) {
                  this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(40, 0)));
                  this.viewport.applyConstraints();
                }
                event.preventDefault = true;
                break;
            case 114: //r - clockwise rotation
              if(this.viewport.flipped){
                this.viewport.setRotation(this.viewport.getRotation() - this.rotationIncrement);
              } else{
                this.viewport.setRotation(this.viewport.getRotation() + this.rotationIncrement);
              }
              this.viewport.applyConstraints();
              event.preventDefault = true;
              break;
            case 82: //R - counterclockwise  rotation
              if(this.viewport.flipped){
                this.viewport.setRotation(this.viewport.getRotation() + this.rotationIncrement);
              } else{
                this.viewport.setRotation(this.viewport.getRotation() - this.rotationIncrement);
              }
              this.viewport.applyConstraints();
              event.preventDefault = true;
              break;
            case 102: //f
              this.viewport.toggleFlip();
              event.preventDefault = true;
              break;
            case 106: //j - previous image source
              this.goToPreviousPage();
              break;
            case 107: //k - next image source
              this.goToNextPage();
              break;
            default:
                // console.log( 'navigator keycode %s', event.keyCode );
                event.preventDefault = false;
                break;
        }
    } else {
        event.preventDefault = false;
    }
}



function onCanvasClick( event ) {
    var gestureSettings;

    var haveKeyboardFocus = document.activeElement === this.canvas;

    // If we don't have keyboard focus, request it.
    if ( !haveKeyboardFocus ) {
        this.canvas.focus();
    }
    if(this.viewport.flipped){
        event.position.x = this.viewport.getContainerSize().x - event.position.x;
    }

    var canvasClickEventArgs = {
        tracker: event.eventSource,
        position: event.position,
        quick: event.quick,
        shift: event.shift,
        originalEvent: event.originalEvent,
        originalTarget: event.originalTarget,
        preventDefaultAction: false
    };

    /**
     * Raised when a mouse press/release or touch/remove occurs on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-click
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Boolean} quick - True only if the clickDistThreshold and clickTimeThreshold are both passed. Useful for differentiating between clicks and drags.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {Element} originalTarget - The DOM element clicked on.
     * @property {Boolean} preventDefaultAction - Set to true to prevent default click to zoom behaviour. Default: false.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */

    this.raiseEvent( 'canvas-click', canvasClickEventArgs);


    if ( !canvasClickEventArgs.preventDefaultAction && this.viewport && event.quick ) {
        gestureSettings = this.gestureSettingsByDeviceType( event.pointerType );

        if (gestureSettings.clickToZoom === true){
            this.viewport.zoomBy(
                event.shift ? 1.0 / this.zoomPerClick : this.zoomPerClick,
                gestureSettings.zoomToRefPoint ? this.viewport.pointFromPixel( event.position, true ) : null
            );
            this.viewport.applyConstraints();
        }

        if( gestureSettings.dblClickDragToZoom){
            if(THIS[ this.hash ].draggingToZoom === true){
                THIS[ this.hash ].lastClickTime = null;
                THIS[ this.hash ].draggingToZoom = false;
            }
            else{
                THIS[ this.hash ].lastClickTime = $.now();
            }
        }

    }
}

function onCanvasDblClick( event ) {
    var gestureSettings;

    var canvasDblClickEventArgs = {
        tracker: event.eventSource,
        position: event.position,
        shift: event.shift,
        originalEvent: event.originalEvent,
        preventDefaultAction: false
    };

    /**
     * Raised when a double mouse press/release or touch/remove occurs on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-double-click
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {Boolean} preventDefaultAction - Set to true to prevent default double tap to zoom behaviour. Default: false.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'canvas-double-click', canvasDblClickEventArgs);

    if ( !canvasDblClickEventArgs.preventDefaultAction && this.viewport ) {
        gestureSettings = this.gestureSettingsByDeviceType( event.pointerType );
        if ( gestureSettings.dblClickToZoom ) {
            this.viewport.zoomBy(
                event.shift ? 1.0 / this.zoomPerClick : this.zoomPerClick,
                gestureSettings.zoomToRefPoint ? this.viewport.pointFromPixel( event.position, true ) : null
            );
            this.viewport.applyConstraints();
        }
    }
}

function onCanvasDrag( event ) {
    var gestureSettings;

    var canvasDragEventArgs = {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        position: event.position,
        delta: event.delta,
        speed: event.speed,
        direction: event.direction,
        shift: event.shift,
        originalEvent: event.originalEvent,
        preventDefaultAction: false
    };

    /**
     * Raised when a mouse or touch drag operation occurs on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-drag
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {OpenSeadragon.Point} delta - The x,y components of the difference between start drag and end drag.
     * @property {Number} speed - Current computed speed, in pixels per second.
     * @property {Number} direction - Current computed direction, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {Boolean} preventDefaultAction - Set to true to prevent default drag to pan behaviour. Default: false.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'canvas-drag', canvasDragEventArgs);

    gestureSettings = this.gestureSettingsByDeviceType( event.pointerType );

    if(!canvasDragEventArgs.preventDefaultAction && this.viewport){

        if (gestureSettings.dblClickDragToZoom && THIS[ this.hash ].draggingToZoom){
            var factor = Math.pow( this.zoomPerDblClickDrag, event.delta.y / 50);
            this.viewport.zoomBy(factor);
        }
        else if (gestureSettings.dragToPan && !THIS[ this.hash ].draggingToZoom) {
            if( !this.panHorizontal ){
                event.delta.x = 0;
            }
            if( !this.panVertical ){
                event.delta.y = 0;
            }
            if(this.viewport.flipped){
                event.delta.x = -event.delta.x;
            }

            if( this.constrainDuringPan ){
                var delta = this.viewport.deltaPointsFromPixels( event.delta.negate() );

                this.viewport.centerSpringX.target.value += delta.x;
                this.viewport.centerSpringY.target.value += delta.y;

                var constrainedBounds = this.viewport.getConstrainedBounds();

                this.viewport.centerSpringX.target.value -= delta.x;
                this.viewport.centerSpringY.target.value -= delta.y;

                if (constrainedBounds.xConstrained) {
                    event.delta.x = 0;
                }

                if (constrainedBounds.yConstrained) {
                    event.delta.y = 0;
                }
            }
            this.viewport.panBy( this.viewport.deltaPointsFromPixels( event.delta.negate() ), gestureSettings.flickEnabled && !this.constrainDuringPan);
        }

    }

}

function onCanvasDragEnd( event ) {
    var gestureSettings;
    var canvasDragEndEventArgs = {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        position: event.position,
        speed: event.speed,
        direction: event.direction,
        shift: event.shift,
        originalEvent: event.originalEvent,
        preventDefaultAction: false
    };

    /**
     * Raised when a mouse or touch drag operation ends on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-drag-end
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Number} speed - Speed at the end of a drag gesture, in pixels per second.
     * @property {Number} direction - Direction at the end of a drag gesture, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {Boolean} preventDefaultAction - Set to true to prevent default drag-end flick behaviour. Default: false.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
     this.raiseEvent('canvas-drag-end', canvasDragEndEventArgs);

     gestureSettings = this.gestureSettingsByDeviceType( event.pointerType );

    if (!canvasDragEndEventArgs.preventDefaultAction && this.viewport) {
        if ( !THIS[ this.hash ].draggingToZoom &&
            gestureSettings.flickEnabled &&
            event.speed >= gestureSettings.flickMinSpeed) {
            var amplitudeX = 0;
            if (this.panHorizontal) {
                amplitudeX = gestureSettings.flickMomentum * event.speed *
                    Math.cos(event.direction);
            }
            var amplitudeY = 0;
            if (this.panVertical) {
                amplitudeY = gestureSettings.flickMomentum * event.speed *
                    Math.sin(event.direction);
            }
            var center = this.viewport.pixelFromPoint(
                this.viewport.getCenter(true));
            var target = this.viewport.pointFromPixel(
                new $.Point(center.x - amplitudeX, center.y - amplitudeY));
            this.viewport.panTo(target, false);
        }
        this.viewport.applyConstraints();
    }


    if( gestureSettings.dblClickDragToZoom && THIS[ this.hash ].draggingToZoom === true ){
        THIS[ this.hash ].draggingToZoom = false;
    }


}

function onCanvasEnter( event ) {
    /**
     * Raised when a pointer enters the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-enter
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Number} buttons - Current buttons pressed. A combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @property {Number} pointers - Number of pointers (all types) active in the tracked element.
     * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
     * @property {Boolean} buttonDownAny - Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'canvas-enter', {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        position: event.position,
        buttons: event.buttons,
        pointers: event.pointers,
        insideElementPressed: event.insideElementPressed,
        buttonDownAny: event.buttonDownAny,
        originalEvent: event.originalEvent
    });
}

function onCanvasLeave( event ) {
    /**
     * Raised when a pointer leaves the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-exit
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Number} buttons - Current buttons pressed. A combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @property {Number} pointers - Number of pointers (all types) active in the tracked element.
     * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
     * @property {Boolean} buttonDownAny - Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'canvas-exit', {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        position: event.position,
        buttons: event.buttons,
        pointers: event.pointers,
        insideElementPressed: event.insideElementPressed,
        buttonDownAny: event.buttonDownAny,
        originalEvent: event.originalEvent
    });
}

function onCanvasPress( event ) {
    var gestureSettings;

    /**
     * Raised when the primary mouse button is pressed or touch starts on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-press
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
     * @property {Boolean} insideElementReleased - True if the cursor still inside the tracked element when the button was released.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'canvas-press', {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        position: event.position,
        insideElementPressed: event.insideElementPressed,
        insideElementReleased: event.insideElementReleased,
        originalEvent: event.originalEvent
    });


    gestureSettings = this.gestureSettingsByDeviceType( event.pointerType );
    if ( gestureSettings.dblClickDragToZoom ){
        var lastClickTime = THIS[ this.hash ].lastClickTime;
        var currClickTime = $.now();

        if ( lastClickTime === null) {
            return;
        }

        if ((currClickTime - lastClickTime) < this.dblClickTimeThreshold) {
            THIS[ this.hash ].draggingToZoom = true;
        }

        THIS[ this.hash ].lastClickTime = null;
    }

}

function onCanvasRelease( event ) {
    /**
     * Raised when the primary mouse button is released or touch ends on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-release
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
     * @property {Boolean} insideElementReleased - True if the cursor still inside the tracked element when the button was released.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'canvas-release', {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        position: event.position,
        insideElementPressed: event.insideElementPressed,
        insideElementReleased: event.insideElementReleased,
        originalEvent: event.originalEvent
    });
}

function onCanvasNonPrimaryPress( event ) {
    /**
     * Raised when any non-primary pointer button is pressed on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-nonprimary-press
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {Number} button - Button which caused the event.
     *      -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
     * @property {Number} buttons - Current buttons pressed.
     *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'canvas-nonprimary-press', {
        tracker: event.eventSource,
        position: event.position,
        pointerType: event.pointerType,
        button: event.button,
        buttons: event.buttons,
        originalEvent: event.originalEvent
    });
}

function onCanvasNonPrimaryRelease( event ) {
    /**
     * Raised when any non-primary pointer button is released on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-nonprimary-release
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {Number} button - Button which caused the event.
     *      -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
     * @property {Number} buttons - Current buttons pressed.
     *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'canvas-nonprimary-release', {
        tracker: event.eventSource,
        position: event.position,
        pointerType: event.pointerType,
        button: event.button,
        buttons: event.buttons,
        originalEvent: event.originalEvent
    });
}

function onCanvasPinch( event ) {
    var gestureSettings,
        centerPt,
        lastCenterPt,
        panByPt;

    var canvasPinchEventArgs = {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        gesturePoints: event.gesturePoints,
        lastCenter: event.lastCenter,
        center: event.center,
        lastDistance: event.lastDistance,
        distance: event.distance,
        shift: event.shift,
        originalEvent: event.originalEvent,
        preventDefaultPanAction: false,
        preventDefaultZoomAction: false,
        preventDefaultRotateAction: false
    };

    /**
     * Raised when a pinch event occurs on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-pinch
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {Array.<OpenSeadragon.MouseTracker.GesturePoint>} gesturePoints - Gesture points associated with the gesture. Velocity data can be found here.
     * @property {OpenSeadragon.Point} lastCenter - The previous center point of the two pinch contact points relative to the tracked element.
     * @property {OpenSeadragon.Point} center - The center point of the two pinch contact points relative to the tracked element.
     * @property {Number} lastDistance - The previous distance between the two pinch contact points in CSS pixels.
     * @property {Number} distance - The distance between the two pinch contact points in CSS pixels.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {Boolean} preventDefaultPanAction - Set to true to prevent default pinch to pan behaviour. Default: false.
     * @property {Boolean} preventDefaultZoomAction - Set to true to prevent default pinch to zoom behaviour. Default: false.
     * @property {Boolean} preventDefaultRotateAction - Set to true to prevent default pinch to rotate behaviour. Default: false.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
     this.raiseEvent('canvas-pinch', canvasPinchEventArgs);

    if ( this.viewport ) {
        gestureSettings = this.gestureSettingsByDeviceType( event.pointerType );
        if ( gestureSettings.pinchToZoom &&
                    (!canvasPinchEventArgs.preventDefaultPanAction || !canvasPinchEventArgs.preventDefaultZoomAction) ) {
            centerPt = this.viewport.pointFromPixel( event.center, true );
            if ( gestureSettings.zoomToRefPoint && !canvasPinchEventArgs.preventDefaultPanAction ) {
                lastCenterPt = this.viewport.pointFromPixel( event.lastCenter, true );
                panByPt = lastCenterPt.minus( centerPt );
                if( !this.panHorizontal ) {
                    panByPt.x = 0;
                }
                if( !this.panVertical ) {
                    panByPt.y = 0;
                }
                this.viewport.panBy(panByPt, true);
            }
            if ( !canvasPinchEventArgs.preventDefaultZoomAction ) {
                this.viewport.zoomBy( event.distance / event.lastDistance, centerPt, true );
            }
            this.viewport.applyConstraints();
        }
        if ( gestureSettings.pinchRotate && !canvasPinchEventArgs.preventDefaultRotateAction ) {
            // Pinch rotate
            var angle1 = Math.atan2(event.gesturePoints[0].currentPos.y - event.gesturePoints[1].currentPos.y,
                event.gesturePoints[0].currentPos.x - event.gesturePoints[1].currentPos.x);
            var angle2 = Math.atan2(event.gesturePoints[0].lastPos.y - event.gesturePoints[1].lastPos.y,
                event.gesturePoints[0].lastPos.x - event.gesturePoints[1].lastPos.x);
            this.viewport.setRotation(this.viewport.getRotation() + ((angle1 - angle2) * (180 / Math.PI)));
        }
    }
}

function onCanvasScroll( event ) {
    var canvasScrollEventArgs,
        gestureSettings,
        factor,
        thisScrollTime,
        deltaScrollTime;

    /* Certain scroll devices fire the scroll event way too fast so we are injecting a simple adjustment to keep things
     * partially normalized. If we have already fired an event within the last 'minScrollDelta' milliseconds we skip
     * this one and wait for the next event. */
    thisScrollTime = $.now();
    deltaScrollTime = thisScrollTime - this._lastScrollTime;
    if (deltaScrollTime > this.minScrollDeltaTime) {
        this._lastScrollTime = thisScrollTime;

        canvasScrollEventArgs = {
            tracker: event.eventSource,
            position: event.position,
            scroll: event.scroll,
            shift: event.shift,
            originalEvent: event.originalEvent,
            preventDefaultAction: false,
            preventDefault: true
        };

        /**
         * Raised when a scroll event occurs on the {@link OpenSeadragon.Viewer#canvas} element (mouse wheel).
         *
         * @event canvas-scroll
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
         * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
         * @property {Number} scroll - The scroll delta for the event.
         * @property {Boolean} shift - True if the shift key was pressed during this event.
         * @property {Object} originalEvent - The original DOM event.
         * @property {Boolean} preventDefaultAction - Set to true to prevent default scroll to zoom behaviour. Default: false.
         * @property {Boolean} preventDefault - Set to true to prevent the default user-agent's handling of the wheel event. Default: true.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
         this.raiseEvent('canvas-scroll', canvasScrollEventArgs );

        if ( !canvasScrollEventArgs.preventDefaultAction && this.viewport ) {
            if(this.viewport.flipped){
                event.position.x = this.viewport.getContainerSize().x - event.position.x;
            }

            gestureSettings = this.gestureSettingsByDeviceType( event.pointerType );
            if ( gestureSettings.scrollToZoom ) {
                factor = Math.pow( this.zoomPerScroll, event.scroll );
                this.viewport.zoomBy(
                    factor,
                    gestureSettings.zoomToRefPoint ? this.viewport.pointFromPixel( event.position, true ) : null
                );
                this.viewport.applyConstraints();
            }
        }

        event.preventDefault = canvasScrollEventArgs.preventDefault;
    } else {
        event.preventDefault = true;
    }
}

function onContainerEnter( event ) {
    THIS[ this.hash ].mouseInside = true;
    abortControlsAutoHide( this );
    /**
     * Raised when the cursor enters the {@link OpenSeadragon.Viewer#container} element.
     *
     * @event container-enter
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Number} buttons - Current buttons pressed. A combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @property {Number} pointers - Number of pointers (all types) active in the tracked element.
     * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
     * @property {Boolean} buttonDownAny - Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'container-enter', {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        position: event.position,
        buttons: event.buttons,
        pointers: event.pointers,
        insideElementPressed: event.insideElementPressed,
        buttonDownAny: event.buttonDownAny,
        originalEvent: event.originalEvent
    });
}

function onContainerLeave( event ) {
    if ( event.pointers < 1 ) {
        THIS[ this.hash ].mouseInside = false;
        if ( !THIS[ this.hash ].animating ) {
            beginControlsAutoHide( this );
        }
    }
    /**
     * Raised when the cursor leaves the {@link OpenSeadragon.Viewer#container} element.
     *
     * @event container-exit
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Number} buttons - Current buttons pressed. A combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @property {Number} pointers - Number of pointers (all types) active in the tracked element.
     * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
     * @property {Boolean} buttonDownAny - Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.raiseEvent( 'container-exit', {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        position: event.position,
        buttons: event.buttons,
        pointers: event.pointers,
        insideElementPressed: event.insideElementPressed,
        buttonDownAny: event.buttonDownAny,
        originalEvent: event.originalEvent
    });
}


///////////////////////////////////////////////////////////////////////////////
// Page update routines ( aka Views - for future reference )
///////////////////////////////////////////////////////////////////////////////

function updateMulti( viewer ) {
    updateOnce( viewer );

    // Request the next frame, unless we've been closed
    if ( viewer.isOpen() ) {
        viewer._updateRequestId = scheduleUpdate( viewer, updateMulti );
    } else {
        viewer._updateRequestId = false;
    }
}

function doViewerResize(viewer, containerSize){
    var viewport = viewer.viewport;
    var zoom = viewport.getZoom();
    var center = viewport.getCenter();
    viewport.resize(containerSize, viewer.preserveImageSizeOnResize);
    viewport.panTo(center, true);
    var resizeRatio;
    if (viewer.preserveImageSizeOnResize) {
        resizeRatio = THIS[viewer.hash].prevContainerSize.x / containerSize.x;
    } else {
        var origin = new $.Point(0, 0);
        var prevDiag = new $.Point(THIS[viewer.hash].prevContainerSize.x, THIS[viewer.hash].prevContainerSize.y).distanceTo(origin);
        var newDiag = new $.Point(containerSize.x, containerSize.y).distanceTo(origin);
        resizeRatio = newDiag / prevDiag * THIS[viewer.hash].prevContainerSize.x / containerSize.x;
    }
    viewport.zoomTo(zoom * resizeRatio, null, true);
    THIS[viewer.hash].prevContainerSize = containerSize;
    THIS[viewer.hash].forceRedraw = true;
    THIS[viewer.hash].needsResize = false;
    THIS[viewer.hash].forceResize = false;
}
function updateOnce( viewer ) {

    //viewer.profiler.beginUpdate();

    if (viewer._opening || !THIS[viewer.hash]) {
        return;
    }
    if (viewer.autoResize || THIS[viewer.hash].forceResize){
        var containerSize;
        if(viewer._autoResizePolling){
            containerSize = _getSafeElemSize(viewer.container);
            var prevContainerSize = THIS[viewer.hash].prevContainerSize;
            if (!containerSize.equals(prevContainerSize)) {
                THIS[viewer.hash].needsResize = true;
            }
        }
        if(THIS[viewer.hash].needsResize){
            doViewerResize(viewer, containerSize || _getSafeElemSize(viewer.container));
        }

    }



    var viewportChange = viewer.viewport.update();
    var animated = viewer.world.update() || viewportChange;

    if (viewportChange) {
        /**
         * Raised when any spring animation update occurs (zoom, pan, etc.),
         * before the viewer has drawn the new location.
         *
         * @event viewport-change
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        viewer.raiseEvent('viewport-change');
    }

    if( viewer.referenceStrip ){
        animated = viewer.referenceStrip.update( viewer.viewport ) || animated;
    }

    var currentAnimating = THIS[ viewer.hash ].animating;

    if ( !currentAnimating && animated ) {
        /**
         * Raised when any spring animation starts (zoom, pan, etc.).
         *
         * @event animation-start
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        viewer.raiseEvent( "animation-start" );
        abortControlsAutoHide( viewer );
    }

    var isAnimationFinished = currentAnimating && !animated;

    if ( isAnimationFinished ) {
        THIS[ viewer.hash ].animating = false;
    }

    if ( animated || isAnimationFinished || THIS[ viewer.hash ].forceRedraw || viewer.world.needsDraw() ) {
        drawWorld( viewer );
        viewer._drawOverlays();
        if( viewer.navigator ){
          viewer.navigator.update( viewer.viewport );
        }

        THIS[ viewer.hash ].forceRedraw = false;

        if (animated) {
            /**
             * Raised when any spring animation update occurs (zoom, pan, etc.),
             * after the viewer has drawn the new location.
             *
             * @event animation
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            viewer.raiseEvent( "animation" );
        }
    }

    if ( isAnimationFinished ) {
        /**
         * Raised when any spring animation ends (zoom, pan, etc.).
         *
         * @event animation-finish
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        viewer.raiseEvent( "animation-finish" );

        if ( !THIS[ viewer.hash ].mouseInside ) {
            beginControlsAutoHide( viewer );
        }
    }

    THIS[ viewer.hash ].animating = animated;

    //viewer.profiler.endUpdate();
}

function drawWorld( viewer ) {
    viewer.imageLoader.clear();
    viewer.drawer.clear();
    viewer.world.draw();

    /**
     * <em>- Needs documentation -</em>
     *
     * @event update-viewport
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    viewer.raiseEvent( 'update-viewport', {} );
}

///////////////////////////////////////////////////////////////////////////////
// Navigation Controls
///////////////////////////////////////////////////////////////////////////////
function resolveUrl( prefix, url ) {
    return prefix ? prefix + url : url;
}



function beginZoomingIn() {
    THIS[ this.hash ].lastZoomTime = $.now();
    THIS[ this.hash ].zoomFactor = this.zoomPerSecond;
    THIS[ this.hash ].zooming = true;
    scheduleZoom( this );
}


function beginZoomingOut() {
    THIS[ this.hash ].lastZoomTime = $.now();
    THIS[ this.hash ].zoomFactor = 1.0 / this.zoomPerSecond;
    THIS[ this.hash ].zooming = true;
    scheduleZoom( this );
}


function endZooming() {
    THIS[ this.hash ].zooming = false;
}


function scheduleZoom( viewer ) {
    $.requestAnimationFrame( $.delegate( viewer, doZoom ) );
}


function doZoom() {
    var currentTime,
        deltaTime,
        adjustedFactor;

    if ( THIS[ this.hash ].zooming && this.viewport) {
        currentTime     = $.now();
        deltaTime       = currentTime - THIS[ this.hash ].lastZoomTime;
        adjustedFactor  = Math.pow( THIS[ this.hash ].zoomFactor, deltaTime / 1000 );

        this.viewport.zoomBy( adjustedFactor );
        this.viewport.applyConstraints();
        THIS[ this.hash ].lastZoomTime = currentTime;
        scheduleZoom( this );
    }
}


function doSingleZoomIn() {
    if ( this.viewport ) {
        THIS[ this.hash ].zooming = false;
        this.viewport.zoomBy(
            this.zoomPerClick / 1.0
        );
        this.viewport.applyConstraints();
    }
}


function doSingleZoomOut() {
    if ( this.viewport ) {
        THIS[ this.hash ].zooming = false;
        this.viewport.zoomBy(
            1.0 / this.zoomPerClick
        );
        this.viewport.applyConstraints();
    }
}


function lightUp() {
    if (this.buttonGroup) {
        this.buttonGroup.emulateEnter();
        this.buttonGroup.emulateLeave();
    }
}


function onHome() {
    if ( this.viewport ) {
        this.viewport.goHome();
    }
}


function onFullScreen() {
    if ( this.isFullPage() && !$.isFullScreen() ) {
        // Is fullPage but not fullScreen
        this.setFullPage( false );
    } else {
        this.setFullScreen( !this.isFullPage() );
    }
    // correct for no mouseout event on change
    if ( this.buttonGroup ) {
        this.buttonGroup.emulateLeave();
    }
    this.fullPageButton.element.focus();
    if ( this.viewport ) {
        this.viewport.applyConstraints();
    }
}

function onRotateLeft() {
    if ( this.viewport ) {
        var currRotation = this.viewport.getRotation();

        if ( this.viewport.flipped ){
          currRotation += this.rotationIncrement;
        } else {
          currRotation -= this.rotationIncrement;
        }
        this.viewport.setRotation(currRotation);
    }
}

function onRotateRight() {
    if ( this.viewport ) {
        var currRotation = this.viewport.getRotation();

        if ( this.viewport.flipped ){
          currRotation -= this.rotationIncrement;
        } else {
          currRotation += this.rotationIncrement;
        }
        this.viewport.setRotation(currRotation);
    }
}
/**
 * Note: When pressed flip control button
 */
function onFlip() {
   this.viewport.toggleFlip();
}

}( OpenSeadragon ));

/*
 * OpenSeadragon - Navigator
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class Navigator
 * @classdesc The Navigator provides a small view of the current image as fixed
 * while representing the viewport as a moving box serving as a frame
 * of reference in the larger viewport as to which portion of the image
 * is currently being examined.  The navigator's viewport can be interacted
 * with using the keyboard or the mouse.
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.Viewer
 * @extends OpenSeadragon.EventSource
 * @param {Object} options - Navigator options
 * @param {Element} [options.element] - An element to use for the navigator.
 * @param {String} [options.id] - Id of the element to use for the navigator. However, this is ignored if {@link options.element} is provided.
 */
$.Navigator = function( options ){

    var viewer      = options.viewer,
        _this = this,
        viewerSize,
        navigatorSize;

    //We may need to create a new element and id if they did not
    //provide the id for the existing element or the element itself
    if( options.element || options.id ){
        if ( options.element ) {
            if ( options.id ){
                $.console.warn("Given option.id for Navigator was ignored since option.element was provided and is being used instead.");
            }

            // Don't overwrite the element's id if it has one already
            if ( options.element.id ) {
                options.id = options.element.id;
            } else {
                options.id = 'navigator-' + $.now();
            }

            this.element = options.element;
        } else {
            this.element = document.getElementById( options.id );
        }

        options.controlOptions  = {
            anchor:           $.ControlAnchor.NONE,
            attachToViewer:   false,
            autoFade:         false
        };
    } else {
        options.id              = 'navigator-' + $.now();
        this.element            = $.makeNeutralElement( "div" );
        options.controlOptions  = {
            anchor:           $.ControlAnchor.TOP_RIGHT,
            attachToViewer:   true,
            autoFade:         options.autoFade
        };

        if( options.position ){
            if( 'BOTTOM_RIGHT' === options.position ){
               options.controlOptions.anchor = $.ControlAnchor.BOTTOM_RIGHT;
            } else if( 'BOTTOM_LEFT' === options.position ){
               options.controlOptions.anchor = $.ControlAnchor.BOTTOM_LEFT;
            } else if( 'TOP_RIGHT' === options.position ){
               options.controlOptions.anchor = $.ControlAnchor.TOP_RIGHT;
            } else if( 'TOP_LEFT' === options.position ){
               options.controlOptions.anchor = $.ControlAnchor.TOP_LEFT;
            } else if( 'ABSOLUTE' === options.position ){
               options.controlOptions.anchor = $.ControlAnchor.ABSOLUTE;
               options.controlOptions.top = options.top;
               options.controlOptions.left = options.left;
               options.controlOptions.height = options.height;
               options.controlOptions.width = options.width;
            }
        }
    }
    this.element.id         = options.id;
    this.element.className  += ' navigator';

    options = $.extend( true, {
        sizeRatio:     $.DEFAULT_SETTINGS.navigatorSizeRatio
    }, options, {
        element:                this.element,
        tabIndex:               -1, // No keyboard navigation, omit from tab order
        //These need to be overridden to prevent recursion since
        //the navigator is a viewer and a viewer has a navigator
        showNavigator:          false,
        mouseNavEnabled:        false,
        showNavigationControl:  false,
        showSequenceControl:    false,
        immediateRender:        true,
        blendTime:              0,
        animationTime:          options.animationTime,
        // disable autoResize since resize behavior is implemented differently by the navigator
        autoResize:             false,
        // prevent resizing the navigator from adding unwanted space around the image
        minZoomImageRatio:      1.0,
        background:             options.background,
        opacity:                options.opacity,
        borderColor:            options.borderColor,
        displayRegionColor:     options.displayRegionColor
    });

    options.minPixelRatio = this.minPixelRatio = viewer.minPixelRatio;

    $.setElementTouchActionNone( this.element );

    this.borderWidth = 2;
    //At some browser magnification levels the display regions lines up correctly, but at some there appears to
    //be a one pixel gap.
    this.fudge = new $.Point(1, 1);
    this.totalBorderWidths = new $.Point(this.borderWidth * 2, this.borderWidth * 2).minus(this.fudge);


    if ( options.controlOptions.anchor !== $.ControlAnchor.NONE ) {
        (function( style, borderWidth ){
            style.margin        = '0px';
            style.border        = borderWidth + 'px solid ' + options.borderColor;
            style.padding       = '0px';
            style.background    = options.background;
            style.opacity       = options.opacity;
            style.overflow      = 'hidden';
        }( this.element.style, this.borderWidth));
    }

    this.displayRegion           = $.makeNeutralElement( "div" );
    this.displayRegion.id        = this.element.id + '-displayregion';
    this.displayRegion.className = 'displayregion';

    (function( style, borderWidth ){
        style.position      = 'relative';
        style.top           = '0px';
        style.left          = '0px';
        style.fontSize      = '0px';
        style.overflow      = 'hidden';
        style.border        = borderWidth + 'px solid ' + options.displayRegionColor;
        style.margin        = '0px';
        style.padding       = '0px';
        //TODO: IE doesn't like this property being set
        //try{ style.outline  = '2px auto #909'; }catch(e){/*ignore*/}

        style.background    = 'transparent';

        // We use square bracket notation on the statement below, because float is a keyword.
        // This is important for the Google Closure compiler, if nothing else.
        /*jshint sub:true */
        style['float']      = 'left'; //Webkit

        style.cssFloat      = 'left'; //Firefox
        style.styleFloat    = 'left'; //IE
        style.zIndex        = 999999999;
        style.cursor        = 'default';
    }( this.displayRegion.style, this.borderWidth ));
    $.setElementPointerEventsNone( this.displayRegion );
    $.setElementTouchActionNone( this.displayRegion );

    this.displayRegionContainer = $.makeNeutralElement("div");
    this.displayRegionContainer.id = this.element.id + '-displayregioncontainer';
    this.displayRegionContainer.className = "displayregioncontainer";
    this.displayRegionContainer.style.width = "100%";
    this.displayRegionContainer.style.height = "100%";
    $.setElementPointerEventsNone( this.displayRegionContainer );
    $.setElementTouchActionNone( this.displayRegionContainer );

    viewer.addControl(
        this.element,
        options.controlOptions
    );

    this._resizeWithViewer = options.controlOptions.anchor !== $.ControlAnchor.ABSOLUTE &&
        options.controlOptions.anchor !== $.ControlAnchor.NONE;

    if (options.width && options.height) {
        this.setWidth(options.width);
        this.setHeight(options.height);
    } else if ( this._resizeWithViewer ) {
        viewerSize = $.getElementSize( viewer.element );
        this.element.style.height = Math.round( viewerSize.y * options.sizeRatio ) + 'px';
        this.element.style.width  = Math.round( viewerSize.x * options.sizeRatio ) + 'px';
        this.oldViewerSize = viewerSize;
        navigatorSize = $.getElementSize( this.element );
        this.elementArea = navigatorSize.x * navigatorSize.y;
    }

    this.oldContainerSize = new $.Point( 0, 0 );

    $.Viewer.apply( this, [ options ] );

    this.displayRegionContainer.appendChild(this.displayRegion);
    this.element.getElementsByTagName('div')[0].appendChild(this.displayRegionContainer);

    function rotate(degrees) {
        _setTransformRotate(_this.displayRegionContainer, degrees);
        _setTransformRotate(_this.displayRegion, -degrees);
        _this.viewport.setRotation(degrees);
    }
    if (options.navigatorRotate) {
        var degrees = options.viewer.viewport ?
            options.viewer.viewport.getRotation() :
            options.viewer.degrees || 0;

        rotate(degrees);
        options.viewer.addHandler("rotate", function (args) {
            rotate(args.degrees);
        });
    }


    // Remove the base class' (Viewer's) innerTracker and replace it with our own
    this.innerTracker.destroy();
    this.innerTracker = new $.MouseTracker({
        userData:        'Navigator.innerTracker',
        element:         this.element, //this.canvas,
        dragHandler:     $.delegate( this, onCanvasDrag ),
        clickHandler:    $.delegate( this, onCanvasClick ),
        releaseHandler:  $.delegate( this, onCanvasRelease ),
        scrollHandler:   $.delegate( this, onCanvasScroll ),
        preProcessEventHandler: function (eventInfo) {
            if (eventInfo.eventType === 'wheel') {
                //don't scroll the page up and down if the user is scrolling
                //in the navigator
                eventInfo.preventDefault = true;
            }
        }
    });
    this.outerTracker.userData = 'Navigator.outerTracker';

    // this.innerTracker is attached to this.element...we need to allow pointer
    //   events to pass through this Viewer's canvas/container elements so implicit
    //   pointer capture works on touch devices
    //TODO an alternative is to attach the new MouseTracker to this.canvas...not
    //   sure why it isn't already (see MouseTracker constructor call above)
    $.setElementPointerEventsNone( this.canvas );
    $.setElementPointerEventsNone( this.container );

    this.addHandler("reset-size", function() {
        if (_this.viewport) {
            _this.viewport.goHome(true);
        }
    });

    viewer.world.addHandler("item-index-change", function(event) {
        window.setTimeout(function(){
            var item = _this.world.getItemAt(event.previousIndex);
            _this.world.setItemIndex(item, event.newIndex);
        }, 1);
    });

    viewer.world.addHandler("remove-item", function(event) {
        var theirItem = event.item;
        var myItem = _this._getMatchingItem(theirItem);
        if (myItem) {
            _this.world.removeItem(myItem);
        }
    });

    this.update(viewer.viewport);
};

$.extend( $.Navigator.prototype, $.EventSource.prototype, $.Viewer.prototype, /** @lends OpenSeadragon.Navigator.prototype */{

    /**
     * Used to notify the navigator when its size has changed.
     * Especially useful when {@link OpenSeadragon.Options}.navigatorAutoResize is set to false and the navigator is resizable.
     * @function
     */
    updateSize: function () {
        if ( this.viewport ) {
            var containerSize = new $.Point(
                    (this.container.clientWidth === 0 ? 1 : this.container.clientWidth),
                    (this.container.clientHeight === 0 ? 1 : this.container.clientHeight)
                );

            if ( !containerSize.equals( this.oldContainerSize ) ) {
                this.viewport.resize( containerSize, true );
                this.viewport.goHome(true);
                this.oldContainerSize = containerSize;
                this.drawer.clear();
                this.world.draw();
            }
        }
    },

    /**
     * Explicitly sets the width of the navigator, in web coordinates. Disables automatic resizing.
     * @param {Number|String} width - the new width, either a number of pixels or a CSS string, such as "100%"
     */
    setWidth: function(width) {
        this.width = width;
        this.element.style.width = typeof (width) === "number" ? (width + 'px') : width;
        this._resizeWithViewer = false;
    },

    /**
     * Explicitly sets the height of the navigator, in web coordinates. Disables automatic resizing.
     * @param {Number|String} height - the new height, either a number of pixels or a CSS string, such as "100%"
     */
    setHeight: function(height) {
        this.height = height;
        this.element.style.height = typeof (height) === "number" ? (height + 'px') : height;
        this._resizeWithViewer = false;
    },

    /**
      * Flip navigator element
      * @param {Boolean} state - Flip state to set.
      */
    setFlip: function(state) {
      this.viewport.setFlip(state);

      this.setDisplayTransform(this.viewer.viewport.getFlip() ? "scale(-1,1)" : "scale(1,1)");
      return this;
    },

    setDisplayTransform: function(rule) {
      setElementTransform(this.displayRegion, rule);
      setElementTransform(this.canvas, rule);
      setElementTransform(this.element, rule);
    },

    /**
     * Used to update the navigator minimap's viewport rectangle when a change in the viewer's viewport occurs.
     * @function
     * @param {OpenSeadragon.Viewport} The viewport this navigator is tracking.
     */
    update: function( viewport ) {

        var viewerSize,
            newWidth,
            newHeight,
            bounds,
            topleft,
            bottomright;

        viewerSize = $.getElementSize( this.viewer.element );
        if ( this._resizeWithViewer && viewerSize.x && viewerSize.y && !viewerSize.equals( this.oldViewerSize ) ) {
            this.oldViewerSize = viewerSize;

            if ( this.maintainSizeRatio || !this.elementArea) {
                newWidth  = viewerSize.x * this.sizeRatio;
                newHeight = viewerSize.y * this.sizeRatio;
            } else {
                newWidth = Math.sqrt(this.elementArea * (viewerSize.x / viewerSize.y));
                newHeight = this.elementArea / newWidth;
            }

            this.element.style.width  = Math.round( newWidth ) + 'px';
            this.element.style.height = Math.round( newHeight ) + 'px';

            if (!this.elementArea) {
                this.elementArea = newWidth * newHeight;
            }

            this.updateSize();
        }

        if (viewport && this.viewport) {
            bounds      = viewport.getBoundsNoRotate(true);
            topleft     = this.viewport.pixelFromPointNoRotate(bounds.getTopLeft(), false);
            bottomright = this.viewport.pixelFromPointNoRotate(bounds.getBottomRight(), false)
                .minus( this.totalBorderWidths );

            //update style for navigator-box
            var style = this.displayRegion.style;
            style.display = this.world.getItemCount() ? 'block' : 'none';

            style.top    = Math.round( topleft.y ) + 'px';
            style.left   = Math.round( topleft.x ) + 'px';

            var width = Math.abs( topleft.x - bottomright.x );
            var height = Math.abs( topleft.y - bottomright.y );
            // make sure width and height are non-negative so IE doesn't throw
            style.width  = Math.round( Math.max( width, 0 ) ) + 'px';
            style.height = Math.round( Math.max( height, 0 ) ) + 'px';
        }

    },

    // overrides Viewer.addTiledImage
    addTiledImage: function(options) {
        var _this = this;

        var original = options.originalTiledImage;
        delete options.original;

        var optionsClone = $.extend({}, options, {
            success: function(event) {
                var myItem = event.item;
                myItem._originalForNavigator = original;
                _this._matchBounds(myItem, original, true);
                _this._matchOpacity(myItem, original);
                _this._matchCompositeOperation(myItem, original);

                function matchBounds() {
                    _this._matchBounds(myItem, original);
                }

                function matchOpacity() {
                    _this._matchOpacity(myItem, original);
                }

                function matchCompositeOperation() {
                    _this._matchCompositeOperation(myItem, original);
                }

                original.addHandler('bounds-change', matchBounds);
                original.addHandler('clip-change', matchBounds);
                original.addHandler('opacity-change', matchOpacity);
                original.addHandler('composite-operation-change', matchCompositeOperation);
            }
        });

        return $.Viewer.prototype.addTiledImage.apply(this, [optionsClone]);
    },

    destroy: function() {
        return $.Viewer.prototype.destroy.apply(this);
    },

    // private
    _getMatchingItem: function(theirItem) {
        var count = this.world.getItemCount();
        var item;
        for (var i = 0; i < count; i++) {
            item = this.world.getItemAt(i);
            if (item._originalForNavigator === theirItem) {
                return item;
            }
        }

        return null;
    },

    // private
    _matchBounds: function(myItem, theirItem, immediately) {
        var bounds = theirItem.getBoundsNoRotate();
        myItem.setPosition(bounds.getTopLeft(), immediately);
        myItem.setWidth(bounds.width, immediately);
        myItem.setRotation(theirItem.getRotation(), immediately);
        myItem.setClip(theirItem.getClip());
        myItem.setFlip(theirItem.getFlip());
    },

    // private
    _matchOpacity: function(myItem, theirItem) {
        myItem.setOpacity(theirItem.opacity);
    },

    // private
    _matchCompositeOperation: function(myItem, theirItem) {
        myItem.setCompositeOperation(theirItem.compositeOperation);
    }
});


/**
 * @private
 * @inner
 * @function
 */
function onCanvasClick( event ) {
  var canvasClickEventArgs = {
    tracker: event.eventSource,
    position: event.position,
    quick: event.quick,
    shift: event.shift,
    originalEvent: event.originalEvent,
    preventDefaultAction: false
  };
  /**
   * Raised when a click event occurs on the {@link OpenSeadragon.Viewer#navigator} element.
   *
   * @event navigator-click
   * @memberof OpenSeadragon.Viewer
   * @type {object}
   * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
   * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
   * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
   * @property {Boolean} quick - True only if the clickDistThreshold and clickTimeThreshold are both passed. Useful for differentiating between clicks and drags.
   * @property {Boolean} shift - True if the shift key was pressed during this event.
   * @property {Object} originalEvent - The original DOM event.
   * @property {?Object} userData - Arbitrary subscriber-defined object.
   * @property {Boolean} preventDefaultAction - Set to true to prevent default click to zoom behaviour. Default: false.
   */

   this.viewer.raiseEvent('navigator-click', canvasClickEventArgs);

   if ( !canvasClickEventArgs.preventDefaultAction && event.quick && this.viewer.viewport && (this.panVertical || this.panHorizontal)) {
    if(this.viewer.viewport.flipped) {
      event.position.x = this.viewport.getContainerSize().x - event.position.x;
    }
    var target = this.viewport.pointFromPixel(event.position);
    if (!this.panVertical) {
      // perform only horizonal pan
      target.y = this.viewer.viewport.getCenter(true).y;
    } else if (!this.panHorizontal) {
      // perform only vertical pan
      target.x = this.viewer.viewport.getCenter(true).x;
    }
    this.viewer.viewport.panTo(target);
    this.viewer.viewport.applyConstraints();
  }

}

/**
 * @private
 * @inner
 * @function
 */
function onCanvasDrag( event ) {
    var canvasDragEventArgs = {
      tracker: event.eventSource,
      position: event.position,
      delta: event.delta,
      speed: event.speed,
      direction: event.direction,
      shift: event.shift,
      originalEvent: event.originalEvent,
      preventDefaultAction: false
    };
    /**
     * Raised when a drag event occurs on the {@link OpenSeadragon.Viewer#navigator} element.
     *
     * @event navigator-drag
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {OpenSeadragon.Point} delta - The x,y components of the difference between start drag and end drag.
     * @property {Number} speed - Current computed speed, in pixels per second.
     * @property {Number} direction - Current computed direction, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     * @property {Boolean} preventDefaultAction - Set to true to prevent default drag to pan behaviour. Default: false.
     */
     this.viewer.raiseEvent('navigator-drag', canvasDragEventArgs);

     if ( !canvasDragEventArgs.preventDefaultAction && this.viewer.viewport ) {
       if( !this.panHorizontal ){
            event.delta.x = 0;
        }
        if( !this.panVertical ){
            event.delta.y = 0;
        }

        if(this.viewer.viewport.flipped){
            event.delta.x = -event.delta.x;
        }

        this.viewer.viewport.panBy(
            this.viewport.deltaPointsFromPixels(
                event.delta
            )
        );
        if( this.viewer.constrainDuringPan ){
            this.viewer.viewport.applyConstraints();
        }
    }
}


/**
 * @private
 * @inner
 * @function
 */
function onCanvasRelease( event ) {
    if ( event.insideElementPressed && this.viewer.viewport ) {
        this.viewer.viewport.applyConstraints();
    }
}


/**
 * @private
 * @inner
 * @function
 */
function onCanvasScroll( event ) {
    var eventArgs = {
        tracker: event.eventSource,
        position: event.position,
        scroll: event.scroll,
        shift: event.shift,
        originalEvent: event.originalEvent,
        preventDefault: event.preventDefault
    };

    /**
     * Raised when a scroll event occurs on the {@link OpenSeadragon.Viewer#navigator} element (mouse wheel, touch pinch, etc.).
     *
     * @event navigator-scroll
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Number} scroll - The scroll delta for the event.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {Boolean} preventDefault - Set to true to prevent the default user-agent's handling of the wheel event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
    this.viewer.raiseEvent( 'navigator-scroll', eventArgs );

    event.preventDefault = eventArgs.preventDefault;
}

/**
    * @function
    * @private
    * @param {Object} element
    * @param {Number} degrees
    */
function _setTransformRotate( element, degrees ) {
  setElementTransform(element, "rotate(" + degrees + "deg)");
}

function setElementTransform( element, rule ) {
  element.style.webkitTransform = rule;
  element.style.mozTransform = rule;
  element.style.msTransform = rule;
  element.style.oTransform = rule;
  element.style.transform = rule;
}

}( OpenSeadragon ));

/*
 * OpenSeadragon - getString/setString
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

//TODO: I guess this is where the i18n needs to be reimplemented.  I'll look
//      into existing patterns for i18n in javascript but i think that mimicking
//      pythons gettext might be a reasonable approach.
var I18N = {
    Errors: {
        Dzc:            "Sorry, we don't support Deep Zoom Collections!",
        Dzi:            "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
        Xml:            "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
        ImageFormat:    "Sorry, we don't support {0}-based Deep Zoom Images.",
        Security:       "It looks like a security restriction stopped us from " +
                        "loading this Deep Zoom Image.",
        Status:         "This space unintentionally left blank ({0} {1}).",
        OpenFailed:     "Unable to open {0}: {1}"
    },

    Tooltips: {
        FullPage:       "Toggle full page",
        Home:           "Go home",
        ZoomIn:         "Zoom in",
        ZoomOut:        "Zoom out",
        NextPage:       "Next page",
        PreviousPage:   "Previous page",
        RotateLeft:     "Rotate left",
        RotateRight:    "Rotate right",
        Flip:           "Flip Horizontally"
    }
};

$.extend( $, /** @lends OpenSeadragon */{

    /**
     * @function
     * @param {String} property
     */
    getString: function( prop ) {

        var props   = prop.split('.'),
            string  = null,
            args    = arguments,
            container = I18N,
            i;

        for (i = 0; i < props.length - 1; i++) {
            // in case not a subproperty
            container = container[ props[ i ] ] || {};
        }
        string = container[ props[ i ] ];

        if ( typeof ( string ) !== "string" ) {
            $.console.error( "Untranslated source string:", prop );
            string = ""; // FIXME: this breaks gettext()-style convention, which would return source
        }

        return string.replace(/\{\d+\}/g, function(capture) {
            var i = parseInt( capture.match( /\d+/ ), 10 ) + 1;
            return i < args.length ?
                args[ i ] :
                "";
        });
    },

    /**
     * @function
     * @param {String} property
     * @param {*} value
     */
    setString: function( prop, value ) {

        var props     = prop.split('.'),
            container = I18N,
            i;

        for ( i = 0; i < props.length - 1; i++ ) {
            if ( !container[ props[ i ] ] ) {
                container[ props[ i ] ] = {};
            }
            container = container[ props[ i ] ];
        }

        container[ props[ i ] ] = value;
    }

});

}( OpenSeadragon ));

/*
 * OpenSeadragon - Point
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class Point
 * @classdesc A Point is really used as a 2-dimensional vector, equally useful for
 * representing a point on a plane, or the height and width of a plane
 * not requiring any other frame of reference.
 *
 * @memberof OpenSeadragon
 * @param {Number} [x] The vector component 'x'. Defaults to the origin at 0.
 * @param {Number} [y] The vector component 'y'. Defaults to the origin at 0.
 */
$.Point = function( x, y ) {
    /**
     * The vector component 'x'.
     * @member {Number} x
     * @memberof OpenSeadragon.Point#
     */
    this.x = typeof ( x ) === "number" ? x : 0;
    /**
     * The vector component 'y'.
     * @member {Number} y
     * @memberof OpenSeadragon.Point#
     */
    this.y = typeof ( y ) === "number" ? y : 0;
};

/** @lends OpenSeadragon.Point.prototype */
$.Point.prototype = {
    /**
     * @function
     * @returns {OpenSeadragon.Point} a duplicate of this Point
     */
    clone: function() {
        return new $.Point(this.x, this.y);
    },

    /**
     * Add another Point to this point and return a new Point.
     * @function
     * @param {OpenSeadragon.Point} point The point to add vector components.
     * @returns {OpenSeadragon.Point} A new point representing the sum of the
     *  vector components
     */
    plus: function( point ) {
        return new $.Point(
            this.x + point.x,
            this.y + point.y
        );
    },

    /**
     * Subtract another Point to this point and return a new Point.
     * @function
     * @param {OpenSeadragon.Point} point The point to subtract vector components.
     * @returns {OpenSeadragon.Point} A new point representing the subtraction of the
     *  vector components
     */
    minus: function( point ) {
        return new $.Point(
            this.x - point.x,
            this.y - point.y
        );
    },

    /**
     * Multiply this point by a factor and return a new Point.
     * @function
     * @param {Number} factor The factor to multiply vector components.
     * @returns {OpenSeadragon.Point} A new point representing the multiplication
     *  of the vector components by the factor
     */
    times: function( factor ) {
        return new $.Point(
            this.x * factor,
            this.y * factor
        );
    },

    /**
     * Divide this point by a factor and return a new Point.
     * @function
     * @param {Number} factor The factor to divide vector components.
     * @returns {OpenSeadragon.Point} A new point representing the division of the
     *  vector components by the factor
     */
    divide: function( factor ) {
        return new $.Point(
            this.x / factor,
            this.y / factor
        );
    },

    /**
     * Compute the opposite of this point and return a new Point.
     * @function
     * @returns {OpenSeadragon.Point} A new point representing the opposite of the
     *  vector components
     */
    negate: function() {
        return new $.Point( -this.x, -this.y );
    },

    /**
     * Compute the distance between this point and another point.
     * @function
     * @param {OpenSeadragon.Point} point The point to compute the distance with.
     * @returns {Number} The distance between the 2 points
     */
    distanceTo: function( point ) {
        return Math.sqrt(
            Math.pow( this.x - point.x, 2 ) +
            Math.pow( this.y - point.y, 2 )
        );
    },

    /**
     * Compute the squared distance between this point and another point.
     * Useful for optimizing things like comparing distances.
     * @function
     * @param {OpenSeadragon.Point} point The point to compute the squared distance with.
     * @returns {Number} The squared distance between the 2 points
     */
    squaredDistanceTo: function( point ) {
        return Math.pow( this.x - point.x, 2 ) +
            Math.pow( this.y - point.y, 2 );
    },

    /**
     * Apply a function to each coordinate of this point and return a new point.
     * @function
     * @param {function} func The function to apply to each coordinate.
     * @returns {OpenSeadragon.Point} A new point with the coordinates computed
     * by the specified function
     */
    apply: function( func ) {
        return new $.Point( func( this.x ), func( this.y ) );
    },

    /**
     * Check if this point is equal to another one.
     * @function
     * @param {OpenSeadragon.Point} point The point to compare this point with.
     * @returns {Boolean} true if they are equal, false otherwise.
     */
    equals: function( point ) {
        return (
            point instanceof $.Point
        ) && (
            this.x === point.x
        ) && (
            this.y === point.y
        );
    },

    /**
     * Rotates the point around the specified pivot
     * From http://stackoverflow.com/questions/4465931/rotate-rectangle-around-a-point
     * @function
     * @param {Number} degress to rotate around the pivot.
     * @param {OpenSeadragon.Point} [pivot=(0,0)] Point around which to rotate.
     * Defaults to the origin.
     * @returns {OpenSeadragon.Point}. A new point representing the point rotated around the specified pivot
     */
    rotate: function (degrees, pivot) {
        pivot = pivot || new $.Point(0, 0);
        var cos;
        var sin;
        // Avoid float computations when possible
        if (degrees % 90 === 0) {
            var d = $.positiveModulo(degrees, 360);
            switch (d) {
                case 0:
                    cos = 1;
                    sin = 0;
                    break;
                case 90:
                    cos = 0;
                    sin = 1;
                    break;
                case 180:
                    cos = -1;
                    sin = 0;
                    break;
                case 270:
                    cos = 0;
                    sin = -1;
                    break;
            }
        } else {
            var angle = degrees * Math.PI / 180.0;
            cos = Math.cos(angle);
            sin = Math.sin(angle);
        }
        var x = cos * (this.x - pivot.x) - sin * (this.y - pivot.y) + pivot.x;
        var y = sin * (this.x - pivot.x) + cos * (this.y - pivot.y) + pivot.y;
        return new $.Point(x, y);
    },

    /**
     * Convert this point to a string in the format (x,y) where x and y are
     * rounded to the nearest integer.
     * @function
     * @returns {String} A string representation of this point.
     */
    toString: function() {
        return "(" + (Math.round(this.x * 100) / 100) + "," + (Math.round(this.y * 100) / 100) + ")";
    }
};

}( OpenSeadragon ));

/*
 * OpenSeadragon - TileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){


/**
 * @class TileSource
 * @classdesc The TileSource contains the most basic implementation required to create a
 * smooth transition between layers in an image pyramid. It has only a single key
 * interface that must be implemented to complete its key functionality:
 * 'getTileUrl'.  It also has several optional interfaces that can be
 * implemented if a new TileSource wishes to support configuration via a simple
 * object or array ('configure') and if the tile source supports or requires
 * configuration via retrieval of a document on the network ala AJAX or JSONP,
 * ('getImageInfo').
 * <br/>
 * By default the image pyramid is split into N layers where the image's longest
 * side in M (in pixels), where N is the smallest integer which satisfies
 *      <strong>2^(N+1) >= M</strong>.
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.EventSource
 * @param {Object} options
 *      You can either specify a URL, or literally define the TileSource (by specifying
 *      width, height, tileSize, tileOverlap, minLevel, and maxLevel). For the former,
 *      the extending class is expected to implement 'getImageInfo' and 'configure'.
 *      For the latter, the construction is assumed to occur through
 *      the extending classes implementation of 'configure'.
 * @param {String} [options.url]
 *      The URL for the data necessary for this TileSource.
 * @param {String} [options.referenceStripThumbnailUrl]
 *      The URL for a thumbnail image to be used by the reference strip
 * @param {Function} [options.success]
 *      A function to be called upon successful creation.
 * @param {Boolean} [options.ajaxWithCredentials]
 *      If this TileSource needs to make an AJAX call, this specifies whether to set
 *      the XHR's withCredentials (for accessing secure data).
 * @param {Object} [options.ajaxHeaders]
 *      A set of headers to include in AJAX requests.
 * @param {Boolean} [options.splitHashDataForPost]
 *      First occurrence of '#' in the options.url is used to split URL
 *      and the latter part is treated as POST data (applies to getImageInfo(...))
 * @param {Number} [options.width]
 *      Width of the source image at max resolution in pixels.
 * @param {Number} [options.height]
 *      Height of the source image at max resolution in pixels.
 * @param {Number} [options.tileSize]
 *      The size of the tiles to assumed to make up each pyramid layer in pixels.
 *      Tile size determines the point at which the image pyramid must be
 *      divided into a matrix of smaller images.
 *      Use options.tileWidth and options.tileHeight to support non-square tiles.
 * @param {Number} [options.tileWidth]
 *      The width of the tiles to assumed to make up each pyramid layer in pixels.
 * @param {Number} [options.tileHeight]
 *      The height of the tiles to assumed to make up each pyramid layer in pixels.
 * @param {Number} [options.tileOverlap]
 *      The number of pixels each tile is expected to overlap touching tiles.
 * @param {Number} [options.minLevel]
 *      The minimum level to attempt to load.
 * @param {Number} [options.maxLevel]
 *      The maximum level to attempt to load.
 */
$.TileSource = function( width, height, tileSize, tileOverlap, minLevel, maxLevel ) {
    var _this = this;

    var args = arguments,
        options,
        i;

    if( $.isPlainObject( width ) ){
        options = width;
    }else{
        options = {
            width: args[0],
            height: args[1],
            tileSize: args[2],
            tileOverlap: args[3],
            minLevel: args[4],
            maxLevel: args[5]
        };
    }

    //Tile sources supply some events, namely 'ready' when they must be configured
    //by asynchronously fetching their configuration data.
    $.EventSource.call( this );

    //we allow options to override anything we don't treat as
    //required via idiomatic options or which is functionally
    //set depending on the state of the readiness of this tile
    //source
    $.extend( true, this, options );

    if (!this.success) {
        //Any functions that are passed as arguments are bound to the ready callback
        for ( i = 0; i < arguments.length; i++ ) {
            if ( $.isFunction( arguments[ i ] ) ) {
                this.success = arguments[ i ];
                //only one callback per constructor
                break;
            }
        }
    }

    if (this.success) {
        this.addHandler( 'ready', function ( event ) {
            _this.success( event );
        } );
    }

    /**
     * Ratio of width to height
     * @member {Number} aspectRatio
     * @memberof OpenSeadragon.TileSource#
     */
    /**
     * Vector storing x and y dimensions ( width and height respectively ).
     * @member {OpenSeadragon.Point} dimensions
     * @memberof OpenSeadragon.TileSource#
     */
    /**
     * The overlap in pixels each tile shares with its adjacent neighbors.
     * @member {Number} tileOverlap
     * @memberof OpenSeadragon.TileSource#
     */
    /**
     * The minimum pyramid level this tile source supports or should attempt to load.
     * @member {Number} minLevel
     * @memberof OpenSeadragon.TileSource#
     */
    /**
     * The maximum pyramid level this tile source supports or should attempt to load.
     * @member {Number} maxLevel
     * @memberof OpenSeadragon.TileSource#
     */
    /**
     *
     * @member {Boolean} ready
     * @memberof OpenSeadragon.TileSource#
     */

    if( 'string' === $.type( arguments[ 0 ] ) ){
        this.url = arguments[0];
    }

    if (this.url) {
        //in case the getImageInfo method is overridden and/or implies an
        //async mechanism set some safe defaults first
        this.aspectRatio = 1;
        this.dimensions  = new $.Point( 10, 10 );
        this._tileWidth  = 0;
        this._tileHeight = 0;
        this.tileOverlap = 0;
        this.minLevel    = 0;
        this.maxLevel    = 0;
        this.ready       = false;
        //configuration via url implies the extending class
        //implements and 'configure'
        this.getImageInfo( this.url );

    } else {

        //explicit configuration via positional args in constructor
        //or the more idiomatic 'options' object
        this.ready       = true;
        this.aspectRatio = (options.width && options.height) ?
            (options.width / options.height) : 1;
        this.dimensions  = new $.Point( options.width, options.height );

        if ( this.tileSize ){
            this._tileWidth = this._tileHeight = this.tileSize;
            delete this.tileSize;
        } else {
            if( this.tileWidth ){
                // We were passed tileWidth in options, but we want to rename it
                // with a leading underscore to make clear that it is not safe to directly modify it
                this._tileWidth = this.tileWidth;
                delete this.tileWidth;
            } else {
                this._tileWidth = 0;
            }

            if( this.tileHeight ){
                // See note above about renaming this.tileWidth
                this._tileHeight = this.tileHeight;
                delete this.tileHeight;
            } else {
                this._tileHeight = 0;
            }
        }

        this.tileOverlap = options.tileOverlap ? options.tileOverlap : 0;
        this.minLevel    = options.minLevel ? options.minLevel : 0;
        this.maxLevel    = ( undefined !== options.maxLevel && null !== options.maxLevel ) ?
            options.maxLevel : (
                ( options.width && options.height ) ? Math.ceil(
                    Math.log( Math.max( options.width, options.height ) ) /
                    Math.log( 2 )
                ) : 0
            );
        if( this.success && $.isFunction( this.success ) ){
            this.success( this );
        }
    }


};

/** @lends OpenSeadragon.TileSource.prototype */
$.TileSource.prototype = {

    getTileSize: function( level ) {
        $.console.error(
            "[TileSource.getTileSize] is deprecated. " +
            "Use TileSource.getTileWidth() and TileSource.getTileHeight() instead"
        );
        return this._tileWidth;
    },

    /**
     * Return the tileWidth for a given level.
     * Subclasses should override this if tileWidth can be different at different levels
     *   such as in IIIFTileSource.  Code should use this function rather than reading
     *   from ._tileWidth directly.
     * @function
     * @param {Number} level
     */
    getTileWidth: function( level ) {
        if (!this._tileWidth) {
            return this.getTileSize(level);
        }
        return this._tileWidth;
    },

    /**
     * Return the tileHeight for a given level.
     * Subclasses should override this if tileHeight can be different at different levels
     *   such as in IIIFTileSource.  Code should use this function rather than reading
     *   from ._tileHeight directly.
     * @function
     * @param {Number} level
     */
    getTileHeight: function( level ) {
        if (!this._tileHeight) {
            return this.getTileSize(level);
        }
        return this._tileHeight;
    },

    /**
     * Set the maxLevel to the given level, and perform the memoization of
     * getLevelScale with the new maxLevel. This function can be useful if the
     * memoization is required before the first call of getLevelScale, or both
     * memoized getLevelScale and maxLevel should be changed accordingly.
     * @function
     * @param {Number} level
     */
    setMaxLevel: function( level ) {
        this.maxLevel = level;
        this._memoizeLevelScale();
    },

    /**
     * @function
     * @param {Number} level
     */
    getLevelScale: function( level ) {
        // if getLevelScale is not memoized, we generate the memoized version
        // at the first call and return the result
        this._memoizeLevelScale();
        return this.getLevelScale( level );
    },

    // private
    _memoizeLevelScale: function() {
        // see https://github.com/openseadragon/openseadragon/issues/22
        // we use the tilesources implementation of getLevelScale to generate
        // a memoized re-implementation
        var levelScaleCache = {},
            i;
        for( i = 0; i <= this.maxLevel; i++ ){
            levelScaleCache[ i ] = 1 / Math.pow(2, this.maxLevel - i);
        }
        this.getLevelScale = function( _level ){
            return levelScaleCache[ _level ];
        };
    },

    /**
     * @function
     * @param {Number} level
     */
    getNumTiles: function( level ) {
        var scale = this.getLevelScale( level ),
            x = Math.ceil( scale * this.dimensions.x / this.getTileWidth(level) ),
            y = Math.ceil( scale * this.dimensions.y / this.getTileHeight(level) );

        return new $.Point( x, y );
    },

    /**
     * @function
     * @param {Number} level
     */
    getPixelRatio: function( level ) {
        var imageSizeScaled = this.dimensions.times( this.getLevelScale( level ) ),
            rx = 1.0 / imageSizeScaled.x * $.pixelDensityRatio,
            ry = 1.0 / imageSizeScaled.y * $.pixelDensityRatio;

        return new $.Point(rx, ry);
    },


    /**
     * @function
     * @returns {Number} The highest level in this tile source that can be contained in a single tile.
     */
    getClosestLevel: function() {
        var i,
            tiles;

        for (i = this.minLevel + 1; i <= this.maxLevel; i++){
            tiles = this.getNumTiles(i);
            if (tiles.x > 1 || tiles.y > 1) {
                break;
            }
        }

        return i - 1;
    },

    /**
     * @function
     * @param {Number} level
     * @param {OpenSeadragon.Point} point
     */
    getTileAtPoint: function(level, point) {
        var validPoint = point.x >= 0 && point.x <= 1 &&
            point.y >= 0 && point.y <= 1 / this.aspectRatio;
        $.console.assert(validPoint, "[TileSource.getTileAtPoint] must be called with a valid point.");

        var widthScaled = this.dimensions.x * this.getLevelScale(level);
        var pixelX = point.x * widthScaled;
        var pixelY = point.y * widthScaled;

        var x = Math.floor(pixelX / this.getTileWidth(level));
        var y = Math.floor(pixelY / this.getTileHeight(level));

        // When point.x == 1 or point.y == 1 / this.aspectRatio we want to
        // return the last tile of the row/column
        if (point.x >= 1) {
            x = this.getNumTiles(level).x - 1;
        }
        var EPSILON = 1e-15;
        if (point.y >= 1 / this.aspectRatio - EPSILON) {
            y = this.getNumTiles(level).y - 1;
        }

        return new $.Point(x, y);
    },

    /**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     * @param {Boolean} [isSource=false] Whether to return the source bounds of the tile.
     * @returns {OpenSeadragon.Rect} Either where this tile fits (in normalized coordinates) or the
     * portion of the tile to use as the source of the drawing operation (in pixels), depending on
     * the isSource parameter.
     */
    getTileBounds: function( level, x, y, isSource ) {
        var dimensionsScaled = this.dimensions.times( this.getLevelScale( level ) ),
            tileWidth = this.getTileWidth(level),
            tileHeight = this.getTileHeight(level),
            px = ( x === 0 ) ? 0 : tileWidth * x - this.tileOverlap,
            py = ( y === 0 ) ? 0 : tileHeight * y - this.tileOverlap,
            sx = tileWidth + ( x === 0 ? 1 : 2 ) * this.tileOverlap,
            sy = tileHeight + ( y === 0 ? 1 : 2 ) * this.tileOverlap,
            scale = 1.0 / dimensionsScaled.x;

        sx = Math.min( sx, dimensionsScaled.x - px );
        sy = Math.min( sy, dimensionsScaled.y - py );

        if (isSource) {
            return new $.Rect(0, 0, sx, sy);
        }

        return new $.Rect( px * scale, py * scale, sx * scale, sy * scale );
    },


    /**
     * Responsible for retrieving, and caching the
     * image metadata pertinent to this TileSources implementation.
     * @function
     * @param {String} url
     * @throws {Error}
     */
    getImageInfo: function( url ) {
        var _this = this,
            callbackName,
            callback,
            readySource,
            options,
            urlParts,
            filename,
            lastDot;


        if( url ) {
            urlParts = url.split( '/' );
            filename = urlParts[ urlParts.length - 1 ];
            lastDot  = filename.lastIndexOf( '.' );
            if ( lastDot > -1 ) {
                urlParts[ urlParts.length - 1 ] = filename.slice( 0, lastDot );
            }
        }

        var postData = null;
        if (this.splitHashDataForPost) {
            var hashIdx = url.indexOf("#");
            if (hashIdx !== -1) {
                postData = url.substring(hashIdx + 1);
                url = url.substr(0, hashIdx);
            }
        }

        callback = function( data ){
            if( typeof (data) === "string" ) {
                data = $.parseXml( data );
            }
            var $TileSource = $.TileSource.determineType( _this, data, url );
            if ( !$TileSource ) {
                /**
                 * Raised when an error occurs loading a TileSource.
                 *
                 * @event open-failed
                 * @memberof OpenSeadragon.TileSource
                 * @type {object}
                 * @property {OpenSeadragon.TileSource} eventSource - A reference to the TileSource which raised the event.
                 * @property {String} message
                 * @property {String} source
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent( 'open-failed', { message: "Unable to load TileSource", source: url } );
                return;
            }

            options = $TileSource.prototype.configure.apply( _this, [ data, url, postData ]);
            if (options.ajaxWithCredentials === undefined) {
                options.ajaxWithCredentials = _this.ajaxWithCredentials;
            }

            readySource = new $TileSource( options );
            _this.ready = true;
            /**
             * Raised when a TileSource is opened and initialized.
             *
             * @event ready
             * @memberof OpenSeadragon.TileSource
             * @type {object}
             * @property {OpenSeadragon.TileSource} eventSource - A reference to the TileSource which raised the event.
             * @property {Object} tileSource
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            _this.raiseEvent( 'ready', { tileSource: readySource } );
        };

        if( url.match(/\.js$/) ){
            //TODO: Its not very flexible to require tile sources to end jsonp
            //      request for info  with a url that ends with '.js' but for
            //      now it's the only way I see to distinguish uniformly.
            callbackName = url.split('/').pop().replace('.js', '');
            $.jsonp({
                url: url,
                async: false,
                callbackName: callbackName,
                callback: callback
            });
        } else {
            // request info via xhr asynchronously.
            $.makeAjaxRequest( {
                url: url,
                postData: postData,
                withCredentials: this.ajaxWithCredentials,
                headers: this.ajaxHeaders,
                success: function( xhr ) {
                    var data = processResponse( xhr );
                    callback( data );
                },
                error: function ( xhr, exc ) {
                    var msg;

                    /*
                        IE < 10 will block XHR requests to different origins. Any property access on the request
                        object will raise an exception which we'll attempt to handle by formatting the original
                        exception rather than the second one raised when we try to access xhr.status
                     */
                    try {
                        msg = "HTTP " + xhr.status + " attempting to load TileSource: " + url;
                    } catch ( e ) {
                        var formattedExc;
                        if ( typeof ( exc ) === "undefined" || !exc.toString ) {
                            formattedExc = "Unknown error";
                        } else {
                            formattedExc = exc.toString();
                        }

                        msg = formattedExc + " attempting to load TileSource: " + url;
                    }

                    $.console.error(msg);

                    /***
                     * Raised when an error occurs loading a TileSource.
                     *
                     * @event open-failed
                     * @memberof OpenSeadragon.TileSource
                     * @type {object}
                     * @property {OpenSeadragon.TileSource} eventSource - A reference to the TileSource which raised the event.
                     * @property {String} message
                     * @property {String} source
                     * @property {String} postData - HTTP POST data (usually but not necessarily in k=v&k2=v2... form,
                     *      see TileSource::getPostData) or null
                     * @property {?Object} userData - Arbitrary subscriber-defined object.
                     */
                    _this.raiseEvent( 'open-failed', {
                        message: msg,
                        source: url,
                        postData: postData
                    });
                }
            });
        }

    },

    /**
     * Responsible determining if a the particular TileSource supports the
     * data format ( and allowed to apply logic against the url the data was
     * loaded from, if any ). Overriding implementations are expected to do
     * something smart with data and / or url to determine support.  Also
     * understand that iteration order of TileSources is not guarunteed so
     * please make sure your data or url is expressive enough to ensure a simple
     * and sufficient mechanisim for clear determination.
     * @function
     * @param {String|Object|Array|Document} data
     * @param {String} url - the url the data was loaded
     *      from if any.
     * @returns {Boolean}
     */
    supports: function( data, url ) {
        return false;
    },

    /**
     * Responsible for parsing and configuring the
     * image metadata pertinent to this TileSources implementation.
     * This method is not implemented by this class other than to throw an Error
     * announcing you have to implement it.  Because of the variety of tile
     * server technologies, and various specifications for building image
     * pyramids, this method is here to allow easy integration.
     * @function
     * @param {String|Object|Array|Document} data
     * @param {String} url - the url the data was loaded
     *      from if any.
     * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null value obtained from
     *      the protocol URL after '#' sign if flag splitHashDataForPost set to 'true'
     * @returns {Object} options - A dictionary of keyword arguments sufficient
     *      to configure the tile source constructor (include all values you want to
     *      instantiate the TileSource subclass with - what _options_ object should contain).
     * @throws {Error}
     */
    configure: function( data, url, postData ) {
        throw new Error( "Method not implemented." );
    },

    /**
     * Responsible for retrieving the url which will return an image for the
     * region specified by the given x, y, and level components.
     * This method is not implemented by this class other than to throw an Error
     * announcing you have to implement it.  Because of the variety of tile
     * server technologies, and various specifications for building image
     * pyramids, this method is here to allow easy integration.
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     * @returns {String|Function} url - A string for the url or a function that returns a url string.
     * @throws {Error}
     */
    getTileUrl: function( level, x, y ) {
        throw new Error( "Method not implemented." );
    },

    /**
     * Must use AJAX in order to work, i.e. loadTilesWithAjax = true is set.
     * If a value is returned, ajax issues POST request to the tile url.
     * If null is returned, ajax issues GET request.
     * The return value must comply to the header 'content type'.
     *
     * Examples (USED HEADER --> getTilePostData CODE):
     * 'Content-type': 'application/x-www-form-urlencoded' -->
     *   return "key1=value=1&key2=value2";
     *
     * 'Content-type': 'application/x-www-form-urlencoded' -->
     *   return JSON.stringify({key: "value", number: 5});
     *
     * 'Content-type': 'multipart/form-data' -->
     *   let result = new FormData();
     *   result.append("data", myData);
     *   return result;
     *
     * IMPORTANT: in case you move all the logic on image fetching
     * to post data, you must re-define 'getTileHashKey(...)' to
     * stay unique for different tile images.
     *
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     * @returns {*|null} post data to send with tile configuration request
     */
    getTilePostData: function( level, x, y ) {
        return null;
    },

    /**
     * Responsible for retrieving the headers which will be attached to the image request for the
     * region specified by the given x, y, and level components.
     * This option is only relevant if {@link OpenSeadragon.Options}.loadTilesWithAjax is set to true.
     * The headers returned here will override headers specified at the Viewer or TiledImage level.
     * Specifying a falsy value for a header will clear its existing value set at the Viewer or
     * TiledImage level (if any).
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     * @returns {Object}
     */
    getTileAjaxHeaders: function( level, x, y ) {
        return {};
    },

    /**
     * The tile cache object is uniquely determined by this key and used to lookup
     * the image data in cache: keys should be different if images are different.
     *
     * In case a tile has context2D property defined (TileSource.prototype.getContext2D)
     * or its context2D is set manually; the cache is not used and this function
     * is irrelevant.
     * Note: default behaviour does not take into account post data.
     * @param {Number} level tile level it was fetched with
     * @param {Number} x x-coordinate in the pyramid level
     * @param {Number} y y-coordinate in the pyramid level
     * @param {String} url the tile was fetched with
     * @param {Object} ajaxHeaders the tile was fetched with
     * @param {*} postData data the tile was fetched with (type depends on getTilePostData(..) return type)
     */
    getTileHashKey: function(level, x, y, url, ajaxHeaders, postData) {
        function withHeaders(hash) {
            return ajaxHeaders ? hash + "+" + JSON.stringify(ajaxHeaders) : hash;
        }

        if (typeof url !== "string") {
            return withHeaders(level + "/" + x + "_" + y);
        }
        return withHeaders(url);
    },

    /**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
    tileExists: function( level, x, y ) {
        var numTiles = this.getNumTiles( level );
        return level >= this.minLevel &&
               level <= this.maxLevel &&
               x >= 0 &&
               y >= 0 &&
               x < numTiles.x &&
               y < numTiles.y;
    },

    /**
     * Decide whether tiles have transparency: this is crucial for correct images blending.
     * @returns {boolean} true if the image has transparency
     */
    hasTransparency: function(context2D, url, ajaxHeaders, post) {
        return !!context2D || url.match('.png');
    },

    /**
     * Download tile data.
     * Note that if you override this function, you should override also downloadTileAbort().
     * @param {ImageJob} context job context that you have to call finish(...) on.
     * @param {String} [context.src] - URL of image to download.
     * @param {String} [context.loadWithAjax] - Whether to load this image with AJAX.
     * @param {String} [context.ajaxHeaders] - Headers to add to the image request if using AJAX.
     * @param {Boolean} [context.ajaxWithCredentials] - Whether to set withCredentials on AJAX requests.
     * @param {String} [context.crossOriginPolicy] - CORS policy to use for downloads
     * @param {String} [context.postData] - HTTP POST data (usually but not necessarily in k=v&k2=v2... form,
     *   see TileSource::getPostData) or null
     * @param {*} [context.userData] - Empty object to attach your own data and helper variables to.
     * @param {Function} [context.finish] - Should be called unless abort() was executed, e.g. on all occasions,
     *   be it successful or unsuccessful request.
     *   Usage: context.finish(data, request, errMessage). Pass the downloaded data object or null upon failure.
     *   Add also reference to an ajax request if used. Provide error message in case of failure.
     * @param {Function} [context.abort] - Called automatically when the job times out.
     *   Usage: context.abort().
     * @param {Function} [context.callback] @private - Called automatically once image has been downloaded
     *   (triggered by finish).
     * @param {Number} [context.timeout] @private - The max number of milliseconds that
     *   this image job may take to complete.
     * @param {string} [context.errorMsg] @private - The final error message, default null (set by finish).
     */
    downloadTileStart: function (context) {
        var dataStore = context.userData,
            image = new Image();

        dataStore.image = image;
        dataStore.request = null;

        var finish = function(error) {
            if (!image) {
                context.finish(null, dataStore.request, "Image load failed: undefined Image instance.");
                return;
            }
            image.onload = image.onerror = image.onabort = null;
            context.finish(error ? null : image, dataStore.request, error);
        };
        image.onload = function () {
            finish();
        };
        image.onabort = image.onerror = function() {
            finish("Image load aborted.");
        };

        // Load the tile with an AJAX request if the loadWithAjax option is
        // set. Otherwise load the image by setting the source proprety of the image object.
        if (context.loadWithAjax) {
            dataStore.request = $.makeAjaxRequest({
                url: context.src,
                withCredentials: context.ajaxWithCredentials,
                headers: context.ajaxHeaders,
                responseType: "arraybuffer",
                postData: context.postData,
                success: function(request) {
                    var blb;
                    // Make the raw data into a blob.
                    // BlobBuilder fallback adapted from
                    // http://stackoverflow.com/questions/15293694/blob-constructor-browser-compatibility
                    try {
                        blb = new window.Blob([request.response]);
                    } catch (e) {
                        var BlobBuilder = (
                            window.BlobBuilder ||
                            window.WebKitBlobBuilder ||
                            window.MozBlobBuilder ||
                            window.MSBlobBuilder
                        );
                        if (e.name === 'TypeError' && BlobBuilder) {
                            var bb = new BlobBuilder();
                            bb.append(request.response);
                            blb = bb.getBlob();
                        }
                    }
                    // If the blob is empty for some reason consider the image load a failure.
                    if (blb.size === 0) {
                        finish("Empty image response.");
                    } else {
                        // Create a URL for the blob data and make it the source of the image object.
                        // This will still trigger Image.onload to indicate a successful tile load.
                        image.src = (window.URL || window.webkitURL).createObjectURL(blb);
                    }
                },
                error: function(request) {
                    finish("Image load aborted - XHR error");
                }
            });
        } else {
            if (context.crossOriginPolicy !== false) {
                image.crossOrigin = context.crossOriginPolicy;
            }
            image.src = context.src;
        }
    },

    /**
     * Provide means of aborting the execution.
     * Note that if you override this function, you should override also downloadTileStart().
     * @param {ImageJob} context job, the same object as with downloadTileStart(..)
     * @param {*} [context.userData] - Empty object to attach (and mainly read) your own data.
     */
    downloadTileAbort: function (context) {
        if (context.userData.request) {
            context.userData.request.abort();
        }
        var image = context.userData.image;
        if (context.userData.image) {
            image.onload = image.onerror = image.onabort = null;
        }
    },

    /**
     * Create cache object from the result of the download process. The
     * cacheObject parameter should be used to attach the data to, there are no
     * conventions on how it should be stored - all the logic is implemented within *TileCache() functions.
     *
     * Note that if you override any of *TileCache() functions, you should override all of them.
     * @param {object} cacheObject context cache object
     * @param {*} data image data, the data sent to ImageJob.prototype.finish(), by default an Image object
     * @param {Tile} tile instance the cache was created with
     */
    createTileCache: function(cacheObject, data, tile) {
        cacheObject._data = data;
    },

    /**
     * Cache object destructor, unset all properties you created to allow GC collection.
     * Note that if you override any of *TileCache() functions, you should override all of them.
     * @param {object} cacheObject context cache object
     */
    destroyTileCache: function (cacheObject) {
        cacheObject._data = null;
        cacheObject._renderedContext = null;
    },

    /**
     * Raw data getter
     * Note that if you override any of *TileCache() functions, you should override all of them.
     * @param {object} cacheObject context cache object
     * @returns {*} cache data
     */
    getTileCacheData: function(cacheObject) {
        return cacheObject._data;
    },

    /**
     * Compatibility image element getter
     *  - plugins might need image representation of the data
     *  - div HTML rendering relies on image element presence
     * Note that if you override any of *TileCache() functions, you should override all of them.
     *  @param {object} cacheObject context cache object
     *  @returns {Image} cache data as an Image
     */
    getTileCacheDataAsImage: function(cacheObject) {
        return cacheObject._data; //the data itself by default is Image
    },

    /**
     * Compatibility context 2D getter
     *  - most heavily used rendering method is a canvas-based approach,
     *    convert the data to a canvas and return it's 2D context
     * Note that if you override any of *TileCache() functions, you should override all of them.
     * @param {object} cacheObject context cache object
     * @returns {CanvasRenderingContext2D} context of the canvas representation of the cache data
     */
    getTileCacheDataAsContext2D: function(cacheObject) {
        if (!cacheObject._renderedContext) {
            var canvas = document.createElement( 'canvas' );
            canvas.width = cacheObject._data.width;
            canvas.height = cacheObject._data.height;
            cacheObject._renderedContext = canvas.getContext('2d');
            cacheObject._renderedContext.drawImage( cacheObject._data, 0, 0 );
            //since we are caching the prerendered image on a canvas
            //allow the image to not be held in memory
            cacheObject._data = null;
        }
        return cacheObject._renderedContext;
    }
};


$.extend( true, $.TileSource.prototype, $.EventSource.prototype );


/**
 * Decides whether to try to process the response as xml, json, or hand back
 * the text
 * @private
 * @inner
 * @function
 * @param {XMLHttpRequest} xhr - the completed network request
 */
function processResponse( xhr ){
    var responseText = xhr.responseText,
        status       = xhr.status,
        statusText,
        data;

    if ( !xhr ) {
        throw new Error( $.getString( "Errors.Security" ) );
    } else if ( xhr.status !== 200 && xhr.status !== 0 ) {
        status     = xhr.status;
        statusText = ( status === 404 ) ?
            "Not Found" :
            xhr.statusText;
        throw new Error( $.getString( "Errors.Status", status, statusText ) );
    }

    if( responseText.match(/\s*<.*/) ){
        try{
        data = ( xhr.responseXML && xhr.responseXML.documentElement ) ?
            xhr.responseXML :
            $.parseXml( responseText );
        } catch (e){
            data = xhr.responseText;
        }
    }else if( responseText.match(/\s*[{[].*/) ){
        try{
          data = $.parseJSON(responseText);
        } catch(e){
          data =  responseText;
        }
    }else{
        data = responseText;
    }
    return data;
}


/**
 * Determines the TileSource Implementation by introspection of OpenSeadragon
 * namespace, calling each TileSource implementation of 'isType'
 * @private
 * @inner
 * @function
 * @param {Object|Array|Document} data - the tile source configuration object
 * @param {String} url - the url where the tile source configuration object was
 *      loaded from, if any.
 */
$.TileSource.determineType = function( tileSource, data, url ){
    var property;
    for( property in OpenSeadragon ){
        if( property.match(/.+TileSource$/) &&
            $.isFunction( OpenSeadragon[ property ] ) &&
            $.isFunction( OpenSeadragon[ property ].prototype.supports ) &&
            OpenSeadragon[ property ].prototype.supports.call( tileSource, data, url )
        ){
            return OpenSeadragon[ property ];
        }
    }

    $.console.error( "No TileSource was able to open %s %s", url, data );

    return null;
};


}( OpenSeadragon ));

/*
 * OpenSeadragon - DziTileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class DziTileSource
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.TileSource
 * @param {Number|Object} width - the pixel width of the image or the idiomatic
 *      options object which is used instead of positional arguments.
 * @param {Number} height
 * @param {Number} tileSize
 * @param {Number} tileOverlap
 * @param {String} tilesUrl
 * @param {String} fileFormat
 * @param {OpenSeadragon.DisplayRect[]} displayRects
 * @property {String} tilesUrl
 * @property {String} fileFormat
 * @property {OpenSeadragon.DisplayRect[]} displayRects
 */
$.DziTileSource = function( width, height, tileSize, tileOverlap, tilesUrl, fileFormat, displayRects, minLevel, maxLevel ) {
    var i,
        rect,
        level,
        options;

    if( $.isPlainObject( width ) ){
        options = width;
    }else{
        options = {
            width: arguments[ 0 ],
            height: arguments[ 1 ],
            tileSize: arguments[ 2 ],
            tileOverlap: arguments[ 3 ],
            tilesUrl: arguments[ 4 ],
            fileFormat: arguments[ 5 ],
            displayRects: arguments[ 6 ],
            minLevel: arguments[ 7 ],
            maxLevel: arguments[ 8 ]
        };
    }

    this._levelRects  = {};
    this.tilesUrl     = options.tilesUrl;
    this.fileFormat   = options.fileFormat;
    this.displayRects = options.displayRects;

    if ( this.displayRects ) {
        for ( i = this.displayRects.length - 1; i >= 0; i-- ) {
            rect = this.displayRects[ i ];
            for ( level = rect.minLevel; level <= rect.maxLevel; level++ ) {
                if ( !this._levelRects[ level ] ) {
                    this._levelRects[ level ] = [];
                }
                this._levelRects[ level ].push( rect );
            }
        }
    }

    $.TileSource.apply( this, [ options ] );

};

$.extend( $.DziTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.DziTileSource.prototype */{


    /**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     * @param {Object|Array} data
     * @param {String} optional - url
     */
    supports: function( data, url ){
        var ns;
        if ( data.Image ) {
            ns = data.Image.xmlns;
        } else if ( data.documentElement) {
            if ("Image" === data.documentElement.localName || "Image" === data.documentElement.tagName) {
                ns = data.documentElement.namespaceURI;
            }
        }

        ns = (ns || '').toLowerCase();

        return (ns.indexOf('schemas.microsoft.com/deepzoom/2008') !== -1 ||
            ns.indexOf('schemas.microsoft.com/deepzoom/2009') !== -1);
    },

    /**
     *
     * @function
     * @param {Object|XMLDocument} data - the raw configuration
     * @param {String} url - the url the data was retrieved from if any.
     * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
     * @returns {Object} options - A dictionary of keyword arguments sufficient
     *      to configure this tile sources constructor.
     */
    configure: function( data, url, postData ){

        var options;

        if( !$.isPlainObject(data) ){

            options = configureFromXML( this, data );

        }else{

            options = configureFromObject( this, data );
        }

        if (url && !options.tilesUrl) {
            options.tilesUrl = url.replace(
                    /([^/]+?)(\.(dzi|xml|js)?(\?[^/]*)?)?\/?$/, '$1_files/');

            if (url.search(/\.(dzi|xml|js)\?/) !== -1) {
                options.queryParams = url.match(/\?.*/);
            }else{
                options.queryParams = '';
            }
        }

        return options;
    },


    /**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
    getTileUrl: function( level, x, y ) {
        return [ this.tilesUrl, level, '/', x, '_', y, '.', this.fileFormat, this.queryParams ].join( '' );
    },


    /**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
    tileExists: function( level, x, y ) {
        var rects = this._levelRects[ level ],
            rect,
            scale,
            xMin,
            yMin,
            xMax,
            yMax,
            i;

        if ((this.minLevel && level < this.minLevel) || (this.maxLevel && level > this.maxLevel)) {
            return false;
        }

        if ( !rects || !rects.length ) {
            return true;
        }

        for ( i = rects.length - 1; i >= 0; i-- ) {
            rect = rects[ i ];

            if ( level < rect.minLevel || level > rect.maxLevel ) {
                continue;
            }

            scale = this.getLevelScale( level );
            xMin = rect.x * scale;
            yMin = rect.y * scale;
            xMax = xMin + rect.width * scale;
            yMax = yMin + rect.height * scale;

            xMin = Math.floor( xMin / this._tileWidth );
            yMin = Math.floor( yMin / this._tileWidth ); // DZI tiles are square, so we just use _tileWidth
            xMax = Math.ceil( xMax / this._tileWidth );
            yMax = Math.ceil( yMax / this._tileWidth );

            if ( xMin <= x && x < xMax && yMin <= y && y < yMax ) {
                return true;
            }
        }

        return false;
    }
});


/**
 * @private
 * @inner
 * @function
 */
function configureFromXML( tileSource, xmlDoc ){

    if ( !xmlDoc || !xmlDoc.documentElement ) {
        throw new Error( $.getString( "Errors.Xml" ) );
    }

    var root           = xmlDoc.documentElement,
        rootName       = root.localName || root.tagName,
        ns             = xmlDoc.documentElement.namespaceURI,
        configuration  = null,
        displayRects   = [],
        dispRectNodes,
        dispRectNode,
        rectNode,
        sizeNode,
        i;

    if ( rootName === "Image" ) {

        try {
            sizeNode = root.getElementsByTagName("Size" )[ 0 ];
            if (sizeNode === undefined) {
                sizeNode = root.getElementsByTagNameNS(ns, "Size" )[ 0 ];
            }

            configuration = {
                Image: {
                    xmlns:       "http://schemas.microsoft.com/deepzoom/2008",
                    Url:         root.getAttribute( "Url" ),
                    Format:      root.getAttribute( "Format" ),
                    DisplayRect: null,
                    Overlap:     parseInt( root.getAttribute( "Overlap" ), 10 ),
                    TileSize:    parseInt( root.getAttribute( "TileSize" ), 10 ),
                    Size: {
                        Height: parseInt( sizeNode.getAttribute( "Height" ), 10 ),
                        Width:  parseInt( sizeNode.getAttribute( "Width" ), 10 )
                    }
                }
            };

            if ( !$.imageFormatSupported( configuration.Image.Format ) ) {
                throw new Error(
                    $.getString( "Errors.ImageFormat", configuration.Image.Format.toUpperCase() )
                );
            }

            dispRectNodes = root.getElementsByTagName("DisplayRect" );
            if (dispRectNodes === undefined) {
                dispRectNodes = root.getElementsByTagNameNS(ns, "DisplayRect" )[ 0 ];
            }

            for ( i = 0; i < dispRectNodes.length; i++ ) {
                dispRectNode = dispRectNodes[ i ];
                rectNode     = dispRectNode.getElementsByTagName("Rect" )[ 0 ];
                if (rectNode === undefined) {
                    rectNode = dispRectNode.getElementsByTagNameNS(ns, "Rect" )[ 0 ];
                }

                displayRects.push({
                    Rect: {
                        X: parseInt( rectNode.getAttribute( "X" ), 10 ),
                        Y: parseInt( rectNode.getAttribute( "Y" ), 10 ),
                        Width: parseInt( rectNode.getAttribute( "Width" ), 10 ),
                        Height: parseInt( rectNode.getAttribute( "Height" ), 10 ),
                        MinLevel: parseInt( dispRectNode.getAttribute( "MinLevel" ), 10 ),
                        MaxLevel: parseInt( dispRectNode.getAttribute( "MaxLevel" ), 10 )
                    }
                });
            }

            if( displayRects.length ){
                configuration.Image.DisplayRect = displayRects;
            }

            return configureFromObject( tileSource, configuration );

        } catch ( e ) {
            throw (e instanceof Error) ?
                e :
                new Error( $.getString("Errors.Dzi") );
        }
    } else if ( rootName === "Collection" ) {
        throw new Error( $.getString( "Errors.Dzc" ) );
    } else if ( rootName === "Error" ) {
        var messageNode = root.getElementsByTagName("Message")[0];
        var message = messageNode.firstChild.nodeValue;
        throw new Error(message);
    }

    throw new Error( $.getString( "Errors.Dzi" ) );
}

/**
 * @private
 * @inner
 * @function
 */
function configureFromObject( tileSource, configuration ){
    var imageData     = configuration.Image,
        tilesUrl      = imageData.Url,
        fileFormat    = imageData.Format,
        sizeData      = imageData.Size,
        dispRectData  = imageData.DisplayRect || [],
        width         = parseInt( sizeData.Width, 10 ),
        height        = parseInt( sizeData.Height, 10 ),
        tileSize      = parseInt( imageData.TileSize, 10 ),
        tileOverlap   = parseInt( imageData.Overlap, 10 ),
        displayRects  = [],
        rectData,
        i;

    //TODO: need to figure out out to better handle image format compatibility
    //      which actually includes additional file formats like xml and pdf
    //      and plain text for various tilesource implementations to avoid low
    //      level errors.
    //
    //      For now, just don't perform the check.
    //
    /*if ( !imageFormatSupported( fileFormat ) ) {
        throw new Error(
            $.getString( "Errors.ImageFormat", fileFormat.toUpperCase() )
        );
    }*/

    for ( i = 0; i < dispRectData.length; i++ ) {
        rectData = dispRectData[ i ].Rect;

        displayRects.push( new $.DisplayRect(
            parseInt( rectData.X, 10 ),
            parseInt( rectData.Y, 10 ),
            parseInt( rectData.Width, 10 ),
            parseInt( rectData.Height, 10 ),
            parseInt( rectData.MinLevel, 10 ),
            parseInt( rectData.MaxLevel, 10 )
        ));
    }

    return $.extend(true, {
        width: width, /* width *required */
        height: height, /* height *required */
        tileSize: tileSize, /* tileSize *required */
        tileOverlap: tileOverlap, /* tileOverlap *required */
        minLevel: null, /* minLevel */
        maxLevel: null, /* maxLevel */
        tilesUrl: tilesUrl, /* tilesUrl */
        fileFormat: fileFormat, /* fileFormat */
        displayRects: displayRects /* displayRects */
    }, configuration );

}

}( OpenSeadragon ));

/*
 * OpenSeadragon - IIIFTileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class IIIFTileSource
 * @classdesc A client implementation of the International Image Interoperability Framework
 * Format: Image API 1.0 - 2.1
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.TileSource
 * @see http://iiif.io/api/image/
 * @param {String} [options.tileFormat='jpg']
 *      The extension that will be used when requiring tiles.
 */
$.IIIFTileSource = function( options ){

    /* eslint-disable camelcase */

    $.extend( true, this, options );

    /* Normalizes v3-style 'id' keys to an "_id" internal property */
    this._id = this["@id"] || this["id"] || this['identifier'] || null;

    if ( !( this.height && this.width && this._id) ) {
        throw new Error( 'IIIF required parameters (width, height, or id) not provided.' );
    }

    options.tileSizePerScaleFactor = {};

    this.tileFormat = this.tileFormat || 'jpg';

    this.version = options.version;

    // N.B. 2.0 renamed scale_factors to scaleFactors
    if ( this.tile_width && this.tile_height ) {
        options.tileWidth = this.tile_width;
        options.tileHeight = this.tile_height;
    } else if ( this.tile_width ) {
        options.tileSize = this.tile_width;
    } else if ( this.tile_height ) {
        options.tileSize = this.tile_height;
    } else if ( this.tiles ) {
        // Version 2.0 forwards
        if ( this.tiles.length === 1 ) {
            options.tileWidth  = this.tiles[0].width;
            // Use height if provided, otherwise assume square tiles and use width.
            options.tileHeight = this.tiles[0].height || this.tiles[0].width;
            this.scale_factors = this.tiles[0].scaleFactors;
        } else {
            // Multiple tile sizes at different levels
            this.scale_factors = [];
            for (var t = 0; t < this.tiles.length; t++ ) {
                for (var sf = 0; sf < this.tiles[t].scaleFactors.length; sf++) {
                    var scaleFactor = this.tiles[t].scaleFactors[sf];
                    this.scale_factors.push(scaleFactor);
                    options.tileSizePerScaleFactor[scaleFactor] = {
                        width: this.tiles[t].width,
                        height: this.tiles[t].height || this.tiles[t].width
                    };
                }
            }
        }
    } else if ( canBeTiled(options) ) {
        // use the largest of tileOptions that is smaller than the short dimension
        var shortDim = Math.min( this.height, this.width ),
            tileOptions = [256, 512, 1024],
            smallerTiles = [];

        for ( var c = 0; c < tileOptions.length; c++ ) {
            if ( tileOptions[c] <= shortDim ) {
                smallerTiles.push( tileOptions[c] );
            }
        }

        if ( smallerTiles.length > 0 ) {
            options.tileSize = Math.max.apply( null, smallerTiles );
        } else {
            // If we're smaller than 256, just use the short side.
            options.tileSize = shortDim;
        }
    } else if (this.sizes && this.sizes.length > 0) {
        // This info.json can't be tiled, but we can still construct a legacy pyramid from the sizes array.
        // In this mode, IIIFTileSource will call functions from the abstract baseTileSource or the
        // LegacyTileSource instead of performing IIIF tiling.
        this.emulateLegacyImagePyramid = true;

        options.levels = constructLevels( this );
        // use the largest available size to define tiles
        $.extend( true, options, {
            width: options.levels[ options.levels.length - 1 ].width,
            height: options.levels[ options.levels.length - 1 ].height,
            tileSize: Math.max( options.height, options.width ),
            tileOverlap: 0,
            minLevel: 0,
            maxLevel: options.levels.length - 1
        });
        this.levels = options.levels;
    } else {
        $.console.error("Nothing in the info.json to construct image pyramids from");
    }

    if (!options.maxLevel && !this.emulateLegacyImagePyramid) {
        if (!this.scale_factors) {
            options.maxLevel = Number(Math.round(Math.log(Math.max(this.width, this.height), 2)));
        } else {
            var maxScaleFactor = Math.max.apply(null, this.scale_factors);
            options.maxLevel = Math.round(Math.log(maxScaleFactor) * Math.LOG2E);
        }
    }

    $.TileSource.apply( this, [ options ] );
};

$.extend( $.IIIFTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.IIIFTileSource.prototype */{
    /**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     * @param {Object|Array} data
     * @param {String} [url] - url
     */

    supports: function( data, url ) {
        // Version 2.0 and forwards
        if (data.protocol && data.protocol === 'http://iiif.io/api/image') {
            return true;
        // Version 1.1
        } else if ( data['@context'] && (
            data['@context'] === "http://library.stanford.edu/iiif/image-api/1.1/context.json" ||
            data['@context'] === "http://iiif.io/api/image/1/context.json") ) {
            // N.B. the iiif.io context is wrong, but where the representation lives so likely to be used
            return true;

        // Version 1.0
        } else if ( data.profile &&
            data.profile.indexOf("http://library.stanford.edu/iiif/image-api/compliance.html") === 0) {
            return true;
        } else if ( data.identifier && data.width && data.height ) {
            return true;
        } else if ( data.documentElement &&
            "info" === data.documentElement.tagName &&
            "http://library.stanford.edu/iiif/image-api/ns/" ===
                data.documentElement.namespaceURI) {
            return true;

        // Not IIIF
        } else {
            return false;
        }
    },

    /**
     * A static function used to prepare an incoming IIIF Image API info.json
     * response for processing by the tile handler. Normalizes data for all
     * versions of IIIF (1.0, 1.1, 2.x, 3.x) and returns a data object that
     * may be passed to the IIIFTileSource.
     *
     * @function
     * @static
     * @param {Object} data - the raw configuration
     * @param {String} url - the url configuration was retrieved from
     * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
     * @returns {Object} A normalized IIIF data object
     * @example <caption>IIIF 2.x Info Looks like this</caption>
     * {
     * "@context": "http://iiif.io/api/image/2/context.json",
     * "@id": "http://iiif.example.com/prefix/1E34750D-38DB-4825-A38A-B60A345E591C",
     * "protocol": "http://iiif.io/api/image",
     * "height": 1024,
     * "width": 775,
     * "tiles" : [{"width":256, "scaleFactors":[1,2,4,8]}],
     *  "profile": ["http://iiif.io/api/image/2/level1.json", {
     *    "qualities": [ "native", "bitonal", "grey", "color" ],
     *    "formats": [ "jpg", "png", "gif" ]
     *   }]
     * }
     */
    configure: function( data, url, postData ){
        // Try to deduce our version and fake it upwards if needed
        if ( !$.isPlainObject(data) ) {
            var options = configureFromXml10( data );
            options['@context'] = "http://iiif.io/api/image/1.0/context.json";
            options["@id"] = url.replace('/info.xml', '');
            options.version = 1;
            return options;
        } else {
            if ( !data['@context'] ) {
                data['@context'] = 'http://iiif.io/api/image/1.0/context.json';
                data["@id"] = url.replace('/info.json', '');
                data.version = 1;
            } else {
                var context = data['@context'];
                if (Array.isArray(context)) {
                    for (var i = 0; i < context.length; i++) {
                        if (typeof context[i] === 'string' &&
                            ( /^http:\/\/iiif\.io\/api\/image\/[1-3]\/context\.json$/.test(context[i]) ||
                            context[i] === 'http://library.stanford.edu/iiif/image-api/1.1/context.json' ) ) {
                            context = context[i];
                            break;
                        }
                    }
                }
                switch (context) {
                    case 'http://iiif.io/api/image/1/context.json':
                    case 'http://library.stanford.edu/iiif/image-api/1.1/context.json':
                        data.version = 1;
                        break;
                    case 'http://iiif.io/api/image/2/context.json':
                        data.version = 2;
                        break;
                    case 'http://iiif.io/api/image/3/context.json':
                        data.version = 3;
                        break;
                    default:
                        $.console.error('Data has a @context property which contains no known IIIF context URI.');
                }
            }

            if (data.preferredFormats) {
                for (var f = 0; f < data.preferredFormats.length; f++ ) {
                    if ( OpenSeadragon.imageFormatSupported(data.preferredFormats[f]) ) {
                        data.tileFormat = data.preferredFormats[f];
                        break;
                    }
                }
            }
            return data;
        }
    },

    /**
     * Return the tileWidth for the given level.
     * @function
     * @param {Number} level
     */
    getTileWidth: function( level ) {

        if(this.emulateLegacyImagePyramid) {
            return $.TileSource.prototype.getTileWidth.call(this, level);
        }

        var scaleFactor = Math.pow(2, this.maxLevel - level);

        if (this.tileSizePerScaleFactor && this.tileSizePerScaleFactor[scaleFactor]) {
            return this.tileSizePerScaleFactor[scaleFactor].width;
        }
        return this._tileWidth;
    },

    /**
     * Return the tileHeight for the given level.
     * @function
     * @param {Number} level
     */
    getTileHeight: function( level ) {

        if(this.emulateLegacyImagePyramid) {
            return $.TileSource.prototype.getTileHeight.call(this, level);
        }

        var scaleFactor = Math.pow(2, this.maxLevel - level);

        if (this.tileSizePerScaleFactor && this.tileSizePerScaleFactor[scaleFactor]) {
            return this.tileSizePerScaleFactor[scaleFactor].height;
        }
        return this._tileHeight;
    },

    /**
     * @function
     * @param {Number} level
     */
    getLevelScale: function ( level ) {

        if(this.emulateLegacyImagePyramid) {
            var levelScale = NaN;
            if (this.levels.length > 0 && level >= this.minLevel && level <= this.maxLevel) {
                levelScale =
                    this.levels[level].width /
                    this.levels[this.maxLevel].width;
            }
            return levelScale;
        }

        return $.TileSource.prototype.getLevelScale.call(this, level);
    },

    /**
     * @function
     * @param {Number} level
     */
    getNumTiles: function( level ) {

        if(this.emulateLegacyImagePyramid) {
            var scale = this.getLevelScale(level);
            if (scale) {
                return new $.Point(1, 1);
            } else {
                return new $.Point(0, 0);
            }
        }

        return $.TileSource.prototype.getNumTiles.call(this, level);
    },


    /**
     * @function
     * @param {Number} level
     * @param {OpenSeadragon.Point} point
     */
    getTileAtPoint: function( level, point ) {

        if(this.emulateLegacyImagePyramid) {
            return new $.Point(0, 0);
        }

        return $.TileSource.prototype.getTileAtPoint.call(this, level, point);
    },


    /**
     * Responsible for retrieving the url which will return an image for the
     * region specified by the given x, y, and level components.
     * @function
     * @param {Number} level - z index
     * @param {Number} x
     * @param {Number} y
     * @throws {Error}
     */
    getTileUrl: function( level, x, y ){

        if(this.emulateLegacyImagePyramid) {
            var url = null;
            if ( this.levels.length > 0 && level >= this.minLevel && level <= this.maxLevel ) {
                url = this.levels[ level ].url;
            }
            return url;
        }

        //# constants
        var IIIF_ROTATION = '0',
            //## get the scale (level as a decimal)
            scale = Math.pow( 0.5, this.maxLevel - level ),

            //# image dimensions at this level
            levelWidth = Math.round( this.width * scale ),
            levelHeight = Math.round( this.height * scale ),

            //## iiif region
            tileWidth,
            tileHeight,
            iiifTileSizeWidth,
            iiifTileSizeHeight,
            iiifRegion,
            iiifTileX,
            iiifTileY,
            iiifTileW,
            iiifTileH,
            iiifSize,
            iiifSizeW,
            iiifSizeH,
            iiifQuality,
            uri;

        tileWidth = this.getTileWidth(level);
        tileHeight = this.getTileHeight(level);
        iiifTileSizeWidth = Math.round( tileWidth / scale );
        iiifTileSizeHeight = Math.round( tileHeight / scale );
        if (this.version === 1) {
            iiifQuality = "native." + this.tileFormat;
        } else {
            iiifQuality = "default." + this.tileFormat;
        }
        if ( levelWidth < tileWidth && levelHeight < tileHeight ){
            if ( this.version === 2 && levelWidth === this.width ) {
                iiifSize = "full";
            } else if ( this.version === 3 && levelWidth === this.width && levelHeight === this.height ) {
                iiifSize = "max";
            } else if ( this.version === 3 ) {
                iiifSize = levelWidth + "," + levelHeight;
            } else {
                iiifSize = levelWidth + ",";
            }
            iiifRegion = 'full';
        } else {
            iiifTileX = x * iiifTileSizeWidth;
            iiifTileY = y * iiifTileSizeHeight;
            iiifTileW = Math.min( iiifTileSizeWidth, this.width - iiifTileX );
            iiifTileH = Math.min( iiifTileSizeHeight, this.height - iiifTileY );
            if ( x === 0 && y === 0 && iiifTileW === this.width && iiifTileH === this.height ) {
                iiifRegion = "full";
            } else {
                iiifRegion = [ iiifTileX, iiifTileY, iiifTileW, iiifTileH ].join( ',' );
            }
            iiifSizeW = Math.round( iiifTileW * scale );
            iiifSizeH = Math.round( iiifTileH * scale );
            if ( this.version === 2 && iiifSizeW === this.width ) {
                iiifSize = "full";
            } else if ( this.version === 3 && iiifSizeW === this.width && iiifSizeH === this.height ) {
                iiifSize = "max";
            } else if (this.version === 3) {
                iiifSize = iiifSizeW + "," + iiifSizeH;
            } else {
                iiifSize = iiifSizeW + ",";
            }
        }
        uri = [ this._id, iiifRegion, iiifSize, IIIF_ROTATION, iiifQuality ].join( '/' );

        return uri;
    },

    __testonly__: {
        canBeTiled: canBeTiled,
        constructLevels: constructLevels
    }

  });

    /**
     * Determine whether arbitrary tile requests can be made against a service with the given profile
     * @function
     * @param {Object} options
     * @param {Array|String} options.profile
     * @param {Number} options.version
     * @param {String[]} options.extraFeatures
     * @returns {Boolean}
     */
    function canBeTiled ( options ) {
        var level0Profiles = [
            "http://library.stanford.edu/iiif/image-api/compliance.html#level0",
            "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0",
            "http://iiif.io/api/image/2/level0.json",
            "level0",
            "https://iiif.io/api/image/3/level0.json"
        ];
        var profileLevel = Array.isArray(options.profile) ? options.profile[0] : options.profile;
        var isLevel0 = (level0Profiles.indexOf(profileLevel) !== -1);
        var hasCanoncicalSizeFeature = false;
        if ( options.version === 2 && options.profile.length > 1 && options.profile[1].supports ) {
            hasCanoncicalSizeFeature = options.profile[1].supports.indexOf( "sizeByW" ) !== -1;
        }
        if ( options.version === 3 && options.extraFeatures ) {
            hasCanoncicalSizeFeature = options.extraFeatures.indexOf( "sizeByWh" ) !== -1;
        }
        return !isLevel0 || hasCanoncicalSizeFeature;
    }

    /**
     * Build the legacy pyramid URLs (one tile per level)
     * @function
     * @param {object} options - infoJson
     * @throws {Error}
     */
    function constructLevels(options) {
        var levels = [];
        for(var i = 0; i < options.sizes.length; i++) {
            levels.push({
                url: options._id + '/full/' + options.sizes[i].width + ',' +
                    (options.version === 3 ? options.sizes[i].height : '') +
                    '/0/default.' + options.tileFormat,
                width: options.sizes[i].width,
                height: options.sizes[i].height
            });
        }
        return levels.sort(function(a, b) {
            return a.width - b.width;
        });
    }


    function configureFromXml10(xmlDoc) {
        //parse the xml
        if ( !xmlDoc || !xmlDoc.documentElement ) {
            throw new Error( $.getString( "Errors.Xml" ) );
        }

        var root            = xmlDoc.documentElement,
            rootName        = root.tagName,
            configuration   = null;

        if ( rootName === "info" ) {
            try {
                configuration = {};
                parseXML10( root, configuration );
                return configuration;

            } catch ( e ) {
                throw (e instanceof Error) ?
                    e :
                    new Error( $.getString("Errors.IIIF") );
            }
        }
        throw new Error( $.getString( "Errors.IIIF" ) );
    }

    function parseXML10( node, configuration, property ) {
        var i,
            value;
        if ( node.nodeType === 3 && property ) {//text node
            value = node.nodeValue.trim();
            if( value.match(/^\d*$/)){
                value = Number( value );
            }
            if( !configuration[ property ] ){
                configuration[ property ] = value;
            }else{
                if( !$.isArray( configuration[ property ] ) ){
                    configuration[ property ] = [ configuration[ property ] ];
                }
                configuration[ property ].push( value );
            }
        } else if( node.nodeType === 1 ){
            for( i = 0; i < node.childNodes.length; i++ ){
                parseXML10( node.childNodes[ i ], configuration, node.nodeName );
            }
        }
    }



}( OpenSeadragon ));

/*
 * OpenSeadragon - OsmTileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * Derived from the OSM tile source in Rainer Simon's seajax-utils project
 * <http://github.com/rsimon/seajax-utils>.  Rainer Simon has contributed
 * the included code to the OpenSeadragon project under the New BSD license;
 * see <https://github.com/openseadragon/openseadragon/issues/58>.
 */


(function( $ ){

/**
 * @class OsmTileSource
 * @classdesc A tilesource implementation for OpenStreetMap.<br><br>
 *
 * Note 1. Zoomlevels. Deep Zoom and OSM define zoom levels differently. In  Deep
 * Zoom, level 0 equals an image of 1x1 pixels. In OSM, level 0 equals an image of
 * 256x256 levels (see http://gasi.ch/blog/inside-deep-zoom-2). I.e. there is a
 * difference of log2(256)=8 levels.<br><br>
 *
 * Note 2. Image dimension. According to the OSM Wiki
 * (http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Zoom_levels)
 * the highest Mapnik zoom level has 256.144x256.144 tiles, with a 256x256
 * pixel size. I.e. the Deep Zoom image dimension is 65.572.864x65.572.864
 * pixels.
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.TileSource
 * @param {Number|Object} width - the pixel width of the image or the idiomatic
 *      options object which is used instead of positional arguments.
 * @param {Number} height
 * @param {Number} tileSize
 * @param {Number} tileOverlap
 * @param {String} tilesUrl
 */
$.OsmTileSource = function( width, height, tileSize, tileOverlap, tilesUrl ) {
    var options;

    if( $.isPlainObject( width ) ){
        options = width;
    }else{
        options = {
            width: arguments[0],
            height: arguments[1],
            tileSize: arguments[2],
            tileOverlap: arguments[3],
            tilesUrl: arguments[4]
        };
    }
    //apply default setting for standard public OpenStreatMaps service
    //but allow them to be specified so fliks can host there own instance
    //or apply against other services supportting the same standard
    if( !options.width || !options.height ){
        options.width = 65572864;
        options.height = 65572864;
    }
    if( !options.tileSize ){
        options.tileSize = 256;
        options.tileOverlap = 0;
    }
    if( !options.tilesUrl ){
        options.tilesUrl = "http://tile.openstreetmap.org/";
    }
    options.minLevel = 8;

    $.TileSource.apply( this, [ options ] );

};

$.extend( $.OsmTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.OsmTileSource.prototype */{


    /**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     * @param {Object|Array} data
     * @param {String} optional - url
     */
    supports: function( data, url ){
        return (
            data.type &&
            "openstreetmaps" === data.type
        );
    },

    /**
     *
     * @function
     * @param {Object} data - the raw configuration
     * @param {String} url - the url the data was retrieved from if any.
     * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
     * @returns {Object} options - A dictionary of keyword arguments sufficient
     *      to configure this tile sources constructor.
     */
    configure: function( data, url, postData ){
        return data;
    },


    /**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
    getTileUrl: function( level, x, y ) {
        return this.tilesUrl + (level - 8) + "/" + x + "/" + y + ".png";
    }
});


}( OpenSeadragon ));

/*
 * OpenSeadragon - TmsTileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * Derived from the TMS tile source in Rainer Simon's seajax-utils project
 * <http://github.com/rsimon/seajax-utils>.  Rainer Simon has contributed
 * the included code to the OpenSeadragon project under the New BSD license;
 * see <https://github.com/openseadragon/openseadragon/issues/58>.
 */


(function( $ ){

/**
 * @class TmsTileSource
 * @classdesc A tilesource implementation for Tiled Map Services (TMS).
 * TMS tile scheme ( [ as supported by OpenLayers ] is described here
 * ( http://openlayers.org/dev/examples/tms.html ).
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.TileSource
 * @param {Number|Object} width - the pixel width of the image or the idiomatic
 *      options object which is used instead of positional arguments.
 * @param {Number} height
 * @param {Number} tileSize
 * @param {Number} tileOverlap
 * @param {String} tilesUrl
 */
$.TmsTileSource = function( width, height, tileSize, tileOverlap, tilesUrl ) {
    var options;

    if( $.isPlainObject( width ) ){
        options = width;
    }else{
        options = {
            width: arguments[0],
            height: arguments[1],
            tileSize: arguments[2],
            tileOverlap: arguments[3],
            tilesUrl: arguments[4]
        };
    }
    // TMS has integer multiples of 256 for width/height and adds buffer
    // if necessary -> account for this!
    var bufferedWidth = Math.ceil(options.width / 256) * 256,
        bufferedHeight = Math.ceil(options.height / 256) * 256,
        max;

    // Compute number of zoomlevels in this tileset
    if (bufferedWidth > bufferedHeight) {
        max = bufferedWidth / 256;
    } else {
        max = bufferedHeight / 256;
    }
    options.maxLevel = Math.ceil(Math.log(max) / Math.log(2)) - 1;
    options.tileSize = 256;
    options.width = bufferedWidth;
    options.height = bufferedHeight;

    $.TileSource.apply( this, [ options ] );

};

$.extend( $.TmsTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.TmsTileSource.prototype */{


    /**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     * @param {Object|Array} data
     * @param {String} optional - url
     */
    supports: function( data, url ){
        return ( data.type && "tiledmapservice" === data.type );
    },

    /**
     *
     * @function
     * @param {Object} data - the raw configuration
     * @param {String} url - the url the data was retrieved from if any.
     * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
     * @returns {Object} options - A dictionary of keyword arguments sufficient
     *      to configure this tile sources constructor.
     */
    configure: function( data, url, postData ){
        return data;
    },


    /**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
    getTileUrl: function( level, x, y ) {
        // Convert from Deep Zoom definition to TMS zoom definition
        var yTiles = this.getNumTiles( level ).y - 1;

        return this.tilesUrl + level + "/" + x + "/" + (yTiles - y) + ".png";
    }
});


}( OpenSeadragon ));

(function($) {

    /**
     * @class ZoomifyTileSource
     * @classdesc A tilesource implementation for the zoomify format.
     *
     * A description of the format can be found here:
     * https://ecommons.cornell.edu/bitstream/handle/1813/5410/Introducing_Zoomify_Image.pdf
     *
     * There are two ways of creating a zoomify tilesource for openseadragon
     *
     * 1) Supplying all necessary information in the tilesource object. A minimal example object for this method looks like this:
     *
     * {
     *      type: "zoomifytileservice",
     *      width: 1000,
     *      height: 1000,
     *      tilesUrl: "/test/data/zoomify/"
     * }
     *
     * The tileSize is set to 256 (the usual Zoomify default) when it is not defined. The tileUrl must the path to the image _directory_.
     *
     * 2) Loading image metadata from xml file: (CURRENTLY NOT SUPPORTED)
     *
     * When creating zoomify formatted images one "xml" like file with name ImageProperties.xml
     * will be created as well. Here is an example of such a file:
     *
     * <IMAGE_PROPERTIES WIDTH="1000" HEIGHT="1000" NUMTILES="21" NUMIMAGES="1" VERSION="1.8" TILESIZE="256" />
     *
     * To use this xml file as metadata source you must supply the path to the ImageProperties.xml file and leave out all other parameters:
     * As stated above, this method of loading a zoomify tilesource is currently not supported
     *
     * {
     *      type: "zoomifytileservice",
     *      tilesUrl: "/test/data/zoomify/ImageProperties.xml"
     * }

    *
    * @memberof OpenSeadragon
     * @extends OpenSeadragon.TileSource
     * @param {Number} width - the pixel width of the image.
     * @param {Number} height
     * @param {Number} tileSize
     * @param {String} tilesUrl
     */
    $.ZoomifyTileSource = function(options) {
        if(typeof options.tileSize === 'undefined'){
            options.tileSize = 256;
        }

        if(typeof options.fileFormat === 'undefined'){
            options.fileFormat = 'jpg';
            this.fileFormat = options.fileFormat;
        }

        var currentImageSize = {
            x: options.width,
            y: options.height
        };
        options.imageSizes = [{
            x: options.width,
            y: options.height
        }];
        options.gridSize = [this._getGridSize(options.width, options.height, options.tileSize)];

        while (parseInt(currentImageSize.x, 10) > options.tileSize || parseInt(currentImageSize.y, 10) > options.tileSize) {
            currentImageSize.x = Math.floor(currentImageSize.x / 2);
            currentImageSize.y = Math.floor(currentImageSize.y / 2);
            options.imageSizes.push({
                x: currentImageSize.x,
                y: currentImageSize.y
            });
            options.gridSize.push(this._getGridSize(currentImageSize.x, currentImageSize.y, options.tileSize));
        }
        options.imageSizes.reverse();
        options.gridSize.reverse();
        options.minLevel = 0;
        options.maxLevel = options.gridSize.length - 1;

        OpenSeadragon.TileSource.apply(this, [options]);
    };

    $.extend($.ZoomifyTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.ZoomifyTileSource.prototype */ {

        //private
        _getGridSize: function(width, height, tileSize) {
            return {
                x: Math.ceil(width / tileSize),
                y: Math.ceil(height / tileSize)
            };
        },

        //private
        _calculateAbsoluteTileNumber: function(level, x, y) {
            var num = 0;
            var size = {};

            //Sum up all tiles below the level we want the number of tiles
            for (var z = 0; z < level; z++) {
                size = this.gridSize[z];
                num += size.x * size.y;
            }
            //Add the tiles of the level
            size = this.gridSize[level];
            num += size.x * y + x;
            return num;
        },

        /**
         * Determine if the data and/or url imply the image service is supported by
         * this tile source.
         * @function
         * @param {Object|Array} data
         * @param {String} optional - url
         */
        supports: function(data, url) {
            return (data.type && "zoomifytileservice" === data.type);
        },

        /**
         *
         * @function
         * @param {Object} data - the raw configuration
         * @param {String} url - the url the data was retrieved from if any.
         * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
         * @returns {Object} options - A dictionary of keyword arguments sufficient
         *      to configure this tile sources constructor.
         */
        configure: function(data, url, postData) {
            return data;
        },

        /**
         * @function
         * @param {Number} level
         * @param {Number} x
         * @param {Number} y
         */
        getTileUrl: function(level, x, y) {
            //console.log(level);
            var result = 0;
            var num = this._calculateAbsoluteTileNumber(level, x, y);
            result = Math.floor(num / 256);
            return this.tilesUrl + 'TileGroup' + result + '/' + level + '-' + x + '-' + y + '.' + this.fileFormat;

        }
    });

}(OpenSeadragon));


/*
 * OpenSeadragon - LegacyTileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class LegacyTileSource
 * @classdesc The LegacyTileSource allows simple, traditional image pyramids to be loaded
 * into an OpenSeadragon Viewer.  Basically, this translates to the historically
 * common practice of starting with a 'master' image, maybe a tiff for example,
 * and generating a set of 'service' images like one or more thumbnails, a medium
 * resolution image and a high resolution image in standard web formats like
 * png or jpg.
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.TileSource
 * @param {Array} levels An array of file descriptions, each is an object with
 *      a 'url', a 'width', and a 'height'.  Overriding classes can expect more
 *      properties but these properties are sufficient for this implementation.
 *      Additionally, the levels are required to be listed in order from
 *      smallest to largest.
 * @property {Number} aspectRatio
 * @property {Number} dimensions
 * @property {Number} tileSize
 * @property {Number} tileOverlap
 * @property {Number} minLevel
 * @property {Number} maxLevel
 * @property {Array}  levels
 */
$.LegacyTileSource = function( levels ) {

    var options,
        width,
        height;

    if( $.isArray( levels ) ){
        options = {
            type: 'legacy-image-pyramid',
            levels: levels
        };
    }

    //clean up the levels to make sure we support all formats
    options.levels = filterFiles( options.levels );

    if ( options.levels.length > 0 ) {
        width = options.levels[ options.levels.length - 1 ].width;
        height = options.levels[ options.levels.length - 1 ].height;
    }
    else {
        width = 0;
        height = 0;
        $.console.error( "No supported image formats found" );
    }

    $.extend( true, options, {
        width: width,
        height: height,
        tileSize: Math.max( height, width ),
        tileOverlap: 0,
        minLevel: 0,
        maxLevel: options.levels.length > 0 ? options.levels.length - 1 : 0
    } );

    $.TileSource.apply( this, [ options ] );

    this.levels = options.levels;
};

$.extend( $.LegacyTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.LegacyTileSource.prototype */{
    /**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     * @param {Object|Array} data
     * @param {String} optional - url
     */
    supports: function( data, url ){
        return (
            data.type &&
            "legacy-image-pyramid" === data.type
        ) || (
            data.documentElement &&
            "legacy-image-pyramid" === data.documentElement.getAttribute('type')
        );
    },


    /**
     *
     * @function
     * @param {Object|XMLDocument} configuration - the raw configuration
     * @param {String} dataUrl - the url the data was retrieved from if any.
     * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
     * @returns {Object} options - A dictionary of keyword arguments sufficient
     *      to configure this tile sources constructor.
     */
    configure: function( configuration, dataUrl, postData ){

        var options;

        if( !$.isPlainObject(configuration) ){

            options = configureFromXML( this, configuration );

        }else{

            options = configureFromObject( this, configuration );
        }

        return options;

    },

    /**
     * @function
     * @param {Number} level
     */
    getLevelScale: function ( level ) {
        var levelScale = NaN;
        if ( this.levels.length > 0 && level >= this.minLevel && level <= this.maxLevel ) {
            levelScale =
                this.levels[ level ].width /
                this.levels[ this.maxLevel ].width;
        }
        return levelScale;
    },

    /**
     * @function
     * @param {Number} level
     */
    getNumTiles: function( level ) {
        var scale = this.getLevelScale( level );
        if ( scale ){
            return new $.Point( 1, 1 );
        } else {
            return new $.Point( 0, 0 );
        }
    },

    /**
     * This method is not implemented by this class other than to throw an Error
     * announcing you have to implement it.  Because of the variety of tile
     * server technologies, and various specifications for building image
     * pyramids, this method is here to allow easy integration.
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     * @throws {Error}
     */
    getTileUrl: function ( level, x, y ) {
        var url = null;
        if ( this.levels.length > 0 && level >= this.minLevel && level <= this.maxLevel ) {
            url = this.levels[ level ].url;
        }
        return url;
    }
} );

/**
 * This method removes any files from the Array which don't conform to our
 * basic requirements for a 'level' in the LegacyTileSource.
 * @private
 * @inner
 * @function
 */
function filterFiles( files ){
    var filtered = [],
        file,
        i;
    for( i = 0; i < files.length; i++ ){
        file = files[ i ];
        if( file.height &&
            file.width &&
            file.url ){
            //This is sufficient to serve as a level
            filtered.push({
                url: file.url,
                width: Number( file.width ),
                height: Number( file.height )
            });
        }
        else {
            $.console.error( 'Unsupported image format: %s', file.url ? file.url : '<no URL>' );
        }
    }

    return filtered.sort(function(a, b) {
        return a.height - b.height;
    });

}

/**
 * @private
 * @inner
 * @function
 */
function configureFromXML( tileSource, xmlDoc ){

    if ( !xmlDoc || !xmlDoc.documentElement ) {
        throw new Error( $.getString( "Errors.Xml" ) );
    }

    var root         = xmlDoc.documentElement,
        rootName     = root.tagName,
        conf         = null,
        levels       = [],
        level,
        i;

    if ( rootName === "image" ) {

        try {
            conf = {
                type:        root.getAttribute( "type" ),
                levels:      []
            };

            levels = root.getElementsByTagName( "level" );
            for ( i = 0; i < levels.length; i++ ) {
                level = levels[ i ];

                conf.levels.push({
                    url:    level.getAttribute( "url" ),
                    width:  parseInt( level.getAttribute( "width" ), 10 ),
                    height: parseInt( level.getAttribute( "height" ), 10 )
                });
            }

            return configureFromObject( tileSource, conf );

        } catch ( e ) {
            throw (e instanceof Error) ?
                e :
                new Error( 'Unknown error parsing Legacy Image Pyramid XML.' );
        }
    } else if ( rootName === "collection" ) {
        throw new Error( 'Legacy Image Pyramid Collections not yet supported.' );
    } else if ( rootName === "error" ) {
        throw new Error( 'Error: ' + xmlDoc );
    }

    throw new Error( 'Unknown element ' + rootName );
}

/**
 * @private
 * @inner
 * @function
 */
function configureFromObject( tileSource, configuration ){

    return configuration.levels;

}

}( OpenSeadragon ));

/*
 * OpenSeadragon - ImageTileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * @class ImageTileSource
     * @classdesc The ImageTileSource allows a simple image to be loaded
     * into an OpenSeadragon Viewer.
     * There are 2 ways to open an ImageTileSource:
     * 1. viewer.open({type: 'image', url: fooUrl});
     * 2. viewer.open(new OpenSeadragon.ImageTileSource({url: fooUrl}));
     *
     * With the first syntax, the crossOriginPolicy, ajaxWithCredentials and
     * useCanvas options are inherited from the viewer if they are not
     * specified directly in the options object.
     *
     * @memberof OpenSeadragon
     * @extends OpenSeadragon.TileSource
     * @param {Object} options Options object.
     * @param {String} options.url URL of the image
     * @param {Boolean} [options.buildPyramid=true] If set to true (default), a
     * pyramid will be built internally to provide a better downsampling.
     * @param {String|Boolean} [options.crossOriginPolicy=false] Valid values are
     * 'Anonymous', 'use-credentials', and false. If false, image requests will
     * not use CORS preventing internal pyramid building for images from other
     * domains.
     * @param {String|Boolean} [options.ajaxWithCredentials=false] Whether to set
     * the withCredentials XHR flag for AJAX requests (when loading tile sources).
     * @param {Boolean} [options.useCanvas=true] Set to false to prevent any use
     * of the canvas API.
     */
    $.ImageTileSource = function (options) {

        options = $.extend({
            buildPyramid: true,
            crossOriginPolicy: false,
            ajaxWithCredentials: false,
            useCanvas: true
        }, options);
        $.TileSource.apply(this, [options]);

    };

    $.extend($.ImageTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.ImageTileSource.prototype */{
        /**
         * Determine if the data and/or url imply the image service is supported by
         * this tile source.
         * @function
         * @param {Object|Array} data
         * @param {String} optional - url
         */
        supports: function (data, url) {
            return data.type && data.type === "image";
        },
        /**
         *
         * @function
         * @param {Object} options - the options
         * @param {String} dataUrl - the url the image was retrieved from, if any.
         * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
         * @returns {Object} options - A dictionary of keyword arguments sufficient
         *      to configure this tile sources constructor.
         */
        configure: function (options, dataUrl, postData) {
            return options;
        },
        /**
         * Responsible for retrieving, and caching the
         * image metadata pertinent to this TileSources implementation.
         * @function
         * @param {String} url
         * @throws {Error}
         */
        getImageInfo: function (url) {
            var image = this._image = new Image();
            var _this = this;

            if (this.crossOriginPolicy) {
                image.crossOrigin = this.crossOriginPolicy;
            }
            if (this.ajaxWithCredentials) {
                image.useCredentials = this.ajaxWithCredentials;
            }

            $.addEvent(image, 'load', function () {
                _this.width = image.naturalWidth;
                _this.height = image.naturalHeight;
                _this.aspectRatio = _this.width / _this.height;
                _this.dimensions = new $.Point(_this.width, _this.height);
                _this._tileWidth = _this.width;
                _this._tileHeight = _this.height;
                _this.tileOverlap = 0;
                _this.minLevel = 0;
                _this.levels = _this._buildLevels();
                _this.maxLevel = _this.levels.length - 1;

                _this.ready = true;

                // Note: this event is documented elsewhere, in TileSource
                _this.raiseEvent('ready', {tileSource: _this});
            });

            $.addEvent(image, 'error', function () {
                // Note: this event is documented elsewhere, in TileSource
                _this.raiseEvent('open-failed', {
                    message: "Error loading image at " + url,
                    source: url
                });
            });

            image.src = url;
        },
        /**
         * @function
         * @param {Number} level
         */
        getLevelScale: function (level) {
            var levelScale = NaN;
            if (level >= this.minLevel && level <= this.maxLevel) {
                levelScale =
                        this.levels[level].width /
                        this.levels[this.maxLevel].width;
            }
            return levelScale;
        },
        /**
         * @function
         * @param {Number} level
         */
        getNumTiles: function (level) {
            var scale = this.getLevelScale(level);
            if (scale) {
                return new $.Point(1, 1);
            } else {
                return new $.Point(0, 0);
            }
        },
        /**
         * Retrieves a tile url
         * @function
         * @param {Number} level Level of the tile
         * @param {Number} x x coordinate of the tile
         * @param {Number} y y coordinate of the tile
         */
        getTileUrl: function (level, x, y) {
            var url = null;
            if (level >= this.minLevel && level <= this.maxLevel) {
                url = this.levels[level].url;
            }
            return url;
        },
        /**
         * Retrieves a tile context 2D
         * @function
         * @param {Number} level Level of the tile
         * @param {Number} x x coordinate of the tile
         * @param {Number} y y coordinate of the tile
         */
        getContext2D: function (level, x, y) {
            var context = null;
            if (level >= this.minLevel && level <= this.maxLevel) {
                context = this.levels[level].context2D;
            }
            return context;
        },
        /**
         * Destroys ImageTileSource
         * @function
         */
        destroy: function () {
            this._freeupCanvasMemory();
        },

        // private
        //
        // Builds the different levels of the pyramid if possible
        // (i.e. if canvas API enabled and no canvas tainting issue).
        _buildLevels: function () {
            var levels = [{
                    url: this._image.src,
                    width: this._image.naturalWidth,
                    height:  this._image.naturalHeight
                }];

            if (!this.buildPyramid || !$.supportsCanvas || !this.useCanvas) {
                // We don't need the image anymore. Allows it to be GC.
                delete this._image;
                return levels;
            }

            var currentWidth = this._image.naturalWidth;
            var currentHeight = this._image.naturalHeight;


            var bigCanvas = document.createElement("canvas");
            var bigContext = bigCanvas.getContext("2d");

            bigCanvas.width = currentWidth;
            bigCanvas.height = currentHeight;
            bigContext.drawImage(this._image, 0, 0, currentWidth, currentHeight);
            // We cache the context of the highest level because the browser
            // is a lot faster at downsampling something it already has
            // downsampled before.
            levels[0].context2D = bigContext;
            // We don't need the image anymore. Allows it to be GC.
            delete this._image;

            if ($.isCanvasTainted(bigCanvas)) {
                // If the canvas is tainted, we can't compute the pyramid.
                return levels;
            }

            // We build smaller levels until either width or height becomes
            // 1 pixel wide.
            while (currentWidth >= 2 && currentHeight >= 2) {
                currentWidth = Math.floor(currentWidth / 2);
                currentHeight = Math.floor(currentHeight / 2);
                var smallCanvas = document.createElement("canvas");
                var smallContext = smallCanvas.getContext("2d");
                smallCanvas.width = currentWidth;
                smallCanvas.height = currentHeight;
                smallContext.drawImage(bigCanvas, 0, 0, currentWidth, currentHeight);

                levels.splice(0, 0, {
                    context2D: smallContext,
                    width: currentWidth,
                    height: currentHeight
                });

                bigCanvas = smallCanvas;
                bigContext = smallContext;
            }
            return levels;
        },
        /**
         * Free up canvas memory
         * (iOS 12 or higher on 2GB RAM device has only 224MB canvas memory,
         * and Safari keeps canvas until its height and width will be set to 0).
         * @function
         */
        _freeupCanvasMemory: function () {
            for (var i = 0; i < this.levels.length; i++) {
                if(this.levels[i].context2D){
                    this.levels[i].context2D.canvas.height = 0;
                    this.levels[i].context2D.canvas.width = 0;
                }
            }
        },
    });

}(OpenSeadragon));

/*
 * OpenSeadragon - TileSourceCollection
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function($) {

// deprecated
$.TileSourceCollection = function(tileSize, tileSources, rows, layout) {
    $.console.error('TileSourceCollection is deprecated; use World instead');
};

}(OpenSeadragon));

/*
 * OpenSeadragon - Button
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * An enumeration of button states
 * @member ButtonState
 * @memberof OpenSeadragon
 * @static
 * @type {Object}
 * @property {Number} REST
 * @property {Number} GROUP
 * @property {Number} HOVER
 * @property {Number} DOWN
 */
$.ButtonState = {
    REST:   0,
    GROUP:  1,
    HOVER:  2,
    DOWN:   3
};

/**
 * @class Button
 * @classdesc Manages events, hover states for individual buttons, tool-tips, as well
 * as fading the buttons out when the user has not interacted with them
 * for a specified period.
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.EventSource
 * @param {Object} options
 * @param {Element} [options.element=null] Element to use as the button. If not specified, an HTML &lt;div&gt; element is created.
 * @param {String} [options.tooltip=null] Provides context help for the button when the
 *  user hovers over it.
 * @param {String} [options.srcRest=null] URL of image to use in 'rest' state.
 * @param {String} [options.srcGroup=null] URL of image to use in 'up' state.
 * @param {String} [options.srcHover=null] URL of image to use in 'hover' state.
 * @param {String} [options.srcDown=null] URL of image to use in 'down' state.
 * @param {Number} [options.fadeDelay=0] How long to wait before fading.
 * @param {Number} [options.fadeLength=2000] How long should it take to fade the button.
 * @param {OpenSeadragon.EventHandler} [options.onPress=null] Event handler callback for {@link OpenSeadragon.Button.event:press}.
 * @param {OpenSeadragon.EventHandler} [options.onRelease=null] Event handler callback for {@link OpenSeadragon.Button.event:release}.
 * @param {OpenSeadragon.EventHandler} [options.onClick=null] Event handler callback for {@link OpenSeadragon.Button.event:click}.
 * @param {OpenSeadragon.EventHandler} [options.onEnter=null] Event handler callback for {@link OpenSeadragon.Button.event:enter}.
 * @param {OpenSeadragon.EventHandler} [options.onExit=null] Event handler callback for {@link OpenSeadragon.Button.event:exit}.
 * @param {OpenSeadragon.EventHandler} [options.onFocus=null] Event handler callback for {@link OpenSeadragon.Button.event:focus}.
 * @param {OpenSeadragon.EventHandler} [options.onBlur=null] Event handler callback for {@link OpenSeadragon.Button.event:blur}.
 * @param {Object} [options.userData=null] Arbitrary object to be passed unchanged to any attached handler methods.
 */
$.Button = function( options ) {

    var _this = this;

    $.EventSource.call( this );

    $.extend( true, this, {

        tooltip:            null,
        srcRest:            null,
        srcGroup:           null,
        srcHover:           null,
        srcDown:            null,
        clickTimeThreshold: $.DEFAULT_SETTINGS.clickTimeThreshold,
        clickDistThreshold: $.DEFAULT_SETTINGS.clickDistThreshold,
        /**
         * How long to wait before fading.
         * @member {Number} fadeDelay
         * @memberof OpenSeadragon.Button#
         */
        fadeDelay:          0,
        /**
         * How long should it take to fade the button.
         * @member {Number} fadeLength
         * @memberof OpenSeadragon.Button#
         */
        fadeLength:         2000,
        onPress:            null,
        onRelease:          null,
        onClick:            null,
        onEnter:            null,
        onExit:             null,
        onFocus:            null,
        onBlur:             null,
        userData:           null

    }, options );

    /**
     * The button element.
     * @member {Element} element
     * @memberof OpenSeadragon.Button#
     */
    this.element = options.element || $.makeNeutralElement("div");

    //if the user has specified the element to bind the control to explicitly
    //then do not add the default control images
    if ( !options.element ) {
        this.imgRest      = $.makeTransparentImage( this.srcRest );
        this.imgGroup     = $.makeTransparentImage( this.srcGroup );
        this.imgHover     = $.makeTransparentImage( this.srcHover );
        this.imgDown      = $.makeTransparentImage( this.srcDown );

        this.imgRest.alt  =
        this.imgGroup.alt =
        this.imgHover.alt =
        this.imgDown.alt  =
            this.tooltip;

        // Allow pointer events to pass through the img elements so implicit
        //   pointer capture works on touch devices
        $.setElementPointerEventsNone( this.imgRest );
        $.setElementPointerEventsNone( this.imgGroup );
        $.setElementPointerEventsNone( this.imgHover );
        $.setElementPointerEventsNone( this.imgDown );

        this.element.style.position = "relative";
        $.setElementTouchActionNone( this.element );

        this.imgGroup.style.position =
        this.imgHover.style.position =
        this.imgDown.style.position  =
            "absolute";

        this.imgGroup.style.top =
        this.imgHover.style.top =
        this.imgDown.style.top  =
            "0px";

        this.imgGroup.style.left =
        this.imgHover.style.left =
        this.imgDown.style.left  =
            "0px";

        this.imgHover.style.visibility =
        this.imgDown.style.visibility  =
            "hidden";

        if ($.Browser.vendor === $.BROWSERS.FIREFOX && $.Browser.version < 3) {
            this.imgGroup.style.top =
            this.imgHover.style.top =
            this.imgDown.style.top  =
                "";
        }

        this.element.appendChild( this.imgRest );
        this.element.appendChild( this.imgGroup );
        this.element.appendChild( this.imgHover );
        this.element.appendChild( this.imgDown );
    }


    this.addHandler("press", this.onPress);
    this.addHandler("release", this.onRelease);
    this.addHandler("click", this.onClick);
    this.addHandler("enter", this.onEnter);
    this.addHandler("exit", this.onExit);
    this.addHandler("focus", this.onFocus);
    this.addHandler("blur", this.onBlur);

    /**
     * The button's current state.
     * @member {OpenSeadragon.ButtonState} currentState
     * @memberof OpenSeadragon.Button#
     */
    this.currentState = $.ButtonState.GROUP;

    // When the button last began to fade.
    this.fadeBeginTime  = null;
    // Whether this button should fade after user stops interacting with the viewport.
    this.shouldFade     = false;

    this.element.style.display  = "inline-block";
    this.element.style.position = "relative";
    this.element.title          = this.tooltip;

    /**
     * Tracks mouse/touch/key events on the button.
     * @member {OpenSeadragon.MouseTracker} tracker
     * @memberof OpenSeadragon.Button#
     */
    this.tracker = new $.MouseTracker({

        userData:           'Button.tracker',
        element:            this.element,
        clickTimeThreshold: this.clickTimeThreshold,
        clickDistThreshold: this.clickDistThreshold,

        enterHandler: function( event ) {
            if ( event.insideElementPressed ) {
                inTo( _this, $.ButtonState.DOWN );
                /**
                 * Raised when the cursor enters the Button element.
                 *
                 * @event enter
                 * @memberof OpenSeadragon.Button
                 * @type {object}
                 * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                 * @property {Object} originalEvent - The original DOM event.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent( "enter", { originalEvent: event.originalEvent } );
            } else if ( !event.buttonDownAny ) {
                inTo( _this, $.ButtonState.HOVER );
            }
        },

        focusHandler: function ( event ) {
            _this.tracker.enterHandler( event );
            /**
             * Raised when the Button element receives focus.
             *
             * @event focus
             * @memberof OpenSeadragon.Button
             * @type {object}
             * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
             * @property {Object} originalEvent - The original DOM event.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            _this.raiseEvent( "focus", { originalEvent: event.originalEvent } );
        },

        leaveHandler: function( event ) {
            outTo( _this, $.ButtonState.GROUP );
            if ( event.insideElementPressed ) {
                /**
                 * Raised when the cursor leaves the Button element.
                 *
                 * @event exit
                 * @memberof OpenSeadragon.Button
                 * @type {object}
                 * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                 * @property {Object} originalEvent - The original DOM event.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent( "exit", { originalEvent: event.originalEvent } );
            }
        },

        blurHandler: function ( event ) {
            _this.tracker.leaveHandler( event );
            /**
             * Raised when the Button element loses focus.
             *
             * @event blur
             * @memberof OpenSeadragon.Button
             * @type {object}
             * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
             * @property {Object} originalEvent - The original DOM event.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            _this.raiseEvent( "blur", { originalEvent: event.originalEvent } );
        },

        pressHandler: function ( event ) {
            inTo( _this, $.ButtonState.DOWN );
            /**
             * Raised when a mouse button is pressed or touch occurs in the Button element.
             *
             * @event press
             * @memberof OpenSeadragon.Button
             * @type {object}
             * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
             * @property {Object} originalEvent - The original DOM event.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            _this.raiseEvent( "press", { originalEvent: event.originalEvent } );
        },

        releaseHandler: function( event ) {
            if ( event.insideElementPressed && event.insideElementReleased ) {
                outTo( _this, $.ButtonState.HOVER );
                /**
                 * Raised when the mouse button is released or touch ends in the Button element.
                 *
                 * @event release
                 * @memberof OpenSeadragon.Button
                 * @type {object}
                 * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                 * @property {Object} originalEvent - The original DOM event.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent( "release", { originalEvent: event.originalEvent } );
            } else if ( event.insideElementPressed ) {
                outTo( _this, $.ButtonState.GROUP );
            } else {
                inTo( _this, $.ButtonState.HOVER );
            }
        },

        clickHandler: function( event ) {
            if ( event.quick ) {
                /**
                 * Raised when a mouse button is pressed and released or touch is initiated and ended in the Button element within the time and distance threshold.
                 *
                 * @event click
                 * @memberof OpenSeadragon.Button
                 * @type {object}
                 * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                 * @property {Object} originalEvent - The original DOM event.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent("click", { originalEvent: event.originalEvent });
            }
        },

        keyHandler: function( event ){
            //console.log( "%s : handling key %s!", _this.tooltip, event.keyCode);
            if( 13 === event.keyCode ){
                /***
                 * Raised when a mouse button is pressed and released or touch is initiated and ended in the Button element within the time and distance threshold.
                 *
                 * @event click
                 * @memberof OpenSeadragon.Button
                 * @type {object}
                 * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                 * @property {Object} originalEvent - The original DOM event.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent( "click", { originalEvent: event.originalEvent } );
                /***
                 * Raised when the mouse button is released or touch ends in the Button element.
                 *
                 * @event release
                 * @memberof OpenSeadragon.Button
                 * @type {object}
                 * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                 * @property {Object} originalEvent - The original DOM event.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent( "release", { originalEvent: event.originalEvent } );

                event.preventDefault = true;
            } else{
                event.preventDefault = false;
            }
        }

    });

    outTo( this, $.ButtonState.REST );
};

$.extend( $.Button.prototype, $.EventSource.prototype, /** @lends OpenSeadragon.Button.prototype */{

    /**
     * Used by a button container element (e.g. a ButtonGroup) to transition the button state
     * to ButtonState.GROUP.
     * @function
     */
    notifyGroupEnter: function() {
        inTo( this, $.ButtonState.GROUP );
    },

    /**
     * Used by a button container element (e.g. a ButtonGroup) to transition the button state
     * to ButtonState.REST.
     * @function
     */
    notifyGroupExit: function() {
        outTo( this, $.ButtonState.REST );
    },

    /**
     * @function
     */
    disable: function(){
        this.notifyGroupExit();
        this.element.disabled = true;
        this.tracker.setTracking(false);
        $.setElementOpacity( this.element, 0.2, true );
    },

    /**
     * @function
     */
    enable: function(){
        this.element.disabled = false;
        this.tracker.setTracking(true);
        $.setElementOpacity( this.element, 1.0, true );
        this.notifyGroupEnter();
    },

    destroy: function() {
        if (this.imgRest) {
            this.element.removeChild(this.imgRest);
            this.imgRest = null;
        }
        if (this.imgGroup) {
            this.element.removeChild(this.imgGroup);
            this.imgGroup = null;
        }
        if (this.imgHover) {
            this.element.removeChild(this.imgHover);
            this.imgHover = null;
        }
        if (this.imgDown) {
            this.element.removeChild(this.imgDown);
            this.imgDown = null;
        }
        this.removeAllHandlers();
        this.tracker.destroy();
        this.element = null;
    }

});


function scheduleFade( button ) {
    $.requestAnimationFrame(function(){
        updateFade( button );
    });
}

function updateFade( button ) {
    var currentTime,
        deltaTime,
        opacity;

    if ( button.shouldFade ) {
        currentTime = $.now();
        deltaTime   = currentTime - button.fadeBeginTime;
        opacity     = 1.0 - deltaTime / button.fadeLength;
        opacity     = Math.min( 1.0, opacity );
        opacity     = Math.max( 0.0, opacity );

        if( button.imgGroup ){
            $.setElementOpacity( button.imgGroup, opacity, true );
        }
        if ( opacity > 0 ) {
            // fade again
            scheduleFade( button );
        }
    }
}

function beginFading( button ) {
    button.shouldFade = true;
    button.fadeBeginTime = $.now() + button.fadeDelay;
    window.setTimeout( function(){
        scheduleFade( button );
    }, button.fadeDelay );
}

function stopFading( button ) {
    button.shouldFade = false;
    if( button.imgGroup ){
        $.setElementOpacity( button.imgGroup, 1.0, true );
    }
}

function inTo( button, newState ) {

    if( button.element.disabled ){
        return;
    }

    if ( newState >= $.ButtonState.GROUP &&
         button.currentState === $.ButtonState.REST ) {
        stopFading( button );
        button.currentState = $.ButtonState.GROUP;
    }

    if ( newState >= $.ButtonState.HOVER &&
         button.currentState === $.ButtonState.GROUP ) {
        if( button.imgHover ){
            button.imgHover.style.visibility = "";
        }
        button.currentState = $.ButtonState.HOVER;
    }

    if ( newState >= $.ButtonState.DOWN &&
         button.currentState === $.ButtonState.HOVER ) {
        if( button.imgDown ){
            button.imgDown.style.visibility = "";
        }
        button.currentState = $.ButtonState.DOWN;
    }
}


function outTo( button, newState ) {

    if( button.element.disabled ){
        return;
    }

    if ( newState <= $.ButtonState.HOVER &&
         button.currentState === $.ButtonState.DOWN ) {
        if( button.imgDown ){
            button.imgDown.style.visibility = "hidden";
        }
        button.currentState = $.ButtonState.HOVER;
    }

    if ( newState <= $.ButtonState.GROUP &&
         button.currentState === $.ButtonState.HOVER ) {
        if( button.imgHover ){
            button.imgHover.style.visibility = "hidden";
        }
        button.currentState = $.ButtonState.GROUP;
    }

    if ( newState <= $.ButtonState.REST &&
         button.currentState === $.ButtonState.GROUP ) {
        beginFading( button );
        button.currentState = $.ButtonState.REST;
    }
}



}( OpenSeadragon ));

/*
 * OpenSeadragon - ButtonGroup
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){
/**
 * @class ButtonGroup
 * @classdesc Manages events on groups of buttons.
 *
 * @memberof OpenSeadragon
 * @param {Object} options - A dictionary of settings applied against the entire group of buttons.
 * @param {Array} options.buttons Array of buttons
 * @param {Element} [options.element] Element to use as the container
 **/
$.ButtonGroup = function( options ) {

    $.extend( true, this, {
        /**
         * An array containing the buttons themselves.
         * @member {Array} buttons
         * @memberof OpenSeadragon.ButtonGroup#
         */
        buttons:            [],
        clickTimeThreshold: $.DEFAULT_SETTINGS.clickTimeThreshold,
        clickDistThreshold: $.DEFAULT_SETTINGS.clickDistThreshold,
        labelText:          ""
    }, options );

    // copy the button elements  TODO: Why?
    var buttons = this.buttons.concat([]),
        _this = this,
        i;

    /**
     * The shared container for the buttons.
     * @member {Element} element
     * @memberof OpenSeadragon.ButtonGroup#
     */
    this.element = options.element || $.makeNeutralElement( "div" );

    // TODO What if there IS an options.group specified?
    if( !options.group ){
        this.element.style.display = "inline-block";
        //this.label   = $.makeNeutralElement( "label" );
        //TODO: support labels for ButtonGroups
        //this.label.innerHTML = this.labelText;
        //this.element.appendChild( this.label );
        for ( i = 0; i < buttons.length; i++ ) {
            this.element.appendChild( buttons[ i ].element );
        }
    }

    $.setElementTouchActionNone( this.element );

    /**
     * Tracks mouse/touch/key events across the group of buttons.
     * @member {OpenSeadragon.MouseTracker} tracker
     * @memberof OpenSeadragon.ButtonGroup#
     */
    this.tracker = new $.MouseTracker({
        userData:           'ButtonGroup.tracker',
        element:            this.element,
        clickTimeThreshold: this.clickTimeThreshold,
        clickDistThreshold: this.clickDistThreshold,
        enterHandler: function ( event ) {
            var i;
            for ( i = 0; i < _this.buttons.length; i++ ) {
                _this.buttons[ i ].notifyGroupEnter();
            }
        },
        leaveHandler: function ( event ) {
            var i;
            if ( !event.insideElementPressed ) {
                for ( i = 0; i < _this.buttons.length; i++ ) {
                    _this.buttons[ i ].notifyGroupExit();
                }
            }
        },
    });
};

/** @lends OpenSeadragon.ButtonGroup.prototype */
$.ButtonGroup.prototype = {

    /**
     * TODO: Figure out why this is used on the public API and if a more useful
     * api can be created.
     * @function
     * @private
     */
    emulateEnter: function() {
        this.tracker.enterHandler( { eventSource: this.tracker } );
    },

    /**
     * TODO: Figure out why this is used on the public API and if a more useful
     * api can be created.
     * @function
     * @private
     */
    emulateLeave: function() {
        this.tracker.leaveHandler( { eventSource: this.tracker } );
    },

    destroy: function() {
        while (this.buttons.length) {
            var button = this.buttons.pop();
            this.element.removeChild(button.element);
            button.destroy();
        }
        this.tracker.destroy();
        this.element = null;
    }
};


}( OpenSeadragon ));

/*
 * OpenSeadragon - Rect
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function($) {

/**
 * @class Rect
 * @classdesc A Rectangle is described by it top left coordinates (x, y), width,
 * height and degrees of rotation around (x, y).
 * Note that the coordinate system used is the one commonly used with images:
 * x increases when going to the right
 * y increases when going to the bottom
 * degrees increases clockwise with 0 being the horizontal
 *
 * The constructor normalizes the rectangle to always have 0 <= degrees < 90
 *
 * @memberof OpenSeadragon
 * @param {Number} [x=0] The vector component 'x'.
 * @param {Number} [y=0] The vector component 'y'.
 * @param {Number} [width=0] The vector component 'width'.
 * @param {Number} [height=0] The vector component 'height'.
 * @param {Number} [degrees=0] Rotation of the rectangle around (x,y) in degrees.
 */
$.Rect = function(x, y, width, height, degrees) {
    /**
     * The vector component 'x'.
     * @member {Number} x
     * @memberof OpenSeadragon.Rect#
     */
    this.x = typeof (x) === "number" ? x : 0;
    /**
     * The vector component 'y'.
     * @member {Number} y
     * @memberof OpenSeadragon.Rect#
     */
    this.y = typeof (y) === "number" ? y : 0;
    /**
     * The vector component 'width'.
     * @member {Number} width
     * @memberof OpenSeadragon.Rect#
     */
    this.width  = typeof (width) === "number" ? width : 0;
    /**
     * The vector component 'height'.
     * @member {Number} height
     * @memberof OpenSeadragon.Rect#
     */
    this.height = typeof (height) === "number" ? height : 0;

    /**
     * The rotation of the rectangle, in degrees.
     * @member {Number} degrees
     * @memberof OpenSeadragon.Rect#
     */
    this.degrees = typeof (degrees) === "number" ? degrees : 0;

    // Normalizes the rectangle.
    this.degrees = $.positiveModulo(this.degrees, 360);
    var newTopLeft, newWidth;
    if (this.degrees >= 270) {
        newTopLeft = this.getTopRight();
        this.x = newTopLeft.x;
        this.y = newTopLeft.y;
        newWidth = this.height;
        this.height = this.width;
        this.width = newWidth;
        this.degrees -= 270;
    } else if (this.degrees >= 180) {
        newTopLeft = this.getBottomRight();
        this.x = newTopLeft.x;
        this.y = newTopLeft.y;
        this.degrees -= 180;
    } else if (this.degrees >= 90) {
        newTopLeft = this.getBottomLeft();
        this.x = newTopLeft.x;
        this.y = newTopLeft.y;
        newWidth = this.height;
        this.height = this.width;
        this.width = newWidth;
        this.degrees -= 90;
    }
};

/**
 * Builds a rectangle having the 3 specified points as summits.
 * @static
 * @memberof OpenSeadragon.Rect
 * @param {OpenSeadragon.Point} topLeft
 * @param {OpenSeadragon.Point} topRight
 * @param {OpenSeadragon.Point} bottomLeft
 * @returns {OpenSeadragon.Rect}
 */
$.Rect.fromSummits = function(topLeft, topRight, bottomLeft) {
    var width = topLeft.distanceTo(topRight);
    var height = topLeft.distanceTo(bottomLeft);
    var diff = topRight.minus(topLeft);
    var radians = Math.atan(diff.y / diff.x);
    if (diff.x < 0) {
        radians += Math.PI;
    } else if (diff.y < 0) {
        radians += 2 * Math.PI;
    }
    return new $.Rect(
        topLeft.x,
        topLeft.y,
        width,
        height,
        radians / Math.PI * 180);
};

/** @lends OpenSeadragon.Rect.prototype */
$.Rect.prototype = {
    /**
     * @function
     * @returns {OpenSeadragon.Rect} a duplicate of this Rect
     */
    clone: function() {
        return new $.Rect(
            this.x,
            this.y,
            this.width,
            this.height,
            this.degrees);
    },

    /**
     * The aspect ratio is simply the ratio of width to height.
     * @function
     * @returns {Number} The ratio of width to height.
     */
    getAspectRatio: function() {
        return this.width / this.height;
    },

    /**
     * Provides the coordinates of the upper-left corner of the rectangle as a
     * point.
     * @function
     * @returns {OpenSeadragon.Point} The coordinate of the upper-left corner of
     *  the rectangle.
     */
    getTopLeft: function() {
        return new $.Point(
            this.x,
            this.y
        );
    },

    /**
     * Provides the coordinates of the bottom-right corner of the rectangle as a
     * point.
     * @function
     * @returns {OpenSeadragon.Point} The coordinate of the bottom-right corner of
     *  the rectangle.
     */
    getBottomRight: function() {
        return new $.Point(this.x + this.width, this.y + this.height)
            .rotate(this.degrees, this.getTopLeft());
    },

    /**
     * Provides the coordinates of the top-right corner of the rectangle as a
     * point.
     * @function
     * @returns {OpenSeadragon.Point} The coordinate of the top-right corner of
     *  the rectangle.
     */
    getTopRight: function() {
        return new $.Point(this.x + this.width, this.y)
            .rotate(this.degrees, this.getTopLeft());
    },

    /**
     * Provides the coordinates of the bottom-left corner of the rectangle as a
     * point.
     * @function
     * @returns {OpenSeadragon.Point} The coordinate of the bottom-left corner of
     *  the rectangle.
     */
    getBottomLeft: function() {
        return new $.Point(this.x, this.y + this.height)
            .rotate(this.degrees, this.getTopLeft());
    },

    /**
     * Computes the center of the rectangle.
     * @function
     * @returns {OpenSeadragon.Point} The center of the rectangle as represented
     *  as represented by a 2-dimensional vector (x,y)
     */
    getCenter: function() {
        return new $.Point(
            this.x + this.width / 2.0,
            this.y + this.height / 2.0
        ).rotate(this.degrees, this.getTopLeft());
    },

    /**
     * Returns the width and height component as a vector OpenSeadragon.Point
     * @function
     * @returns {OpenSeadragon.Point} The 2 dimensional vector representing the
     *  width and height of the rectangle.
     */
    getSize: function() {
        return new $.Point(this.width, this.height);
    },

    /**
     * Determines if two Rectangles have equivalent components.
     * @function
     * @param {OpenSeadragon.Rect} rectangle The Rectangle to compare to.
     * @returns {Boolean} 'true' if all components are equal, otherwise 'false'.
     */
    equals: function(other) {
        return (other instanceof $.Rect) &&
            this.x === other.x &&
            this.y === other.y &&
            this.width === other.width &&
            this.height === other.height &&
            this.degrees === other.degrees;
    },

    /**
    * Multiply all dimensions (except degrees) in this Rect by a factor and
    * return a new Rect.
    * @function
    * @param {Number} factor The factor to multiply vector components.
    * @returns {OpenSeadragon.Rect} A new rect representing the multiplication
    *  of the vector components by the factor
    */
    times: function(factor) {
        return new $.Rect(
            this.x * factor,
            this.y * factor,
            this.width * factor,
            this.height * factor,
            this.degrees);
    },

    /**
    * Translate/move this Rect by a vector and return new Rect.
    * @function
    * @param {OpenSeadragon.Point} delta The translation vector.
    * @returns {OpenSeadragon.Rect} A new rect with altered position
    */
    translate: function(delta) {
        return new $.Rect(
            this.x + delta.x,
            this.y + delta.y,
            this.width,
            this.height,
            this.degrees);
    },

    /**
     * Returns the smallest rectangle that will contain this and the given
     * rectangle bounding boxes.
     * @param {OpenSeadragon.Rect} rect
     * @returns {OpenSeadragon.Rect} The new rectangle.
     */
    union: function(rect) {
        var thisBoundingBox = this.getBoundingBox();
        var otherBoundingBox = rect.getBoundingBox();

        var left = Math.min(thisBoundingBox.x, otherBoundingBox.x);
        var top = Math.min(thisBoundingBox.y, otherBoundingBox.y);
        var right = Math.max(
            thisBoundingBox.x + thisBoundingBox.width,
            otherBoundingBox.x + otherBoundingBox.width);
        var bottom = Math.max(
            thisBoundingBox.y + thisBoundingBox.height,
            otherBoundingBox.y + otherBoundingBox.height);

        return new $.Rect(
            left,
            top,
            right - left,
            bottom - top);
    },

    /**
     * Returns the bounding box of the intersection of this rectangle with the
     * given rectangle.
     * @param {OpenSeadragon.Rect} rect
     * @returns {OpenSeadragon.Rect} the bounding box of the intersection
     * or null if the rectangles don't intersect.
     */
    intersection: function(rect) {
        // Simplified version of Weiler Atherton clipping algorithm
        // https://en.wikipedia.org/wiki/Weiler%E2%80%93Atherton_clipping_algorithm
        // Because we just want the bounding box of the intersection,
        // we can just compute the bounding box of:
        // 1. all the summits of this which are inside rect
        // 2. all the summits of rect which are inside this
        // 3. all the intersections of rect and this
        var EPSILON = 0.0000000001;

        var intersectionPoints = [];

        var thisTopLeft = this.getTopLeft();
        if (rect.containsPoint(thisTopLeft, EPSILON)) {
            intersectionPoints.push(thisTopLeft);
        }
        var thisTopRight = this.getTopRight();
        if (rect.containsPoint(thisTopRight, EPSILON)) {
            intersectionPoints.push(thisTopRight);
        }
        var thisBottomLeft = this.getBottomLeft();
        if (rect.containsPoint(thisBottomLeft, EPSILON)) {
            intersectionPoints.push(thisBottomLeft);
        }
        var thisBottomRight = this.getBottomRight();
        if (rect.containsPoint(thisBottomRight, EPSILON)) {
            intersectionPoints.push(thisBottomRight);
        }

        var rectTopLeft = rect.getTopLeft();
        if (this.containsPoint(rectTopLeft, EPSILON)) {
            intersectionPoints.push(rectTopLeft);
        }
        var rectTopRight = rect.getTopRight();
        if (this.containsPoint(rectTopRight, EPSILON)) {
            intersectionPoints.push(rectTopRight);
        }
        var rectBottomLeft = rect.getBottomLeft();
        if (this.containsPoint(rectBottomLeft, EPSILON)) {
            intersectionPoints.push(rectBottomLeft);
        }
        var rectBottomRight = rect.getBottomRight();
        if (this.containsPoint(rectBottomRight, EPSILON)) {
            intersectionPoints.push(rectBottomRight);
        }

        var thisSegments = this._getSegments();
        var rectSegments = rect._getSegments();
        for (var i = 0; i < thisSegments.length; i++) {
            var thisSegment = thisSegments[i];
            for (var j = 0; j < rectSegments.length; j++) {
                var rectSegment = rectSegments[j];
                var intersect = getIntersection(thisSegment[0], thisSegment[1],
                    rectSegment[0], rectSegment[1]);
                if (intersect) {
                    intersectionPoints.push(intersect);
                }
            }
        }

        // Get intersection point of segments [a,b] and [c,d]
        function getIntersection(a, b, c, d) {
            // http://stackoverflow.com/a/1968345/1440403
            var abVector = b.minus(a);
            var cdVector = d.minus(c);

            var denom = -cdVector.x * abVector.y + abVector.x * cdVector.y;
            if (denom === 0) {
                return null;
            }

            var s = (abVector.x * (a.y - c.y) - abVector.y * (a.x - c.x)) / denom;
            var t = (cdVector.x * (a.y - c.y) - cdVector.y * (a.x - c.x)) / denom;

            if (-EPSILON <= s && s <= 1 - EPSILON &&
                -EPSILON <= t && t <= 1 - EPSILON) {
                return new $.Point(a.x + t * abVector.x, a.y + t * abVector.y);
            }
            return null;
        }

        if (intersectionPoints.length === 0) {
            return null;
        }

        var minX = intersectionPoints[0].x;
        var maxX = intersectionPoints[0].x;
        var minY = intersectionPoints[0].y;
        var maxY = intersectionPoints[0].y;
        for (var k = 1; k < intersectionPoints.length; k++) {
            var point = intersectionPoints[k];
            if (point.x < minX) {
                minX = point.x;
            }
            if (point.x > maxX) {
                maxX = point.x;
            }
            if (point.y < minY) {
                minY = point.y;
            }
            if (point.y > maxY) {
                maxY = point.y;
            }
        }
        return new $.Rect(minX, minY, maxX - minX, maxY - minY);
    },

    // private
    _getSegments: function() {
        var topLeft = this.getTopLeft();
        var topRight = this.getTopRight();
        var bottomLeft = this.getBottomLeft();
        var bottomRight = this.getBottomRight();
        return [[topLeft, topRight],
            [topRight, bottomRight],
            [bottomRight, bottomLeft],
            [bottomLeft, topLeft]];
    },

    /**
     * Rotates a rectangle around a point.
     * @function
     * @param {Number} degrees The angle in degrees to rotate.
     * @param {OpenSeadragon.Point} [pivot] The point about which to rotate.
     * Defaults to the center of the rectangle.
     * @returns {OpenSeadragon.Rect}
     */
    rotate: function(degrees, pivot) {
        degrees = $.positiveModulo(degrees, 360);
        if (degrees === 0) {
            return this.clone();
        }

        pivot = pivot || this.getCenter();
        var newTopLeft = this.getTopLeft().rotate(degrees, pivot);
        var newTopRight = this.getTopRight().rotate(degrees, pivot);

        var diff = newTopRight.minus(newTopLeft);
        // Handle floating point error
        diff = diff.apply(function(x) {
            var EPSILON = 1e-15;
            return Math.abs(x) < EPSILON ? 0 : x;
        });
        var radians = Math.atan(diff.y / diff.x);
        if (diff.x < 0) {
            radians += Math.PI;
        } else if (diff.y < 0) {
            radians += 2 * Math.PI;
        }
        return new $.Rect(
            newTopLeft.x,
            newTopLeft.y,
            this.width,
            this.height,
            radians / Math.PI * 180);
    },

    /**
     * Retrieves the smallest horizontal (degrees=0) rectangle which contains
     * this rectangle.
     * @returns {OpenSeadragon.Rect}
     */
    getBoundingBox: function() {
        if (this.degrees === 0) {
            return this.clone();
        }
        var topLeft = this.getTopLeft();
        var topRight = this.getTopRight();
        var bottomLeft = this.getBottomLeft();
        var bottomRight = this.getBottomRight();
        var minX = Math.min(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
        var maxX = Math.max(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
        var minY = Math.min(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
        var maxY = Math.max(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
        return new $.Rect(
            minX,
            minY,
            maxX - minX,
            maxY - minY);
    },

    /**
     * Retrieves the smallest horizontal (degrees=0) rectangle which contains
     * this rectangle and has integers x, y, width and height
     * @returns {OpenSeadragon.Rect}
     */
    getIntegerBoundingBox: function() {
        var boundingBox = this.getBoundingBox();
        var x = Math.floor(boundingBox.x);
        var y = Math.floor(boundingBox.y);
        var width = Math.ceil(boundingBox.width + boundingBox.x - x);
        var height = Math.ceil(boundingBox.height + boundingBox.y - y);
        return new $.Rect(x, y, width, height);
    },

    /**
     * Determines whether a point is inside this rectangle (edge included).
     * @function
     * @param {OpenSeadragon.Point} point
     * @param {Number} [epsilon=0] the margin of error allowed
     * @returns {Boolean} true if the point is inside this rectangle, false
     * otherwise.
     */
    containsPoint: function(point, epsilon) {
        epsilon = epsilon || 0;

        // See http://stackoverflow.com/a/2752754/1440403 for explanation
        var topLeft = this.getTopLeft();
        var topRight = this.getTopRight();
        var bottomLeft = this.getBottomLeft();
        var topDiff = topRight.minus(topLeft);
        var leftDiff = bottomLeft.minus(topLeft);

        return ((point.x - topLeft.x) * topDiff.x +
            (point.y - topLeft.y) * topDiff.y >= -epsilon) &&

            ((point.x - topRight.x) * topDiff.x +
            (point.y - topRight.y) * topDiff.y <= epsilon) &&

            ((point.x - topLeft.x) * leftDiff.x +
            (point.y - topLeft.y) * leftDiff.y >= -epsilon) &&

            ((point.x - bottomLeft.x) * leftDiff.x +
            (point.y - bottomLeft.y) * leftDiff.y <= epsilon);
    },

    /**
     * Provides a string representation of the rectangle which is useful for
     * debugging.
     * @function
     * @returns {String} A string representation of the rectangle.
     */
    toString: function() {
        return "[" +
            (Math.round(this.x * 100) / 100) + ", " +
            (Math.round(this.y * 100) / 100) + ", " +
            (Math.round(this.width * 100) / 100) + "x" +
            (Math.round(this.height * 100) / 100) + ", " +
            (Math.round(this.degrees * 100) / 100) + "deg" +
            "]";
    }
};


}(OpenSeadragon));

/*
 * OpenSeadragon - ReferenceStrip
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ( $ ) {

// dictionary from id to private properties
var THIS = {};

/**
 *  The CollectionDrawer is a reimplementation if the Drawer API that
 *  focuses on allowing a viewport to be redefined as a collection
 *  of smaller viewports, defined by a clear number of rows and / or
 *  columns of which each item in the matrix of viewports has its own
 *  source.
 *
 *  This idea is a reexpression of the idea of dzi collections
 *  which allows a clearer algorithm to reuse the tile sources already
 *  supported by OpenSeadragon, in heterogenious or homogenious
 *  sequences just like mixed groups already supported by the viewer
 *  for the purpose of image sequnces.
 *
 *  TODO:   The difficult part of this feature is figuring out how to express
 *          this functionality as a combination of the functionality already
 *          provided by Drawer, Viewport, TileSource, and Navigator.  It may
 *          require better abstraction at those points in order to efficiently
 *          reuse those paradigms.
 */
/**
 * @class ReferenceStrip
 * @memberof OpenSeadragon
 * @param {Object} options
 */
$.ReferenceStrip = function ( options ) {

    var _this       = this,
        viewer      = options.viewer,
        viewerSize  = $.getElementSize( viewer.element ),
        element,
        style,
        i;

    //We may need to create a new element and id if they did not
    //provide the id for the existing element
    if ( !options.id ) {
        options.id              = 'referencestrip-' + $.now();
        this.element            = $.makeNeutralElement( "div" );
        this.element.id         = options.id;
        this.element.className  = 'referencestrip';
    }

    options = $.extend( true, {
        sizeRatio:  $.DEFAULT_SETTINGS.referenceStripSizeRatio,
        position:   $.DEFAULT_SETTINGS.referenceStripPosition,
        scroll:     $.DEFAULT_SETTINGS.referenceStripScroll,
        clickTimeThreshold:  $.DEFAULT_SETTINGS.clickTimeThreshold
    }, options, {
        element:                this.element
    } );

    $.extend( this, options );
    //Private state properties
    THIS[this.id] = {
        animating:           false
    };

    this.minPixelRatio = this.viewer.minPixelRatio;

    this.element.tabIndex = 0;

    style = this.element.style;
    style.marginTop     = '0px';
    style.marginRight   = '0px';
    style.marginBottom  = '0px';
    style.marginLeft    = '0px';
    style.left          = '0px';
    style.bottom        = '0px';
    style.border        = '0px';
    style.background    = '#000';
    style.position      = 'relative';

    $.setElementTouchActionNone( this.element );

    $.setElementOpacity( this.element, 0.8 );

    this.viewer = viewer;
    this.tracker = new $.MouseTracker( {
        userData:       'ReferenceStrip.tracker',
        element:        this.element,
        clickHandler:   $.delegate( this, onStripClick ),
        dragHandler:    $.delegate( this, onStripDrag ),
        scrollHandler:  $.delegate( this, onStripScroll ),
        enterHandler:   $.delegate( this, onStripEnter ),
        leaveHandler:   $.delegate( this, onStripLeave ),
        keyDownHandler: $.delegate( this, onKeyDown ),
        keyHandler:     $.delegate( this, onKeyPress ),
        preProcessEventHandler: function (eventInfo) {
            if (eventInfo.eventType === 'wheel') {
                eventInfo.preventDefault = true;
            }
        }
    } );

    //Controls the position and orientation of the reference strip and sets the
    //appropriate width and height
    if ( options.width && options.height ) {
        this.element.style.width  = options.width + 'px';
        this.element.style.height = options.height + 'px';
        viewer.addControl(
            this.element,
            { anchor: $.ControlAnchor.BOTTOM_LEFT }
        );
    } else {
        if ( "horizontal" === options.scroll ) {
            this.element.style.width = (
                viewerSize.x *
                options.sizeRatio *
                viewer.tileSources.length
            ) + ( 12 * viewer.tileSources.length ) + 'px';

            this.element.style.height = (
                viewerSize.y *
                options.sizeRatio
            ) + 'px';

            viewer.addControl(
                this.element,
                { anchor: $.ControlAnchor.BOTTOM_LEFT }
            );
        } else {
            this.element.style.height = (
                viewerSize.y *
                options.sizeRatio *
                viewer.tileSources.length
            ) + ( 12 * viewer.tileSources.length ) + 'px';

            this.element.style.width = (
                viewerSize.x *
                options.sizeRatio
            ) + 'px';

            viewer.addControl(
                this.element,
                { anchor: $.ControlAnchor.TOP_LEFT }
            );

        }
    }

    this.panelWidth = ( viewerSize.x * this.sizeRatio ) + 8;
    this.panelHeight = ( viewerSize.y * this.sizeRatio ) + 8;
    this.panels = [];
    this.miniViewers = {};

    /*jshint loopfunc:true*/
    for ( i = 0; i < viewer.tileSources.length; i++ ) {

        element = $.makeNeutralElement( 'div' );
        element.id = this.element.id + "-" + i;

        element.style.width         = _this.panelWidth + 'px';
        element.style.height        = _this.panelHeight + 'px';
        element.style.display       = 'inline';
        element.style['float']      = 'left'; //Webkit
        element.style.cssFloat      = 'left'; //Firefox
        element.style.styleFloat    = 'left'; //IE
        element.style.padding       = '2px';
        $.setElementTouchActionNone( element );
        $.setElementPointerEventsNone( element );

        this.element.appendChild( element );

        element.activePanel = false;

        this.panels.push( element );

    }
    loadPanels( this, this.scroll === 'vertical' ? viewerSize.y : viewerSize.x, 0 );
    this.setFocus( 0 );

};

/** @lends OpenSeadragon.ReferenceStrip.prototype */
$.ReferenceStrip.prototype = {

    /**
     * @function
     */
    setFocus: function ( page ) {
        var element      = this.element.querySelector('#' + this.element.id + '-' + page ),
            viewerSize   = $.getElementSize( this.viewer.canvas ),
            scrollWidth  = Number( this.element.style.width.replace( 'px', '' ) ),
            scrollHeight = Number( this.element.style.height.replace( 'px', '' ) ),
            offsetLeft   = -Number( this.element.style.marginLeft.replace( 'px', '' ) ),
            offsetTop    = -Number( this.element.style.marginTop.replace( 'px', '' ) ),
            offset;

        if ( this.currentSelected !== element ) {
            if ( this.currentSelected ) {
                this.currentSelected.style.background = '#000';
            }
            this.currentSelected = element;
            this.currentSelected.style.background = '#999';

            if ( 'horizontal' === this.scroll ) {
                //right left
                offset = ( Number( page ) ) * ( this.panelWidth + 3 );
                if ( offset > offsetLeft + viewerSize.x - this.panelWidth ) {
                    offset = Math.min( offset, ( scrollWidth - viewerSize.x ) );
                    this.element.style.marginLeft = -offset + 'px';
                    loadPanels( this, viewerSize.x, -offset );
                } else if ( offset < offsetLeft ) {
                    offset = Math.max( 0, offset - viewerSize.x / 2 );
                    this.element.style.marginLeft = -offset + 'px';
                    loadPanels( this, viewerSize.x, -offset );
                }
            } else {
                offset = ( Number( page ) ) * ( this.panelHeight + 3 );
                if ( offset > offsetTop + viewerSize.y - this.panelHeight ) {
                    offset = Math.min( offset, ( scrollHeight - viewerSize.y ) );
                    this.element.style.marginTop = -offset + 'px';
                    loadPanels( this, viewerSize.y, -offset );
                } else if ( offset < offsetTop ) {
                    offset = Math.max( 0, offset - viewerSize.y / 2 );
                    this.element.style.marginTop = -offset + 'px';
                    loadPanels( this, viewerSize.y, -offset );
                }
            }

            this.currentPage = page;
            onStripEnter.call( this, { eventSource: this.tracker } );
        }
    },

    /**
     * @function
     */
    update: function () {
        if ( THIS[this.id].animating ) {
            // $.console.log( 'image reference strip update' );
            return true;
        }
        return false;
    },

    destroy: function() {
        if (this.miniViewers) {
          for (var key in this.miniViewers) {
            this.miniViewers[key].destroy();
          }
        }

        this.tracker.destroy();

        if (this.element) {
            this.viewer.removeControl( this.element );
        }
    }

};


/**
 * @private
 * @inner
 * @function
 */
function onStripClick( event ) {
    if ( event.quick ) {
        var page;

        if ( 'horizontal' === this.scroll ) {
            page = Math.floor(event.position.x / this.panelWidth);
        } else {
            page = Math.floor(event.position.y / this.panelHeight);
        }

        this.viewer.goToPage( page );
    }

    this.element.focus();
}


/**
 * @private
 * @inner
 * @function
 */
function onStripDrag( event ) {

    this.dragging = true;
    if ( this.element ) {
        var offsetLeft   = Number( this.element.style.marginLeft.replace( 'px', '' ) ),
        offsetTop    = Number( this.element.style.marginTop.replace( 'px', '' ) ),
        scrollWidth  = Number( this.element.style.width.replace( 'px', '' ) ),
        scrollHeight = Number( this.element.style.height.replace( 'px', '' ) ),
        viewerSize   = $.getElementSize( this.viewer.canvas );

        if ( 'horizontal' === this.scroll ) {
            if ( -event.delta.x > 0 ) {
                //forward
                if ( offsetLeft > -( scrollWidth - viewerSize.x ) ) {
                    this.element.style.marginLeft = ( offsetLeft + ( event.delta.x * 2 ) ) + 'px';
                    loadPanels( this, viewerSize.x, offsetLeft + ( event.delta.x * 2 ) );
                }
            } else if ( -event.delta.x < 0 ) {
                //reverse
                if ( offsetLeft < 0 ) {
                    this.element.style.marginLeft = ( offsetLeft + ( event.delta.x * 2 ) ) + 'px';
                    loadPanels( this, viewerSize.x, offsetLeft + ( event.delta.x * 2 ) );
                }
            }
        } else {
            if ( -event.delta.y > 0 ) {
                //forward
                if ( offsetTop > -( scrollHeight - viewerSize.y ) ) {
                    this.element.style.marginTop = ( offsetTop + ( event.delta.y * 2 ) ) + 'px';
                    loadPanels( this, viewerSize.y, offsetTop + ( event.delta.y * 2 ) );
                }
            } else if ( -event.delta.y < 0 ) {
                //reverse
                if ( offsetTop < 0 ) {
                    this.element.style.marginTop = ( offsetTop + ( event.delta.y * 2 ) ) + 'px';
                    loadPanels( this, viewerSize.y, offsetTop + ( event.delta.y * 2 ) );
                }
            }
        }
    }

}



/**
 * @private
 * @inner
 * @function
 */
function onStripScroll( event ) {
    if ( this.element ) {
        var offsetLeft   = Number( this.element.style.marginLeft.replace( 'px', '' ) ),
        offsetTop    = Number( this.element.style.marginTop.replace( 'px', '' ) ),
        scrollWidth  = Number( this.element.style.width.replace( 'px', '' ) ),
        scrollHeight = Number( this.element.style.height.replace( 'px', '' ) ),
        viewerSize   = $.getElementSize( this.viewer.canvas );

        if ( 'horizontal' === this.scroll ) {
            if ( event.scroll > 0 ) {
                //forward
                if ( offsetLeft > -( scrollWidth - viewerSize.x ) ) {
                    this.element.style.marginLeft = ( offsetLeft - ( event.scroll * 60 ) ) + 'px';
                    loadPanels( this, viewerSize.x, offsetLeft - ( event.scroll * 60 ) );
                }
            } else if ( event.scroll < 0 ) {
                //reverse
                if ( offsetLeft < 0 ) {
                    this.element.style.marginLeft = ( offsetLeft - ( event.scroll * 60 ) ) + 'px';
                    loadPanels( this, viewerSize.x, offsetLeft - ( event.scroll * 60 ) );
                }
            }
        } else {
            if ( event.scroll < 0 ) {
                //scroll up
                if ( offsetTop > viewerSize.y - scrollHeight ) {
                    this.element.style.marginTop = ( offsetTop + ( event.scroll * 60 ) ) + 'px';
                    loadPanels( this, viewerSize.y, offsetTop + ( event.scroll * 60 ) );
                }
            } else if ( event.scroll > 0 ) {
                //scroll dowm
                if ( offsetTop < 0 ) {
                    this.element.style.marginTop = ( offsetTop + ( event.scroll * 60 ) ) + 'px';
                    loadPanels( this, viewerSize.y, offsetTop + ( event.scroll * 60 ) );
                }
            }
        }

        event.preventDefault = true;
    }
}


function loadPanels( strip, viewerSize, scroll ) {
    var panelSize,
        activePanelsStart,
        activePanelsEnd,
        miniViewer,
        i,
        element;
    if ( 'horizontal' === strip.scroll ) {
        panelSize = strip.panelWidth;
    } else {
        panelSize = strip.panelHeight;
    }
    activePanelsStart = Math.ceil( viewerSize / panelSize ) + 5;
    activePanelsEnd = Math.ceil( ( Math.abs( scroll ) + viewerSize ) / panelSize ) + 1;
    activePanelsStart = activePanelsEnd - activePanelsStart;
    activePanelsStart = activePanelsStart < 0 ? 0 : activePanelsStart;

    for ( i = activePanelsStart; i < activePanelsEnd && i < strip.panels.length; i++ ) {
        element = strip.panels[i];
        if ( !element.activePanel ) {
            var miniTileSource;
            var originalTileSource = strip.viewer.tileSources[i];
            if (originalTileSource.referenceStripThumbnailUrl) {
                miniTileSource = {
                    type: 'image',
                    url: originalTileSource.referenceStripThumbnailUrl
                };
            } else {
                miniTileSource = originalTileSource;
            }
            miniViewer = new $.Viewer( {
                id:                     element.id,
                tileSources:            [miniTileSource],
                element:                element,
                navigatorSizeRatio:     strip.sizeRatio,
                showNavigator:          false,
                mouseNavEnabled:        false,
                showNavigationControl:  false,
                showSequenceControl:    false,
                immediateRender:        true,
                blendTime:              0,
                animationTime:          0,
                loadTilesWithAjax:      strip.viewer.loadTilesWithAjax,
                ajaxHeaders:            strip.viewer.ajaxHeaders,
                useCanvas:              strip.useCanvas
            } );
            // Allow pointer events to pass through miniViewer's canvas/container
            //   elements so implicit pointer capture works on touch devices
            $.setElementPointerEventsNone( miniViewer.canvas );
            $.setElementPointerEventsNone( miniViewer.container );
            // We'll use event delegation from the reference strip element instead of
            //   handling events on every miniViewer
            miniViewer.innerTracker.setTracking( false );
            miniViewer.outerTracker.setTracking( false );

            strip.miniViewers[element.id] = miniViewer;

            element.activePanel = true;
        }
    }
}


/**
 * @private
 * @inner
 * @function
 */
function onStripEnter( event ) {
    var element = event.eventSource.element;

    //$.setElementOpacity(element, 0.8);

    //element.style.border = '1px solid #555';
    //element.style.background = '#000';

    if ( 'horizontal' === this.scroll ) {

        //element.style.paddingTop = "0px";
        element.style.marginBottom = "0px";

    } else {

        //element.style.paddingRight = "0px";
        element.style.marginLeft = "0px";

    }
}


/**
 * @private
 * @inner
 * @function
 */
function onStripLeave( event ) {
    var element = event.eventSource.element;

    if ( 'horizontal' === this.scroll ) {

        //element.style.paddingTop = "10px";
        element.style.marginBottom = "-" + ( $.getElementSize( element ).y / 2 ) + "px";

    } else {

        //element.style.paddingRight = "10px";
        element.style.marginLeft = "-" + ( $.getElementSize( element ).x / 2 ) + "px";

    }
}


/**
 * @private
 * @inner
 * @function
 */
function onKeyDown( event ) {
    //console.log( event.keyCode );

    if ( !event.ctrl && !event.alt && !event.meta ) {
        switch ( event.keyCode ) {
            case 38: //up arrow
                onStripScroll.call( this, { eventSource: this.tracker, position: null, scroll: 1, shift: null } );
                event.preventDefault = true;
                break;
            case 40: //down arrow
                onStripScroll.call( this, { eventSource: this.tracker, position: null, scroll: -1, shift: null } );
                event.preventDefault = true;
                break;
            case 37: //left arrow
                onStripScroll.call( this, { eventSource: this.tracker, position: null, scroll: -1, shift: null } );
                event.preventDefault = true;
                break;
            case 39: //right arrow
                onStripScroll.call( this, { eventSource: this.tracker, position: null, scroll: 1, shift: null } );
                event.preventDefault = true;
                break;
            default:
                //console.log( 'navigator keycode %s', event.keyCode );
                event.preventDefault = false;
                break;
        }
    } else {
        event.preventDefault = false;
    }
}


/**
 * @private
 * @inner
 * @function
 */
function onKeyPress( event ) {
    //console.log( event.keyCode );

    if ( !event.ctrl && !event.alt && !event.meta ) {
        switch ( event.keyCode ) {
            case 61: //=|+
                onStripScroll.call( this, { eventSource: this.tracker, position: null, scroll: 1, shift: null } );
                event.preventDefault = true;
                break;
            case 45: //-|_
                onStripScroll.call( this, { eventSource: this.tracker, position: null, scroll: -1, shift: null } );
                event.preventDefault = true;
                break;
            case 48: //0|)
            case 119: //w
            case 87: //W
                onStripScroll.call( this, { eventSource: this.tracker, position: null, scroll: 1, shift: null } );
                event.preventDefault = true;
                break;
            case 115: //s
            case 83: //S
                onStripScroll.call( this, { eventSource: this.tracker, position: null, scroll: -1, shift: null } );
                event.preventDefault = true;
                break;
            case 97: //a
                onStripScroll.call( this, { eventSource: this.tracker, position: null, scroll: -1, shift: null } );
                event.preventDefault = true;
                break;
            case 100: //d
                onStripScroll.call( this, { eventSource: this.tracker, position: null, scroll: 1, shift: null } );
                event.preventDefault = true;
                break;
            default:
                //console.log( 'navigator keycode %s', event.keyCode );
                event.preventDefault = false;
                break;
        }
    } else {
        event.preventDefault = false;
    }
}

}(OpenSeadragon));

/*
 * OpenSeadragon - DisplayRect
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class DisplayRect
 * @classdesc A display rectangle is very similar to {@link OpenSeadragon.Rect} but adds two
 * fields, 'minLevel' and 'maxLevel' which denote the supported zoom levels
 * for this rectangle.
 *
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.Rect
 * @param {Number} x The vector component 'x'.
 * @param {Number} y The vector component 'y'.
 * @param {Number} width The vector component 'height'.
 * @param {Number} height The vector component 'width'.
 * @param {Number} minLevel The lowest zoom level supported.
 * @param {Number} maxLevel The highest zoom level supported.
 */
$.DisplayRect = function( x, y, width, height, minLevel, maxLevel ) {
    $.Rect.apply( this, [ x, y, width, height ] );

    /**
     * The lowest zoom level supported.
     * @member {Number} minLevel
     * @memberof OpenSeadragon.DisplayRect#
     */
    this.minLevel = minLevel;
    /**
     * The highest zoom level supported.
     * @member {Number} maxLevel
     * @memberof OpenSeadragon.DisplayRect#
     */
    this.maxLevel = maxLevel;
};

$.extend( $.DisplayRect.prototype, $.Rect.prototype );

}( OpenSeadragon ));

/*
 * OpenSeadragon - Spring
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class Spring
 * @memberof OpenSeadragon
 * @param {Object} options - Spring configuration settings.
 * @param {Number} options.springStiffness - Spring stiffness. Must be greater than zero.
 * The closer to zero, the closer to linear animation.
 * @param {Number} options.animationTime - Animation duration per spring, in seconds.
 * Must be zero or greater.
 * @param {Number} [options.initial=0] - Initial value of spring.
 * @param {Boolean} [options.exponential=false] - Whether this spring represents
 * an exponential scale (such as zoom) and should be animated accordingly. Note that
 * exponential springs must have non-zero values.
 */
$.Spring = function( options ) {
    var args = arguments;

    if( typeof ( options ) !== 'object' ){
        //allows backward compatible use of ( initialValue, config ) as
        //constructor parameters
        options = {
            initial: args.length && typeof ( args[ 0 ] ) === "number" ?
                args[ 0 ] :
                undefined,
            /**
             * Spring stiffness.
             * @member {Number} springStiffness
             * @memberof OpenSeadragon.Spring#
             */
            springStiffness: args.length > 1 ?
                args[ 1 ].springStiffness :
                5.0,
            /**
             * Animation duration per spring.
             * @member {Number} animationTime
             * @memberof OpenSeadragon.Spring#
             */
            animationTime: args.length > 1 ?
                args[ 1 ].animationTime :
                1.5
        };
    }

    $.console.assert(typeof options.springStiffness === "number" && options.springStiffness !== 0,
        "[OpenSeadragon.Spring] options.springStiffness must be a non-zero number");

    $.console.assert(typeof options.animationTime === "number" && options.animationTime >= 0,
        "[OpenSeadragon.Spring] options.animationTime must be a number greater than or equal to 0");

    if (options.exponential) {
        this._exponential = true;
        delete options.exponential;
    }

    $.extend( true, this, options);

    /**
     * @member {Object} current
     * @memberof OpenSeadragon.Spring#
     * @property {Number} value
     * @property {Number} time
     */
    this.current = {
        value: typeof ( this.initial ) === "number" ?
            this.initial :
            (this._exponential ? 0 : 1),
        time:  $.now() // always work in milliseconds
    };

    $.console.assert(!this._exponential || this.current.value !== 0,
        "[OpenSeadragon.Spring] value must be non-zero for exponential springs");

    /**
     * @member {Object} start
     * @memberof OpenSeadragon.Spring#
     * @property {Number} value
     * @property {Number} time
     */
    this.start = {
        value: this.current.value,
        time:  this.current.time
    };

    /**
     * @member {Object} target
     * @memberof OpenSeadragon.Spring#
     * @property {Number} value
     * @property {Number} time
     */
    this.target = {
        value: this.current.value,
        time:  this.current.time
    };

    if (this._exponential) {
        this.start._logValue = Math.log(this.start.value);
        this.target._logValue = Math.log(this.target.value);
        this.current._logValue = Math.log(this.current.value);
    }
};

/** @lends OpenSeadragon.Spring.prototype */
$.Spring.prototype = {

    /**
     * @function
     * @param {Number} target
     */
    resetTo: function( target ) {
        $.console.assert(!this._exponential || target !== 0,
            "[OpenSeadragon.Spring.resetTo] target must be non-zero for exponential springs");

        this.start.value = this.target.value = this.current.value = target;
        this.start.time = this.target.time = this.current.time = $.now();

        if (this._exponential) {
            this.start._logValue = Math.log(this.start.value);
            this.target._logValue = Math.log(this.target.value);
            this.current._logValue = Math.log(this.current.value);
        }
    },

    /**
     * @function
     * @param {Number} target
     */
    springTo: function( target ) {
        $.console.assert(!this._exponential || target !== 0,
            "[OpenSeadragon.Spring.springTo] target must be non-zero for exponential springs");

        this.start.value  = this.current.value;
        this.start.time   = this.current.time;
        this.target.value = target;
        this.target.time  = this.start.time + 1000 * this.animationTime;

        if (this._exponential) {
            this.start._logValue = Math.log(this.start.value);
            this.target._logValue = Math.log(this.target.value);
        }
    },

    /**
     * @function
     * @param {Number} delta
     */
    shiftBy: function( delta ) {
        this.start.value  += delta;
        this.target.value += delta;

        if (this._exponential) {
            $.console.assert(this.target.value !== 0 && this.start.value !== 0,
                "[OpenSeadragon.Spring.shiftBy] spring value must be non-zero for exponential springs");

            this.start._logValue = Math.log(this.start.value);
            this.target._logValue = Math.log(this.target.value);
        }
    },

    setExponential: function(value) {
        this._exponential = value;

        if (this._exponential) {
            $.console.assert(this.current.value !== 0 && this.target.value !== 0 && this.start.value !== 0,
                "[OpenSeadragon.Spring.setExponential] spring value must be non-zero for exponential springs");

            this.start._logValue = Math.log(this.start.value);
            this.target._logValue = Math.log(this.target.value);
            this.current._logValue = Math.log(this.current.value);
        }
    },

    /**
     * @function
     * @returns true if the value got updated, false otherwise
     */
    update: function() {
        this.current.time  = $.now();

        var startValue, targetValue;
        if (this._exponential) {
            startValue = this.start._logValue;
            targetValue = this.target._logValue;
        } else {
            startValue = this.start.value;
            targetValue = this.target.value;
        }

        var currentValue = (this.current.time >= this.target.time) ?
            targetValue :
            startValue +
                ( targetValue - startValue ) *
                transform(
                    this.springStiffness,
                    ( this.current.time - this.start.time ) /
                    ( this.target.time - this.start.time )
                );

        var oldValue = this.current.value;
        if (this._exponential) {
            this.current.value = Math.exp(currentValue);
        } else {
            this.current.value = currentValue;
        }

        return oldValue !== this.current.value;
    },

    /**
     * Returns whether the spring is at the target value
     * @function
     * @returns {Boolean} True if at target value, false otherwise
     */
    isAtTargetValue: function() {
        return this.current.value === this.target.value;
    }
};

/**
 * @private
 */
function transform( stiffness, x ) {
    return ( 1.0 - Math.exp( stiffness * -x ) ) /
        ( 1.0 - Math.exp( -stiffness ) );
}

}( OpenSeadragon ));

/*
 * OpenSeadragon - ImageLoader
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors

 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function($){

/**
 * @class ImageJob
 * @classdesc Handles downloading of a single image.
 * @param {Object} options - Options for this ImageJob.
 * @param {String} [options.src] - URL of image to download.
 * @param {Tile} [options.tile] - Tile that belongs the data to.
 * @param {TileSource} [options.source] - Image loading strategy
 * @param {String} [options.loadWithAjax] - Whether to load this image with AJAX.
 * @param {String} [options.ajaxHeaders] - Headers to add to the image request if using AJAX.
 * @param {Boolean} [options.ajaxWithCredentials] - Whether to set withCredentials on AJAX requests.
 * @param {String} [options.crossOriginPolicy] - CORS policy to use for downloads
 * @param {String} [options.postData] - HTTP POST data (usually but not necessarily in k=v&k2=v2... form,
 *      see TileSource::getPostData) or null
 * @param {Function} [options.callback] - Called once image has been downloaded.
 * @param {Function} [options.abort] - Called when this image job is aborted.
 * @param {Number} [options.timeout] - The max number of milliseconds that this image job may take to complete.
 */
$.ImageJob = function(options) {

    $.extend(true, this, {
        timeout: $.DEFAULT_SETTINGS.timeout,
        jobId: null
    }, options);

    /**
     * Data object which will contain downloaded image data.
     * @member {Image|*} image data object, by default an Image object (depends on TileSource)
     * @memberof OpenSeadragon.ImageJob#
     */
    this.data = null;

    /**
     * User workspace to populate with helper variables
     * @member {*} userData to append custom data and avoid namespace collision
     * @memberof OpenSeadragon.ImageJob#
     */
    this.userData = {};

    /**
     * Error message holder
     * @member {string} error message
     * @memberof OpenSeadragon.ImageJob#
     * @private
     */
    this.errorMsg = null;
};

$.ImageJob.prototype = {
    /**
     * Starts the image job.
     * @method
     */
    start: function() {
        var self = this;
        var selfAbort = this.abort;

        this.jobId = window.setTimeout(function () {
            self.finish(null, null, "Image load exceeded timeout (" + self.timeout + " ms)");
        }, this.timeout);

        this.abort = function() {
            self.source.downloadTileAbort(self);
            if (typeof selfAbort === "function") {
                selfAbort();
            }
        };

        this.source.downloadTileStart(this);
    },

    /**
     * Finish this job.
     * @param {*} data data that has been downloaded
     * @param {XMLHttpRequest} request reference to the request if used
     * @param {string} errorMessage description upon failure
     */
    finish: function(data, request, errorMessage ) {
        this.data = data;
        this.request = request;
        this.errorMsg = errorMessage;

        if (this.jobId) {
            window.clearTimeout(this.jobId);
        }

        this.callback(this);
    }
};

/**
 * @class ImageLoader
 * @memberof OpenSeadragon
 * @classdesc Handles downloading of a set of images using asynchronous queue pattern.
 * You generally won't have to interact with the ImageLoader directly.
 * @param {Object} options - Options for this ImageLoader.
 * @param {Number} [options.jobLimit] - The number of concurrent image requests. See imageLoaderLimit in {@link OpenSeadragon.Options} for details.
 * @param {Number} [options.timeout] - The max number of milliseconds that an image job may take to complete.
 */
$.ImageLoader = function(options) {

    $.extend(true, this, {
        jobLimit:       $.DEFAULT_SETTINGS.imageLoaderLimit,
        timeout:        $.DEFAULT_SETTINGS.timeout,
        jobQueue:       [],
        jobsInProgress: 0
    }, options);

};

/** @lends OpenSeadragon.ImageLoader.prototype */
$.ImageLoader.prototype = {

    /**
     * Add an unloaded image to the loader queue.
     * @method
     * @param {Object} options - Options for this job.
     * @param {String} [options.src] - URL of image to download.
     * @param {Tile} [options.tile] - Tile that belongs the data to. The tile instance
     *      is not internally used and serves for custom TileSources implementations.
     * @param {TileSource} [options.source] - Image loading strategy
     * @param {String} [options.loadWithAjax] - Whether to load this image with AJAX.
     * @param {String} [options.ajaxHeaders] - Headers to add to the image request if using AJAX.
     * @param {String|Boolean} [options.crossOriginPolicy] - CORS policy to use for downloads
     * @param {String} [options.postData] - POST parameters (usually but not necessarily in k=v&k2=v2... form,
     *      see TileSource::getPostData) or null
     * @param {Boolean} [options.ajaxWithCredentials] - Whether to set withCredentials on AJAX
     *      requests.
     * @param {Function} [options.callback] - Called once image has been downloaded.
     * @param {Function} [options.abort] - Called when this image job is aborted.
     */
    addJob: function(options) {
        if (!options.source) {
            $.console.error('ImageLoader.prototype.addJob() requires [options.source]. ' +
                'TileSource since new API defines how images are fetched. Creating a dummy TileSource.');
            var implementation = $.TileSource.prototype;
            options.source = {
                downloadTileStart: implementation.downloadTileStart,
                downloadTileAbort: implementation.downloadTileAbort
            };
        }

        var _this = this,
            complete = function(job) {
                completeJob(_this, job, options.callback);
            },
            jobOptions = {
                src: options.src,
                tile: options.tile || {},
                source: options.source,
                loadWithAjax: options.loadWithAjax,
                ajaxHeaders: options.loadWithAjax ? options.ajaxHeaders : null,
                crossOriginPolicy: options.crossOriginPolicy,
                ajaxWithCredentials: options.ajaxWithCredentials,
                postData: options.postData,
                callback: complete,
                abort: options.abort,
                timeout: this.timeout
            },
            newJob = new $.ImageJob(jobOptions);

        if ( !this.jobLimit || this.jobsInProgress < this.jobLimit ) {
            newJob.start();
            this.jobsInProgress++;
        }
        else {
            this.jobQueue.push( newJob );
        }
    },

    /**
     * Clear any unstarted image loading jobs from the queue.
     * @method
     */
    clear: function() {
        for( var i = 0; i < this.jobQueue.length; i++ ) {
            var job = this.jobQueue[i];
            if ( typeof job.abort === "function" ) {
                job.abort();
            }
        }

        this.jobQueue = [];
    }
};

/**
 * Cleans up ImageJob once completed.
 * @method
 * @private
 * @param loader - ImageLoader used to start job.
 * @param job - The ImageJob that has completed.
 * @param callback - Called once cleanup is finished.
 */
function completeJob(loader, job, callback) {
    var nextJob;

    loader.jobsInProgress--;

    if ((!loader.jobLimit || loader.jobsInProgress < loader.jobLimit) && loader.jobQueue.length > 0) {
        nextJob = loader.jobQueue.shift();
        nextJob.start();
        loader.jobsInProgress++;
    }

    callback(job.data, job.errorMsg, job.request);
}

}(OpenSeadragon));

/*
 * OpenSeadragon - Tile
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class Tile
 * @memberof OpenSeadragon
 * @param {Number} level The zoom level this tile belongs to.
 * @param {Number} x The vector component 'x'.
 * @param {Number} y The vector component 'y'.
 * @param {OpenSeadragon.Rect} bounds Where this tile fits, in normalized
 *      coordinates.
 * @param {Boolean} exists Is this tile a part of a sparse image? ( Also has
 *      this tile failed to load? )
 * @param {String|Function} url The URL of this tile's image or a function that returns a url.
 * @param {CanvasRenderingContext2D} context2D The context2D of this tile if it
 *      is provided directly by the tile source.
 * @param {Boolean} loadWithAjax Whether this tile image should be loaded with an AJAX request .
 * @param {Object} ajaxHeaders The headers to send with this tile's AJAX request (if applicable).
 * @param {OpenSeadragon.Rect} sourceBounds The portion of the tile to use as the source of the
 *      drawing operation, in pixels. Note that this only works when drawing with canvas; when drawing
 *      with HTML the entire tile is always used.
 * @param {String} postData HTTP POST data (usually but not necessarily in k=v&k2=v2... form,
 *      see TileSource::getPostData) or null
 * @param {String} cacheKey key to act as a tile cache, must be unique for tiles with unique image data
 */
$.Tile = function(level, x, y, bounds, exists, url, context2D, loadWithAjax, ajaxHeaders, sourceBounds, postData, cacheKey) {
    /**
     * The zoom level this tile belongs to.
     * @member {Number} level
     * @memberof OpenSeadragon.Tile#
     */
    this.level   = level;
    /**
     * The vector component 'x'.
     * @member {Number} x
     * @memberof OpenSeadragon.Tile#
     */
    this.x       = x;
    /**
     * The vector component 'y'.
     * @member {Number} y
     * @memberof OpenSeadragon.Tile#
     */
    this.y       = y;
    /**
     * Where this tile fits, in normalized coordinates
     * @member {OpenSeadragon.Rect} bounds
     * @memberof OpenSeadragon.Tile#
     */
    this.bounds  = bounds;
    /**
     * The portion of the tile to use as the source of the drawing operation, in pixels. Note that
     * this only works when drawing with canvas; when drawing with HTML the entire tile is always used.
     * @member {OpenSeadragon.Rect} sourceBounds
     * @memberof OpenSeadragon.Tile#
     */
    this.sourceBounds = sourceBounds;
    /**
     * Is this tile a part of a sparse image? Also has this tile failed to load?
     * @member {Boolean} exists
     * @memberof OpenSeadragon.Tile#
     */
    this.exists  = exists;
    /**
     * Private property to hold string url or url retriever function.
     * Consumers should access via Tile.getUrl()
     * @private
     * @member {String|Function} url
     * @memberof OpenSeadragon.Tile#
     */
    this._url     = url;
    /**
     * Post parameters for this tile. For example, it can be an URL-encoded string
     * in k1=v1&k2=v2... format, or a JSON, or a FormData instance... or null if no POST request used
     * @member {String} postData HTTP POST data (usually but not necessarily in k=v&k2=v2... form,
     *      see TileSource::getPostData) or null
     * @memberof OpenSeadragon.Tile#
     */
    this.postData  = postData;
    /**
     * The context2D of this tile if it is provided directly by the tile source.
     * @member {CanvasRenderingContext2D} context2D
     * @memberOf OpenSeadragon.Tile#
     */
    this.context2D = context2D;
    /**
     * Whether to load this tile's image with an AJAX request.
     * @member {Boolean} loadWithAjax
     * @memberof OpenSeadragon.Tile#
     */
    this.loadWithAjax = loadWithAjax;
    /**
     * The headers to be used in requesting this tile's image.
     * Only used if loadWithAjax is set to true.
     * @member {Object} ajaxHeaders
     * @memberof OpenSeadragon.Tile#
     */
    this.ajaxHeaders = ajaxHeaders;

    if (cacheKey === undefined) {
        $.console.warn("Tile constructor needs 'cacheKey' variable: creation tile cache" +
            " in Tile class is deprecated. TileSource.prototype.getTileHashKey will be used.");
        cacheKey = $.TileSource.prototype.getTileHashKey(level, x, y, url, ajaxHeaders, postData);
    }
    /**
     * The unique cache key for this tile.
     * @member {String} cacheKey
     * @memberof OpenSeadragon.Tile#
     */
    this.cacheKey = cacheKey;
    /**
     * Is this tile loaded?
     * @member {Boolean} loaded
     * @memberof OpenSeadragon.Tile#
     */
    this.loaded  = false;
    /**
     * Is this tile loading?
     * @member {Boolean} loading
     * @memberof OpenSeadragon.Tile#
     */
    this.loading = false;

    /**
     * The HTML div element for this tile
     * @member {Element} element
     * @memberof OpenSeadragon.Tile#
     */
    this.element    = null;
    /**
     * The HTML img element for this tile.
     * @member {Element} imgElement
     * @memberof OpenSeadragon.Tile#
     */
    this.imgElement = null;

    /**
     * The alias of this.element.style.
     * @member {String} style
     * @memberof OpenSeadragon.Tile#
     */
    this.style      = null;
    /**
     * This tile's position on screen, in pixels.
     * @member {OpenSeadragon.Point} position
     * @memberof OpenSeadragon.Tile#
     */
    this.position   = null;
    /**
     * This tile's size on screen, in pixels.
     * @member {OpenSeadragon.Point} size
     * @memberof OpenSeadragon.Tile#
     */
    this.size       = null;
    /**
     * Whether to flip the tile when rendering.
     * @member {Boolean} flipped
     * @memberof OpenSeadragon.Tile#
     */
    this.flipped    = false;
    /**
     * The start time of this tile's blending.
     * @member {Number} blendStart
     * @memberof OpenSeadragon.Tile#
     */
    this.blendStart = null;
    /**
     * The current opacity this tile should be.
     * @member {Number} opacity
     * @memberof OpenSeadragon.Tile#
     */
    this.opacity    = null;
    /**
     * The squared distance of this tile to the viewport center.
     * Use for comparing tiles.
     * @private
     * @member {Number} squaredDistance
     * @memberof OpenSeadragon.Tile#
     */
    this.squaredDistance   = null;
    /**
     * The visibility score of this tile.
     * @member {Number} visibility
     * @memberof OpenSeadragon.Tile#
     */
    this.visibility = null;

    /**
     * The transparency indicator of this tile.
     * @member {Boolean} hasTransparency true if tile contains transparency for correct rendering
     * @memberof OpenSeadragon.Tile#
     */
    this.hasTransparency = false;

    /**
     * Whether this tile is currently being drawn.
     * @member {Boolean} beingDrawn
     * @memberof OpenSeadragon.Tile#
     */
    this.beingDrawn     = false;

    /**
     * Timestamp the tile was last touched.
     * @member {Number} lastTouchTime
     * @memberof OpenSeadragon.Tile#
     */
    this.lastTouchTime  = 0;

    /**
     * Whether this tile is in the right-most column for its level.
     * @member {Boolean} isRightMost
     * @memberof OpenSeadragon.Tile#
     */
    this.isRightMost = false;

    /**
     * Whether this tile is in the bottom-most row for its level.
     * @member {Boolean} isBottomMost
     * @memberof OpenSeadragon.Tile#
     */
    this.isBottomMost = false;
};

/** @lends OpenSeadragon.Tile.prototype */
$.Tile.prototype = {

    /**
     * Provides a string representation of this tiles level and (x,y)
     * components.
     * @function
     * @returns {String}
     */
    toString: function() {
        return this.level + "/" + this.x + "_" + this.y;
    },

    // private
    _hasTransparencyChannel: function() {
        console.warn("Tile.prototype._hasTransparencyChannel() has been " +
            "deprecated and will be removed in the future. Use TileSource.prototype.hasTransparency() instead.");
        return !!this.context2D || this.getUrl().match('.png');
    },

    /**
     * Renders the tile in an html container.
     * @function
     * @param {Element} container
     */
    drawHTML: function( container ) {
        if (!this.cacheImageRecord) {
            $.console.warn(
                '[Tile.drawHTML] attempting to draw tile %s when it\'s not cached',
                this.toString());
            return;
        }

        if ( !this.loaded ) {
            $.console.warn(
                "Attempting to draw tile %s when it's not yet loaded.",
                this.toString()
            );
            return;
        }

        //EXPERIMENTAL - trying to figure out how to scale the container
        //               content during animation of the container size.

        if ( !this.element ) {
            var image = this.getImage();
            if (!image) {
                return;
            }

            this.element                              = $.makeNeutralElement( "div" );
            this.imgElement                           = image.cloneNode();
            this.imgElement.style.msInterpolationMode = "nearest-neighbor";
            this.imgElement.style.width               = "100%";
            this.imgElement.style.height              = "100%";

            this.style                     = this.element.style;
            this.style.position            = "absolute";
        }
        if ( this.element.parentNode !== container ) {
            container.appendChild( this.element );
        }
        if ( this.imgElement.parentNode !== this.element ) {
            this.element.appendChild( this.imgElement );
        }

        this.style.top     = this.position.y + "px";
        this.style.left    = this.position.x + "px";
        this.style.height  = this.size.y + "px";
        this.style.width   = this.size.x + "px";

        if (this.flipped) {
            this.style.transform = "scaleX(-1)";
        }

        $.setElementOpacity( this.element, this.opacity );
    },

    /**
     * The Image object for this tile.
     * @member {Object} image
     * @memberof OpenSeadragon.Tile#
     * @deprecated
     * @returns {Image}
     */
    get image() {
        $.console.error("[Tile.image] property has been deprecated. Use [Tile.prototype.getImage] instead.");
        return this.getImage();
    },

    /**
     * The URL of this tile's image.
     * @member {String} url
     * @memberof OpenSeadragon.Tile#
     * @deprecated
     * @returns {String}
     */
    get url() {
        $.console.error("[Tile.url] property has been deprecated. Use [Tile.prototype.getUrl] instead.");
        return this.getUrl();
    },

    /**
     * Get the Image object for this tile.
     * @returns {Image}
     */
    getImage: function() {
        return this.cacheImageRecord.getImage();
    },

    /**
     * Get the url string for this tile.
     * @returns {String}
     */
    getUrl: function() {
        if (typeof this._url === 'function') {
            return this._url();
        }

        return this._url;
    },

    /**
     * Get the CanvasRenderingContext2D instance for tile image data drawn
     * onto Canvas if enabled and available
     * @returns {CanvasRenderingContext2D}
     */
    getCanvasContext: function() {
        return this.context2D || this.cacheImageRecord.getRenderedContext();
    },

    /**
     * Renders the tile in a canvas-based context.
     * @function
     * @param {Canvas} context
     * @param {Function} drawingHandler - Method for firing the drawing event.
     * drawingHandler({context, tile, rendered})
     * where <code>rendered</code> is the context with the pre-drawn image.
     * @param {Number} [scale=1] - Apply a scale to position and size
     * @param {OpenSeadragon.Point} [translate] - A translation vector
     * @param {Boolean} [shouldRoundPositionAndSize] - Tells whether to round
     * position and size of tiles supporting alpha channel in non-transparency
     * context.
     * @param {OpenSeadragon.TileSource} source - The source specification of the tile.
     */
    drawCanvas: function( context, drawingHandler, scale, translate, shouldRoundPositionAndSize, source) {

        var position = this.position.times($.pixelDensityRatio),
            size     = this.size.times($.pixelDensityRatio),
            rendered;

        if (!this.context2D && !this.cacheImageRecord) {
            $.console.warn(
                '[Tile.drawCanvas] attempting to draw tile %s when it\'s not cached',
                this.toString());
            return;
        }

        rendered = this.getCanvasContext();

        if ( !this.loaded || !rendered ){
            $.console.warn(
                "Attempting to draw tile %s when it's not yet loaded.",
                this.toString()
            );

            return;
        }

        context.save();
        context.globalAlpha = this.opacity;

        if (typeof scale === 'number' && scale !== 1) {
            // draw tile at a different scale
            position = position.times(scale);
            size = size.times(scale);
        }

        if (translate instanceof $.Point) {
            // shift tile position slightly
            position = position.plus(translate);
        }

        //if we are supposed to be rendering fully opaque rectangle,
        //ie its done fading or fading is turned off, and if we are drawing
        //an image with an alpha channel, then the only way
        //to avoid seeing the tile underneath is to clear the rectangle
        if (context.globalAlpha === 1 && this.hasTransparency) {
            if (shouldRoundPositionAndSize) {
                // Round to the nearest whole pixel so we don't get seams from overlap.
                position.x = Math.round(position.x);
                position.y = Math.round(position.y);
                size.x = Math.round(size.x);
                size.y = Math.round(size.y);
            }

            //clearing only the inside of the rectangle occupied
            //by the png prevents edge flikering
            context.clearRect(
                position.x,
                position.y,
                size.x,
                size.y
            );
        }

        // This gives the application a chance to make image manipulation
        // changes as we are rendering the image
        drawingHandler({context: context, tile: this, rendered: rendered});

        var sourceWidth, sourceHeight;
        if (this.sourceBounds) {
            sourceWidth = Math.min(this.sourceBounds.width, rendered.canvas.width);
            sourceHeight = Math.min(this.sourceBounds.height, rendered.canvas.height);
        } else {
            sourceWidth = rendered.canvas.width;
            sourceHeight = rendered.canvas.height;
        }

        context.translate(position.x + size.x / 2, 0);
        if (this.flipped) {
            context.scale(-1, 1);
        }
        context.drawImage(
            rendered.canvas,
            0,
            0,
            sourceWidth,
            sourceHeight,
            -size.x / 2,
            position.y,
            size.x,
            size.y
        );

        context.restore();
    },

    /**
     * Get the ratio between current and original size.
     * @function
     * @returns {Float}
     */
    getScaleForEdgeSmoothing: function() {
        var context;
        if (this.cacheImageRecord) {
            context = this.cacheImageRecord.getRenderedContext();
        } else if (this.context2D) {
            context = this.context2D;
        } else {
            $.console.warn(
                '[Tile.drawCanvas] attempting to get tile scale %s when tile\'s not cached',
                this.toString());
            return 1;
        }
        return context.canvas.width / (this.size.x * $.pixelDensityRatio);
    },

    /**
     * Get a translation vector that when applied to the tile position produces integer coordinates.
     * Needed to avoid swimming and twitching.
     * @function
     * @param {Number} [scale=1] - Scale to be applied to position.
     * @returns {OpenSeadragon.Point}
     */
    getTranslationForEdgeSmoothing: function(scale, canvasSize, sketchCanvasSize) {
        // The translation vector must have positive values, otherwise the image goes a bit off
        // the sketch canvas to the top and left and we must use negative coordinates to repaint it
        // to the main canvas. In that case, some browsers throw:
        // INDEX_SIZE_ERR: DOM Exception 1: Index or size was negative, or greater than the allowed value.
        var x = Math.max(1, Math.ceil((sketchCanvasSize.x - canvasSize.x) / 2));
        var y = Math.max(1, Math.ceil((sketchCanvasSize.y - canvasSize.y) / 2));
        return new $.Point(x, y).minus(
            this.position
                .times($.pixelDensityRatio)
                .times(scale || 1)
                .apply(function(x) {
                    return x % 1;
                })
        );
    },

    /**
     * Removes tile from its container.
     * @function
     */
    unload: function() {
        if ( this.imgElement && this.imgElement.parentNode ) {
            this.imgElement.parentNode.removeChild( this.imgElement );
        }
        if ( this.element && this.element.parentNode ) {
            this.element.parentNode.removeChild( this.element );
        }

        this.element    = null;
        this.imgElement = null;
        this.loaded     = false;
        this.loading    = false;
    }
};

}( OpenSeadragon ));

/*
 * OpenSeadragon - Overlay
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function($) {

    /**
     * An enumeration of positions that an overlay may be assigned relative to
     * the viewport.
     * It is identical to OpenSeadragon.Placement but is kept for backward
     * compatibility.
     * @member OverlayPlacement
     * @memberof OpenSeadragon
     * @see OpenSeadragon.Placement
     * @static
     * @readonly
     * @type {Object}
     * @property {Number} CENTER
     * @property {Number} TOP_LEFT
     * @property {Number} TOP
     * @property {Number} TOP_RIGHT
     * @property {Number} RIGHT
     * @property {Number} BOTTOM_RIGHT
     * @property {Number} BOTTOM
     * @property {Number} BOTTOM_LEFT
     * @property {Number} LEFT
     */
    $.OverlayPlacement = $.Placement;

    /**
     * An enumeration of possible ways to handle overlays rotation
     * @member OverlayRotationMode
     * @memberOf OpenSeadragon
     * @static
     * @readonly
     * @property {Number} NO_ROTATION The overlay ignore the viewport rotation.
     * @property {Number} EXACT The overlay use CSS 3 transforms to rotate with
     * the viewport. If the overlay contains text, it will get rotated as well.
     * @property {Number} BOUNDING_BOX The overlay adjusts for rotation by
     * taking the size of the bounding box of the rotated bounds.
     * Only valid for overlays with Rect location and scalable in both directions.
     */
    $.OverlayRotationMode = $.freezeObject({
        NO_ROTATION: 1,
        EXACT: 2,
        BOUNDING_BOX: 3
    });

    /**
     * @class Overlay
     * @classdesc Provides a way to float an HTML element on top of the viewer element.
     *
     * @memberof OpenSeadragon
     * @param {Object} options
     * @param {Element} options.element
     * @param {OpenSeadragon.Point|OpenSeadragon.Rect} options.location - The
     * location of the overlay on the image. If a {@link OpenSeadragon.Point}
     * is specified, the overlay will be located at this location with respect
     * to the placement option. If a {@link OpenSeadragon.Rect} is specified,
     * the overlay will be placed at this location with the corresponding width
     * and height and placement TOP_LEFT.
     * @param {OpenSeadragon.Placement} [options.placement=OpenSeadragon.Placement.TOP_LEFT]
     * Defines what part of the overlay should be at the specified options.location
     * @param {OpenSeadragon.Overlay.OnDrawCallback} [options.onDraw]
     * @param {Boolean} [options.checkResize=true] Set to false to avoid to
     * check the size of the overlay every time it is drawn in the directions
     * which are not scaled. It will improve performances but will cause a
     * misalignment if the overlay size changes.
     * @param {Number} [options.width] The width of the overlay in viewport
     * coordinates. If specified, the width of the overlay will be adjusted when
     * the zoom changes.
     * @param {Number} [options.height] The height of the overlay in viewport
     * coordinates. If specified, the height of the overlay will be adjusted when
     * the zoom changes.
     * @param {Boolean} [options.rotationMode=OpenSeadragon.OverlayRotationMode.EXACT]
     * How to handle the rotation of the viewport.
     */
    $.Overlay = function(element, location, placement) {

        /**
         * onDraw callback signature used by {@link OpenSeadragon.Overlay}.
         *
         * @callback OnDrawCallback
         * @memberof OpenSeadragon.Overlay
         * @param {OpenSeadragon.Point} position
         * @param {OpenSeadragon.Point} size
         * @param {Element} element
         */

        var options;
        if ($.isPlainObject(element)) {
            options = element;
        } else {
            options = {
                element: element,
                location: location,
                placement: placement
            };
        }

        this.element = options.element;
        this.style = options.element.style;
        this._init(options);
    };

    /** @lends OpenSeadragon.Overlay.prototype */
    $.Overlay.prototype = {

        // private
        _init: function(options) {
            this.location = options.location;
            this.placement = options.placement === undefined ?
                $.Placement.TOP_LEFT : options.placement;
            this.onDraw = options.onDraw;
            this.checkResize = options.checkResize === undefined ?
                true : options.checkResize;

            // When this.width is not null, the overlay get scaled horizontally
            this.width = options.width === undefined ? null : options.width;

            // When this.height is not null, the overlay get scaled vertically
            this.height = options.height === undefined ? null : options.height;

            this.rotationMode = options.rotationMode || $.OverlayRotationMode.EXACT;

            // Having a rect as location is a syntactic sugar
            if (this.location instanceof $.Rect) {
                this.width = this.location.width;
                this.height = this.location.height;
                this.location = this.location.getTopLeft();
                this.placement = $.Placement.TOP_LEFT;
            }

            // Deprecated properties kept for backward compatibility.
            this.scales = this.width !== null && this.height !== null;
            this.bounds = new $.Rect(
                this.location.x, this.location.y, this.width, this.height);
            this.position = this.location;
        },

        /**
         * Internal function to adjust the position of an overlay
         * depending on it size and placement.
         * @function
         * @param {OpenSeadragon.Point} position
         * @param {OpenSeadragon.Point} size
         */
        adjust: function(position, size) {
            var properties = $.Placement.properties[this.placement];
            if (!properties) {
                return;
            }
            if (properties.isHorizontallyCentered) {
                position.x -= size.x / 2;
            } else if (properties.isRight) {
                position.x -= size.x;
            }
            if (properties.isVerticallyCentered) {
                position.y -= size.y / 2;
            } else if (properties.isBottom) {
                position.y -= size.y;
            }
        },

        /**
         * @function
         */
        destroy: function() {
            var element = this.element;
            var style = this.style;

            if (element.parentNode) {
                element.parentNode.removeChild(element);
                //this should allow us to preserve overlays when required between
                //pages
                if (element.prevElementParent) {
                    style.display = 'none';
                    //element.prevElementParent.insertBefore(
                    //    element,
                    //    element.prevNextSibling
                    //);
                    document.body.appendChild(element);
                }
            }

            // clear the onDraw callback
            this.onDraw = null;

            style.top = "";
            style.left = "";
            style.position = "";

            if (this.width !== null) {
                style.width = "";
            }
            if (this.height !== null) {
                style.height = "";
            }
            var transformOriginProp = $.getCssPropertyWithVendorPrefix(
                'transformOrigin');
            var transformProp = $.getCssPropertyWithVendorPrefix(
                'transform');
            if (transformOriginProp && transformProp) {
                style[transformOriginProp] = "";
                style[transformProp] = "";
            }
        },

        /**
         * @function
         * @param {Element} container
         */
        drawHTML: function(container, viewport) {
            var element = this.element;
            if (element.parentNode !== container) {
                //save the source parent for later if we need it
                element.prevElementParent = element.parentNode;
                element.prevNextSibling = element.nextSibling;
                container.appendChild(element);

                // have to set position before calculating size, fix #1116
                this.style.position = "absolute";
                // this.size is used by overlays which don't get scaled in at
                // least one direction when this.checkResize is set to false.
                this.size = $.getElementSize(element);
            }

            var positionAndSize = this._getOverlayPositionAndSize(viewport);

            var position = positionAndSize.position;
            var size = this.size = positionAndSize.size;
            var rotate = positionAndSize.rotate;

            // call the onDraw callback if it exists to allow one to overwrite
            // the drawing/positioning/sizing of the overlay
            if (this.onDraw) {
                this.onDraw(position, size, this.element);
            } else {
                var style = this.style;
                style.left = position.x + "px";
                style.top = position.y + "px";
                if (this.width !== null) {
                    style.width = size.x + "px";
                }
                if (this.height !== null) {
                    style.height = size.y + "px";
                }
                var transformOriginProp = $.getCssPropertyWithVendorPrefix(
                    'transformOrigin');
                var transformProp = $.getCssPropertyWithVendorPrefix(
                    'transform');
                if (transformOriginProp && transformProp) {
                    if (rotate) {
                        style[transformOriginProp] = this._getTransformOrigin();
                        style[transformProp] = "rotate(" + rotate + "deg)";
                    } else {
                        style[transformOriginProp] = "";
                        style[transformProp] = "";
                    }
                }
                style.display = 'block';
            }
        },

        // private
        _getOverlayPositionAndSize: function(viewport) {
            var position = viewport.pixelFromPoint(this.location, true);
            var size = this._getSizeInPixels(viewport);
            this.adjust(position, size);

            var rotate = 0;
            if (viewport.getRotation(true) &&
                this.rotationMode !== $.OverlayRotationMode.NO_ROTATION) {
                // BOUNDING_BOX is only valid if both directions get scaled.
                // Get replaced by EXACT otherwise.
                if (this.rotationMode === $.OverlayRotationMode.BOUNDING_BOX &&
                    this.width !== null && this.height !== null) {
                    var rect = new $.Rect(position.x, position.y, size.x, size.y);
                    var boundingBox = this._getBoundingBox(rect, viewport.getRotation(true));
                    position = boundingBox.getTopLeft();
                    size = boundingBox.getSize();
                } else {
                    rotate = viewport.getRotation(true);
                }
            }

            return {
                position: position,
                size: size,
                rotate: rotate
            };
        },

        // private
        _getSizeInPixels: function(viewport) {
            var width = this.size.x;
            var height = this.size.y;
            if (this.width !== null || this.height !== null) {
                var scaledSize = viewport.deltaPixelsFromPointsNoRotate(
                    new $.Point(this.width || 0, this.height || 0), true);
                if (this.width !== null) {
                    width = scaledSize.x;
                }
                if (this.height !== null) {
                    height = scaledSize.y;
                }
            }
            if (this.checkResize &&
                (this.width === null || this.height === null)) {
                var eltSize = this.size = $.getElementSize(this.element);
                if (this.width === null) {
                    width = eltSize.x;
                }
                if (this.height === null) {
                    height = eltSize.y;
                }
            }
            return new $.Point(width, height);
        },

        // private
        _getBoundingBox: function(rect, degrees) {
            var refPoint = this._getPlacementPoint(rect);
            return rect.rotate(degrees, refPoint).getBoundingBox();
        },

        // private
        _getPlacementPoint: function(rect) {
            var result = new $.Point(rect.x, rect.y);
            var properties = $.Placement.properties[this.placement];
            if (properties) {
                if (properties.isHorizontallyCentered) {
                    result.x += rect.width / 2;
                } else if (properties.isRight) {
                    result.x += rect.width;
                }
                if (properties.isVerticallyCentered) {
                    result.y += rect.height / 2;
                } else if (properties.isBottom) {
                    result.y += rect.height;
                }
            }
            return result;
        },

        // private
        _getTransformOrigin: function() {
            var result = "";
            var properties = $.Placement.properties[this.placement];
            if (!properties) {
                return result;
            }
            if (properties.isLeft) {
                result = "left";
            } else if (properties.isRight) {
                result = "right";
            }
            if (properties.isTop) {
                result += " top";
            } else if (properties.isBottom) {
                result += " bottom";
            }
            return result;
        },

        /**
         * Changes the overlay settings.
         * @function
         * @param {OpenSeadragon.Point|OpenSeadragon.Rect|Object} location
         * If an object is specified, the options are the same than the constructor
         * except for the element which can not be changed.
         * @param {OpenSeadragon.Placement} placement
         */
        update: function(location, placement) {
            var options = $.isPlainObject(location) ? location : {
                location: location,
                placement: placement
            };
            this._init({
                location: options.location || this.location,
                placement: options.placement !== undefined ?
                    options.placement : this.placement,
                onDraw: options.onDraw || this.onDraw,
                checkResize: options.checkResize || this.checkResize,
                width: options.width !== undefined ? options.width : this.width,
                height: options.height !== undefined ? options.height : this.height,
                rotationMode: options.rotationMode || this.rotationMode
            });
        },

        /**
         * Returns the current bounds of the overlay in viewport coordinates
         * @function
         * @param {OpenSeadragon.Viewport} viewport the viewport
         * @returns {OpenSeadragon.Rect} overlay bounds
         */
        getBounds: function(viewport) {
            $.console.assert(viewport,
                'A viewport must now be passed to Overlay.getBounds.');
            var width = this.width;
            var height = this.height;
            if (width === null || height === null) {
                var size = viewport.deltaPointsFromPixelsNoRotate(this.size, true);
                if (width === null) {
                    width = size.x;
                }
                if (height === null) {
                    height = size.y;
                }
            }
            var location = this.location.clone();
            this.adjust(location, new $.Point(width, height));
            return this._adjustBoundsForRotation(
                viewport, new $.Rect(location.x, location.y, width, height));
        },

        // private
        _adjustBoundsForRotation: function(viewport, bounds) {
            if (!viewport ||
                viewport.getRotation(true) === 0 ||
                this.rotationMode === $.OverlayRotationMode.EXACT) {
                return bounds;
            }
            if (this.rotationMode === $.OverlayRotationMode.BOUNDING_BOX) {
                // If overlay not fully scalable, BOUNDING_BOX falls back to EXACT
                if (this.width === null || this.height === null) {
                    return bounds;
                }
                // It is easier to just compute the position and size and
                // convert to viewport coordinates.
                var positionAndSize = this._getOverlayPositionAndSize(viewport);
                return viewport.viewerElementToViewportRectangle(new $.Rect(
                    positionAndSize.position.x,
                    positionAndSize.position.y,
                    positionAndSize.size.x,
                    positionAndSize.size.y));
            }

            // NO_ROTATION case
            return bounds.rotate(-viewport.getRotation(true),
                this._getPlacementPoint(bounds));
        }
    };

}(OpenSeadragon));

/*
 * OpenSeadragon - Drawer
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class Drawer
 * @memberof OpenSeadragon
 * @classdesc Handles rendering of tiles for an {@link OpenSeadragon.Viewer}.
 * @param {Object} options - Options for this Drawer.
 * @param {OpenSeadragon.Viewer} options.viewer - The Viewer that owns this Drawer.
 * @param {OpenSeadragon.Viewport} options.viewport - Reference to Viewer viewport.
 * @param {Element} options.element - Parent element.
 * @param {Number} [options.debugGridColor] - See debugGridColor in {@link OpenSeadragon.Options} for details.
 */
$.Drawer = function( options ) {

    $.console.assert( options.viewer, "[Drawer] options.viewer is required" );

    //backward compatibility for positional args while preferring more
    //idiomatic javascript options object as the only argument
    var args  = arguments;

    if( !$.isPlainObject( options ) ){
        options = {
            source:     args[ 0 ], // Reference to Viewer tile source.
            viewport:   args[ 1 ], // Reference to Viewer viewport.
            element:    args[ 2 ]  // Parent element.
        };
    }

    $.console.assert( options.viewport, "[Drawer] options.viewport is required" );
    $.console.assert( options.element, "[Drawer] options.element is required" );

    if ( options.source ) {
        $.console.error( "[Drawer] options.source is no longer accepted; use TiledImage instead" );
    }

    this.viewer = options.viewer;
    this.viewport = options.viewport;
    this.debugGridColor = typeof options.debugGridColor === 'string' ? [options.debugGridColor] : options.debugGridColor || $.DEFAULT_SETTINGS.debugGridColor;
    if (options.opacity) {
        $.console.error( "[Drawer] options.opacity is no longer accepted; set the opacity on the TiledImage instead" );
    }

    this.useCanvas  = $.supportsCanvas && ( this.viewer ? this.viewer.useCanvas : true );
    /**
     * The parent element of this Drawer instance, passed in when the Drawer was created.
     * The parent of {@link OpenSeadragon.Drawer#canvas}.
     * @member {Element} container
     * @memberof OpenSeadragon.Drawer#
     */
    this.container  = $.getElement( options.element );
    /**
     * A &lt;canvas&gt; element if the browser supports them, otherwise a &lt;div&gt; element.
     * Child element of {@link OpenSeadragon.Drawer#container}.
     * @member {Element} canvas
     * @memberof OpenSeadragon.Drawer#
     */
    this.canvas     = $.makeNeutralElement( this.useCanvas ? "canvas" : "div" );
    /**
     * 2d drawing context for {@link OpenSeadragon.Drawer#canvas} if it's a &lt;canvas&gt; element, otherwise null.
     * @member {Object} context
     * @memberof OpenSeadragon.Drawer#
     */
    this.context    = this.useCanvas ? this.canvas.getContext( "2d" ) : null;

    /**
     * Sketch canvas used to temporarily draw tiles which cannot be drawn directly
     * to the main canvas due to opacity. Lazily initialized.
     */
    this.sketchCanvas = null;
    this.sketchContext = null;

    /**
     * @member {Element} element
     * @memberof OpenSeadragon.Drawer#
     * @deprecated Alias for {@link OpenSeadragon.Drawer#container}.
     */
    this.element    = this.container;

    // We force our container to ltr because our drawing math doesn't work in rtl.
    // This issue only affects our canvas renderer, but we do it always for consistency.
    // Note that this means overlays you want to be rtl need to be explicitly set to rtl.
    this.container.dir = 'ltr';

    // check canvas available width and height, set canvas width and height such that the canvas backing store is set to the proper pixel density
    if (this.useCanvas) {
        var viewportSize = this._calculateCanvasSize();
        this.canvas.width = viewportSize.x;
        this.canvas.height = viewportSize.y;
    }

    this.canvas.style.width     = "100%";
    this.canvas.style.height    = "100%";
    this.canvas.style.position  = "absolute";
    $.setElementOpacity( this.canvas, this.opacity, true );
    // Allow pointer events to pass through the canvas element so implicit
    //   pointer capture works on touch devices
    $.setElementPointerEventsNone( this.canvas );
    $.setElementTouchActionNone( this.canvas );

    // explicit left-align
    this.container.style.textAlign = "left";
    this.container.appendChild( this.canvas );

    // Image smoothing for canvas rendering (only if canvas is used).
    // Canvas default is "true", so this will only be changed if user specified "false".
    this._imageSmoothingEnabled = true;
};

/** @lends OpenSeadragon.Drawer.prototype */
$.Drawer.prototype = {
    // deprecated
    addOverlay: function( element, location, placement, onDraw ) {
        $.console.error("drawer.addOverlay is deprecated. Use viewer.addOverlay instead.");
        this.viewer.addOverlay( element, location, placement, onDraw );
        return this;
    },

    // deprecated
    updateOverlay: function( element, location, placement ) {
        $.console.error("drawer.updateOverlay is deprecated. Use viewer.updateOverlay instead.");
        this.viewer.updateOverlay( element, location, placement );
        return this;
    },

    // deprecated
    removeOverlay: function( element ) {
        $.console.error("drawer.removeOverlay is deprecated. Use viewer.removeOverlay instead.");
        this.viewer.removeOverlay( element );
        return this;
    },

    // deprecated
    clearOverlays: function() {
        $.console.error("drawer.clearOverlays is deprecated. Use viewer.clearOverlays instead.");
        this.viewer.clearOverlays();
        return this;
    },

    /**
     * This function converts the given point from to the drawer coordinate by
     * multiplying it with the pixel density.
     * This function does not take rotation into account, thus assuming provided
     * point is at 0 degree.
     * @param {OpenSeadragon.Point} point - the pixel point to convert
     * @returns {OpenSeadragon.Point} Point in drawer coordinate system.
     */
    viewportCoordToDrawerCoord: function(point) {
        var vpPoint = this.viewport.pixelFromPointNoRotate(point, true);
        return new $.Point(
            vpPoint.x * $.pixelDensityRatio,
            vpPoint.y * $.pixelDensityRatio
        );
    },

    /**
     * This function will create multiple polygon paths on the drawing context by provided polygons,
     * then clip the context to the paths.
     * @param {OpenSeadragon.Point[][]} polygons - an array of polygons. A polygon is an array of OpenSeadragon.Point
     * @param {Boolean} useSketch - Whether to use the sketch canvas or not.
     */
    clipWithPolygons: function (polygons, useSketch) {
        if (!this.useCanvas) {
            return;
        }
        var context = this._getContext(useSketch);
        context.beginPath();
        polygons.forEach(function (polygon) {
            polygon.forEach(function (coord, i) {
                context[i === 0 ? 'moveTo' : 'lineTo'](coord.x, coord.y);
          });
        });
        context.clip();
    },

    /**
     * Set the opacity of the drawer.
     * @param {Number} opacity
     * @returns {OpenSeadragon.Drawer} Chainable.
     */
    setOpacity: function( opacity ) {
        $.console.error("drawer.setOpacity is deprecated. Use tiledImage.setOpacity instead.");
        var world = this.viewer.world;
        for (var i = 0; i < world.getItemCount(); i++) {
            world.getItemAt( i ).setOpacity( opacity );
        }
        return this;
    },

    /**
     * Get the opacity of the drawer.
     * @returns {Number}
     */
    getOpacity: function() {
        $.console.error("drawer.getOpacity is deprecated. Use tiledImage.getOpacity instead.");
        var world = this.viewer.world;
        var maxOpacity = 0;
        for (var i = 0; i < world.getItemCount(); i++) {
            var opacity = world.getItemAt( i ).getOpacity();
            if ( opacity > maxOpacity ) {
                maxOpacity = opacity;
            }
        }
        return maxOpacity;
    },

    // deprecated
    needsUpdate: function() {
        $.console.error( "[Drawer.needsUpdate] this function is deprecated. Use World.needsDraw instead." );
        return this.viewer.world.needsDraw();
    },

    // deprecated
    numTilesLoaded: function() {
        $.console.error( "[Drawer.numTilesLoaded] this function is deprecated. Use TileCache.numTilesLoaded instead." );
        return this.viewer.tileCache.numTilesLoaded();
    },

    // deprecated
    reset: function() {
        $.console.error( "[Drawer.reset] this function is deprecated. Use World.resetItems instead." );
        this.viewer.world.resetItems();
        return this;
    },

    // deprecated
    update: function() {
        $.console.error( "[Drawer.update] this function is deprecated. Use Drawer.clear and World.draw instead." );
        this.clear();
        this.viewer.world.draw();
        return this;
    },

    /**
     * @returns {Boolean} True if rotation is supported.
     */
    canRotate: function() {
        return this.useCanvas;
    },

    /**
     * Destroy the drawer (unload current loaded tiles)
     */
    destroy: function() {
        //force unloading of current canvas (1x1 will be gc later, trick not necessarily needed)
        this.canvas.width  = 1;
        this.canvas.height = 1;
        this.sketchCanvas = null;
        this.sketchContext = null;
    },

    /**
     * Clears the Drawer so it's ready to draw another frame.
     */
    clear: function() {
        this.canvas.innerHTML = "";
        if ( this.useCanvas ) {
            var viewportSize = this._calculateCanvasSize();
            if( this.canvas.width !== viewportSize.x ||
                this.canvas.height !== viewportSize.y ) {
                this.canvas.width = viewportSize.x;
                this.canvas.height = viewportSize.y;
                this._updateImageSmoothingEnabled(this.context);
                if ( this.sketchCanvas !== null ) {
                    var sketchCanvasSize = this._calculateSketchCanvasSize();
                    this.sketchCanvas.width = sketchCanvasSize.x;
                    this.sketchCanvas.height = sketchCanvasSize.y;
                    this._updateImageSmoothingEnabled(this.sketchContext);
                }
            }
            this._clear();
        }
    },

    _clear: function (useSketch, bounds) {
        if (!this.useCanvas) {
            return;
        }
        var context = this._getContext(useSketch);
        if (bounds) {
            context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);
        } else {
            var canvas = context.canvas;
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    },

    /**
     * Scale from OpenSeadragon viewer rectangle to drawer rectangle
     * (ignoring rotation)
     * @param {OpenSeadragon.Rect} rectangle - The rectangle in viewport coordinate system.
     * @returns {OpenSeadragon.Rect} Rectangle in drawer coordinate system.
     */
    viewportToDrawerRectangle: function(rectangle) {
        var topLeft = this.viewport.pixelFromPointNoRotate(rectangle.getTopLeft(), true);
        var size = this.viewport.deltaPixelsFromPointsNoRotate(rectangle.getSize(), true);

        return new $.Rect(
            topLeft.x * $.pixelDensityRatio,
            topLeft.y * $.pixelDensityRatio,
            size.x * $.pixelDensityRatio,
            size.y * $.pixelDensityRatio
        );
    },

    /**
     * Draws the given tile.
     * @param {OpenSeadragon.Tile} tile - The tile to draw.
     * @param {Function} drawingHandler - Method for firing the drawing event if using canvas.
     * drawingHandler({context, tile, rendered})
     * @param {Boolean} useSketch - Whether to use the sketch canvas or not.
     * where <code>rendered</code> is the context with the pre-drawn image.
     * @param {Float} [scale=1] - Apply a scale to tile position and size. Defaults to 1.
     * @param {OpenSeadragon.Point} [translate] A translation vector to offset tile position
     * @param {Boolean} [shouldRoundPositionAndSize] - Tells whether to round
     * position and size of tiles supporting alpha channel in non-transparency
     * context.
     * @param {OpenSeadragon.TileSource} source - The source specification of the tile.
     */
    drawTile: function( tile, drawingHandler, useSketch, scale, translate, shouldRoundPositionAndSize, source) {
        $.console.assert(tile, '[Drawer.drawTile] tile is required');
        $.console.assert(drawingHandler, '[Drawer.drawTile] drawingHandler is required');

        if (this.useCanvas) {
            var context = this._getContext(useSketch);
            scale = scale || 1;
            tile.drawCanvas(context, drawingHandler, scale, translate, shouldRoundPositionAndSize, source);
        } else {
            tile.drawHTML( this.canvas );
        }
    },

    _getContext: function( useSketch ) {
        var context = this.context;
        if ( useSketch ) {
            if (this.sketchCanvas === null) {
                this.sketchCanvas = document.createElement( "canvas" );
                var sketchCanvasSize = this._calculateSketchCanvasSize();
                this.sketchCanvas.width = sketchCanvasSize.x;
                this.sketchCanvas.height = sketchCanvasSize.y;
                this.sketchContext = this.sketchCanvas.getContext( "2d" );

                // If the viewport is not currently rotated, the sketchCanvas
                // will have the same size as the main canvas. However, if
                // the viewport get rotated later on, we will need to resize it.
                if (this.viewport.getRotation() === 0) {
                    var self = this;
                    this.viewer.addHandler('rotate', function resizeSketchCanvas() {
                        if (self.viewport.getRotation() === 0) {
                            return;
                        }
                        self.viewer.removeHandler('rotate', resizeSketchCanvas);
                        var sketchCanvasSize = self._calculateSketchCanvasSize();
                        self.sketchCanvas.width = sketchCanvasSize.x;
                        self.sketchCanvas.height = sketchCanvasSize.y;
                    });
                }
                this._updateImageSmoothingEnabled(this.sketchContext);
            }
            context = this.sketchContext;
        }
        return context;
    },

    // private
    saveContext: function( useSketch ) {
        if (!this.useCanvas) {
            return;
        }

        this._getContext( useSketch ).save();
    },

    // private
    restoreContext: function( useSketch ) {
        if (!this.useCanvas) {
            return;
        }

        this._getContext( useSketch ).restore();
    },

    // private
    setClip: function(rect, useSketch) {
        if (!this.useCanvas) {
            return;
        }

        var context = this._getContext( useSketch );
        context.beginPath();
        context.rect(rect.x, rect.y, rect.width, rect.height);
        context.clip();
    },

    // private
    drawRectangle: function(rect, fillStyle, useSketch) {
        if (!this.useCanvas) {
            return;
        }

        var context = this._getContext( useSketch );
        context.save();
        context.fillStyle = fillStyle;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
        context.restore();
    },

    /**
     * Blends the sketch canvas in the main canvas.
     * @param {Object} options The options
     * @param {Float} options.opacity The opacity of the blending.
     * @param {Float} [options.scale=1] The scale at which tiles were drawn on
     * the sketch. Default is 1.
     * Use scale to draw at a lower scale and then enlarge onto the main canvas.
     * @param {OpenSeadragon.Point} [options.translate] A translation vector
     * that was used to draw the tiles
     * @param {String} [options.compositeOperation] - How the image is
     * composited onto other images; see compositeOperation in
     * {@link OpenSeadragon.Options} for possible values.
     * @param {OpenSeadragon.Rect} [options.bounds] The part of the sketch
     * canvas to blend in the main canvas. If specified, options.scale and
     * options.translate get ignored.
     */
    blendSketch: function(opacity, scale, translate, compositeOperation) {
        var options = opacity;
        if (!$.isPlainObject(options)) {
            options = {
                opacity: opacity,
                scale: scale,
                translate: translate,
                compositeOperation: compositeOperation
            };
        }
        if (!this.useCanvas || !this.sketchCanvas) {
            return;
        }
        opacity = options.opacity;
        compositeOperation = options.compositeOperation;
        var bounds = options.bounds;

        this.context.save();
        this.context.globalAlpha = opacity;
        if (compositeOperation) {
            this.context.globalCompositeOperation = compositeOperation;
        }
        if (bounds) {
            // Internet Explorer, Microsoft Edge, and Safari have problems
            // when you call context.drawImage with negative x or y
            // or x + width or y + height greater than the canvas width or height respectively.
            if (bounds.x < 0) {
                bounds.width += bounds.x;
                bounds.x = 0;
            }
            if (bounds.x + bounds.width > this.canvas.width) {
                bounds.width = this.canvas.width - bounds.x;
            }
            if (bounds.y < 0) {
                bounds.height += bounds.y;
                bounds.y = 0;
            }
            if (bounds.y + bounds.height > this.canvas.height) {
                bounds.height = this.canvas.height - bounds.y;
            }

            this.context.drawImage(
                this.sketchCanvas,
                bounds.x,
                bounds.y,
                bounds.width,
                bounds.height,
                bounds.x,
                bounds.y,
                bounds.width,
                bounds.height
            );
        } else {
            scale = options.scale || 1;
            translate = options.translate;
            var position = translate instanceof $.Point ?
                translate : new $.Point(0, 0);

            var widthExt = 0;
            var heightExt = 0;
            if (translate) {
                var widthDiff = this.sketchCanvas.width - this.canvas.width;
                var heightDiff = this.sketchCanvas.height - this.canvas.height;
                widthExt = Math.round(widthDiff / 2);
                heightExt = Math.round(heightDiff / 2);
            }
            this.context.drawImage(
                this.sketchCanvas,
                position.x - widthExt * scale,
                position.y - heightExt * scale,
                (this.canvas.width + 2 * widthExt) * scale,
                (this.canvas.height + 2 * heightExt) * scale,
                -widthExt,
                -heightExt,
                this.canvas.width + 2 * widthExt,
                this.canvas.height + 2 * heightExt
            );
        }
        this.context.restore();
    },

    // private
    drawDebugInfo: function(tile, count, i, tiledImage) {
        if ( !this.useCanvas ) {
            return;
        }

        var colorIndex = this.viewer.world.getIndexOfItem(tiledImage) % this.debugGridColor.length;
        var context = this.context;
        context.save();
        context.lineWidth = 2 * $.pixelDensityRatio;
        context.font = 'small-caps bold ' + (13 * $.pixelDensityRatio) + 'px arial';
        context.strokeStyle = this.debugGridColor[colorIndex];
        context.fillStyle = this.debugGridColor[colorIndex];

        if (this.viewport.getRotation(true) % 360 !== 0 ) {
            this._offsetForRotation({degrees: this.viewport.getRotation(true)});
        }
        if (tiledImage.getRotation(true) % 360 !== 0) {
            this._offsetForRotation({
                degrees: tiledImage.getRotation(true),
                point: tiledImage.viewport.pixelFromPointNoRotate(
                    tiledImage._getRotationPoint(true), true)
            });
        }
        if (tiledImage.viewport.getRotation(true) % 360 === 0 &&
            tiledImage.getRotation(true) % 360 === 0) {
            if(tiledImage._drawer.viewer.viewport.getFlip()) {
                tiledImage._drawer._flip();
            }
        }

        context.strokeRect(
            tile.position.x * $.pixelDensityRatio,
            tile.position.y * $.pixelDensityRatio,
            tile.size.x * $.pixelDensityRatio,
            tile.size.y * $.pixelDensityRatio
        );

        var tileCenterX = (tile.position.x + (tile.size.x / 2)) * $.pixelDensityRatio;
        var tileCenterY = (tile.position.y + (tile.size.y / 2)) * $.pixelDensityRatio;

        // Rotate the text the right way around.
        context.translate( tileCenterX, tileCenterY );
        context.rotate( Math.PI / 180 * -this.viewport.getRotation(true) );
        context.translate( -tileCenterX, -tileCenterY );

        if( tile.x === 0 && tile.y === 0 ){
            context.fillText(
                "Zoom: " + this.viewport.getZoom(),
                tile.position.x * $.pixelDensityRatio,
                (tile.position.y - 30) * $.pixelDensityRatio
            );
            context.fillText(
                "Pan: " + this.viewport.getBounds().toString(),
                tile.position.x * $.pixelDensityRatio,
                (tile.position.y - 20) * $.pixelDensityRatio
            );
        }
        context.fillText(
            "Level: " + tile.level,
            (tile.position.x + 10) * $.pixelDensityRatio,
            (tile.position.y + 20) * $.pixelDensityRatio
        );
        context.fillText(
            "Column: " + tile.x,
            (tile.position.x + 10) * $.pixelDensityRatio,
            (tile.position.y + 30) * $.pixelDensityRatio
        );
        context.fillText(
            "Row: " + tile.y,
            (tile.position.x + 10) * $.pixelDensityRatio,
            (tile.position.y + 40) * $.pixelDensityRatio
        );
        context.fillText(
            "Order: " + i + " of " + count,
            (tile.position.x + 10) * $.pixelDensityRatio,
            (tile.position.y + 50) * $.pixelDensityRatio
        );
        context.fillText(
            "Size: " + tile.size.toString(),
            (tile.position.x + 10) * $.pixelDensityRatio,
            (tile.position.y + 60) * $.pixelDensityRatio
        );
        context.fillText(
            "Position: " + tile.position.toString(),
            (tile.position.x + 10) * $.pixelDensityRatio,
            (tile.position.y + 70) * $.pixelDensityRatio
        );

        if (this.viewport.getRotation(true) % 360 !== 0 ) {
            this._restoreRotationChanges();
        }
        if (tiledImage.getRotation(true) % 360 !== 0) {
            this._restoreRotationChanges();
        }

        if (tiledImage.viewport.getRotation(true) % 360 === 0 &&
            tiledImage.getRotation(true) % 360 === 0) {
            if(tiledImage._drawer.viewer.viewport.getFlip()) {
                tiledImage._drawer._flip();
            }
        }

        context.restore();
    },

    // private
    debugRect: function(rect) {
        if ( this.useCanvas ) {
            var context = this.context;
            context.save();
            context.lineWidth = 2 * $.pixelDensityRatio;
            context.strokeStyle = this.debugGridColor[0];
            context.fillStyle = this.debugGridColor[0];

            context.strokeRect(
                rect.x * $.pixelDensityRatio,
                rect.y * $.pixelDensityRatio,
                rect.width * $.pixelDensityRatio,
                rect.height * $.pixelDensityRatio
            );

            context.restore();
        }
    },

    /**
     * Turns image smoothing on or off for this viewer. Note: Ignored in some (especially older) browsers that do not support this property.
     *
     * @function
     * @param {Boolean} [imageSmoothingEnabled] - Whether or not the image is
     * drawn smoothly on the canvas; see imageSmoothingEnabled in
     * {@link OpenSeadragon.Options} for more explanation.
     */
    setImageSmoothingEnabled: function(imageSmoothingEnabled){
        if ( this.useCanvas ) {
            this._imageSmoothingEnabled = imageSmoothingEnabled;
            this._updateImageSmoothingEnabled(this.context);
            this.viewer.forceRedraw();
        }
    },

    // private
    _updateImageSmoothingEnabled: function(context){
        context.msImageSmoothingEnabled = this._imageSmoothingEnabled;
        context.imageSmoothingEnabled = this._imageSmoothingEnabled;
    },

    /**
     * Get the canvas size
     * @param {Boolean} sketch If set to true return the size of the sketch canvas
     * @returns {OpenSeadragon.Point} The size of the canvas
     */
    getCanvasSize: function(sketch) {
        var canvas = this._getContext(sketch).canvas;
        return new $.Point(canvas.width, canvas.height);
    },

    getCanvasCenter: function() {
        return new $.Point(this.canvas.width / 2, this.canvas.height / 2);
    },

    // private
    _offsetForRotation: function(options) {
        var point = options.point ?
            options.point.times($.pixelDensityRatio) :
            this.getCanvasCenter();

        var context = this._getContext(options.useSketch);
        context.save();

        context.translate(point.x, point.y);
        if(this.viewer.viewport.flipped){
          context.rotate(Math.PI / 180 * -options.degrees);
          context.scale(-1, 1);
        } else{
          context.rotate(Math.PI / 180 * options.degrees);
        }
        context.translate(-point.x, -point.y);
    },

    // private
    _flip: function(options) {
      options = options || {};
      var point = options.point ?
        options.point.times($.pixelDensityRatio) :
        this.getCanvasCenter();
      var context = this._getContext(options.useSketch);

      context.translate(point.x, 0);
      context.scale(-1, 1);
      context.translate(-point.x, 0);
    },

    // private
    _restoreRotationChanges: function(useSketch) {
        var context = this._getContext(useSketch);
        context.restore();
    },

    // private
    _calculateCanvasSize: function() {
        var pixelDensityRatio = $.pixelDensityRatio;
        var viewportSize = this.viewport.getContainerSize();
        return {
            // canvas width and height are integers
            x: Math.round(viewportSize.x * pixelDensityRatio),
            y: Math.round(viewportSize.y * pixelDensityRatio)
        };
    },

    // private
    _calculateSketchCanvasSize: function() {
        var canvasSize = this._calculateCanvasSize();
        if (this.viewport.getRotation() === 0) {
            return canvasSize;
        }
        // If the viewport is rotated, we need a larger sketch canvas in order
        // to support edge smoothing.
        var sketchCanvasSize = Math.ceil(Math.sqrt(
            canvasSize.x * canvasSize.x +
            canvasSize.y * canvasSize.y));
        return {
            x: sketchCanvasSize,
            y: sketchCanvasSize
        };
    }
};

}( OpenSeadragon ));

/*
 * OpenSeadragon - Viewport
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){


/**
 * @class Viewport
 * @memberof OpenSeadragon
 * @classdesc Handles coordinate-related functionality (zoom, pan, rotation, etc.)
 * for an {@link OpenSeadragon.Viewer}.
 * @param {Object} options - Options for this Viewport.
 * @param {Object} [options.margins] - See viewportMargins in {@link OpenSeadragon.Options}.
 * @param {Number} [options.springStiffness] - See springStiffness in {@link OpenSeadragon.Options}.
 * @param {Number} [options.animationTime] - See animationTime in {@link OpenSeadragon.Options}.
 * @param {Number} [options.minZoomImageRatio] - See minZoomImageRatio in {@link OpenSeadragon.Options}.
 * @param {Number} [options.maxZoomPixelRatio] - See maxZoomPixelRatio in {@link OpenSeadragon.Options}.
 * @param {Number} [options.visibilityRatio] - See visibilityRatio in {@link OpenSeadragon.Options}.
 * @param {Boolean} [options.wrapHorizontal] - See wrapHorizontal in {@link OpenSeadragon.Options}.
 * @param {Boolean} [options.wrapVertical] - See wrapVertical in {@link OpenSeadragon.Options}.
 * @param {Number} [options.defaultZoomLevel] - See defaultZoomLevel in {@link OpenSeadragon.Options}.
 * @param {Number} [options.minZoomLevel] - See minZoomLevel in {@link OpenSeadragon.Options}.
 * @param {Number} [options.maxZoomLevel] - See maxZoomLevel in {@link OpenSeadragon.Options}.
 * @param {Number} [options.degrees] - See degrees in {@link OpenSeadragon.Options}.
 * @param {Boolean} [options.homeFillsViewer] - See homeFillsViewer in {@link OpenSeadragon.Options}.
 * @param {Boolean} [options.silenceMultiImageWarnings] - See silenceMultiImageWarnings in {@link OpenSeadragon.Options}.
 */
$.Viewport = function( options ) {

    //backward compatibility for positional args while preferring more
    //idiomatic javascript options object as the only argument
    var args = arguments;
    if (args.length && args[0] instanceof $.Point) {
        options = {
            containerSize:  args[0],
            contentSize:    args[1],
            config:         args[2]
        };
    }

    //options.config and the general config argument are deprecated
    //in favor of the more direct specification of optional settings
    //being passed directly on the options object
    if ( options.config ){
        $.extend( true, options, options.config );
        delete options.config;
    }

    this._margins = $.extend({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    }, options.margins || {});

    delete options.margins;

    options.initialDegrees = options.degrees;
    delete options.degrees;

    $.extend( true, this, {

        //required settings
        containerSize:      null,
        contentSize:        null,

        //internal state properties
        zoomPoint:          null,
        rotationPivot:      null,
        viewer:             null,

        //configurable options
        springStiffness:            $.DEFAULT_SETTINGS.springStiffness,
        animationTime:              $.DEFAULT_SETTINGS.animationTime,
        minZoomImageRatio:          $.DEFAULT_SETTINGS.minZoomImageRatio,
        maxZoomPixelRatio:          $.DEFAULT_SETTINGS.maxZoomPixelRatio,
        visibilityRatio:            $.DEFAULT_SETTINGS.visibilityRatio,
        wrapHorizontal:             $.DEFAULT_SETTINGS.wrapHorizontal,
        wrapVertical:               $.DEFAULT_SETTINGS.wrapVertical,
        defaultZoomLevel:           $.DEFAULT_SETTINGS.defaultZoomLevel,
        minZoomLevel:               $.DEFAULT_SETTINGS.minZoomLevel,
        maxZoomLevel:               $.DEFAULT_SETTINGS.maxZoomLevel,
        initialDegrees:             $.DEFAULT_SETTINGS.degrees,
        flipped:                    $.DEFAULT_SETTINGS.flipped,
        homeFillsViewer:            $.DEFAULT_SETTINGS.homeFillsViewer,
        silenceMultiImageWarnings:  $.DEFAULT_SETTINGS.silenceMultiImageWarnings

    }, options );

    this._updateContainerInnerSize();

    this.centerSpringX = new $.Spring({
        initial: 0,
        springStiffness: this.springStiffness,
        animationTime:   this.animationTime
    });
    this.centerSpringY = new $.Spring({
        initial: 0,
        springStiffness: this.springStiffness,
        animationTime:   this.animationTime
    });
    this.zoomSpring    = new $.Spring({
        exponential: true,
        initial: 1,
        springStiffness: this.springStiffness,
        animationTime:   this.animationTime
    });

    this.degreesSpring = new $.Spring({
        initial: options.initialDegrees,
        springStiffness: this.springStiffness,
        animationTime: this.animationTime
    });

    this._oldCenterX = this.centerSpringX.current.value;
    this._oldCenterY = this.centerSpringY.current.value;
    this._oldZoom    = this.zoomSpring.current.value;
    this._oldDegrees = this.degreesSpring.current.value;

    this._setContentBounds(new $.Rect(0, 0, 1, 1), 1);

    this.goHome(true);
    this.update();
};

/** @lends OpenSeadragon.Viewport.prototype */
$.Viewport.prototype = {

    // deprecated
    get degrees () {
        $.console.warn('Accessing [Viewport.degrees] is deprecated. Use viewport.getRotation instead.');
        return this.getRotation();
    },

    // deprecated
    set degrees (degrees) {
        $.console.warn('Setting [Viewport.degrees] is deprecated. Use viewport.rotateTo, viewport.rotateBy, or viewport.setRotation instead.');
        this.rotateTo(degrees);
    },

    /**
     * Updates the viewport's home bounds and constraints for the given content size.
     * @function
     * @param {OpenSeadragon.Point} contentSize - size of the content in content units
     * @returns {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:reset-size
     */
    resetContentSize: function(contentSize) {
        $.console.assert(contentSize, "[Viewport.resetContentSize] contentSize is required");
        $.console.assert(contentSize instanceof $.Point, "[Viewport.resetContentSize] contentSize must be an OpenSeadragon.Point");
        $.console.assert(contentSize.x > 0, "[Viewport.resetContentSize] contentSize.x must be greater than 0");
        $.console.assert(contentSize.y > 0, "[Viewport.resetContentSize] contentSize.y must be greater than 0");

        this._setContentBounds(new $.Rect(0, 0, 1, contentSize.y / contentSize.x), contentSize.x);
        return this;
    },

    // deprecated
    setHomeBounds: function(bounds, contentFactor) {
        $.console.error("[Viewport.setHomeBounds] this function is deprecated; The content bounds should not be set manually.");
        this._setContentBounds(bounds, contentFactor);
    },

    // Set the viewport's content bounds
    // @param {OpenSeadragon.Rect} bounds - the new bounds in viewport coordinates
    // without rotation
    // @param {Number} contentFactor - how many content units per viewport unit
    // @fires OpenSeadragon.Viewer.event:reset-size
    // @private
    _setContentBounds: function(bounds, contentFactor) {
        $.console.assert(bounds, "[Viewport._setContentBounds] bounds is required");
        $.console.assert(bounds instanceof $.Rect, "[Viewport._setContentBounds] bounds must be an OpenSeadragon.Rect");
        $.console.assert(bounds.width > 0, "[Viewport._setContentBounds] bounds.width must be greater than 0");
        $.console.assert(bounds.height > 0, "[Viewport._setContentBounds] bounds.height must be greater than 0");

        this._contentBoundsNoRotate = bounds.clone();
        this._contentSizeNoRotate = this._contentBoundsNoRotate.getSize().times(
            contentFactor);

        this._contentBounds = bounds.rotate(this.getRotation()).getBoundingBox();
        this._contentSize = this._contentBounds.getSize().times(contentFactor);
        this._contentAspectRatio = this._contentSize.x / this._contentSize.y;

        if (this.viewer) {
            /**
             * Raised when the viewer's content size or home bounds are reset
             * (see {@link OpenSeadragon.Viewport#resetContentSize}).
             *
             * @event reset-size
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
             * @property {OpenSeadragon.Point} contentSize
             * @property {OpenSeadragon.Rect} contentBounds - Content bounds.
             * @property {OpenSeadragon.Rect} homeBounds - Content bounds.
             * Deprecated use contentBounds instead.
             * @property {Number} contentFactor
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent('reset-size', {
                contentSize: this._contentSizeNoRotate.clone(),
                contentFactor: contentFactor,
                homeBounds: this._contentBoundsNoRotate.clone(),
                contentBounds: this._contentBounds.clone()
            });
        }
    },

    /**
     * Returns the home zoom in "viewport zoom" value.
     * @function
     * @returns {Number} The home zoom in "viewport zoom".
     */
    getHomeZoom: function() {
        if (this.defaultZoomLevel) {
            return this.defaultZoomLevel;
        }

        var aspectFactor = this._contentAspectRatio / this.getAspectRatio();
        var output;
        if (this.homeFillsViewer) { // fill the viewer and clip the image
            output = aspectFactor >= 1 ? aspectFactor : 1;
        } else {
            output = aspectFactor >= 1 ? 1 : aspectFactor;
        }

        return output / this._contentBounds.width;
    },

    /**
     * Returns the home bounds in viewport coordinates.
     * @function
     * @returns {OpenSeadragon.Rect} The home bounds in vewport coordinates.
     */
    getHomeBounds: function() {
        return this.getHomeBoundsNoRotate().rotate(-this.getRotation());
    },

    /**
     * Returns the home bounds in viewport coordinates.
     * This method ignores the viewport rotation. Use
     * {@link OpenSeadragon.Viewport#getHomeBounds} to take it into account.
     * @function
     * @returns {OpenSeadragon.Rect} The home bounds in vewport coordinates.
     */
    getHomeBoundsNoRotate: function() {
        var center = this._contentBounds.getCenter();
        var width  = 1.0 / this.getHomeZoom();
        var height = width / this.getAspectRatio();

        return new $.Rect(
            center.x - (width / 2.0),
            center.y - (height / 2.0),
            width,
            height
        );
    },

    /**
     * @function
     * @param {Boolean} immediately
     * @fires OpenSeadragon.Viewer.event:home
     */
    goHome: function(immediately) {
        if (this.viewer) {
            /**
             * Raised when the "home" operation occurs (see {@link OpenSeadragon.Viewport#goHome}).
             *
             * @event home
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
             * @property {Boolean} immediately
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent('home', {
                immediately: immediately
            });
        }
        return this.fitBounds(this.getHomeBounds(), immediately);
    },

    /**
     * @function
     */
    getMinZoom: function() {
        var homeZoom = this.getHomeZoom(),
            zoom = this.minZoomLevel ?
            this.minZoomLevel :
                this.minZoomImageRatio * homeZoom;

        return zoom;
    },

    /**
     * @function
     */
    getMaxZoom: function() {
        var zoom = this.maxZoomLevel;
        if (!zoom) {
            zoom = this._contentSize.x * this.maxZoomPixelRatio / this._containerInnerSize.x;
            zoom /= this._contentBounds.width;
        }

        return Math.max( zoom, this.getHomeZoom() );
    },

    /**
     * @function
     */
    getAspectRatio: function() {
        return this._containerInnerSize.x / this._containerInnerSize.y;
    },

    /**
     * @function
     * @returns {OpenSeadragon.Point} The size of the container, in screen coordinates.
     */
    getContainerSize: function() {
        return new $.Point(
            this.containerSize.x,
            this.containerSize.y
        );
    },

    /**
     * The margins push the "home" region in from the sides by the specified amounts.
     * @function
     * @returns {Object} Properties (Numbers, in screen coordinates): left, top, right, bottom.
     */
    getMargins: function() {
        return $.extend({}, this._margins); // Make a copy so we are not returning our original
    },

    /**
     * The margins push the "home" region in from the sides by the specified amounts.
     * @function
     * @param {Object} margins - Properties (Numbers, in screen coordinates): left, top, right, bottom.
     */
    setMargins: function(margins) {
        $.console.assert($.type(margins) === 'object', '[Viewport.setMargins] margins must be an object');

        this._margins = $.extend({
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        }, margins);

        this._updateContainerInnerSize();
        if (this.viewer) {
            this.viewer.forceRedraw();
        }
    },

    /**
     * Returns the bounds of the visible area in viewport coordinates.
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     * @returns {OpenSeadragon.Rect} The location you are zoomed/panned to, in viewport coordinates.
     */
    getBounds: function(current) {
        return this.getBoundsNoRotate(current).rotate(-this.getRotation(current));
    },

    /**
     * Returns the bounds of the visible area in viewport coordinates.
     * This method ignores the viewport rotation. Use
     * {@link OpenSeadragon.Viewport#getBounds} to take it into account.
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     * @returns {OpenSeadragon.Rect} The location you are zoomed/panned to, in viewport coordinates.
     */
    getBoundsNoRotate: function(current) {
        var center = this.getCenter(current);
        var width  = 1.0 / this.getZoom(current);
        var height = width / this.getAspectRatio();

        return new $.Rect(
            center.x - (width / 2.0),
            center.y - (height / 2.0),
            width,
            height
        );
    },

    /**
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     * @returns {OpenSeadragon.Rect} The location you are zoomed/panned to,
     * including the space taken by margins, in viewport coordinates.
     */
    getBoundsWithMargins: function(current) {
        return this.getBoundsNoRotateWithMargins(current).rotate(
            -this.getRotation(current), this.getCenter(current));
    },

    /**
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     * @returns {OpenSeadragon.Rect} The location you are zoomed/panned to,
     * including the space taken by margins, in viewport coordinates.
     */
    getBoundsNoRotateWithMargins: function(current) {
        var bounds = this.getBoundsNoRotate(current);
        var factor = this._containerInnerSize.x * this.getZoom(current);
        bounds.x -= this._margins.left / factor;
        bounds.y -= this._margins.top / factor;
        bounds.width += (this._margins.left + this._margins.right) / factor;
        bounds.height += (this._margins.top + this._margins.bottom) / factor;
        return bounds;
    },

    /**
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     */
    getCenter: function( current ) {
        var centerCurrent = new $.Point(
                this.centerSpringX.current.value,
                this.centerSpringY.current.value
            ),
            centerTarget = new $.Point(
                this.centerSpringX.target.value,
                this.centerSpringY.target.value
            ),
            oldZoomPixel,
            zoom,
            width,
            height,
            bounds,
            newZoomPixel,
            deltaZoomPixels,
            deltaZoomPoints;

        if ( current ) {
            return centerCurrent;
        } else if ( !this.zoomPoint ) {
            return centerTarget;
        }

        oldZoomPixel = this.pixelFromPoint(this.zoomPoint, true);

        zoom    = this.getZoom();
        width   = 1.0 / zoom;
        height  = width / this.getAspectRatio();
        bounds  = new $.Rect(
            centerCurrent.x - width / 2.0,
            centerCurrent.y - height / 2.0,
            width,
            height
        );

        newZoomPixel = this._pixelFromPoint(this.zoomPoint, bounds);
        deltaZoomPixels = newZoomPixel.minus( oldZoomPixel ).rotate(-this.getRotation(true));
        deltaZoomPoints = deltaZoomPixels.divide( this._containerInnerSize.x * zoom );

        return centerTarget.plus( deltaZoomPoints );
    },

    /**
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     */
    getZoom: function( current ) {
        if ( current ) {
            return this.zoomSpring.current.value;
        } else {
            return this.zoomSpring.target.value;
        }
    },

    // private
    _applyZoomConstraints: function(zoom) {
        return Math.max(
            Math.min(zoom, this.getMaxZoom()),
            this.getMinZoom());
    },

    /**
     * @function
     * @private
     * @param {OpenSeadragon.Rect} bounds
     * @returns {OpenSeadragon.Rect} constrained bounds.
     */
    _applyBoundaryConstraints: function(bounds) {
        var newBounds = this.viewportToViewerElementRectangle(bounds).getBoundingBox();
        var cb = this.viewportToViewerElementRectangle(this._contentBoundsNoRotate).getBoundingBox();

        var xConstrained = false;
        var yConstrained = false;

        if (this.wrapHorizontal) {
            //do nothing
        } else {
            var boundsRight = newBounds.x + newBounds.width;
            var contentRight = cb.x + cb.width;

            var horizontalThreshold, leftDx, rightDx;
            if (newBounds.width > cb.width) {
                horizontalThreshold = this.visibilityRatio * cb.width;
            } else {
                horizontalThreshold = this.visibilityRatio * newBounds.width;
            }

            leftDx = cb.x - boundsRight + horizontalThreshold;
            rightDx = contentRight - newBounds.x - horizontalThreshold;
            if (horizontalThreshold > cb.width) {
                newBounds.x += (leftDx + rightDx) / 2;
                xConstrained = true;
            } else if (rightDx < 0) {
                newBounds.x += rightDx;
                xConstrained = true;
            } else if (leftDx > 0) {
                newBounds.x += leftDx;
                xConstrained = true;
            }

        }

        if (this.wrapVertical) {
            //do nothing
        } else {
            var boundsBottom = newBounds.y + newBounds.height;
            var contentBottom = cb.y + cb.height;

            var verticalThreshold, topDy, bottomDy;
            if (newBounds.height > cb.height) {
                verticalThreshold = this.visibilityRatio * cb.height;
            } else{
                verticalThreshold = this.visibilityRatio * newBounds.height;
            }

            topDy = cb.y - boundsBottom + verticalThreshold;
            bottomDy = contentBottom - newBounds.y - verticalThreshold;
            if (verticalThreshold > cb.height) {
                newBounds.y += (topDy + bottomDy) / 2;
                yConstrained = true;
            } else if (bottomDy < 0) {
                newBounds.y += bottomDy;
                yConstrained = true;
            } else if (topDy > 0) {
                newBounds.y += topDy;
                yConstrained = true;
            }

        }

        var constraintApplied = xConstrained || yConstrained;
        var newViewportBounds = constraintApplied ? this.viewerElementToViewportRectangle(newBounds) : bounds.clone();
        newViewportBounds.xConstrained = xConstrained;
        newViewportBounds.yConstrained = yConstrained;
        newViewportBounds.constraintApplied = constraintApplied;

        return newViewportBounds;
    },

    /**
     * @function
     * @private
     * @param {Boolean} [immediately=false] - whether the function that triggered this event was
     * called with the "immediately" flag
     */
    _raiseConstraintsEvent: function(immediately) {
        if (this.viewer) {
            /**
             * Raised when the viewport constraints are applied (see {@link OpenSeadragon.Viewport#applyConstraints}).
             *
             * @event constrain
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
             * @property {Boolean} immediately - whether the function that triggered this event was
             * called with the "immediately" flag
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent( 'constrain', {
                immediately: immediately
            });
        }
    },

    /**
     * Enforces the minZoom, maxZoom and visibilityRatio constraints by
     * zooming and panning to the closest acceptable zoom and location.
     * @function
     * @param {Boolean} [immediately=false]
     * @returns {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:constrain if constraints were applied
     */
    applyConstraints: function(immediately) {
        var actualZoom = this.getZoom();
        var constrainedZoom = this._applyZoomConstraints(actualZoom);

        if (actualZoom !== constrainedZoom) {
            this.zoomTo(constrainedZoom, this.zoomPoint, immediately);
        }

        var constrainedBounds = this.getConstrainedBounds(false);

        if(constrainedBounds.constraintApplied){
            this.fitBounds(constrainedBounds, immediately);
            this._raiseConstraintsEvent(immediately);
        }

        return this;
    },

    /**
     * Equivalent to {@link OpenSeadragon.Viewport#applyConstraints}
     * @function
     * @param {Boolean} [immediately=false]
     * @returns {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:constrain
     */
    ensureVisible: function(immediately) {
        return this.applyConstraints(immediately);
    },

    /**
     * @function
     * @private
     * @param {OpenSeadragon.Rect} bounds
     * @param {Object} options (immediately=false, constraints=false)
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
    _fitBounds: function(bounds, options) {
        options = options || {};
        var immediately = options.immediately || false;
        var constraints = options.constraints || false;

        var aspect = this.getAspectRatio();
        var center = bounds.getCenter();

        // Compute width and height of bounding box.
        var newBounds = new $.Rect(
            bounds.x,
            bounds.y,
            bounds.width,
            bounds.height,
            bounds.degrees + this.getRotation())
            .getBoundingBox();

        if (newBounds.getAspectRatio() >= aspect) {
            newBounds.height = newBounds.width / aspect;
        } else {
            newBounds.width = newBounds.height * aspect;
        }

        // Compute x and y from width, height and center position
        newBounds.x = center.x - newBounds.width / 2;
        newBounds.y = center.y - newBounds.height / 2;
        var newZoom = 1.0 / newBounds.width;

        if (immediately) {
            this.panTo(center, true);
            this.zoomTo(newZoom, null, true);
            if(constraints){
                this.applyConstraints(true);
            }
            return this;
        }

        var currentCenter = this.getCenter(true);
        var currentZoom = this.getZoom(true);
        this.panTo(currentCenter, true);
        this.zoomTo(currentZoom, null, true);

        var oldBounds = this.getBounds();
        var oldZoom   = this.getZoom();

        if (oldZoom === 0 || Math.abs(newZoom / oldZoom - 1) < 0.00000001) {
            this.zoomTo(newZoom, null, true);
            this.panTo(center, immediately);
            if(constraints){
                this.applyConstraints(false);
            }
            return this;
        }

        if(constraints){
            this.panTo(center, false);
            this.zoomTo(newZoom, null, false);

            var constrainedBounds = this.getConstrainedBounds();

            this.panTo(currentCenter, true);
            this.zoomTo(currentZoom, null, true);

            this.fitBounds(constrainedBounds);
        } else {
            var rotatedNewBounds = newBounds.rotate(-this.getRotation());
            var referencePoint = rotatedNewBounds.getTopLeft().times(newZoom)
                .minus(oldBounds.getTopLeft().times(oldZoom))
                .divide(newZoom - oldZoom);

            this.zoomTo(newZoom, referencePoint, immediately);
        }
        return this;
    },

    /**
     * Makes the viewport zoom and pan so that the specified bounds take
     * as much space as possible in the viewport.
     * Note: this method ignores the constraints (minZoom, maxZoom and
     * visibilityRatio).
     * Use {@link OpenSeadragon.Viewport#fitBoundsWithConstraints} to enforce
     * them.
     * @function
     * @param {OpenSeadragon.Rect} bounds
     * @param {Boolean} [immediately=false]
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
    fitBounds: function(bounds, immediately) {
        return this._fitBounds(bounds, {
            immediately: immediately,
            constraints: false
        });
    },

    /**
     * Makes the viewport zoom and pan so that the specified bounds take
     * as much space as possible in the viewport while enforcing the constraints
     * (minZoom, maxZoom and visibilityRatio).
     * Note: because this method enforces the constraints, part of the
     * provided bounds may end up outside of the viewport.
     * Use {@link OpenSeadragon.Viewport#fitBounds} to ignore them.
     * @function
     * @param {OpenSeadragon.Rect} bounds
     * @param {Boolean} [immediately=false]
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
    fitBoundsWithConstraints: function(bounds, immediately) {
        return this._fitBounds(bounds, {
            immediately: immediately,
            constraints: true
        });
    },

    /**
     * Zooms so the image just fills the viewer vertically.
     * @param {Boolean} immediately
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
    fitVertically: function(immediately) {
        var box = new $.Rect(
            this._contentBounds.x + (this._contentBounds.width / 2),
            this._contentBounds.y,
            0,
            this._contentBounds.height);
        return this.fitBounds(box, immediately);
    },

    /**
     * Zooms so the image just fills the viewer horizontally.
     * @param {Boolean} immediately
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
    fitHorizontally: function(immediately) {
        var box = new $.Rect(
            this._contentBounds.x,
            this._contentBounds.y + (this._contentBounds.height / 2),
            this._contentBounds.width,
            0);
        return this.fitBounds(box, immediately);
    },


    /**
     * Returns bounds taking constraints into account
     * Added to improve constrained panning
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     * @returns {OpenSeadragon.Rect} The bounds in viewport coordinates after applying constraints. The returned $.Rect
     *                               contains additional properties constraintsApplied, xConstrained and yConstrained.
     *                               These flags indicate whether the viewport bounds were modified by the constraints
     *                               of the viewer rectangle, and in which dimension(s).
     */
    getConstrainedBounds: function(current) {
        var bounds,
            constrainedBounds;

        bounds = this.getBounds(current);

        constrainedBounds = this._applyBoundaryConstraints(bounds);

        return constrainedBounds;
    },

    /**
     * @function
     * @param {OpenSeadragon.Point} delta
     * @param {Boolean} immediately
     * @returns {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:pan
     */
    panBy: function( delta, immediately ) {
        var center = new $.Point(
            this.centerSpringX.target.value,
            this.centerSpringY.target.value
        );
        return this.panTo( center.plus( delta ), immediately );
    },

    /**
     * @function
     * @param {OpenSeadragon.Point} center
     * @param {Boolean} immediately
     * @returns {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:pan
     */
    panTo: function( center, immediately ) {
        if ( immediately ) {
            this.centerSpringX.resetTo( center.x );
            this.centerSpringY.resetTo( center.y );
        } else {
            this.centerSpringX.springTo( center.x );
            this.centerSpringY.springTo( center.y );
        }

        if( this.viewer ){
            /**
             * Raised when the viewport is panned (see {@link OpenSeadragon.Viewport#panBy} and {@link OpenSeadragon.Viewport#panTo}).
             *
             * @event pan
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
             * @property {OpenSeadragon.Point} center
             * @property {Boolean} immediately
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent( 'pan', {
                center: center,
                immediately: immediately
            });
        }

        return this;
    },

    /**
     * @function
     * @returns {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:zoom
     */
    zoomBy: function(factor, refPoint, immediately) {
        return this.zoomTo(
            this.zoomSpring.target.value * factor, refPoint, immediately);
    },

    /**
     * Zooms to the specified zoom level
     * @function
     * @param {Number} zoom The zoom level to zoom to.
     * @param {OpenSeadragon.Point} [refPoint] The point which will stay at
     * the same screen location. Defaults to the viewport center.
     * @param {Boolean} [immediately=false]
     * @returns {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:zoom
     */
    zoomTo: function(zoom, refPoint, immediately) {
        var _this = this;

        this.zoomPoint = refPoint instanceof $.Point &&
            !isNaN(refPoint.x) &&
            !isNaN(refPoint.y) ?
            refPoint :
            null;

        if (immediately) {
            this._adjustCenterSpringsForZoomPoint(function() {
                _this.zoomSpring.resetTo(zoom);
            });
        } else {
            this.zoomSpring.springTo(zoom);
        }

        if (this.viewer) {
            /**
             * Raised when the viewport zoom level changes (see {@link OpenSeadragon.Viewport#zoomBy} and {@link OpenSeadragon.Viewport#zoomTo}).
             *
             * @event zoom
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
             * @property {Number} zoom
             * @property {OpenSeadragon.Point} refPoint
             * @property {Boolean} immediately
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent('zoom', {
                zoom: zoom,
                refPoint: refPoint,
                immediately: immediately
            });
        }

        return this;
    },

    /**
     * Rotates this viewport to the angle specified.
     * @function
     * @param {Number} degrees The degrees to set the rotation to.
     * @param {Boolean} [immediately=false] Whether to animate to the new angle
     * or rotate immediately.
     * * @returns {OpenSeadragon.Viewport} Chainable.
     */
    setRotation: function(degrees, immediately) {
        return this.rotateTo(degrees, null, immediately);
    },

    /**
     * Gets the current rotation in degrees.
     * @function
     * @param {Boolean} [current=false] True for current rotation, false for target.
     * @returns {Number} The current rotation in degrees.
     */
    getRotation: function(current) {
        return current ?
            this.degreesSpring.current.value :
            this.degreesSpring.target.value;
    },

    /**
     * Rotates this viewport to the angle specified around a pivot point. Alias for rotateTo.
     * @function
     * @param {Number} degrees The degrees to set the rotation to.
     * @param {OpenSeadragon.Point} [pivot] (Optional) point in viewport coordinates
     * around which the rotation should be performed. Defaults to the center of the viewport.
     * @param {Boolean} [immediately=false] Whether to animate to the new angle
     * or rotate immediately.
     * * @returns {OpenSeadragon.Viewport} Chainable.
     */
    setRotationWithPivot: function(degrees, pivot, immediately) {
        return this.rotateTo(degrees, pivot, immediately);
    },

    /**
     * Rotates this viewport to the angle specified.
     * @function
     * @param {Number} degrees The degrees to set the rotation to.
     * @param {OpenSeadragon.Point} [pivot] (Optional) point in viewport coordinates
     * around which the rotation should be performed. Defaults to the center of the viewport.
     * @param {Boolean} [immediately=false] Whether to animate to the new angle
     * or rotate immediately.
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
    rotateTo: function(degrees, pivot, immediately){
        if (!this.viewer || !this.viewer.drawer.canRotate()) {
            return this;
        }

        if (this.degreesSpring.target.value === degrees &&
            this.degreesSpring.isAtTargetValue()) {
            return this;
        }
        this.rotationPivot = pivot instanceof $.Point &&
            !isNaN(pivot.x) &&
            !isNaN(pivot.y) ?
            pivot :
            null;
        if (immediately) {
            if(this.rotationPivot){
                var changeInDegrees = degrees - this._oldDegrees;
                if(!changeInDegrees){
                    this.rotationPivot = null;
                    return this;
                }
                this._rotateAboutPivot(degrees);
            } else{
                this.degreesSpring.resetTo(degrees);
            }
        } else {
            var normalizedFrom = $.positiveModulo(this.degreesSpring.current.value, 360);
            var normalizedTo = $.positiveModulo(degrees, 360);
            var diff = normalizedTo - normalizedFrom;
            if (diff > 180) {
                normalizedTo -= 360;
            } else if (diff < -180) {
                normalizedTo += 360;
            }

            var reverseDiff = normalizedFrom - normalizedTo;
            this.degreesSpring.resetTo(degrees + reverseDiff);
            this.degreesSpring.springTo(degrees);
        }

        this._setContentBounds(
            this.viewer.world.getHomeBounds(),
            this.viewer.world.getContentFactor());
        this.viewer.forceRedraw();

        /**
         * Raised when rotation has been changed.
         *
         * @event rotate
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {Number} degrees - The number of degrees the rotation was set to.
         * @property {Boolean} immediately - Whether the rotation happened immediately or was animated
         * @property {OpenSeadragon.Point} pivot - The point in viewport coordinates around which the rotation (if any) happened
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.viewer.raiseEvent('rotate', {degrees: degrees, immediately: !!immediately, pivot: this.rotationPivot || this.getCenter()});
        return this;
    },

    /**
     * Rotates this viewport by the angle specified.
     * @function
     * @param {Number} degrees The degrees by which to rotate the viewport.
     * @param {OpenSeadragon.Point} [pivot] (Optional) point in viewport coordinates
     * around which the rotation should be performed. Defaults to the center of the viewport.
     * * @param {Boolean} [immediately=false] Whether to animate to the new angle
     * or rotate immediately.
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
    rotateBy: function(degrees, pivot, immediately){
        return this.rotateTo(this.degreesSpring.target.value + degrees, pivot, immediately);
    },

    /**
     * @function
     * @returns {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:resize
     */
    resize: function( newContainerSize, maintain ) {
        var oldBounds = this.getBoundsNoRotate(),
            newBounds = oldBounds,
            widthDeltaFactor;

        this.containerSize.x = newContainerSize.x;
        this.containerSize.y = newContainerSize.y;

        this._updateContainerInnerSize();

        if ( maintain ) {
            // TODO: widthDeltaFactor will always be 1; probably not what's intended
            widthDeltaFactor = newContainerSize.x / this.containerSize.x;
            newBounds.width  = oldBounds.width * widthDeltaFactor;
            newBounds.height = newBounds.width / this.getAspectRatio();
        }

        if( this.viewer ){
            /**
             * Raised when the viewer is resized (see {@link OpenSeadragon.Viewport#resize}).
             *
             * @event resize
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
             * @property {OpenSeadragon.Point} newContainerSize
             * @property {Boolean} maintain
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent( 'resize', {
                newContainerSize: newContainerSize,
                maintain: maintain
            });
        }

        return this.fitBounds( newBounds, true );
    },

    // private
    _updateContainerInnerSize: function() {
        this._containerInnerSize = new $.Point(
            Math.max(1, this.containerSize.x - (this._margins.left + this._margins.right)),
            Math.max(1, this.containerSize.y - (this._margins.top + this._margins.bottom))
        );
    },

    /**
     * Update the zoom, degrees, and center (X and Y) springs.
     * @function
     * @returns {Boolean} True if any change has been made, false otherwise.
     */
    update: function() {
        var _this = this;
        this._adjustCenterSpringsForZoomPoint(function() {
            _this.zoomSpring.update();
        });
        if(this.degreesSpring.isAtTargetValue()){
            this.rotationPivot = null;
        }
        this.centerSpringX.update();
        this.centerSpringY.update();

        if(this.rotationPivot){
            this._rotateAboutPivot(true);
        }
        else{
            this.degreesSpring.update();
        }


        var changed = this.centerSpringX.current.value !== this._oldCenterX ||
            this.centerSpringY.current.value !== this._oldCenterY ||
            this.zoomSpring.current.value !== this._oldZoom ||
            this.degreesSpring.current.value !== this._oldDegrees;


        this._oldCenterX = this.centerSpringX.current.value;
        this._oldCenterY = this.centerSpringY.current.value;
        this._oldZoom    = this.zoomSpring.current.value;
        this._oldDegrees = this.degreesSpring.current.value;

        return changed;
    },

    // private - pass true to use spring, or a number for degrees for immediate rotation
    _rotateAboutPivot: function(degreesOrUseSpring){
        var useSpring = degreesOrUseSpring === true;

        var delta = this.rotationPivot.minus(this.getCenter());
        this.centerSpringX.shiftBy(delta.x);
        this.centerSpringY.shiftBy(delta.y);

        if(useSpring){
            this.degreesSpring.update();
        } else {
            this.degreesSpring.resetTo(degreesOrUseSpring);
        }

        var changeInDegrees = this.degreesSpring.current.value - this._oldDegrees;
        var rdelta = delta.rotate(changeInDegrees * -1).times(-1);
        this.centerSpringX.shiftBy(rdelta.x);
        this.centerSpringY.shiftBy(rdelta.y);
    },

    // private
    _adjustCenterSpringsForZoomPoint: function(zoomSpringHandler) {
        if (this.zoomPoint) {
            var oldZoomPixel = this.pixelFromPoint(this.zoomPoint, true);
            zoomSpringHandler();
            var newZoomPixel = this.pixelFromPoint(this.zoomPoint, true);

            var deltaZoomPixels = newZoomPixel.minus(oldZoomPixel);
            var deltaZoomPoints = this.deltaPointsFromPixels(
                deltaZoomPixels, true);

            this.centerSpringX.shiftBy(deltaZoomPoints.x);
            this.centerSpringY.shiftBy(deltaZoomPoints.y);

            if (this.zoomSpring.isAtTargetValue()) {
                this.zoomPoint = null;
            }
        } else {
            zoomSpringHandler();
        }
    },

    /**
     * Convert a delta (translation vector) from viewport coordinates to pixels
     * coordinates. This method does not take rotation into account.
     * Consider using deltaPixelsFromPoints if you need to account for rotation.
     * @param {OpenSeadragon.Point} deltaPoints - The translation vector to convert.
     * @param {Boolean} [current=false] - Pass true for the current location;
     * defaults to false (target location).
     * @returns {OpenSeadragon.Point}
     */
    deltaPixelsFromPointsNoRotate: function(deltaPoints, current) {
        return deltaPoints.times(
            this._containerInnerSize.x * this.getZoom(current)
        );
    },

    /**
     * Convert a delta (translation vector) from viewport coordinates to pixels
     * coordinates.
     * @param {OpenSeadragon.Point} deltaPoints - The translation vector to convert.
     * @param {Boolean} [current=false] - Pass true for the current location;
     * defaults to false (target location).
     * @returns {OpenSeadragon.Point}
     */
    deltaPixelsFromPoints: function(deltaPoints, current) {
        return this.deltaPixelsFromPointsNoRotate(
            deltaPoints.rotate(this.getRotation(current)),
            current);
    },

    /**
     * Convert a delta (translation vector) from pixels coordinates to viewport
     * coordinates. This method does not take rotation into account.
     * Consider using deltaPointsFromPixels if you need to account for rotation.
     * @param {OpenSeadragon.Point} deltaPixels - The translation vector to convert.
     * @param {Boolean} [current=false] - Pass true for the current location;
     * defaults to false (target location).
     * @returns {OpenSeadragon.Point}
     */
    deltaPointsFromPixelsNoRotate: function(deltaPixels, current) {
        return deltaPixels.divide(
            this._containerInnerSize.x * this.getZoom(current)
        );
    },

    /**
     * Convert a delta (translation vector) from pixels coordinates to viewport
     * coordinates.
     * @param {OpenSeadragon.Point} deltaPixels - The translation vector to convert.
     * @param {Boolean} [current=false] - Pass true for the current location;
     * defaults to false (target location).
     * @returns {OpenSeadragon.Point}
     */
    deltaPointsFromPixels: function(deltaPixels, current) {
        return this.deltaPointsFromPixelsNoRotate(deltaPixels, current)
            .rotate(-this.getRotation(current));
    },

    /**
     * Convert viewport coordinates to pixels coordinates.
     * This method does not take rotation into account.
     * Consider using pixelFromPoint if you need to account for rotation.
     * @param {OpenSeadragon.Point} point the viewport coordinates
     * @param {Boolean} [current=false] - Pass true for the current location;
     * defaults to false (target location).
     * @returns {OpenSeadragon.Point}
     */
    pixelFromPointNoRotate: function(point, current) {
        return this._pixelFromPointNoRotate(
            point, this.getBoundsNoRotate(current));
    },

    /**
     * Convert viewport coordinates to pixel coordinates.
     * @param {OpenSeadragon.Point} point the viewport coordinates
     * @param {Boolean} [current=false] - Pass true for the current location;
     * defaults to false (target location).
     * @returns {OpenSeadragon.Point}
     */
    pixelFromPoint: function(point, current) {
        return this._pixelFromPoint(point, this.getBoundsNoRotate(current));
    },

    // private
    _pixelFromPointNoRotate: function(point, bounds) {
        return point.minus(
            bounds.getTopLeft()
        ).times(
            this._containerInnerSize.x / bounds.width
        ).plus(
            new $.Point(this._margins.left, this._margins.top)
        );
    },

    // private
    _pixelFromPoint: function(point, bounds) {
        return this._pixelFromPointNoRotate(
            point.rotate(this.getRotation(true), this.getCenter(true)),
            bounds);
    },

    /**
     * Convert pixel coordinates to viewport coordinates.
     * This method does not take rotation into account.
     * Consider using pointFromPixel if you need to account for rotation.
     * @param {OpenSeadragon.Point} pixel Pixel coordinates
     * @param {Boolean} [current=false] - Pass true for the current location;
     * defaults to false (target location).
     * @returns {OpenSeadragon.Point}
     */
    pointFromPixelNoRotate: function(pixel, current) {
        var bounds = this.getBoundsNoRotate(current);
        return pixel.minus(
            new $.Point(this._margins.left, this._margins.top)
        ).divide(
            this._containerInnerSize.x / bounds.width
        ).plus(
            bounds.getTopLeft()
        );
    },

    /**
     * Convert pixel coordinates to viewport coordinates.
     * @param {OpenSeadragon.Point} pixel Pixel coordinates
     * @param {Boolean} [current=false] - Pass true for the current location;
     * defaults to false (target location).
     * @returns {OpenSeadragon.Point}
     */
    pointFromPixel: function(pixel, current) {
        return this.pointFromPixelNoRotate(pixel, current).rotate(
            -this.getRotation(current),
            this.getCenter(current)
        );
    },

    // private
    _viewportToImageDelta: function( viewerX, viewerY ) {
        var scale = this._contentBoundsNoRotate.width;
        return new $.Point(
            viewerX * this._contentSizeNoRotate.x / scale,
            viewerY * this._contentSizeNoRotate.x / scale);
    },

    /**
     * Translates from OpenSeadragon viewer coordinate system to image coordinate system.
     * This method can be called either by passing X,Y coordinates or an
     * OpenSeadragon.Point
     * Note: not accurate with multi-image; use TiledImage.viewportToImageCoordinates instead.
     * @function
     * @param {(OpenSeadragon.Point|Number)} viewerX either a point or the X
     * coordinate in viewport coordinate system.
     * @param {Number} [viewerY] Y coordinate in viewport coordinate system.
     * @returns {OpenSeadragon.Point} a point representing the coordinates in the image.
     */
    viewportToImageCoordinates: function(viewerX, viewerY) {
        if (viewerX instanceof $.Point) {
            //they passed a point instead of individual components
            return this.viewportToImageCoordinates(viewerX.x, viewerX.y);
        }

        if (this.viewer) {
            var count = this.viewer.world.getItemCount();
            if (count > 1) {
                if (!this.silenceMultiImageWarnings) {
                    $.console.error('[Viewport.viewportToImageCoordinates] is not accurate ' +
                        'with multi-image; use TiledImage.viewportToImageCoordinates instead.');
                }
            } else if (count === 1) {
                // It is better to use TiledImage.viewportToImageCoordinates
                // because this._contentBoundsNoRotate can not be relied on
                // with clipping.
                var item = this.viewer.world.getItemAt(0);
                return item.viewportToImageCoordinates(viewerX, viewerY, true);
            }
        }

        return this._viewportToImageDelta(
            viewerX - this._contentBoundsNoRotate.x,
            viewerY - this._contentBoundsNoRotate.y);
    },

    // private
    _imageToViewportDelta: function( imageX, imageY ) {
        var scale = this._contentBoundsNoRotate.width;
        return new $.Point(
            imageX / this._contentSizeNoRotate.x * scale,
            imageY / this._contentSizeNoRotate.x * scale);
    },

    /**
     * Translates from image coordinate system to OpenSeadragon viewer coordinate system
     * This method can be called either by passing X,Y coordinates or an
     * OpenSeadragon.Point
     * Note: not accurate with multi-image; use TiledImage.imageToViewportCoordinates instead.
     * @function
     * @param {(OpenSeadragon.Point | Number)} imageX the point or the
     * X coordinate in image coordinate system.
     * @param {Number} [imageY] Y coordinate in image coordinate system.
     * @returns {OpenSeadragon.Point} a point representing the coordinates in the viewport.
     */
    imageToViewportCoordinates: function(imageX, imageY) {
        if (imageX instanceof $.Point) {
            //they passed a point instead of individual components
            return this.imageToViewportCoordinates(imageX.x, imageX.y);
        }

        if (this.viewer) {
            var count = this.viewer.world.getItemCount();
            if (count > 1) {
                if (!this.silenceMultiImageWarnings) {
                    $.console.error('[Viewport.imageToViewportCoordinates] is not accurate ' +
                        'with multi-image; use TiledImage.imageToViewportCoordinates instead.');
                }
            } else if (count === 1) {
                // It is better to use TiledImage.viewportToImageCoordinates
                // because this._contentBoundsNoRotate can not be relied on
                // with clipping.
                var item = this.viewer.world.getItemAt(0);
                return item.imageToViewportCoordinates(imageX, imageY, true);
            }
        }

        var point = this._imageToViewportDelta(imageX, imageY);
        point.x += this._contentBoundsNoRotate.x;
        point.y += this._contentBoundsNoRotate.y;
        return point;
    },

    /**
     * Translates from a rectangle which describes a portion of the image in
     * pixel coordinates to OpenSeadragon viewport rectangle coordinates.
     * This method can be called either by passing X,Y,width,height or an
     * OpenSeadragon.Rect
     * Note: not accurate with multi-image; use TiledImage.imageToViewportRectangle instead.
     * @function
     * @param {(OpenSeadragon.Rect | Number)} imageX the rectangle or the X
     * coordinate of the top left corner of the rectangle in image coordinate system.
     * @param {Number} [imageY] the Y coordinate of the top left corner of the rectangle
     * in image coordinate system.
     * @param {Number} [pixelWidth] the width in pixel of the rectangle.
     * @param {Number} [pixelHeight] the height in pixel of the rectangle.
     * @returns {OpenSeadragon.Rect} This image's bounds in viewport coordinates
     */
    imageToViewportRectangle: function(imageX, imageY, pixelWidth, pixelHeight) {
        var rect = imageX;
        if (!(rect instanceof $.Rect)) {
            //they passed individual components instead of a rectangle
            rect = new $.Rect(imageX, imageY, pixelWidth, pixelHeight);
        }

        if (this.viewer) {
            var count = this.viewer.world.getItemCount();
            if (count > 1) {
                if (!this.silenceMultiImageWarnings) {
                    $.console.error('[Viewport.imageToViewportRectangle] is not accurate ' +
                       'with multi-image; use TiledImage.imageToViewportRectangle instead.');
                }
            } else if (count === 1) {
                // It is better to use TiledImage.imageToViewportRectangle
                // because this._contentBoundsNoRotate can not be relied on
                // with clipping.
                var item = this.viewer.world.getItemAt(0);
                return item.imageToViewportRectangle(
                    imageX, imageY, pixelWidth, pixelHeight, true);
            }
        }

        var coordA = this.imageToViewportCoordinates(rect.x, rect.y);
        var coordB = this._imageToViewportDelta(rect.width, rect.height);
        return new $.Rect(
            coordA.x,
            coordA.y,
            coordB.x,
            coordB.y,
            rect.degrees
        );
    },

    /**
     * Translates from a rectangle which describes a portion of
     * the viewport in point coordinates to image rectangle coordinates.
     * This method can be called either by passing X,Y,width,height or an
     * OpenSeadragon.Rect
     * Note: not accurate with multi-image; use TiledImage.viewportToImageRectangle instead.
     * @function
     * @param {(OpenSeadragon.Rect | Number)} viewerX either a rectangle or
     * the X coordinate of the top left corner of the rectangle in viewport
     * coordinate system.
     * @param {Number} [viewerY] the Y coordinate of the top left corner of the rectangle
     * in viewport coordinate system.
     * @param {Number} [pointWidth] the width of the rectangle in viewport coordinate system.
     * @param {Number} [pointHeight] the height of the rectangle in viewport coordinate system.
     */
    viewportToImageRectangle: function(viewerX, viewerY, pointWidth, pointHeight) {
        var rect = viewerX;
        if (!(rect instanceof $.Rect)) {
            //they passed individual components instead of a rectangle
            rect = new $.Rect(viewerX, viewerY, pointWidth, pointHeight);
        }

        if (this.viewer) {
            var count = this.viewer.world.getItemCount();
            if (count > 1) {
                if (!this.silenceMultiImageWarnings) {
                    $.console.error('[Viewport.viewportToImageRectangle] is not accurate ' +
                        'with multi-image; use TiledImage.viewportToImageRectangle instead.');
                }
            } else if (count === 1) {
                // It is better to use TiledImage.viewportToImageCoordinates
                // because this._contentBoundsNoRotate can not be relied on
                // with clipping.
                var item = this.viewer.world.getItemAt(0);
                return item.viewportToImageRectangle(
                    viewerX, viewerY, pointWidth, pointHeight, true);
            }
        }

        var coordA = this.viewportToImageCoordinates(rect.x, rect.y);
        var coordB = this._viewportToImageDelta(rect.width, rect.height);
        return new $.Rect(
            coordA.x,
            coordA.y,
            coordB.x,
            coordB.y,
            rect.degrees
        );
    },

    /**
     * Convert pixel coordinates relative to the viewer element to image
     * coordinates.
     * Note: not accurate with multi-image.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
    viewerElementToImageCoordinates: function( pixel ) {
        var point = this.pointFromPixel( pixel, true );
        return this.viewportToImageCoordinates( point );
    },

    /**
     * Convert pixel coordinates relative to the image to
     * viewer element coordinates.
     * Note: not accurate with multi-image.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
    imageToViewerElementCoordinates: function( pixel ) {
        var point = this.imageToViewportCoordinates( pixel );
        return this.pixelFromPoint( point, true );
    },

    /**
     * Convert pixel coordinates relative to the window to image coordinates.
     * Note: not accurate with multi-image.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
    windowToImageCoordinates: function(pixel) {
        $.console.assert(this.viewer,
            "[Viewport.windowToImageCoordinates] the viewport must have a viewer.");
        var viewerCoordinates = pixel.minus(
                $.getElementPosition(this.viewer.element));
        return this.viewerElementToImageCoordinates(viewerCoordinates);
    },

    /**
     * Convert image coordinates to pixel coordinates relative to the window.
     * Note: not accurate with multi-image.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
    imageToWindowCoordinates: function(pixel) {
        $.console.assert(this.viewer,
            "[Viewport.imageToWindowCoordinates] the viewport must have a viewer.");
        var viewerCoordinates = this.imageToViewerElementCoordinates(pixel);
        return viewerCoordinates.plus(
                $.getElementPosition(this.viewer.element));
    },

    /**
     * Convert pixel coordinates relative to the viewer element to viewport
     * coordinates.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
    viewerElementToViewportCoordinates: function( pixel ) {
        return this.pointFromPixel( pixel, true );
    },

    /**
     * Convert viewport coordinates to pixel coordinates relative to the
     * viewer element.
     * @param {OpenSeadragon.Point} point
     * @returns {OpenSeadragon.Point}
     */
    viewportToViewerElementCoordinates: function( point ) {
        return this.pixelFromPoint( point, true );
    },

    /**
     * Convert a rectangle in pixel coordinates relative to the viewer element
     * to viewport coordinates.
     * @param {OpenSeadragon.Rect} rectangle the rectangle to convert
     * @returns {OpenSeadragon.Rect} the converted rectangle
     */
    viewerElementToViewportRectangle: function(rectangle) {
        return $.Rect.fromSummits(
            this.pointFromPixel(rectangle.getTopLeft(), true),
            this.pointFromPixel(rectangle.getTopRight(), true),
            this.pointFromPixel(rectangle.getBottomLeft(), true)
        );
    },

    /**
     * Convert a rectangle in viewport coordinates to pixel coordinates relative
     * to the viewer element.
     * @param {OpenSeadragon.Rect} rectangle the rectangle to convert
     * @returns {OpenSeadragon.Rect} the converted rectangle
     */
    viewportToViewerElementRectangle: function(rectangle) {
        return $.Rect.fromSummits(
            this.pixelFromPoint(rectangle.getTopLeft(), true),
            this.pixelFromPoint(rectangle.getTopRight(), true),
            this.pixelFromPoint(rectangle.getBottomLeft(), true)
        );
    },

    /**
     * Convert pixel coordinates relative to the window to viewport coordinates.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
    windowToViewportCoordinates: function(pixel) {
        $.console.assert(this.viewer,
            "[Viewport.windowToViewportCoordinates] the viewport must have a viewer.");
        var viewerCoordinates = pixel.minus(
                $.getElementPosition(this.viewer.element));
        return this.viewerElementToViewportCoordinates(viewerCoordinates);
    },

    /**
     * Convert viewport coordinates to pixel coordinates relative to the window.
     * @param {OpenSeadragon.Point} point
     * @returns {OpenSeadragon.Point}
     */
    viewportToWindowCoordinates: function(point) {
        $.console.assert(this.viewer,
            "[Viewport.viewportToWindowCoordinates] the viewport must have a viewer.");
        var viewerCoordinates = this.viewportToViewerElementCoordinates(point);
        return viewerCoordinates.plus(
                $.getElementPosition(this.viewer.element));
    },

    /**
     * Convert a viewport zoom to an image zoom.
     * Image zoom: ratio of the original image size to displayed image size.
     * 1 means original image size, 0.5 half size...
     * Viewport zoom: ratio of the displayed image's width to viewport's width.
     * 1 means identical width, 2 means image's width is twice the viewport's width...
     * Note: not accurate with multi-image.
     * @function
     * @param {Number} viewportZoom The viewport zoom
     * target zoom.
     * @returns {Number} imageZoom The image zoom
     */
    viewportToImageZoom: function(viewportZoom) {
        if (this.viewer) {
            var count = this.viewer.world.getItemCount();
            if (count > 1) {
                if (!this.silenceMultiImageWarnings) {
                    $.console.error('[Viewport.viewportToImageZoom] is not ' +
                        'accurate with multi-image.');
                }
            } else if (count === 1) {
                // It is better to use TiledImage.viewportToImageZoom
                // because this._contentBoundsNoRotate can not be relied on
                // with clipping.
                var item = this.viewer.world.getItemAt(0);
                return item.viewportToImageZoom(viewportZoom);
            }
        }

        var imageWidth = this._contentSizeNoRotate.x;
        var containerWidth = this._containerInnerSize.x;
        var scale = this._contentBoundsNoRotate.width;
        var viewportToImageZoomRatio = (containerWidth / imageWidth) * scale;
        return viewportZoom * viewportToImageZoomRatio;
    },

    /**
     * Convert an image zoom to a viewport zoom.
     * Image zoom: ratio of the original image size to displayed image size.
     * 1 means original image size, 0.5 half size...
     * Viewport zoom: ratio of the displayed image's width to viewport's width.
     * 1 means identical width, 2 means image's width is twice the viewport's width...
     * Note: not accurate with multi-image.
     * @function
     * @param {Number} imageZoom The image zoom
     * target zoom.
     * @returns {Number} viewportZoom The viewport zoom
     */
    imageToViewportZoom: function(imageZoom) {
        if (this.viewer) {
            var count = this.viewer.world.getItemCount();
            if (count > 1) {
                if (!this.silenceMultiImageWarnings) {
                    $.console.error('[Viewport.imageToViewportZoom] is not accurate ' +
                        'with multi-image.');
                }
            } else if (count === 1) {
                // It is better to use TiledImage.imageToViewportZoom
                // because this._contentBoundsNoRotate can not be relied on
                // with clipping.
                var item = this.viewer.world.getItemAt(0);
                return item.imageToViewportZoom(imageZoom);
            }
        }

        var imageWidth = this._contentSizeNoRotate.x;
        var containerWidth = this._containerInnerSize.x;
        var scale = this._contentBoundsNoRotate.width;
        var viewportToImageZoomRatio = (imageWidth / containerWidth) / scale;
        return imageZoom * viewportToImageZoomRatio;
    },

    /**
     * Toggles flip state and demands a new drawing on navigator and viewer objects.
     * @function
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
    toggleFlip: function() {
      this.setFlip(!this.getFlip());
      return this;
    },

    /**
     * Get flip state stored on viewport.
     * @function
     * @returns {Boolean} Flip state.
     */
    getFlip: function() {
      return this.flipped;
    },

    /**
     * Sets flip state according to the state input argument.
     * @function
     * @param {Boolean} state - Flip state to set.
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
    setFlip: function( state ) {
      if ( this.flipped === state ) {
        return this;
      }

      this.flipped = state;
      if(this.viewer.navigator){
        this.viewer.navigator.setFlip(this.getFlip());
      }
      this.viewer.forceRedraw();

      /**
       * Raised when flip state has been changed.
       *
       * @event flip
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
       * @property {Number} flipped - The flip state after this change.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */
      this.viewer.raiseEvent('flip', {flipped: state});
      return this;
    }

};

}( OpenSeadragon ));

/*
 * OpenSeadragon - TiledImage
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * You shouldn't have to create a TiledImage instance directly; get it asynchronously by
 * using {@link OpenSeadragon.Viewer#open} or {@link OpenSeadragon.Viewer#addTiledImage} instead.
 * @class TiledImage
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.EventSource
 * @classdesc Handles rendering of tiles for an {@link OpenSeadragon.Viewer}.
 * A new instance is created for each TileSource opened.
 * @param {Object} options - Configuration for this TiledImage.
 * @param {OpenSeadragon.TileSource} options.source - The TileSource that defines this TiledImage.
 * @param {OpenSeadragon.Viewer} options.viewer - The Viewer that owns this TiledImage.
 * @param {OpenSeadragon.TileCache} options.tileCache - The TileCache for this TiledImage to use.
 * @param {OpenSeadragon.Drawer} options.drawer - The Drawer for this TiledImage to draw onto.
 * @param {OpenSeadragon.ImageLoader} options.imageLoader - The ImageLoader for this TiledImage to use.
 * @param {Number} [options.x=0] - Left position, in viewport coordinates.
 * @param {Number} [options.y=0] - Top position, in viewport coordinates.
 * @param {Number} [options.width=1] - Width, in viewport coordinates.
 * @param {Number} [options.height] - Height, in viewport coordinates.
 * @param {OpenSeadragon.Rect} [options.fitBounds] The bounds in viewport coordinates
 * to fit the image into. If specified, x, y, width and height get ignored.
 * @param {OpenSeadragon.Placement} [options.fitBoundsPlacement=OpenSeadragon.Placement.CENTER]
 * How to anchor the image in the bounds if options.fitBounds is set.
 * @param {OpenSeadragon.Rect} [options.clip] - An area, in image pixels, to clip to
 * (portions of the image outside of this area will not be visible). Only works on
 * browsers that support the HTML5 canvas.
 * @param {Number} [options.springStiffness] - See {@link OpenSeadragon.Options}.
 * @param {Boolean} [options.animationTime] - See {@link OpenSeadragon.Options}.
 * @param {Number} [options.minZoomImageRatio] - See {@link OpenSeadragon.Options}.
 * @param {Boolean} [options.wrapHorizontal] - See {@link OpenSeadragon.Options}.
 * @param {Boolean} [options.wrapVertical] - See {@link OpenSeadragon.Options}.
 * @param {Boolean} [options.immediateRender] - See {@link OpenSeadragon.Options}.
 * @param {Number} [options.blendTime] - See {@link OpenSeadragon.Options}.
 * @param {Boolean} [options.alwaysBlend] - See {@link OpenSeadragon.Options}.
 * @param {Number} [options.minPixelRatio] - See {@link OpenSeadragon.Options}.
 * @param {Number} [options.smoothTileEdgesMinZoom] - See {@link OpenSeadragon.Options}.
 * @param {Boolean} [options.iOSDevice] - See {@link OpenSeadragon.Options}.
 * @param {Number} [options.opacity=1] - Set to draw at proportional opacity. If zero, images will not draw.
 * @param {Boolean} [options.preload=false] - Set true to load even when the image is hidden by zero opacity.
 * @param {String} [options.compositeOperation] - How the image is composited onto other images; see compositeOperation in {@link OpenSeadragon.Options} for possible
 values.
 * @param {Boolean} [options.debugMode] - See {@link OpenSeadragon.Options}.
 * @param {String|CanvasGradient|CanvasPattern|Function} [options.placeholderFillStyle] - See {@link OpenSeadragon.Options}.
 * @param {String|Boolean} [options.crossOriginPolicy] - See {@link OpenSeadragon.Options}.
 * @param {Boolean} [options.ajaxWithCredentials] - See {@link OpenSeadragon.Options}.
 * @param {Boolean} [options.loadTilesWithAjax]
 *      Whether to load tile data using AJAX requests.
 *      Defaults to the setting in {@link OpenSeadragon.Options}.
 * @param {Object} [options.ajaxHeaders={}]
 *      A set of headers to include when making tile AJAX requests.
 */
$.TiledImage = function( options ) {
    var _this = this;
    /**
     * The {@link OpenSeadragon.TileSource} that defines this TiledImage.
     * @member {OpenSeadragon.TileSource} source
     * @memberof OpenSeadragon.TiledImage#
     */
    $.console.assert( options.tileCache, "[TiledImage] options.tileCache is required" );
    $.console.assert( options.drawer, "[TiledImage] options.drawer is required" );
    $.console.assert( options.viewer, "[TiledImage] options.viewer is required" );
    $.console.assert( options.imageLoader, "[TiledImage] options.imageLoader is required" );
    $.console.assert( options.source, "[TiledImage] options.source is required" );
    $.console.assert(!options.clip || options.clip instanceof $.Rect,
        "[TiledImage] options.clip must be an OpenSeadragon.Rect if present");

    $.EventSource.call( this );

    this._tileCache = options.tileCache;
    delete options.tileCache;

    this._drawer = options.drawer;
    delete options.drawer;

    this._imageLoader = options.imageLoader;
    delete options.imageLoader;

    if (options.clip instanceof $.Rect) {
        this._clip = options.clip.clone();
    }

    delete options.clip;

    var x = options.x || 0;
    delete options.x;
    var y = options.y || 0;
    delete options.y;

    // Ratio of zoomable image height to width.
    this.normHeight = options.source.dimensions.y / options.source.dimensions.x;
    this.contentAspectX = options.source.dimensions.x / options.source.dimensions.y;

    var scale = 1;
    if ( options.width ) {
        scale = options.width;
        delete options.width;

        if ( options.height ) {
            $.console.error( "specifying both width and height to a tiledImage is not supported" );
            delete options.height;
        }
    } else if ( options.height ) {
        scale = options.height / this.normHeight;
        delete options.height;
    }

    var fitBounds = options.fitBounds;
    delete options.fitBounds;
    var fitBoundsPlacement = options.fitBoundsPlacement || OpenSeadragon.Placement.CENTER;
    delete options.fitBoundsPlacement;

    var degrees = options.degrees || 0;
    delete options.degrees;

    $.extend( true, this, {

        //internal state properties
        viewer:         null,
        tilesMatrix:    {},    // A '3d' dictionary [level][x][y] --> Tile.
        coverage:       {},    // A '3d' dictionary [level][x][y] --> Boolean; shows what areas have been drawn.
        loadingCoverage: {},   // A '3d' dictionary [level][x][y] --> Boolean; shows what areas are loaded or are being loaded/blended.
        lastDrawn:      [],    // An unordered list of Tiles drawn last frame.
        lastResetTime:  0,     // Last time for which the tiledImage was reset.
        _midDraw:       false, // Is the tiledImage currently updating the viewport?
        _needsDraw:     true,  // Does the tiledImage need to update the viewport again?
        _hasOpaqueTile: false,  // Do we have even one fully opaque tile?
        _tilesLoading:  0,     // The number of pending tile requests.
        //configurable settings
        springStiffness:                   $.DEFAULT_SETTINGS.springStiffness,
        animationTime:                     $.DEFAULT_SETTINGS.animationTime,
        minZoomImageRatio:                 $.DEFAULT_SETTINGS.minZoomImageRatio,
        wrapHorizontal:                    $.DEFAULT_SETTINGS.wrapHorizontal,
        wrapVertical:                      $.DEFAULT_SETTINGS.wrapVertical,
        immediateRender:                   $.DEFAULT_SETTINGS.immediateRender,
        blendTime:                         $.DEFAULT_SETTINGS.blendTime,
        alwaysBlend:                       $.DEFAULT_SETTINGS.alwaysBlend,
        minPixelRatio:                     $.DEFAULT_SETTINGS.minPixelRatio,
        smoothTileEdgesMinZoom:            $.DEFAULT_SETTINGS.smoothTileEdgesMinZoom,
        iOSDevice:                         $.DEFAULT_SETTINGS.iOSDevice,
        debugMode:                         $.DEFAULT_SETTINGS.debugMode,
        crossOriginPolicy:                 $.DEFAULT_SETTINGS.crossOriginPolicy,
        ajaxWithCredentials:               $.DEFAULT_SETTINGS.ajaxWithCredentials,
        placeholderFillStyle:              $.DEFAULT_SETTINGS.placeholderFillStyle,
        opacity:                           $.DEFAULT_SETTINGS.opacity,
        preload:                           $.DEFAULT_SETTINGS.preload,
        compositeOperation:                $.DEFAULT_SETTINGS.compositeOperation,
        subPixelRoundingForTransparency:   $.DEFAULT_SETTINGS.subPixelRoundingForTransparency
    }, options );

    this._preload = this.preload;
    delete this.preload;

    this._fullyLoaded = false;

    this._xSpring = new $.Spring({
        initial: x,
        springStiffness: this.springStiffness,
        animationTime: this.animationTime
    });

    this._ySpring = new $.Spring({
        initial: y,
        springStiffness: this.springStiffness,
        animationTime: this.animationTime
    });

    this._scaleSpring = new $.Spring({
        initial: scale,
        springStiffness: this.springStiffness,
        animationTime: this.animationTime
    });

    this._degreesSpring = new $.Spring({
        initial: degrees,
        springStiffness: this.springStiffness,
        animationTime: this.animationTime
    });

    this._updateForScale();

    if (fitBounds) {
        this.fitBounds(fitBounds, fitBoundsPlacement, true);
    }

    // We need a callback to give image manipulation a chance to happen
    this._drawingHandler = function(args) {
        /**
         * This event is fired just before the tile is drawn giving the application a chance to alter the image.
         *
         * NOTE: This event is only fired when the drawer is using a &lt;canvas&gt;.
         *
         * @event tile-drawing
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {OpenSeadragon.Tile} tile - The Tile being drawn.
         * @property {OpenSeadragon.TiledImage} tiledImage - Which TiledImage is being drawn.
         * @property {OpenSeadragon.Tile} context - The HTML canvas context being drawn into.
         * @property {OpenSeadragon.Tile} rendered - The HTML canvas context containing the tile imagery.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        _this.viewer.raiseEvent('tile-drawing', $.extend({
            tiledImage: _this
        }, args));
    };
};

$.extend($.TiledImage.prototype, $.EventSource.prototype, /** @lends OpenSeadragon.TiledImage.prototype */{
    /**
     * @returns {Boolean} Whether the TiledImage needs to be drawn.
     */
    needsDraw: function() {
        return this._needsDraw;
    },

    /**
     * @returns {Boolean} Whether all tiles necessary for this TiledImage to draw at the current view have been loaded.
     */
    getFullyLoaded: function() {
        return this._fullyLoaded;
    },

    // private
    _setFullyLoaded: function(flag) {
        if (flag === this._fullyLoaded) {
            return;
        }

        this._fullyLoaded = flag;

        /**
         * Fired when the TiledImage's "fully loaded" flag (whether all tiles necessary for this TiledImage
         * to draw at the current view have been loaded) changes.
         *
         * @event fully-loaded-change
         * @memberof OpenSeadragon.TiledImage
         * @type {object}
         * @property {Boolean} fullyLoaded - The new "fully loaded" value.
         * @property {OpenSeadragon.TiledImage} eventSource - A reference to the TiledImage which raised the event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('fully-loaded-change', {
            fullyLoaded: this._fullyLoaded
        });
    },

    /**
     * Clears all tiles and triggers an update on the next call to
     * {@link OpenSeadragon.TiledImage#update}.
     */
    reset: function() {
        this._tileCache.clearTilesFor(this);
        this.lastResetTime = $.now();
        this._needsDraw = true;
    },

    /**
     * Updates the TiledImage's bounds, animating if needed.
     * @returns {Boolean} Whether the TiledImage animated.
     */
    update: function() {
        var xUpdated = this._xSpring.update();
        var yUpdated = this._ySpring.update();
        var scaleUpdated = this._scaleSpring.update();
        var degreesUpdated = this._degreesSpring.update();

        if (xUpdated || yUpdated || scaleUpdated || degreesUpdated) {
            this._updateForScale();
            this._needsDraw = true;
            return true;
        }

        return false;
    },

    /**
     * Draws the TiledImage to its Drawer.
     */
    draw: function() {
        if (this.opacity !== 0 || this._preload) {
            this._midDraw = true;
            this._updateViewport();
            this._midDraw = false;
        }
        // Images with opacity 0 should not need to be drawn in future. this._needsDraw = false is set in this._updateViewport() for other images.
        else {
            this._needsDraw = false;
        }
    },

    /**
     * Destroy the TiledImage (unload current loaded tiles).
     */
    destroy: function() {
        this.reset();

        if (this.source.destroy) {
            this.source.destroy();
        }
    },

    /**
     * Get this TiledImage's bounds in viewport coordinates.
     * @param {Boolean} [current=false] - Pass true for the current location;
     * false for target location.
     * @returns {OpenSeadragon.Rect} This TiledImage's bounds in viewport coordinates.
     */
    getBounds: function(current) {
        return this.getBoundsNoRotate(current)
            .rotate(this.getRotation(current), this._getRotationPoint(current));
    },

    /**
     * Get this TiledImage's bounds in viewport coordinates without taking
     * rotation into account.
     * @param {Boolean} [current=false] - Pass true for the current location;
     * false for target location.
     * @returns {OpenSeadragon.Rect} This TiledImage's bounds in viewport coordinates.
     */
    getBoundsNoRotate: function(current) {
        return current ?
            new $.Rect(
                this._xSpring.current.value,
                this._ySpring.current.value,
                this._worldWidthCurrent,
                this._worldHeightCurrent) :
            new $.Rect(
                this._xSpring.target.value,
                this._ySpring.target.value,
                this._worldWidthTarget,
                this._worldHeightTarget);
    },

    // deprecated
    getWorldBounds: function() {
        $.console.error('[TiledImage.getWorldBounds] is deprecated; use TiledImage.getBounds instead');
        return this.getBounds();
    },

    /**
     * Get the bounds of the displayed part of the tiled image.
     * @param {Boolean} [current=false] Pass true for the current location,
     * false for the target location.
     * @returns {$.Rect} The clipped bounds in viewport coordinates.
     */
    getClippedBounds: function(current) {
        var bounds = this.getBoundsNoRotate(current);
        if (this._clip) {
            var worldWidth = current ?
                this._worldWidthCurrent : this._worldWidthTarget;
            var ratio = worldWidth / this.source.dimensions.x;
            var clip = this._clip.times(ratio);
            bounds = new $.Rect(
                bounds.x + clip.x,
                bounds.y + clip.y,
                clip.width,
                clip.height);
        }
        return bounds.rotate(this.getRotation(current), this._getRotationPoint(current));
    },

    /**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     * @returns {OpenSeadragon.Rect} Where this tile fits (in normalized coordinates).
     */
    getTileBounds: function( level, x, y ) {
        var numTiles = this.source.getNumTiles(level);
        var xMod    = ( numTiles.x + ( x % numTiles.x ) ) % numTiles.x;
        var yMod    = ( numTiles.y + ( y % numTiles.y ) ) % numTiles.y;
        var bounds = this.source.getTileBounds(level, xMod, yMod);
        if (this.getFlip()) {
            bounds.x = 1 - bounds.x - bounds.width;
        }
        bounds.x += (x - xMod) / numTiles.x;
        bounds.y += (this._worldHeightCurrent / this._worldWidthCurrent) * ((y - yMod) / numTiles.y);
        return bounds;
    },

    /**
     * @returns {OpenSeadragon.Point} This TiledImage's content size, in original pixels.
     */
    getContentSize: function() {
        return new $.Point(this.source.dimensions.x, this.source.dimensions.y);
    },

    /**
     * @returns {OpenSeadragon.Point} The TiledImage's content size, in window coordinates.
     */
    getSizeInWindowCoordinates: function() {
        var topLeft = this.imageToWindowCoordinates(new $.Point(0, 0));
        var bottomRight = this.imageToWindowCoordinates(this.getContentSize());
        return new $.Point(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
    },

    // private
    _viewportToImageDelta: function( viewerX, viewerY, current ) {
        var scale = (current ? this._scaleSpring.current.value : this._scaleSpring.target.value);
        return new $.Point(viewerX * (this.source.dimensions.x / scale),
            viewerY * ((this.source.dimensions.y * this.contentAspectX) / scale));
    },

    /**
     * Translates from OpenSeadragon viewer coordinate system to image coordinate system.
     * This method can be called either by passing X,Y coordinates or an {@link OpenSeadragon.Point}.
     * @param {Number|OpenSeadragon.Point} viewerX - The X coordinate or point in viewport coordinate system.
     * @param {Number} [viewerY] - The Y coordinate in viewport coordinate system.
     * @param {Boolean} [current=false] - Pass true to use the current location; false for target location.
     * @returns {OpenSeadragon.Point} A point representing the coordinates in the image.
     */
    viewportToImageCoordinates: function(viewerX, viewerY, current) {
        var point;
        if (viewerX instanceof $.Point) {
            //they passed a point instead of individual components
            current = viewerY;
            point = viewerX;
        } else {
            point = new $.Point(viewerX, viewerY);
        }

        point = point.rotate(-this.getRotation(current), this._getRotationPoint(current));
        return current ?
            this._viewportToImageDelta(
                point.x - this._xSpring.current.value,
                point.y - this._ySpring.current.value) :
            this._viewportToImageDelta(
                point.x - this._xSpring.target.value,
                point.y - this._ySpring.target.value);
    },

    // private
    _imageToViewportDelta: function( imageX, imageY, current ) {
        var scale = (current ? this._scaleSpring.current.value : this._scaleSpring.target.value);
        return new $.Point((imageX / this.source.dimensions.x) * scale,
            (imageY / this.source.dimensions.y / this.contentAspectX) * scale);
    },

    /**
     * Translates from image coordinate system to OpenSeadragon viewer coordinate system
     * This method can be called either by passing X,Y coordinates or an {@link OpenSeadragon.Point}.
     * @param {Number|OpenSeadragon.Point} imageX - The X coordinate or point in image coordinate system.
     * @param {Number} [imageY] - The Y coordinate in image coordinate system.
     * @param {Boolean} [current=false] - Pass true to use the current location; false for target location.
     * @returns {OpenSeadragon.Point} A point representing the coordinates in the viewport.
     */
    imageToViewportCoordinates: function(imageX, imageY, current) {
        if (imageX instanceof $.Point) {
            //they passed a point instead of individual components
            current = imageY;
            imageY = imageX.y;
            imageX = imageX.x;
        }

        var point = this._imageToViewportDelta(imageX, imageY);
        if (current) {
            point.x += this._xSpring.current.value;
            point.y += this._ySpring.current.value;
        } else {
            point.x += this._xSpring.target.value;
            point.y += this._ySpring.target.value;
        }

        return point.rotate(this.getRotation(current), this._getRotationPoint(current));
    },

    /**
     * Translates from a rectangle which describes a portion of the image in
     * pixel coordinates to OpenSeadragon viewport rectangle coordinates.
     * This method can be called either by passing X,Y,width,height or an {@link OpenSeadragon.Rect}.
     * @param {Number|OpenSeadragon.Rect} imageX - The left coordinate or rectangle in image coordinate system.
     * @param {Number} [imageY] - The top coordinate in image coordinate system.
     * @param {Number} [pixelWidth] - The width in pixel of the rectangle.
     * @param {Number} [pixelHeight] - The height in pixel of the rectangle.
     * @param {Boolean} [current=false] - Pass true to use the current location; false for target location.
     * @returns {OpenSeadragon.Rect} A rect representing the coordinates in the viewport.
     */
    imageToViewportRectangle: function(imageX, imageY, pixelWidth, pixelHeight, current) {
        var rect = imageX;
        if (rect instanceof $.Rect) {
            //they passed a rect instead of individual components
            current = imageY;
        } else {
            rect = new $.Rect(imageX, imageY, pixelWidth, pixelHeight);
        }

        var coordA = this.imageToViewportCoordinates(rect.getTopLeft(), current);
        var coordB = this._imageToViewportDelta(rect.width, rect.height, current);

        return new $.Rect(
            coordA.x,
            coordA.y,
            coordB.x,
            coordB.y,
            rect.degrees + this.getRotation(current)
        );
    },

    /**
     * Translates from a rectangle which describes a portion of
     * the viewport in point coordinates to image rectangle coordinates.
     * This method can be called either by passing X,Y,width,height or an {@link OpenSeadragon.Rect}.
     * @param {Number|OpenSeadragon.Rect} viewerX - The left coordinate or rectangle in viewport coordinate system.
     * @param {Number} [viewerY] - The top coordinate in viewport coordinate system.
     * @param {Number} [pointWidth] - The width in viewport coordinate system.
     * @param {Number} [pointHeight] - The height in viewport coordinate system.
     * @param {Boolean} [current=false] - Pass true to use the current location; false for target location.
     * @returns {OpenSeadragon.Rect} A rect representing the coordinates in the image.
     */
    viewportToImageRectangle: function( viewerX, viewerY, pointWidth, pointHeight, current ) {
        var rect = viewerX;
        if (viewerX instanceof $.Rect) {
            //they passed a rect instead of individual components
            current = viewerY;
        } else {
            rect = new $.Rect(viewerX, viewerY, pointWidth, pointHeight);
        }

        var coordA = this.viewportToImageCoordinates(rect.getTopLeft(), current);
        var coordB = this._viewportToImageDelta(rect.width, rect.height, current);

        return new $.Rect(
            coordA.x,
            coordA.y,
            coordB.x,
            coordB.y,
            rect.degrees - this.getRotation(current)
        );
    },

    /**
     * Convert pixel coordinates relative to the viewer element to image
     * coordinates.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
    viewerElementToImageCoordinates: function( pixel ) {
        var point = this.viewport.pointFromPixel( pixel, true );
        return this.viewportToImageCoordinates( point );
    },

    /**
     * Convert pixel coordinates relative to the image to
     * viewer element coordinates.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
    imageToViewerElementCoordinates: function( pixel ) {
        var point = this.imageToViewportCoordinates( pixel );
        return this.viewport.pixelFromPoint( point, true );
    },

    /**
     * Convert pixel coordinates relative to the window to image coordinates.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
    windowToImageCoordinates: function( pixel ) {
        var viewerCoordinates = pixel.minus(
            OpenSeadragon.getElementPosition( this.viewer.element ));
        return this.viewerElementToImageCoordinates( viewerCoordinates );
    },

    /**
     * Convert image coordinates to pixel coordinates relative to the window.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
    imageToWindowCoordinates: function( pixel ) {
        var viewerCoordinates = this.imageToViewerElementCoordinates( pixel );
        return viewerCoordinates.plus(
            OpenSeadragon.getElementPosition( this.viewer.element ));
    },

    // private
    // Convert rectangle in viewport coordinates to this tiled image point
    // coordinates (x in [0, 1] and y in [0, aspectRatio])
    _viewportToTiledImageRectangle: function(rect) {
        var scale = this._scaleSpring.current.value;
        rect = rect.rotate(-this.getRotation(true), this._getRotationPoint(true));
        return new $.Rect(
            (rect.x - this._xSpring.current.value) / scale,
            (rect.y - this._ySpring.current.value) / scale,
            rect.width / scale,
            rect.height / scale,
            rect.degrees);
    },

    /**
     * Convert a viewport zoom to an image zoom.
     * Image zoom: ratio of the original image size to displayed image size.
     * 1 means original image size, 0.5 half size...
     * Viewport zoom: ratio of the displayed image's width to viewport's width.
     * 1 means identical width, 2 means image's width is twice the viewport's width...
     * @function
     * @param {Number} viewportZoom The viewport zoom
     * @returns {Number} imageZoom The image zoom
     */
    viewportToImageZoom: function( viewportZoom ) {
        var ratio = this._scaleSpring.current.value *
            this.viewport._containerInnerSize.x / this.source.dimensions.x;
        return ratio * viewportZoom;
    },

    /**
     * Convert an image zoom to a viewport zoom.
     * Image zoom: ratio of the original image size to displayed image size.
     * 1 means original image size, 0.5 half size...
     * Viewport zoom: ratio of the displayed image's width to viewport's width.
     * 1 means identical width, 2 means image's width is twice the viewport's width...
     * Note: not accurate with multi-image.
     * @function
     * @param {Number} imageZoom The image zoom
     * @returns {Number} viewportZoom The viewport zoom
     */
    imageToViewportZoom: function( imageZoom ) {
        var ratio = this._scaleSpring.current.value *
            this.viewport._containerInnerSize.x / this.source.dimensions.x;
        return imageZoom / ratio;
    },

    /**
     * Sets the TiledImage's position in the world.
     * @param {OpenSeadragon.Point} position - The new position, in viewport coordinates.
     * @param {Boolean} [immediately=false] - Whether to animate to the new position or snap immediately.
     * @fires OpenSeadragon.TiledImage.event:bounds-change
     */
    setPosition: function(position, immediately) {
        var sameTarget = (this._xSpring.target.value === position.x &&
            this._ySpring.target.value === position.y);

        if (immediately) {
            if (sameTarget && this._xSpring.current.value === position.x &&
                this._ySpring.current.value === position.y) {
                return;
            }

            this._xSpring.resetTo(position.x);
            this._ySpring.resetTo(position.y);
            this._needsDraw = true;
        } else {
            if (sameTarget) {
                return;
            }

            this._xSpring.springTo(position.x);
            this._ySpring.springTo(position.y);
            this._needsDraw = true;
        }

        if (!sameTarget) {
            this._raiseBoundsChange();
        }
    },

    /**
     * Sets the TiledImage's width in the world, adjusting the height to match based on aspect ratio.
     * @param {Number} width - The new width, in viewport coordinates.
     * @param {Boolean} [immediately=false] - Whether to animate to the new size or snap immediately.
     * @fires OpenSeadragon.TiledImage.event:bounds-change
     */
    setWidth: function(width, immediately) {
        this._setScale(width, immediately);
    },

    /**
     * Sets the TiledImage's height in the world, adjusting the width to match based on aspect ratio.
     * @param {Number} height - The new height, in viewport coordinates.
     * @param {Boolean} [immediately=false] - Whether to animate to the new size or snap immediately.
     * @fires OpenSeadragon.TiledImage.event:bounds-change
     */
    setHeight: function(height, immediately) {
        this._setScale(height / this.normHeight, immediately);
    },

    /**
     * Sets an array of polygons to crop the TiledImage during draw tiles.
     * The render function will use the default non-zero winding rule.
     * @param {OpenSeadragon.Point[][]} polygons - represented in an array of point object in image coordinates.
     * Example format: [
     *  [{x: 197, y:172}, {x: 226, y:172}, {x: 226, y:198}, {x: 197, y:198}], // First polygon
     *  [{x: 328, y:200}, {x: 330, y:199}, {x: 332, y:201}, {x: 329, y:202}]  // Second polygon
     *  [{x: 321, y:201}, {x: 356, y:205}, {x: 341, y:250}] // Third polygon
     * ]
     */
    setCroppingPolygons: function( polygons ) {

        var isXYObject = function(obj) {
            return obj instanceof $.Point || (typeof obj.x === 'number' && typeof obj.y === 'number');
        };

        var objectToSimpleXYObject = function(objs) {
            return objs.map(function(obj) {
                try {
                    if (isXYObject(obj)) {
                        return { x: obj.x, y: obj.y };
                    } else {
                        throw new Error();
                    }
                } catch(e) {
                    throw new Error('A Provided cropping polygon point is not supported');
                }
            });
        };

        try {
            if (!$.isArray(polygons)) {
                throw new Error('Provided cropping polygon is not an array');
            }
            this._croppingPolygons = polygons.map(function(polygon){
                return objectToSimpleXYObject(polygon);
            });
        } catch (e) {
            $.console.error('[TiledImage.setCroppingPolygons] Cropping polygon format not supported');
            $.console.error(e);
            this._croppingPolygons = null;
        }
    },

    /**
     * Resets the cropping polygons, thus next render will remove all cropping
     * polygon effects.
     */
    resetCroppingPolygons: function() {
        this._croppingPolygons = null;
    },

    /**
     * Positions and scales the TiledImage to fit in the specified bounds.
     * Note: this method fires OpenSeadragon.TiledImage.event:bounds-change
     * twice
     * @param {OpenSeadragon.Rect} bounds The bounds to fit the image into.
     * @param {OpenSeadragon.Placement} [anchor=OpenSeadragon.Placement.CENTER]
     * How to anchor the image in the bounds.
     * @param {Boolean} [immediately=false] Whether to animate to the new size
     * or snap immediately.
     * @fires OpenSeadragon.TiledImage.event:bounds-change
     */
    fitBounds: function(bounds, anchor, immediately) {
        anchor = anchor || $.Placement.CENTER;
        var anchorProperties = $.Placement.properties[anchor];
        var aspectRatio = this.contentAspectX;
        var xOffset = 0;
        var yOffset = 0;
        var displayedWidthRatio = 1;
        var displayedHeightRatio = 1;
        if (this._clip) {
            aspectRatio = this._clip.getAspectRatio();
            displayedWidthRatio = this._clip.width / this.source.dimensions.x;
            displayedHeightRatio = this._clip.height / this.source.dimensions.y;
            if (bounds.getAspectRatio() > aspectRatio) {
                xOffset = this._clip.x / this._clip.height * bounds.height;
                yOffset = this._clip.y / this._clip.height * bounds.height;
            } else {
                xOffset = this._clip.x / this._clip.width * bounds.width;
                yOffset = this._clip.y / this._clip.width * bounds.width;
            }
        }

        if (bounds.getAspectRatio() > aspectRatio) {
            // We will have margins on the X axis
            var height = bounds.height / displayedHeightRatio;
            var marginLeft = 0;
            if (anchorProperties.isHorizontallyCentered) {
                marginLeft = (bounds.width - bounds.height * aspectRatio) / 2;
            } else if (anchorProperties.isRight) {
                marginLeft = bounds.width - bounds.height * aspectRatio;
            }
            this.setPosition(
                new $.Point(bounds.x - xOffset + marginLeft, bounds.y - yOffset),
                immediately);
            this.setHeight(height, immediately);
        } else {
            // We will have margins on the Y axis
            var width = bounds.width / displayedWidthRatio;
            var marginTop = 0;
            if (anchorProperties.isVerticallyCentered) {
                marginTop = (bounds.height - bounds.width / aspectRatio) / 2;
            } else if (anchorProperties.isBottom) {
                marginTop = bounds.height - bounds.width / aspectRatio;
            }
            this.setPosition(
                new $.Point(bounds.x - xOffset, bounds.y - yOffset + marginTop),
                immediately);
            this.setWidth(width, immediately);
        }
    },

    /**
     * @returns {OpenSeadragon.Rect|null} The TiledImage's current clip rectangle,
     * in image pixels, or null if none.
     */
    getClip: function() {
        if (this._clip) {
            return this._clip.clone();
        }

        return null;
    },

    /**
     * @param {OpenSeadragon.Rect|null} newClip - An area, in image pixels, to clip to
     * (portions of the image outside of this area will not be visible). Only works on
     * browsers that support the HTML5 canvas.
     * @fires OpenSeadragon.TiledImage.event:clip-change
     */
    setClip: function(newClip) {
        $.console.assert(!newClip || newClip instanceof $.Rect,
            "[TiledImage.setClip] newClip must be an OpenSeadragon.Rect or null");

        if (newClip instanceof $.Rect) {
            this._clip = newClip.clone();
        } else {
            this._clip = null;
        }

        this._needsDraw = true;
        /**
         * Raised when the TiledImage's clip is changed.
         * @event clip-change
         * @memberOf OpenSeadragon.TiledImage
         * @type {object}
         * @property {OpenSeadragon.TiledImage} eventSource - A reference to the
         * TiledImage which raised the event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('clip-change');
    },

    /**
     * @returns {Boolean} Whether the TiledImage should be flipped before rendering.
     */
    getFlip: function() {
        return !!this.flipped;
    },

    /**
     * @param {Boolean} flip Whether the TiledImage should be flipped before rendering.
     * @fires OpenSeadragon.TiledImage.event:bounds-change
     */
    setFlip: function(flip) {
        this.flipped = !!flip;
        this._needsDraw = true;
        this._raiseBoundsChange();
    },

    /**
     * @returns {Number} The TiledImage's current opacity.
     */
    getOpacity: function() {
        return this.opacity;
    },

    /**
     * @param {Number} opacity Opacity the tiled image should be drawn at.
     * @fires OpenSeadragon.TiledImage.event:opacity-change
     */
    setOpacity: function(opacity) {
        if (opacity === this.opacity) {
            return;
        }

        this.opacity = opacity;
        this._needsDraw = true;
        /**
         * Raised when the TiledImage's opacity is changed.
         * @event opacity-change
         * @memberOf OpenSeadragon.TiledImage
         * @type {object}
         * @property {Number} opacity - The new opacity value.
         * @property {OpenSeadragon.TiledImage} eventSource - A reference to the
         * TiledImage which raised the event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('opacity-change', {
            opacity: this.opacity
        });
    },

    /**
     * @returns {Boolean} whether the tiledImage can load its tiles even when it has zero opacity.
     */
    getPreload: function() {
        return this._preload;
    },

    /**
     * Set true to load even when hidden. Set false to block loading when hidden.
     */
    setPreload: function(preload) {
        this._preload = !!preload;
        this._needsDraw = true;
    },

    /**
     * Get the rotation of this tiled image in degrees.
     * @param {Boolean} [current=false] True for current rotation, false for target.
     * @returns {Number} the rotation of this tiled image in degrees.
     */
    getRotation: function(current) {
        return current ?
            this._degreesSpring.current.value :
            this._degreesSpring.target.value;
    },

    /**
     * Set the current rotation of this tiled image in degrees.
     * @param {Number} degrees the rotation in degrees.
     * @param {Boolean} [immediately=false] Whether to animate to the new angle
     * or rotate immediately.
     * @fires OpenSeadragon.TiledImage.event:bounds-change
     */
    setRotation: function(degrees, immediately) {
        if (this._degreesSpring.target.value === degrees &&
            this._degreesSpring.isAtTargetValue()) {
            return;
        }
        if (immediately) {
            this._degreesSpring.resetTo(degrees);
        } else {
            this._degreesSpring.springTo(degrees);
        }
        this._needsDraw = true;
        this._raiseBoundsChange();
    },

    /**
     * Get the point around which this tiled image is rotated
     * @private
     * @param {Boolean} current True for current rotation point, false for target.
     * @returns {OpenSeadragon.Point}
     */
    _getRotationPoint: function(current) {
        return this.getBoundsNoRotate(current).getCenter();
    },

    /**
     * @returns {String} The TiledImage's current compositeOperation.
     */
    getCompositeOperation: function() {
        return this.compositeOperation;
    },

    /**
     * @param {String} compositeOperation the tiled image should be drawn with this globalCompositeOperation.
     * @fires OpenSeadragon.TiledImage.event:composite-operation-change
     */
    setCompositeOperation: function(compositeOperation) {
        if (compositeOperation === this.compositeOperation) {
            return;
        }

        this.compositeOperation = compositeOperation;
        this._needsDraw = true;
        /**
         * Raised when the TiledImage's opacity is changed.
         * @event composite-operation-change
         * @memberOf OpenSeadragon.TiledImage
         * @type {object}
         * @property {String} compositeOperation - The new compositeOperation value.
         * @property {OpenSeadragon.TiledImage} eventSource - A reference to the
         * TiledImage which raised the event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('composite-operation-change', {
            compositeOperation: this.compositeOperation
        });
    },

    // private
    _setScale: function(scale, immediately) {
        var sameTarget = (this._scaleSpring.target.value === scale);
        if (immediately) {
            if (sameTarget && this._scaleSpring.current.value === scale) {
                return;
            }

            this._scaleSpring.resetTo(scale);
            this._updateForScale();
            this._needsDraw = true;
        } else {
            if (sameTarget) {
                return;
            }

            this._scaleSpring.springTo(scale);
            this._updateForScale();
            this._needsDraw = true;
        }

        if (!sameTarget) {
            this._raiseBoundsChange();
        }
    },

    // private
    _updateForScale: function() {
        this._worldWidthTarget = this._scaleSpring.target.value;
        this._worldHeightTarget = this.normHeight * this._scaleSpring.target.value;
        this._worldWidthCurrent = this._scaleSpring.current.value;
        this._worldHeightCurrent = this.normHeight * this._scaleSpring.current.value;
    },

    // private
    _raiseBoundsChange: function() {
        /**
         * Raised when the TiledImage's bounds are changed.
         * Note that this event is triggered only when the animation target is changed;
         * not for every frame of animation.
         * @event bounds-change
         * @memberOf OpenSeadragon.TiledImage
         * @type {object}
         * @property {OpenSeadragon.TiledImage} eventSource - A reference to the
         * TiledImage which raised the event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('bounds-change');
    },

    // private
    _isBottomItem: function() {
        return this.viewer.world.getItemAt(0) === this;
    },

    // private
    _getLevelsInterval: function() {
        var lowestLevel = Math.max(
            this.source.minLevel,
            Math.floor(Math.log(this.minZoomImageRatio) / Math.log(2))
        );
        var currentZeroRatio = this.viewport.deltaPixelsFromPointsNoRotate(
            this.source.getPixelRatio(0), true).x *
            this._scaleSpring.current.value;
        var highestLevel = Math.min(
            Math.abs(this.source.maxLevel),
            Math.abs(Math.floor(
                Math.log(currentZeroRatio / this.minPixelRatio) / Math.log(2)
            ))
        );

        // Calculations for the interval of levels to draw
        // can return invalid intervals; fix that here if necessary
        highestLevel = Math.max(highestLevel, this.source.minLevel || 0);
        lowestLevel = Math.min(lowestLevel, highestLevel);
        return {
            lowestLevel: lowestLevel,
            highestLevel: highestLevel
        };
    },

    /**
     * @private
     * @inner
     * Pretty much every other line in this needs to be documented so it's clear
     * how each piece of this routine contributes to the drawing process.  That's
     * why there are so many TODO's inside this function.
     */
    _updateViewport: function() {
        this._needsDraw = false;
        this._tilesLoading = 0;
        this.loadingCoverage = {};

        // Reset tile's internal drawn state
        while (this.lastDrawn.length > 0) {
            var tile = this.lastDrawn.pop();
            tile.beingDrawn = false;
        }

        var viewport = this.viewport;
        var drawArea = this._viewportToTiledImageRectangle(
            viewport.getBoundsWithMargins(true));

        if (!this.wrapHorizontal && !this.wrapVertical) {
            var tiledImageBounds = this._viewportToTiledImageRectangle(
                this.getClippedBounds(true));
            drawArea = drawArea.intersection(tiledImageBounds);
            if (drawArea === null) {
                return;
            }
        }

        var levelsInterval = this._getLevelsInterval();
        var lowestLevel = levelsInterval.lowestLevel;
        var highestLevel = levelsInterval.highestLevel;
        var bestTile = null;
        var haveDrawn = false;
        var currentTime = $.now();

        // Update any level that will be drawn
        for (var level = highestLevel; level >= lowestLevel; level--) {
            var drawLevel = false;

            //Avoid calculations for draw if we have already drawn this
            var currentRenderPixelRatio = viewport.deltaPixelsFromPointsNoRotate(
                this.source.getPixelRatio(level),
                true
            ).x * this._scaleSpring.current.value;

            if (level === lowestLevel ||
                (!haveDrawn && currentRenderPixelRatio >= this.minPixelRatio)) {
                drawLevel = true;
                haveDrawn = true;
            } else if (!haveDrawn) {
                continue;
            }

            //Perform calculations for draw if we haven't drawn this
            var targetRenderPixelRatio = viewport.deltaPixelsFromPointsNoRotate(
                this.source.getPixelRatio(level),
                false
            ).x * this._scaleSpring.current.value;

            var targetZeroRatio = viewport.deltaPixelsFromPointsNoRotate(
                this.source.getPixelRatio(
                    Math.max(
                        this.source.getClosestLevel(),
                        0
                    )
                ),
                false
            ).x * this._scaleSpring.current.value;

            var optimalRatio = this.immediateRender ? 1 : targetZeroRatio;
            var levelOpacity = Math.min(1, (currentRenderPixelRatio - 0.5) / 0.5);
            var levelVisibility = optimalRatio / Math.abs(
                optimalRatio - targetRenderPixelRatio
            );

            // Update the level and keep track of 'best' tile to load
            bestTile = this._updateLevel(
                haveDrawn,
                drawLevel,
                level,
                levelOpacity,
                levelVisibility,
                drawArea,
                currentTime,
                bestTile
            );

            // Stop the loop if lower-res tiles would all be covered by
            // already drawn tiles
            if (this._providesCoverage(this.coverage, level)) {
                break;
            }
        }

        // Perform the actual drawing
        this._drawTiles(this.lastDrawn);

        // Load the new 'best' tile
        if (bestTile && !bestTile.context2D) {
            this._loadTile(bestTile, currentTime);
            this._needsDraw = true;
            this._setFullyLoaded(false);
        } else {
            this._setFullyLoaded(this._tilesLoading === 0);
        }
    },

    // private
    _getCornerTiles: function(level, topLeftBound, bottomRightBound) {
        var leftX;
        var rightX;
        if (this.wrapHorizontal) {
            leftX = $.positiveModulo(topLeftBound.x, 1);
            rightX = $.positiveModulo(bottomRightBound.x, 1);
        } else {
            leftX = Math.max(0, topLeftBound.x);
            rightX = Math.min(1, bottomRightBound.x);
        }
        var topY;
        var bottomY;
        var aspectRatio = 1 / this.source.aspectRatio;
        if (this.wrapVertical) {
            topY = $.positiveModulo(topLeftBound.y, aspectRatio);
            bottomY = $.positiveModulo(bottomRightBound.y, aspectRatio);
        } else {
            topY = Math.max(0, topLeftBound.y);
            bottomY = Math.min(aspectRatio, bottomRightBound.y);
        }

        var topLeftTile = this.source.getTileAtPoint(level, new $.Point(leftX, topY));
        var bottomRightTile = this.source.getTileAtPoint(level, new $.Point(rightX, bottomY));
        var numTiles  = this.source.getNumTiles(level);

        if (this.wrapHorizontal) {
            topLeftTile.x += numTiles.x * Math.floor(topLeftBound.x);
            bottomRightTile.x += numTiles.x * Math.floor(bottomRightBound.x);
        }
        if (this.wrapVertical) {
            topLeftTile.y += numTiles.y * Math.floor(topLeftBound.y / aspectRatio);
            bottomRightTile.y += numTiles.y * Math.floor(bottomRightBound.y / aspectRatio);
        }

        return {
            topLeft: topLeftTile,
            bottomRight: bottomRightTile,
        };
    },

    /**
     * Updates all tiles at a given resolution level.
     * @private
     * @param {Boolean} haveDrawn
     * @param {Boolean} drawLevel
     * @param {Number} level
     * @param {Number} levelOpacity
     * @param {Number} levelVisibility
     * @param {OpenSeadragon.Rect} drawArea
     * @param {Number} currentTime
     * @param {OpenSeadragon.Tile} best - The current "best" tile to draw.
     */
    _updateLevel: function(haveDrawn, drawLevel, level, levelOpacity,
                           levelVisibility, drawArea, currentTime, best) {

        var topLeftBound = drawArea.getBoundingBox().getTopLeft();
        var bottomRightBound = drawArea.getBoundingBox().getBottomRight();

        if (this.viewer) {
            /**
             * <em>- Needs documentation -</em>
             *
             * @event update-level
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {OpenSeadragon.TiledImage} tiledImage - Which TiledImage is being drawn.
             * @property {Object} havedrawn
             * @property {Object} level
             * @property {Object} opacity
             * @property {Object} visibility
             * @property {OpenSeadragon.Rect} drawArea
             * @property {Object} topleft deprecated, use drawArea instead
             * @property {Object} bottomright deprecated, use drawArea instead
             * @property {Object} currenttime
             * @property {Object} best
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent('update-level', {
                tiledImage: this,
                havedrawn: haveDrawn,
                level: level,
                opacity: levelOpacity,
                visibility: levelVisibility,
                drawArea: drawArea,
                topleft: topLeftBound,
                bottomright: bottomRightBound,
                currenttime: currentTime,
                best: best
            });
        }

        this._resetCoverage(this.coverage, level);
        this._resetCoverage(this.loadingCoverage, level);

        //OK, a new drawing so do your calculations
        var cornerTiles = this._getCornerTiles(level, topLeftBound, bottomRightBound);
        var topLeftTile = cornerTiles.topLeft;
        var bottomRightTile = cornerTiles.bottomRight;
        var numberOfTiles  = this.source.getNumTiles(level);

        var viewportCenter = this.viewport.pixelFromPoint(this.viewport.getCenter());

        if (this.getFlip()) {
            // The right-most tile can be narrower than the others. When flipped,
            // this tile is now on the left. Because it is narrower than the normal
            // left-most tile, the subsequent tiles may not be wide enough to completely
            // fill the viewport. Fix this by rendering an extra column of tiles. If we
            // are not wrapping, make sure we never render more than the number of tiles
            // in the image.
            bottomRightTile.x += 1;
            if (!this.wrapHorizontal) {
                bottomRightTile.x  = Math.min(bottomRightTile.x, numberOfTiles.x - 1);
            }
        }

        for (var x = topLeftTile.x; x <= bottomRightTile.x; x++) {
            for (var y = topLeftTile.y; y <= bottomRightTile.y; y++) {

                var flippedX;
                if (this.getFlip()) {
                    var xMod = ( numberOfTiles.x + ( x % numberOfTiles.x ) ) % numberOfTiles.x;
                    flippedX = x + numberOfTiles.x - xMod - xMod - 1;
                } else {
                    flippedX = x;
                }

                if (drawArea.intersection(this.getTileBounds(level, flippedX, y)) === null) {
                    // This tile is outside of the viewport, no need to draw it
                    continue;
                }

                best = this._updateTile(
                    drawLevel,
                    haveDrawn,
                    flippedX, y,
                    level,
                    levelOpacity,
                    levelVisibility,
                    viewportCenter,
                    numberOfTiles,
                    currentTime,
                    best
                );
            }
        }

        return best;
    },

    /**
     * @private
     * @inner
     * Update a single tile at a particular resolution level.
     * @param {Boolean} haveDrawn
     * @param {Boolean} drawLevel
     * @param {Number} x
     * @param {Number} y
     * @param {Number} level
     * @param {Number} levelOpacity
     * @param {Number} levelVisibility
     * @param {OpenSeadragon.Point} viewportCenter
     * @param {Number} numberOfTiles
     * @param {Number} currentTime
     * @param {OpenSeadragon.Tile} best - The current "best" tile to draw.
     */
    _updateTile: function( haveDrawn, drawLevel, x, y, level, levelOpacity,
                           levelVisibility, viewportCenter, numberOfTiles, currentTime, best){

        var tile = this._getTile(
            x, y,
            level,
            currentTime,
            numberOfTiles,
            this._worldWidthCurrent,
            this._worldHeightCurrent
            ),
            drawTile = drawLevel;

        if( this.viewer ){
            /**
             * <em>- Needs documentation -</em>
             *
             * @event update-tile
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {OpenSeadragon.TiledImage} tiledImage - Which TiledImage is being drawn.
             * @property {OpenSeadragon.Tile} tile
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.viewer.raiseEvent( 'update-tile', {
                tiledImage: this,
                tile: tile
            });
        }

        this._setCoverage( this.coverage, level, x, y, false );

        var loadingCoverage = tile.loaded || tile.loading || this._isCovered(this.loadingCoverage, level, x, y);
        this._setCoverage(this.loadingCoverage, level, x, y, loadingCoverage);

        if ( !tile.exists ) {
            return best;
        }

        if ( haveDrawn && !drawTile ) {
            if ( this._isCovered( this.coverage, level, x, y ) ) {
                this._setCoverage( this.coverage, level, x, y, true );
            } else {
                drawTile = true;
            }
        }

        if ( !drawTile ) {
            return best;
        }

        this._positionTile(
            tile,
            this.source.tileOverlap,
            this.viewport,
            viewportCenter,
            levelVisibility
        );

        if (!tile.loaded) {
            if (tile.context2D) {
                this._setTileLoaded(tile);
            } else {
                var imageRecord = this._tileCache.getImageRecord(tile.cacheKey);
                if (imageRecord) {
                    this._setTileLoaded(tile, imageRecord.getData());
                }
            }
        }

        if ( tile.loaded ) {
            var needsDraw = this._blendTile(
                tile,
                x, y,
                level,
                levelOpacity,
                currentTime
            );

            if ( needsDraw ) {
                this._needsDraw = true;
            }
        } else if ( tile.loading ) {
            // the tile is already in the download queue
            this._tilesLoading++;
        } else if (!loadingCoverage) {
            best = this._compareTiles( best, tile );
        }

        return best;
    },

    /**
     * @private
     * @inner
     * Obtains a tile at the given location.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} level
     * @param {Number} time
     * @param {Number} numTiles
     * @param {Number} worldWidth
     * @param {Number} worldHeight
     * @returns {OpenSeadragon.Tile}
     */
    _getTile: function(
        x, y,
        level,
        time,
        numTiles,
        worldWidth,
        worldHeight
    ) {
        var xMod,
            yMod,
            bounds,
            sourceBounds,
            exists,
            urlOrGetter,
            post,
            ajaxHeaders,
            context2D,
            tile,
            tilesMatrix = this.tilesMatrix,
            tileSource = this.source;

        if ( !tilesMatrix[ level ] ) {
            tilesMatrix[ level ] = {};
        }
        if ( !tilesMatrix[ level ][ x ] ) {
            tilesMatrix[ level ][ x ] = {};
        }

        if ( !tilesMatrix[ level ][ x ][ y ] || !tilesMatrix[ level ][ x ][ y ].flipped !== !this.flipped ) {
            xMod    = ( numTiles.x + ( x % numTiles.x ) ) % numTiles.x;
            yMod    = ( numTiles.y + ( y % numTiles.y ) ) % numTiles.y;
            bounds  = this.getTileBounds( level, x, y );
            sourceBounds = tileSource.getTileBounds( level, xMod, yMod, true );
            exists  = tileSource.tileExists( level, xMod, yMod );
            urlOrGetter     = tileSource.getTileUrl( level, xMod, yMod );
            post    = tileSource.getTilePostData( level, xMod, yMod );

            // Headers are only applicable if loadTilesWithAjax is set
            if (this.loadTilesWithAjax) {
                ajaxHeaders = tileSource.getTileAjaxHeaders( level, xMod, yMod );
                // Combine tile AJAX headers with tiled image AJAX headers (if applicable)
                if ($.isPlainObject(this.ajaxHeaders)) {
                    ajaxHeaders = $.extend({}, this.ajaxHeaders, ajaxHeaders);
                }
            } else {
                ajaxHeaders = null;
            }

            context2D = tileSource.getContext2D ?
                tileSource.getContext2D(level, xMod, yMod) : undefined;

            tile = new $.Tile(
                level,
                x,
                y,
                bounds,
                exists,
                urlOrGetter,
                context2D,
                this.loadTilesWithAjax,
                ajaxHeaders,
                sourceBounds,
                post,
                tileSource.getTileHashKey(level, xMod, yMod, urlOrGetter, ajaxHeaders, post)
            );

            if (this.getFlip()) {
                if (xMod === 0) {
                    tile.isRightMost = true;
                }
            } else {
                if (xMod === numTiles.x - 1) {
                    tile.isRightMost = true;
                }
            }

            if (yMod === numTiles.y - 1) {
                tile.isBottomMost = true;
            }

            tile.flipped = this.flipped;

            tilesMatrix[ level ][ x ][ y ] = tile;
        }

        tile = tilesMatrix[ level ][ x ][ y ];
        tile.lastTouchTime = time;

        return tile;
    },

    /**
     * @private
     * @inner
     * Dispatch a job to the ImageLoader to load the Image for a Tile.
     * @param {OpenSeadragon.Tile} tile
     * @param {Number} time
     */
    _loadTile: function(tile, time ) {
        var _this = this;
        tile.loading = true;
        this._imageLoader.addJob({
            src: tile.getUrl(),
            tile: tile,
            source: this.source,
            postData: tile.postData,
            loadWithAjax: tile.loadWithAjax,
            ajaxHeaders: tile.ajaxHeaders,
            crossOriginPolicy: this.crossOriginPolicy,
            ajaxWithCredentials: this.ajaxWithCredentials,
            callback: function( data, errorMsg, tileRequest ){
                _this._onTileLoad( tile, time, data, errorMsg, tileRequest );
            },
            abort: function() {
                tile.loading = false;
            }
        });
    },

    /**
     * @private
     * @inner
     * Callback fired when a Tile's Image finished downloading.
     * @param {OpenSeadragon.Tile} tile
     * @param {Number} time
     * @param {*} data image data
     * @param {String} errorMsg
     * @param {XMLHttpRequest} tileRequest
     */
    _onTileLoad: function( tile, time, data, errorMsg, tileRequest ) {
        if ( !data ) {
            $.console.error( "Tile %s failed to load: %s - error: %s", tile, tile.getUrl(), errorMsg );
            /**
             * Triggered when a tile fails to load.
             *
             * @event tile-load-failed
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Tile} tile - The tile that failed to load.
             * @property {OpenSeadragon.TiledImage} tiledImage - The tiled image the tile belongs to.
             * @property {number} time - The time in milliseconds when the tile load began.
             * @property {string} message - The error message.
             * @property {XMLHttpRequest} tileRequest - The XMLHttpRequest used to load the tile if available.
             */
            this.viewer.raiseEvent("tile-load-failed", {
                tile: tile,
                tiledImage: this,
                time: time,
                message: errorMsg,
                tileRequest: tileRequest
            });
            tile.loading = false;
            tile.exists = false;
            return;
        }

        if ( time < this.lastResetTime ) {
            $.console.warn( "Ignoring tile %s loaded before reset: %s", tile, tile.getUrl() );
            tile.loading = false;
            return;
        }

        var _this = this,
            finish = function() {
                var ccc = _this.source;
                var cutoff = ccc.getClosestLevel();
                _this._setTileLoaded(tile, data, cutoff, tileRequest);
        };

        // Check if we're mid-update; this can happen on IE8 because image load events for
        // cached images happen immediately there
        if ( !this._midDraw ) {
            finish();
        } else {
            // Wait until after the update, in case caching unloads any tiles
            window.setTimeout( finish, 1);
        }
    },

    /**
     * @private
     * @inner
     * @param {OpenSeadragon.Tile} tile
     * @param {*} data image data, the data sent to ImageJob.prototype.finish(), by default an Image object
     * @param {Number|undefined} cutoff
     * @param {XMLHttpRequest|undefined} tileRequest
     */
    _setTileLoaded: function(tile, data, cutoff, tileRequest) {
        var increment = 0,
            _this = this;

        function getCompletionCallback() {
            increment++;
            return completionCallback;
        }

        function completionCallback() {
            increment--;
            if (increment === 0) {
                tile.loading = false;
                tile.loaded = true;
                tile.hasTransparency = _this.source.hasTransparency(
                    tile.context2D, tile.getUrl(), tile.ajaxHeaders, tile.postData
                );
                if (!tile.context2D) {
                    _this._tileCache.cacheTile({
                        data: data,
                        tile: tile,
                        cutoff: cutoff,
                        tiledImage: _this
                    });
                }
                _this._needsDraw = true;
            }
        }

        /**
         * Triggered when a tile has just been loaded in memory. That means that the
         * image has been downloaded and can be modified before being drawn to the canvas.
         *
         * @event tile-loaded
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {Image|*} image - The image (data) of the tile. Deprecated.
         * @property {*} data image data, the data sent to ImageJob.prototype.finish(), by default an Image object
         * @property {OpenSeadragon.TiledImage} tiledImage - The tiled image of the loaded tile.
         * @property {OpenSeadragon.Tile} tile - The tile which has been loaded.
         * @property {XMLHttpRequest} tileRequest - The AJAX request that loaded this tile (if applicable).
         * @property {function} getCompletionCallback - A function giving a callback to call
         * when the asynchronous processing of the image is done. The image will be
         * marked as entirely loaded when the callback has been called once for each
         * call to getCompletionCallback.
         */
        this.viewer.raiseEvent("tile-loaded", {
            tile: tile,
            tiledImage: this,
            tileRequest: tileRequest,
            get image() {
                $.console.error("[tile-loaded] event 'image' has been deprecated. Use 'data' property instead.");
                return data;
            },
            data: data,
            getCompletionCallback: getCompletionCallback
        });
        // In case the completion callback is never called, we at least force it once.
        getCompletionCallback()();
    },

    /**
     * @private
     * @inner
     * @param {OpenSeadragon.Tile} tile
     * @param {Boolean} overlap
     * @param {OpenSeadragon.Viewport} viewport
     * @param {OpenSeadragon.Point} viewportCenter
     * @param {Number} levelVisibility
     */
    _positionTile: function( tile, overlap, viewport, viewportCenter, levelVisibility ){
        var boundsTL = tile.bounds.getTopLeft();

        boundsTL.x *= this._scaleSpring.current.value;
        boundsTL.y *= this._scaleSpring.current.value;
        boundsTL.x += this._xSpring.current.value;
        boundsTL.y += this._ySpring.current.value;

        var boundsSize   = tile.bounds.getSize();

        boundsSize.x *= this._scaleSpring.current.value;
        boundsSize.y *= this._scaleSpring.current.value;

        var positionC = viewport.pixelFromPointNoRotate(boundsTL, true),
            positionT = viewport.pixelFromPointNoRotate(boundsTL, false),
            sizeC = viewport.deltaPixelsFromPointsNoRotate(boundsSize, true),
            sizeT = viewport.deltaPixelsFromPointsNoRotate(boundsSize, false),
            tileCenter = positionT.plus( sizeT.divide( 2 ) ),
            tileSquaredDistance = viewportCenter.squaredDistanceTo( tileCenter );

        if ( !overlap ) {
            sizeC = sizeC.plus( new $.Point( 1, 1 ) );
        }

        if (tile.isRightMost && this.wrapHorizontal) {
            sizeC.x += 0.75; // Otherwise Firefox and Safari show seams
        }

        if (tile.isBottomMost && this.wrapVertical) {
            sizeC.y += 0.75; // Otherwise Firefox and Safari show seams
        }

        tile.position   = positionC;
        tile.size       = sizeC;
        tile.squaredDistance   = tileSquaredDistance;
        tile.visibility = levelVisibility;
    },

    /**
     * @private
     * @inner
     * Updates the opacity of a tile according to the time it has been on screen
     * to perform a fade-in.
     * Updates coverage once a tile is fully opaque.
     * Returns whether the fade-in has completed.
     *
     * @param {OpenSeadragon.Tile} tile
     * @param {Number} x
     * @param {Number} y
     * @param {Number} level
     * @param {Number} levelOpacity
     * @param {Number} currentTime
     * @returns {Boolean}
     */
    _blendTile: function( tile, x, y, level, levelOpacity, currentTime ){
        var blendTimeMillis = 1000 * this.blendTime,
            deltaTime,
            opacity;

        if ( !tile.blendStart ) {
            tile.blendStart = currentTime;
        }

        deltaTime   = currentTime - tile.blendStart;
        opacity     = blendTimeMillis ? Math.min( 1, deltaTime / ( blendTimeMillis ) ) : 1;

        if ( this.alwaysBlend ) {
            opacity *= levelOpacity;
        }

        tile.opacity = opacity;

        this.lastDrawn.push( tile );

        if ( opacity === 1 ) {
            this._setCoverage( this.coverage, level, x, y, true );
            this._hasOpaqueTile = true;
        } else if ( deltaTime < blendTimeMillis ) {
            return true;
        }

        return false;
    },


    /**
     * @private
     * @inner
     * Determines whether the 'last best' tile for the area is better than the
     * tile in question.
     *
     * @param {OpenSeadragon.Tile} previousBest
     * @param {OpenSeadragon.Tile} tile
     * @returns {OpenSeadragon.Tile} The new best tile.
     */
    _compareTiles: function( previousBest, tile ) {
        if ( !previousBest ) {
            return tile;
        }

        if ( tile.visibility > previousBest.visibility ) {
            return tile;
        } else if ( tile.visibility === previousBest.visibility ) {
            if ( tile.squaredDistance < previousBest.squaredDistance ) {
                return tile;
            }
        }
        return previousBest;
    },

    /**
     * @private
     * @inner
     * Draws a TiledImage.
     * @param {OpenSeadragon.Tile[]} lastDrawn - An unordered list of Tiles drawn last frame.
     */
    _drawTiles: function( lastDrawn ) {
        if (this.opacity === 0 || (lastDrawn.length === 0 && !this.placeholderFillStyle)) {
            return;
        }

        var tile = lastDrawn[0];
        var useSketch;

        if (tile) {
            useSketch = this.opacity < 1 ||
                (this.compositeOperation && this.compositeOperation !== 'source-over') ||
                (!this._isBottomItem() &&
                    this.source.hasTransparency(tile.context2D, tile.getUrl(), tile.ajaxHeaders, tile.postData));
        }

        var sketchScale;
        var sketchTranslate;

        var zoom = this.viewport.getZoom(true);
        var imageZoom = this.viewportToImageZoom(zoom);

        if (lastDrawn.length > 1 &&
            imageZoom > this.smoothTileEdgesMinZoom &&
            !this.iOSDevice &&
            this.getRotation(true) % 360 === 0 && // TODO: support tile edge smoothing with tiled image rotation.
            $.supportsCanvas && this.viewer.useCanvas) {
            // When zoomed in a lot (>100%) the tile edges are visible.
            // So we have to composite them at ~100% and scale them up together.
            // Note: Disabled on iOS devices per default as it causes a native crash
            useSketch = true;
            sketchScale = tile.getScaleForEdgeSmoothing();
            sketchTranslate = tile.getTranslationForEdgeSmoothing(sketchScale,
                this._drawer.getCanvasSize(false),
                this._drawer.getCanvasSize(true));
        }

        var bounds;
        if (useSketch) {
            if (!sketchScale) {
                // Except when edge smoothing, we only clean the part of the
                // sketch canvas we are going to use for performance reasons.
                bounds = this.viewport.viewportToViewerElementRectangle(
                    this.getClippedBounds(true))
                    .getIntegerBoundingBox();

                if(this._drawer.viewer.viewport.getFlip()) {
                    if (this.viewport.getRotation(true) % 360 !== 0 ||
                        this.getRotation(true) % 360 !== 0) {
                        bounds.x = this._drawer.viewer.container.clientWidth - (bounds.x + bounds.width);
                    }
                }

                bounds = bounds.times($.pixelDensityRatio);
            }
            this._drawer._clear(true, bounds);
        }

        // When scaling, we must rotate only when blending the sketch canvas to
        // avoid interpolation
        if (!sketchScale) {
            if (this.viewport.getRotation(true) % 360 !== 0) {
                this._drawer._offsetForRotation({
                    degrees: this.viewport.getRotation(true),
                    useSketch: useSketch
                });
            }
            if (this.getRotation(true) % 360 !== 0) {
                this._drawer._offsetForRotation({
                    degrees: this.getRotation(true),
                    point: this.viewport.pixelFromPointNoRotate(
                        this._getRotationPoint(true), true),
                    useSketch: useSketch
                });
            }

            if (this.viewport.getRotation(true) % 360 === 0 &&
                this.getRotation(true) % 360 === 0) {
                if(this._drawer.viewer.viewport.getFlip()) {
                    this._drawer._flip();
                }
            }
        }

        var usedClip = false;
        if ( this._clip ) {
            this._drawer.saveContext(useSketch);

            var box = this.imageToViewportRectangle(this._clip, true);
            box = box.rotate(-this.getRotation(true), this._getRotationPoint(true));
            var clipRect = this._drawer.viewportToDrawerRectangle(box);
            if (sketchScale) {
                clipRect = clipRect.times(sketchScale);
            }
            if (sketchTranslate) {
                clipRect = clipRect.translate(sketchTranslate);
            }
            this._drawer.setClip(clipRect, useSketch);

            usedClip = true;
        }

        if (this._croppingPolygons) {
            var self = this;
            this._drawer.saveContext(useSketch);
            try {
                var polygons = this._croppingPolygons.map(function (polygon) {
                    return polygon.map(function (coord) {
                        var point = self
                            .imageToViewportCoordinates(coord.x, coord.y, true)
                            .rotate(-self.getRotation(true), self._getRotationPoint(true));
                        var clipPoint = self._drawer.viewportCoordToDrawerCoord(point);
                        if (sketchScale) {
                            clipPoint = clipPoint.times(sketchScale);
                        }
                        return clipPoint;
                    });
                });
                this._drawer.clipWithPolygons(polygons, useSketch);
            } catch (e) {
                $.console.error(e);
            }
            usedClip = true;
        }

        if ( this.placeholderFillStyle && this._hasOpaqueTile === false ) {
            var placeholderRect = this._drawer.viewportToDrawerRectangle(this.getBounds(true));
            if (sketchScale) {
                placeholderRect = placeholderRect.times(sketchScale);
            }
            if (sketchTranslate) {
                placeholderRect = placeholderRect.translate(sketchTranslate);
            }

            var fillStyle = null;
            if ( typeof this.placeholderFillStyle === "function" ) {
                fillStyle = this.placeholderFillStyle(this, this._drawer.context);
            }
            else {
                fillStyle = this.placeholderFillStyle;
            }

            this._drawer.drawRectangle(placeholderRect, fillStyle, useSketch);
        }

        var subPixelRoundingRule = determineSubPixelRoundingRule(this.subPixelRoundingForTransparency);

        var shouldRoundPositionAndSize = false;

        if (subPixelRoundingRule === $.SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS) {
            shouldRoundPositionAndSize = true;
        } else if (subPixelRoundingRule === $.SUBPIXEL_ROUNDING_OCCURRENCES.ONLY_AT_REST) {
            var isAnimating = this.viewer && this.viewer.isAnimating();
            shouldRoundPositionAndSize = !isAnimating;
        }

        for (var i = lastDrawn.length - 1; i >= 0; i--) {
            tile = lastDrawn[ i ];
            this._drawer.drawTile( tile, this._drawingHandler, useSketch, sketchScale,
                sketchTranslate, shouldRoundPositionAndSize, this.source );
            tile.beingDrawn = true;

            if( this.viewer ){
                /**
                 * <em>- Needs documentation -</em>
                 *
                 * @event tile-drawn
                 * @memberof OpenSeadragon.Viewer
                 * @type {object}
                 * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
                 * @property {OpenSeadragon.TiledImage} tiledImage - Which TiledImage is being drawn.
                 * @property {OpenSeadragon.Tile} tile
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                this.viewer.raiseEvent( 'tile-drawn', {
                    tiledImage: this,
                    tile: tile
                });
            }
        }

        if ( usedClip ) {
            this._drawer.restoreContext( useSketch );
        }

        if (!sketchScale) {
            if (this.getRotation(true) % 360 !== 0) {
                this._drawer._restoreRotationChanges(useSketch);
            }
            if (this.viewport.getRotation(true) % 360 !== 0) {
                this._drawer._restoreRotationChanges(useSketch);
            }
        }

        if (useSketch) {
            if (sketchScale) {
                if (this.viewport.getRotation(true) % 360 !== 0) {
                    this._drawer._offsetForRotation({
                        degrees: this.viewport.getRotation(true),
                        useSketch: false
                    });
                }
                if (this.getRotation(true) % 360 !== 0) {
                    this._drawer._offsetForRotation({
                        degrees: this.getRotation(true),
                        point: this.viewport.pixelFromPointNoRotate(
                            this._getRotationPoint(true), true),
                        useSketch: false
                    });
                }
            }
            this._drawer.blendSketch({
                opacity: this.opacity,
                scale: sketchScale,
                translate: sketchTranslate,
                compositeOperation: this.compositeOperation,
                bounds: bounds
            });
            if (sketchScale) {
                if (this.getRotation(true) % 360 !== 0) {
                    this._drawer._restoreRotationChanges(false);
                }
                if (this.viewport.getRotation(true) % 360 !== 0) {
                    this._drawer._restoreRotationChanges(false);
                }
            }
        }

        if (!sketchScale) {
            if (this.viewport.getRotation(true) % 360 === 0 &&
                this.getRotation(true) % 360 === 0) {
                if(this._drawer.viewer.viewport.getFlip()) {
                    this._drawer._flip();
                }
            }
        }

        this._drawDebugInfo( lastDrawn );
    },

    /**
     * @private
     * @inner
     * Draws special debug information for a TiledImage if in debug mode.
     * @param {OpenSeadragon.Tile[]} lastDrawn - An unordered list of Tiles drawn last frame.
     */
    _drawDebugInfo: function( lastDrawn ) {
        if( this.debugMode ) {
            for ( var i = lastDrawn.length - 1; i >= 0; i-- ) {
                var tile = lastDrawn[ i ];
                try {
                    this._drawer.drawDebugInfo(tile, lastDrawn.length, i, this);
                } catch(e) {
                    $.console.error(e);
                }
            }
        }
    },

    /**
     * @private
     * @inner
     * Returns true if the given tile provides coverage to lower-level tiles of
     * lower resolution representing the same content. If neither x nor y is
     * given, returns true if the entire visible level provides coverage.
     *
     * Note that out-of-bounds tiles provide coverage in this sense, since
     * there's no content that they would need to cover. Tiles at non-existent
     * levels that are within the image bounds, however, do not.
     *
     * @param {Object} coverage - A '3d' dictionary [level][x][y] --> Boolean.
     * @param {Number} level - The resolution level of the tile.
     * @param {Number} x - The X position of the tile.
     * @param {Number} y - The Y position of the tile.
     * @returns {Boolean}
     */
    _providesCoverage: function( coverage, level, x, y ) {
        var rows,
            cols,
            i, j;

        if ( !coverage[ level ] ) {
            return false;
        }

        if ( x === undefined || y === undefined ) {
            rows = coverage[ level ];
            for ( i in rows ) {
                if ( Object.prototype.hasOwnProperty.call( rows, i ) ) {
                    cols = rows[ i ];
                    for ( j in cols ) {
                        if ( Object.prototype.hasOwnProperty.call( cols, j ) && !cols[ j ] ) {
                            return false;
                        }
                    }
                }
            }

            return true;
        }

        return (
            coverage[ level ][ x] === undefined ||
            coverage[ level ][ x ][ y ] === undefined ||
            coverage[ level ][ x ][ y ] === true
        );
    },

    /**
     * @private
     * @inner
     * Returns true if the given tile is completely covered by higher-level
     * tiles of higher resolution representing the same content. If neither x
     * nor y is given, returns true if the entire visible level is covered.
     *
     * @param {Object} coverage - A '3d' dictionary [level][x][y] --> Boolean.
     * @param {Number} level - The resolution level of the tile.
     * @param {Number} x - The X position of the tile.
     * @param {Number} y - The Y position of the tile.
     * @returns {Boolean}
     */
    _isCovered: function( coverage, level, x, y ) {
        if ( x === undefined || y === undefined ) {
            return this._providesCoverage( coverage, level + 1 );
        } else {
            return (
                this._providesCoverage( coverage, level + 1, 2 * x, 2 * y ) &&
                this._providesCoverage( coverage, level + 1, 2 * x, 2 * y + 1 ) &&
                this._providesCoverage( coverage, level + 1, 2 * x + 1, 2 * y ) &&
                this._providesCoverage( coverage, level + 1, 2 * x + 1, 2 * y + 1 )
            );
        }
    },

    /**
     * @private
     * @inner
     * Sets whether the given tile provides coverage or not.
     *
     * @param {Object} coverage - A '3d' dictionary [level][x][y] --> Boolean.
     * @param {Number} level - The resolution level of the tile.
     * @param {Number} x - The X position of the tile.
     * @param {Number} y - The Y position of the tile.
     * @param {Boolean} covers - Whether the tile provides coverage.
     */
    _setCoverage: function( coverage, level, x, y, covers ) {
        if ( !coverage[ level ] ) {
            $.console.warn(
                "Setting coverage for a tile before its level's coverage has been reset: %s",
                level
            );
            return;
        }

        if ( !coverage[ level ][ x ] ) {
            coverage[ level ][ x ] = {};
        }

        coverage[ level ][ x ][ y ] = covers;
    },

    /**
     * @private
     * @inner
     * Resets coverage information for the given level. This should be called
     * after every draw routine. Note that at the beginning of the next draw
     * routine, coverage for every visible tile should be explicitly set.
     *
     * @param {Object} coverage - A '3d' dictionary [level][x][y] --> Boolean.
     * @param {Number} level - The resolution level of tiles to completely reset.
     */
    _resetCoverage: function( coverage, level ) {
        coverage[ level ] = {};
    }
});


/**
 * @private
 * @inner
 * Defines the value for subpixel rounding to fallback to in case of missing or
 * invalid value.
 */
var DEFAULT_SUBPIXEL_ROUNDING_RULE = $.SUBPIXEL_ROUNDING_OCCURRENCES.NEVER;

/**
 * @private
 * @inner
 * Checks whether the input value is an invalid subpixel rounding enum value.
 *
 * @param {SUBPIXEL_ROUNDING_OCCURRENCES} value - The subpixel rounding enum value to check.
 * @returns {Boolean} Returns true if the input value is none of the expected
 * {@link SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS}, {@link SUBPIXEL_ROUNDING_OCCURRENCES.ONLY_AT_REST} or {@link SUBPIXEL_ROUNDING_OCCURRENCES.NEVER} value.
 */
function isSubPixelRoundingRuleUnknown(value) {
    return value !== $.SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS &&
        value !== $.SUBPIXEL_ROUNDING_OCCURRENCES.ONLY_AT_REST &&
        value !== $.SUBPIXEL_ROUNDING_OCCURRENCES.NEVER;
}

/**
 * @private
 * @inner
 * Ensures the returned value is always a valid subpixel rounding enum value,
 * defaulting to {@link SUBPIXEL_ROUNDING_OCCURRENCES.NEVER} if input is missing or invalid.
 *
 * @param {SUBPIXEL_ROUNDING_OCCURRENCES} value - The subpixel rounding enum value to normalize.
 * @returns {SUBPIXEL_ROUNDING_OCCURRENCES} Returns a valid subpixel rounding enum value.
 */
function normalizeSubPixelRoundingRule(value) {
    if (isSubPixelRoundingRuleUnknown(value)) {
        return DEFAULT_SUBPIXEL_ROUNDING_RULE;
    }
    return value;
}

/**
 * @private
 * @inner
 * Ensures the returned value is always a valid subpixel rounding enum value,
 * defaulting to 'NEVER' if input is missing or invalid.
 *
 * @param {Object} subPixelRoundingRules - A subpixel rounding enum values dictionary [{@link BROWSERS}] --> {@link SUBPIXEL_ROUNDING_OCCURRENCES}.
 * @returns {SUBPIXEL_ROUNDING_OCCURRENCES} Returns the determined subpixel rounding enum value for the
 * current browser.
 */
function determineSubPixelRoundingRule(subPixelRoundingRules) {
    if (typeof subPixelRoundingRules === 'number') {
        return normalizeSubPixelRoundingRule(subPixelRoundingRules);
    }

    if (!subPixelRoundingRules || !$.Browser) {
        return DEFAULT_SUBPIXEL_ROUNDING_RULE;
    }

    var subPixelRoundingRule = subPixelRoundingRules[$.Browser.vendor];

    if (isSubPixelRoundingRuleUnknown(subPixelRoundingRule)) {
        subPixelRoundingRule = subPixelRoundingRules['*'];
    }

    return normalizeSubPixelRoundingRule(subPixelRoundingRule);
}

}( OpenSeadragon ));

/*
 * OpenSeadragon - TileCache
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

// private class
var TileRecord = function( options ) {
    $.console.assert( options, "[TileCache.cacheTile] options is required" );
    $.console.assert( options.tile, "[TileCache.cacheTile] options.tile is required" );
    $.console.assert( options.tiledImage, "[TileCache.cacheTile] options.tiledImage is required" );
    this.tile = options.tile;
    this.tiledImage = options.tiledImage;
};

// private class
var ImageRecord = function(options) {
    $.console.assert( options, "[ImageRecord] options is required" );
    $.console.assert( options.data, "[ImageRecord] options.data is required" );
    this._tiles = [];

    options.create.apply(null, [this, options.data, options.ownerTile]);
    this._destroyImplementation = options.destroy.bind(null, this);
    this.getImage = options.getImage.bind(null, this);
    this.getData = options.getData.bind(null, this);
    this.getRenderedContext = options.getRenderedContext.bind(null, this);
};

ImageRecord.prototype = {
    destroy: function() {
        this._destroyImplementation();
        this._tiles = null;
    },

    addTile: function(tile) {
        $.console.assert(tile, '[ImageRecord.addTile] tile is required');
        this._tiles.push(tile);
    },

    removeTile: function(tile) {
        for (var i = 0; i < this._tiles.length; i++) {
            if (this._tiles[i] === tile) {
                this._tiles.splice(i, 1);
                return;
            }
        }

        $.console.warn('[ImageRecord.removeTile] trying to remove unknown tile', tile);
    },

    getTileCount: function() {
        return this._tiles.length;
    }
};

/**
 * @class TileCache
 * @memberof OpenSeadragon
 * @classdesc Stores all the tiles displayed in a {@link OpenSeadragon.Viewer}.
 * You generally won't have to interact with the TileCache directly.
 * @param {Object} options - Configuration for this TileCache.
 * @param {Number} [options.maxImageCacheCount] - See maxImageCacheCount in
 * {@link OpenSeadragon.Options} for details.
 */
$.TileCache = function( options ) {
    options = options || {};

    this._maxImageCacheCount = options.maxImageCacheCount || $.DEFAULT_SETTINGS.maxImageCacheCount;
    this._tilesLoaded = [];
    this._imagesLoaded = [];
    this._imagesLoadedCount = 0;
};

/** @lends OpenSeadragon.TileCache.prototype */
$.TileCache.prototype = {
    /**
     * @returns {Number} The total number of tiles that have been loaded by
     * this TileCache.
     */
    numTilesLoaded: function() {
        return this._tilesLoaded.length;
    },

    /**
     * Caches the specified tile, removing an old tile if necessary to stay under the
     * maxImageCacheCount specified on construction. Note that if multiple tiles reference
     * the same image, there may be more tiles than maxImageCacheCount; the goal is to keep
     * the number of images below that number. Note, as well, that even the number of images
     * may temporarily surpass that number, but should eventually come back down to the max specified.
     * @param {Object} options - Tile info.
     * @param {OpenSeadragon.Tile} options.tile - The tile to cache.
     * @param {String} options.tile.cacheKey - The unique key used to identify this tile in the cache.
     * @param {Image} options.image - The image of the tile to cache.
     * @param {OpenSeadragon.TiledImage} options.tiledImage - The TiledImage that owns that tile.
     * @param {Number} [options.cutoff=0] - If adding this tile goes over the cache max count, this
     * function will release an old tile. The cutoff option specifies a tile level at or below which
     * tiles will not be released.
     */
    cacheTile: function( options ) {
        $.console.assert( options, "[TileCache.cacheTile] options is required" );
        $.console.assert( options.tile, "[TileCache.cacheTile] options.tile is required" );
        $.console.assert( options.tile.cacheKey, "[TileCache.cacheTile] options.tile.cacheKey is required" );
        $.console.assert( options.tiledImage, "[TileCache.cacheTile] options.tiledImage is required" );

        var cutoff = options.cutoff || 0;
        var insertionIndex = this._tilesLoaded.length;

        var imageRecord = this._imagesLoaded[options.tile.cacheKey];
        if (!imageRecord) {

            if (!options.data) {
                $.console.error("[TileCache.cacheTile] options.image was renamed to options.data. '.image' attribute " +
                    "has been deprecated and will be removed in the future.");
                options.data = options.image;
            }

            $.console.assert( options.data, "[TileCache.cacheTile] options.data is required to create an ImageRecord" );
            imageRecord = this._imagesLoaded[options.tile.cacheKey] = new ImageRecord({
                data: options.data,
                ownerTile: options.tile,
                create: options.tiledImage.source.createTileCache,
                destroy: options.tiledImage.source.destroyTileCache,
                getImage: options.tiledImage.source.getTileCacheDataAsImage,
                getData: options.tiledImage.source.getTileCacheData,
                getRenderedContext: options.tiledImage.source.getTileCacheDataAsContext2D,
            });

            this._imagesLoadedCount++;
        }

        imageRecord.addTile(options.tile);
        options.tile.cacheImageRecord = imageRecord;

        // Note that just because we're unloading a tile doesn't necessarily mean
        // we're unloading an image. With repeated calls it should sort itself out, though.
        if ( this._imagesLoadedCount > this._maxImageCacheCount ) {
            var worstTile       = null;
            var worstTileIndex  = -1;
            var worstTileRecord = null;
            var prevTile, worstTime, worstLevel, prevTime, prevLevel, prevTileRecord;

            for ( var i = this._tilesLoaded.length - 1; i >= 0; i-- ) {
                prevTileRecord = this._tilesLoaded[ i ];
                prevTile = prevTileRecord.tile;

                if ( prevTile.level <= cutoff || prevTile.beingDrawn ) {
                    continue;
                } else if ( !worstTile ) {
                    worstTile       = prevTile;
                    worstTileIndex  = i;
                    worstTileRecord = prevTileRecord;
                    continue;
                }

                prevTime    = prevTile.lastTouchTime;
                worstTime   = worstTile.lastTouchTime;
                prevLevel   = prevTile.level;
                worstLevel  = worstTile.level;

                if ( prevTime < worstTime ||
                    ( prevTime === worstTime && prevLevel > worstLevel ) ) {
                    worstTile       = prevTile;
                    worstTileIndex  = i;
                    worstTileRecord = prevTileRecord;
                }
            }

            if ( worstTile && worstTileIndex >= 0 ) {
                this._unloadTile(worstTileRecord);
                insertionIndex = worstTileIndex;
            }
        }

        this._tilesLoaded[ insertionIndex ] = new TileRecord({
            tile: options.tile,
            tiledImage: options.tiledImage
        });
    },

    /**
     * Clears all tiles associated with the specified tiledImage.
     * @param {OpenSeadragon.TiledImage} tiledImage
     */
    clearTilesFor: function( tiledImage ) {
        $.console.assert(tiledImage, '[TileCache.clearTilesFor] tiledImage is required');
        var tileRecord;
        for ( var i = 0; i < this._tilesLoaded.length; ++i ) {
            tileRecord = this._tilesLoaded[ i ];
            if ( tileRecord.tiledImage === tiledImage ) {
                this._unloadTile(tileRecord);
                this._tilesLoaded.splice( i, 1 );
                i--;
            }
        }
    },

    // private
    getImageRecord: function(cacheKey) {
        $.console.assert(cacheKey, '[TileCache.getImageRecord] cacheKey is required');
        return this._imagesLoaded[cacheKey];
    },

    // private
    _unloadTile: function(tileRecord) {
        $.console.assert(tileRecord, '[TileCache._unloadTile] tileRecord is required');
        var tile = tileRecord.tile;
        var tiledImage = tileRecord.tiledImage;

        tile.unload();
        tile.cacheImageRecord = null;

        var imageRecord = this._imagesLoaded[tile.cacheKey];
        imageRecord.removeTile(tile);
        if (!imageRecord.getTileCount()) {
            imageRecord.destroy();
            delete this._imagesLoaded[tile.cacheKey];
            this._imagesLoadedCount--;
        }

        /**
         * Triggered when a tile has just been unloaded from memory.
         *
         * @event tile-unloaded
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.TiledImage} tiledImage - The tiled image of the unloaded tile.
         * @property {OpenSeadragon.Tile} tile - The tile which has been unloaded.
         */
        tiledImage.viewer.raiseEvent("tile-unloaded", {
            tile: tile,
            tiledImage: tiledImage
        });
    }
};

}( OpenSeadragon ));

/*
 * OpenSeadragon - World
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2022 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ){

/**
 * @class World
 * @memberof OpenSeadragon
 * @extends OpenSeadragon.EventSource
 * @classdesc Keeps track of all of the tiled images in the scene.
 * @param {Object} options - World options.
 * @param {OpenSeadragon.Viewer} options.viewer - The Viewer that owns this World.
 **/
$.World = function( options ) {
    var _this = this;

    $.console.assert( options.viewer, "[World] options.viewer is required" );

    $.EventSource.call( this );

    this.viewer = options.viewer;
    this._items = [];
    this._needsDraw = false;
    this._autoRefigureSizes = true;
    this._needsSizesFigured = false;
    this._delegatedFigureSizes = function(event) {
        if (_this._autoRefigureSizes) {
            _this._figureSizes();
        } else {
            _this._needsSizesFigured = true;
        }
    };

    this._figureSizes();
};

$.extend( $.World.prototype, $.EventSource.prototype, /** @lends OpenSeadragon.World.prototype */{
    /**
     * Add the specified item.
     * @param {OpenSeadragon.TiledImage} item - The item to add.
     * @param {Number} [options.index] - Index for the item. If not specified, goes at the top.
     * @fires OpenSeadragon.World.event:add-item
     * @fires OpenSeadragon.World.event:metrics-change
     */
    addItem: function( item, options ) {
        $.console.assert(item, "[World.addItem] item is required");
        $.console.assert(item instanceof $.TiledImage, "[World.addItem] only TiledImages supported at this time");

        options = options || {};
        if (options.index !== undefined) {
            var index = Math.max(0, Math.min(this._items.length, options.index));
            this._items.splice(index, 0, item);
        } else {
            this._items.push( item );
        }

        if (this._autoRefigureSizes) {
            this._figureSizes();
        } else {
            this._needsSizesFigured = true;
        }

        this._needsDraw = true;

        item.addHandler('bounds-change', this._delegatedFigureSizes);
        item.addHandler('clip-change', this._delegatedFigureSizes);

        /**
         * Raised when an item is added to the World.
         * @event add-item
         * @memberOf OpenSeadragon.World
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the World which raised the event.
         * @property {OpenSeadragon.TiledImage} item - The item that has been added.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'add-item', {
            item: item
        } );
    },

    /**
     * Get the item at the specified index.
     * @param {Number} index - The item's index.
     * @returns {OpenSeadragon.TiledImage} The item at the specified index.
     */
    getItemAt: function( index ) {
        $.console.assert(index !== undefined, "[World.getItemAt] index is required");
        return this._items[ index ];
    },

    /**
     * Get the index of the given item or -1 if not present.
     * @param {OpenSeadragon.TiledImage} item - The item.
     * @returns {Number} The index of the item or -1 if not present.
     */
    getIndexOfItem: function( item ) {
        $.console.assert(item, "[World.getIndexOfItem] item is required");
        return $.indexOf( this._items, item );
    },

    /**
     * @returns {Number} The number of items used.
     */
    getItemCount: function() {
        return this._items.length;
    },

    /**
     * Change the index of a item so that it appears over or under others.
     * @param {OpenSeadragon.TiledImage} item - The item to move.
     * @param {Number} index - The new index.
     * @fires OpenSeadragon.World.event:item-index-change
     */
    setItemIndex: function( item, index ) {
        $.console.assert(item, "[World.setItemIndex] item is required");
        $.console.assert(index !== undefined, "[World.setItemIndex] index is required");

        var oldIndex = this.getIndexOfItem( item );

        if ( index >= this._items.length ) {
            throw new Error( "Index bigger than number of layers." );
        }

        if ( index === oldIndex || oldIndex === -1 ) {
            return;
        }

        this._items.splice( oldIndex, 1 );
        this._items.splice( index, 0, item );
        this._needsDraw = true;

        /**
         * Raised when the order of the indexes has been changed.
         * @event item-index-change
         * @memberOf OpenSeadragon.World
         * @type {object}
         * @property {OpenSeadragon.World} eventSource - A reference to the World which raised the event.
         * @property {OpenSeadragon.TiledImage} item - The item whose index has
         * been changed
         * @property {Number} previousIndex - The previous index of the item
         * @property {Number} newIndex - The new index of the item
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'item-index-change', {
            item: item,
            previousIndex: oldIndex,
            newIndex: index
        } );
    },

    /**
     * Remove an item.
     * @param {OpenSeadragon.TiledImage} item - The item to remove.
     * @fires OpenSeadragon.World.event:remove-item
     * @fires OpenSeadragon.World.event:metrics-change
     */
    removeItem: function( item ) {
        $.console.assert(item, "[World.removeItem] item is required");

        var index = $.indexOf(this._items, item );
        if ( index === -1 ) {
            return;
        }

        item.removeHandler('bounds-change', this._delegatedFigureSizes);
        item.removeHandler('clip-change', this._delegatedFigureSizes);
        item.destroy();
        this._items.splice( index, 1 );
        this._figureSizes();
        this._needsDraw = true;
        this._raiseRemoveItem(item);
    },

    /**
     * Remove all items.
     * @fires OpenSeadragon.World.event:remove-item
     * @fires OpenSeadragon.World.event:metrics-change
     */
    removeAll: function() {
        // We need to make sure any pending images are canceled so the world items don't get messed up
        this.viewer._cancelPendingImages();
        var item;
        var i;
        for (i = 0; i < this._items.length; i++) {
            item = this._items[i];
            item.removeHandler('bounds-change', this._delegatedFigureSizes);
            item.removeHandler('clip-change', this._delegatedFigureSizes);
            item.destroy();
        }

        var removedItems = this._items;
        this._items = [];
        this._figureSizes();
        this._needsDraw = true;

        for (i = 0; i < removedItems.length; i++) {
            item = removedItems[i];
            this._raiseRemoveItem(item);
        }
    },

    /**
     * Clears all tiles and triggers updates for all items.
     */
    resetItems: function() {
        for ( var i = 0; i < this._items.length; i++ ) {
            this._items[i].reset();
        }
    },

    /**
     * Updates (i.e. animates bounds of) all items.
     */
    update: function() {
        var animated = false;
        for ( var i = 0; i < this._items.length; i++ ) {
            animated = this._items[i].update() || animated;
        }

        return animated;
    },

    /**
     * Draws all items.
     */
    draw: function() {
        for ( var i = 0; i < this._items.length; i++ ) {
            this._items[i].draw();
        }

        this._needsDraw = false;
    },

    /**
     * @returns {Boolean} true if any items need updating.
     */
    needsDraw: function() {
        for ( var i = 0; i < this._items.length; i++ ) {
            if ( this._items[i].needsDraw() ) {
                return true;
            }
        }
        return this._needsDraw;
    },

    /**
     * @returns {OpenSeadragon.Rect} The smallest rectangle that encloses all items, in viewport coordinates.
     */
    getHomeBounds: function() {
        return this._homeBounds.clone();
    },

    /**
     * To facilitate zoom constraints, we keep track of the pixel density of the
     * densest item in the World (i.e. the item whose content size to viewport size
     * ratio is the highest) and save it as this "content factor".
     * @returns {Number} the number of content units per viewport unit.
     */
    getContentFactor: function() {
        return this._contentFactor;
    },

    /**
     * As a performance optimization, setting this flag to false allows the bounds-change event handler
     * on tiledImages to skip calculations on the world bounds. If a lot of images are going to be positioned in
     * rapid succession, this is a good idea. When finished, setAutoRefigureSizes should be called with true
     * or the system may behave oddly.
     * @param {Boolean} [value] The value to which to set the flag.
     */
    setAutoRefigureSizes: function(value) {
        this._autoRefigureSizes = value;
        if (value & this._needsSizesFigured) {
            this._figureSizes();
            this._needsSizesFigured = false;
        }
    },

    /**
     * Arranges all of the TiledImages with the specified settings.
     * @param {Object} options - Specifies how to arrange.
     * @param {Boolean} [options.immediately=false] - Whether to animate to the new arrangement.
     * @param {String} [options.layout] - See collectionLayout in {@link OpenSeadragon.Options}.
     * @param {Number} [options.rows] - See collectionRows in {@link OpenSeadragon.Options}.
     * @param {Number} [options.columns] - See collectionColumns in {@link OpenSeadragon.Options}.
     * @param {Number} [options.tileSize] - See collectionTileSize in {@link OpenSeadragon.Options}.
     * @param {Number} [options.tileMargin] - See collectionTileMargin in {@link OpenSeadragon.Options}.
     * @fires OpenSeadragon.World.event:metrics-change
     */
    arrange: function(options) {
        options = options || {};
        var immediately = options.immediately || false;
        var layout = options.layout || $.DEFAULT_SETTINGS.collectionLayout;
        var rows = options.rows || $.DEFAULT_SETTINGS.collectionRows;
        var columns = options.columns || $.DEFAULT_SETTINGS.collectionColumns;
        var tileSize = options.tileSize || $.DEFAULT_SETTINGS.collectionTileSize;
        var tileMargin = options.tileMargin || $.DEFAULT_SETTINGS.collectionTileMargin;
        var increment = tileSize + tileMargin;
        var wrap;
        if (!options.rows && columns) {
            wrap = columns;
        } else {
            wrap = Math.ceil(this._items.length / rows);
        }
        var x = 0;
        var y = 0;
        var item, box, width, height, position;

        this.setAutoRefigureSizes(false);
        for (var i = 0; i < this._items.length; i++) {
            if (i && (i % wrap) === 0) {
                if (layout === 'horizontal') {
                    y += increment;
                    x = 0;
                } else {
                    x += increment;
                    y = 0;
                }
            }

            item = this._items[i];
            box = item.getBounds();
            if (box.width > box.height) {
                width = tileSize;
            } else {
                width = tileSize * (box.width / box.height);
            }

            height = width * (box.height / box.width);
            position = new $.Point(x + ((tileSize - width) / 2),
                y + ((tileSize - height) / 2));

            item.setPosition(position, immediately);
            item.setWidth(width, immediately);

            if (layout === 'horizontal') {
                x += increment;
            } else {
                y += increment;
            }
        }
        this.setAutoRefigureSizes(true);
    },

    // private
    _figureSizes: function() {
        var oldHomeBounds = this._homeBounds ? this._homeBounds.clone() : null;
        var oldContentSize = this._contentSize ? this._contentSize.clone() : null;
        var oldContentFactor = this._contentFactor || 0;

        if (!this._items.length) {
            this._homeBounds = new $.Rect(0, 0, 1, 1);
            this._contentSize = new $.Point(1, 1);
            this._contentFactor = 1;
        } else {
            var item = this._items[0];
            var bounds = item.getBounds();
            this._contentFactor = item.getContentSize().x / bounds.width;
            var clippedBounds = item.getClippedBounds().getBoundingBox();
            var left = clippedBounds.x;
            var top = clippedBounds.y;
            var right = clippedBounds.x + clippedBounds.width;
            var bottom = clippedBounds.y + clippedBounds.height;
            for (var i = 1; i < this._items.length; i++) {
                item = this._items[i];
                bounds = item.getBounds();
                this._contentFactor = Math.max(this._contentFactor,
                    item.getContentSize().x / bounds.width);
                clippedBounds = item.getClippedBounds().getBoundingBox();
                left = Math.min(left, clippedBounds.x);
                top = Math.min(top, clippedBounds.y);
                right = Math.max(right, clippedBounds.x + clippedBounds.width);
                bottom = Math.max(bottom, clippedBounds.y + clippedBounds.height);
            }

            this._homeBounds = new $.Rect(left, top, right - left, bottom - top);
            this._contentSize = new $.Point(
                this._homeBounds.width * this._contentFactor,
                this._homeBounds.height * this._contentFactor);
        }

        if (this._contentFactor !== oldContentFactor ||
            !this._homeBounds.equals(oldHomeBounds) ||
            !this._contentSize.equals(oldContentSize)) {
            /**
             * Raised when the home bounds or content factor change.
             * @event metrics-change
             * @memberOf OpenSeadragon.World
             * @type {object}
             * @property {OpenSeadragon.World} eventSource - A reference to the World which raised the event.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent('metrics-change', {});
        }
    },

    // private
    _raiseRemoveItem: function(item) {
        /**
         * Raised when an item is removed.
         * @event remove-item
         * @memberOf OpenSeadragon.World
         * @type {object}
         * @property {OpenSeadragon.World} eventSource - A reference to the World which raised the event.
         * @property {OpenSeadragon.TiledImage} item - The item's underlying item.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent( 'remove-item', { item: item } );
    }
});

}( OpenSeadragon ));

//# sourceMappingURL=openseadragon.js.map