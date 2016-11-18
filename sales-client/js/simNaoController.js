$app.controller('SimNaoController', ['$scope', 'title', 'message', 'close', function($scope, title, message, close) {

  $scope.title = title;
  $scope.message = message;

  $scope.close = function(result) {
 	  close(result, 500); // close, but give 500ms for bootstrap to animate
  };

}]);