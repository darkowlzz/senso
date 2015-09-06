class LoginController {
  constructor($rootScope, $state, Auth, RoleAuth) {
    // if access token exists, go to dashboard
    if (!! $rootScope.user.signedIn) {
      $state.go('dashboard');
    } else {
      this.Auth = Auth;
      let auth2;

      gapi.load('auth2', function () {
        auth2 = gapi.auth2.init({
          client_id: "90862864157-oek0hoj1mflsh2h1q804audarqdnbvm1.apps.googleusercontent.com",
          cookiepolicy: 'single_host_origin'
        });
        attachSignin(document.getElementById('customBtn'));
      });

      function attachSignin(element) {
        auth2.attachClickHandler(element, {}, Auth.googleLogin, (error) => {
          //console.log('failed to login', error);
        });
      }

    }
  }

  fbLogin () {
    this.Auth.fbLogin();
  }
}

LoginController.$inject = ['$rootScope', '$state', 'Auth', 'RoleAuth'];

export { LoginController };
