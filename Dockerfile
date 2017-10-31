FROM webhippie/caddy:latest
MAINTAINER Thomas Boerger <thomas@webhippie.de>

EXPOSE 8080

COPY docker/caddyfile.tmpl /etc/templates/
COPY public /srv/www

RUN chown -R caddy:caddy /srv/www
