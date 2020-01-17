#!/bin/sh
set -e
set -o pipefail

npm i

cd ./txcircuit
./setup.sh
cd ..

cd ./MiMCTree
./compile.sh
cd ..

npm run copy:assets
npm run extension:build
