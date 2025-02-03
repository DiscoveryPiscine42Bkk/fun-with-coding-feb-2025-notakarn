#!/bin/bash

# Count the number of regular files and directories with a max depth of 1
total_count=$(find . -maxdepth 1 -type f -o -type d | wc -l)

# Subtract 1 to exclude the current directory itself
total_count=$((total_count - 1))

# Display the current total count
echo "Total number of files and directories: $total_count"
