#!/bin/sh
set -e
set -o pipefail

./build-txcircuits.sh

npm run extension:build
