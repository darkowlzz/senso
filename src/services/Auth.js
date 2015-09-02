function AuthService ($rootScope, $window, Session, database, AUTH_EVENTS,
    $http) {
  return {
    login: function login () {
      $window.onSignIn = function onSignIn (googleUser) {
        let profile = googleUser.getBasicProfile();
        let auth_token = googleUser.getAuthResponse().id_token;

        Session.create(profile.getName(), 'google');
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      }

      $window.checkLoginState = function checkLoginState () {
        FB.getLoginStatus((response) => {
          if (response.status === 'connected') {
            console.log('connected to fb');
            FB.api('/me?fields=id,name,email', (resp) => {
              let loginData = {
                accessToken: response.authResponse.accessToken,
                loginService: 'facebook',
                email: resp.email,
                name: resp.name
              };
              //$window.sessionStorage.token = $rootScope.loginData.accessToken;
              database.login(loginData).then((r) => {
                // use the received token as the access token for further req
                if (!! r.success) {
                  Session.create(r.user.name, r.user.email,
                               loginData.loginService, r.token, r.user.role,
                               r.user.userID, r.user.clanID, r.user.clanName);
                  $rootScope.user = Session.sessionData;
                  $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                } else {
                  Session.create(loginData.name, loginData.email,
                                 loginData.loginService, r.token);
                  $rootScope.user = Session.sessionData;
                  $rootScope.$broadcast('CREATE_PROFILE');
                }
              }, (err) => {
                console.log('Error:', err);
              });
            });
          } else if (response.status === 'not_authorized') {
            console.log('Not logged into the app');
          } else {
            console.log('Not logged into facebook');
          }
        });
      }
    },

    logout: function logout () {
      if (Session.sessionData.loginService == 'google') {
        let auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
          Session.destroy();
          $rootScope.user = Session.sessionData;
          $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        });
      } else if (Session.sessionData.loginService == 'facebook') {
        FB.getLoginStatus((resp) => {
          if (resp.status === 'connected') {
            FB.logout((response) => {
              Session.destroy();
              $rootScope.user = {};
              $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            });
          }
        });
      }
    }
  }
}

AuthService.$inject = ['$rootScope', '$window', 'Session', 'database',
                       'AUTH_EVENTS', '$http'];

export { AuthService };
