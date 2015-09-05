class LoginController {
  constructor($rootScope, $state, Auth, RoleAuth) {
    // if access token exists, go to dashboard
    if (! _.isEmpty($rootScope.user.accessToken)) {
      $state.go('dashboard');
    } else {
      this.Auth = Auth;
    }
  }

  fbLogin () {
    this.Auth.fbLogin();
  }
}

LoginController.$inject = ['$rootScope', '$state', 'Auth', 'RoleAuth'];

export { LoginController };
