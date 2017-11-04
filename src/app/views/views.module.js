/**
 * Created by fanqifeng on 17-11-2.
 */

import angular from 'angular';

import {loginRun} from "./login/login.route";
import {pageRun} from "./page/page.route";
import {registerRun} from "./register/register.route";
import {retrieveRun} from "./retrieve/retrieve.route";

const viewsModule = angular.module('views', []);

/*加载页面路由配置*/
loginRun(viewsModule);
pageRun(viewsModule);
registerRun(viewsModule);
retrieveRun(viewsModule);

export const views = 'views';
