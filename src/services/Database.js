function DatabaseService ($rootScope, $http, API_SERVER) {

  function requestWrapper (rqst) {
    let promise = $http(rqst).then((resp) => {
      return resp.data;
    }, (err) => {
      //console.log('REQUEST FAILED :o', err);
    });
    return promise;
  }

  return {
    login: function login (loginData) {
      let req = {
        method: 'POST',
        url: API_SERVER + '/login',
        data: loginData
      }
      return requestWrapper(req);
    },

    createUser: function createUser (userData) {
      let req = {
        method: 'POST',
        url: API_SERVER + '/api/v1/user',
        data: userData
      }
      return requestWrapper(req);
    },

    updateUser: function updateUser (userData) {
      let req = {
        method: 'PUT',
        url: API_SERVER + '/api/v1/user/' + userData.userID,
        data: userData
      }
      return requestWrapper(req);
    },

    createClan: function createClan (clanData) {
      clanData.leader = $rootScope.user.userID;
      let req = {
        method: 'POST',
        url: API_SERVER + '/api/v1/clan',
        data: clanData
      }
      return requestWrapper(req);
    },

    joinClan: function joinClan (userData, clanID) {
      let req = {
        method: 'PUT',
        url: API_SERVER + '/api/v1/clan/' + clanID.toUpperCase() + '/join',
        data: userData
      }
      return requestWrapper(req);
    },

    leaveClan: function leaveClan (userData, clanID) {
      let req = {
        method: 'PUT',
        url: API_SERVER + '/api/v1/clan/' + clanID.toUpperCase() + '/leave',
        data: userData
      }
      return requestWrapper(req);
    },

    // Player war status
    toggleWar: function toggleWar (userID) {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/user/' + userID + '/toggleWar'
      }
      return requestWrapper(req);
    },

    // NOTE: combine addToWar and outOfWar
    addToWar: function addToWar (userID) {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/user/' + userID + '/inWar'
      }
      return requestWrapper(req);
    },

    outOfWar: function outOfWar (userID) {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/user/' + userID + '/outWar'
      }
      return requestWrapper(req);
    },

    toggleClanWar: function startWar (clanID) {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan/' + clanID.toUpperCase() + '/war/toggle'
      }
      return requestWrapper(req);
    },

    isWarOn: function isWarOn (clanID) {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan/' + clanID.toUpperCase() + '/isWarOn'
      }
      return requestWrapper(req);
    },

    getWarMap: function getWarMap (clanID) {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan/' + clanID.toUpperCase() + '/warMap'
      }
      return requestWrapper(req);
    },

    resetWarMembers: function resetWarMembers (clanID) {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan/' + clanID.toUpperCase() + '/war/members/reset'
      }
      return requestWrapper(req);
    },

    initWarMap: function initWarMap (putData) {
      let req = {
        method: 'PUT',
        url: API_SERVER + '/api/v1/clan/' + putData.clanID.toUpperCase() + '/warmap/init',
        data: putData
      }
      return requestWrapper(req);
    },

    resetWarMap: function resetWarMap (clanID) {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan/' + clanID.toUpperCase() + '/warmap/reset'
      }
      return requestWrapper(req);
    },

    updateWarMap: function updateWarMap (putData) {
      let req = {
        method: 'PUT',
        url: API_SERVER + '/api/v1/clan/' + putData.clanID.toUpperCase() + '/warmap/update',
        data: putData
      }
      return requestWrapper(req);
    },

    /*
     // GET - /:clanID
    getClanData: function getClanData () {
      let promise = $http.get('/clanData').then((resp) => {
        return resp.data;
      }, (err) => {
        console.log('failed to fetch', err);
      });
      return promise;
    },
    */

    // not used yet
    getUserDetails: function getUserDetails (userID) {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/user/' + userID
      }
      return requestWrapper(req);
    },

    // NUY
    getClanDetails: function getClanDetails (clanID) {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan/' + clanID.toUpperCase()
      }
      return requestWrapper(req);
    },
 
    getClanMembers: function getClanMembers (clanID) {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan/' + clanID.toUpperCase() + '/members'
      }
      return requestWrapper(req);
    },


    getWarReadyMembers: function getWarReadyMembers (clanID) {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan/' + clanID.toUpperCase() + '/war/ready'
      }
      return requestWrapper(req);
    },


    getWarMembers: function getWarMembers (clanID) {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan/' + clanID.toUpperCase() + '/war/members'
      }
      return requestWrapper(req);
    },

    // NUY
    updateClanDetails: function updateClanDetails (putData) {
      let req = {
        method: 'PUT',
        url: API_SERVER + '/api/v1/clan/' + putData.clanID.toUpperCase(),
        data: putData
      }
      return requestWrapper(req);
    },

    // NUY
    updateClanMembers: function updateClanMembers (putData) {
      let req = {
        method: 'PUT',
        url: API_SERVER + '/api/v1/clan/' + putData.clanID.toUpperCase() + '/members/update',
        data: putData
      }
      return requestWrapper(req);
    },

    //NUY
    updateWarMembers: function updateWarMembers (putData) {
      let req = {
        method: 'PUT',
        url: API_SERVER + '/api/v1/clan/' + putData.clanID.toUpperCase() +
             '/war/members/update',
        data: putData
      }
      return requestWrapper(req);
    },



    /*
    toggleWar: function toggleWar (clanID) {
      let req = {
        method: 'GET',
        url: API_SERVER + '/api/v1/clan' + clanID + '/war/toggle'
      }
      return requestWrapper(req);
    }
    */
    /*
    // PUT - /:clanID/members/update
    updateClanMembers: function updateClanMembers (data) {
      let promise = $http.post('/updateClanMembers', data).then((resp) => {
        return resp.data;
      });
      return promise;
    },

    // GET - /:clanID/war/ready
    getWarReadyMembers: function getWarReadyMembers () {
      let promise = $http.get('/warReadyMembers').then((resp) => {
        return resp.data;
      }, (err) => {
        console.log('failed to fetch', err);
      });
      return promise;
    },

    // GET - /:clanID/war/members
    getWarMembers: function getWarMembers () {
      let promise = $http.get('/warMembers').then((resp) => {
        return resp.data;
      });
      return promise;
    },

    // PUT - /:clanID/war/members/update
    updateWarMembers: function updateWarMembers (data) {
      let promise = $http.post('/updateWarMembers', data).then((resp) => {
        return resp.data;
      });
      return promise;
    },

    // GET - /:clanID/war/members/reset
    warMembersReset: function warMembersReset () {
      let promise = $http.get('/warMembersReset').then((resp) => {
        return resp.data;
      });
      return promise;
    },

    // GET - /:clanID/war/toggle
    toggleWar: function toggleWar () {
      let promise = $http.get('/toggleWar').then((resp) => {
        return resp.data;
      });
      return promise;
    },

    // PUT - /:clanID/warmap/update
    updateWarMap: function updateWarMap (data) {
      let promise = $http.post('/updateWarMap', data).then((resp) => {
        return resp.data;
      });
      return promise;
    }
    */
  }
}

DatabaseService.$inject = ['$rootScope', '$http', 'API_SERVER'];

export { DatabaseService };
