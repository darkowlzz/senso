class MainController {
  constructor($rootScope, $mdSidenav) {

    this.mdSidenav = $mdSidenav;
    this.sideNavId = 'left'

    $rootScope.$on('$stateChangeStart', () => {
      this.mdSidenav(this.sideNavId).close();
    })
  }

  toggleSidenav () {
    this.mdSidenav(this.sideNavId).toggle();
  }
}

MainController.$inject = ['$rootScope', '$mdSidenav'];

export { MainController };
