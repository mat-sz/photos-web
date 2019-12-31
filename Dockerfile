FROM node:alpine as build

WORKDIR /app
ARG API_URL
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app

RUN yarn install
RUN REACT_APP_API_URL=${API_URL} yarn build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]