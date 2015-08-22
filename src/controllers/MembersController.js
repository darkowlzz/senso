class MembersController {
  constructor($rootScope, database, $mdDialog) {
    this.rootScope = $rootScope;
    this.database = database;
    this.mdDialog = $mdDialog;

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

  openEditor (ev, item) {
    console.log(item.name);
    this.mdDialog.show({
      controller: EditorController,
      templateUrl: 'templates/memberEdit.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: { player: item }
    })
    .then((answer) => {
      // done
    }, function () {
      // cancelled
    });
  }

}

MembersController.$inject = ['$rootScope', 'database', '$mdDialog'];


function EditorController ($scope, $mdDialog, player) {
  $scope.player = player;

  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
  };
}

export { MembersController };
