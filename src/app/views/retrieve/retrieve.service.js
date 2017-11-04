/**
 * Created by fanqifeng on 17-2-3.
 */

'use strict';
import {constructorFn} from "../../config/config.config";

class RetrieveService {
    constructor($http) {
        this.$http = $http;
    }

    retrieve(params) {
        /*return this.$http({
            url: '****!/!***!/retrieve',
            method: 'GET',
            params: params
        })*/
        /*用ES6 Promise方法模仿$http，也可用angular中的$q实现*/
        return new Promise(function (resolve, reject) {
            if (params) {
                resolve('success');
            } else {
                reject('fail');
            }
        });
    }
}

/**
 * factory方法返回一个对象，需要 new RetrieveService()调用，RetrieveService.$inject = ['$http']，无法把$http注入RetrieveService;
 *  应用如下方法['$http',($http) => new RetrieveService($http)],明确传入$http
 */

RetrieveService.$inject = ['$http'];

export function retrieveServiceFunc(ngModule) {
    //ngModule.factory('retrieveService',  ()=>new RetrieveService()); 无效
    //ngModule.factory('retrieveService', ['$http',($http) => new RetrieveService($http)]);
    ngModule.factory('retrieveService', constructorFn(RetrieveService));
}
