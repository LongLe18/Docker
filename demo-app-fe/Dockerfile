FROM node:12-alpine

WORKDIR /app

COPY package.json /app
# Install app dependencies
RUN npm install

RUN npm run build
# Copy your code in the docker image
COPY . /app


# Expose the port 3000
EXPOSE 3000

# Set the default command to run when a container starts
CMD ["npm", "start"]