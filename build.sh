#!/bin/bash

export VITE_APP_VERSION=$1

yarn run build

zip -q -r invoice-generator-v"$VITE_APP_VERSION".zip dist/
