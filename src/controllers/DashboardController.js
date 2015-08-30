class DashboardController {
  constructor ($rootScope, $state) {
    let authorizedRoles = $state.current.data.authorizedRoles;
    if (authorizedRoles.indexOf($rootScope.user.role) === -1) {
      console.log('role not authorized');
      $state.go('login');
    }
  }
}

DashboardController.$inject = ['$rootScope', '$state'];

export { DashboardController };
