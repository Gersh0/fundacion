# Install the project dependencies
FROM node:20.11.1 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build the project
FROM node:20.11.1 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Use the official Node.js 20.11.1 image as the base image
FROM node:20.11.1 AS runner
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=prod
COPY --from=builder /app/dist ./dist

# Expose the port from the .env file
ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}

# Run the NestJS application
CMD ["node", "dist/main"]
