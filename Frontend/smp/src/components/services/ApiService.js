import axios from "axios";

class ApiService {
  getConfig() {
    const config = {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    };
    return config;
  }

  login=(userlogin)=>{
    return axios.post("http://localhost:8088/auth/login",userlogin)
  }
}

export default ApiService;
