const mongoose = require("mongoose")
require("dotenv").config({ quiet: true })

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_CONNECT)
        console.log("[BE] MongoDB Connected Successfully")

    } catch(err) {
        console.log("error :", err)
    }
}

module.exports = dbConnect