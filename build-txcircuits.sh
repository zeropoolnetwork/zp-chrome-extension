#!/bin/sh
set -e
set -o pipefail

cd ./txcircuit
npm i
./setup.sh
cd ..
npm run copy:assets
