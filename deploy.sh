#!/bin/bash

while [[ $# -gt 0 ]]; do
    case "$1" in
        -s)
            SERVICE="$2"
            shift 2
            ;;
        *)
            echo "Invalid argument: $1"
            exit 1
            ;;
    esac
done

if [[ -z $SERVICE ]]; then
    echo "Missing arguments service";
    exit 1
fi

git pull origin main

cd docker-compose

docker compose down

docker compose -f docker-compose-prod.yml up -d $SERVICE

exit 1