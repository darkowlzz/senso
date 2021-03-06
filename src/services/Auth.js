function AuthService ($rootScope, Session, database, AUTH_EVENTS) {
  const GOOGLE_LOGIN = 'google';
  const FB_LOGIN = 'facebook';

  return {
    googleLogin: function googleLogin (googleUser) {
      let profile = googleUser.getBasicProfile();
      let auth_token = googleUser.getAuthResponse().id_token;
      let loginData = {
        accessToken: auth_token,
        loginService: GOOGLE_LOGIN,
        email: profile.getEmail(),
        name: profile.getName()
      };
      database.login(loginData).then((r) => {
        if (!! r.success) {
          Session.create(r.user.name, r.user.email,
                         loginData.loginService, r.token, r.user.role,
                         r.user.userID, r.user.clanID.toUpperCase(), r.user.clanName,
                         r.user.warReady);
          $rootScope.user = Session.sessionData;
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        } else {
          Session.create(loginData.name, loginData.email,
                         loginData.loginService, r.token);
          $rootScope.user = Session.sessionData;
          $rootScope.$broadcast(AUTH_EVENTS.createProfile);
        }
      }, (err) => {
        console.log('Error:', err);
      });
    },

    fbLogin: function fbLogin () {
      FB.login((response) => {
        if (response.status === 'connected') {
          FB.api('/me?fields=id,name,email', (resp) => {
            let loginData = {
              accessToken: response.authResponse.accessToken,
              loginService: FB_LOGIN,
              email: resp.email,
              name: resp.name
            };
            database.login(loginData).then((r) => {
              // use the received token as the access token for further req
              if (!! r.success) {
                Session.create(r.user.name, r.user.email,
                             loginData.loginService, r.token, r.user.role,
                             r.user.userID, r.user.clanID.toUpperCase(), r.user.clanName,
                             r.user.warReady);
                $rootScope.user = Session.sessionData;
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
              } else {
                Session.create(loginData.name, loginData.email,
                               loginData.loginService, r.token);
                $rootScope.user = Session.sessionData;
                $rootScope.$broadcast(AUTH_EVENTS.createProfile);
              }
            }, (err) => {
              // HANDLE THIS
            });
          });
        } else if (response.status === 'not_authorized') {
          //console.log('Not logged into the app');
        } else {
          //console.log('Not logged into facebook');
        }
      });
    },

    logout: function logout () {
      if (Session.sessionData.loginService == GOOGLE_LOGIN) {
        let auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
          $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        });
      } else if (Session.sessionData.loginService == FB_LOGIN) {
        FB.getLoginStatus((resp) => {
          if (resp.status === 'connected') {
            FB.logout((response) => {
              $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            });
          }
        });
      }
    }
  }
}

AuthService.$inject = ['$rootScope', 'Session', 'database', 'AUTH_EVENTS'];

export { AuthService };
