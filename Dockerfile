# Build AdonisJS
FROM node:16-alpine
# Set directory for all files
WORKDIR /home/node/app
# Copy over package.json files
COPY package*.json ./
# Install all packages
# RUN npm install
# Copy over source code
COPY . .
# Expose port to outside world
EXPOSE 3333 8080
# Start server up
CMD npm install && node ace migration:run --force && node ace serve --watch
