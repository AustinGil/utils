# Build image `my_app`, then run built image as `my_app`, and remove the container when exited (image `my_app:latest` remains)
docker run --name my_app -d -p 3000:3000 --rm $(docker buildx build -t my_app:latest -q .)
