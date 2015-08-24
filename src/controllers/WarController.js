class WarController {
  constructor($rootScope, database, $mdDialog, CONST, $state, toast) {
    this.rootScope = $rootScope;
    this.database = database;
    this.mdDialog = $mdDialog;
    this.CONST = CONST;
    this.state = $state;
    this.toast = toast;

    this.members = [];
    this.warMembers = [];
    this.initWarMembers = [];
    this.unsavedChanges = false;

    this.database.getClanData().then((data) => {
      if (data.inWar) {
        this.state.go('warmap');
      }
    });

    this.database.getWarReadyMembers().then((warReady) => {
      this.database.getWarMembers().then((warMembers) => {
        this.separateWarReadyAndSelected(warReady, warMembers);
      });
    });
  }

  changed () {
    this.unsavedChanges = true;
  }

  separateWarReadyAndSelected (warReady, warMembers) {
    if (warMembers) {
      this.members = _.reject(warReady, (wr) => {
        for (let i=0; i < warMembers.length; i++) {
          if (warMembers[i].name == wr.name) {
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
              if (r.reason == this.CONST.updateConflict) {
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

  addToWar (item) {
    this.warMembers.push(item);
    _.remove(this.members, (mem) => {
      return mem.name == item.name;
    });
    this.changed();
  }

  removeFromWar (item) {
    this.members.push(item);
    _.remove(this.warMembers, (mem) => {
      return mem.name == item.name;
    });
    this.changed();
  }

  startWar () {
    let map = [];
    for (let i = 1; i <= this.warMembers.length; i++) {
      map.push({ number: i, player: null });
    }
    this.database.updateWarMap({initWarMap: [], warMap: map}).then(() => {
      this.database.toggleWar().then(() => {
        this.state.go('warmap');
      });
    })
  }
}

WarController.$inject = ['$rootScope', 'database', '$mdDialog',
                         'CONST', '$state', 'toast'];

export { WarController };
