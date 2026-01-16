import axios from "axios";

const API = axios.create({
  baseURL: "https://glamlumina-backend.onrender.com/api",
});

export default API;
