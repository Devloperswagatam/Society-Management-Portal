import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";
import Navbar from "../Navbar";
const SuggestionHandler = () => {
  const api = new ApiService();
  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {
    getSuggestions();
  }, []);
  const getSuggestions = () => {
    api
      .getSuggestions()
      .then((response) => {
        console.log(response.data);
        setSuggestion(response.data);
      })
      .catch((error) => {
        console.log(`Error fetching suggestions`, error);
      });
  };
  
  const updateSuggestion1 = async (sid)=>{
    try{
      const updateSuggestion={
        status:"viewed",
      };
      await api.updateSuggestionStatus(sid, updateSuggestion);
      getSuggestions();
    }catch(error){
      console.log("Error updating the suggestion status :", error);
    }
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
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">SId</th>
                <th scope="col">RId</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {suggestion.map((suggestion) => (
                <tr key={suggestion.sid}>
                  <th scope="row" key={suggestion.sid}>
                    {suggestion.sid}
                  </th>
                  <td>{suggestion.resident}</td>
                  <td>{suggestion.title}</td>
                  <td>{suggestion.description}</td>
                  <td>{formatDate(suggestion.date)}</td>

                  <td>
                    {suggestion.status !== "viewed" && (
                      <button
                        onClick={() => updateSuggestion1(suggestion.sid)}
                      >
                        Mark as Viewed
                      </button>
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
