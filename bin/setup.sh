#!/bin/bash 

# This is a beginging of a script for the db setup

# Exit immediately if a command exits with a non-zero status.
set -e

echo "== Installing dependencies =="
npm install

echo "== Setting up the database =="

# Create the database if it doesn't exist. Replace with your database details.
psql -U postgresql -c "CREATE DATABASE nusdevs;" || true

# Run migrations and seeds using Knex or Sequelize. Adjust accordingly.
npx knex migrate:latest
npx knex seed:run

# For Sequelize:
# npx sequelize-cli db:migrate
# npx sequelize-cli db:seed:all

echo "== Clearing old logs =="
rm -rf logs/*

echo "== Setup complete =="
