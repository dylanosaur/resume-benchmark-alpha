# Use an official Node.js LTS (Long Term Support) as the base image
FROM node:lts-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the entire project to the working directory
COPY . /app

RUN node --version

# Build the Next.js app
RUN . .env && npm install && npm run build

# Expose the desired port (replace 3000 with your Next.js app's port if necessary)
EXPOSE 3000

# Set the command to run when the container starts
CMD ["npm", "run", "start"]
