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

function fetchFixtures(pageNumber: any, pagesize: any): Promise<JsonapiResponse> {
  return request({
    url:    `/jsonapi/fixtures?include=home.team,away.team&page[number]=${pageNumber}&page[size]=${pagesize}`,
    method: 'GET',
  });
}

const ApiService = {
  get, create, fetchFixtures
}

export default ApiService;
