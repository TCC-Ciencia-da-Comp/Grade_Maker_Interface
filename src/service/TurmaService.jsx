import Api from "./Api";

export const getTurma = async () => {
  try {
    const resposta = await Api.get("/turma");
    if (resposta.data && Array.isArray(resposta.data)) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar as turmas:", erro.message);
    throw erro;
  }
};

export const getTurmaById = async (id) => {
  try {
    const resposta = await Api.get(`/turma/${id}`);
    if (resposta.data) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar turma:", erro.message);
    throw erro;
  }
};

export const getTurmaByNome = async (nome) => {
  try {
    const resposta = await Api.get(`/turma/nome/${nome}`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao buscar turma por nome:", erro.message);
    throw erro;
  }
};

export const getTurmaByCursoId = async (id) => {
  try {
    const resposta = await Api.get(`/turma/curso/${id}`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao buscar turmas por curso:", erro);
    throw erro;
  }
};

export const insertTurma = async (objectTurma) => {
  try {
    const resposta = await Api.post("/turma", objectTurma);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao inserir turma:", erro);
    throw erro;
  }
};

export const updateTurma = async (id, objectTurma) => {
  try {
    const resposta = await Api.put(`/turma/${id}`, objectTurma);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao atualizar turma:", erro);
    throw erro;
  }
};

export const deleteTurma = async (id) => {
  try {
    const resposta = await Api.delete(`/turma/${id}`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao excluir turma:", erro);
    throw erro;
  }
};

export const deleteAllTurma = async () => {
  try {
    const resposta = await Api.delete("/turma");
    return resposta;
  } catch (erro) {
    console.error("Erro ao excluir todas as turmas:", erro);
    throw erro;
  }
};

export const deleteTurmaByCursoId = async (id) => {
  try {
    const resposta = await Api.delete(`/turma/curso/${id}`);
    return resposta;
  } catch (erro) {
    console.error("Erro ao excluir turmas por curso:", erro);
    throw erro;
  }
};

export const deleteAllTurmaByCursoId = async (id) => {
  try {
    const resposta = await Api.delete(`/turma/curso/${id}`);
    return resposta;
  } catch (erro) {
    console.error("Erro ao excluir todas as turmas por curso:", erro);
    throw erro;
  }
};

