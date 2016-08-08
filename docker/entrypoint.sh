#!/usr/bin/env bash

if [[ -n ${UMSCHLAG_ROOT} ]]
then
  /usr/bin/hugo \
    --baseURL ${KLEISTER_ROOT} \
    --source /srv/src \
    --destination /srv/www${KLEISTER_ROOT} \
    --cleanDestinationDir
fi

exec $@
