const { response } = require("express");
const db = require("../models/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  postSignup: async (req, res) => {
    try {
      const { firstName, lastName, email, password, phone } = req.body;
      let user = await db.user.findOne({ email: email });
      if (user) {
        return res.json({ status: false, err: "Email Already Exist" });
      }
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await db.user({
        fname: firstName,
        lname: lastName,
        email: email,
        password: hashPassword,
        phone: phone,
      });
      await newUser.save().then((response) => {
        res.json({ status: true });
      });
    } catch (error) {
      console.log(error);
      res.json({ status: false });
    }
  },
  postLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await db.user.findOne({ email: email });
      if (user) {
        const token = jwt.sign(
          {
            email: email,
            fname: user.fname,
            lname: user.lname,
          },
          "secret123",
          { expiresIn: "7d" }
        );
        await bcrypt.compare(password, user.password).then((response) => {
          if (response) {
            return res.json({ status: true, user: token });
          } else {
            return res.json({ status: false, user: false });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getUser: async (req, res) => {
    const { email } = req.user;
    await db.user.findOne({ email: email }).then((response) => {
      res.json({ status: true, data: response });
    });
  },
  postImage: async (req, res) => {
    try {
      const { email, imgUrl } = req.body;
      console.log(email, imgUrl);
      await db.user
        .updateOne({ email: email }, { $set: { photo: imgUrl } })
        .then((response) => {
          console.log(response);
          return res.json({ status: true, data: req.body });
        });
    } catch (error) {
      console.log(error);
    }
  },
  viewMenu:async(req,res)=>{
    try {
        const data = await db.menu.find()
        if(data){
          res.json({data:data})
        }
    } catch (error) {
      console.log(error);
    }
  }
};
