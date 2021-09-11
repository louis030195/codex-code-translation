use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use std::time::SystemTime;

use prost_types::Timestamp;
use tokio::sync::mpsc;
use tonic::{Request, Response, Status};
use uuid::Uuid;

use crate::pb::code_translation_service_server::{CodeTranslationService, CodeTranslationServiceServer};
use crate::pb::{
    TranslateCodeRequest, TranslateCodeResponse,
    Translation,
};

use crate::openai::{complete, build_prompt};

#[derive(Debug, Clone)]
pub enum TranslationEvent {
    Translated(Translation),
}

pub struct Translations {
    db: Arc<Mutex<HashMap<Uuid, Translation>>>,
    tx: mpsc::Sender<TranslationEvent>,
}

impl Translations {
    fn new(tx: mpsc::Sender<TranslationEvent>) -> Self {
        Translations {
            db: Arc::new(Mutex::new(HashMap::new())),
            tx,
        }
    }

    async fn emit(&self, event: TranslationEvent) {
        let tx = self.tx.clone();
        tx.send(event).await.unwrap();
    }

    async fn translate(&self, translation: Option<Translation>) -> Result<Translation, Status> {
        match translation {
            Some(mut translation) => {
                if translation.input_code.trim().is_empty() {
                    return Err(Status::invalid_argument("input_code is required"));
                }
                if translation.input_language.trim().is_empty() {
                    return Err(Status::invalid_argument("input_language is required"));
                }
                if translation.output_language.trim().is_empty() {
                    return Err(Status::invalid_argument("output_language is required"));
                }

                let id = Uuid::new_v4();
                translation.id = id.to_string();
                translation.created_at = Some(Timestamp::from(SystemTime::now()));

                let mut t = translation.clone();
                let prompt = build_prompt(
                    translation.input_code,
                    translation.input_language,
                    translation.output_language,
                );
                println!("going to call openai api with prompt: {}", prompt);
                let output_code = complete(prompt).await;
                println!("output_code: {:?}", output_code);

                t.output_code = output_code.unwrap_or_default();
                let t2 = t.clone();

                let mut db = self.db.lock().unwrap();
                db.insert(id, t);

                Ok(t2)
            }
            None => Err(Status::invalid_argument("translation required")),
        }
    }
}

#[tonic::async_trait]
impl CodeTranslationService for Translations {

    async fn translate_code(
        &self,
        req: Request<TranslateCodeRequest>,
    ) -> Result<Response<TranslateCodeResponse>, Status> {
        let translation = self.translate(req.into_inner().translation).await?;
        let t = translation.clone();

        self.emit(TranslationEvent::Translated(translation)).await;

        Ok(Response::new(TranslateCodeResponse {
            translation: Some(t),
        }))
    }
}

pub fn service(tx: mpsc::Sender<TranslationEvent>) -> CodeTranslationServiceServer<Translations> {
    CodeTranslationServiceServer::new(Translations::new(tx))
}
