(function(angular) {

	angular.module("MyApp.Constants", []);
	angular.module("MyApp.Services", ["MyApp.Constants"]);
	angular.module("MyApp.Controllers", ["MyApp.Services"]);

	angular.module("MyApp", ["MyApp.Services", "MyApp.Controllers"]);

})(angular);
