/**
 * @file Feature_Space.js
 * @author Christophe Avenel
 */

/**
 * @namespace Feature_Space
 * @classdesc The root namespace for Feature_Space.
 */
var Feature_Space;
Feature_Space = {
  name: "Feature_Space Plugin",
  _dataset: null,
  _UMAP1: null,
  _UMAP2: null,
  _region: null,
  _regionPixels: null,
  _regionWin: null,
  _newwin: null,
  _showHisto: true,
  _histoKey: false,
};

/**
 * @summary */
Feature_Space.init = function (container) {
  var script = document.createElement("script");
  script.src = "https://cdn.plot.ly/plotly-2.9.0.min.js";
  document.head.appendChild(script);
  row1 = HTMLElementUtils.createRow({});
  col11 = HTMLElementUtils.createColumn({ width: 12 });
  button111 = HTMLElementUtils.createButton({
    extraAttributes: { class: "btn btn-primary mx-2" },
  });
  button111.innerText = "Refresh drop-down lists based on loaded markers";

  row2 = HTMLElementUtils.createRow({});
  col21 = HTMLElementUtils.createColumn({ width: 12 });
  select211 = HTMLElementUtils.createElement({
    kind: "select",
    id: "Feature_Space_dataset",
    extraAttributes: {
      class: "form-select form-select-sm",
      "aria-label": ".form-select-sm",
    },
  });
  label212 = HTMLElementUtils.createElement({
    kind: "label",
    extraAttributes: { for: "Feature_Space_dataset" },
  });
  label212.innerText = "Select marker dataset";

  row3 = HTMLElementUtils.createRow({});
  col31 = HTMLElementUtils.createColumn({ width: 12 });
  select311 = HTMLElementUtils.createElement({
    kind: "select",
    id: "umap_0",
    extraAttributes: {
      class: "form-select form-select-sm",
      "aria-label": ".form-select-sm",
    },
  });
  label312 = HTMLElementUtils.createElement({
    kind: "label",
    extraAttributes: { for: "umap_0" },
  });
  label312.innerText = "Select Feature Space X";

  row4 = HTMLElementUtils.createRow({});
  col41 = HTMLElementUtils.createColumn({ width: 12 });
  select411 = HTMLElementUtils.createElement({
    kind: "select",
    id: "umap_1",
    extraAttributes: {
      class: "form-select form-select-sm",
      "aria-label": ".form-select-sm",
    },
  });
  label412 = HTMLElementUtils.createElement({
    kind: "label",
    extraAttributes: { for: "umap_1" },
  });
  label412.innerText = "Select Feature Space Y";

  row6 = HTMLElementUtils.createRow({});
  col61 = HTMLElementUtils.createColumn({ width: 12 });
  var input611 = HTMLElementUtils.createElement({
    kind: "input",
    id: "Feature_Space_showHisto",
    extraAttributes: {
      class: "form-check-input",
      type: "checkbox",
      checked: true,
    },
  });
  label611 = HTMLElementUtils.createElement({
    kind: "label",
    extraAttributes: { for: "Feature_Space_showHisto" },
  });
  label611.innerHTML = "&nbsp;Show histogram of selected markers";

  row7 = HTMLElementUtils.createRow({});
  col71 = HTMLElementUtils.createColumn({ width: 12 });
  select711 = HTMLElementUtils.createElement({
    kind: "select",
    id: "Feature_Space_histoKey",
    extraAttributes: {
      class: "form-select form-select-sm",
      "aria-label": ".form-select-sm",
    },
  });
  label712 = HTMLElementUtils.createElement({
    kind: "label",
    extraAttributes: { for: "Feature_Space_histoKey" },
  });
  label712.innerText = "Select Histogram Key";

  input611.addEventListener("change", (event) => {
    Feature_Space._showHisto = input611.checked;
    if (Feature_Space._showHisto) {
      Feature_Space.getHisto();
    } else {
      Feature_Space_Control.style.height = "100%";
      histoView = document.getElementById("histoView");
      if (histoView) {
        histoView.parentNode.parentNode.removeChild(histoView.parentNode);
      }
    }
  });

  row5 = HTMLElementUtils.createRow({});
  col51 = HTMLElementUtils.createColumn({ width: 12 });
  button511 = HTMLElementUtils.createButton({
    extraAttributes: { class: "btn btn-primary mx-2" },
  });
  button511.innerText = "Display Feature Space";

  button111.addEventListener("click", (event) => {
    interfaceUtils.cleanSelect("Feature_Space_dataset");
    interfaceUtils.cleanSelect("umap_0");
    interfaceUtils.cleanSelect("umap_1");
    interfaceUtils.cleanSelect("Feature_Space_histoKey");

    var datasets = Object.keys(dataUtils.data).map(function (e, i) {
      return {
        value: e,
        innerHTML: document.getElementById(e + "_tab-name").value,
      };
    });
    interfaceUtils.addObjectsToSelect("Feature_Space_dataset", datasets);
    var event = new Event("change");
    interfaceUtils.getElementById("Feature_Space_dataset").dispatchEvent(event);
  });

  select211.addEventListener("change", (event) => {
    Feature_Space._dataset = select211.value;
    if (!dataUtils.data[Feature_Space._dataset]) return;
    interfaceUtils.cleanSelect("umap_0");
    interfaceUtils.addElementsToSelect(
      "umap_0",
      dataUtils.data[Feature_Space._dataset]._csv_header
    );
    interfaceUtils.cleanSelect("umap_1");
    interfaceUtils.addElementsToSelect(
      "umap_1",
      dataUtils.data[Feature_Space._dataset]._csv_header
    );
    interfaceUtils.cleanSelect("Feature_Space_histoKey");
    interfaceUtils.addElementsToSelect(
      "Feature_Space_histoKey",
      dataUtils.data[Feature_Space._dataset]._csv_header
    );
    if (
      dataUtils.data[Feature_Space._dataset]._csv_header.indexOf("umap_0") > 0
    ) {
      interfaceUtils.getElementById("umap_0").value = "umap_0";
      var event = new Event("change");
      interfaceUtils.getElementById("umap_0").dispatchEvent(event);
    }
    if (
      dataUtils.data[Feature_Space._dataset]._csv_header.indexOf("umap_1") > 0
    ) {
      interfaceUtils.getElementById("umap_1").value = "umap_1";
      var event = new Event("change");
      interfaceUtils.getElementById("umap_1").dispatchEvent(event);
    }
    if (
      dataUtils.data[Feature_Space._dataset]._csv_header.indexOf(
        dataUtils.data[Feature_Space._dataset]._gb_col
      ) > 0
    ) {
      interfaceUtils.getElementById("Feature_Space_histoKey").value =
        dataUtils.data[Feature_Space._dataset]._gb_col;
      var event = new Event("change");
      interfaceUtils
        .getElementById("Feature_Space_histoKey")
        .dispatchEvent(event);
    }
  });
  select311.addEventListener("change", (event) => {
    Feature_Space._UMAP1 = select311.value;
  });
  select411.addEventListener("change", (event) => {
    Feature_Space._UMAP2 = select411.value;
  });
  select711.addEventListener("change", (event) => {
    Feature_Space._histoKey = select711.value;
    /*var pointsIn = Feature_Space.analyzeRegion(
      Feature_Space._region,
      Feature_Space._regionWin
    );
    Feature_Space.getHisto();*/
  });

  button511.addEventListener("click", (event) => {
    Feature_Space.run();
  });

  container.innerHTML = "";
  // container.appendChild(row0);
  container.appendChild(row1);
  row1.appendChild(col11);
  col11.appendChild(button111);
  container.appendChild(row2);
  row2.appendChild(col21);
  col21.appendChild(label212);
  col21.appendChild(select211);
  container.appendChild(row3);
  row3.appendChild(col31);
  col31.appendChild(label312);
  col31.appendChild(select311);
  container.appendChild(row4);
  row4.appendChild(col41);
  col41.appendChild(label412);
  col41.appendChild(select411);
  container.appendChild(row6);
  row6.appendChild(col61);
  col61.appendChild(input611);
  col61.appendChild(label611);
  container.appendChild(row7);
  row7.appendChild(col71);
  col71.appendChild(label712);
  col71.appendChild(select711);
  container.appendChild(row5);
  row5.appendChild(col51);
  col51.appendChild(button511);
  var event = new Event("click");
  button111.dispatchEvent(event);

  var textInfo = document.createElement("div");
  textInfo.style.marginTop = "10px";
  textInfo.innerHTML = "Hold shift to draw a region around markers";
  container.appendChild(textInfo);
};

