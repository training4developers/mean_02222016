"use strict";

const
	gulp = require("gulp");

gulp.task("copy", function() {

	gulp.src("src/**/*")
		.pipe(gulp.dest("dist"));

});

gulp.task("server", function() {
	require("./index.js");
});

gulp.task("default", ["copy"], function () {

	gulp.watch(["src/**/*"], ["copy"]);

});
