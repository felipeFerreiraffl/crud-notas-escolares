import api, { initApi } from '../../utils/api';

export const getAll = async (endpoint) => {
    const response = await api.get(`/${endpoint}`);
    return response.data;
}

export const getById = async (id, endpoint) => {
    const response = await api.get(`/${endpoint}/${id}`);
    return response.data;
}

export const createObj = async (endpoint, obj) => {
    const response = await api.post(`/${endpoint}`, obj);
    return response.data;
}

export const updateObj = async (id, endpoint, obj) => {
    const response = await api.put(`/${endpoint}/${id}`, obj);
    return response.data;
}

export const deleteObj = async (id, endpoint) => {
    const response = await api.delete(`/${endpoint}/${id}`);
    return response.data;
}