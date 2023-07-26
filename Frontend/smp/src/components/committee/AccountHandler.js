import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import Navbar from "../Navbar";
import ApiService from "../services/ApiService";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

function AccountHandler() {
  const apiService = new ApiService();
  // const history = useHistory(); 
  const [accounts, setAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBreakdown, setShowBreakdown] = useState(false);
  const maintenanceBill = {
    totalAmount: 5000,
    laborCosts: 1100,
    partsAndMaterials: 1000,
    routineMaintenance: 800,
    repairs: 500,
    hvac: 600,
    electricalSystems: 300,
    plumbing: 200,
    safetyAndSecuritySystems: 150,
    exteriorMaintenance: 250,
    pestControl: 100,
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = () => {
    apiService
      .getAllAccounts()
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
    const filteredAccounts = accounts.filter(
      (account) =>
        account.resident.name.includes(searchQuery) ||
        account.resident.email.includes(searchQuery)
    );
    setAccounts(filteredAccounts);
  };

  const handleCancel = () => {
    setSearchQuery(""); // Clear the search query
    fetchAccounts(); // Reset the accounts list to show all accounts
  };

  const handleShowBreakdown = () => {
    setShowBreakdown(true);
  };

  const handleCloseBreakdown = () => {
    setShowBreakdown(false);
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
        <form onSubmit={handleFilter} style={{width:'10rem',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'0.5rem',marginLeft:'7rem'}}>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={handleSearch}
            style={{borderRadius:'1em'}}
          />
          <button className="btn btn-outline-primary" type="submit">
            Filter
          </button>
          <button className="btn btn-outline-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>

      <div
        style={{
          marginLeft: "70rem",
          marginTop: "-3.3rem",
          marginBottom: "1rem",
        }}
      >
        {/* <button className="btn btn-outline-primary" style={{marginRight:'1rem'}}>Events</button> */}
        <button
          className="btn btn-outline-primary"
          onClick={handleShowBreakdown}
        >
          Breakdown
        </button>
      </div>

      <Modal show={showBreakdown} onHide={handleCloseBreakdown}>
        <Modal.Header closeButton>
          <Modal.Title>Maintenance Bill Breakdown</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Total Amount: {maintenanceBill.totalAmount} rupees</p>
          <p>Labor Costs: {maintenanceBill.laborCosts} rupees</p>
          <p>Parts and Materials: {maintenanceBill.partsAndMaterials} rupees</p>
          <p>
            Routine Maintenance: {maintenanceBill.routineMaintenance} rupees
          </p>
          <p>Repairs: {maintenanceBill.repairs} rupees</p>
          <p>HVAC: {maintenanceBill.hvac} rupees</p>
          <p>Electrical Systems: {maintenanceBill.electricalSystems} rupees</p>
          <p>Plumbing: {maintenanceBill.plumbing} rupees</p>
          <p>
            Safety and Security Systems:{" "}
            {maintenanceBill.safetyAndSecuritySystems} rupees
          </p>
          <p>
            Exterior Maintenance: {maintenanceBill.exteriorMaintenance} rupees
          </p>
          <p>Pest Control: {maintenanceBill.pestControl} rupees</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseBreakdown}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container">
        <table striped bordered hover className="table mt-4 shadow">
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
        </table>
      </div>
    </div>
  );
}

export default AccountHandler;
