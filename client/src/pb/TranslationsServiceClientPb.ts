/**
 * @fileoverview gRPC-Web generated client stub for translations
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as translations_pb from './translations_pb';


export class CodeTranslationServiceClient {
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

  methodInfoTranslateCode = new grpcWeb.AbstractClientBase.MethodInfo(
    translations_pb.TranslateCodeResponse,
    (request: translations_pb.TranslateCodeRequest) => {
      return request.serializeBinary();
    },
    translations_pb.TranslateCodeResponse.deserializeBinary
  );

  translateCode(
    request: translations_pb.TranslateCodeRequest,
    metadata: grpcWeb.Metadata | null): Promise<translations_pb.TranslateCodeResponse>;

  translateCode(
    request: translations_pb.TranslateCodeRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: translations_pb.TranslateCodeResponse) => void): grpcWeb.ClientReadableStream<translations_pb.TranslateCodeResponse>;

  translateCode(
    request: translations_pb.TranslateCodeRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: translations_pb.TranslateCodeResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/translations.CodeTranslationService/TranslateCode',
        request,
        metadata || {},
        this.methodInfoTranslateCode,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/translations.CodeTranslationService/TranslateCode',
    request,
    metadata || {},
    this.methodInfoTranslateCode);
  }

}

