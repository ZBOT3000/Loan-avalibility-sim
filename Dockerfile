# ---- Stage 1: Build ----
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Copy package files
    COPY package.json package-lock.json ./
    
    # Install dependencies
    RUN npm install
    
    # Copy source code
    COPY . .
    
    # Build the app
    RUN npm run build
    
    
    # ---- Stage 2: Serve ----
    FROM nginx:alpine
    
    # Copy built files to nginx
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # Expose port 80
    EXPOSE 80
    
    # Start nginx
    CMD ["nginx", "-g", "daemon off;"]
    