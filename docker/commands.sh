# Build, run, and remove an image when exited
docker run --name my_app -d -p 3000:3000 --rm $(docker buildx build -q .)
