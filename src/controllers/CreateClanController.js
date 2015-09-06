class CreateClanController {
  constructor ($rootScope, database, $state, Session, USER_ROLES, toast) {
    this.rootScope = $rootScope;
    this.database = database;
    this.state = $state;
    this.Session = Session;
    this.USER_ROLES = USER_ROLES;
    this.toast = toast;

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
    if (_.isEmpty(this.name) || _.isEmpty(this.clanID)) {
      this.toast.showToast('Complete the form.');
      return;
    } else {
      let clanDetails = {
        name: this.name,
        clanID: this.clanID.toUpperCase(),
        level: this.level,
        clanType: this.clanType,
        location: this.location,
        warFrequency: this.frequency,
        description: this.description
      };
      this.database.createClan(clanDetails).then((r) => {
        if (!! r.success) {
          this.database.updateUser({
            //userID: this.rootScope.user.userID,
            clanID: this.clanID.toUpperCase(),
            clanName: this.name,
            role: this.USER_ROLES.leader
          }).then((result) => {
            // NOTE: Use server retrieved data below
            this.Session.clanID = this.clanID.toUpperCase();
            this.Session.clanName = this.name;
            this.Session.role = this.USER_ROLES.leader;
            this.state.go('members');
          });
        } else {
          //console.log('failed to create clan');
        }
      });
    }
  }
}

CreateClanController.$inject = ['$rootScope', 'database', '$state', 'Session',
                                'USER_ROLES', 'toast'];

export { CreateClanController };
