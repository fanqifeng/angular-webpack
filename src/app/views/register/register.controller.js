/**
 * Created by fanqifeng on 17-1-22.
 */
'use strict';

class RegisterController {
    constructor($state, registerService) {
        this.registerService = registerService;
        this.$state = $state;
    }

    getCode() {

    }

    register() {
        this.$state.go('login');
    }
}

RegisterController.$inject = ['$state', 'registerService'];


export function registerControllerFunc(ngModule) {
    ngModule.controller('registerController', RegisterController);
}

