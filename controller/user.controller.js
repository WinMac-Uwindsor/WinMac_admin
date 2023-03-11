const Data = require("../models/user.model");
const validation = require("../middleware/validator");
 
 //All Events
 exports.getAllData = async (req, res, next) => {
  const { intake } = req.body;
  console.log(req.body);
  try {
    const users = await Data.find({ intake: intake });
    if(users!=null){
      const userData = users.map(user => {
        return {
          eventBooked: user.eventBooked,
          eventAttended: user.eventAttended,
          username: user.username,
          email: user.email,
          name: user.name,
          intake: user.intake
        };
      });
      res.status(200).json({
        length: userData.length,
        data: userData
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
      error: error
    });
  }
};

  
exports.registerUser = async (req, res, next) => {
  const { username, email, password, name, intake } = req.body;
  console.log(req.body);
  try {
    const validationErrors = validation.validationResult(req);
    const errors = [];
    if (!validationErrors.isEmpty) {
      validationErrors.errors.forEach((error) => {
        console.log("setting error");
        errors.push(error.param);
      });
    } else {
      const existingEmail = await Data.findOne({ email: req.body.email });
      const existingUsername = await Data.findOne({ username: req.body.username });

      if (existingEmail || existingUsername) {
        console.log("setting error 2");
        errors.push({ message: "Email or username already exist." });
      }
    }
    if (errors.length) {
      return res.status(400).json({
        error: errors,
      });
    }
    const obj = JSON.stringify(req.body);
    const userSaved = await Data.create({
      "username": obj.username,
      "email": obj.email,
      "password": obj.password,
      "name": obj.name,
      "intake": obj.intake,
    });    
    res.status(201).json({
      message: "User created!",
      user: {
        username: userSaved.username,
        email: userSaved.email,
        password: userSaved.password,
        name: userSaved.name,
        intake: userSaved.intake,
      },
    });
  } catch (error) {
    return next(error);
  }
};