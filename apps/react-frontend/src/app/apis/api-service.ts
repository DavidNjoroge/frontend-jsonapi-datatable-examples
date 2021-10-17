import request from "./request";


function get(id: any) {
  return request({
    url:    `/message/${id}`,
    method: 'GET'
  });
}

function create({subject, content}: any): Promise<any> {
  return request({
    url:    '/message/create',
    method: 'POST',
    data:   {
      subject,
      content
    }
  });
}

function fetchFixtures(): Promise<any> {
  return request({
    url:    '/api/fixtures',
    method: 'GET',
  });
}

const ApiService = {
  get, create, fetchFixtures
}

export default ApiService;
