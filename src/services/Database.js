function DatabaseService ($rootScope, $http, API_SERVER, AUTH_EVENTS) {

  // Request Wrapper to perform http request
  function requestWrapper (rqst) {
    let promise = $http(rqst).then((resp) => {
      console.log('got response');
      console.log(resp.status);
      return resp.data;
    }, (err) => {
      if (err.status === 401) {
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
      }
    });
    return promise;
  }


  return {
    // Login, authenticate with the api server
    login: function login (loginData) {
      let req = {
        method: 'POST',
        url: API_SERVER + '/login',
        data: loginData
      }
      return requestWrapper(req);
    },

    // POST a new user profile data
    createUser: function createUser (userData) {
      let req = {
        method: 'POST',
        url: API_SERVER + '/api/v1/user',
        data: userData
      }
      return requestWrapper(req);
    },

    // Update user profile details
    updateUser: function updateUser (userData) {
      let req = {
        method: 'PUT',
        url: API_SERVER + '/api/v1/user/' + $rootScope.user.userID,
        data: userData
      }
      return requestWrapper(req);
    },

    // POST a new clan data
    createClan: function createClan (clanData) {
      clanData.leader = $rootScope.user.userID;
      let req = {
        method: 'POST',
        url: API_SERVER + '/api/v1/clan',
        data: clanData
      }
      return requestWrapper(req);
    },

    // Join a clan given the clan id
    joinClan: function joinClan (clanID) {
      let req = {
        method: 'PUT',
        url: API_SERVER + '/api/v1/clan/' + clanID.toUpperCase() + '/join',
        data: { userID: $rootScope.user.userID }
      }
      return requestWrapper(req);
    },

    // Leave the current clan
    leaveClan: function leaveClan () {
      let req = {
        method: 'PUT',
        url: API_SERVER + '/api/v1/clan/' +
             $rootScope.user.clanID.toUpperCase() + '/leave',
        data: { userID: $rootScope.user.userID }
      }
      return requestWrapper(req);
    },

    // Toggle player war status
    toggleWar: function toggleWar () {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/user/' + $rootScope.user.userID +
             '/toggleWar'
      }
      return requestWrapper(req);
    },

    // NOTE: combine addToWar and outOfWar
    // Add the given user id to war.
    addToWar: function addToWar (userID) {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/user/' + userID + '/inWar'
      }
      return requestWrapper(req);
    },

    // Move the given user id out of war.
    outOfWar: function outOfWar (userID) {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/user/' + userID + '/outWar'
      }
      return requestWrapper(req);
    },

    // Toggle clan war, start and end clan war.
    toggleClanWar: function startWar () {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan/' +
             $rootScope.user.clanID.toUpperCase() + '/war/toggle'
      }
      return requestWrapper(req);
    },

    // Returns true if a war is going on, else returns false
    isWarOn: function isWarOn () {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan/' +
             $rootScope.user.clanID.toUpperCase() + '/isWarOn'
      }
      return requestWrapper(req);
    },

    // Returns war map (Array)
    getWarMap: function getWarMap () {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan/' +
             $rootScope.user.clanID.toUpperCase() + '/warMap'
      }
      return requestWrapper(req);
    },

    // Move all the war members out of war.
    resetWarMembers: function resetWarMembers () {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan/' +
             $rootScope.user.clanID.toUpperCase() + '/war/members/reset'
      }
      return requestWrapper(req);
    },

    // Initialize war map
    initWarMap: function initWarMap (putData) {
      let req = {
        method: 'PUT',
        url: API_SERVER + '/api/v1/clan/' +
             $rootScope.user.clanID.toUpperCase() + '/warmap/init',
        data: putData
      }
      return requestWrapper(req);
    },

    // Reset War Map
    resetWarMap: function resetWarMap () {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan/' +
             $rootScope.user.clanID.toUpperCase() + '/warmap/reset'
      }
      return requestWrapper(req);
    },

    // Update War Map (update target and player)
    updateWarMap: function updateWarMap (putData) {
      let req = {
        method: 'PUT',
        url: API_SERVER + '/api/v1/clan/' +
             $rootScope.user.clanID.toUpperCase() + '/warmap/update',
        data: putData
      }
      return requestWrapper(req);
    },

    // Returns an array of clan members
    getClanMembers: function getClanMembers () {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan/' +
             $rootScope.user.clanID.toUpperCase() + '/members'
      }
      return requestWrapper(req);
    },

    // Returns clan members who are ready for war
    getWarReadyMembers: function getWarReadyMembers() {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan/' +
             $rootScope.user.clanID.toUpperCase() + '/war/ready'
      }
      return requestWrapper(req);
    },

    // Returns clan members who are in war
    getWarMembers: function getWarMembers () {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan/' +
             $rootScope.user.clanID.toUpperCase() + '/war/members'
      }
      return requestWrapper(req);
    }
  }
}

DatabaseService.$inject = ['$rootScope', '$http', 'API_SERVER', 'AUTH_EVENTS'];

export { DatabaseService };
