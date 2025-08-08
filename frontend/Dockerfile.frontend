# Use a Node.js Alpine image for a smaller size
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if you're using Yarn)
COPY package*.json ./

# Install npm dependencies (this step will be cached if package files don't change)
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port Vite will run on (default is 3000)
EXPOSE 7000

# Command to start the app in development mode
CMD ["npm", "start"]
