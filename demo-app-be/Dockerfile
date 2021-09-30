FROM node:12-alpine

WORKDIR /app

# Install Dependencies
COPY package*.json ./

RUN npm install

# Copy app source code
COPY . .

# Exports
EXPOSE 8000

CMD ["npm","start"]