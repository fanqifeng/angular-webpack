/**
 * Created by fanqifeng on 17-2-3.
 */
'use strict';

class RegisterService {
    constructor($http) {
        this.$http = $http;
    }

    register(params) {
        /*return this.$http({
            url: '****!/!***!/register',
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

RegisterService.$inject = ['$http'];

export function registerServiceFunc(ngModule) {
    ngModule.service('registerService', RegisterService);
}
