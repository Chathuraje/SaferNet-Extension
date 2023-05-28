chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'loading' && tab.url && tab.url.startsWith('http')) {
      const url = new URL(tab.url);
      const domain = url.hostname;
  
      const apiURL = `https://api.safernet.live/domain_validator/predict/${domain}`;
  
      fetch(apiURL)
        .then(response => response.json())
        .then(data => {
          if (data === 1 && tab.url === url.href) {
            const saferNetURL = 'https://safernet.live/blocked.html';
            chrome.tabs.update(tabId, { url: saferNetURL });
          }
        })
        .catch(error => console.error(error));
    }
  });
  