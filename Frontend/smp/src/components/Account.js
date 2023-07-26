import React, { useEffect, useState } from "react";
import ApiService from "./services/ApiService";
import Navbar from "./Navbar";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

const Account = () => {
  // const totalAmount = useContext(AccountContext);

  const [accounts, setAccounts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [monthFilter, setMonthFilter] = useState("");
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
      toast.success("Payment Successfull", {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
      fetchAccounts();
    } catch (error) {
      toast.error("Error while paying", {
        position: "top-center",
        theme: "colored",
      });
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

      {/* <Home totalAmount={totalAmount}/> */}

      <h2>Maintanance and Events Bills</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginLeft: "1rem",
        }}
      >
        <div className="mb-3">
          <label htmlFor="statusFilter" style={{ fontSize: "20px" }}>
            View:&nbsp;&nbsp;
          </label>
          <select
            style={{ height: "2rem", borderRadius: "5rem" }}
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
          <label htmlFor="monthFilter" style={{ fontSize: "20px" }}>
            Month:&nbsp;&nbsp;
          </label>
          <input
            style={{
              borderRadius: "5rem",
              height: "2rem",
              border: "1px solid",
            }}
            type="text"
            id="monthFilter"
            value={monthFilter}
            onChange={handleMonthFilterChange}
          />
        </div>
      </div>

      <div
        style={{
          marginLeft: "80rem",
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

      <Table className="table">
        <thead className="table-dark">
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
};

export default Account;
