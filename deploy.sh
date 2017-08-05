#!/bin/sh
source .env
rm -r dist/*
yarn build
rsync -avz -e 'ssh' dist/ $DISTANT_SERVER
