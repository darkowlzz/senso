function ToastService ($mdToast) {
  return {
    savedToast: function savedToast () {
      $mdToast.show(
        $mdToast.simple()
          .content('Saved!')
          .position('top right'));
    }
  }
}

ToastService.$inject = ['$mdToast'];

export { ToastService };
