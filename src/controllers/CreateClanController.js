class CreateClanController {
  constructor ($rootScope, database, $state, Session) {
    this.rootScope = $rootScope;
    this.database = database;
    this.state = $state;
    this.Session = Session;

    this.name = '';
    this.clanID = '';
    this.level = '';
    this.clanType = '';
    this.location = '';
    this.frequency = '';
    this.description = '';

    this.typeList = ['Invite Only', 'Closed', 'Anyone can join'];
    this.frequencyList = ['Not set', 'Always', 'Never', 'Twice a week', 'Once a week', 'Rarely'];
    this.locationList = ['International', 'Regional']
  }

  submitData () {
    console.log('SubmiT!!');
    let clanDetails = {
      name: this.name,
      clanID: this.clanID,
      level: this.level,
      clanType: this.clanType,
      location: this.location,
      warFrequency: this.frequency,
      description: this.description
    };
    console.log(clanDetails);
    this.database.createClan(clanDetails).then((r) => {
      console.log('clan created');
      if (!! r.success) {
        console.log('updating user data');
        this.database.updateUser({
          userID: this.rootScope.user.userID,
          clanID: this.clanID,
          clanName: this.name
        }).then((result) => {
          console.log('updated user data');
          this.Session.clanID = this.clanID;
          this.Session.clanName = this.name;
          this.state.go('members');
        });
      } else {
        console.log('failed to create clan');
      }
    });
  }
}

CreateClanController.$inject = ['$rootScope', 'database', '$state', 'Session'];

export { CreateClanController };
