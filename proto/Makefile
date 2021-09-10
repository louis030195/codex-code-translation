.PHONY: all
all: server client

.PHONY: server
server:
	@cargo run

.PHONY: client
client:
	@protoc -I=./proto \
		./proto/*.proto \
      --js_out=import_style=commonjs:../client/src/pb \
      --grpc-web_out=import_style=typescript,mode=grpcwebtext:../client/src/pb