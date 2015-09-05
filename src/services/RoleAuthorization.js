function RoleAuthorization ($rootScope, $state) {
  return {
    authorizeUser: function authorizeUser (allowedRoles) {
      if (allowedRoles.indexOf($rootScope.user.role) < 0) {
        //console.log('role not authorized');
        $state.go('oops');
        return false;
      } else {
        return true;
      }
    }
  }
}

RoleAuthorization.$inject = ['$rootScope', '$state'];

export { RoleAuthorization };
