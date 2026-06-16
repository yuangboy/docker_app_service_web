#!/bin/bash
# Graceful shutdown handling
trap 'echo "Shutting down..."; exit 0' SIGTERM SIGINT

npm start &
wait $!