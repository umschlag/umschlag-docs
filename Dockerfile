FROM alpine:edge

RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \
  apk \
    update && \
  apk add \
    bash \
    hugo \
    caddy \
    mailcap && \
  rm -rf \
    /var/cache/apk/*

ADD docker/entrypoint.sh /usr/bin/entrypoint.sh

ADD config.toml /srv/src/config.toml
ADD content /srv/src/content
ADD layouts /srv/src/layouts
ADD static /srv/src/static

ADD public /srv/www

ENTRYPOINT ["/usr/bin/entrypoint.sh"]
CMD ["/usr/sbin/caddy", "-port", "80", "-root", "/srv/www"]
