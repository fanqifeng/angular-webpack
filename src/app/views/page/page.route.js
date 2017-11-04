/**
 * Created by fanqifeng on 17-1-22.
 */
'use strict';


import angular from "angular";

appRun.$inject = ['routerHelper'];

/* @ngInject */
export function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
}

function getStates() {
    return [
        {
            state: 'page',
            config: {
                url: '/page',
                controller: 'pageController',
                controllerAs: 'vm',
                /*template: require('./choose.html'),*/
                templateProvider: ['$q', ($q)=> {
                    let defer = $q.defer();
                    require.ensure(['./page.html'], ()=> {
                        let template = require('./page.html');
                        defer.resolve(template);
                    });
                    return defer.promise;
                }],
                title: '主页',
                resolve: {
                    deps: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        let defer = $q.defer();
                        require.ensure([], () => {
                            let module = require('./page.module').PageModule(angular);
                            $ocLazyLoad.load({
                                name: 'page'
                            });
                            defer.resolve(module);
                        });
                        return defer.promise;
                    }],
                }
            }
        }
    ];
}

export function pageRun(ngModule) {
    ngModule.run(appRun);
}
