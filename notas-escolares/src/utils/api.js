const { default: axios } = require("axios");

// Mudar de acordo com o IP da máquina
const api = axios.create({
  baseURL: "http://192.168.100.100:8080",
});

export default api;