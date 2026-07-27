#!/usr/bin/env bash

set -Eeuo pipefail

readonly APP_DIR="/opt/apps/ets-petit"

cd "${APP_DIR}"

git fetch origin main
git reset --hard origin/main

docker network inspect proxy >/dev/null
docker compose up -d --build --remove-orphans
docker compose ps
docker image prune -f
