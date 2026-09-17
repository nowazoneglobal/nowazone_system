# Use Node 20 alpine
FROM node:20-alpine

WORKDIR /app

# Copy server package definitions
COPY server/package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy backend source files
COPY server/ ./

# Cloud Run defaults
ENV PORT=8080
ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", "src/server.js"]
