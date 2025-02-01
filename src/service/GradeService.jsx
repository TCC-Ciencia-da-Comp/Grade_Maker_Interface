import Api from "./Api";

export const getGrade = async () => {
  try {
    const resposta = await Api.get("/grade");
    if (resposta.data && Array.isArray(resposta.data)) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar as grades:", erro.message);
    throw erro;
  }
};

export const insertGrade = async (objectGrade) => {
  try {
    const resposta = await Api.post("/grade", objectGrade);
    return resposta;
  } catch (erro) {
    console.error("Erro ao inserir grade:", erro);
    throw erro;
  }
};

export const updateGrade = async (id, objectGrade) => {
  try {
    const resposta = await Api.put(`/grade/${id}`, objectGrade);
    return resposta;
  } catch (erro) {
    console.error("Erro ao atualizar grade:", erro);
    throw erro;
  }
};

export const deleteGrade = async (id) => {
  try {
    const resposta = await Api.delete(`/grade/${id}`);
    return resposta;
  } catch (erro) {
    console.error("Erro ao excluir grade:", erro);
    throw erro;
  }
};