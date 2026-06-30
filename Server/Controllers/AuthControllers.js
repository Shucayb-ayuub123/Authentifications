import usermodel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

export const registered = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing Details" })

    }

    try {

        const ExistingUser = await usermodel.findOne({ email })
        if (ExistingUser) {
            res.json({ success: false, message: "User already Exists" })
        }

        const HashedPassword = await bcrypt.hash(password, 10)

        const user = new usermodel({ name, email, password: HashedPassword })

        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.secretKey, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({ success: true })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


export const Login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ success: false, message: "Missing Details" })

    }

    try {

        const ExistingUser = await usermodel.findOne({ email })
        if (ExistingUser) {
            res.json({ success: false, message: "User not Found" })
        }

        const isMatched = await bcrypt.compare(password, ExistingUser.password)

        if (!isMatched) {

            return res.json({ success: false, message: "invalid password" })
        }


        const token = jwt.sign({ id: user._id }, process.env.secretKey, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({ success: true })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
export const Logout = async (req, res) => {


    try {

        res.clearCookie('token', token, {
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