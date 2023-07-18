/* eslint-disable react/prop-types */
import { Alert, AppBar, Button, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import axios from "../../axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function AdminHome() {
  const [state, setState] = useState({});
  const [users, setUsers] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    const details = jwt(admin);
    if (details) setState(details);
    const fetchAllUser = async () => {
      await axios.get("/admin").then((res) => {
        setUsers(res.data.user);
      });
    };
    fetchAllUser();
  }, []);
  const handleLogout = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "To Logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn bg-danger",
        cancelButton: "btn bg-success",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("admin");
        navigate("/admin/login");
      }
    });
  };

  const handleDelete = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn bg-danger",
        cancelButton: "btn bg-success",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Perform delete operation
        await axios.put(`/admin/delete-user/${id}`).then(async (res) => {
          if (res.data.status) {
            await axios.get("/admin").then((res) => {
              setUsers(res.data.user);
            });
          }
        });
      }
    });
  };
  const handleSearch = (searchData, users) => {
    const regex = new RegExp(`^${searchData}`, "i");
    const result = users.filter(
      (doc) => regex.test(doc.fname) || regex.test(doc.lname)
    );
    return result;
  };
  // const handleAdd = () => {
  //   navigate('/admin/add-user'); 
  // };

  return (
    <>
      <AppBar position="relative" style={{ width: "100%" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          {state ? (
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              nowrap
            >
              Logout
            </Button>
          ) : (
            <Link to={"/admin/login"}>
           
              <Button variant="contained" color="success" nowrap>
                LogIn
              </Button>
            </Link>
          )}
             <Link to={"/admin/menu"}>
         
              <Button variant="contained" color="success" nowrap>
                Menu</Button>
            </Link>
          Admin
        </Toolbar>
      </AppBar>
      <Alert severity="success">Welcome Admin —!</Alert>
      <div className="container" style={{ marginTop: "60px" }}>
        <input
          type="text"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
        <Button
          variant="contained"
          color="success"
          style={{ marginLeft: "10px" }}
          onClick={() => {
            const searches = handleSearch(searchData, users);
            // console.log(searches, "----");
            setUsers(searches);
          }}
        >
          Search
        </Button>
        <h2>Users List</h2>
        {/* <button
          className="btn bg-success mt-2 mb-2"
          onClick={handleAdd}
          
        >
          Add
        </button> */}
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">No</th>
              <th>Image</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <th>
                    <Link to={user?.photo}>
                      <img
                        src={user?.photo}
                        style={{ width: "80px", height: "80px" }}
                      />
                    </Link>
                  </th>
                  <td>{user.fname + " " + user.lname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>

                  <button
                    className="btn bg-danger mt-2"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminHome;
