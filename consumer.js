var context = require('rabbit.js').createContext();

console.log("Consumer - Creating context");

context.on('ready', function() {
	console.log("Context Ready");

	var sub = context.socket('SUB');
	sub.connect('events', function() {
		console.log("Connected to Events")

		sub.setEncoding("utf-8");
		sub.on("data", function(data){
			console.log("Message", data)
		})
	});

});