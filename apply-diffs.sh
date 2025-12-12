#!/bin/bash

# Apply all .diff files in the diffs directory
for diff_file in diffs/*.diff; do
    if [ -f "$diff_file" ]; then
        echo -e "Applying: \033[0;34m$(basename "$diff_file")\033[0m"
        if git apply "$diff_file"; then
            rm -f "$diff_file"
            echo -e "Deleted: \033[0;34m$(basename "$diff_file")\033[0m"
        else
            echo -e "\033[0;31mFailed to apply: $(basename "$diff_file")\033[0m"
        fi
    fi
done

# If diffs directory is empty, delete it
if [ -z "$(ls -A diffs)" ]; then
    echo -e "\033[0;31mDiffs directory is empty, no diffs applied.\033[0m"
fi
