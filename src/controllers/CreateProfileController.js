class CreateProfileController {
  constructor($rootScope, database, $state, Session, toast) {
    this.rootScope = $rootScope;
    this.database = database;
    this.state = $state;
    this.Session = Session;
    this.toast = toast;

    // Don't render this page without access token
    if (! this.rootScope.user.accessToken) {
      $state.go('login');
    }

    this.name = this.rootScope.user.username;
    this.email = this.rootScope.user.email;
    this.nick = null;
  }

  submitData () {
    if (_.isEmpty(this.name) || _.isEmpty(this.email) || _.isEmpty(this.nick)) {
      console.log('empty fields');
      this.toast.showToast('Complete the form.');
      return;
    } else {
      console.log('all fields filled');
      this.database.createUser({
        name: this.name,
        email: this.email,
        nick: this.nick
      }).then((r) => {
        if (!! r.success) {
          console.log('user created successfully - directing to dashboard');
          this.Session.role = r.user.role;
          this.Session.userID = r.user.userID;
          this.state.go('dashboard');
        } else {
          console.log('error:', r);
        }
      }, (err) => {
        console.log('error:', err);
      });
    }
  }
}

CreateProfileController.$inject = ['$rootScope', 'database', '$state',
                                   'Session', 'toast'];

export { CreateProfileController };
