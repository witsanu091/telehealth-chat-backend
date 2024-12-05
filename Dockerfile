# Use Node.js LTS version
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy Prisma schema
COPY src/prisma ./src/prisma

# Generate Prisma Client
RUN npx prisma generate

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

