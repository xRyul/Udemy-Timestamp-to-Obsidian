// content-script.js
"use strict";

browser.runtime.onMessage.addListener(request => {
  console.log("Chrome extension loaded");
  console.log("Message from the background script:");
  console.log(request.greeting);
  //Udemy Timestamp
  var getTimestamp = document.querySelector("div.udlite-heading-sm:nth-child(5) > div:nth-child(1) > span:nth-child(1)").innerText;
  console.log(getTimestamp);
  return Promise.resolve({response: getTimestamp});
});
