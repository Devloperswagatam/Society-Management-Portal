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
  updateResident(resident) {
    return axios.put(
      "http://localhost:8088/residents/resident",
      resident,
      this.getConfig()
    );
  }
  getResidentDetails(resident) {
    return axios.get(
      "http://localhost:8088/residents/resident/loggedin",
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

  addOrganizer(eid) {
    return axios.post(
      `http://localhost:8088/events/organizer/${eid}`,
      {},
      this.getConfig()
    );
  }

  getOrganizersByEventId(eid) {
    return axios.get(
      `http://localhost:8088/events/organizer/${eid}`,
      this.getConfig()
    );
  }

  removeOrganizer(eid) {
    return axios.post(
      `http://localhost:8088/events/removeorganizer/${eid}`,
      {},
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
  getAllCandidates() {
    return axios.get(
      "http://localhost:8088/residents/voting/candidates",
      this.getConfig()
    );
  }

  getCandidatesByVotingId(votingId) {
    return axios.get(
      `http://localhost:8088/residents/voting/event/${votingId}`,
      this.getConfig()
    );
  }

  addCandidate(votingId) {
    return axios.post(
      `http://localhost:8088/residents/voting/candidates/${votingId}`,
      {},
      this.getConfig()
    );
  }

  withdrawCandidate(votingId) {
    return axios.post(
      `http://localhost:8088/residents/voting/event/${votingId}`,
      {},
      this.getConfig()
    );
  }

  addVote(votingId, rid) {
    return axios.post(
      `http://localhost:8088/residents/voting/votes/${votingId}/${rid}`,
      {},
      this.getConfig()
    );
  }

  //Suggestion Api
  getSuggestions() {
    return axios.get("http://localhost:8088/sugg/suggestion", this.getConfig());
  }
  addSuggestion(suggestion) {
    return axios.post(
      "http://localhost:8088/sugg/suggetion",
      suggestion,
      this.getConfig()
    );
  }
  updateSuggestion(id, updatedSuggestion) {
    return axios.put(
      `http://localhost:8088/sugg/suggetion/${id}`,
      updatedSuggestion,
      this.getConfig()
    );
  }
  //Complaint Api
  getComplaints() {
    return axios.get("http://localhost:8088/api/complaints", this.getConfig());
  }
  addComplaint(complaint) {
    return axios.post(
      "http://localhost:8088/api/complaint",
      complaint,
      this.getConfig()
    );
  }
  addComplaintWithImage(formData) {
    return axios.post(
      "http://localhost:8088/api/complaintwithImage",
      formData,
      this.getConfig()
    );
  }
  updateComplaint(id, updateComplaint) {
    return axios.put(
      `http://localhost:8088/api/complaints/${id}`,
      updateComplaint,
      this.getConfig()
    );
  }
  //Bulletin Api
  getBulletins() {
    return axios.get("http://localhost:8088/bull/notes", this.getConfig());
  }
  addBulletin(bulletin) {
    return axios.post(
      "http://localhost:8088/bull/bulletin",
      bulletin,
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

  updateAccountStatus(billNo, updatedAccount) {
    return axios.put(
      `http://localhost:8088/residents/accounts/account/${billNo}`,
      updatedAccount,
      this.getConfig()
    );
  }
}

export default ApiService;
