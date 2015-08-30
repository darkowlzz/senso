function AuthInterceptorService ($q, localStorageService) {
  return {
    request: function (config) {
      // add authorization token to non-login requests
      if (! config.url.endsWith('login')) {
        config.headers = config.headers || {};
        if (localStorageService.get('accessToken')) {
          config.headers.Authorization = 'Bearer ' + localStorageService.get('accessToken');
        }
      } else {
        console.log('login request');
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        console.log('user not authenticated')
      }
      return response || $q.when(response);
    }
  };
};

AuthInterceptorService.$inject = ['$q', 'localStorageService'];

export { AuthInterceptorService };