function copyDataset(dataIn, dataOut) {
  var headers = interfaceUtils._mGenUIFuncs.getTabDropDowns(
    Feature_Space._dataset
  );
  dataOut["expectedHeader"] = Object.assign(
    {},
    ...Object.keys(headers).map((k) => ({ [k]: headers[k].value }))
  );
  var radios = interfaceUtils._mGenUIFuncs.getTabRadiosAndChecks(
    Feature_Space._dataset
  );
  dataOut["expectedRadios"] = Object.assign(
    {},
    ...Object.keys(radios).map((k) => ({ [k]: radios[k].checked }))
  );
  dataOut["expectedHeader"]["X"] = Feature_Space._UMAP1;
  dataOut["expectedHeader"]["Y"] = Feature_Space._UMAP2;
  dataOut["expectedRadios"]["collectionItem_col"] = false;
  dataOut["expectedRadios"]["collectionItem_fixed"] = true;
  for (var key of Object.keys(dataIn)) {
    if (
      ["_X", "_Y", "expectedHeader", "expectedRadios", "_groupgarden"].indexOf(
        key
      ) == -1
    ) {
      dataOut[key] = dataIn[key];
    } else if (key == "_X") {
      dataOut[key] = Feature_Space._UMAP1;
    } else if (key == "_Y") {
      dataOut[key] = Feature_Space._UMAP2;
    }
  }
  dataOut["_collectionItem_col"] = null;
  dataOut["_collectionItem_fixed"] = 0;
}

