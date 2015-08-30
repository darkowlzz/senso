class MembersController {
  constructor($rootScope, database, $mdDialog, toast, DB_EVENTS) {
    this.rootScope = $rootScope;
    this.database = database;
    this.mdDialog = $mdDialog;
    this.toast = toast;
    this.DB_EVENTS = DB_EVENTS;

    this.newMember = '';
    this.sortable = false;
    this.delete = false;
    this.members = [];
    this.initMembers = [];
    this.unsavedChanges = false;

    /*
    this.database.getClanData().then((data) => {
      this.members = data.members;
      this.initMembers = _.cloneDeep(data.members);
    });
    */
  }
  
  getColor (war) {
    if (war) {
      return 'war';
    } else {
      return 'nowar';
    }
  }

  changed () {
    this.unsavedChanges = true;
  }

  addToMembers () {
    if (this.newMember == '') {
      return;
    }
    this.members.push({name: this.newMember, note: '', war: false});
    this.newMember = '';
    this.changed();
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
            if (r.reason == this.DB_EVENTS.updateConflict) {
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
            this.toast.savedToast();
            this.unsavedChanges = false;
          }
        });
  }

  moveUp (item) {
    this.members.moveUp(item);
    this.changed();
  }

  moveDown (item) {
    this.members.moveDown(item);
    this.changed();
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
      this.changed();
      // done
    }, () => {
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
      this.changed();
    }, () => {
      console.log('cancelled');
    })
  }

}

MembersController.$inject = ['$rootScope', 'database', '$mdDialog',
                             'toast', 'DB_EVENTS'];


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
