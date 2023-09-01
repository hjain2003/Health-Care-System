import User from "../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import pkg from 'bcryptjs';
const { hashSync } = pkg;

export const signup = async (req, res) => {
    const { name, email, password, cpassword, phone, role} = req.body;

    if (!name || !email || !password || !cpassword) {
        return res.status(422).json({ error: "empty fields!" });
    }
    if (password !== cpassword) {
        return res.status(422).json({ error: "passkey and the confirm passkey fields do not match!" });
      }

    try {
        const userExists = await User.findOne({ email : email });
        if (userExists) {
            return res.status(422).json({ error: "User already exists!" });
        }

        const hashedPassword = pkg.hashSync(password);
        const hashedCPassword = pkg.hashSync(cpassword);
        const user = new User({ name, email, password: hashedPassword, cpassword: hashedCPassword, phone, role : 'patient'});
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

        const userLogin = await User.findOne({email : email}) 

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

export const userDetails = async (req, res) => {
    res.send(req.rootUser);
}

export const logout = async (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).json({ message: "user logged out" });
}

export const resetPassword = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
        return res.status(400).json({ message: "Please provide all fields." });
    }

    try {
        const user = await User.findOne({
            email: { $regex: new RegExp(email, "i") } // Perform case-insensitive search
        });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect." });
        }

        const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error." });
    }
};

