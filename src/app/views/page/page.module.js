/**
 * Created by fanqifeng on 16-12-1.
 */
'use strict';

import {pageControllerFunc} from "./page.controller";
import {pageServiceFunc} from "./page.service";

export function PageModule(Angular) {
    const pageModule = Angular.module('page', []);
    pageControllerFunc(pageModule);
    pageServiceFunc(pageModule);
}