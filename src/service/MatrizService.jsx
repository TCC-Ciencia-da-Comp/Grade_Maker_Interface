import Api from "./Api";

export const getMatriz = async () => {
  try {
    const resposta = await Api.get("/matriz");
    if (resposta.data && Array.isArray(resposta.data)) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar as matrizes:", erro.message);
    throw erro;
  }
};

export const getMatrizById = async (id) => {
  try {
    const resposta = await Api.get(`/matriz/${id}`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao buscar matriz:", erro);
    throw erro;
  }
};

export const getMatrizByTurmaId = async (id) => {
  try {
    const resposta = await Api.get(`/matriz/turma/${id}`);
    return resposta?.data || [];
  } catch (erro) {
    console.error("Erro ao buscar matriz por turma:", erro);
    throw erro;
  }
};

export const getMatrizByDisciplinaId = async (id) => {
  try {
    const resposta = await Api.get(`/matriz/disciplina/${id}`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao buscar matriz por disciplina:", erro);
    throw erro;
  }
};

export const insertMatriz = async (objectMatriz) => {
  try {
    const resposta = await Api.post("/matriz", objectMatriz);
    return resposta;
  } catch (erro) {
    console.error("Erro ao inserir matriz:", erro);
    throw erro;
  }
};

export const updateMatriz = async (id, objectMatriz) => {
  try {
    const resposta = await Api.put(`/matriz/${id}`, objectMatriz);
    return resposta;
  } catch (erro) {
    console.error("Erro ao atualizar matriz:", erro);
    throw erro;
  }
};

export const deleteMatriz = async (id) => {
  try {
    const resposta = await Api.delete(`/matriz/${id}`);
    return resposta;
  } catch (erro) {
    console.error("Erro ao excluir matriz:", erro);
    throw erro;
  }
};

export const deleteAllMatriz = async () => {
  try {
    const resposta = await Api.delete("/matriz");
    return resposta;
  } catch (erro) {
    console.error("Erro ao excluir todas as matrizes:", erro);
    throw erro;
  }
};

export const deleteMatrizByTurmaId = async (id) => {
  try {
    const resposta = await Api.delete(`/matriz/turma/${id}`);
    return resposta;
  } catch (erro) {
    console.error("Erro ao excluir matriz por turma:", erro);
    throw erro;
  }
};

export const deleteMatrizByDisciplinaId = async (id) => {
  try {
    const resposta = await Api.delete(`/matriz/disciplina/${id}`);
    return resposta;
  } catch (erro) {
    console.error("Erro ao excluir matriz por disciplina:", erro);
    throw erro;
  }
};

export const deleteAllMatrizByTurmaId = async (id) => {
  try {
    const resposta = await Api.delete(`/matriz/turma/${id}`);
    return resposta;
  } catch (erro) {
    console.error("Erro ao excluir todas as matrizes por turma:", erro);
    throw erro;
  }
};