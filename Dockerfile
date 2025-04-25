# Use official Node.js Alpine image
FROM node:20.12.2-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if present
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose port (the app uses 3333)
EXPOSE 3333

# Start the application (change 'start' if your main script is different)
CMD ["npm", "start"]
