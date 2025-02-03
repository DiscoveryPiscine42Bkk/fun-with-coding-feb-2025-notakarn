#!/bin/bash

if [ $# -le 0 ]; then
    echo "no argument"
fi

for arg in "$@"; do
    mkdir -p "ex$arg"
done

