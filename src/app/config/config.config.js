/**
 * Created by fanqifeng on 17-1-21.
 */

const appTitle = 'webpack angular';

configure.$inject = ['$logProvider', 'routerHelperProvider'];
/* @ngInject */
export function configure($logProvider, routerHelperProvider) {
    if ($logProvider.debugEnabled) {
        $logProvider.debugEnabled(true);
    }
    routerHelperProvider.configure({docTitle: appTitle, resolveAlways: resolveAlways});

    function resolveAlways() {
        return {

        }
    }
}

