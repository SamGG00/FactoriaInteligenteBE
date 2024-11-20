const express = require("express");
const {
  getAllUsersService,
  postUserService,
} = require("../services/userServices");

const getAllUsersController = async (res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({ status: "true", users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postUserController = async (req, res) => {
  const { user, password, name, name2, last_name, last_name2 } = req.body;

  try {
    const obj = {
         user,
         password,
         name,
         name2:name2 !==undefined? name2: null,
         last_name,
         last_name2:last_name2 !==undefined? last_name2:null };
    const newUser = await postUserService(obj);
    res
      .status(201)
      .json({ status: "true", message: "User created successfully", newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = { getAllUsersController, postUserController };
