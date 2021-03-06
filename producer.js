require("nodetime").profile();

var context = require('rabbit.js').createContext('amqp://ec2-46-137-6-37.eu-west-1.compute.amazonaws.com:5672');

var start, end;
var count = 0;

//Workaround to avoid Heroku resetting the app for not binding to the designated port
if(process.env.PORT) {
	console.log("heroku workaround");
	net = require("net");
	net.createServer().listen(process.env.PORT);
}

var timeMs = (!!process.argv[2] ? parseInt(process.argv[2]) : 10000);

console.log("Producer - Creating context");

context.on('ready', function() {
	console.log("Context Ready");

	var pub = context.socket('PUB');
	pub.connect('events', function() {
		console.log("Connected to events");

		start = new Date();
		end = start.getTime() + timeMs;
		console.log("Start Sending", start.getTime());
		function send() {
			if(end >= (new Date()).getTime()){
				pub.write(JSON.stringify({welcome: 'rabbit.js'}), 'utf8');
				count++;
				process.nextTick(send);
			} else {
				pub.write(JSON.stringify({"end": 1}))
				console.log("Finished Sending: " +  end + " ms", "Time: " + ((new Date()).getTime() - start) + " ms" ,"Count:" + count);
				process.exit(0);
			}
		}
		send();
	});
});

