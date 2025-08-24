const mongoose = require("mongoose")
const {Schema} = mongoose

const StockSchema = new Schema(
    {
        name: {
            type: String,
            require: true 
        },
        unitsAvailable: 
        {
            type: Number,
            require: true
        },
        priceUnit:
        {
            type: Number,
            require: true 
        },
        isAvailable:
        {
            type: Boolean,
            require: true
        }
    },
    {timestamps: true}
)

module.exports = StockSchema