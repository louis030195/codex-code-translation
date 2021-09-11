#[derive(Clone, PartialEq, ::prost::Message)]
pub struct TranslateCodeRequest {
    #[prost(message, optional, tag = "1")]
    pub translation: ::core::option::Option<Translation>,
}
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct TranslateCodeResponse {
    #[prost(message, optional, tag = "1")]
    pub translation: ::core::option::Option<Translation>,
}
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Translation {
    #[prost(string, tag = "1")]
    pub id: ::prost::alloc::string::String,
    #[prost(message, optional, tag = "2")]
    pub created_at: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(string, tag = "3")]
    pub input_code: ::prost::alloc::string::String,
    #[prost(string, tag = "4")]
    pub output_code: ::prost::alloc::string::String,
    #[prost(string, tag = "5")]
    pub input_language: ::prost::alloc::string::String,
    #[prost(string, tag = "6")]
    pub output_language: ::prost::alloc::string::String,
}
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Empty {}
#[doc = r" Generated server implementations."]
pub mod code_translation_service_server {
    #![allow(unused_variables, dead_code, missing_docs)]
    use tonic::codegen::*;
    #[doc = "Generated trait containing gRPC methods that should be implemented for use with CodeTranslationServiceServer."]
    #[async_trait]
    pub trait CodeTranslationService: Send + Sync + 'static {
        async fn translate_code(
            &self,
            request: tonic::Request<super::TranslateCodeRequest>,
        ) -> Result<tonic::Response<super::TranslateCodeResponse>, tonic::Status>;
    }
    #[derive(Debug)]
    pub struct CodeTranslationServiceServer<T: CodeTranslationService> {
        inner: _Inner<T>,
        accept_compression_encodings: (),
        send_compression_encodings: (),
    }
    struct _Inner<T>(Arc<T>);
    impl<T: CodeTranslationService> CodeTranslationServiceServer<T> {
        pub fn new(inner: T) -> Self {
            let inner = Arc::new(inner);
            let inner = _Inner(inner);
            Self {
                inner,
                accept_compression_encodings: Default::default(),
                send_compression_encodings: Default::default(),
            }
        }
        pub fn with_interceptor<F>(inner: T, interceptor: F) -> InterceptedService<Self, F>
        where
            F: FnMut(tonic::Request<()>) -> Result<tonic::Request<()>, tonic::Status>,
        {
            InterceptedService::new(Self::new(inner), interceptor)
        }
    }
    impl<T, B> Service<http::Request<B>> for CodeTranslationServiceServer<T>
    where
        T: CodeTranslationService,
        B: Body + Send + Sync + 'static,
        B::Error: Into<StdError> + Send + 'static,
    {
        type Response = http::Response<tonic::body::BoxBody>;
        type Error = Never;
        type Future = BoxFuture<Self::Response, Self::Error>;
        fn poll_ready(&mut self, _cx: &mut Context<'_>) -> Poll<Result<(), Self::Error>> {
            Poll::Ready(Ok(()))
        }
        fn call(&mut self, req: http::Request<B>) -> Self::Future {
            let inner = self.inner.clone();
            match req.uri().path() {
                "/translations.CodeTranslationService/TranslateCode" => {
                    #[allow(non_camel_case_types)]
                    struct TranslateCodeSvc<T: CodeTranslationService>(pub Arc<T>);
                    impl<T: CodeTranslationService>
                        tonic::server::UnaryService<super::TranslateCodeRequest>
                        for TranslateCodeSvc<T>
                    {
                        type Response = super::TranslateCodeResponse;
                        type Future = BoxFuture<tonic::Response<Self::Response>, tonic::Status>;
                        fn call(
                            &mut self,
                            request: tonic::Request<super::TranslateCodeRequest>,
                        ) -> Self::Future {
                            let inner = self.0.clone();
                            let fut = async move { (*inner).translate_code(request).await };
                            Box::pin(fut)
                        }
                    }
                    let accept_compression_encodings = self.accept_compression_encodings;
                    let send_compression_encodings = self.send_compression_encodings;
                    let inner = self.inner.clone();
                    let fut = async move {
                        let inner = inner.0;
                        let method = TranslateCodeSvc(inner);
                        let codec = tonic::codec::ProstCodec::default();
                        let mut grpc = tonic::server::Grpc::new(codec).apply_compression_config(
                            accept_compression_encodings,
                            send_compression_encodings,
                        );
                        let res = grpc.unary(method, req).await;
                        Ok(res)
                    };
                    Box::pin(fut)
                }
                _ => Box::pin(async move {
                    Ok(http::Response::builder()
                        .status(200)
                        .header("grpc-status", "12")
                        .header("content-type", "application/grpc")
                        .body(empty_body())
                        .unwrap())
                }),
            }
        }
    }
    impl<T: CodeTranslationService> Clone for CodeTranslationServiceServer<T> {
        fn clone(&self) -> Self {
            let inner = self.inner.clone();
            Self {
                inner,
                accept_compression_encodings: self.accept_compression_encodings,
                send_compression_encodings: self.send_compression_encodings,
            }
        }
    }
    impl<T: CodeTranslationService> Clone for _Inner<T> {
        fn clone(&self) -> Self {
            Self(self.0.clone())
        }
    }
    impl<T: std::fmt::Debug> std::fmt::Debug for _Inner<T> {
        fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
            write!(f, "{:?}", self.0)
        }
    }
    impl<T: CodeTranslationService> tonic::transport::NamedService for CodeTranslationServiceServer<T> {
        const NAME: &'static str = "translations.CodeTranslationService";
    }
}
