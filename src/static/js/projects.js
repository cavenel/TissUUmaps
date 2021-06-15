/**
 * @file projects.js
 * @author Christophe Avenel
 * @see {@link projects}
 */

/**
 * @namespace projects
 * @version projects 2.0
 * @classdesc The root namespace for projects.
 */
 projects = {
     _activeState:{}
}

/** 
 * Get all the buttons from the interface and assign all the functions associated to them */
 projects.registerActions = function () {
    interfaceUtils.listen('save_project_menu', 'click', function() { projects.saveProject() }, false);
}

/**
 * This method is used to save the TissUUmaps state (gene expression, cell morphology, regions) */
 projects.saveProject = function(urlProject) {
    $('#loadingModal').modal('show');
    var op = tmapp["object_prefix"];
    var cpop = "CP";
    var relativeLayers = [];
    var relativePaths = [];
    if (urlProject == undefined) {
        tmapp.layers.forEach(function(layer) {
            relativePaths.push(layer.tileSource)
        });
        commonPath = projects.commonPath(tmapp.layers);
    }
    else {
        commonPath = urlProject.substring(0, urlProject.lastIndexOf('/')+2);
    }
    tmapp.layers.forEach(function(layer) {
        var filename = layer.tileSource.substring(commonPath.length, layer.tileSource.length);
        relativeLayers.push(
            {name: layer.name, tileSource: filename}
        )
        relativePaths.push(layer.tileSource)
    });
    if (urlProject == undefined) {
        filename = prompt("Save project under the name:","NewProject");
        subfolder = window.location.pathname.substring(0, window.location.pathname.indexOf('/'));
        subfolder = subfolder + commonPath
        //subfolder = subfolder.replace(commonPath,"");
        urlProject = subfolder + "/" + filename + ".tmap"
        if (urlProject[0] == "/" && urlProject[1] == "/") urlProject = urlProject.substring(1, urlProject.length);
        console.log(subfolder, filename, urlProject)
    }
    else {
        urlProject = "/" + urlProject + ".tmap" // TODO fix "/" + urlProject + ".tmap"
        filename = urlProject.substring( urlProject.lastIndexOf('/'),urlProject.length);
    }

    state = projects._activeState;
    state.regions = regionUtils._regions;
    state.layers = relativeLayers;
    state.filename = filename;
    state.filters = filterUtils._filtersUsed;
    state.layerFilters = filterUtils._filterItems;
    state.compositeMode = filterUtils._compositeMode;
    state.layerOpacities = {}
    state.layerVisibilities = {}
    tmapp.layers.forEach(function(layer, i) {
        state.layerOpacities[i] = $("#opacity-layer-"+i).val();
        state.layerVisibilities[i] = $("#visible-layer-"+i).is(":checked");
    });
    
    $.ajax({
        type: "POST",
        url: urlProject,
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(state),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            $('#loadingModal').modal('hide');
        },
        failure: function(errMsg) {
            $('#loadingModal').modal('hide');
            alert(errMsg);
        }
    });
    return true;
}

