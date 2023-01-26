import instance from './axios';

export const search = async (data) => (await instance.post('/category/search', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/category/getById/' + id)).data;

export const remove = async (data) => (await instance.post('/category/delete', {
  ...data
}));

export const update = async (data) => (await instance.post('/category/update', {
  ...data
}));

export const create = async (data) => (await instance.post('/category/create', {
  ...data
}));
