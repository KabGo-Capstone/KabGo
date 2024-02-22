#!/bin/bash

# Parse command line arguments or use default values
while [[ $# -gt 0 ]]; do
    case "$1" in
        --host)
            VPS_IP="$2"
            shift 2
            ;;
        --uname)
            USERNAME="$2"
            shift 2
            ;;
        --port)
            VPS_PORT="$2"
            shift 2
            ;;
        --service)
            SERVICE="$2"
            shift 2
            ;;
        --pwd)
            PWD="$2"
            shift 2
            ;;
        *)
            echo "Invalid argument: $1"
            exit 1
            ;;
    esac
done


# Ensure all required parameters are provided
if [[ -z $VPS_IP || -z $USERNAME || -z $VPS_PORT || -z $SERVICE ]]; then
    echo "Usage: $0 --host <HOST> --uname <USERNAME> --port <VPS_PORT> --service <SERVICE>"
    exit 1
fi

echo "start pull and fix format"

# SSH into the server and pull changes from the Git repository
sshpass -p $PWD ssh -o StrictHostKeyChecking=no -p $VPS_PORT "$USERNAME@$VPS_IP" "cd KabGo && git pull origin main"

echo "start build and deploy"

# Restart the application server (e.g., if using Node.js)
sshpass -p $PWD ssh -o StrictHostKeyChecking=no -p $VPS_PORT "$USERNAME@$VPS_IP" "cd KabGo/docker-compose && docker compose down && docker compose -f docker-compose-prod.yml up $SERVICE -d"

echo "Deploy successfully"

exit 1