FROM node:12.18.1-alpine3.9

WORKDIR /home/node
RUN apk add bash git
RUN npm install -g create-react-app tslint typescript
