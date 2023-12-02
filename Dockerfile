FROM node:18-alpine
LABEL author="Amin Shokri"
ARG PACKAGES=nano
ENV TERM xterm
RUN apk update && apk add $PACKAGES

WORKDIR /backend-app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
EXPOSE      8080
CMD npm start
