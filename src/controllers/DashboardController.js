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

  leaveClan (ev) {
    let confirm = this.mdDialog.confirm()
          .title('Leaving the clan')
          .content('Are you sure you want to leave the clan?')
          .ariaLabel('leave clan')
          .ok('Yes, leave Clan')
          .cancel('Nope')
          .targetEvent(ev);
    this.mdDialog.show(confirm).then(() => {
      this.database.leaveClan(
        { userID: this.rootScope.user.userID }, this.rootScope.user.clanID)
        .then((r) => {
          if (!! r.success) {
            this.Session.clanID = null;
            this.Session.clanName = null;
            this.Session.role = this.USER_ROLES.user;
            this.toast.showToast('Clan left.');
          } else {
            console.log('failed to leave clan');
            this.toast.showToast('Failed to leave clan.');
          }
        });
    }, function() {
      console.log('cancelled');
    });
  }

  joinClan (ev) {
    console.log('opening box');
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
  console.log('inside joinclanctrl');
  $scope.clanID = '';

  $scope.joinRequest = function () {
    if (_.isEmpty($scope.clanID)) {
      console.log('Enter clanID');
      toast.showToast('Clan ID can\'t be blank.');
      return;
    } else {
      console.log('sending join request to ', $scope.clanID);
      database.joinClan({ userID: $rootScope.user.userID }, $scope.clanID)
        .then((r) => {
          if (!! r.success) {
            console.log('clan joined');
            Session.clanID = r.clanID;
            Session.clanName = r.clanName;
            Session.role = USER_ROLES.member;
            $scope.hide();
            $state.go('members');
          } else {
            console.log('failed to join clan');
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
