FROM webhippie/alpine:latest AS build
RUN curl -o - https://caddyserver.com/download/linux/amd64?license=personal | tar xvzf -

FROM webhippie/alpine:latest

LABEL maintainer="Thomas Boerger <thomas@webhippie.de>" \
  org.label-schema.name="Umschlag Docs" \
  org.label-schema.vendor="Thomas Boerger" \
  org.label-schema.schema-version="1.0"

EXPOSE 8080

COPY --from=build /caddy /usr/bin/caddy

COPY docker/caddy.conf /etc/
COPY public /srv/www

CMD ["/usr/bin/caddy", "-conf", "/etc/caddy.conf", "-root", "/srv/www"]
