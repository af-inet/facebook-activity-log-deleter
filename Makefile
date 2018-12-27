.PHONY: default dist.zip

default: dist.zip

dist.zip:
	zip dist.zip dist/*

