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
  logoutSuccess: 'auth-logout-success'
};

const API_SERVER = 'http://localhost:3000';

export { DB_EVENTS, USER_ROLES, AUTH_EVENTS, API_SERVER };
