class DashboardController {
  constructor ($rootScope, $state) {
    this.state = $state;

    let authorizedRoles = $state.current.data.authorizedRoles;
    if (authorizedRoles.indexOf($rootScope.user.role) === -1) {
      console.log('role not authorized');
      $state.go('login');
    }
  }

  joinClan () {
    this.state.go('createClan');
  }

  createClan () {
    this.state.go('createClan');
  }

  gotoMembers () {
    this.state.go('members');
  }

  gotoWar () {
    this.state.go('war');
  }
}

DashboardController.$inject = ['$rootScope', '$state'];

export { DashboardController };
