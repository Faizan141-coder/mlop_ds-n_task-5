# Use official Node image as the base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]
