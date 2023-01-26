import instance from './axios';

export const search = async (data) => (await instance.post('/service/search', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/service/' + id)).data;

export const remove = async (data) => (await instance.post('/service/delete', {
  ...data
}));

export const update = async (data) => (await instance.post('/service/update', {
  ...data
}));

export const create = async (data) => (await instance.post('/service/create', {
  ...data
}));
