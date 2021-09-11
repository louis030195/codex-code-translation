use tokio::sync::{mpsc};
use tonic::transport::{Server};
use tracing::{info};
use std::env;

use crate::translations::TranslationEvent;

mod translations;
mod pb;
mod openai;

pub async fn run() -> Result<(), Box<dyn std::error::Error>> {
    env::var("OPENAI_KEY").expect("OPENAI_KEY must be set");
    env::var("OPENAI_ORG").expect("OPENAI_ORG must be set");
    let (tx, mut rx) = mpsc::channel::<TranslationEvent>(2);

    tokio::spawn(async move {
        while let Some(evt) = rx.recv().await {
            match evt {
                TranslationEvent::Translated(translation) => {
                    Some(translation);
                }
            }
        }
    });

    // TODO: should be configurable?
    let addr = ([0, 0, 0, 0], 9999).into();

    // TODO: should be configurable? Should let in production?
    let config = tonic_web::config().allow_all_origins();
    let translations = config.enable(translations::service(tx));

    let mut builder = Server::builder()
        .concurrency_limit_per_connection(32);

    info!("listening on {}", addr);

    builder
        .add_service(translations)
        .serve(addr)
        .await
        .map_err(Into::into)
}
