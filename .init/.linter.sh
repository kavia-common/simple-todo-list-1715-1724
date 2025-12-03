#!/bin/bash
cd /tmp/kavia/workspace/code-generation/simple-todo-list-1715-1724/frontend_reactjs
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

