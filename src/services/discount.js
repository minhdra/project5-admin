import instance from './axios';

export const search = async (data) => (await instance.post('/discount/search', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/discount/getById/' + id)).data;

export const remove = async (data) => (await instance.post('/discount/delete', {
  ...data
}));

export const update = async (data) => (await instance.post('/discount/update', {
  ...data
}));

export const create = async (data) => (await instance.post('/discount/create', {
  ...data
}));
