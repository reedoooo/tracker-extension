let stats = {};

function getDescription(tabId, domain) {
  chrome.tabs.executeScript(
    tabId,
    {
      code: `Array.from(document.getElementsByTagName('meta')).find((tag) => tag.getAttribute('name')?.toLowerCase() === 'description')?.getAttribute('content') || ''`,
    },
    (result) => {
      if (chrome.runtime.lastError || !result) return;

      const description = result[0];
      stats[domain].description = description;
      chrome.storage.local.set({ stats });
    },
  );
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    const url = new URL(tab.url);
    const domain = url.hostname;

    if (!stats[domain]) {
      stats[domain] = {
        timeSpent: 0,
        interactions: 0,
        lastVisited: null,
        favicon: `https://${domain}/favicon.ico`,
      };
    }

    getDescription(tabId, domain);

    if (stats[domain].lastVisited) {
      const timeSpent = Date.now() - stats[domain].lastVisited;
      stats[domain].timeSpent += timeSpent;
    }

    stats[domain].lastVisited = Date.now();
    chrome.storage.local.set({ stats });
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    const url = new URL(tab.url);
    const domain = url.hostname;

    if (stats[domain]) {
      stats[domain].lastVisited = Date.now();
    }
  });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.stats) {
    stats = changes.stats.newValue;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'getStats') {
    sendResponse(stats);
  }
});
