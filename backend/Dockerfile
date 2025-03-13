FROM node:21.7.3

WORKDIR /app

COPY . .

RUN npm install && npm run model-generate

EXPOSE 3001

CMD sh -c "npm run seed:dev && npm run dev:debug"