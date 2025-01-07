import Professor from ".";

//get de Professor
export const getProfessor = async () => {
  try {
    const resposta = await fetch("http://localhost:8080/api/professor");
   
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

//get de Professor
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








//insert de Professor ====
export const postProfessor = async (objectProfessor) => {
  try {
    const resposta = await fetch("http://localhost:8080/api/professor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectProfessor),
    });

    if (!resposta.ok) {
      throw new Error(`HTTP error! status: ${resposta.status}`);
    }

    const dadosJson = await resposta.json();
    return dadosJson;
  } catch (erro) {
    console.error("Erro ao inserir  professor", erro);
    setErro(erro.message);
  }
};

export const updateProfessor = async (id, objectProfessor) => {
  try {
    const resposta = await fetch(`http://localhost:8080/api/professor/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectProfessor),
    });
    if (!resposta.ok) {
      throw new Error(`HTTP error! status: ${resposta.status}`);
    }
    const dadosJson = await resposta.json();
    return dadosJson;
  } catch (erro) {
    console.error("Erro ao atualizar Professor: ", erro);
  }
};

export const deleteProfessor = async (id) =>{
    try {
        const resposta = await fetch(`http://localhost:8080/api/professor/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!resposta.ok) {
          throw new Error("HTTP error! status: ", resposta.status);
        }
        const dadosJson = await resposta.json();
        return dadosJson;
      } catch (erro) {
        console.error("Erro ao excluir  professor");
      }

}