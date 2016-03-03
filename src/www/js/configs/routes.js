(function(angular) {

	config.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

	function config($stateProvider, $urlRouterProvider, $locationProvider) {

		$urlRouterProvider.otherwise("/");
		$locationProvider.html5Mode(false);

		$stateProvider
			.state("home", {
				url: "/",
				templateUrl: "/tpls/home.tpl",
				controller: "home"
			})
			.state("about", {
				template: `
<h1>About</h1>
<a ui-sref='home'>Home</a>
<div ui-view='mission'></div>
<div ui-view='team'></div>
<div ui-view='history'></div>`,
				controller: function() {

				}
			})
			.state("about.details", {
				url: "/about",
				views: {
					mission: {
						templateUrl: "/tpls/mission.tpl",
						controller: "mission"
					},
					team: {
						template: "<h2>Team</h2><p>{{team}}</p>",
						controller: function($scope) {
							$scope.team = "President: Chester<br>Vice-President of SD: Samip<br>Vice-President of Marketing: Luis<br>Spring Training: Adam<br>Software Developer: Kyle";
						}
					},
					history: {
						template: "<h2>History</h2><p>{{history}}</p>",
						controller: function($scope) {
							$scope.history = "Alita decided to invest a small part of her billion dollar forture to help people get credit.";
						}
					},

				}
			});

	}

	angular.module("WidgetApp.Services").config(config);


})(angular);
