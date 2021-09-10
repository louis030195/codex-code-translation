/**
 * @fileoverview gRPC-Web generated client stub for products
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as products_pb from './products_pb';


export class ProductServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoListProducts = new grpcWeb.AbstractClientBase.MethodInfo(
    products_pb.ListProductsResponse,
    (request: products_pb.ListProductsRequest) => {
      return request.serializeBinary();
    },
    products_pb.ListProductsResponse.deserializeBinary
  );

  listProducts(
    request: products_pb.ListProductsRequest,
    metadata: grpcWeb.Metadata | null): Promise<products_pb.ListProductsResponse>;

  listProducts(
    request: products_pb.ListProductsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: products_pb.ListProductsResponse) => void): grpcWeb.ClientReadableStream<products_pb.ListProductsResponse>;

  listProducts(
    request: products_pb.ListProductsRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: products_pb.ListProductsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/products.ProductService/ListProducts',
        request,
        metadata || {},
        this.methodInfoListProducts,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/products.ProductService/ListProducts',
    request,
    metadata || {},
    this.methodInfoListProducts);
  }

  methodInfoCreateProduct = new grpcWeb.AbstractClientBase.MethodInfo(
    products_pb.Empty,
    (request: products_pb.CreateProductRequest) => {
      return request.serializeBinary();
    },
    products_pb.Empty.deserializeBinary
  );

  createProduct(
    request: products_pb.CreateProductRequest,
    metadata: grpcWeb.Metadata | null): Promise<products_pb.Empty>;

  createProduct(
    request: products_pb.CreateProductRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: products_pb.Empty) => void): grpcWeb.ClientReadableStream<products_pb.Empty>;

  createProduct(
    request: products_pb.CreateProductRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: products_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/products.ProductService/CreateProduct',
        request,
        metadata || {},
        this.methodInfoCreateProduct,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/products.ProductService/CreateProduct',
    request,
    metadata || {},
    this.methodInfoCreateProduct);
  }

  methodInfoDeleteProduct = new grpcWeb.AbstractClientBase.MethodInfo(
    products_pb.Empty,
    (request: products_pb.DeleteProductRequest) => {
      return request.serializeBinary();
    },
    products_pb.Empty.deserializeBinary
  );

  deleteProduct(
    request: products_pb.DeleteProductRequest,
    metadata: grpcWeb.Metadata | null): Promise<products_pb.Empty>;

  deleteProduct(
    request: products_pb.DeleteProductRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: products_pb.Empty) => void): grpcWeb.ClientReadableStream<products_pb.Empty>;

  deleteProduct(
    request: products_pb.DeleteProductRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: products_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/products.ProductService/DeleteProduct',
        request,
        metadata || {},
        this.methodInfoDeleteProduct,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/products.ProductService/DeleteProduct',
    request,
    metadata || {},
    this.methodInfoDeleteProduct);
  }

}

