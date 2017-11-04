appRun.$inject = ['routerHelper'];

/* @ngInject */
export function appRun(routerHelper) {
    routerHelper.configureStates(getStates(), '/404');
}

function getStates() {
    return [
        {
            state: '404',
            config: {
                url: '/404',
                template: require('./404.html'),
                title: '404'
            }
        }
    ];
}