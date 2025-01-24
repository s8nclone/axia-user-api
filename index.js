const express = require("express");
const connectDB = require("./config/db");
const userRoute = require("./routes/user.route");
const port = process.env.PORT || 5000;
const date = new Date();

//initialize express
const app = express();
app.use(express.json());

//connect database
connectDB();

//define routes
app.use(userRoute);

//listen to port
app.listen(port, () => {
    console.log(`Server is running on port ${port}. ${date}`)
});