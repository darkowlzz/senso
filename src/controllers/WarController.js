class WarController {
  constructor($rootScope, database, $mdDialog, RoleAuth, DB_EVENTS, $state, toast) {

    if (! RoleAuth.authorizeUser($state.current.data.authorizedRoles)) {
      console.log('shuuuuu!!');
    } else {
      this.rootScope = $rootScope;
      this.database = database;
      this.mdDialog = $mdDialog;
      this.DB_EVENTS = DB_EVENTS;
      this.state = $state;
      this.toast = toast;

      this.members = [];
      this.warMembers = [];
      this.initWarMembers = [];
      this.unsavedChanges = false;

      this.database.isWarOn(this.rootScope.user.clanID).then((data) => {
        if (data.isWarOn) {
          this.state.go('warmap');
        } else {
          this.database.getWarReadyMembers(this.rootScope.user.clanID)
            .then((warReady) => {
              console.log(warReady);
              this.database.getWarMembers(this.rootScope.user.clanID)
                .then((warMembers) => {
                  this.separateWarReadyAndSelected(warReady, warMembers);
              });
          });
        }
      });
    }
  }

  separateWarReadyAndSelected (warReady, warMembers) {
    if (warMembers) {
      this.members = _.reject(warReady, (wr) => {
        for (let i=0; i < warMembers.length; i++) {
          // always compare using userID
          if (warMembers[i].userID == wr.userID) {
            return true;
          }
        }
        return false;
      });
      this.warMembers = warMembers;
      this.initWarMembers = _.cloneDeep(warMembers);
    } else {
      this.members = warReady;
    }
  }

  /*
  applyChanges (ev) {
    this.database.updateWarMembers(
        { name: this.rootScope.clanName,
          initWarMembers: this.initWarMembers,
          warMembers: this.warMembers } )
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
                  this.separateWarReadyAndSelected(r.newData.warReadyMembers,
                                                   r.newData.warMembers);
                }, () => {
                  console.log('update cancelled');
                });
              }
            } else {
              this.initWarMembers = _.cloneDeep(this.warMembers);
              this.toast.savedToast();
              this.unsavedChanges = false;
              // change loading status
            }
          });
  }
  */

  addToWar (item) {
    this.database.addToWar(item.userID).then((r) => {
      if (!! r.success) {
        this.warMembers.push(item);
        _.remove(this.members, (mem) => {
          return mem.name == item.name;
        });
        this.toast.showToast('Added to War');
      }
    });
  }

  removeFromWar (item) {
    this.database.outOfWar(item.userID).then((r) => {
      if (!! r.success) {
        this.members.push(item);
        _.remove(this.warMembers, (mem) => {
          return mem.name == item.name;
        });
        this.toast.showToast('Moved out of war');
      }
    });
  }

  startWar () {
    let map = [];
    for (let i = 1; i <= this.warMembers.length; i++) {
      map.push({ number: i, players: [] });
    }
    this.database.updateWarMap({ clanID: this.rootScope.user.clanID,
                                 warMap: map }).then((r) => {
      if (!! r.success) {
        this.database.toggleClanWar(this.rootScope.user.clanID).then((r) => {
          if (!! r.success) {
            // NOTE: use r.inWar and store somewhere
            this.state.go('warmap');
          }
        });
      }
    });
  }
}

WarController.$inject = ['$rootScope', 'database', '$mdDialog', 'RoleAuth',
                         'DB_EVENTS', '$state', 'toast'];

export { WarController };
