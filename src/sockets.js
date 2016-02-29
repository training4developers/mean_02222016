module.exports = function(io) {

	io.on("connection", function(socket) {

		socket.on("echo", function(message) {
			global.logger.info("echo message received: " + message);
			socket.emit("echo", message);
		});

	});


};