Feature_Space.run = function () {
  var op = tmapp["object_prefix"];
  var vname = op + "_viewer";
  var Feature_Space_Control = document.getElementById("Feature_Space_Control");
  if (Feature_Space_Control) {
    Feature_Space.clear();
  }
  Feature_Space_Control = document.createElement("iframe");
  Feature_Space_Control.id = "Feature_Space_Control";
  Feature_Space_Control.style.width = "100%";
  Feature_Space_Control.style.height = "100%";
  Feature_Space_Control.style.borderLeft = "1px solid #aaa";
  Feature_Space_Control.style.display = "inline-block";
  var elt = document.createElement("div");
  elt.style.width = "40%";
  elt.style.height = "100%";
  elt.style.display = "inline-block";
  elt.style.verticalAlign = "top";
  elt.appendChild(Feature_Space_Control);
  document.getElementById("ISS_viewer").appendChild(elt);
  $(".openseadragon-container")[0].style.display = "inline-flex";
  $(".openseadragon-container")[0].style.width = "60%";

  Feature_Space_Control.addEventListener("load", (ev) => {
    Feature_Space_Control.classList.add("d-none");
    var timeout = setTimeout(function () {
      var newwin = Feature_Space_Control.contentWindow;
      Feature_Space._newwin = newwin;
      //OSD handlers are not registered manually they have to be registered
      //using MouseTracker OSD objects
      if (newwin.tmapp.ISS_viewer) {
        clearInterval(timeout);
      } else {
        return;
      }
      Feature_Space.getHisto();
      Feature_Space._newwin.tmapp[
        vname
      ].viewport.preserveImageSizeOnResize = false;
      Feature_Space._newwin.tmapp[vname].viewport.visibilityRatio = 1.0;
      new Feature_Space._newwin.OpenSeadragon.MouseTracker({
        element: Feature_Space._newwin.tmapp[vname].canvas,
        moveHandler: (event) =>
          Feature_Space.moveHandler(event, Feature_Space._newwin, window),
      }).setTracking(true);

      Feature_Space._newwin.tmapp["ISS_viewer"].addHandler(
        "canvas-press",
        (event) => {
          Feature_Space.pressHandler(event, Feature_Space._newwin, window);
        }
      );
      Feature_Space._newwin.tmapp["ISS_viewer"].addHandler(
        "canvas-release",
        (event) => {
          Feature_Space.releaseHandler(event, Feature_Space._newwin, window);
        }
      );
      Feature_Space._newwin.tmapp["ISS_viewer"].addHandler(
        "canvas-drag",
        (event) => {
          if (event.originalEvent.shiftKey) event.preventDefaultAction = true;
        }
      );
      Feature_Space._newwin.tmapp["ISS_viewer"].addHandler(
        "animation-finish",
        function animationFinishHandler(event) {
          Feature_Space._newwin.d3
            .selectAll(".region_UMAP")
            .selectAll("polyline")
            .each(function (el) {
              $(this).attr(
                "stroke-width",
                (2 * regionUtils._polygonStrokeWidth) /
                  Feature_Space._newwin.tmapp["ISS_viewer"].viewport.getZoom()
              );
            });
          Feature_Space._newwin.d3
            .selectAll(".region_UMAP")
            .selectAll("circle")
            .each(function (el) {
              $(this).attr(
                "r",
                (10 * regionUtils._handleRadius) /
                  Feature_Space._newwin.tmapp["ISS_viewer"].viewport.getZoom()
              );
            });
          Feature_Space._newwin.d3
            .selectAll(".region_UMAP")
            .each(function (el) {
              $(this).attr(
                "stroke-width",
                (2 * regionUtils._polygonStrokeWidth) /
                  Feature_Space._newwin.tmapp["ISS_viewer"].viewport.getZoom()
              );
            });
        }
      );

      new OpenSeadragon.MouseTracker({
        element: tmapp[vname].canvas,
        moveHandler: (event) =>
          Feature_Space.moveHandler(event, window, Feature_Space._newwin),
      }).setTracking(true);

      tmapp["ISS_viewer"].addHandler("canvas-press", (event) => {
        Feature_Space.pressHandler(event, window, Feature_Space._newwin);
      });
      tmapp["ISS_viewer"].addHandler("canvas-release", (event) => {
        Feature_Space.releaseHandler(event, window, Feature_Space._newwin);
      });
      tmapp["ISS_viewer"].addHandler("canvas-drag", (event) => {
        if (event.originalEvent.shiftKey) event.preventDefaultAction = true;
      });
      tmapp["ISS_viewer"].addHandler(
        "animation-finish",
        function animationFinishHandler(event) {
          d3.selectAll(".region_UMAP")
            .selectAll("polyline")
            .each(function (el) {
              $(this).attr(
                "stroke-width",
                (2 * regionUtils._polygonStrokeWidth) /
                  tmapp["ISS_viewer"].viewport.getZoom()
              );
            });
          d3.selectAll(".region_UMAP")
            .selectAll("circle")
            .each(function (el) {
              $(this).attr(
                "r",
                (10 * regionUtils._handleRadius) /
                  tmapp["ISS_viewer"].viewport.getZoom()
              );
            });
          d3.selectAll(".region_UMAP").each(function (el) {
            $(this).attr(
              "stroke-width",
              (2 * regionUtils._polygonStrokeWidth) /
                tmapp["ISS_viewer"].viewport.getZoom()
            );
          });
        }
      );

      newwin.projectUtils._activeState = JSON.parse(
        JSON.stringify(projectUtils._activeState)
      );
      newwin.filterUtils._compositeMode = filterUtils._compositeMode;
      try {
        newwin.interfaceUtils.generateDataTabUI({
          uid: Feature_Space._dataset,
          name: "UMAP",
        });
      } catch (error) {}
      newwin.dataUtils.data[Feature_Space._dataset] = {};
      copyDataset(
        dataUtils.data[Feature_Space._dataset],
        newwin.dataUtils.data[Feature_Space._dataset]
      );

      newwin.dataUtils.createMenuFromCSV(
        Feature_Space._dataset,
        newwin.dataUtils.data[Feature_Space._dataset]["_processeddata"].columns
      );
      let main_button = newwin.document.getElementById("ISS_collapse_btn");
      main_button.classList.add("d-none");
      newwin.interfaceUtils.toggleRightPanel();
      newwin.document.getElementById("main-navbar").classList.add("d-none");
      newwin.document
        .getElementById("floating-navbar-toggler")
        .classList.add("d-none");
      newwin.document
        .getElementById("powered_by_tissuumaps")
        .classList.add("d-none");
      let elt = document.createElement("div");
      elt.className = "closeFeature_Space px-1 mx-1 viewer-layer";
      elt.id = "closeFeature_Space";
      elt.style.zIndex = "100";
      elt.style.cursor = "pointer";
      elt.innerHTML = "<i class='bi bi-x-lg'></i>";
      elt.addEventListener("click", function (event) {
        Feature_Space.clear();
      });
      newwin.tmapp.ISS_viewer.addControl(elt, {
        anchor: OpenSeadragon.ControlAnchor.TOP_LEFT,
      });
      newwin.tmapp.ISS_viewer.close();
      Feature_Space_Control.classList.remove("d-none");
      newwin.document
        .getElementsByClassName("navigator ")[0]
        .classList.add("d-none");
      setTimeout(function () {
        var copySettings = function () {
          setTimeout(function () {
            newwin = Feature_Space._newwin;
            copyDataset(
              dataUtils.data[Feature_Space._dataset],
              newwin.dataUtils.data[Feature_Space._dataset]
            );
            $(
              "." +
                Feature_Space._dataset +
                "-marker-input, ." +
                Feature_Space._dataset +
                "-marker-hidden, ." +
                Feature_Space._dataset +
                "-marker-color, ." +
                Feature_Space._dataset +
                "-marker-shape"
            )
              .each(function (i, elt) {
                newwin.document.getElementById(elt.id).value = elt.value;
                newwin.document.getElementById(elt.id).checked = elt.checked;
              })
              .promise()
              .done(function () {
                newwin.glUtils.loadMarkers(Feature_Space._dataset);
                newwin.glUtils.draw();
              });
          }, 100);
        };
        if (glUtils.temp_draw === undefined) {
          glUtils.temp_draw = glUtils.draw;
          glUtils.draw = function () {
            glUtils.temp_draw();
            copySettings();
          };
          glUtils.temp_updateColorLUTTexture = glUtils._updateColorLUTTexture;
          glUtils._updateColorLUTTexture = function (gl, uid, texture) {
            glUtils.temp_updateColorLUTTexture(gl, uid, texture);
            copySettings();
          };
          dataUtils.temp_updateViewOptions = dataUtils.updateViewOptions;
          dataUtils.updateViewOptions = function (data_id) {
            dataUtils.temp_updateViewOptions(data_id);
            copyDataset(
              dataUtils.data[Feature_Space._dataset],
              newwin.dataUtils.data[Feature_Space._dataset]
            );
            newwin.dataUtils.createMenuFromCSV(
              Feature_Space._dataset,
              newwin.dataUtils.data[Feature_Space._dataset]["_processeddata"]
                .columns
            );
          };
        }
        if (interfaceUtils.temp_toggleRightPanel === undefined) {
          interfaceUtils.temp_toggleRightPanel =
            interfaceUtils.toggleRightPanel;
          interfaceUtils.toggleRightPanel = function () {
            interfaceUtils.temp_toggleRightPanel();
            Plotly.Plots.resize(document.getElementById("histoView"));
          };
        }
      }, 200);
    }, 200);
  });

  Feature_Space_Control.classList.add("d-none");
  Feature_Space_Control.setAttribute("src", "/");
};

