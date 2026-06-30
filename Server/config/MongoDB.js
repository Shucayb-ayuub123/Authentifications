import mongoose from "mongoose";

const ConnectDB = async () => {
    mongoose.connection.on('Connected' , () => console.log("Database is connected"))
    await mongoose.connect(`${process.env.MONGO_URL}/mernAuth`)
}

export default ConnectDB    