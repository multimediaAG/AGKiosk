FROM tarampampam/node:14-alpine

LABEL maintainer="Hannes Rüger"
LABEL name="AGKiosk"

RUN mkdir -p /app/config && mkdir /app/dist
COPY dist /app/dist
COPY public /app/dist/public
COPY views /app/dist/views
RUN cd /app/dist && npm i

EXPOSE 3000
CMD ["node", "/app/dist/index.js"]