Feature_Space.clear = function () {
  Feature_Space_Control = document.getElementById("Feature_Space_Control");
  Feature_Space_Control.parentNode.remove();
  $(".openseadragon-container")[0].style.display = "block";
  $(".openseadragon-container")[0].style.width = "100%";
};

Feature_Space.pressHandler = function (event, win, mainwin) {
  var OSDviewer = win.tmapp[tmapp["object_prefix"] + "_viewer"];

  if (event.originalEvent.shiftKey) {
    win.tmapp.ISS_viewer.gestureSettingsMouse.dragToPan = false;
    var normCoords = OSDviewer.viewport.pointFromPixel(event.position);
    var nextpoint = [normCoords.x, normCoords.y];
    Feature_Space._region = [normCoords];
    Feature_Space._regionPixels = [event.position];
    Feature_Space._regionWin = win;
  } else {
    win.tmapp.ISS_viewer.gestureSettingsMouse.dragToPan = true;
    Feature_Space._region == [];
  }
  return;
};

Feature_Space.releaseHandler = function (event, win, mainwin) {
  if (Feature_Space._region == []) {
    return;
  }
  if (!event.originalEvent.shiftKey) {
    return;
  }
  var OSDviewer = win.tmapp[tmapp["object_prefix"] + "_viewer"];

  var canvas =
    win.overlayUtils._d3nodes[
      win.tmapp["object_prefix"] + "_regions_svgnode"
    ].node();
  var regionobj = d3.select(canvas).append("g").attr("class", "_UMAP_region");
  var elements = win.document.getElementsByClassName("region_UMAP");
  for (var element of elements) element.parentNode.removeChild(element);
  var elements = mainwin.document.getElementsByClassName("region_UMAP");
  for (var element of elements) element.parentNode.removeChild(element);
  Feature_Space._region.push(Feature_Space._region[0]);

  regionobj
    .append("path")
    .attr("d", win.regionUtils.pointsToPath([[Feature_Space._region]]))
    .attr("id", "path_UMAP")
    .attr("class", "region_UMAP")
    .attr(
      "stroke-width",
      (2 * regionUtils._polygonStrokeWidth) /
        win.tmapp["ISS_viewer"].viewport.getZoom()
    )
    .style("stroke", "#ff0000")
    .style("fill", "none");

  var pointsIn = Feature_Space.analyzeRegion(Feature_Space._region, win);
  var scalePropertyName = "UMAP_Region_scale";
  win.dataUtils.data[Feature_Space._dataset]["_scale_col"] = scalePropertyName;
  dataUtils.data[Feature_Space._dataset]["_scale_col"] = scalePropertyName;
  var markerData = win.dataUtils.data[Feature_Space._dataset]["_processeddata"];
  markerData[scalePropertyName] = new Float64Array(
    markerData[win.dataUtils.data[Feature_Space._dataset]["_X"]].length
  );
  var opacityPropertyName = "UMAP_Region_opacity";
  win.dataUtils.data[Feature_Space._dataset]["_opacity_col"] =
    opacityPropertyName;
  dataUtils.data[Feature_Space._dataset]["_opacity_col"] = opacityPropertyName;
  markerData[opacityPropertyName] = new Float64Array(
    markerData[win.dataUtils.data[Feature_Space._dataset]["_X"]].length
  );
  markerData[opacityPropertyName] = markerData[opacityPropertyName].map(
    function () {
      return 0.15;
    }
  );
  markerData[scalePropertyName] = markerData[scalePropertyName].map(
    function () {
      return 0.3;
    }
  );
  if (pointsIn.length == 0) {
    markerData[scalePropertyName] = markerData[scalePropertyName].map(
      function () {
        return 1;
      }
    );
    markerData[opacityPropertyName] = markerData[opacityPropertyName].map(
      function () {
        return 1;
      }
    );
  }
  for (var d of pointsIn) {
    markerData[scalePropertyName][d] = 1;
    markerData[opacityPropertyName][d] = 1;
  }
  if (Feature_Space._showHisto) {
    Feature_Space.getHisto();
  } else {
    Feature_Space_Control.style.height = "100%";
    histoView = document.getElementById("histoView");
    if (histoView) {
      histoView.parentNode.parentNode.removeChild(histoView.parentNode);
    }
  }
  win.glUtils.loadMarkers(Feature_Space._dataset);
  win.glUtils.draw();
  glUtils.loadMarkers(Feature_Space._dataset);
  glUtils.draw();
  return;
};

