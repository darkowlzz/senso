import { MainController } from './controllers/MainController';
import { MembersController } from './controllers/MembersController';
import { WarController } from './controllers/WarController';
import { WarMapController } from './controllers/WarMapController';

import { DatabaseService } from './services/Database';

import { CONST } from './constants';

const moduleName = 'Senso';

angular
  .module(moduleName, ['ngMaterial', 'ngMdIcons', 'ui.router'])
  .controller('MainCtrl', MainController)
  .controller('MembersCtrl', MembersController)
  .controller('WarCtrl', WarController)
  .controller('WarMapCtrl', WarMapController)
  .factory('database', DatabaseService)
  .constant('CONST', CONST)
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/members');

      $stateProvider
        .state('members', {
          url: '/members',
          templateUrl: 'templates/members.html',
          controller: 'MembersCtrl',
          controllerAs: 'mem'
        })
        .state('war', {
          url: '/war',
          templateUrl: 'templates/war.html',
          controller: 'WarCtrl',
          controllerAs: 'war'
        })
        .state('warmap', {
          url: '/warmap',
          templateUrl: 'templates/warMap.html',
          controller: 'WarMapCtrl',
          controllerAs: 'warMap'
        });
    }]);
