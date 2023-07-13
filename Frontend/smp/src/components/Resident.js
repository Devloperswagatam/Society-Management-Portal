
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Table } from "react-bootstrap";
import ApiService from "./services/ApiService";
import { toast } from "react-toastify";
import { BsFillClipboardCheckFill, BsPencil, BsPencilSquare, BsPersonCircle } from "react-icons/bs";
import {MdCancel} from "react-icons/md";
import {CgProfile} from "react-icons/cg";

function Resident() {
  const api = new ApiService();
  const [residents, setResidents] = useState([]);
  const [editingResident, setEditingResident] = useState(null);
  const [editedWingNo, setEditedWingNo] = useState("");
  const [editedFlatNo, setEditedFlatNo] = useState("");
  const [editedFloorNo, setEditedFloorNo] = useState("");
  const [editedMemberCount, setEditedMemberCount] = useState("");

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    await api
      .getAllResidents()
      .then((response) => {
        const residents = response.data;
        setResidents(residents);
      })
      .catch((error) => {
        toast.error("Error while fetching", {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  const startEditing = (resident) => {
    setEditingResident(resident);
    setEditedWingNo(resident.wingNo);
    setEditedFlatNo(resident.flatNo);
    setEditedFloorNo(resident.floorNo);
    setEditedMemberCount(resident.memberCount);
  };

  const cancelEditing = () => {
    setEditingResident(null);
    setEditedWingNo("");
    setEditedFlatNo("");
    setEditedFloorNo("");
    setEditedMemberCount("");
  };

  const saveChanges = async () => {
    const updatedResident = {
      ...editingResident,
      wingNo: editedWingNo,
      flatNo: editedFlatNo,
      floorNo: editedFloorNo,
      memberCount: editedMemberCount,
    };

    await api
      .updateResident(updatedResident)
      .then(() => {
        toast.success("Resident updated successfully", {
          position: "top-center",
          theme: "colored",
        });
        setResidents((prevResidents) =>
          prevResidents.map((resident) =>
            resident.rid === updatedResident.rid ? updatedResident : resident
          )
        );
        cancelEditing();
      })
      .catch((error) => {
        toast.error("Error while updating", {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  return (
    <>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />
      <h1>Residents</h1>
      <div className="container-fluid">
        <Table className="table mt-4 shadow">
          <thead className="table-dark">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Wing No</th>
              <th>Flat No</th>
              {sessionStorage.getItem("role") === "committee" && (
                <>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Floor No</th>
                  <th>Member Count</th>
                  <th>Action</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {residents.map((resident) => (
              <tr key={resident.rid}>
                <td><BsPersonCircle  size={30} style={{color:"#2d98da"}}/></td>
                <td>{resident.name}</td>
                <td>
                  {editingResident === resident ? (
                    <input
                    style={{width:"3rem"}}
                      type="text"
                      value={editedWingNo}
                      onChange={(e) => setEditedWingNo(e.target.value)}
                    />
                  ) : (
                    resident.wingNo
                  )}
                </td>
                <td>
                  {editingResident === resident ? (
                    <input
                    style={{width:"3rem"}}
                      type="text"
                      value={editedFlatNo}
                      onChange={(e) => setEditedFlatNo(e.target.value)}
                    />
                  ) : (
                    resident.flatNo
                  )}
                </td>
                {sessionStorage.getItem("role") === "committee" && (
                  <>
                    <td>{resident.email}</td>
                    <td>{resident.phoneNumber}</td>
                    <td>
                      {editingResident === resident ? (
                        <input
                        style={{width:"3rem"}}
                          type="text"
                          value={editedFloorNo}
                          onChange={(e) => setEditedFloorNo(e.target.value)}
                        />
                      ) : (
                        resident.floorNo
                      )}
                    </td>
                    <td>
                      {editingResident === resident ? (
                        <input
                        style={{width:"3rem"}}
                          type="text"
                          value={editedMemberCount}
                          onChange={(e) => setEditedMemberCount(e.target.value)}
                        />
                      ) : (
                        resident.memberCount
                      )}
                    </td>
                    <td colSpan={2}    style={{ width:"5rem"}}>
                      {editingResident === resident ? (
                        <>
                          <BsFillClipboardCheckFill
                            size={25}
                            style={{ cursor: "pointer", color: "green", marginRight:'1rem' }}
                            onClick={saveChanges}
                          />
                          <MdCancel
                            size={30}
                            style={{ cursor: "pointer", color: "red",marginLeft:'1rem' }}
                            onClick={cancelEditing}
                          />
                        </>
                      ) : (
                        <BsPencilSquare
                          size={20}
                          style={{ cursor: "pointer", color: "blue" }}
                          onClick={() => startEditing(resident)}
                        />
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Resident;
