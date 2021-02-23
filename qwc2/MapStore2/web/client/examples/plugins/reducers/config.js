/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {SAVE_PLUGIN_CONFIG} = require('../actions/config');
const assign = require('object-assign');

function my(state = {}, action) {
    switch (action.type) {
        case SAVE_PLUGIN_CONFIG: {
            return assign({}, state, {[action.plugin]: action.cfg});
        }
        default:
            return state;
    }
}

module.exports = my;
