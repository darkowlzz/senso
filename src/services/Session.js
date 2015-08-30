function SessionService ($rootScope, localStorageService) {
  return {
    create: function create (username, email, loginService, token, role) {
      localStorageService.set('username', username);
      localStorageService.set('email', email);
      localStorageService.set('loginService', loginService);
      localStorageService.set('accessToken', token);
      localStorageService.set('signedIn', true);
      localStorageService.set('role', role);
    },

    set role (roleTitle) {
      localStorageService.set('role', roleTitle);
      $rootScope.user.role = roleTitle; // update the rootScope
    },

    destroy: function destroy () {
      localStorageService.remove('username', 'email', 'loginService',
                                 'accessToken', 'role');
      localStorageService.set('signedIn', false);
    },

    get sessionData () {
      console.log('getting new data');
      return {
        username: localStorageService.get('username'),
        email: localStorageService.get('email'),
        loginService: localStorageService.get('loginService'),
        accessToken: localStorageService.get('accessToken'),
        signedIn: Boolean(localStorageService.get('signedIn')),
        role: localStorageService.get('role')
      };
    }
  }
}

SessionService.$inject = ['$rootScope', 'localStorageService']

export { SessionService };
