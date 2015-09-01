function ToastService ($mdToast) {
  return {
    savedToast: function savedToast () {
      $mdToast.show(
        $mdToast.simple()
          .content('Saved!')
          .position('top right'));
    },

    showToast: function showToast (message) {
      $mdToast.show(
        $mdToast.simple()
          .content(message)
          .position('top right'));
    }
  }
}

ToastService.$inject = ['$mdToast'];

export { ToastService };
