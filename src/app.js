import {ClanController} from './model/ClanController';

const moduleName = 'Senso';

angular
  .module(moduleName, ['ui.bootstrap', 'angular-sortable-view'])
  .controller('clanController', ClanController);
