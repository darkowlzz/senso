class DashboardController {
  constructor ($rootScope, $state, $mdDialog, RoleAuth, database,
               USER_ROLES, toast, Session) {

    if (! RoleAuth.authorizeUser($state.current.data.authorizedRoles)) {
      console.log('shuuuu!!');
    } else {
      this.rootScope = $rootScope;
      this.state = $state;
      this.mdDialog = $mdDialog;
      this.database = database;
      this.USER_ROLES = USER_ROLES;
      this.toast = toast;
      this.Session = Session;
    }
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

  toggleWar () {
    this.database.toggleWar().then((r) => {
      if (!! r.success) {
        this.Session.warReady = r.warReady;
      } else {
        //console.log('failed to toggle war');
      }
    });
  }

  leaveClan (ev) {
    let confirm = this.mdDialog.confirm()
          .title('Leaving the clan')
          .content('Are you sure you want to leave the clan?')
          .ariaLabel('leave clan')
          .ok('Yes, leave Clan')
          .cancel('Nope')
          .targetEvent(ev);
    this.mdDialog.show(confirm).then(() => {
      this.database.leaveClan()
        .then((r) => {
          if (!! r.success) {
            this.Session.clanID = null;
            this.Session.clanName = null;
            this.Session.role = this.USER_ROLES.user;
            this.toast.showToast('Clan left.');
          } else {
            this.toast.showToast('Failed to leave clan.');
          }
        });
    }, function() {
      //console.log('cancelled');
    });
  }

  joinClan (ev) {
    this.mdDialog.show({
      controller: JoinClanController,
      templateUrl: 'templates/joinClan.html',
      //parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
      //locals: {}
    })
    .then((answer) => {
      //this.changed();
      // done
    }, () => {
      // cancelled
    });
  }

}

DashboardController.$inject = ['$rootScope', '$state', '$mdDialog', 'RoleAuth',
                               'database', 'USER_ROLES', 'toast', 'Session'];


function JoinClanController ($rootScope, $scope, $mdDialog, database, Session,
                             USER_ROLES, $state, toast) {
  $scope.clanID = '';

  $scope.joinRequest = function () {
    if (_.isEmpty($scope.clanID)) {
      toast.showToast('Clan ID can\'t be blank.');
      return;
    } else {
      database.joinClan($scope.clanID.toUpperCase())
        .then((r) => {
          if (!! r.success) {
            Session.clanID = r.clanID.toUpperCase();
            Session.clanName = r.clanName;
            Session.role = r.role;
            $scope.hide();
            $state.go('members');
          } else {
            toast.showToast('Clan does not exists.');
          }
        }, (err) => {
          console.log('error:', err);
        });
    }
  };

  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
  };
}


export { DashboardController };
