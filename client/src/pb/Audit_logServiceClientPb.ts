/**
 * @fileoverview gRPC-Web generated client stub for products
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as audit_log_pb from './audit_log_pb';


export class AuditLogServiceClient {
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

  methodInfoSubscribe = new grpcWeb.AbstractClientBase.MethodInfo(
    audit_log_pb.Event,
    (request: audit_log_pb.SubscribeRequest) => {
      return request.serializeBinary();
    },
    audit_log_pb.Event.deserializeBinary
  );

  subscribe(
    request: audit_log_pb.SubscribeRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/products.AuditLogService/Subscribe',
      request,
      metadata || {},
      this.methodInfoSubscribe);
  }

}

