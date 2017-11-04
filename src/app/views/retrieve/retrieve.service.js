/**
 * Created by fanqifeng on 17-2-3.
 */
'use strict';

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

RetrieveService.$inject = ['$http'];

export function retrieveServiceFunc(ngModule) {
    ngModule.service('retrieveService', RetrieveService);
}
