PUBLIC := public

.PHONY: all
all: build

.PHONY: clean
clean:
	rm -rf $(PUBLIC)

.PHONY: server
server:
	hugo server

.PHONY: build
build:
	hugo --cleanDestinationDir
