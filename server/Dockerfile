FROM ekidd/rust-musl-builder:stable as builder

# TODO
# RUN USER=root cargo new --bin codex-code-translation
WORKDIR /codex-code-translation
# COPY ./Cargo.lock ./Cargo.lock
# COPY ./Cargo.toml ./Cargo.toml
# RUN cargo build --release
# RUN rm src/*.rs

ADD . ./

# RUN rm ./target/release/deps/codex-code-translation*
RUN cargo build --release

FROM alpine:latest

ARG APP=/usr/src/app

EXPOSE 9999

ENV TZ=Etc/UTC \
    APP_USER=appuser

RUN addgroup -S $APP_USER \
    && adduser -S -g $APP_USER $APP_USER

RUN apk update \
    && apk add --no-cache ca-certificates tzdata \
    && rm -rf /var/cache/apk/*

COPY --from=builder /codex-code-translation/target/x86_64-unknown-linux-musl/release/codex-code-translation ${APP}/codex-code-translation

RUN chown -R $APP_USER:$APP_USER ${APP}

USER $APP_USER
WORKDIR ${APP}

CMD ["./codex-code-translation"]