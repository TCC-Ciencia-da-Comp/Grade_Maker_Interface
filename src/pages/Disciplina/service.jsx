export const getDisciplina = async () => {
    try {
      const resposta = await fetch("http://localhost:8080/api/disciplina");
      if (!resposta.ok) {
        throw new Error(`HTTP error! status: ${resposta.status}`);
      }
      const dadosJson = await resposta.json();
      if (Array.isArray(dadosJson)) {
        return dadosJson;
      } else if (typeof dadosJson === "object" && dadosJson !== null) {
        const arrayDisciplinas = Object.values(dadosJson).find(Array.isArray);
        if (arrayDisciplinas) {
          return arrayDisciplinas;
        } else {
          throw new Error(
            "Não foi possível encontrar um array de disciplinas nos dados"
          );
        }
      } else {
        throw new Error("Formato de dados inesperado");
      }
    } catch (erro) {
      console.error("Erro ao buscar as disciplinas:", erro);
    }
  };
  

export const postDisciplina = async (objectDisciplina) => {
  try {
    const resposta = await fetch("http://localhost:8080/api/disciplina", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectDisciplina),
    });

    if (!resposta.ok) {
      throw new Error(`HTTP error! status: ${resposta.status}`);
    }

    const dadosJson = await resposta.json();
    return dadosJson;
  } catch (erro) {
    console.error("Erro ao inserir o Disciplina", erro);
    setErro(erro.message);
  }
};

export const updateDisciplina = async (id, objectDisciplina) => {
  try {
    const resposta = await fetch(`http://localhost:8080/api/disciplina/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectDisciplina),
    });
    if (!resposta.ok) {
      throw new Error(`HTTP error! status: ${resposta.status}`);
    }
    const dadosJson = await resposta.json();
    return dadosJson;
  } catch (erro) {
    console.error("Erro ao atualizar disciplina: ", erro);
  }
};


export const deleteDisciplina = async (id) => {
    try {
        const resposta = await fetch(`http://localhost:8080/api/disciplina/${id}`, {
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
        console.error("Erro ao excluir  disciplina");
      }
};
