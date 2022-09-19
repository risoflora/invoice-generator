#!/bin/bash

export VERSION=$1

yarn run build

zip -q -r invoice-generator-v"$VERSION".zip dist/
