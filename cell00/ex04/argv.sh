#!/bin/bash

if [ $# -gt 3 ]; then
    echo "You need to provide no more than 3 arguments."
    exit 1
fi

if [ $# -ge 1 ]; then
    echo "$1"
fi

if [ $# -ge 2 ]; then
    echo "$2"
fi

if [ $# -ge 3 ]; then
    echo "$3"
fi
