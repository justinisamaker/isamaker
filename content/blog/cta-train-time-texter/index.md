---
layout: post
title:  "Chicago Transit Authority Train Time Texter"
niceDate: "January 25th, 2015"
teaser: "Creating a button to text me how long I have to get to my L stop before I'm late for work."
category: blog-post
tags: [arduino, edison, maker]
image: /assets/img/trainTracker/cta.jpg
---

I've got around a ten minute walk to my closest train station every morning. Depending on how late I'm running and if I'm hustling or not, that time can swing from eight to twelve minutes. It seems like every time I try to do the eight-minute run, I always end up getting to the station right as my train is pulling away. To help better predict how much time I have to catch a train, I made a button that can figure out when the next train arrives. Once it gets the time, it sends me a text to my phone - that way I can hit the button on my way out the door and not worry about it until I make it to the bottom of my stairs.

{% include imageWithCaption.html size="large" imageSrc="/assets/img/trainTracker/cta.jpg" caption="Photo by Clark Maxwell" link="http://www.flickr.com/photos/clarkmaxwell/" %}

Making a button that can talk to the Internet sounds kind of involved, but it's actually pretty easy when you use a microcontroller like the Intel Edison. When the Edison hears a click from a button that's attached to it, it uses JavaScript to make a call to the Chicago Transit Authority's API, and then another call to Twilio to send me a text. Let's take a look at how to make it!

#### Set Up Your Edison
Full disclosure&mdash;I'm working on a Mac, so these instructions will skew that way. To get started, you should have a <a href="https://communities.intel.com/docs/DOC-23193" target="_blank">freshly-flashed Edison</a>. After you board is flashed, you can try to find the IP address and enter all the additional commands, or you can just "npm install bloop" on the machine that you're trying to SSH in from. <a href="http://rexstjohn.com/introducing-bloop-cli-commands-for-working-with-intel-edison/" target="_blank">Bloop is a tool</a> from <a href="http://rexstjohn.com/" target="_blank">Rex St. John</a>, and it's an absolute lifesaver when you're working with the Edison. Instead of running "screen /dev/cu.usbserial-XXXXX 115200 -L", all you have to do is run "bloop c" it will connect to the Edison it finds on your network. Once you're in, run "configure_edison --setup" to get your wi-fi and user creds defined.

While all this is happening, you can start downloading the Edison Yocto Image from <a href="https://communities.intel.com/docs/DOC-23242" target="_blank">this site</a>. You want the link that says, "Edison Yocto Complete Image." Once downloaded, you'll need to load the files onto a micro SD card - you can read up on Yocto and how to get those files onto the SD card <a href="https://software.intel.com/en-us/html5/documentation/getting-started-with-intel-xdk-iot-edition" target="_blank">here</a>. After you load the files, power down your Edison, insert the SD card, and the power it back up. To test your install is working, bloop in to your Edison and type "node -v". If that returns the version of Node that you have installed you're good to go. If it says "Command not found," you're going to need to try loading Yocto onto the SD card again, because something went wrong.

#### Hook Up Your Button
<div class="paragraph-with-picture left">
	<p>If you read any of my other Edison posts, you know that I've been working with a <a href="http://www.seeedstudio.com/depot/Grove-Starter-Kit-p-709.html" target="_blank">Grove Starter Kit</a> that I got from Intel and Instructables. I used the small pushbutton from the starter kit for this project, but you can use any button - the bigger, the better.<br/><br/>If you need help figuring out how to hook up the button, the Arduino website has a really <a href="http://arduino.cc/en/tutorial/button" target="_blank">great tutorial</a> to get you pointed in the right direction. Whatever button you end up using, all you need to do is hook it up so that it's outputting to a digital pin on the Edison. I used D2 for my program. Once that is connect, you can go ahead and power on your Edison.</p>

	{% include imageWithCaption.html size="small" imageSrc="/assets/img/trainTracker/sparkfun-big-red-button.jpg" caption="Big Dome Pushbutton from Sparkfun" link="https://www.sparkfun.com/products/9181" %}
</div>

#### Bells &amp; Whistles - a 3D Printed Case
I 3D printed a case for my Edison using <a href="https://www.thingiverse.com/thing:457434" target="_blank">a design from Thingiverse</a>. The case uses the screws for the struts to secure the lid, and has two slots for the shield pins to go through. I did have to drill an extra hole in the lid for the ISP pins, but other than that everything fits great.

{% include imageWithCaption.html size="large" imageSrc="/assets/img/barkTracker/edison-case.jpg" caption="3D Printed Intel Edison Case by Michael Jassowski" link="http://www.thingiverse.com/thing:457434" %}

### Code Time
We're going to be using MRAA, Node.js, the Chicago Transit Authority's API, and Twilio to handle the communication for this project. MRAA is the C library that lets us talk to the Edison through JavaScript. It works with a lot of different flavors of Intel products, and has a similar syntax to "regular" Arduino code. We could write this code as a regular Arduino program, but this puppy can run Node, so why not?

Chicago has been making a huge effort to make a lot of resources available to developers over the past few years. We've got the <a href="https://data.cityofchicago.org/" target="_blank">Data Portal</a> at our fingertips, <a href="https://arrayofthings.github.io/" target="_blank">the Array of Things</a> on the horizon, and fairly comprehensive access to the <a href="http://www.transitchicago.com/developers/" target="_blank">CTA's API</a>. We'll be using the CTA API to ask for arrival times for a specific station.

