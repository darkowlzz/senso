class DashboardController {
  constructor ($rootScope, $state, $mdDialog) {
    this.state = $state;
    this.mdDialog = $mdDialog;

    let authorizedRoles = $state.current.data.authorizedRoles;
    if (authorizedRoles.indexOf($rootScope.user.role) === -1) {
      console.log('role not authorized');
      $state.go('login');
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

DashboardController.$inject = ['$rootScope', '$state', '$mdDialog'];

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
            $scope.hide();
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
