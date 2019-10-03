FROM node:latest
WORKDIR /views
COPY package.json /views
RUN npm install
COPY . /views
CMD node app.js
EXPOSE 8080