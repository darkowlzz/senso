class WarMapController {
  constructor($state, database) {
    this.state = $state;
    this.database = database;

    this.database.getClanData().then((data) => {
      if (! data.inWar) {
        this.state.go('war');
      }
    });

  }

  toggleWar () {
    this.database.toggleWar().then((data) => {
      this.state.go('war');
    });
  }
}

WarMapController.$inject = ['$state', 'database'];

export { WarMapController };
