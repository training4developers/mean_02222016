(function(angular) {

	controller.$inject = ["$scope"];

	function controller($scope) {
		$scope.message = "Hi Class!";
	}

	angular.module("WidgetApp.Controllers")
		.controller("home", controller);

})(angular);
