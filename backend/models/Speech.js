const mongoose = require('mongoose')

const speechSchema = new mongoose.Schema({
    vector_store_data:{
        type:Buffer,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("speech", speechSchema)