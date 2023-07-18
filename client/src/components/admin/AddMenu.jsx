import { AppBar, Button, Container, Grid, TextField, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "../../axios";

function AddMenu() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = async(values, { resetForm }) => {
    const formData = new FormData();
    formData.append("file", values.image.name);
    formData.append("upload_preset", "cjcj4mix");
    console.log(formData);
    await axios.post("https://api.cloudinary.com/v1_1/dki1memle/image/upload", formData).then((res)=>{
        console.log(res,'data');
    })
    // Handle form submission with values
    // setIsFormSubmitted(true);
    console.log(values.image.name);
    // resetForm();
  };
  

  const validationSchema = Yup.object({
    nameOfFood: Yup.string().required("Name of Food is required"),
    nameOfCategory: Yup.string().required("Name of Category is required"),
    price: Yup.number().required("Price is required"),
    spicyOrTasty: Yup.string().required("Spicy or Tasty is required"),
    image: Yup.mixed().required("Image is required"),
  });

  return (
    <>
      <AppBar position="relative" style={{ width: "100%" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Link to={"/admin/menu"}>
            <Button variant="contained" color="success" nowrap>
              Menu
            </Button>
          </Link>
          Admin
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Add Menu
        </Typography>
        <Formik
          initialValues={{
            nameOfFood: "",
            nameOfCategory: "",
            price: "",
            spicyOrTasty: "",
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="nameOfFood"
                    label="Name of Food"
                    variant="outlined"
                    required
                    error={isFormSubmitted && <ErrorMessage name="nameOfFood" component="div" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="nameOfCategory"
                    label="Name of Category"
                    variant="outlined"
                    required
                    error={isFormSubmitted && <ErrorMessage name="nameOfCategory" component="div" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="price"
                    label="Price"
                    variant="outlined"
                    required
                    error={isFormSubmitted && <ErrorMessage name="price" component="div" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="spicyOrTasty"
                    label="Spicy or Tasty"
                    variant="outlined"
                    required
                    error={isFormSubmitted && <ErrorMessage name="spicyOrTasty" component="div" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      values.image = file;
                    }}
                  />
                  {isFormSubmitted && <ErrorMessage name="image" component="div" />}
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export default AddMenu;
