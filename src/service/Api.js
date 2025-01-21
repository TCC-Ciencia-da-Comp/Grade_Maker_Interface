class API_GRADE_MAker {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(method, route, body = null) {
    const options = {
      method: method.toUpperCase(),
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Envia cookies
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(`${this.baseURL}${route}`, options);
  
      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: "Erro desconhecido",
        }));
        throw new Error(error.message || `Erro ${response.status}`);
      }
  
      return response.status !== 204 ? await response.json() : null;
    } catch (error) {
      console.error(`Erro na requisição para ${route}:`, error);
      throw error;
    }
  }

  get(route) {
    return this.request("GET", route);
  }

  post(route, body = null) {
    return this.request("POST", route, body);
  }

  put(route, body=null) {
    return this.request("PUT", route, body);
  }

  delete(route) {
    return this.request("DELETE", route);
  }
}

export default new API_GRADE_MAker("http://localhost:8080/api");
