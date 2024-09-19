# Step 1: Use Node.js as base image
FROM node:16-alpine as build

# Step 2: Set working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json if it exists
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Use Nginx to serve the app
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/assets /usr/share/nginx/html/assets
COPY --from=build /app/public/index.html /usr/share/nginx/html/index.html

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf