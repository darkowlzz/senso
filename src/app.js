import { MainController } from './controllers/MainController';
import { MembersController } from './controllers/MembersController';
import { WarController } from './controllers/WarController';
import { WarMapController } from './controllers/WarMapController';
import { LoginController } from './controllers/LoginController';
import { CreateProfileController } from './controllers/CreateProfileController';
import { DashboardController } from './controllers/DashboardController';
import { CreateClanController } from './controllers/CreateClanController';

import { DatabaseService } from './services/Database';
import { ToastService } from './services/Toast';
import { SessionService } from './services/Session';
import { AuthService } from './services/Auth';
import { AuthInterceptorService } from './services/AuthInterceptor';
import { RoleAuthorization } from './services/RoleAuthorization';

import { config } from './config';
import { startUp } from './startup';

import { DB_EVENTS, USER_ROLES, AUTH_EVENTS, API_SERVER } from './constants';

const moduleName = 'Senso';

angular
  .module(moduleName, ['ngMaterial', 'ngMdIcons', 'ui.router', 'LocalStorageModule'])
  .controller('MainCtrl', MainController)
  .controller('MembersCtrl', MembersController)
  .controller('WarCtrl', WarController)
  .controller('WarMapCtrl', WarMapController)
  .controller('LoginCtrl', LoginController)
  .controller('CreateProfileCtrl', CreateProfileController)
  .controller('DashboardCtrl', DashboardController)
  .controller('CreateClanCtrl', CreateClanController)
  .factory('database', DatabaseService)
  .factory('toast', ToastService)
  .factory('Auth', AuthService)
  .factory('Session', SessionService)
  .factory('authInterceptor', AuthInterceptorService)
  .factory('RoleAuth', RoleAuthorization)
  .constant('DB_EVENTS', DB_EVENTS)
  .constant('USER_ROLES', USER_ROLES)
  .constant('AUTH_EVENTS', AUTH_EVENTS)
  .constant('API_SERVER', API_SERVER)
  .config(config)
  .run(startUp);
