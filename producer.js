var context = require('rabbit.js').createContext();

console.log("Producer - Creating context");

context.on('ready', function() {
	console.log("Context Ready");

	var pub = context.socket('PUB');
	pub.connect('events', function() {
		console.log("Connected to events");

		console.log("Writing to Stream");
		pub.write(JSON.stringify({welcome: 'rabbit.js'}), 'utf8');
	});
});