FROM node:20-alpine
ENV NODE_ENV production

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

# RUN npm install
RUN npm ci --omit=dev

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "src/app.mjs" ]
