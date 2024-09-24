FROM node:20.17.0-slim

RUN mkdir -p /app/packages

WORKDIR /app

COPY . .
RUN rm -rf ./pacakges/shoppingcar-app
RUN rm -rf ./pacakges/shoppingcar-app-e2e
RUN rm -rf ./pacakges/shoppingcar-web
RUN rm -rf ./pacakges/shoppingcar-web-e2e

EXPOSE 3333

CMD ["yarn", "start:dev:api"]