#### API Prep
In order to use the CTA's API, you're going to need to apply for an API key. I've never heard of them turning someone down for a key, but it does take around a day to turn around. You can <a href="http://www.transitchicago.com/developers/traintrackerapply.aspx" target="_blank">apply for an API key here</a>.

Once you have your API Key, you're going to want to find out the station ID for your home station. You can find the <a href="http://www.transitchicago.com/developers/ttdocs/default.aspx#_Toc296199909" target="_blank">station listings here</a>. It's worth mentioning that this whole thing would also work for the <a href="http://www.transitchicago.com/developers/bustracker.aspx" target="_blank">CTA's Bus Tracker API</a>, as well as a slew of other transit APIs from other cities.

In addition to the CTA API key, you'll also need a Twilio key. If you aren't already familiar with it, Twilio is a service that lets you send calls or texts programmatically. To get your Twilio API Keys, you'll need to sign up for their free trial <a href="https://www.twilio.com/try-twilio" rel="nofollow">here</a>. The trial lets you send thousands of texts before you have to decide if you want to pay for your use, so you should be in the clear for this and many other projects.

#### Write the Code
Now that you've got your API stuff all sorted out, we can actually write the code that's going to be running this stuff. Code be found on GitHub, but come on, write it out yourself and get a good understanding of it.

{% highlight javascript %}
// Require Node libraries
var mraa = require('mraa');
var request = require('request');
var xml2js = require('xml2js');

// We get the data back from the CTA API in XML, so we'll set up a parser to get it over to JSON
var parser = new xml2js.Parser();

// CTA vars
var json,
	messageBody,
	loganId = '41020',
	apiKey = '[ INSERT CTA API KEY ]';

//TWILIO
var twilio = require('twilio');
var client = new twilio.RestClient(
	'[ INSERT TWILIO PUBLIC KEY ]',
	'[ INSERT TWILIO PRIVATE KEY ]'
);

// Use MRAA to declare a new input on digital pin 2
var buttonPin = new mraa.Gpio(2);
buttonPin.dir(mraa.DIR_IN);

// Log the MRAA version for a sanity check
console.log('MRAA Version: ' + mraa.getVersion());

// Set up the init function
function init(){
	getArrTime();
	checkButtonPress();
}

// Set up the function to query the CTA API using request
function getArrTime(){
	request(
		'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=' +
		// include the api key
		apiKey +
		'&mapid=' +
		// and the station id
		loganId +
		// only return two results - we just need the next train in a certain direction
		'&max=2', function(error, response, body){
			// parse the XML response
			parser.parseString(body, function(err, result){
				json = JSON.stringify(result);
				json = JSON.parse(json);
				return json;
			});

			for(i=0, l=(json['ctatt'].eta).length; i < l; i++){
				// format the time to AM/PM
				var arrTime = String(json['ctatt'].eta[i].arrT).slice(9);
				var H = arrTime.slice(0,2);
				var h = (H % 12) || 12;
				var ampm = H < 12 ? "AM" : "PM";
				var formattedArrTime = h + arrTime.substr(2, 3) + ' ' + ampm;

				// pull the response for the direction of train that we're looking for. The Blue Line runs North towards O'Hare, or South towards Forest Park - I want Forest Park for my morning commute
				if((json['ctatt'].eta[i].destNm) == 'Forest Park'){
					// give us a nice message to text
					messageBody =
						'A Forest Park-Bound ' +
						json['ctatt'].eta[i].rt +
						' Line train will arrive at ' +
						json['ctatt'].eta[i].staNm +
						' at ' +
						formattedArrTime;
					console.log('set: ' + messageBody);
					return messageBody;
				} // END DEST CHECK
			} // END FOR LOOP
	}); // END REQUEST
} // END GET ARRIVAL TIME

// code to listen for a button press
function checkButtonPress(){
	var buttonPushed = buttonPin.read();

	if(buttonPushed){
		getArrTime();
		console.log('ret: ' + messageBody);

		// tell the text where to go
		client.sms.messages.create({
			to:'[ INSERT TARGET PHONE NUMBER ]',
			from:'+[ INSERT TWILIO PHONE NUMBER ]',
			body: messageBody
		}, function(error, message){
			if(!error){
				console.log(message);
			} else {
				console.log(error);
			}
		});
		// wait two seconds before we start checking for presses again to prevent lingering clicks
		setTimeout(function(){
			setTimeout(checkButtonPress, 100);
		}, 2000);
	} else {
	setTimeout(checkButtonPress, 100);
	}
} // END CHECK BUTTON PRESSED

// call the init function
init();
{% endhighlight %}

#### Run Your Code
In the terminal window that has your Bloop session open, type 'node traintracker.js' in the root of your project folder. This should start the JS running. Check your terminal to see if the Edison gave back the MRAA version - if it did, you're all good to go. Go ahead and press the button, and then wait for your text.

If you don't receive a text, take a look at the output in the terminal. The code will return an error telling you what you're missing. Make sure that you replaced all the CTA and Twilio API keys, as well as the Twilio numbers.

If your button is working, now you can hit it on the way out your door and have you marching orders texted to you right away. Yay, Internet!


