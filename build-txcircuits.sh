#!/bin/sh
set -e
set -o pipefail

npm i

cd ./txcircuit
npm i
./setup.sh
cd ..

npm run copy:assets
