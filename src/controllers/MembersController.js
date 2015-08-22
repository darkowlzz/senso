class MembersController {
  constructor($rootScope, database) {
    console.log('init members');
    this.rootScope = $rootScope;
    this.database = database;
    this.newMember = '';
    this.sortable = false;
    this.members = [];
    this.foo = 'fooooo';

    this.database.getClanData().then((data) => {
      this.members = data.members;
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

  applyChanges () {
    this.database.updateClan( { name: this.rootScope.clanName,
                                members: this.members } ).then(() => {
                                  console.log('update successful');
                                  // change loading status
                                });
  }

  moveUp (item) {
    this.members.moveUp(item);
  }

  moveDown (item) {
    this.members.moveDown(item);
  }

}

MembersController.$inject = ['$rootScope', 'database'];

export { MembersController };
