import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class TranslateCodeRequest extends jspb.Message {
  getTranslation(): Translation | undefined;
  setTranslation(value?: Translation): TranslateCodeRequest;
  hasTranslation(): boolean;
  clearTranslation(): TranslateCodeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TranslateCodeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TranslateCodeRequest): TranslateCodeRequest.AsObject;
  static serializeBinaryToWriter(message: TranslateCodeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TranslateCodeRequest;
  static deserializeBinaryFromReader(message: TranslateCodeRequest, reader: jspb.BinaryReader): TranslateCodeRequest;
}

export namespace TranslateCodeRequest {
  export type AsObject = {
    translation?: Translation.AsObject,
  }
}

export class TranslateCodeResponse extends jspb.Message {
  getTranslation(): Translation | undefined;
  setTranslation(value?: Translation): TranslateCodeResponse;
  hasTranslation(): boolean;
  clearTranslation(): TranslateCodeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TranslateCodeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TranslateCodeResponse): TranslateCodeResponse.AsObject;
  static serializeBinaryToWriter(message: TranslateCodeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TranslateCodeResponse;
  static deserializeBinaryFromReader(message: TranslateCodeResponse, reader: jspb.BinaryReader): TranslateCodeResponse;
}

export namespace TranslateCodeResponse {
  export type AsObject = {
    translation?: Translation.AsObject,
  }
}

export class Translation extends jspb.Message {
  getId(): string;
  setId(value: string): Translation;

  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Translation;
  hasCreatedAt(): boolean;
  clearCreatedAt(): Translation;

  getInputCode(): string;
  setInputCode(value: string): Translation;

  getOutputCode(): string;
  setOutputCode(value: string): Translation;

  getInputLanguage(): string;
  setInputLanguage(value: string): Translation;

  getOutputLanguage(): string;
  setOutputLanguage(value: string): Translation;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Translation.AsObject;
  static toObject(includeInstance: boolean, msg: Translation): Translation.AsObject;
  static serializeBinaryToWriter(message: Translation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Translation;
  static deserializeBinaryFromReader(message: Translation, reader: jspb.BinaryReader): Translation;
}

export namespace Translation {
  export type AsObject = {
    id: string,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    inputCode: string,
    outputCode: string,
    inputLanguage: string,
    outputLanguage: string,
  }
}

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

