function startUp ($rootScope, Auth, AUTH_EVENTS, Session, $state) {

  $rootScope.user = {};

  if (!! Session.sessionData.signedIn) {
    console.log('found to be already signed in');
    $rootScope.user = Session.sessionData;
  } else {
    console.log('cant find session data');
    $state.go('login');
  }

  Auth.login();

  $rootScope.signOut = function () {
    console.log('got logout req');
    Auth.logout();
  }

  $rootScope.$on('CREATE_PROFILE', createProfile);
  $rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);
  $rootScope.$on(AUTH_EVENTS.logoutSuccess, showLogin);


  /** Event callbacks **/

  function createProfile () {
    $state.go('createProfile');
  }

  function setCurrentUser () {
    $state.go('dashboard');
  }

  function showLogin () {
    $state.go('login');
  }
}

startUp.$inject = ['$rootScope', 'Auth', 'AUTH_EVENTS', 'Session',
                   '$state'];

export { startUp };
