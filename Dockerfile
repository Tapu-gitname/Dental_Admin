# Step 1: Build the Angular app
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Step 2: Serve the app using NGINX
FROM nginx:alpine

# Copy the built Angular app to the NGINX web directory
COPY --from=build /app/dist/<your-angular-app-name> /usr/share/nginx/html

# Expose the default NGINX port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