Feature_Space.moveHandler = function (event, win, mainwin) {
  if (event.buttons != 1 || Feature_Space._region == []) {
    //|| !event.shift) {
    //Feature_Space._region = [];
    //Feature_Space._regionPixels = [];
    //win.tmapp.ISS_viewer.setMouseNavEnabled(true);
    return;
  }
  if (win !== Feature_Space._regionWin) {
    return;
  }
  if (!event.originalEvent.shiftKey) {
    return;
  }
  var OSDviewer = win.tmapp[tmapp["object_prefix"] + "_viewer"];

  var normCoords = OSDviewer.viewport.pointFromPixel(event.position);

  var nextpoint = normCoords; //[normCoords.x, normCoords.y];
  Feature_Space._regionPixels.push(event.position);
  function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }
  if (Feature_Space._regionPixels.length > 1) {
    dis = distance(
      Feature_Space._regionPixels[Feature_Space._regionPixels.length - 1],
      Feature_Space._regionPixels[Feature_Space._regionPixels.length - 2]
    );
    if (dis < 5) {
      Feature_Space._regionPixels.pop();
      return;
    }
  }
  Feature_Space._region.push(nextpoint);
  var canvas =
    win.overlayUtils._d3nodes[
      win.tmapp["object_prefix"] + "_regions_svgnode"
    ].node();
  var regionobj = d3.select(canvas).append("g").attr("class", "_UMAP_region");
  var elements = win.document.getElementsByClassName("region_UMAP");
  for (var element of elements) element.parentNode.removeChild(element);
  var elements = mainwin.document.getElementsByClassName("region_UMAP");
  for (var element of elements) element.parentNode.removeChild(element);

  var polyline = regionobj
    .append("polyline")
    .attr(
      "points",
      Feature_Space._region.map(function (x) {
        return [x.x, x.y];
      })
    )
    .style("fill", "none")
    .attr(
      "stroke-width",
      (2 * regionUtils._polygonStrokeWidth) /
        win.tmapp["ISS_viewer"].viewport.getZoom()
    )
    .attr("stroke", "#ff0000")
    .attr("class", "region_UMAP");
  return;
};

