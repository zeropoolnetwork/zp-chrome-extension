#!/bin/sh
set -e
set -o pipefail

cd ./MiMCTree
npm i
npm run contract:compile
cd ..
npm run copy:assets
