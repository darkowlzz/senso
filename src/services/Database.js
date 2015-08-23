function DatabaseService ($http) {
  return {
    getClanData: function getClanData () {
      let promise = $http.get('/clanData').then((resp) => {
        return resp.data;
      }, (err) => {
        console.log('failed to fetch', err);
      });
      return promise;
    },

    updateClanMembers: function updateClanMembers (data) {
      let promise = $http.post('/updateClanMembers', data).then((resp) => {
        return resp.data;
      });
      return promise;
    },

    getWarReadyMembers: function getWarReadyMembers () {
      let promise = $http.get('/warReadyMembers').then((resp) => {
        return resp.data;
      }, (err) => {
        console.log('failed to fetch', err);
      });
      return promise;
    },

    getWarMembers: function getWarMembers () {
      let promise = $http.get('/warMembers').then((resp) => {
        return resp.data;
      });
      return promise;
    },

    updateWarMembers: function updateWarMembers (data) {
      let promise = $http.post('/updateWarMembers', data).then((resp) => {
        return resp.data;
      });
      return promise;
    }
  }
}

export { DatabaseService };
