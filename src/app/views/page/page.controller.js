'use strict';

class PageController {
    constructor($state, pageService) {
        this.pageService = pageService;
        this.$state = $state;
    }
}

PageController.$inject = ['$state', 'pageService'];

export function pageControllerFunc(ngModule) {
    ngModule.controller('pageController', PageController);
}


