# Umschlag: Documentation

[![Build Status](http://github.dronehippie.de/api/badges/umschlag/umschlag-docs/status.svg)](http://github.dronehippie.de/umschlag/umschlag-docs)
[![](https://images.microbadger.com/badges/image/umschlag/umschlag-docs.svg)](http://microbadger.com/images/umschlag/umschlag-docs "Get your own image badge on microbadger.com")
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3a29f0dfe7154054bdab7bff05e71c2d)](https://www.codacy.com/app/tboerger/umschlag-docs?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=umschlag/umschlag-docs&amp;utm_campaign=Badge_Grade)
[![Join the chat at https://gitter.im/umschlag/umschlag](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/umschlag/umschlag)
[![Stories in Ready](https://badge.waffle.io/umschlag/umschlag-api.svg?label=ready&title=Ready)](http://waffle.io/umschlag/umschlag-api)

Where does this name come from or what does it mean? It's quite simple, it's one german word for transshipment, I thought it's a good match as it is related to containers and a harbor.

Documentation for the Umschlag API and the command line client, you can find this website at [umschlag.webhippie.de](https://umschlag.webhippie.de).


## Hosting

The website is hosted on infrastructure sponsored by [Webhippie](https://webhippie.de), the Docker container just gets launched on the Swarm cluster. The website gets automatically updated on every push to the `master` branch.

If you want to host the docs on your own you can take our docker image [umschlag/umschlag-docs](https://hub.docker.com/r/umschlag/umschlag-docs/).


## Install

This website uses the [Hugo](https://github.com/spf13/hugo) static site generator. If you are planning to contribute you'll want to download and install Hugo on your local machine.

The installation of Hugo is out of the scope of this document, so please take the [official install instructions](https://gohugo.io/overview/installing/) to get Hugo up and running.


## Development

To generate the website and serve it on [localhost:1313](http://localhost:1313) just execute this command and stop it with `Ctrl+C`:

```
make server
```

When you are done with your changes just create a pull request, after merging the pull request the website will be updated automatically.


## Contributing

Fork -> Patch -> Push -> Pull Request


## Authors

* [Thomas Boerger](https://github.com/tboerger)


## License

CC-BY-SA-4.0


## Copyright

```
Copyright (c) 2016 Thomas Boerger <http://www.webhippie.de>
```
