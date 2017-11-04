/**
 * Created by fanqifeng on 17-1-21.
 */

'use strict';

import angular from 'angular'
import uirouter from 'angular-ui-router';

import {router} from '../router/router.module';
import {appRun} from './config.route'
import {Configure, constructorFn} from "./config.config"

angular.module('config', [
    uirouter,
    router,
]).run(appRun)
    .config(constructorFn(Configure));

export const config = 'config';