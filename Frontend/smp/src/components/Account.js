import React, { useEffect, useState } from "react";
import ApiService from "./services/ApiService";
import Navbar from "./Navbar";

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("");
  const apiService = new ApiService();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await apiService.getLoggedResidentsAccounts();
      const accountsData = response.data;
      setAccounts(accountsData);
    } catch (error) {
      console.log("Error fetching accounts:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleMonthFilterChange = (e) => {
    setMonthFilter(e.target.value);
  };

  const payAccount = async (billNo) => {
    try {
      const updatedAccount = {
        status: "paid",
      };
      await apiService.updateAccountStatus(billNo, updatedAccount);
      fetchAccounts();
    } catch (error) {
      console.log("Error updating account status:", error);
    }
  };

  const filteredAccounts = accounts.filter((account) => {
    // Apply filters based on status and month
    if (statusFilter === "all" || account.status === statusFilter) {
      if (
        monthFilter === "" ||
        new Date(account.date).getMonth().toString() === monthFilter
      ) {
        return true;
      }
    }
    return false;
  });

  return (
    <div>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />

      <h2>Accounts Page</h2>

      <div className="mb-3">
        <label htmlFor="statusFilter">Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleStatusFilterChange}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="monthFilter">Month:</label>
        <input
          type="text"
          id="monthFilter"
          value={monthFilter}
          onChange={handleMonthFilterChange}
        />
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map((account) => (
            <tr key={account.billNo}>
              <td>{formatDate(account.date)}</td>
              <td>{account.status}</td>
              <td>{account.amount}</td>
              <td>
                <button
                  onClick={() => payAccount(account.billNo)}
                  disabled={account.status === "paid"}
                >
                  PAY
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Account;
