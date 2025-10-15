# Build and start (first time)

docker-compose up --build

# Start (after first build)

docker-compose up

# Run in background (detached mode)

docker-compose up -d

# Stop containers

docker-compose down

# View logs

docker-compose logs -f

# View logs for one service

docker-compose logs -f backend

# Rebuild after Dockerfile changes

docker-compose up --build

just to note and put this somewhere to remember.
