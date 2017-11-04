/**
 * Created by fanqifeng on 17-1-22.
 */

'use strict';

import angular from "angular";
appRun.$inject = ['routerHelper'];

/* @ngInject */
function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
}

function getStates() {
    return [
        {
            state: 'register',
            config: {
                url: '/register',
                controller: 'registerController',
                controllerAs: 'vm',
                /*template: require('./register.html'),*/
                templateProvider: ['$q', ($q) => {
                    let defer = $q.defer();
                    require.ensure(['./register.html'], ()=> {
                        let template = require('./register.html');
                        defer.resolve(template);
                    });
                    return defer.promise;
                }],
                title: '注册',
                resolve: {
                    deps: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        let deferred = $q.defer();
                        require.ensure([], () => {
                            let module = require('./register.module').registerModule(angular);
                            $ocLazyLoad.load({
                                name: 'register'
                            });
                            deferred.resolve(module);
                        });
                        return deferred.promise;
                    }]
                }
            }
        }
    ];
}

export function registerRun(ngModule) {
    ngModule.run(appRun);
}