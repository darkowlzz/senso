class MembersController {
  constructor($rootScope, database, $mdDialog) {
    this.rootScope = $rootScope;
    this.database = database;
    this.mdDialog = $mdDialog;

    this.newMember = '';
    this.sortable = false;
    this.delete = false;
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
    this.database.updateClanMembers( { name: this.rootScope.clanName,
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

  deleteMember (ev, item) {
    console.log('delete', item.name);
    let confirm = this.mdDialog.confirm()
      .title('Confirm Delete?')
      .content('Are you sure you want to delete ' + item.name + ' from the clan?')
      .ariaLabel('Delete Member')
      .ok('Delete the sucker!')
      .cancel('Cancel')
      .targetEvent(ev);
    this.mdDialog.show(confirm).then(() => {
      _.remove(this.members, (mem) => {
        return mem.name == item.name;
      });
      console.log(this.members)
    }, () => {
      console.log('cancelled');
    })
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
