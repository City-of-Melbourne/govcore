# Build docker image

    docker build --no-cache -t govcore .

# Run a shell in the container

    docker run -p 8001:8001 -p 8002:8002 -p 8003:8003 -p 8004:8004 -it govcore bash

# Run container as a daemon

    docker run -d -p 8001:8001 -p 8002:8002 -p 8003:8003 -p 8004:8004 govcore

if the start script doesn't work for some how you can turn things on/off manually. See the `govcore/start` script.
