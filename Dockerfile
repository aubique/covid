# Name the node stage "builder"
FROM node:10 AS builder
# Set working directory in the container
WORKDIR /app
# Copy all files to working dir in image
COPY ./covid-ui .
# Istall node modules
RUN npm i
# Add the required maps
COPY ./resx ./node_modules/fusioncharts/maps
# Build assets
RUN npm run build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/dist/covid-ui .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
