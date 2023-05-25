FROM docker.io/library/debian:bookworm AS builder

RUN set -eux; \
	apt-get update; \
    apt-get install -y --no-install-recommends git nginx npm; \
    npm install --global yarn

RUN set -eux; \
    mkdir -p /korp/; \
    git clone --branch giellatekno --single-branch --depth 1 https://github.com/giellatekno/korp-frontend.git /korp/korp-frontend; \
    cd /korp/korp-frontend; \
    yarn; \
    yarn build

FROM docker.io/library/nginx

COPY ./korp-frontend.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /korp/korp-frontend/dist /var/www/korp-frontend
