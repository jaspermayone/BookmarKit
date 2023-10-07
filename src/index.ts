document.getElementById('saveTabs')!.addEventListener('click', function() {
  chrome.tabs.query({}, function(tabs) {
    const urls = tabs.map(tab => tab.url);
    chrome.storage.sync.set({ savedTabs: urls }, function() {
      alert('Tabs saved successfully! \u2714');
    });
  });
});

document.getElementById('retrieveTabs')!.addEventListener('click', function() {
  chrome.storage.sync.get(['savedTabs'], function(data) {
    const savedTabs = data.savedTabs;
    if (savedTabs) {
      savedTabs.forEach((url: string) => {
        chrome.tabs.create({ url });
      });
    } else {
      alert('No saved tabs found! \u274C');
    }
  });
});
