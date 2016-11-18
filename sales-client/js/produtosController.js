

//function clientesController($scope,$http,$routeParams,$location)
$app.controller('produtosController',function ($scope, $http, $routeParams, $location, ModalService) {
	//lista de clientes
	$scope.rows = null;

	//um cliente 
	$scope.row = null;

	//Pagination
	$scope.currentPage = 0;
	$scope.pageSize = 5;

	$scope.numberOfPages =function(){
		return Math.ceil($scope.rows.length/$scope.pageSize);                
	}

	$scope.loadAll = function(){
		$scope.showLoader();
		$http.get($scope.server("/produto/produtos")).success(function(data){
			$scope.rows = data.produto;	
			$scope.hideLoader();
		});
	}

	$scope.loadRow = function(){
		if ($routeParams.id!=null)
		{
			$scope.showLoader();
			$http.get($scope.server("/produto/produto/" + $routeParams.id)).success(function(data){
				$scope.row = data;
				$scope.row.isUpdate = true;
				$scope.hideLoader();
			});
		}
		else
		{
			$scope.row = {}
			$scope.row.id = 0;
			$scope.row.isUpdate = false;
			$scope.hideLoader();
		}
	}

	$scope.save = function () {
		$scope.showLoader();
		if ($scope.row.id != 0) {
			$http.put($scope.server("/produto/alterar"), $scope.row).success(function (data) {
				ModalService.showModal({
					templateUrl: "view/alert/alert.html",
					controller: "AlertController",
					inputs: {
						title: "Sucesso.",
						message: "Salvo com sucesso"
					}
				}).then(function (modal) {
					modal.element.modal();
					modal.close.then(function (result) {
						$scope.row.isUpdate = true;
						$scope.hideLoader();
					});
				});
			});
		} else {
			$http.post($scope.server("/produto/cadastrar"), $scope.row).success(function (data) {
				ModalService.showModal({
					templateUrl: "view/alert/alert.html",
					controller: "AlertController",
					inputs: {
						title: "Sucesso.",
						message: "Salvo com sucesso"
					}
				}).then(function (modal) {
					modal.element.modal();
					modal.close.then(function (result) {
						$scope.row.isUpdate = true;
						$scope.hideLoader();
						$location.path("/produtos/" + data.produto.id);
					});
				});
			});
		}
	}

	$scope.del = function () {
		ModalService.showModal({
			templateUrl: "view/alert/simnao.html",
			controller: "SimNaoController",
			inputs: {
				title: "Exclusão",
				message: "Deseja excluir o produto: " + $scope.row.nome + "?"
			}
		}).then(function (modal) {
			modal.element.modal();
			modal.close.then(function (result) {
				if (result) {
					$scope.hideLoader();
					alert("Excluído com sucesso");
					$location.path("/produtos");
				}
			});
		});
	}

});