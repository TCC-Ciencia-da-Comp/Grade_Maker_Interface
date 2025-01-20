import Api from "../../service/Api";

export const getDias = async () => {
  try {
    const resposta = await Api.get('/dia_semana');

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
    s
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
    try {
      const resposta = await Api.get(`/disponibilidade/professor/${id}`
      );
      console.log(resposta)
      if (resposta) { 
        return resposta.data
      } else {
        throw new Error("Formato de dados inesperado");
      }
    } catch (erro) {
      console.error("Erro ao buscar Disponibilidade", erro);
    }
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
    const resposta = await Api.get("/curso");
    if (resposta) {
      return resposta;
    } else {
      throw new Error("Nada retornado");
    }
  } catch (erro) {
    console.error("Erro ao buscar os Cursos", erro)
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