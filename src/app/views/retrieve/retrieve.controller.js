/**
 * Created by fanqifeng on 17-1-22.
 */
'use strict';

class RetrieveController {
    constructor($state, retrieveService) {
        this.retrieveService = retrieveService;
        this.$state = $state;
    }

    getCode() {

    }

    retrieve() {
        this.retrieveService.retrieve({}).then(res=> this.$state.go('login'))
    }
}

RetrieveController.$inject = ['$state', 'retrieveService'];

export function retrieveControllerFunc(ngModule) {
    ngModule.controller('retrieveController', RetrieveController);
}