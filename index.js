const express = require('express');
const mongoose = require('mongoose');
const eventListRoutes = require('./routes/eventList.routes');
const techSupportRoutes = require('./routes/techSupport.routes');
const studentDataRoutes = require('./routes/studentData.routes');

require('dotenv').config()

const app = express();

app.use((req, res, next) => {
  res.header('Access-control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 
  'Origin , X-Reaquested-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS') {
      res.header('Accesss-Control-Allow-Methods', 'PUT , POST, PATCH, DELETE, GET' );
      return res.status(200).json({});
  }
  next();
});

app.use(express.json());

app.get('/', (req,res,next) => {
  res.send(`<h1>WinMac Server </h1>`)  
})


// localhost:8080/winmac/auth/
app.use('/winmac/eventList', eventListRoutes);
app.use('/winmac/studentData', studentDataRoutes);
app.use('/winmac/support', techSupportRoutes);



mongoose.set("strictQuery", false);
mongoose.connect(
    //"mongodb://0.0.0.0:27017/",
    "mongodb+srv://spyman2748:aman2748@signin.o5zdp16.mongodb.net/?retryWrites=true&w=majority",
    {
      dbName: "WinHub",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) =>
      err ? console.log(err) : console.log(
        "Connected to WinHub database")
  );

//const PORT = process.env.PORT || 3000;
const PORT = 5000;
app.listen(PORT, () => console.log(`App is running at ${PORT}`))
