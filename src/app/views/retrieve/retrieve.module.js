
/**
 * Created by fanqifeng on 17-1-22.
 */
'use strict';

import {retrieveControllerFunc} from "./retrieve.controller";
import {retrieveServiceFunc} from "./retrieve.service";


export function RetrieveModule(Angular) {
    const retrieveModule = Angular.module('retrieve', []);
    retrieveControllerFunc(retrieveModule);
    retrieveServiceFunc(retrieveModule);
}