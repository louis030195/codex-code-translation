.PHONY: all
all: docker

.PHONY: docker
build:
	docker build -t louis030195/codex-code-translation-server .
	
run:
	docker run -it --rm -p 9999:9999 louis030195/codex-code-translation-server
