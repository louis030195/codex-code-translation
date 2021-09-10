import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';
import * as products_pb from './products_pb';


export class Event extends jspb.Message {
  getId(): string;
  setId(value: string): Event;

  getAction(): Action;
  setAction(value: Action): Event;

  getProductId(): string;
  setProductId(value: string): Event;

  getProduct(): products_pb.Product | undefined;
  setProduct(value?: products_pb.Product): Event;
  hasProduct(): boolean;
  clearProduct(): Event;

  getUser(): string;
  setUser(value: string): Event;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): Event;
  hasCreateTime(): boolean;
  clearCreateTime(): Event;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Event.AsObject;
  static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
  static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Event;
  static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
}

export namespace Event {
  export type AsObject = {
    id: string,
    action: Action,
    productId: string,
    product?: products_pb.Product.AsObject,
    user: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class SubscribeRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubscribeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SubscribeRequest): SubscribeRequest.AsObject;
  static serializeBinaryToWriter(message: SubscribeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubscribeRequest;
  static deserializeBinaryFromReader(message: SubscribeRequest, reader: jspb.BinaryReader): SubscribeRequest;
}

export namespace SubscribeRequest {
  export type AsObject = {
  }
}

export enum Action { 
  UNKNOWN = 0,
  CREATED = 1,
  DELETED = 2,
}
