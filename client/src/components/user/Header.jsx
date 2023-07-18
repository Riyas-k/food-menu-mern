/* eslint-disable react/prop-types */
import { AppBar, Button, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function Header(props) {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
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
        // Perform delete operation
        localStorage.removeItem("token");
        navigate("/login");
      }
    });
  };
  return (
    <AppBar position="relative" style={{ width: "100%" }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        {props.data ? (
          <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
            nowrap
          >
            Logout
          </Button>
        ) : (
          <Link to={"/login"}>
            {" "}
            <Button variant="contained" color="success" nowrap>
              LogIn
            </Button>
          </Link>
        )}

        {props.data && (
          <Link to={"/profile"}>
            {" "}
            <Button variant="contained" color="success" nowrap>
              {props.data.fname + " " + props.data.lname}
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
