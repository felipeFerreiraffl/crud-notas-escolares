const { default: axios } = require("axios");

const api = axios.create({
  baseURL: "http://172.16.1.252:8080",
});

export default api;