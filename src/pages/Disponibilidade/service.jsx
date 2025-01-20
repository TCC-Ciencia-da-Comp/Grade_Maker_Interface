import Api from "../../service/Api";

export const getDias = async () => {
  try {
    const resposta = await Api.get("/dia_semana");

    // Verifica se a resposta possui a estrutura esperada
    if (resposta && resposta.data) {
      return resposta; // Retorna os dados corretamente
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar os dias da semana:", erro.message);
    throw erro; // Repropaga o erro para ser tratado em outro lugar
  }
};

export const getTurnos = async () => {
  try {
    const resposta = await Api.get("/turno");
    return resposta;
  } catch (erro) {
    console.error("Erro ao buscar os Turnos", erro);
  }
};

export const getDispProf = async (id) => {
  try {
    const resposta = await Api.get(`/disponibilidade/professor/${id}`);
    if (resposta) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar Disponibilidade", erro);
  }
};

export const deleteteByIdProf = async (id) => {
  try {
    const resposta = await Api.delete(`disponibilidade/professor/${id}`);
    return true;
  } catch (erro) {
    console.error("Erro ao deletar disponibilidade", erro);
  }
};

export const getCursos = async () => {
  try {
    const resposta = await Api.get("/curso");
    if (resposta) {
      return resposta;
    } else {
      throw new Error("Nada retornado");
    }
  } catch (erro) {
    console.error("Erro ao buscar os Cursos", erro);
  }
};

export const insertListaDisponibilidade = async (payload) => {
  try {
    const resposta = await Api.post("/disponibilidade/lista", payload);
  
    return resposta;
  } catch (erro) {
    console.error("Erro ao inserir as disponibilidades", erro);
  }
};

export const deleteteByIdProfessorAnoSemestre = async (
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
    return await resposta;
  } catch (error) {
    console.log("Erro ao deletar disponibilidade: \n" + error);
  }
};
