(()=>{"use strict";document.getElementById("saveTabs").addEventListener("click",(function(){console.log("Clicked save tabs button!"),chrome.tabs.query({},(function(e){console.log("Found tabs: ",e);const o=e.map((e=>e.url));console.log("Found urls: ",o),chrome.storage.sync.set({savedTabs:o},(function(){console.log("Saved tabs!"),alert("Tabs saved successfully!")}))}))})),document.getElementById("retrieveTabs").addEventListener("click",(function(){chrome.storage.sync.get(["savedTabs"],(function(e){const o=e.savedTabs;console.log("Retrieved tabs",o),o?o.forEach((e=>{console.log("Opening tab",e),chrome.tabs.create({url:e})})):(console.log("No saved tabs found!"),alert("No saved tabs found!"))}))}))})();