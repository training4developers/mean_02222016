(function(angular) {

	controller.$inject = ["$scope", "widgets"];

	function controller($scope, widgets) {
		$scope.message = "Hi Class!";

		widgets.getAll().then(function(results) {
			$scope.widgets = results.data;
		});
	}

	angular.module("WidgetApp.Controllers")
		.controller("home", controller);

})(angular);
