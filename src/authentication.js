module.exports = function(app) {

	const
		mongoose = require("mongoose"),
		session = require('express-session'),
		cookieParser = require('cookie-parser'),
		passport = require("passport"),
		bodyParser = require("body-parser");


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
}
