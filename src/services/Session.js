function SessionService (localStorageService) {
  return {
    create: function create (username, email, loginService, token) {
      localStorageService.set('username', username);
      localStorageService.set('email', email);
      localStorageService.set('loginService', loginService);
      localStorageService.set('accessToken', token);
      localStorageService.set('signedIn', true);
    },

    destroy: function destroy () {
      localStorageService.remove('username', 'email', 'loginService', 'accessToken');
      localStorageService.set('signedIn', false);
    },

    get sessionData () {
      console.log('getting new data');
      return {
        username: localStorageService.get('username'),
        email: localStorageService.get('email'),
        loginService: localStorageService.get('loginService'),
        accessToken: localStorageService.get('accessToken'),
        signedIn: Boolean(localStorageService.get('signedIn'))
      };
    }
  }
}

SessionService.$inject = ['localStorageService']

export { SessionService };
