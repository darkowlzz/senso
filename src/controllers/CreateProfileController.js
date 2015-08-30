class CreateProfileController {
  constructor($rootScope, database, $state) {
    this.rootScope = $rootScope;
    this.database = database;
    this.state = $state;

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
        //this.rootScope.user.name = this.rootScope.loginData.name;
        //this.rootScope.user.signedIn = true;
        this.state.go('dashboard');
      } else {
        console.log('error:', r);
      }
    }, (err) => {
      console.log('error:', err);
    });
  }
}

CreateProfileController.$inject = ['$rootScope', 'database', '$state'];

export { CreateProfileController };
