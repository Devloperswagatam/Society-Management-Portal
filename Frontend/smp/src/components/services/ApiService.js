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
  login = (userlogin) => {
    return axios.post("http://localhost:8088/auth/login", userlogin);
  };

  //Residents api
  getLoggedResident() {
    return axios.get(
      "http://localhost:8088/residents/resident/loggedin",
      this.getConfig()
    );
  }

  addResident(resident) {
    return axios.post(
      "http://localhost:8088/residents/resident",
      resident,
      this.getConfig()
    );
  }

  //Events api
  getEvents() {
    return axios.get("http://localhost:8088/events/event", this.getConfig());
  }

  addEvent(event) {
    return axios.post(
      "http://localhost:8088/events/event",
      event,
      this.getConfig()
    );
  }

  //voting api
  getVotingEvents() {
    return axios.get(
      "http://localhost:8088/residents/voting/event",
      this.getConfig()
    );
  }

  addVotingEvent(event) {
    return axios.post(
      "http://localhost:8088/residents/voting/event",
      event,
      this.getConfig()
    );
  }

  //Accounts api
  getLoggedResidentsAccounts() {
    return axios.get(
      "http://localhost:8088/residents/accounts/account",
      this.getConfig()
    );
  }

  // changeAccountStatus(){
  //   return axios.put("http://localhost:8088/residents/accounts/account/{billNo}");
  // }
}

export default ApiService;
