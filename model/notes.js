const mongoose = require('mongoose');

const notescema  = mongoose.Schema({
    user_id :{
        require : true,
        type : String,
    },
    headline : {
         require : true,
         type : String,
    },
    des : {
         type : String,
    },
    date : {
          type : String,
    }


})
const notes = mongoose.model('notes',notescema);
module.exports = notes;