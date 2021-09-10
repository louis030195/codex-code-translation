use std::collections::HashMap;
use std::convert::TryFrom;
use std::sync::{Arc, Mutex};
use std::time::SystemTime;

use prost_types::Timestamp;
use tokio::sync::mpsc;
use tonic::metadata::MetadataMap;
use tonic::{Request, Response, Status};
use uuid::Uuid;

use crate::pb::product_service_server::{ProductService, ProductServiceServer};
use crate::pb::{
    CreateProductRequest, DeleteProductRequest, Empty, ListProductsRequest, ListProductsResponse,
    Product,
};

type User = String;

#[derive(Debug, Clone)]
pub enum ProductEvent {
    Created(Product, User),
    Deleted(Uuid, User),
}

pub struct Products {
    db: Arc<Mutex<HashMap<Uuid, Product>>>,
    tx: mpsc::Sender<ProductEvent>,
}

impl Products {
    fn new(tx: mpsc::Sender<ProductEvent>) -> Self {
        Products {
            db: Arc::new(Mutex::new(HashMap::new())),
            tx,
        }
    }

    async fn emit(&self, event: ProductEvent) {
        let tx = self.tx.clone();
        tx.send(event).await.unwrap();
    }

    fn create(&self, product: Option<Product>) -> Result<Product, Status> {
        match product {
            Some(mut product) => {
                if product.name.trim().is_empty() {
                    return Err(Status::invalid_argument("name required"));
                }

                let id = Uuid::new_v4();
                product.id = id.to_string();
                product.create_time = Some(Timestamp::from(SystemTime::now()));

                let mut db = self.db.lock().unwrap();
                db.insert(id, product.clone());

                Ok(product)
            }
            None => Err(Status::invalid_argument("product required")),
        }
    }

    fn delete(&self, id: Uuid) {
        let mut db = self.db.lock().unwrap();
        db.remove(&id);
    }

    fn list(&self) -> Vec<Product> {
        let db = self.db.lock().unwrap();
        let mut products = db.values().cloned().collect::<Vec<_>>();

        products.sort_by(|a, b| {
            let t1 = SystemTime::try_from(a.create_time.clone().unwrap()).unwrap();
            let t2 = SystemTime::try_from(b.create_time.clone().unwrap()).unwrap();
            t2.cmp(&t1)
        });

        products
    }

    fn get_user(&self, metadata: &MetadataMap) -> Result<User, Status> {
        metadata
            .get("custom-header-1")
            .map(|value| value.to_str().unwrap().to_owned())
            .and_then(|u| if u.is_empty() { None } else { Some(u) })
            .ok_or_else(|| Status::unauthenticated("login required"))
    }
}

#[tonic::async_trait]
impl ProductService for Products {
    async fn list_products(
        &self,
        _req: Request<ListProductsRequest>,
    ) -> Result<Response<ListProductsResponse>, Status> {
        Ok(Response::new(ListProductsResponse {
            products: self.list(),
        }))
    }

    async fn create_product(
        &self,
        req: Request<CreateProductRequest>,
    ) -> Result<Response<Empty>, Status> {
        let user = self.get_user(req.metadata())?;
        let product = self.create(req.into_inner().product)?;

        self.emit(ProductEvent::Created(product, user)).await;

        Ok(Response::new(Empty {}))
    }

    async fn delete_product(
        &self,
        req: Request<DeleteProductRequest>,
    ) -> Result<Response<Empty>, Status> {
        let user = self.get_user(req.metadata())?;
        let id = Uuid::parse_str(&req.get_ref().id)
            .map_err(|_| Status::invalid_argument("invalid id"))?;

        self.delete(id);
        self.emit(ProductEvent::Deleted(id, user)).await;

        Ok(Response::new(Empty {}))
    }
}

pub fn service(tx: mpsc::Sender<ProductEvent>) -> ProductServiceServer<Products> {
    ProductServiceServer::new(Products::new(tx))
}
