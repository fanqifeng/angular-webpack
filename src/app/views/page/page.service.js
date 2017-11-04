/**
 * Created by fanqifeng on 16-12-2.
 */
'use strict';

class PageService {
    constructor($http) {
        this.$http = $http;
    }
}

PageService.$inject = ['$http'];

export function pageServiceFunc(ngModule) {
    ngModule.service('pageService', PageService);
}
