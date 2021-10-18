export interface JsonapiResponse {
  data: JsonapiModelResponse[];
  included?: JsonapiModelResponse[];
  jsonapi: {version: string};
  links: {self: string};
  meta: {count: number};
}


export interface JsonapiModelResponse {
  attributes: any;
  id: number;
  type: string;
  links: {self: string};
  relationships: any;
}


