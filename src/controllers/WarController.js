class WarController {
  constructor($rootScope, database) {
    this.rootScope = $rootScope;
    this.database = database;

    this.members = [];
    this.warMembers = [];

    this.database.getWarReadyMembers().then((warReady) => {
      this.database.getWarMembers().then((warMembers) => {
        if (warMembers) {
          this.members = _.reject(warReady, (wr) => {
            //return _.includes(warMembers, wr);
            for (let i=0; i < warMembers.length; i++) {
              if (warMembers[i].name == wr.name) {
                return true;
              }
            }
            return false;
          });
          this.warMembers = warMembers;
        } else {
          this.members = warReady;
        }
      })
      //this.members = data;
    });
  }

  applyChanges () {
    this.database.updateWarMembers( { name: this.rootScope.clanName,
                                       warMembers: this.warMembers } )
                                       .then(() => {
                                         console.log('update successful');
                                         // change loading status
                                      });
  }

  addToWar (item) {
    this.warMembers.push(item);
    _.remove(this.members, (mem) => {
      return mem.name == item.name;
    });
  }

  removeFromWar (item) {
    this.members.push(item);
    _.remove(this.warMembers, (mem) => {
      return mem.name == item.name;
    });
  }
}

WarController.$inject = ['$rootScope', 'database'];

export { WarController };
