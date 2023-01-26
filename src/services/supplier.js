import instance from './axios';

export const search = async (data) => (await instance.post('/supplier/search', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/supplier/getById/' + id)).data;

export const remove = async (data) => (await instance.post('/supplier/delete', {
  ...data
}));

export const update = async (data) => (await instance.post('/supplier/update', {
  ...data
}));

export const create = async (data) => (await instance.post('/supplier/create', {
  ...data
}));
