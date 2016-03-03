(function(angular) {

	controller.$inject = ["$scope"];

	function controller($scope) {
		$scope.mission = "We love to help people afford things in life."
	}

	angular.module("WidgetApp.Controllers")
		.controller("mission", controller);

})(angular);
