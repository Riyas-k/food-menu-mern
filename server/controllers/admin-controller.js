const jwt = require("jsonwebtoken");
const db = require("../models/connection");
const bcrypt = require('bcrypt')

const credentials = {
  email: "mohammedriyazriyaz04@gmail.com",
  password: "123",
};

module.exports = {
  postAdmin: (req, res) => {
    const { email, password } = req.body;

    if (credentials.email === email && credentials.password === password) {
      const token = jwt.sign(
        {
          email: email,
          password: password,
        },
        "secret_key",
        { expiresIn: "7d" }
      );
      res.json({ status: true, admin: token });
    } else {
      res.json({ status: false });
    }
  },
  getUsers: async (req, res) => {
    await db.user.find({}).then((response) => {
      if (response) {
        res.json({ status: true, user: response });
      } else {
        res.json({ status: false });
      }
    });
  },
  deleteUser: async (req, res) => {
    console.log(req.params.id);
    await db.user.deleteOne({ _id: req.params.id }).then((response) => {
      console.log(response);
      if (response) {
        res.json({ status: true });
      } else {
        res.json({ Status: false });
      }
    });
  },
  addUser:async(req,res)=>{
    let {email,firstName,lastName,phone,password} = req.body
    let user = await db.user.findOne({email:email})
    if(user){
      res.json({status:false})
    }else{
     let hashPassword =  await bcrypt.hash(password,10)
      const newUser = await db.user({
        fname: firstName,
        lname: lastName,
        email: email,
        password: hashPassword,
        phone: phone,
      })
      await newUser.save().then((response)=>{
        res.json({status:true})
      })
    }
  },
  postMenu:async(req,res)=>{
    try {
      let {name,category,description,price,image} = req.body;
      const newMenu = await db.menu({
        name: name,
        description:description,
        category: category,
        price: price,
        Quantity:Quantity,
        image: image,
      });
      await newMenu.save().then((response) => {
        res.json({ status: true });
      });
    } catch (error) {
      console.log(error);
    }

  },
  editMenu:async(req,res)=>{
    try {
      let {menuId} = req.params;
      let {name,category,description,price,image} = req.body;
      await db.menu.updateOne({_id:menuId},{
        $set:{
          name: name,
          description:description,
          category: category,
          price: price,
          image: image,
        }
      }).then((res)=>{
        res.json({ status: true });
      })
      
    } catch (error) {
      console.log(error);
    }
  },
  deleteMenu:async(req,res)=>{
    try {
      let {menuId} = req.params;
    
      await db.menu.deleteOne({_id:menuId}).then((res)=>{
        res.json({ status: true });
      })
      
    } catch (error) {
      console.log(error);
    }
  },
  viewAllMenu:async(req,res)=>{
    try {
        const data = await db.menu.find()
        if(data){
          res.json({data:data})
        }
    } catch (error) {
      console.log(error);
    }
  },
  searchMenu:async(req,res)=>{
    try {
        const text = req.body;
        await db.menu.findOne({name:text}).then((res)=>{
          res.json({data:res})
        })
    } catch (error) {
      console.log(error);
    }
  }
};
