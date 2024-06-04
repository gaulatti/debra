#!/bin/bash

TIMESTAMP=$(node -e "console.log(new Date().toISOString())")

LHCI_BUILD_CONTEXT__COMMIT_TIME=$TIMESTAMP \
LHCI_BUILD_CONTEXT__CURRENT_HASH=$TIMESTAMP \
LHCI_BUILD_CONTEXT__COMMIT_MESSAGE=$TIMESTAMP \
LHCI_BUILD_CONTEXT__CURRENT_BRANCH="cnn.com/markets" \
LHCI_BUILD_CONTEXT__AUTHOR="cnn.com" \
LHCI_BUILD_CONTEXT__AVATAR_URL="https://media.cnn.com/api/v1/images/cnnplus/ott/cnn-carousel-logo.jpg" \
lhci autorun --config=./lhci.config.js
