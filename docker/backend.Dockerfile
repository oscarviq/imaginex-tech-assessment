FROM node:lts AS builder

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Run the tests
RUN npm run backend:test

# Serve the app
CMD ["npm", "run", "backend:serve"]
