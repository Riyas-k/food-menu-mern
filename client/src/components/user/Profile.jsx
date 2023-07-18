import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import jwt from "jwt-decode";
import axios from "../../axios";
import Header from "./Header";
import { Link } from "react-router-dom";

function Profile() {
  const [image, setImage] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const user = localStorage.getItem("token");
      const details = jwt(user);
      const headers = {
        "x-access-token": user,
        "Content-Type": "application/json",
      };
      await axios
        .get("/", {
          headers,
          data: details,
        })
        .then((res) => {
          setImage(res.data.data.photo);
          setData(res.data.data);
          console.log(res);
        });
    };
    fetchUser();
  }, []);

  const handleImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "cjcj4mix");
    console.log(formData,'form');
    await axios
      .post("https://api.cloudinary.com/v1_1/dki1memle/image/upload", formData)
      .then(async (res) => {
        console.log(res);
        let user = localStorage.getItem("token");
        let userData = await jwt(user);
        localStorage.setItem("image", res.data.url);
        let url = localStorage.getItem("image");
        console.log(url, "url");
        setImage(res.data.url);
        const newData = {
          email: userData.email,
          imgUrl: url,
        };
        await axios.post("/image", newData);
      });
  };
  return (
    <>
      <Header data={data} />
      <section style={{ backgroundColor: "#ffffff" }}>
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ marginTop: "100px" }}
        >
          <div className="col col-md-9 col-lg-7 col-xl-5">
            <div className="card" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <div className="d-flex text-black align-items-center">
                  <div className="flex-shrink-0">
                    {image && image?.length > 0 ? (
                      <Link to={image}>
                      <img
                        src={image}
                        alt="Generic placeholder image"
                        className="img-fluid"
                        style={{ width: "180px", borderRadius: "10px" }}
                      /></Link>
                    ) : (
                      <img
                        src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        alt="Generic placeholder image"
                        className="img-fluid"
                        style={{ width: "180px", borderRadius: "10px" }}
                      />
                    )}
                  </div>
                  <div className=" ms-3">
                    <h5 className="d-flex mb-1">User Name</h5>
                    {/* {data && ( */}
                    <p className="d-flex mb-2" style={{ color: "#2b2a2a" }}>
                      {data?.fname + " " + data?.lname}
                    </p>
                    {/* )} */}

                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2">
                      <div>
                        <p className="d-flex small text-muted mb-1">Email</p>
                        <p className="mb-0">
                          <span>{data?.email}</span>
                        </p>
                      </div>
                    </div>

                    <input
                      className="d-flex pt-1 pb-2"
                      onChange={(e) => setImage(e.target.files[0])}
                      type="file"
                    />
                    <Button
                      className="d-flex"
                      onClick={handleImage}
                      variant="contained"
                      color="secondary"
                      type="submit"
                    >
                      Change Image
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
