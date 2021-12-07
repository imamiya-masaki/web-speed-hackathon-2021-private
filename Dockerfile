FROM node:16-alpine

ENV HOST 0.0.0.0
ENV PORT 8080
EXPOSE 8080

# daemon for cron jobs
# RUN echo 'crond' > /boot.sh
COPY package*.json ./
COPY yarn.lock ./
RUN npm install
RUN npm install yarn
RUN npm install --save-dev rimraf
RUN npm install --save-dev cross-env
RUN npm install --save-dev webpack-dev-server@2.9.7
RUN npm install --save-dev webpack html-webpack-plugin
RUN npm install --save-dev webpack-cli babel-loader @babel/core @babel/preset-env
RUN npm install jquery
RUN yarn install
RUN npm install -g http-server
# RUN echo 'crontab .openode.cron' >> /boot.sh

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)


# Bundle app source
COPY . .

RUN yarn build
RUN yarn start
ENTRYPOINT ["yarn", "start"]
# CMD [ "http-server", "dist" ]
