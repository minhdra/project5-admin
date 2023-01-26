import instance from './axios';

export const search = async (data) => (await instance.post('/collection/search', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/collection/getById/' + id)).data;

export const getByPath = async (id) => (await instance.get('/collection/getByPath/' + id)).data;

export const remove = async (data) => (await instance.post('/collection/delete', {
  ...data
}));

export const update = async (data) => (await instance.post('/collection/update', {
  ...data
}));

export const create = async (data) => (await instance.post('/collection/create', {
  ...data
}));
