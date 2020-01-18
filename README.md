# Zeropool Chrome Extension

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/916cf56aeb004d929ed0e6e7cd45f34f)](https://www.codacy.com/gh/zeropoolnetwork/zp-chrome-extension?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=zeropoolnetwork/zp-chrome-extension&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/zeropoolnetwork/zp-chrome-extension.svg?branch=master)](https://travis-ci.org/zeropoolnetwork/zp-chrome-extension)


Chrome extension that allow to make anonymous transaction using Zeropool smart contract.

## About
Demo wallet that allows to send anonymous transactions on ETH. There are 2 modes: Privacy Mode and Usual mode to send ETH. To use Privacy mode correctly you will need to have a relayer who will allow to withdraw your ETH on new address that will not be connected with transactions. All the guides will be soon. Current repo is just simple ui demo that demonstrate potential usecase of zk tech in ETH.

## Running
Build all:
  - `build.sh` (Build might take ~7min time)

Development:
   - `npm run extension:watch`
   - You may use `npm start` ,in case you want to work only on UI part
   
Notes: 
  - *`txcircuit` build doesn't work with node `v12.14.0`, build is tested with node version
 `v11.15.0`.*
  - Build might take time

   


