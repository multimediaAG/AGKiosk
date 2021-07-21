FROM tarampampam/node:14-alpine

LABEL maintainer="Hannes Rüger"
LABEL name="AGKiosk"

RUN mkdir -p /app/data && mkdir /app/dist
COPY app /app/dist
RUN cd /app/dist && npm i

EXPOSE 3000
CMD ["node", "/app/dist/index.js"]