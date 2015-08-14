function DatabaseService ($http) {
  return {
    getClanData: function getClanData () {
      let promise = $http.get('/members').then((resp) => {
        return resp.data;
      }, (err) => {
        console.log('failed to fetch', err);
      });
      return promise;
    },

    updateClan: function updateClan (data) {
      let promise = $http.post('/updateClan', data).then(() => {
        return resp.data;
      });
      return promise;
    }
  }
}

export { DatabaseService };
