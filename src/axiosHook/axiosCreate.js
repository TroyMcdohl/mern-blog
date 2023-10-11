import axios from "axios";

export const axiosCreate = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});
