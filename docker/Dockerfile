FROM tarampampam/node:14-alpine

LABEL maintainer="Hannes Rüger"
LABEL name="AGKiosk"

RUN mkdir -p /app/config && mkdir /app/dist
COPY app /app/dist

EXPOSE 3000
CMD ["node", "/app/dist/index.js"]