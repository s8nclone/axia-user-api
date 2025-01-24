const User = require("../models/user.model");
const bcrypt = require("bcrypt");

//create user
const CreateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //check if user exists
        const existingUser = await User.findOne({ email });

        //if user exists return with error message
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //encrypt user password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        //save user to database
        await newUser.save();
        res.status(201).json({ message: "User account created successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error, please try again.");
    }
}

//authneticate user
const AuthenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if user exists
        const findUser = await User.findOne({ email});

        if (!findUser) {
            return res.status(400).json({ message: "Invalid credentials, please try again or signup." });
        }

        //validate user password
        const validatePassword = await bcrypt.compare(password, findUser.password);

        if (!validatePassword) {
            return res.status(400).json({ message: "Invalid credentials, please try again or signup." });
        }

        res.status(200).json({ message: "User authenticated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error, please try again.");
    }
}

//delete user
const DeleteUser = async (req, res) => {
    try {
        const { email } = req.body;

        //check if user exists
        const findUser = await User.findOne({ email });

        //if user does not exist return with error message
        if (!findUser) {
            return res.status(400).json({ message: "User not found." });
        }

        //delete user by email
        await User.findOneAndDelete({ email });
        res.status(201).json({ message: "User deleted successfully!"});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error, please try again.");
    }
}


module.exports = { 
    CreateUser,
    AuthenticateUser,
    DeleteUser 
};