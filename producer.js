require("nodetime").profile();

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

sleep(1000);

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
		console.log("Finished Sending: " +  end + " ms", "Time: " + ((new Date()).getTime() - start) + " ms" ,"Count:" + count);
		process.exit(0);
	});
});

