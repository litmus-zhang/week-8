const express = require('express');
const PORT =  3000;
const User = require('./User');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());


const Database = "YOUR CONNECTION STRING GOES HERE"


app.post("/signup", async (req, res) =>
{
    const reqBody = req.body;
    console.log(reqBody, req.body);
    const user = new User(reqBody);
    console.log(user);
    await user.save();
    return res.status(200).send(user);
})

app.put("/update", async (req, res) =>
{
    const findUser = await User.findById(req.body.id);
    findUser.name = req.body.name;
    findUser.email = req.body.email;
    findUser.password = req.body.password;
    await findUser.save();

    return res.status(201).send(findUser);

})

app.post("/login", async (req, res) =>
{
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(404).send("User not found");
    return res.status(200).send(user);
})
const StartServer = async () =>
{ 
   try {
    
       mongoose.connect(Database)
       console.log("Connected to Database")
       app.listen(PORT, () =>
{ 
    console.log(`Server is running on port ${PORT}`);
})
       
   } catch (error) {
console.log(error);
   }
}


StartServer();
