# tonic-web demo

A small application with a [React] front-end talking to a [Tonic] back-end through the grpc-web protocol.

The widgets in the React app synchronize their state through a grpc-web stream. For example, a 'create' action does
not return the created item. Rather, the method handler 'emits' an event that is sent to all subscribers. It is 
easier to see this by opening another browser tab.

It is probably not a good idea to use a long-lived stream like this in a production application though.

[React]: https://reactjs.org
[grpc-web]: https://www.npmjs.com/package/grpc-web
[Tonic]: https://crates.io/crates/tonic


## Running the server

    cd server
    cargo run

## Running the client

The client is a vanilla React application, generated with create-react-app, so you'll need node and `npm` or `yarn`

    cd client
    yarn
    yarn start

## TLS and ALPN

If the tonic server is configured to use TLS, there is no need to accept HTTP/1.1 connections. Stop the tonic server
and the React app, then start them again:

    cd server && cargo run -- --use_tls
    cd client && REACT_APP_BACKEND_SCHEME=https yarn start
    
If you inspect the network tab, you'll see the OPTIONS and POST requests to the tonic server will use the h2 protocol.
    
The server uses a self signed certificate, so your browser may refuse to connect. You can either bypass the browser
warning if prompted, or create your own certificates with [mkcert], for example.

    cd server/data
    mkcert -install
    mkcert localhost
    
This will create a local CA your browser will trust.

[mkcert]: https://github.com/FiloSottile/mkcert