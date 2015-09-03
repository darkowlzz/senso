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
      //this.initWarMap = [];
      //this.unsavedChanges = false;

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

  /*
  changed () {
    this.unsavedChanges = true;
  }
  */

  /*
  applyChanges (ev) {
    this.database.updateWarMap(
        { initWarMap: this.initWarMap,
          warMap: this.warMap } )
          .then((r) => {
            if (r.error) {
              console.log('Error:', r.error);
            } else if (! r.success) {
              // check the reason for failure
              if (r.reason == this.DB_EVENTS.updateConflict) {
                let confirm = this.mdDialog.confirm()
                    .title('Conflict while saving')
                    .content('There was a conflict while saving the changes.')
                    .ariaLabel('Save Conflict')
                    .ok('Update to latest')
                    .cancel('Cancel')
                    .targetEvent(ev);
                this.mdDialog.show(confirm).then(() => {
                  this.warMap = r.newData;
                  this.initWarMap = _.cloneDeep(r.newData);
                }, () => {
                  console.log('update cancelled');
                });
              }
            } else {
              this.initWarMap = _.cloneDeep(this.warMap);
              this.toast.savedToast();
              this.unsavedChanges = false;
              // change loading status
            }
          });
  }
  */


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
      // done
    }, () => {
      // cancelled
    });
  }

  endWar () {
    this.database.resetWarMembers(this.rootScope.user.clanID).then((r) => {
      if (!! r.success) {
        this.database.updateWarMap({ clanID: this.rootScope.user.clanID,
                                     warMap: [] }).then((r) => {
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
