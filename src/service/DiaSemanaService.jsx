import Api from "./Api";

export const getDiaSemana = async () => {
  try {
    const resposta = await Api.get("/dia-semana");
    return resposta;
  } catch (erro) {
    console.error("Erro ao buscar os dias da semana:", erro.message);
    throw erro;
  }
};

export const getDiaSemanaById = async (id) => {
  try {
    const resposta = await Api.get(`/dia-semana/${id}`);
    return resposta;
  } catch (erro) {
    console.error("Erro ao buscar o dia da semana:", erro);
    throw erro;
  }
};


export const updateDiaSemana = async (id, objectDiaSemana) => {
  try {
    const resposta = await Api.put(`/dia-semana/${id}/status`, objectDiaSemana);
    return resposta;
  } catch (erro) {
    console.error("Erro ao atualizar dia da semana:", erro);
    throw erro;
  }
};
