const mongoose = require('mongoose')
const model = mongoose.model('song',{
    nama_pengirim : {
        type : String,
        required : true
    },
    nama_penerima : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    song : {
        type : String,
        required: true,
    },
    data : [{
        url : {type : String},
        penyanyi : {type : String },
        cover : {type : String },
        }]
    
},
)

module.exports = model


