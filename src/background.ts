// chrome.runtime.onInstalled.addListener(() => {
//   console.log('Background has started');
//
//   chrome.webNavigation.onCompleted.addListener(() => {
//     chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
//       chrome.pageAction.show(id);
//     });
//   }, { url: [{ urlMatches: 'google.com' }] });
//
// });

import * as config from "../txcircuit/circuitsCompiled/transaction_pk.json";
// import * as config from "./transaction_pk.json";
debugger

console.log(config);
// console.log(config.protocol);
console.log('Background has started 222!');
