// top level await is available in ES modules loaded from script tags
const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  });
  
  const tabId = tab.id;
  const button = document.getElementById('openSidePanel');
  button.addEventListener('click', async () => {
    await chrome.sidePanel.open({ tabId });
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel-tab.html',
      enabled: true
    });

    // chrome.scripting.executeScript({
    //     target: { tabId: tabId },
    //     function: accessDOM
    //   });
  });

  function accessDOM() {
    // Example: Access the title of the current page
    console.log(document.title);
  }

  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'display_data') {
        const sidePanelContent = document.getElementById('sidePanelContent');
        if (sidePanelContent) {
            sidePanelContent.textContent = request.data.message;
        }
    }
});

chrome.