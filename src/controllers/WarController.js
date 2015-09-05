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
      map.push({ number: i, player: '' });
    }
    this.database.initWarMap({ clanID: this.rootScope.user.clanID,
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
