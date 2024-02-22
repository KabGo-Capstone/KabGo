#!/bin/bash

# Parse command line arguments or use default values
while [[ $# -gt 0 ]]; do
    case "$1" in
        --service)
            SERVICE="$2"
            shift 2
            ;;
        --service-path)
            SERVICE_PATH="$2"
            shift 2
            ;;
        *)
            echo "Invalid argument: $1"
            exit 1
            ;;
    esac
done


# Ensure all required parameters are provided
if [[ -z $SERVICE || -z $SERVICE_PATH ]]; then
    echo "Usage: $0 --service <SERVICE> --service-path <SERVICE_PATH>"
    exit 1
fi

echo "start pull and fix format"

# SSH into the server and pull changes from the Git repository
cd ~/KabGo && git pull origin main

echo "start build and deploy"

cd ~/KabGo/$SERVICE_PATH && cp -r ../protos ./protos

# Restart the application server (e.g., if using Node.js)
cd ~/KabGo/docker-compose && docker compose -f docker-compose-prod.yml down && docker compose -f docker-compose-prod.yml up $SERVICE -d --build

cd ~/KabGo/$SERVICE_PATH && rm -rf protos

echo "Deploy successfully"