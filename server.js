require('dotenv').config({path: './env'});
const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const cors = require('cors')

//Server Setup
const PORT = process.env.PORT || 8000;  
const app = express();
app.get('/', function (req, res) {
    res.send('hello world')
  })

app.listen(PORT,()=>{
    console.log(`APP IS RUNNING ON PORT ${PORT}`);
})

const url1="mongodb://localhost:27017/DMS";
const url2="mongodb+srv://adminpraveen:Adminpraveen@cluster0.xfrnw.mongodb.net/<dbname>?retryWrites=true&w=majority";

// DB Connection
mongoose.connect(url2, {
  useNewUrlParser:true, 
  useUnifiedTopology:true, 
  useCreateIndex:true  
}).then(()=>{
  console.log("DB CONNECTED");
});


// Middlewares
app.use(bodyParser.json());
app.use(cors());


// My Routes
const authRoutes= require("./route/auth");
app.use('/api',authRoutes);
const leaveRoute = require("./route/leave.js");
app.use("/api",leaveRoute);