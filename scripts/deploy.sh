#!/bin/bash

# Parse command line arguments or use default values
while [[ $# -gt 0 ]]; do
    case "$1" in
        --service)
            SERVICE="$2"
            shift 2
            ;;
        *)
            echo "Invalid argument: $1"
            exit 1
            ;;
    esac
done


# Ensure all required parameters are provided
if [[ -z $SERVICE ]]; then
    echo "Usage: $0 --service <SERVICE>"
    exit 1
fi

echo "start pull and fix format"

# SSH into the server and pull changes from the Git repository
cd ~/KabGo && git pull origin main

echo "start build and deploy"

# Restart the application server (e.g., if using Node.js)
cd ~/KabGo/docker-compose && docker compose down && docker compose -f docker-compose-prod.yml up $SERVICE -d

echo "Deploy successfully"