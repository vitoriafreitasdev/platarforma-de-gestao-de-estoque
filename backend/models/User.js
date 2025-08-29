const mongoose = require("mongoose")
const {StockSchema} = require("./Stock.js")
const {Schema} = mongoose

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true 
        },
        password: {
            type: String,
            required: true 
        },
        role: {
            type: String,
            enum: ['Admin', 'Requester'],
            required: true
        },
        products: {
            type: []
        }
    },
    {timestamps: true}
)

const User = mongoose.model("User", userSchema)

module.exports = User