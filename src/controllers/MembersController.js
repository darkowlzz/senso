class MembersController {
  constructor($rootScope, database, $mdDialog, CONST) {
    this.rootScope = $rootScope;
    this.database = database;
    this.mdDialog = $mdDialog;
    this.CONST = CONST;

    this.newMember = '';
    this.sortable = false;
    this.delete = false;
    this.members = [];
    this.initMembers = [];

    this.database.getClanData().then((data) => {
      this.members = data.members;
      this.initMembers = _.cloneDeep(data.members);
    });
  }
  
  getColor (war) {
    if (war) {
      return 'war';
    } else {
      return 'nowar';
    }
  }

  addToMembers () {
    if (this.newMember == '') {
      return;
    }
    this.members.push({name: this.newMember, note: '', war: false});
    this.newMember = '';
  }

  applyChanges (ev) {
    this.database.updateClanMembers( 
        { name: this.rootScope.clanName,
          initMembers: this.initMembers,
          members: this.members } )
        .then((r) => {
          // check if there is an update error
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
                this.members = r.newData;
                this.initMembers = _.cloneDeep(r.newData);
              }, () => {
                console.log('update cancelled');
              });
            }
          } else {
          this.initMembers = _.cloneDeep(this.members);
          // change loading status
          }
        });
  }

  moveUp (item) {
    this.members.moveUp(item);
  }

  moveDown (item) {
    this.members.moveDown(item);
  }

  openEditor (ev, item) {
    this.mdDialog.show({
      controller: EditorController,
      templateUrl: 'templates/memberEdit.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: { player: item }
    })
    .then((answer) => {
      // done
    }, function () {
      // cancelled
    });
  }

  deleteMember (ev, item) {
    let confirm = this.mdDialog.confirm()
      .title('Confirm Delete?')
      .content('Are you sure you want to delete ' + item.name + ' from the clan?')
      .ariaLabel('Delete Member')
      .ok('Delete the sucker!')
      .cancel('Cancel')
      .targetEvent(ev);
    this.mdDialog.show(confirm).then(() => {
      _.remove(this.members, (mem) => {
        return mem.name == item.name;
      });
    }, () => {
      console.log('cancelled');
    })
  }

}

MembersController.$inject = ['$rootScope', 'database', '$mdDialog', 'CONST'];


function EditorController ($scope, $mdDialog, player) {
  $scope.player = player;

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

export { MembersController };
