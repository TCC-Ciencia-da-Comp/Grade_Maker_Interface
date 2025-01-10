export const getDias = async () => {
  const fetchDias = async () => {
    try {
      const resposta = await fetch("http://localhost:8080/api/dia_semana");
      if (!resposta.ok) {
        throw new Error(`HTTP error! status: ${resposta.status}`);
      }
      const dadosJson = await resposta.json();
      if (dadosJson) {
        return dadosJson;
      } else {
        throw new Error("Formato de dados inesperado");
      }
    } catch (erro) {
      console.error("Erro ao buscar os dias da semana", erro);
      setErro(erro.message);
    }
  };

  return await fetchDias();
};

export const getTurnos = async () => {
  try {
    const resposta = await fetch("http://localhost:8080/api/turno");
    if (!resposta.ok) {
      throw new Error(`HTTP error! status: ${resposta.status}`);
    }
    const dadosJson = await resposta.json();
    if (dadosJson) {
      return dadosJson;	verificarIdProf(professorId);
    } else {
      throw new Error("Nada retornado");
    }
  } catch (erro) {
    console.error("Erro ao buscar os Turnos", erro);
    setErro(erro.message);
  }
};

export const insertDisponibilidade = async (objectDisponibilidade) => {
  try {
    const resposta = await fetch("http://localhost:8080/api/disponibilidade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectDisponibilidade),
    });

    if (!resposta.ok) {
      throw new Error(`HTTP error! status: ${resposta.status}`);
    }

    const dadosJson = await resposta.json();
    return dadosJson;
  } catch (erro) {
    console.error("Erro ao inserir os Turnos", erro);
    setErro(erro.message);
  }
};

export const getDispProf = async (id) => {
  const fetchDias = async (id) => {
    try {
      const resposta = await fetch(
        `http://localhost:8080/api/disponibilidade/professor/${id}`
      );
      if (!resposta.ok) {
        throw new Error(`HTTP error! status: ${resposta.status}`);
      }
      const dadosJson = await resposta.json();
      if (dadosJson) { 
        
        return dadosJson.data;
      } else {
        throw new Error("Formato de dados inesperado");
      }
    } catch (erro) {
      console.error("Erro ao buscar Disponibilidade", erro);
      setErro(erro.message);
    }
  };

  return await fetchDias(id);
};

export const deleteteByIdProf = async (id) => {
  const fetchDias = async (id) => {
    try {
      const resposta = await fetch(
        `http://localhost:8080/api/disponibilidade/professor/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!resposta.ok) {
        throw new Error(`HTTP error! status: ${resposta.status}`);
      }
      return true;
    } catch (erro) {
      console.error("Erro ao deletar disponibilidade", erro);
      setErro(erro.message);
    }
  };

  return await fetchDias(id);
};

export const getCursos = async ()=>{
  try {
    const resposta = await fetch("http://localhost:8080/api/curso");
    if (!resposta.ok) {
      throw new Error(`HTTP error! status: ${resposta.status}`);
    }
    const dadosJson = await resposta.json();
    if (dadosJson) {
      return dadosJson;
    } else {
      throw new Error("Nada retornado");
    }
  } catch (erro) {
    console.error("Erro ao buscar os Turnos", erro);
    setErro(erro.message);
  }
}

export const insertListaDisponibilidade = async (payload) =>{
  try {
    const resposta = await fetch("http://localhost:8080/api/disponibilidade/lista", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!resposta.ok) {
      throw new Error(`HTTP error! status: ${resposta.status}`);
    }

    const dadosJson = await resposta.json();
    return dadosJson;
  } catch (erro) {
    console.error("Erro ao inserir os Turnos", erro);
    setErro(erro.message);
  }
}

export const deleteteByIdProfessorAnoSemestre = async(idProfessor, ano, semestre)=>{
try{
  const queryParams = new URLSearchParams({
    idProfessor: idProfessor,
    ano: ano,
    semestre: semestre
  })
  const url = `http://localhost:8080/api/disponibilidade/professor?${queryParams.toString()}`
  const resposta = await fetch(url, {
    method: 'DELETE'
  });
  if(!resposta.ok){
    console.log('erro ao deletar disponibilidades')
  }
  return await resposta.json();
}catch(error){
  console.log("Erro ao deletar disponibilidade: \n" + error)
}
}