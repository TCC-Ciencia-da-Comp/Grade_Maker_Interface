import Api from "./Api";

export const getProfessor = async () => {
  try {
    const resposta = await Api.get("/professor");
    if (resposta.data && Array.isArray(resposta.data)) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar os professores:", erro.message);
    throw erro;
  }
};

export const getProfessorById = async (id) => {
  try {
    const resposta = await Api.get(`/professor/${id}`);
    if (resposta.data) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar professor:", erro.message);
    throw erro;
  }
};

export const getProfessorOrderByNome = async () => {
  try {
    const resposta = await Api.get("/professor/nome/order");
    if (resposta.data && Array.isArray(resposta.data)) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar os professores:", erro.message);
    throw erro;
  }
};

export const getProfessorByNome = async (nome) => {
  try {
    const resposta = await Api.get(`/professor/nome/${nome}`);
    if (resposta.data) {
      return resposta.data;
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar professor por nome:", erro.message);
    throw erro;
  }
};

export const insertProfessor = async (objectProfessor) => {
  try {
    const resposta = await Api.post("/professor", objectProfessor);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao inserir professor:", erro);
    throw erro;
  }
};

export const updateProfessor = async (id, objectProfessor) => {
  try {
    const resposta = await Api.put(`/professor/${id}`, objectProfessor);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao atualizar professor:", erro);
    throw erro;
  }
};

export const deleteProfessor = async (id) => {
  try {
    const resposta = await Api.delete(`/professor/${id}`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao excluir professor:", erro);
    throw erro;
  }
};

export const getProfessorDisciplina = async () => {
  try {
    const resposta = await fetch("http://localhost:8080/api/professor_diciplina");
   
    if (!resposta.ok) {
      throw new Error(`HTTP error! status: ${resposta.status}`);
    }
    const dadosJson = await resposta.json();
  
    if (Array.isArray(dadosJson)) {
      return dadosJson;
    } else if (typeof dadosJson === "object" && dadosJson !== null) {
      const arrayProfessores = Object.values(dadosJson).find(Array.isArray);
      if (arrayProfessores) {
        return arrayProfessores;
      } else {
        throw new Error(
          "Não foi possível encontrar um array de professores nos dados"
        );
      }
    } else {
      throw new Error("Formato de dados inesperado");
    }
  } catch (erro) {
    console.error("Erro ao buscar os professores:", erro);
  }
};