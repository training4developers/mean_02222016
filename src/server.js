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

	// serialize account id to session
	passport.serializeUser(function(account, done) {
		logger.info("serialize user account id: " + account._id);
  	done(null, account._id);
	});

	// deserialize account from the database using id from session
	passport.deserializeUser(function(accountId, done) {
		logger.info("deserialize user account id: " + accountId);
		require("./models/account")
			.findById(accountId, function(err, account) {

				if (err) {
					logger.error(util.inspect(err,0));
					res.status(500).json(err).end();
				}

				logger.info(util.inspect(account,0));

				done(null, account.toObject());
			});
	});

	// handle cookies
	app.use(cookieParser());

	// sessions are used for password ONLY
	app.use(session({
		resave: false,
		saveUninitialized: false,
		secret : "asecret"
	}));

	// setup passport for session based logins
	app.use(passport.initialize());
	app.use(passport.session());

	// setup REST services
	app.use("/api", bodyParser.json());

	// authenticate all API requests
	app.use(require("./routers/authenticate"));

	// validate logged in and tokens for all API requests
	//app.use(require("./routers/api-request-validator"));

	app.use("/api", require("./routers/rest.js")("user-file"));
	app.use("/api", require("./routers/rest.js")("credit-card"));
	app.use("/api", require("./routers/rest.js")("account"));

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
