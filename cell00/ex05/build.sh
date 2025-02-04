#!/bin/bash

if [ $# -le 0 ]; then
    echo "No arguments supplied"
fi

for arg in "$@"; do
    mkdir -p "ex$arg"
done

