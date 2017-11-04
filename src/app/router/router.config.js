/**
 * Created by fanqifeng on 17-1-21.
 */

/*routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

/!* @ngInject *!/
export function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
    /!* jshint validthis:true *!/
    var config = {
        docTitle: undefined,
        resolveAlways: {}
    };

    $locationProvider.html5Mode(true);

    this.configure = function (cfg) {
        angular.extend(config, cfg);
    };

    this.$get = RouterHelper;
    RouterHelper.$inject = ['$location', '$log', '$rootScope', '$state'];

    /!* @ngInject *!/
    function RouterHelper($location, $log, $rootScope, $state) {
        let handlingStateChangeError = false;
        let hasOtherwise = false;
        let stateCounts = {
            errors: 0,
            changes: 0
        };

        let service = {
            configureStates: configureStates,
            getStates: getStates,
            stateCounts: stateCounts
        };

        init();

        return service;

        ///////////////

        function configureStates(states, otherwisePath) {
            states.forEach(function (state) {
                state.config.resolve =
                    angular.extend(state.config.resolve || {}, config.resolveAlways);
                $stateProvider.state(state.state, state.config);
            });
            if (otherwisePath && !hasOtherwise) {
                hasOtherwise = true;
                $urlRouterProvider.otherwise(otherwisePath);
            }
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$stateChangeError',
                function (event, toState, toParams, fromState, fromParams, error) {
                    if (handlingStateChangeError) {
                        return;
                    }
                    stateCounts.errors++;
                    handlingStateChangeError = true;
                    let destination = (toState &&
                        (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                        'unknown target';
                    let msg = 'Error routing to ' + destination + '. ' + (angular.isString(error) ? error :
                        (error.data || '') + '. <br/>' + (error.statusText || '') +
                        ': ' + (error.status || ''));
                    $log.error(msg);
                    $location.path('/');
                }
            );

        }


        function init() {
            if ($location.path() === '/' || !$location.path()) {
                $location.path('login');
            }
            handleRoutingErrors();
            updateDocTitle();
        }

        function getStates() {
            return $state.get();
        }

        function updateDocTitle() {
            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    stateCounts.changes++;
                    handlingStateChangeError = false;
                    let title = config.docTitle + ' ' + (toState.title || '');
                    $rootScope.title = title; // data bind to <title>
                }
            );
        }
    }
}*/

const config = {
    docTitle: undefined,
    resolveAlways: {}
};
export class RouterHelperProvider{
    constructor($locationProvider, $stateProvider, $urlRouterProvider){
        this.$stateProvider=$stateProvider;
        this.$urlRouterProvider=$urlRouterProvider;
        $locationProvider.html5Mode(true);
        this.$get.$inject=['$location', '$log', '$rootScope', '$state'];
    }

    configure (cfg) {
        angular.extend(config, cfg);
    };

    $get($location,$log,$rootScope,$state){
        let handlingStateChangeError = false;
        let hasOtherwise = false;
        let stateCounts = {
            errors: 0,
            changes: 0
        };
        let that=this;

        let service = {
            configureStates: configureStates,
            getStates: ()=>$state.get(),
            stateCounts: stateCounts
        };

        init();

        return service;

        ///////////////

        function configureStates(states, otherwisePath) {
            states.forEach((state)=>{
                state.config.resolve =
                    angular.extend(state.config.resolve || {}, config.resolveAlways);
                that.$stateProvider.state(state.state, state.config);
            });
            if (otherwisePath && !hasOtherwise) {
                hasOtherwise = true;
                that.$urlRouterProvider.otherwise(otherwisePath);
            }
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$stateChangeError',
                (event, toState, toParams, fromState, fromParams, error)=> {
                    if (handlingStateChangeError) {
                        return;
                    }
                    stateCounts.errors++;
                    handlingStateChangeError = true;
                    let destination = (toState &&
                        (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                        'unknown target';
                    let msg = 'Error routing to ' + destination + '. ' + (angular.isString(error) ? error :
                        (error.data || '') + '. <br/>' + (error.statusText || '') +
                        ': ' + (error.status || ''));
                    $log.error(msg);
                    $location.path('/');
                }
            );

        }


        function init() {
            if ($location.path() === '/' || !$location.path()) {
                $location.path('login');
            }
            handleRoutingErrors();
            updateDocTitle();
        }

        function updateDocTitle() {
            $rootScope.$on('$stateChangeSuccess',
                (event, toState, toParams, fromState, fromParams)=> {
                    stateCounts.changes++;
                    handlingStateChangeError = false;
                    let title = config.docTitle + ' ' + (toState.title || '');
                    $rootScope.title = title; // data bind to <title>
                }
            );
        }
    }
}

RouterHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

