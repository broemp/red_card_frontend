#Dockerfile

# Use this image as the platform to build the app
FROM node:21-alpine AS external-website

# The WORKDIR instruction sets the working directory for everything that will happen next
WORKDIR /app

# Copy all local files into the image
COPY . .

RUN npm install -g pnpm
# Clean install all node modules
RUN pnpm install

USER node:node

# This is the command that will be run inside the image when you tell Docker to start the container
CMD ["npm vite dev"]
