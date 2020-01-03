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

// import * as config from "../txcircuit/circuitsCompiled/transaction_pk.json";
// import * as config from "./transaction_pk.json";
// debugger
// console.log(config);
// console.log(config.protocol);
// console.log('Background has started 222!');

// import * as abc2 from '../txcircuit/browser/index.js';

// console.log('a1');
// import * as transactionJson from "../txcircuit/circuitsCompiled/transaction.json";

// import {
//   utils,
//   inputs,
//   MerkleTree,
//   buildpkey,
//   buildwitness
// } from '../txcircuit/browser/.js';

// console.log('a3');
//
// console.log(utils);
// console.log(inputs);
// console.log(MerkleTree);
// console.log(buildpkey);
// console.log(buildwitness);
//
// function depositTest() {
//   console.log(1);
//   const u = inputs.utxoRandom();
//   console.log(2);
//   const result = inputs.depositCompute({ asset: inputs.utxoToAsset(u), owner: u.owner });
//   console.log(3);
//   const w = utils.witness2(result.inputs, transactionJson);
//   console.log(4);
//   console.log(w);
//   console.log(5);
//   // debugger
// }
//
// depositTest();

// console.log(abc2.utils);
// console.log(abc2.utxo);
// console.log(abc2.utxoInputs);

