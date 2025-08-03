# Stage 1: Build dependencies with tools like g++ and make
FROM node:alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install npm dependencies (this step will be cached if package files don't change)
RUN npm install

# Copy the rest of the application code, including server.js, into the container
COPY . .

# Stage 2: Production Image (Final runtime image)
FROM node:alpine

# Set working directory inside the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app /app

# Install g++ and other necessary tools during runtime
RUN apk add --no-cache g++ make bash libstdc++

# Expose the port your app runs on
EXPOSE 9000

# Command to start the app
CMD ["npm", "start"]
