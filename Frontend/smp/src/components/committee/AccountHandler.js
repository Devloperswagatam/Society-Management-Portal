import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import ApiService from "../services/ApiService";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";

function AccountHandler() {
  const apiService = new ApiService();
  const [accounts, setAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = () => {
    apiService
      .getAllAccounts() // Include the search query in the API request
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        toast.error("Error occurred", {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
        console.log("Error fetching accounts:", error);
      });
  };

  const payAccount = async (billNo) => {
    try {
      const updatedAccount = {
        status: "paid",
      };
      await apiService.updateAccountStatus(billNo, updatedAccount);
      fetchAccounts();
    } catch (error) {
      toast.error("Error while paying", {
        position: "top-center",
        theme: "colored",
      });
      console.log("Error updating account status:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilter = (event) => {
    event.preventDefault();
    fetchAccounts();
  };

  return (
    <div>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />
      <h2>Accounts</h2>
      <div className="mb-3">
        <form onSubmit={handleFilter}>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className=" btn btn-outline-primary" type="submit">Filter</button>
        </form>
      </div>
      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.billNo}>
              <td>{account.billNo}</td>
              <td>{account.resident.name}</td>
              <td>{account.resident.email}</td>
              <td>{account.amount}</td>
              <td>{account.status}</td>
              <td>
                <Button
                  onClick={() => payAccount(account.billNo)}
                  disabled={account.status === "paid"}
                >
                  PAY
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AccountHandler;
