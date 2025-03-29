import Api from "./Api";

export const gerarGrade = async (payload) => {
  try {
    const resposta = await Api.get("/gerar-grade", { params: payload });
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao gerar grade", erro);
    throw erro;
  }
};

export const gerarGradeNor = async (payload) => {
  try {
    const resposta = await Api.get("/gerar-grade-nor", { params: payload });
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao gerar grade normal", erro);
    throw erro;
  }
};