Feature_Space.analyzeRegion = function (points, win) {
  Feature_Space._histogram = [];
  var pointsInside = [];
  var dataset = Feature_Space._dataset;
  var countsInsideRegion = {};
  var options = {
    globalCoords: true,
    xselector: win.dataUtils.data[dataset]["_X"],
    yselector: win.dataUtils.data[dataset]["_Y"],
    dataset: dataset,
  };
  var imageWidth = win.OSDViewerUtils.getImageWidth();
  var x0 = Math.min(
    ...points.map(function (x) {
      return x.x;
    })
  );
  var y0 = Math.min(
    ...points.map(function (x) {
      return x.y;
    })
  );
  var x3 = Math.max(
    ...points.map(function (x) {
      return x.x;
    })
  );
  var y3 = Math.max(
    ...points.map(function (x) {
      return x.y;
    })
  );
  var xselector = options.xselector;
  var yselector = options.yselector;
  var regionPath = win.document.getElementById("path_UMAP");
  var svgovname = win.tmapp["object_prefix"] + "_svgov";
  var svg = win.tmapp[svgovname]._svg;
  var tmpPoint = svg.createSVGPoint();

  var pointInBbox = [
    ...Array(
      win.dataUtils.data[dataset]["_processeddata"][xselector].length
    ).keys(),
  ];
  var markerData = win.dataUtils.data[dataset]["_processeddata"];
  var collectionItemIndex = win.glUtils._collectionItemIndex[dataset];
  const collectionItemPropertyName =
    win.dataUtils.data[dataset]["_collectionItem_col"];
  const useCollectionItemFromMarker =
    win.dataUtils.data[dataset]["_collectionItem_col"] != null;
  const worldCount = win.tmapp["ISS_viewer"].world.getItemCount();
  for (var d of pointInBbox) {
    if (useCollectionItemFromMarker) {
      LUTindex = markerData[collectionItemPropertyName][d];
    } else {
      LUTindex = collectionItemIndex;
    }
    LUTindex = LUTindex % worldCount;
    const image = win.tmapp["ISS_viewer"].world.getItemAt(LUTindex);
    var viewportCoord = image.imageToViewportCoordinates(
      markerData[xselector][d],
      markerData[yselector][d]
    );
    if (
      viewportCoord.x < x0 ||
      viewportCoord.x > x3 ||
      viewportCoord.y < y0 ||
      viewportCoord.y > y3
    ) {
      continue;
    }
    var key;
    if (
      win.regionUtils.globalPointInPath(
        viewportCoord.x,
        viewportCoord.y,
        regionPath,
        tmpPoint
      )
    ) {
      if (Feature_Space._histoKey) {
        key = markerData[Feature_Space._histoKey][d];
        if (countsInsideRegion[key] === undefined) {
          countsInsideRegion[key] = 0;
        }
      }
      countsInsideRegion[key] += 1;
      pointsInside.push(d);
    }
  }
  for (var key in countsInsideRegion) {
    var hexColor;
    if (
      !Feature_Space._histoKey ||
      Feature_Space._histoKey == win.dataUtils.data[dataset]._gb_col
    ) {
      var inputs = interfaceUtils._mGenUIFuncs.getGroupInputs(dataset, key);
      hexColor = "color" in inputs ? inputs["color"] : "#ff0000";
    } else {
      hexColor = "#ff0000";
    }
    Feature_Space._histogram.push({
      key: key,
      name: key,
      count: countsInsideRegion[key],
      color: hexColor,
    });
  }
  function compare(a, b) {
    if (a.count > b.count) return -1;
    if (a.count < b.count) return 1;
    return 0;
  }
  Feature_Space._histogram.sort(compare);
  return pointsInside;
};

