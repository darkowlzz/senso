class LoginController {
  constructor($rootScope, $state, RoleAuth) {
    // if access token exists, go to dashboard
    if (! _.isEmpty($rootScope.user.accessToken)) {
      $state.go('dashboard');
    }
  }
}

LoginController.$inject = ['$rootScope', '$state', 'RoleAuth'];

export { LoginController };
