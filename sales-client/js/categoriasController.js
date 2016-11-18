$app.controller('categoriasController', function ($scope, $http, $routeParams, $location, ModalService) {
	//lista de categorias
	$scope.rows = null;

	//uma categoria 
	$scope.row = null;

	//Pagination
	$scope.currentPage = 0;
	$scope.pageSize = 5;

	$scope.numberOfPages = function () {
		return Math.ceil($scope.rows.length / $scope.pageSize);
	}

	$scope.new = function() {
		$location.path("/categorias/new");
	}

	$scope.loadAll = function () {
		$scope.showLoader();
		$http.get($scope.server("/categoria/categorias")).success(function (data) {
			$scope.rows = data.categoria;
			$scope.hideLoader();
		});
	}

	$scope.loadRow = function () {
		if ($routeParams.id != null) {
			$scope.showLoader();
			$http.get($scope.server("/categoria/categoria/" + $routeParams.id)).success(function (data) {
				$scope.row = data;
				$scope.row.isUpdate = true;
				$scope.row.isNew = false;
				$scope.hideLoader();
			});
		} else {
			$scope.row = {}
			$scope.row.id = 0;
			$scope.row.isUpdate = false;
			$scope.row.isNew = true;
			$scope.hideLoader();
		}
	}

	$scope.save = function () {
		$scope.showLoader();
		if ($scope.row.id != 0) {
			$http.put($scope.server("/categoria/alterar"), $scope.row).success(function (data) {

				editCallback = function (d) {
					$scope.row.isUpdate = true;
					$scope.row.isNew = false;
					$scope.hideLoader();
				};

				showAlert("Sucesso.", "Alterado com sucesso.", data, editCallback);
			});
		} else {
			$http.post($scope.server("/categoria/cadastrar"), $scope.row).success(function (data) {

				saveCallback = function (d) {
					$scope.row.isUpdate = true;
					$scope.row.isNew = false;
					$location.path("/categorias/" + d.categoria.id);
					$scope.hideLoader();
				};

				showAlert("Sucesso.", "Cadastrado com sucesso.", data, saveCallback);
			});
		}
	}

	$scope.del = function () {
		ModalService.showModal({
			templateUrl: "view/alert/simnao.html",
			controller: "SimNaoController",
			inputs: {
				title: "Exclusão",
				message: "Deseja excluir a categoria: " + $scope.row.categoria + "?"
			}
		}).then(function (modal) {
			modal.element.modal();
			modal.close.then(function (result) {
				if (result) {
					$scope.hideLoader();
					alert("Excluído com sucesso");
					$location.path("/categorias");
				}
			});
		});
	}

	function showAlert(title, message, data, callback) {
		ModalService.showModal({
			templateUrl: "view/alert/alert.html",
			controller: "AlertController",
			inputs: {
				title: title,
				message: message
			}
		}).then(function (modal) {
			modal.element.modal();
			modal.close.then(function (result) {
				callback(data);
			});
		});
	}

});