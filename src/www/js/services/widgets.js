(function(angular) {

	factory.$inject = ["$http"];

	function factory($http) {
		return {
			getAll: function() {
				return $http.get("http://localhost:8080/api/widgets");
			}
		}
	}

	angular.module("WidgetApp.Services")
		.factory("widgets", factory);

})(angular);
