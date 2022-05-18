console.log("Background Running");

//Get Timestamp from Content > Receive Message
"use strict";

function onError(error) {
	console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs) {
	for (let tab of tabs) {
	browser.tabs.sendMessage(
		tab.id,
		{greeting: "Hi from background script"}
	).then(response => {
		console.log("Message from the content script:");

		//Get the Timestamp from Content Scripts
		console.log(response.response);
		//Timestamp in Minutes:Seconds
		var mTimestamp = response.response;
		//Convert timestamp
		var newtime = mTimestamp.split(':').reduce((acc,time) => (60 * acc) + +time);

		//***
		history.replaceState({}, document.title, ".");

		//Remove HASH and add ?start=
		var url1 = tab.url.split('#')[0] + "?start="; 

		//Copy To Clipboard The Timestamp and the URL
		var copyTimestamp = navigator.clipboard.writeText("[" + mTimestamp + "]" + "" + "(" + url1 + newtime + ")" + " ");
		

		// var pasteIT = console.log("[" + mTimestamp + "]" + "" + "(" + url1 + newtime + ")");

		//Focus obsidian
		window.open('obsidian://open?', '_self');

	}).catch(onError);
	}
}



browser.browserAction.onClicked.addListener(() => {
	browser.tabs.query({
	currentWindow: true,
	active: true
	}).then(sendMessageToTabs).catch(onError);
});
