import { AppBar, Button, Card, CardContent, CardMedia, Container, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

function Menu() {
  // let state;
  // const navigate = useNavigate();
  // const MySwal = withReactContent(Swal);
  // const handleLogout = () => {
  //   MySwal.fire({
  //     title: "Are you sure?",
  //     text: "To Logout!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Logout",
  //     cancelButtonText: "Cancel",
  //     customClass: {
  //       confirmButton: "btn bg-danger",
  //       cancelButton: "btn bg-success",
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       localStorage.removeItem("admin");
  //       navigate("/admin/login");
  //     }
  //   });
  // };
  return (
    <div>
      <AppBar position="relative" style={{ width: "100%" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Link to='/admin/add-menu'>
        <Button
              variant="contained"
              color="error"
              nowrap
            >
              Add Menu
            </Button>
            </Link>
          {/* {state ? (
       
          ) : (
            <Link to={"/admin/login"}>
           
              <Button variant="contained" color="success" nowrap>
                LogIn
              </Button>
            </Link>
          )} */}
             <Link to={"/admin/menu"}>
         
              <Button variant="contained" color="success" nowrap>
                Menu</Button>
            </Link>
          Admin
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 0,pt:20 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {/* {cards.map((card, index) => ( */}
              <Grid item key={{}} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    // image={imageUrls[index % imageUrls.length]}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            {/* ))} */}
          </Grid>
        </Container>
    </div>
  )
}

export default Menu