/**
 *  @param {Object} quadtree d3.quadtree where the points are stored
 *  @param {Number} x0 X coordinate of one point in a bounding box
 *  @param {Number} y0 Y coordinate of one point in a bounding box
 *  @param {Number} x3 X coordinate of diagonal point in a bounding box
 *  @param {Number} y3 Y coordinate of diagonal point in a bounding box
 *  @param {Object} options Tell the function
 *  Search for points inside a particular region */
Feature_Space.searchTreeForPointsInBbox = function (
  quadtree,
  x0,
  y0,
  x3,
  y3,
  options
) {
  if (options.globalCoords) {
    var xselector = options.xselector;
    var yselector = options.yselector;
  } else {
    throw {
      name: "NotImplementedError",
      message: "ViewerPointInPath not yet implemented.",
    };
  }
  var pointsInside = [];
  quadtree.visit(function (node, x1, y1, x2, y2) {
    if (!node.length) {
      const markerData = dataUtils.data[options.dataset]["_processeddata"];
      const columns = dataUtils.data[options.dataset]["_csv_header"];
      for (const d of node.data) {
        const x = markerData[xselector][d];
        const y = markerData[yselector][d];
        if (x >= x0 && x < x3 && y >= y0 && y < y3) {
          pointsInside.push(d);
        }
      }
    }
    return x1 >= x3 || y1 >= y3 || x2 < x0 || y2 < y0;
  });
  return pointsInside;
};

