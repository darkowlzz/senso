class MainController {
  constructor($rootScope, $mdSidenav) {

    this.mdSidenav = $mdSidenav;
    this.sideNavId = 'left'

    $rootScope.clanName = 'Age of Empires';

    $rootScope.$on('$stateChangeStart', () => {
      console.log('heard state change');
      this.mdSidenav(this.sideNavId).close();
    })
  }

  toggleSidenav () {
    this.mdSidenav(this.sideNavId).toggle();
  }
}

MainController.$inject = ['$rootScope', '$mdSidenav'];

export { MainController };
