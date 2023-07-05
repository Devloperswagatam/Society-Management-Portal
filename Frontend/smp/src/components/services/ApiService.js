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

  //login api
  login=(userlogin)=>{
    return axios.post("http://localhost:8088/auth/login",userlogin)
  }

  //Events api
  getEvents() {
    return axios.get("http://localhost:8088/events/event", this.getConfig());
  }

  addEvent(event) {
    return axios.post("http://localhost:8088/events/event", event, this.getConfig());
  }
}

export default ApiService;
