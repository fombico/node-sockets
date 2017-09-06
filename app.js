var express = require('express'),
	app = express(),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	port = process.env.PORT || 8080,
	server = require('http').createServer(app)
	io = require('socket.io').listen(server);

app.use(morgan('combined')); // logging of requests
app.use(bodyParser.urlencoded({extended: false})); // converts request body to json
app.use(express.static(__dirname + '/public'));

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

setInterval(() => {
		var number = getRandomInt(100, 200);
		console.log("Emitting %s", number);
		io.sockets.emit('randomNumber', number);
	}, 500);

server.listen(port);
