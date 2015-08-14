class ClanController {
  constructor($scope) {
    this.scope = $scope;

    this.newMember = '';
    this.sortable = false;
    this.clanName = 'Age of Empires';
    this.members = [];
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
    console.log('adding', this.newMember);
    this.members.push({name: this.newMember, note: '', war: false});
    this.newMember = '';
  }

  printMembers () {
    console.log(JSON.stringify(this.members));
  }
}

ClanController.$inject = ['$scope'];

export { ClanController };
