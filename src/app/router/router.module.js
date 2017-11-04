/**
 * Created by fanqifeng on 17-1-21.
 */

import angular from 'angular';
import uirouter from 'angular-ui-router';
import {constructorFn} from "../config/config.config";
import {RouterHelperProvider} from "./router.config";

angular.module('router', [
    uirouter
]).provider('routerHelper', constructorFn(RouterHelperProvider));

export const router = 'router';