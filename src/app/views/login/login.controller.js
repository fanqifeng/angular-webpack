/**
 * Created by fanqifeng on 17-1-22.
 */

'user strict';

/**
 * ES6语法 angularjs中用Class替换function
 **/

class LoginController {
    constructor($state, loginService) {
        this.loginService = loginService;
        this.$state = $state;
    }

    login() {
        if (!this.username) {
            alert('请输入手机号');
            return;
        }
        if (!this.userPassword) {
            alert('请输入密码');
            return;
        }
        this.loginService.login({
            username: this.username,
            userPassword: this.userPassword
        }).then((res) => {
            this.$state.go('page');
        }, (res) => {
            alert('登录失败');
        })
    }
}

LoginController.$inject = ['$state', 'loginService'];

//ES5 function写法
/*function LoginController($state, loginService) {

    let vm = this;
    vm.login = login;

    function login() {
        if (!vm.username) {
            alert('请输入手机号');
            return;
        }
        if (!vm.userPassword) {
            alert('请输入密码');
            return;
        }
        loginService.login({
            username: vm.username,
            userPassword: vm.userPassword
        }).then((res) => {
            $state.go('page');
        }, (res) => {
            alert('登录失败');
        })
    }

}*/

export function loginControllerFunc(ngModule) {
    ngModule.controller('loginController', LoginController);
}

