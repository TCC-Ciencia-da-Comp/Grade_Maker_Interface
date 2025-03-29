import Api from "./Api";

export const getDisponibilidadeProfessor = async (id) => {
  try {
    const resposta = await Api.get(`/disponibilidade/professor/${id}`);
    if (resposta) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar Disponibilidade", erro);
    throw erro;
  }
};

export const deleteByIdProfessor = async (id) => {
  try {
    const resposta = await Api.delete(`disponibilidade/professor/${id}`);
    return true;
  } catch (erro) {
    console.error("Erro ao deletar disponibilidade", erro);
    throw erro;
  }
};

export const insertListaDisponibilidade = async (payload) => {
  try {
    const resposta = await Api.post("/disponibilidade/lista", payload);
    return resposta;
  } catch (erro) {
    console.error("Erro ao inserir as disponibilidades", erro);
    throw erro;
  }
};

export const deleteByIdProfessorAnoSemestre = async (
  idProfessor,
  ano,
  semestre
) => {
  try {
    const queryParams = new URLSearchParams({
      idProfessor: idProfessor,
      ano: ano,
      semestre: semestre,
    });
    const url = `/disponibilidade/professor?${queryParams.toString()}`;
    const resposta = await Api.delete(url);
    return resposta;
  } catch (error) {
    console.error("Erro ao deletar disponibilidade:", error);
    throw error;
  }
};

export const deleteAllDisponibilidade = async () => {
  try {
    const resposta = await Api.delete("/disponibilidade");
    return resposta;
  } catch (erro) {
    console.error("Erro ao excluir todas as disponibilidades:", erro);
    throw erro;
  }
};
