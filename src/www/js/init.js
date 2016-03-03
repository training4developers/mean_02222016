(function(angular) {

	angular.module("WidgetApp.Constants", []);
	angular.module("WidgetApp.Templates", []);
	angular.module("WidgetApp.Services", ["WidgetApp.Constants"]);
	angular.module("WidgetApp.Controllers", ["WidgetApp.Services"]);

	angular.module("WidgetApp", [
		"ui.router",
		"WidgetApp.Templates",
		"WidgetApp.Services",
		"WidgetApp.Controllers"
	]);

})(angular);
