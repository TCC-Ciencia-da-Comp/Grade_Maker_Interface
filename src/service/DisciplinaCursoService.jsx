import Api from "./Api";

export const getDisciplinaCurso = async () => {
  try {
    const resposta = await Api.get("/disciplina-curso");
    if (resposta.data && Array.isArray(resposta.data)) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar as disciplinas do curso:", erro.message);
    throw erro;
  }
};

export const getDisciplinaCursoById = async (id) => {
  try {
    const resposta = await Api.get(`/disciplina-curso/${id}`);
    if (resposta.data) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar disciplina do curso:", erro.message);
    throw erro;
  }
};

export const getDisciplinaCursoByDisciplinaId = async (id) => {
  try {
    const resposta = await Api.get(`/disciplina-curso/disciplina/${id}`);
    if (resposta.data) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar disciplinas por ID da disciplina:", erro.message);
    throw erro;
  }
};

export const getDisciplinaCursoByCursoId = async (id) => {
  try {
    const resposta = await Api.get(`/disciplina-curso/curso/${id}`);
    if (resposta.data) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar disciplinas por ID do curso:", erro.message);
    throw erro;
  }
};

export const insertDisciplinaCurso = async (objectDisciplinaCurso) => {
  try {
    const resposta = await Api.post("/disciplina-curso", objectDisciplinaCurso);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao inserir disciplina no curso:", erro);
    throw erro;
  }
};

export const updateDisciplinaCurso = async (id, objectDisciplinaCurso) => {
  try {
    const resposta = await Api.put(`/disciplina-curso/${id}`, objectDisciplinaCurso);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao atualizar disciplina do curso:", erro);
    throw erro;
  }
};

export const deleteDisciplinaCurso = async (id) => {
  try {
    const resposta = await Api.delete(`/disciplina-curso/${id}`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao excluir disciplina do curso:", erro);
    throw erro;
  }
};

export const deleteDisciplinaCursoByCursoId = async (cursoId) => {
  try {
    const response = await Api.delete(`/disciplina-curso/curso/${cursoId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar disciplinas do curso:", error);
    throw error;
  }
};

export const deleteDisciplinaCursoByDisciplinaId = async (disciplinaId) => {
  try {
    const response = await Api.delete(`/disciplina-curso/disciplina/${disciplinaId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar relações da disciplina:", error);
    throw error;
  }
};

export const deleteAllDisciplinaCurso = async () => {
  try {
    const resposta = await Api.delete("/disciplina-curso");
    return resposta;
  } catch (erro) {
    console.error("Erro ao excluir todas as relações disciplina-curso:", erro);
    throw erro;
  }
};

