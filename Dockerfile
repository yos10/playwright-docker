# https://github.com/BretFisher/nodejs-rocks-in-docker/blob/main/dockerfiles/ubuntu-deb.Dockerfile

###
## ubuntu base with nodejs deb package, for a more secure base
###
FROM ubuntu:focal-20220404 as base

# version of Node.js we will install later
ENV NODE_VERSION=16.14.2

# create node user and group, then create app dir
RUN groupadd --gid 1000 node \
    && useradd --uid 1000 --gid node --shell /bin/bash --create-home node \
    && mkdir /app \
    && chown -R node:node /app

# get full list of packages at https://deb.nodesource.com/node_16.x/pool/main/n/nodejs/
# this basic TARGETARCH design only works on amd64 and arm64 builds.
# for more on multi-platform builds, see https://github.com/BretFisher/multi-platform-docker-build
ARG TARGETARCH
RUN apt-get -qq update \
    && apt-get -qq install -y ca-certificates wget --no-install-recommends \
    && wget -O nodejs.deb -qSL https://deb.nodesource.com/node_16.x/pool/main/n/nodejs/nodejs_${NODE_VERSION}-deb-1nodesource1_${TARGETARCH}.deb \
    && apt-get -qq install -y ./nodejs.deb --no-install-recommends \
    && apt-get -qq remove wget \
    && rm nodejs.deb \
    && rm -rf /var/lib/apt/lists/* \
    && which npm

# install dependencies for Chromium
RUN npx playwright install-deps chromium

FROM base as dev
RUN apt-get purge -y fonts-wqy-zenhei
RUN apt-get -qq update && apt-get -qq install -y --no-install-recommends \
    locales \
    fonts-noto-cjk \
    && rm -rf /var/lib/apt/lists/*
RUN locale-gen ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP
ENV LANG=ja_JP.UTF-8
ENV TZ=Asia/Tokyo
WORKDIR /app
USER node
RUN npx playwright install chromium
