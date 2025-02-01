import Api from "./Api";

export const getCurso = async () => {
  try {
    const resposta = await Api.get("/curso");
    if (resposta.data && Array.isArray(resposta.data)) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar os cursos:", erro.message);
    throw erro;
  }
};

export const getCursoOrderByNome = async () => {
  try {
    const resposta = await Api.get("/curso/nome/order");
    if (resposta.data && Array.isArray(resposta.data)) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar os cursos:", erro.message);
    throw erro;
  }
};

export const getCursoByNome = async (nome) => {
  try {
    const resposta = await Api.get(`/curso/nome/${nome}`);
    return resposta;
  } catch (erro) {
    console.error("Erro ao buscar curso pelo nome:", erro);
    throw erro;
  }
};

export const insertCurso = async (objectCurso) => {
  try {
    const resposta = await Api.post("/curso", objectCurso);
    return resposta;
  } catch (erro) {
    console.error("Erro ao inserir curso:", erro);
    throw erro;
  }
};

export const updateCurso = async (id, objectCurso) => {
  try {
    const resposta = await Api.put(`/curso/${id}`, objectCurso);
    return resposta;
  } catch (erro) {
    console.error("Erro ao atualizar curso:", erro);
    throw erro;
  }
};

export const deleteCurso = async (id) => {
  try {
    const resposta = await Api.delete(`/curso/${id}`);
    return resposta;
  } catch (erro) {
    console.error("Erro ao excluir curso:", erro);
    throw erro;
  }
};