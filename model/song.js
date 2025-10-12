const mongoose = require('mongoose')
const model = mongoose.model('song',{
    name : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    }},
)


module.exports = {model}


