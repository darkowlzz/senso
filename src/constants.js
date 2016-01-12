const DB_EVENTS = {
  updateConflict: 'senso-update-conflict'
};

const USER_ROLES = {
  all: '*',
  user: 'user',
  member: 'member',
  leader: 'leader'
};

const AUTH_EVENTS = {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  createProfile: 'auth-create-profile'
};

const API_SERVER = 'http://localhost:3000';
//const API_SERVER = 'https://senso-alpha-2.herokuapp.com';

export { DB_EVENTS, USER_ROLES, AUTH_EVENTS, API_SERVER };
