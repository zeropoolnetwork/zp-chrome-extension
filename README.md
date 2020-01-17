# Zeropool Chrome Extension

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/916cf56aeb004d929ed0e6e7cd45f34f)](https://www.codacy.com/gh/zeropoolnetwork/zp-chrome-extension?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=zeropoolnetwork/zp-chrome-extension&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/zeropoolnetwork/zp-chrome-extension.svg?branch=master)](https://travis-ci.org/zeropoolnetwork/zp-chrome-extension)


Chrome extension that allow to make anonymous transaction using Zeropool smart contract.

## Development
Build all:
  - `build.sh` 

Clone & build:
  - `git clone git@github.com:zeropoolnetwork/zp-chrome-extension.git --recurse-submodules`
  - `./build-txcircuits.sh`
  - `npm run extension:build`

Development:
   - `npm run extension:watch`
   - You may use `npm start` ,in case you want to work only on UI part
   
Notes: 
  - *`txcircuit` build doesn't work with node `v12.14.0`, build is tested with node version
 `v11.15.0`.*
  - Build might take time

   


