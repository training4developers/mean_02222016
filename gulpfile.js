"use strict";

const
	gulp = require("gulp"),
	templateCache = require('gulp-angular-templatecache');;

gulp.task("copy", function() {
	gulp.src(["src/**/*","!src/www/tpls/**/*"])
		.pipe(gulp.dest("dist"))
		.on("finish", function() {
			require("fs").rmdir("dist/www/tpls", function(err) {
				if (err) console.log(err.message);
			});
		});
});

gulp.task("templates", function() {
	gulp.src("src/www/tpls/**/*")
		.pipe(templateCache())
		.pipe(gulp.dest("dist/www/js"))
});

gulp.task("server", function() {
	require("./index.js");
});

gulp.task("default", ["copy","templates"], function () {

	gulp.watch(["src/**/*","!src/www/tpls/**/*"], ["copy"]);
	gulp.watch(["src/www/tpls/**/*"], ["templates"]);

});
