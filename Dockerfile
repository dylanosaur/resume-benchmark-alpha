# Use an official Node.js LTS (Long Term Support) as the base image
FROM node:lts-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the entire project to the working directory
COPY . .

RUN node --version

# Build the Next.js app
RUN . .env && npm run build

# Use a smaller, production-ready base image
FROM node:lts-alpine AS runner

# Set the working directory inside the container
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Expose the desired port (replace 3000 with your Next.js app's port if necessary)
EXPOSE 3000

# Set the command to run when the container starts
CMD ["npm", "start"]
