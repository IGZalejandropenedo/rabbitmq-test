var context = require('rabbit.js').createContext();
var start;
var count = 0;

console.log("Consumer - Creating context");

context.on('ready', function() {
	console.log("Context Ready");

	var sub = context.socket('SUB');
	sub.connect('events', function() {
		console.log("Connected to Events")

		sub.setEncoding("utf-8");
		sub.on("data", function(data){
			var d = JSON.parse(data);
			count++;
			
			if(!start) {
				start = new Date();
				console.log("Start Receiving", start.getTime());
			}
			
			if(d.end) {
				console.log("End Receiving", (new Date()).getTime(), "Count:" + count);
				process.exit(0);
			}
			//console.log("Message", data)
		})
	});

});