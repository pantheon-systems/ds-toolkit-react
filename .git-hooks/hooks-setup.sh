#!/bin/bash

GREY='\033[0;37m'
GREEN='\033[0;32m'
RED='\033[0;31m'
WHITE='\033[0;37m'
RESET='\033[0m'

echo
echo -e "${GREY}» Setting up Git hooks"
echo -e "${RESET}"

ln -s .git-hooks/pre-commit.sh .git/hooks/pre-commit

echo
echo -e "${GREEN}» Git hooks setup completed!"