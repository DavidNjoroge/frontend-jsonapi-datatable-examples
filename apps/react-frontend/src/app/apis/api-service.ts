import { JsonapiResponse } from "../interfaces/jsonapi-response";
import request from "./request";


function get(id: any) {
  return request({
    url:    `/message/${id}`,
    method: 'GET'
  });
}

function create({subject, content}: any): Promise<any> {
  return request({
    url:    '/jsonapi/fixtures',
    method: 'POST',
    data:   {
      subject,
      content
    }
  });
}

function fetchFixtures(): Promise<JsonapiResponse> {
  return request({
    url:    '/jsonapi/fixtures',
    method: 'GET',
  });
}

const ApiService = {
  get, create, fetchFixtures
}

export default ApiService;
