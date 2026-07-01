import usermodel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import transporter from "../config/nodemailer.js"
import "dotenv/config"

export const registered = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        const ExistingUser = await usermodel.findOne({ email });

        if (ExistingUser) {
            return res.json({ success: false, message: "User already Exists" });
        }

        const HashedPassword = await bcrypt.hash(password, 10);

        const user = new usermodel({
            name,
            email,
            password: HashedPassword
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id },
            process.env.secretKey,
            { expiresIn: '7d' }
        );

        res.cookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        await transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: "Welcome",
            text: "Hello! Welcome to my application."
        });

       
        return res.json({ success: true });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


export const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "Missing Details"
        });
    }

    try {
        const ExistingUser = await usermodel.findOne({ email });

        if (!ExistingUser) {
            return res.json({
                success: false,
                message: "User not Found"
            });
        }

        const isMatched = await bcrypt.compare(
            password,
            ExistingUser.password
        );

        if (!isMatched) {
            return res.json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            { id: ExistingUser._id },
            process.env.secretKey,
            { expiresIn: "7d" }
        );

        res.cookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({
            success: true
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};




export const Logout = async (req, res) => {


    try {

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true, message: "Logged out" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}