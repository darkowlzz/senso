function SessionService ($rootScope, localStorageService) {
  return {
    create: function create (username, email, loginService, token, role,
                             userID, clanID, clanName) {
      localStorageService.set('username', username);
      localStorageService.set('email', email);
      localStorageService.set('loginService', loginService);
      localStorageService.set('accessToken', token);
      localStorageService.set('signedIn', true);
      localStorageService.set('role', role);
      localStorageService.set('userID', userID);
      localStorageService.set('clanID', clanID);
      localStorageService.set('clanName', clanName);
    },

    set username (name) {
      localStorageService.set('username', name);
      $rootScope.user.username = name;
    },

    set signedIn (status) {
      localStorageService.set('signedIn', status);
      $rootScope.user.signedIn = status;
    },

    set userID (id) {
      localStorageService.set('userID', id);
      $rootScope.user.userID = id;
    },

    set clanID (id) {
      localStorageService.set('clanID', id);
      $rootScope.user.clanID = id;
    },

    set clanName (name) {
      localStorageService.set('clanName', name);
      $rootScope.user.clanName = name;
    },

    set role (roleTitle) {
      localStorageService.set('role', roleTitle);
      $rootScope.user.role = roleTitle; // update the rootScope
    },

    destroy: function destroy () {
      localStorageService.remove('username', 'email', 'loginService',
                                 'accessToken', 'role', 'userID');
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
        role: localStorageService.get('role'),
        userID: localStorageService.get('userID'),
        clanID: localStorageService.get('clanID'),
        clanName: localStorageService.get('clanName')
      };
    }
  }
}

SessionService.$inject = ['$rootScope', 'localStorageService']

export { SessionService };
