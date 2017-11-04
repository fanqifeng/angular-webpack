/**
 * Created by fanqifeng on 17-11-2.
 */

import angular from 'angular';
require('oclazyload');

import {config} from './app/config/config.module'
import {views} from "./app/views/views.module";
import 'styles/app.scss';

export function main() {
    return angular.module('webApp', [
        'oc.lazyLoad',

        config,
        views
    ]);
}

/**
 * Needed for hmr
 * in prod this is replace for document ready
 */
switch (document.readyState) {
    case 'loading':
        document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
        break;
    case 'interactive':
    case 'complete':
    default:
        main();
}

function _domReadyHandler() {
    document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
    main();
}