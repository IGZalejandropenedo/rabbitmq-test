require("nodetime").profile();

var context = require('rabbit.js').createContext();

var start, end;
var count = 0;
var timeMs = 60000;

console.log("Producer - Creating context");

context.on('ready', function() {
	console.log("Context Ready");

	var pub = context.socket('PUB');
	pub.connect('events', function() {
		console.log("Connected to events");

		start = new Date();
		end = start.getTime() + timeMs;
		console.log("Start Sending", start.getTime());
		while(end >= (new Date()).getTime()){
			pub.write(JSON.stringify({welcome: 'rabbit.js'}), 'utf8');
			count++;
		}
		pub.write(JSON.stringify({"end": 1}))
		console.log("Finished Sending: " +  end, "Time: " + (end - start) ,"Count:" + count);
		process.exit(0);
	});
});

