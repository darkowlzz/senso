class ClanController {
  constructor($scope, $mdSidenav, database) {

    Array.prototype.moveUp = function(value, by) {
        var index = this.indexOf(value),
            newPos = index - (by || 1);

        if(index === -1)
            throw new Error("Element not found in array");

        if(newPos < 0)
            newPos = 0;

        this.splice(index,1);
        this.splice(newPos,0,value);
    };

    Array.prototype.moveDown = function(value, by) {
        var index = this.indexOf(value),
            newPos = index + (by || 1);

        if(index === -1)
            throw new Error("Element not found in array");

        if(newPos >= this.length)
            newPos = this.length;

        this.splice(index, 1);
        this.splice(newPos,0,value);
    };

    this.scope = $scope;
    this.mdSidenav = $mdSidenav;
    this.database = database;

    this.newMember = '';
    this.sortable = false;
    this.clanName = 'Age of Empires';
    this.members = [];

    this.database.getClanData().then((data) => {
      this.members = data.members;
    });

    this.scope.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };

    
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

  applyChanges () {
    this.database.updateClan( { name: this.clanName,
                                members: this.members } ).then(() => {
                                  console.log('update successful');
                                  // change loading status
                                });
  }

  moveUp (item) {
    this.members.moveUp(item);
    console.log(this.members);
  }

  moveDown (item) {
    this.members.moveDown(item);
    console.log(this.members);
  }

  toggleSidenav (menuId) {
    console.log('toggle toggle');
    this.mdSidenav(menuId).toggle();
  }
}

ClanController.$inject = ['$scope', '$mdSidenav', 'database'];

export { ClanController };
