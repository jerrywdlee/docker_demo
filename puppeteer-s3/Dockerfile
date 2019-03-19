FROM node:10.15.3-alpine
LABEL maintainer="Iuliana Augusta <iuliana.augusta@gmail.com>"

WORKDIR /usr/local/src/app

ENV CHROME_BIN="/usr/bin/chromium-browser"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

RUN set -x \
  && apk update \
  && apk upgrade \
  && apk add --no-cache \
  dumb-init \
  udev \
  ttf-freefont \
  chromium

# Cleanup
RUN apk del --no-cache make gcc g++ python binutils-gold gnupg libstdc++ \
  && rm -rf /usr/include \
  && rm -rf /var/cache/apk/* /root/.node-gyp /usr/share/man /tmp/* \
  && echo

ENV AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_REGION AWS_BUCKET_NAME

ADD ./node-app/package.json /usr/local/src/app/package.json
RUN npm install

ADD ./node-app/index.ts /usr/local/src/app/index.ts
ADD ./node-app/screenshot.ts /usr/local/src/app/screenshot.ts
ADD ./node-app/aws-s3.ts /usr/local/src/app/aws-s3.ts

RUN echo $PWD
RUN echo $CHROME_BIN
RUN printenv
RUN ls -la
