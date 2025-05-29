# Step 1: Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build
COPY . .
RUN npm run build

# Step 2: Production stage
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only the built output and needed files
COPY --from=builder /app/.output .output
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json ./

# Expose port (default for Nuxt)
EXPOSE 3000

# Start Nuxt in production mode
CMD ["node", ".output/server/index.mjs"]
