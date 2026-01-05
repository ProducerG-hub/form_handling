const express = require('express');
const app = express();
const PORT = 3000;
const users = [] // this will be the array that will be storing the registering the users

// A built in middleware in express used to read the data from the form 
app.use(express.urlencoded({extended:true}));
// A built in middleware in express for API which reads the JSON data
app.use(express.json());


// At first when the user open browser will see the file sign.html
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/sign.html');
});

// handling the form submmission
app.post('/register',(req,res)=>{
    const {username,password,email} = req.body; // this get data from the user inputs in the form
    users.push({username,password,email}); // this will store the deatails in the array
    res.send(`Welcome ${username}, You have been registered in successfully`);
});

// this route will be used to display the registered users 
app.get('/users',(req,res)=>{
    res.json(users); // this will display the users credentials as the json data
});

// adding the route for login
app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/login.html');
    
});

// receiving and validating the user login info 
app.post('/login',(req,res)=>{
    const {username,password} = req.body; // taking form inputs
    const user = users.find(u=> u.username && u.password); // fetching the data in array and compare them
    if(user){
        res.sendFile(__dirname + '/admin.html'); // if the credentials are valid
    }
    else{
         //if the credentials are invalid
        res.redirect('/login');
    }
});

app.listen(PORT,()=>{
    console.log("Server is active");
});