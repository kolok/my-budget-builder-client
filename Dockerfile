# Use an node 10 runtime as a parent image
FROM node:14

# Set the working directory to /server
WORKDIR /usr/client

# copy the client sources
# node_modules will be ignore because of .dockerignore file
COPY . .
RUN npm i -g @vue/cli-service @vue/cli-plugin-unit-jest
RUN npm install --quiet

CMD npm run watch -- --env.API_URL=https://komber-komber-server.k8s.pipauls.com/api/v1/
