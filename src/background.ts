// chrome.runtime.onInstalled.addListener(() => {
//   console.log('Background has started');
//
//   chrome.webNavigation.onCompleted.addListener(() => {
//     chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
//       chrome.pageAction.show(id);
//     });
//   }, { url: [{ urlMatches: 'google.com' }] });
// });


console.log('Background has started 12!');
