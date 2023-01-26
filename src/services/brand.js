import instance from './axios';

export const search = async (data) => (await instance.post('/brand/search', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/brand/getById/' + id)).data;

export const getByPath = async (path) => (await instance.get('/brand/getByPath/' + path)).data;

export const remove = async (data) => (await instance.post('/brand/delete', {
  ...data
}));

export const update = async (data) => (await instance.post('/brand/update', {
  ...data
}));

export const create = async (data) => (await instance.post('/brand/create', {
  ...data
}));
