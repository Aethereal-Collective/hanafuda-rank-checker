#!/bin/bash

APP_DIR="$(pwd)" 

docker container stop aethereal-hana-leaderboard
docker container rm aethereal-hana-leaderboard
docker image rm aethereal-hana-leaderboard
docker build -t aethereal-hana-leaderboard .

mkdir -p "$APP_DIR/server/data"
touch "$APP_DIR/server/data/leaderboard.db"
touch "$APP_DIR/server/data/last_update.json"

docker run -d \
  --name aethereal-hana-leaderboard \
  -p 4003:3000 \
  -v "$APP_DIR/server/data:/app/server/data" \
  aethereal-hana-leaderboard

echo "Container started successfully on port 3000 with volume mounted."
