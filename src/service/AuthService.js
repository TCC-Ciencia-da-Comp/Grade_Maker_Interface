import Api from "./Api";

const AuthService = {
  async login(username, password) {
    try {
      const response = await Api.post("/auth/login", { username, password });
      console.log("Login realizado com sucesso!");
      return response; // Retorna a resposta, se necessário
    } catch (error) {
      console.error("Erro ao realizar login: \n" + error.message);
      if (error.response && error.response.data) {
        console.error("Detalhes do erro:", error.response.data);
      }
      throw error; // Propaga o erro para quem chamou o método
    }
  },

  async getCurrentUser() {
    try {
      const response = await Api.get("/auth/me");
      return response; // Retorna os dados do usuário autenticado
    } catch (error) {
      console.error("Erro ao buscar o usuário atual:", error.message);
      throw new Error("Usuário não autenticado");
    }
  },

  async userLogout() {
    try {
      await Api.post("/auth/logout");
      console.log("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao realizar logout:", error.message);
      throw error;
    }
  },
};

export default AuthService;
