/**
 * Copyright 2016, Sourcepole AG.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {configureMap} = require('../../MapStore2/web/client/actions/config');
const {changeSearch} = require('./search');
const ConfigUtils = require('../../MapStore2/web/client/utils/ConfigUtils');
const MapUtils = require('../../MapStore2/web/client/utils/MapUtils');
const UrlParams = require("../utils/UrlParams");
const assign = require('object-assign');
const axios = require('axios');

/*function restoreMapConfig(dispatch, params) {
    let mapConfig = {
        map: {
            center: {
                x: 0,
                y: 0,
                crs: "EPSG:4326"
            },
            zoom: 0,
            layers: []
        }
    };*/

function restoreMapConfig(dispatch, params, desktopDefaultConfig) {

    let mapConfig = {
        map: {
            center: {
                x: 0,
                y: 0,
                crs: "EPSG:4326"
            },
            zoom: 0,
            layers: []
        }
    };

    if(desktopDefaultConfig && desktopDefaultConfig.center){
     mapConfig.map.center.x = desktopDefaultConfig.center.x,
     mapConfig.map.center.y = desktopDefaultConfig.center.y,
     mapConfig.map.center.crs = desktopDefaultConfig.center.crs
    }
    



    // Set initial extent, pos and scale parameter
    UrlParams.updateParams({ie: params.e, e: undefined});
    UrlParams.updateParams({ic: params.c, c: undefined});
    UrlParams.updateParams({is: params.s, s: undefined});
    UrlParams.updateParams({icrs: params.crs, crs: undefined});

    dispatch(configureMap(mapConfig, false));

    // Set search text based on url st param
    if (params.st || params.sp) {
        dispatch(changeSearch(params.st, params.sp));
    }
}

function loadMapConfig() {
    return (dispatch) => {

        var params = UrlParams.getParams();
        
        var desktopDefaultConfig = ConfigUtils.getMapDefaultConfiguration();
        

        if(params.k) {
            axios.get(ConfigUtils.getConfigProp("qwc2serverUrl") + "/resolvepermalink?key=" + params.k)
            .then(response => {
                if(response.data.query) {
                    assign(params, response.data.query);
                    UrlParams.updateParams(params);
                }
            
                //restoreMapConfig(dispatch, params);
                restoreMapConfig(dispatch, params, desktopDefaultConfig);
              
            });
        } else {
           
            //restoreMapConfig(dispatch, params);
            restoreMapConfig(dispatch, params, desktopDefaultConfig);
            
        }
    };
}

module.exports = {loadMapConfig};
