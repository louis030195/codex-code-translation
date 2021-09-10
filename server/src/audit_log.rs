use std::pin::Pin;

use tokio::sync::broadcast;
use tokio_stream::wrappers::BroadcastStream;
use tokio_stream::Stream;
use tonic::{Request, Response, Status};

use crate::pb::audit_log_service_server::{AuditLogService, AuditLogServiceServer};
use crate::pb::{Event, SubscribeRequest};
use futures_util::TryStreamExt;
use tokio_stream::wrappers::errors::BroadcastStreamRecvError;

pub struct AuditLog {
    sender: broadcast::Sender<Event>,
}

#[tonic::async_trait]
impl AuditLogService for AuditLog {
    type SubscribeStream = Pin<Box<dyn Stream<Item = Result<Event, Status>> + Sync + Send>>;

    async fn subscribe(
        &self,
        _req: Request<SubscribeRequest>,
    ) -> Result<Response<Self::SubscribeStream>, Status> {
        let stream = BroadcastStream::new(self.sender.subscribe()).map_err(internal_error);

        Ok(Response::new(Box::pin(stream)))
    }
}

fn internal_error(e: BroadcastStreamRecvError) -> Status {
    Status::internal(format!("{:?}", e))
}

pub fn service(sender: broadcast::Sender<Event>) -> AuditLogServiceServer<AuditLog> {
    AuditLogServiceServer::new(AuditLog { sender })
}
