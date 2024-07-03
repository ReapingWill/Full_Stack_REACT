const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../db/schemas/userSchema');
const dbo = require("../db/conn");
const { default: mongoose } = require('mongoose');

// const login = (app) => {
//   app.post('/login', async (req,res) =>{
//     let db_connect = dbo.getDb();
//     const userCollection = db_connect.collection("users");
//     const email = req.body.email;
//     const password = req.body.password;
//     const foundUser = await userCollection.insertOne({email:email, password:password});
//     console.log(foundUser)
//     res.json({message: 'Found User!'})
  
  
//   });
// }


const login = (app) => {
  app.post('/login', async (req,res) => {
    let db_connect = dbo.getDb();
    const userCollection = db_connect.collection("users");
    try{
      const {email, password} = req.body;
      const user = await userCollection.findOne({email: email});
    
      if(user){
        if(user.password === password) {
          res.json({ success: true, message: 'Login Successful',id:user._id });
        }else{
          res.json({ success: false, message: 'The password is incorrect' });
        }
      }else {
        res.json({ success: false, message: 'No User Found' });
      }
    }catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });
}



module.exports = {login};