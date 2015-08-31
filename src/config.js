function config ($stateProvider, $urlRouterProvider, USER_ROLES,
                 $httpProvider) {
  $httpProvider.interceptors.push('authInterceptor')

  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'loginCtrl',
      data: {
        authorizedRoles: [USER_ROLES.all]
      }
    })
    .state('createProfile', {
      url: '/createProfile',
      templateUrl: 'templates/createProfile.html',
      controller: 'CreateProfileCtrl',
      controllerAs: 'cp',
      data: {
        authorizedRoles: [USER_ROLES.user]
      }
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/dashboard.html',
      controller: 'DashboardCtrl',
      controllerAs: 'dashCtrl',
      data: {
        authorizedRoles: [USER_ROLES.user, USER_ROLES.member, USER_ROLES.leader]
      }
    })
    .state('createClan', {
      url: '/createClan',
      templateUrl: 'templates/createClan.html',
      controller: 'CreateClanCtrl',
      controllerAs: 'cc',
      data: {
        authorizedRoles: [USER_ROLES.user]
      }
    })
    .state('members', {
      url: '/members',
      templateUrl: 'templates/members.html',
      controller: 'MembersCtrl',
      controllerAs: 'mem',
      data: {
        authorizedRoles: [USER_ROLES.member, USER_ROLES.leader]
      }
    })
    .state('war', {
      url: '/war',
      templateUrl: 'templates/war.html',
      controller: 'WarCtrl',
      controllerAs: 'war',
      data: {
        authorizedRoles: [USER_ROLES.member, USER_ROLES.leader]
      }
    })
    .state('warmap', {
      url: '/warmap',
      templateUrl: 'templates/warMap.html',
      controller: 'WarMapCtrl',
      controllerAs: 'warMap',
      data: {
        authorizedRoles: [USER_ROLES.member, USER_ROLES.leader]
      }
    });
}

config.$inject = ['$stateProvider', '$urlRouterProvider', 'USER_ROLES',
                  '$httpProvider'];

export { config };
