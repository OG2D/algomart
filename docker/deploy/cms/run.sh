#!/usr/bin/env bash

set -e

directus bootstrap
directus schema apply --yes ./snapshot.yml
directus start
npm run seed-prod
