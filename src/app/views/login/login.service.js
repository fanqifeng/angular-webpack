/**
 * Created by fanqifeng on 17-2-3.
 */

'use strict';

class LoginService {
    constructor($http) {
        this.$http = $http;
    }

    login(params) {
        /*return this.$http({
            url: '****!/!***!/login',
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

LoginService.$inject = ['$http'];

export function loginServiceFunc(ngModule) {
    ngModule.service('loginService', LoginService);
}

