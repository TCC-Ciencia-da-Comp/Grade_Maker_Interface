//Get de Curso ===========
export const getCurso = async () => {
    try {
      const resposta = await fetch("http://localhost:8080/api/curso");
      if (!resposta.ok) {
        throw new Error(`HTTP error! status: ${resposta.status}`);
      }
      const dadosJson = await resposta.json();
      if (Array.isArray(dadosJson)) {
        return dadosJson;
      } else if (typeof dadosJson === "object" && dadosJson !== null) {
        const arrayCursos = Object.values(dadosJson).find(Array.isArray);
        if (arrayCursos) {
          return arrayCursos;
        } else {
          throw new Error(
            "Não foi possível encontrar um array de cursos nos dados"
          );
        }
      } else {
        throw new Error("Formato de dados inesperado");
      }
    } catch (erro) {
      console.error("Erro ao buscar os cursos:", erro);
    }
  };
  

//Insert de curso ============
export const postCurso = async (objectCurso) => {
  try {
    const resposta = await fetch("http://localhost:8080/api/curso", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectCurso),
    });

    if (!resposta.ok) {
      throw new Error(`HTTP error! status: ${resposta.status}`);
    }

    const dadosJson = await resposta.json();
    return dadosJson;
  } catch (erro) {
    console.error("Erro ao inserir o Curso", erro);
    setErro(erro.message);
  }
};

//Update de curso ==============
export const updateCurso = async (id, objectCurso) => {
  try {
    const resposta = await fetch(`http://localhost:8080/api/curso/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectCurso),
    });
    if (!resposta.ok) {
        throw new Error(`HTTP error! status: ${resposta.status}`);
    }
    const dadosJson = await resposta.json();
    return dadosJson;
  } catch (erro) {
    console.error("Erro ao atualizar Curso: ", erro);
  }
};

//Delete de Curso =================
export const deleteCurso = async (id) => {
    try {
        const resposta = await fetch(`http://localhost:8080/api/curso/${id}`, {
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
        console.error("Erro ao excluir  Curso");
      }
}