/**
 * This method is used to load the TissUUmaps state (gene expression, cell morphology, regions) */
 projects.loadProject = function(state) {
    /*
    {
        markerFiles: [
            {
                path: "my/server/path.csv",
                title: "",
                comment: ""
            }
        ],
        CPFiles: [],
        regionFiles: [],
        layers: [
            {
                name:"",
                path:""
            }
        ],
        filters: [
            {
                name:"",
                default:"",
            }
        ],
        compositeMode: ""
    }
    */
    if (state.regions) {
        var maxregionid=0;
        for(i in state.regions){
            //console.log(regions[i]);
            regionUtils.createImportedRegion(state.regions[i]);
            var numbers = state.regions[i].id.match(/\d+/g).map(Number);
            if(numbers[0]>maxregionid) maxregionid=numbers[0];
        }
        regionUtils._currentRegionId=maxregionid;		
    }
    projects._activeState = state;
    tmapp.fixed_file = "";
    if (state.compositeMode) {
        filterUtils._compositeMode = state.compositeMode;
    }
    if (state.markerFiles) {
        state.markerFiles.forEach(function(markerFile) {
            HTMLElementUtils.createDLButtonMarkers(
                markerFile.title,
                markerFile.path,
                markerFile.comment,
                markerFile.expectedCSV,
                markerFile.autoLoad
            );
        });
    }
    if (state.CPFiles) {
        state.CPFiles.forEach(function(CPFile) {
            HTMLElementUtils.createDLButtonMarkersCP(
                CPFile.title,
                CPFile.path,
                CPFile.comment,
                CPFile.expectedCSV,
                CPFile.autoLoad
            );
        });
    }
    if (state.regionFiles) {
        state.regionFiles.forEach(function(regionFile) {
            HTMLElementUtils.createDLButtonRegions(
                regionFile.title,
                regionFile.path,
                regionFile.comment,
                regionFile.autoLoad
            );
        });
    }
    if (state.slideFilename) {
        tmapp.slideFilename = state.slideFilename;
        document.getElementById("project_title").innerText = state.slideFilename;
    }
    if (state.hideCSVImport) {
        document.getElementById("ISS_data_panel").style.display="none";
        document.getElementById("CP_data_panel").style.display="none";
    }
    tmapp.layers = [];
    subfolder = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
    state.layers.forEach(function(layer) {
        pathname = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
        tmapp.layers.push(
            {name: layer.name, tileSource: subfolder + "/" + layer.tileSource}
        )
    });
    if (state.filters) {
        filterUtils._filtersUsed = state.filters;
        $(".filterSelection").prop("checked",false);
        state.filters.forEach(function(filterused, i) {
            console.log("#filterCheck_" + filterused, $("#filterCheck_" + filterused));
            $("#filterCheck_" + filterused).prop("checked",true);
        });
    }
    if (state.layerFilters) {
        filterUtils._filterItems = state.layerFilters;
    }
    tmapp[tmapp["object_prefix"] + "_viewer"].world.removeAll();
    overlayUtils.addAllLayers();
    if (state.layerOpacities && state.layerVisibilities) {
        $(".visible-layers").prop("checked",true);$(".visible-layers").click();
    }
    if (state.compositeMode) {
        filterUtils._compositeMode = state.compositeMode;
        filterUtils.setCompositeOperation();
    }
    if (state.settings) {
        state.settings.forEach(function(setting, i) {
            window[setting.module][setting.function] = setting.value;
        });
    }
    setTimeout(function(){
        if (state.compositeMode) {
            filterUtils._compositeMode = state.compositeMode;
            filterUtils.setCompositeOperation();
        }
        if (state.layerOpacities && state.layerVisibilities) {
            tmapp.layers.forEach(function(layer, i) {
                console.log("state.layerOpacities[i]",i,state.layerOpacities[i])
                $("#opacity-layer-"+i).val(state.layerOpacities[i]);
                if (state.layerVisibilities[i] != 0) {
                    $("#visible-layer-"+i).click();
                }
            });
        }
    },300);
    
    //tmapp[tmapp["object_prefix"] + "_viewer"].world.resetItems()
}

/**
 * Given an array of layers, return the longest common path
 * @param {!Array<!layers>} strs
 * @returns {string}
 */
projects.commonPath = function(strs) {
    let prefix = ""
    if(strs === null || strs.length === 0) return prefix

    for (let i=0; i < strs[0].tileSource.length; i++){ 
        const char = strs[0].tileSource[i] // loop through all characters of the very first string. 

        for (let j = 1; j < strs.length; j++){ 
            // loop through all other strings in the array
            if(strs[j].tileSource[i] !== char) {
                prefix = prefix.substring(0, prefix.lastIndexOf('/')+1);
                return prefix
            }
        }
        prefix = prefix + char
    }
    prefix = prefix.substring(0, prefix.lastIndexOf('/')+1);
    return prefix
}