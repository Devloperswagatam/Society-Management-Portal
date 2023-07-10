import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";
import Navbar from "../Navbar";

const SuggestionHandler = () => {
  const api = new ApiService();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    getSuggestions();
  }, []);

  const getSuggestions = () => {
    api
      .getSuggestions()
      .then((response) => {
        console.log(response.data);
        setSuggestions(response.data);
      })
      .catch((error) => {
        console.log("Error fetching suggestions:", error);
      });
  };

  const updateSuggestionStatus = (sid) => {
    api
      .updateSuggestion(sid)
      .then((response) => {
        console.log("Suggestion marked as viewed", response.data);
        getSuggestions();
      })
      .catch((error) => {
        console.log("Error marking suggestion as viewed:", error);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };
  return (
    <>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />
      <div className="container">
        <div className="py-4">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Suggestion ID</th>
                <th scope="col">Resident ID</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {suggestions.map((suggestion) => (
                <tr key={suggestion.sid}>
                  <td>{suggestion.sid}</td>
                  <td>{suggestion.resident.rid}</td>
                  <td>{suggestion.title}</td>
                  <td>{suggestion.description}</td>
                  <td>{formatDate(suggestion.date)}</td>
                  <td>{suggestion.status}</td>
                  <td>
                    {!suggestion.viewed ? (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => updateSuggestionStatus(suggestion.sid)}
                        disabled={suggestion.viewed}
                      >
                        {suggestion.viewed ? "Viewed" : "Mark as Viewed"}
                      </button>
                    ) : (
                      "Viewed"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SuggestionHandler;
