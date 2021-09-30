import createApiServices from '../createApiServices';

const api = createApiServices();

const GetListBook = () => {
  return api.makeRequest({
    url: `/api/v1/book/list`,
    method: 'GET',
  });
};

const CreateBook = (item: any) => {
  return api.makeRequest({
    url: '/api/v1/book/create',
    method: 'POST',
    data: item,
  });
};

const UpdateBook = (id: any, item: any) => {
  return api.makeRequest({
    url: `/api/v1/book/update/${id}`,
    method: 'PUT',
    data: item,
  });
};

const RemoveBook = (id: any) => {
  return api.makeRequest({
    url: `/api/v1/book/delete/${id}`,
    method: 'DELETE',
  });
};

const GetBook = (id: any) => {
  return api.makeRequest({
    url: `/api/v1/book/${id}`,
    method: 'GET',
  });
};

export const Book = {
  GetBook,
  GetListBook,
  UpdateBook,
  RemoveBook,
  CreateBook,
};
