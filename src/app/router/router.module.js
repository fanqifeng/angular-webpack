/**
 * Created by fanqifeng on 17-1-21.
 */

import angular from 'angular';
import uirouter from 'angular-ui-router';
import {routerHelperProvider} from './router.config'

angular.module('router', [
    uirouter
]).provider('routerHelper', routerHelperProvider);

export const router = 'router';