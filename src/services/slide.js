import instance from './axios';

export const search = async (data) => (await instance.post('/slide/search', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/slide/' + id)).data;

export const remove = async (data) => (await instance.post('/slide/delete', {
  ...data
}));

export const update = async (data) => (await instance.post('/slide/update', {
  ...data
}));

export const create = async (data) => (await instance.post('/slide/create', {
  ...data
}));
