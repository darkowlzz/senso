class WarMapController {
  constructor($mdDialog, $state, database, CONST, toast) {
    this.mdDialog = $mdDialog;
    this.state = $state;
    this.database = database;
    this.CONST = CONST;
    this.toast = toast

    this.warMembers = [];
    this.warMap = [];
    this.initWarMap = [];

    this.database.getClanData().then((data) => {
      if (! data.inWar) {
        this.state.go('war');
      } else {
        //this.database.getWarMembers().then((data) => {
        this.warMembers = data.warMembers;
        this.warMap = data.warMap;
        this.initWarMap = _.cloneDeep(data.warMap);
        //});
      }
    });

  }

  applyChanges (ev) {
    this.database.updateWarMap(
        { initWarMap: this.initWarMap,
          warMap: this.warMap } )
          .then((r) => {
            if (r.error) {
              console.log('Error:', r.error);
            } else if (! r.success) {
              // check the reason for failure
              if (r.reason == this.CONST.updateConflict) {
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
              // change loading status
            }
          });
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
      // done
    }, () => {
      // cancelled
    });
  }

  endWar () {
    this.database.warMembersReset().then(() => {
      this.database.updateWarMap(
          { initWarMap: this.initWarMap,
            warMap: [] }).then(() => {
        this.database.toggleWar().then(() => {
          this.state.go('war');
        });
      });
    })
  }
}

WarMapController.$inject = ['$mdDialog', '$state', 'database',
                            'CONST', 'toast'];


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
