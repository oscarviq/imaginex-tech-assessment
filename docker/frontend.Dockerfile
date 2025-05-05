# --------- STAGE 1: Build the app ---------
FROM node:lts AS builder

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Build the React app
RUN npm run frontend:build

# --------- STAGE 2: Production image ---------
FROM nginx:stable-alpine

# Copy built files from builder
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
