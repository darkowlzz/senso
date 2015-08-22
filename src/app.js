import { ClanController } from './model/ClanController';
import { DatabaseService } from './service/Database';

const moduleName = 'Senso';

angular
  .module(moduleName, ['ngMaterial', 'ngMdIcons', 'angular-sortable-view'])
  .controller('clanController', ClanController)
  .factory('database', DatabaseService);
