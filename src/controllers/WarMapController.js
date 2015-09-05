class WarMapController {
  constructor($rootScope, $mdDialog, $state, database, RoleAuth, DB_EVENTS, toast) {

    if (! RoleAuth.authorizeUser($state.current.data.authorizedRoles)) {
      console.log('shuuuuu!!');
    } else {
      this.rootScope = $rootScope;
      this.mdDialog = $mdDialog;
      this.state = $state;
      this.database = database;
      this.DB_EVENTS = DB_EVENTS;
      this.toast = toast

      this.warMembers = [];
      this.warMap = [];

      this.database.isWarOn(this.rootScope.user.clanID).then((data) => {
        if (! data.isWarOn) {
          this.state.go('war');
        } else {
          this.database.getWarMembers(this.rootScope.user.clanID).then((warMembers) => {
            this.warMembers = warMembers;
            this.database.getWarMap(this.rootScope.user.clanID).then((warMap) => {
              this.warMap = warMap;
            });
          });
        }
      });
    }
  }

  openEditor (ev, item) {
    this.mdDialog.show({
      controller: EditorController,
      templateUrl: 'templates/warMapEditor.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: { target: item, players: this.warMembers }
    })
    .then((answer) => {
      this.warMap[answer.number - 1].players = answer.player;
      this.database.updateWarMap({clanID: this.rootScope.user.clanID,
                                  target: answer.number, player: answer.player})
        .then((r) => {
          if (!! r.success) {
            this.warMap = r.map;
            this.toast.showToast('War map updated.');
          }
        });
      // done
    }, () => {
      // cancelled
    });
  }

  endWar () {
    this.database.resetWarMembers(this.rootScope.user.clanID).then((r) => {
      if (!! r.success) {
        this.database.resetWarMap(this.rootScope.user.clanID).then((r) => {
          if (!! r.success) {
            this.database.toggleClanWar(this.rootScope.user.clanID).then((r) => {
              if (!! r.success) {
                this.state.go('war');
              }
            });
          }
        });
      }
    })
  }
}

WarMapController.$inject = ['$rootScope', '$mdDialog', '$state', 'database',
                            'RoleAuth', 'DB_EVENTS', 'toast'];


function EditorController ($scope, $mdDialog, target, players) {
  $scope.target = target;
  $scope.players = players;

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

export { WarMapController };
