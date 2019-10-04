FROM node:8.16.1
WORKDIR /views
COPY package.json /views
RUN npm install
COPY . /views
CMD node app.js
EXPOSE 8080