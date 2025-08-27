const mongoose = require("mongoose")
const {Schema} = mongoose

const StockSchema = new Schema(
    {
        src: {
            type: String,
            required: true
        },
        name: 
        {
            type: String,
            required: true 
        },
        unitsAvailable: 
        {
            type: Number,
            required: true
        },
        priceUnit:
        {
            type: Number,
            required: true 
        },
        isAvailable:
        {
            type: Boolean,
            required: true
        }
    },
    {timestamps: true}
)

const Stock = mongoose.model("Stock", StockSchema)

module.exports = {
    Stock,
    StockSchema
}