function startUp ($rootScope, Auth, AUTH_EVENTS, Session, $state, $window) {

  $rootScope.user = {};

  if (!! Session.sessionData.signedIn) {
    $rootScope.user = Session.sessionData;
  } else {
    $state.go('login');
  }

  $rootScope.signOut = function () {
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
    $window.location.href = '/';
  }
}

startUp.$inject = ['$rootScope', 'Auth', 'AUTH_EVENTS', 'Session',
                   '$state', '$window'];

export { startUp };
