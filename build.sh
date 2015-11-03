#!/bin/bash

MOD_NAME="cms"
TAR="$MOD_NAME.tar.gz"
STATIC_TAR="static-$MOD_NAME.tar.gz"

ENV=$1

echo env:$ENV

fisa -v

rm -rf output

if [ "$ENV"x = "qa"x ]; then
    echo current qa
    fisa release -cuompd outputqa
    cd outputqa
else
    echo current online
    fisa release -cuompd output
    cd output
fi


#rm -rf config
#rm -rf test

mkdir webroot

mv static webroot/

tar czf $TAR ./*

rm -rf webroot

echo "build end"
