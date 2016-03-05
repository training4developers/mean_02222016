module.exports = function(options) {

	"use strict";

	global.logger = require("./logger")(options.logger);
	global.logger.info("logging started");

	const
		http = require("http"),
		express = require("express"),
		mongoose = require("mongoose"),
		multer = require("multer"),
		session = require('express-session'),
		cookieParser = require('cookie-parser'),
		passport = require("passport"),
		bodyParser = require("body-parser");

	let
		app = express(),
		server = http.createServer(app),
		io = require("socket.io")(server);

	// connect to mongo
	mongoose.connect(`mongodb://${options.mongoServer.host}:${options.mongoServer.port}/${options.mongoServer.dbName}`);

	require("./authentication")(app);

	// validate logged in and tokens for all API requests
	//app.use(require("./routers/api-request-validator"));

	app.use("/api", require("./routers/rest.js")("user-file"));
	app.use("/api", require("./routers/rest.js")("credit-card"));
	app.use("/api", require("./routers/rest.js")("account"));
	app.use("/api", require("./routers/rest.js")("widget"));

	app.use(/.*map$/, function(req, res) {
		res.writeHead(404);
		res.end();
	});

	app.use(express.static(options.webServer.folder));

	require("./sockets")(io);

	return {
		start: function() {

			return new Promise(function startPromise(resolve, reject) {
				server.listen(options.webServer.port, function serverListen(err) {

					server.options = options.webServer;

					if (err) {
						err.options = server.options;
						global.logger.error(err);
						reject(err);
						return;
					}

					global.logger.info(`http server started on port ${server.options.port}`);
					resolve(server.options);

				});
			});

		},
		stop: function() {

			return new Promise(function stopPromise(resolve, reject) {
				server.close(function serverClose(err) {

					if (err) {
						err.options = server.options;
						global.logger.error(err);
						reject(err);
						return;
					}

					global.logger.info(`http server stopped on port ${server.options.port}`);
					resolve(server.options);

				});
			});

		}
	}
};
