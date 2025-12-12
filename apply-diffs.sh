#!/bin/bash

# Apply all .diff files in the diffs directory
for diff_file in diffs/*.diff; do
    if [ -f "$diff_file" ]; then
        echo "Applying: $(basename "$diff_file")"
        if git apply "$diff_file"; then
            rm -f "$diff_file"
            echo "Deleted: $(basename "$diff_file")"
        else
            echo -e "\033[0;31mFailed to apply: $(basename "$diff_file")\033[0m"
        fi
    fi
done

# If diffs directory is empty, delete it
if [ -z "$(ls -A diffs)" ]; then
    echo "Diffs directory is empty, no diffs applied."
fi
