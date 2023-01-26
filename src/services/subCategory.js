import instance from './axios';

export const search = async (data) => (await instance.post('/sub-category/search', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/sub-category/getById/' + id)).data;

export const getByPath = async (id) => (await instance.get('/sub-category/getByPath/' + id)).data;

export const remove = async (data) => (await instance.post('/sub-category/delete', {
  ...data
}));

export const update = async (data) => (await instance.post('/sub-category/update', {
  ...data
}));

export const create = async (data) => (await instance.post('/sub-category/create', {
  ...data
}));
