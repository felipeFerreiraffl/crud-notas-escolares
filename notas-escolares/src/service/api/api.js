import api, { initApi } from '../../utils/api';

// Utiliza endpoints dinâmicos para referenciar em arquivos específicos

// GET
export const getAll = async (endpoint) => {
    const response = await api.get(`/${endpoint}`);
    return response.data;
}

// GET {id}
export const getById = async (id, endpoint) => {
    const response = await api.get(`/${endpoint}/${id}`);
    return response.data;
}

// POST
export const createObj = async (endpoint, obj) => {
    const response = await api.post(`/${endpoint}`, obj);
    return response.data;
}

// UPDATE
export const updateObj = async (id, endpoint, obj) => {
    const response = await api.put(`/${endpoint}/${id}`, obj);
    return response.data;
}

// DELETE
export const deleteObj = async (id, endpoint) => {
    const response = await api.delete(`/${endpoint}/${id}`);
    return response.data;
}

// Específico para pegar as notas de um aluno
export const getNotaByAluno = async (alunoId) => {
    const response = await api.get(`/nota/todas/aluno?alunoId=${alunoId}`);
    return response.data;
}

// Específico para pegar as notas por disciplina
export const getNotaByDisciplina = async (disciplinaId) => {
    const response = await api.get(`/nota/disciplina?discId=${disciplinaId}`);
    return response.data;
}

export const getDisciplinaByProfId = async (profId) => {
    const response = await api.get(`/disciplina/professor?profId=${profId}`);
    return response.data;
}