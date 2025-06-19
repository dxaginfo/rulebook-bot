# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and install dependencies for frontend
COPY package*.json ./
RUN npm ci

# Copy frontend source and build
COPY . .
RUN npm run build

# Server stage
FROM node:18-alpine AS server

WORKDIR /app

# Copy server package.json and install dependencies
COPY server/package*.json ./
RUN npm ci --only=production

# Copy server code
COPY server/ ./

# Copy built frontend from build stage
COPY --from=build /app/dist ./dist

# Expose the server port
EXPOSE 3001

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Start the server
CMD ["node", "index.js"]
