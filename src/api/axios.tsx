import axios from "axios";

const API = axios.create({
  baseURL: "https://chatapp-server-1-i5ik.onrender.com", //backend base url

  withCredentials: true, //to allow cookies and JWT
});

export default API;
