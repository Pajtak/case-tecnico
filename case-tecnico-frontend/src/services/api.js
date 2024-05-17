import axios from 'axios';

const URL = 'http://localhost:8080';


export const fetchData = async () => {
    try {
        const response = await axios.get(`${URL}/user`);
        if (Array.isArray(response.data)) {
          return response.data;
        } else {
          console.error('Os dados retornados não são um array:', response.data);
          return [];
        }
      } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        return [];
      }
    };

export const postData = async (data) => {
    try {
        const response = await axios.post(`${URL}/user`, data);
        return response.data;
    } catch (error) {
        
        if (error.response && error.response.data && error.response.data.err) {
            throw new Error(error.response.data.err);
        } else {
            throw new Error("Erro ao criar usuário. Tente novamente mais tarde.");
        }
    }
};


export const userLogin = async (data) => {
    try {
        const response = await axios.post(`${URL}/login`, data);
        return response.data;
    } catch (error) {
        
        if (error.response && error.response.data && error.response.data.err) {
            throw new Error(error.response.data.err);
        } else {
            throw new Error("Erro ao criar usuário. Tente novamente mais tarde.");
        }
    }
};
  // Função para fazer a requisição PUT
  export const putData = async (id, data) => {
    try {
      const response = await axios.put(`${URL}/user:${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer requisição PUT:', error);
      return null;
    }
  };
  
  // Função para fazer a requisição DELETE
  export const deleteData = async (id) => {
        try {
      const response = await axios.delete(`${URL}/user/${id}`);
      
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer requisição DELETE:', error);
      return null;
    }
  };