Feature_Space.getHisto = function () {
  var op = tmapp["object_prefix"];
  var vname = op + "_viewer";

  histoView = document.getElementById("histoView");
  if (!histoView) {
    var histoView = document.createElement("div");
    histoView.id = "histoView";
    var elt = document.createElement("div");
    /*elt.classList.add("viewer-layer")
        elt.classList.add("px-1")
        elt.classList.add("mx-1")*/
    elt.style.display = "inline-block";
    elt.appendChild(histoView);

    var Feature_Space_Control = document.getElementById(
      "Feature_Space_Control"
    );
    Feature_Space_Control.style.height = "50%";
    Feature_Space_Control.parentNode.appendChild(elt);
    elt.style.height = "45%";
    elt.style.width = "100%";
  }
  if (Feature_Space._histogram === undefined) {
    histoView.innerHTML = "";
    return;
  }
  if (Object.keys(Feature_Space._histogram).length == 0) {
    histoView.innerHTML = "";
    return;
  }
  if (Feature_Space._histogram[0].count == 0) {
    histoView.innerHTML = "";
    return;
  }
  var histogram = Feature_Space._histogram.slice(0, 20).reverse();
  Feature_Space._plot = Plotly.newPlot(
    histoView,
    [
      {
        y: histogram.map(function (x) {
          return x.key + " -";
        }),
        x: histogram.map(function (x) {
          return x.count;
        }),
        type: "bar",
        orientation: "h",
        marker: {
          color: histogram.map(function (x) {
            return x.color;
          }),
        },
      },
    ],
    {
      margin: { t: 0, r: 0, b: 20, l: 20 },
      yaxis: {
        automargin: true,
      },
    },
    { responsive: true, displayModeBar: false }
  );
};
