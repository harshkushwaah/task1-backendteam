const mongoose = require('mongoose');
const express = require('express');
const ejs = require("ejs");
const bodyParser= require("body-parser");
//Set up default mongoose connection
	const uri = "mongodb+srv://test:test@cluster0.xegk1.mongodb.net/acm-project?retryWrites=true&w=majority"
   
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> {
    console.log("Connected");
}).catch((err)=>{ console.log(err);}); 
 //Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new mongoose.Schema({
 username:String  })
const acm = mongoose.model("Acm",userSchema);
const muj = mongoose.model("Muj",userSchema);

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    res.render("home");
});

app.get('/hello', (req, res) => {
    res.send("mesaage 1");
});
app.get('/world', (req, res) => {
    res.send("mesaage 2");
    
});
app.get('/muj', (req, res) => {
    res.render("forms");
});
app.get('/acm', (req, res) => {
    res.render("form1");
});

app.post('/muj', (req, res) => {
    const userName = req.body.username;
    const user = new muj({
        username: userName
    });
    user.save();
     res.redirect('/');
});
app.post('/acm', (req, res) => {
    const userName = req.body.username;
    const user = new acm({
        username: userName
    });
    user.save();
     res.redirect('/');
});

const port = 3000 || process.env.PORT; 

app.listen( port , function() {
    console.log("Server started at "+ port);
  });
  