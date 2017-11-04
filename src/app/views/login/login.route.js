/**
 * Created by fanqifeng on 17-1-22.
 */

import  angular from "angular";

appRun.$inject = ['routerHelper'];

/* @ngInject */
function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
}

function getStates() {
    return [
        {
            state: 'login',
            config: {
                url: '/login',
                controller: 'loginController',
                controllerAs: 'vm',
                /*template: require('./login.html'),*/
                templateProvider: ['$q', ($q)=> {
                    let defer = $q.defer();
                    require.ensure(['./login.html'], () => {
                        let template = require('./login.html');
                        defer.resolve(template);
                    });
                    return defer.promise;
                }],
                title: '登录',
                resolve: {
                    deps: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad)=> {
                        let defer = $q.defer();
                        require.ensure([], ()=> {
                            let module = require('./login.module').LoginModule(angular);
                            $ocLazyLoad.load({
                                name: 'login'
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

export function loginRun(ngModule) {
    ngModule.run(appRun);
}