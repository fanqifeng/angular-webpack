/**
 * Created by fanqifeng on 17-1-22.
 */

'use strict';

import {loginControllerFunc} from "./login.controller";
import {loginServiceFunc} from "./login.service";

export function LoginModule(Angular) {
    const loginModule = Angular.module('login', []);
    loginControllerFunc(loginModule);
    loginServiceFunc(loginModule);
}

/*LoginModule(angular);*/
