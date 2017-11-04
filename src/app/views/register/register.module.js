/**
 * Created by fanqifeng on 17-1-22.
 */

'use strict';

import {registerControllerFunc} from "./register.controller";
import {registerServiceFunc} from "./register.service";

export function registerModule(Angular) {
    const registerModule = Angular.module('register', []);
    registerControllerFunc(registerModule);
    registerServiceFunc(registerModule);
}

