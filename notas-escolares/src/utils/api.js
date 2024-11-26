const { default: axios } = require("axios");

// Mudar de acordo com o IP da máquina
const api = axios.create({
  baseURL: "http://192.168.94.240:8080",
});

export default api;