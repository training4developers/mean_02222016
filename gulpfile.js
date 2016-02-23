"use strict";

const
	gulp = require("gulp");

gulp.task("default", function() {

	const
		express = require("express");

	let
		app = express();

	app.use(express.static("app/www"));

	app.listen(8080, function() {
		console.log("web server listening on port 8080");
	});

});
