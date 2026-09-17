# Use official Node.js runtime as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (production only)
RUN npm ci --omit=dev

# Copy application source code
COPY . .

# Expose port (Cloud Run sets the PORT env variable, default 8080)
ENV PORT=8080
ENV NODE_ENV=production
EXPOSE 8080

# Start the server
CMD ["node", "src/server.js"]
