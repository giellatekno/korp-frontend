#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 VERSION"
    exit 1
fi
DATE=$(date +"%Y-%m-%d %H:%M")
svn copy https://svn.spraakdata.gu.se/repos/lb/trunk/sbkhs/korp-frontend \
      https://svn.spraakdata.gu.se/repos/lb/trunk/sbkhs/pub/releases/korp\-frontend/"korp $1 $DATE" -m "Release $1"
