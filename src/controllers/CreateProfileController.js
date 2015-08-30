class CreateProfileController {
  constructor($rootScope, database, $state, Session) {
    this.rootScope = $rootScope;
    this.database = database;
    this.state = $state;
    this.Session = Session;

    // Don't render this page without access token
    if (! this.rootScope.user.accessToken) {
      $state.go('login');
    }

    this.name = this.rootScope.user.username;
    this.email = this.rootScope.user.email;
    this.nick = null;
  }

  submitData () {
    this.database.createUser({
      name: this.name,
      email: this.email,
      nick: this.nick
    }).then((r) => {
      if (!! r.success) {
        console.log('user created successfully - directing to dashboard');
        this.Session.role = r.role;
        this.state.go('dashboard');
      } else {
        console.log('error:', r);
      }
    }, (err) => {
      console.log('error:', err);
    });
  }
}

CreateProfileController.$inject = ['$rootScope', 'database', '$state', 'Session'];

export { CreateProfileController };
