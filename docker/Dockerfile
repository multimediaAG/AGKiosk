FROM tarampampam/node:14-alpine

LABEL maintainer="Hannes Rüger"
LABEL name="AGKiosk"

RUN apk add tree
RUN mkdir -p /app/data
COPY app /app
RUN tree /app
RUN cd /app/dist && npm i

EXPOSE 3000
CMD ["node", "/app/dist/index.js"]