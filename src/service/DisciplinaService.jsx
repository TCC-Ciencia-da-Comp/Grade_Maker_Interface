import Api from "./Api";

export const getDisciplina = async (id) => {
  try {
    if (id) {
      return await getDisciplinaById(id);
    }
    const resposta = await Api.get("/disciplina");
    if (resposta.data && Array.isArray(resposta.data)) {
      return resposta.data;
    }
    throw new Error("Formato de dados inesperado");
  } catch (erro) {
    console.error("Erro ao buscar as disciplinas:", erro.message);
    throw erro;
  }
};

export const getDisciplinaByNome = async (nome) => {
  try {
    const resposta = await Api.get(`/disciplina/nome/${nome}`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao buscar disciplina por nome:", erro.message);
    throw erro;
  }
};

export const getDisciplinaOrderByNome = async () => {
  try {
    const resposta = await Api.get("/disciplina/nome/order");
    if (resposta.data && Array.isArray(resposta.data)) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar as disciplinas:", erro.message);
    throw erro;
  }
};

export const insertDisciplina = async (objectDisciplina) => {
  try {
    const resposta = await Api.post("/disciplina", objectDisciplina);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao inserir disciplina:", erro);
    throw erro;
  }
};

export const updateDisciplina = async (id, objectDisciplina) => {
  try {
    const resposta = await Api.put(`/disciplina/${id}`, objectDisciplina);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao atualizar disciplina:", erro);
    throw erro;
  }
};

export const deleteDisciplina = async (id) => {
  try {
    const resposta = await Api.delete(`/disciplina/${id}`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao excluir disciplina:", erro);
    throw erro;
  }
};

export const deleteAllDisciplina = async () => {
  try {
    const resposta = await Api.delete(`/disciplina`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao excluir disciplina:", erro);
    throw erro;
  }
};

export const getProfessorDisciplina = async (id) => {
  try {
    const resposta = await Api.get(`/professor-disciplina/${id}`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao buscar professor disciplina:", erro);
    throw erro;
  }
};

export const insertDisciplinaCurso = async (objectDisciplinaCurso) => {
  try {
    const resposta = await Api.post(`/disciplina-curso`, objectDisciplinaCurso);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao inserir disciplina curso:", erro);
    throw erro;
  }
};

export const getDisciplinaCursoByDisciplinaId = async (id) => {
  try {
    const resposta = await Api.get(`/disciplina-curso/disciplina/${id}`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao buscar disciplina-curso:", erro);
    throw erro;
  }
};

export const getDisciplinaById = async (id) => {
  try {
    if (!id || isNaN(id)) {
      throw new Error("ID inválido ou não fornecido");
    }
    
    const resposta = await Api.get(`/disciplina/${id}`);
    if (resposta.data) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error(`Erro ao buscar disciplina ${id}:`, erro.message);
    throw erro;
  }
};
