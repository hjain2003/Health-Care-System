import User from "../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import pkg from 'bcryptjs';
const { hashSync } = pkg;

export const signup = async (req, res) => {
    const { name, email, password, phone, role} = req.body;

    if (!name || !email || !password || !role || !phone) {
        return res.status(422).json({ error: "empty fields!" });
    }

    try {
        const userExists = await User.findOne({ email : email });
        if (userExists) {
            return res.status(422).json({ error: "User already exists!" });
        }

        const hashedPassword = pkg.hashSync(password);
        const user = new User({ name, email, password: hashedPassword, phone, role});
        const userRegister = await user.save();

        if (userRegister) {
            res.status(201).json({ message: "user registered successfully!" });
        } else {
            res.status(422).json({ error: "Registration failed" });
        }
    } catch (err) {
        console.log(err);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Fields empty!" });
        }

        const userLogin = await User.findOne({
            email: { $regex: new RegExp(email, "i") } // Perform case-insensitive search
        });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (isMatch) {
                const token = await userLogin.generateAuthToken();
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });
                res.status(201).json({
                    message: "Logged in!",
                    role: userLogin.role,
                    token: token,
                    name: userLogin.name,
                    email: userLogin.email,
                });
            } else {
                res.status(400).json({ message: "Password incorrect!" });
            }
        } else {
            return res.status(400).json({ message: "User does not exist!" });
        }
    } catch (err) {
        console.log(err);
    }
}