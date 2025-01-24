const express = require("express");
const {
    CreateUser,
    AuthenticateUser,
    DeleteUser
} = require("../controllers/userAuth.controller");

//initialize express router
const routes = express.Router();

//define routes
routes.post("/signup", CreateUser);
routes.post("/login", AuthenticateUser);
routes.delete("/delete", DeleteUser);

module.exports = routes;