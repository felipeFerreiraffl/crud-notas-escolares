const { default: axios } = require("axios");

// Mudar de acordo com o IP da máquina
const api = axios.create({
  baseURL: "http://192.168.100.100:8080",
  // baseURL: "http://172.16.1.252:8080",
  // baseURL: "http://192.168.94.240:8080",
});

export default api;