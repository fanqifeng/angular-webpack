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
            state: 'retrieve',
            config: {
                url: '/retrieve',
                controller: 'retrieveController',
                controllerAs: 'vm',
                /*template: require('./retrieve.html'),*/
                templateProvider: ['$q', ($q) => {
                    let defer = $q.defer();
                    require.ensure(['./retrieve.html'], ()=> {
                        let template = require('./retrieve.html');
                        defer.resolve(template);
                    });
                    return defer.promise;
                }],
                title: '找回密码',
                resolve: {
                    deps: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        let deferred = $q.defer();
                        require.ensure([], () => {
                            let module = require('./retrieve.module').RetrieveModule(angular);
                            $ocLazyLoad.load({
                                name: 'retrieve'
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

export function retrieveRun(ngModule) {
    ngModule.run(appRun);
}
