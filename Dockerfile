FROM node:20-alpine

WORKDIR /app

# Package files copy kar (fast build ke liye)
COPY package*.json ./

# Dependencies install kar
RUN npm ci --only=production

# Baaki files copy kar
COPY . .

# Build kar production ke liye
RUN npm run build

# Port batade
EXPOSE 3000

# Start kar app ko
CMD ["npm", "run", "preview"]
