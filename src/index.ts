document.getElementById("saveTabs")!.addEventListener("click", function () {
  console.log("Clicked save tabs button!");
  chrome.tabs.query({}, function (tabs) {
    console.log("Found tabs: ", tabs);
    const urls = tabs.map((tab) => tab.url);
    console.log("Found urls: ", urls);
    chrome.storage.sync.set({ savedTabs: urls }, function () {
      console.log("Saved tabs!");
      alert("Tabs saved successfully!");
    });
  });
});

document.getElementById("retrieveTabs")!.addEventListener("click", function () {
  chrome.storage.sync.get(["savedTabs"], function (data) {
    const savedTabs = data.savedTabs;
    console.log("Retrieved tabs", savedTabs);
    if (savedTabs) {
      savedTabs.forEach((url: string) => {
        console.log("Opening tab", url);
        chrome.tabs.create({ url });
      });
    } else {
      console.log("No saved tabs found!");
      alert("No saved tabs found!");
    }
  });
});
