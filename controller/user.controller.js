const User = require("../models/user.model");
 
 //All Events
 exports.getAllData = async (req, res, next) => {
  const { intake } = req.body;
  console.log(req.body);
  try {
    const users = await User.find({ intake: intake });
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
    const errors = [];
    const existingEmail = await User.findOne({ email: req.body.email });
    const existingUsername = await User.findOne({ username: req.body.username });

    if (existingEmail || existingUsername) {
      console.log("setting error 2");
      errors.push({ message: "Email or username already exist." });
    }
    if (errors.length) {
      return res.status(400).json({
        error: errors,
      });
    }
    const uname = JSON.stringify(req.body.username);
    const em = JSON.stringify(req.body.email);
    const pass = JSON.stringify(req.body.password);
    const nam = JSON.stringify(req.body.name);
    const U_i = JSON.stringify(req.body.intake);
    //console.log(typeof(uname));
    const userSaved = await User.create({
      "username": uname,
      "email": em,
      "password": pass,
      "name": nam,
      "intake": U_i,
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