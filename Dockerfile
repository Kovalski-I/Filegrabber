FROM node:12
WORKDIR /usr/src/app

COPY . .

# Building the app
RUN npm install --save
RUN npm rebuild
RUN npm run build

# Running the app
EXPOSE 3000
CMD [ "npm", "start" ]