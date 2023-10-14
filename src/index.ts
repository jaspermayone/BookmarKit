var packageJson = require("../package.json");

function saveTabs() {
  chrome.identity.getProfileUserInfo(function(userInfo) {
    const userId = userInfo.id;

    chrome.tabs.query({}, function(tabs) {
      const urls = tabs.map(tab => tab.url);

      chrome.storage.sync.set({ userId, savedTabs: urls }, function() {
        alert('Tabs saved successfully! \u2714');
      });
    });
  });
}

document.getElementById('saveTabs')!.addEventListener('click', saveTabs);

document.getElementById('retrieveTabs')!.addEventListener('click', function() {
  chrome.identity.getProfileUserInfo(function(userInfo) {
    const userId = userInfo.id;

    chrome.storage.sync.get(['userId', 'savedTabs'], function(data) {
      // Check if the user is authorized
      if (data.userId === userId) {
        // Retrieve the saved tabs
        const savedTabs = data.savedTabs;
        // Open each saved tab
        if (savedTabs && savedTabs.length > 0) {
          savedTabs.forEach((url: string) => {
            chrome.tabs.create({ url });
          });
        } else {
          alert('No saved tabs found! \u274C');
        }
      } else {
        alert('You are not authorized to retrieve these tabs! \u274C');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const packageVersion = document.getElementById('packageVersion');
  if (packageVersion) {
    packageVersion.textContent = "Version: " + packageJson.version;
  }
});
