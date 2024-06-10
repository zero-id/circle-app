import axios from "axios";

export const API = axios.create({
  baseURL: "https://cicrcle-be-production.up.railway.app/api/v1",
});
