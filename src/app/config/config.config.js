/**
 * Created by fanqifeng on 17-1-21.
 */

const appTitle = 'webpack angular';

/*configure.$inject = ['$logProvider', 'routerHelperProvider'];

/!* @ngInject *!/
export function configure($logProvider, routerHelperProvider) {
    if ($logProvider.debugEnabled) {
        $logProvider.debugEnabled(true);
    }
    routerHelperProvider.configure({docTitle: appTitle, resolveAlways: resolveAlways});

    function resolveAlways() {
        return {}
    }
}*/

export class Configure {
    constructor($logProvider, routerHelperProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        routerHelperProvider.configure({docTitle: appTitle, resolveAlways: this.rFesolveAlways});
    }

    resolveAlways() {
        return {}
    }
}

Configure.$inject = ['$logProvider', 'routerHelperProvider'];

export function constructorFn(configFn) {
    let args = configFn.$inject || [];
    let factoryFunction = (...args) => new configFn(...args);

    /**
     * args.push(factoryFunction)类似于['a',function(a){}]
     * */
    return args.push(factoryFunction) && args;  //return args;
}
