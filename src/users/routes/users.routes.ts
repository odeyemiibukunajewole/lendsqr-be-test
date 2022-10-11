const $ = require("express-async-handler");
const { Router } = require("express");
const userRoute = Router();
const usersRoutes = require("./users.routes");
const passport = require("passport");
const validator = require("../../services/validator");
const schema = require("../utils/schema.utils");



export default userRoute;
