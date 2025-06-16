# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and lock file from client/
COPY client/package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app from client/
COPY client .

# Build the Vite app
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose the port serve will use
EXPOSE 3000

# Start the built app
CMD ["serve", "-s", "dist", "-l", "3000"]
