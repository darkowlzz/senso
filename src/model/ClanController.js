class ClanController {
  constructor($scope, database) {
    this.scope = $scope;
    this.database = database;

    this.newMember = '';
    this.sortable = false;
    this.clanName = 'Age of Empires';
    this.members = [];

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
    this.database.updateClan( { name: this.clanName,
                                members: this.members } ).then(() => {
                                  console.log('update successful');
                                  // change loading status
                                });
  }
}

ClanController.$inject = ['$scope', 'database'];

export { ClanController };
