var context = require('rabbit.js').createContext();

console.log("Consumer - Creating context");

context.on('ready', function() {
	console.log("Context Ready");

	var sub = context.socket('SUB');
	sub.connect('events', function() {
		console.log("Connected to Events")

		sub.setEncoding("utf-8");
		sub.on("data", function(data){
			var d = JSON.parse(data);
			
			if(!start) {
				start = new Date();
				console.log("Start Receiving", start.getTime());
			}
			
			if(d.end) {
<<<<<<< HEAD
				console.log("End Receiving", new Date().getTime());
=======
				console.log("End Receiving", new Date.getTime());
>>>>>>> 00ff2e8976a1da5861909af1ee14768166f6a9eb
			}
			//console.log("Message", data)
		})
	});

});