const mongoose = require('mongoose');

const userscema = mongoose.Schema({
    name : {
        require : true,
        type : String,
        trim : true,
    },
    email : {
        require : true,
        type : String,
        trim : true,
        validate : {
            validator : (value) => {
                const re =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);                
            },
            message : 'pleasr enter  a valid email address',
        },
    },
    password : {
        require : true,
        type : String,
        validate : {
            validator : (value) =>{
                return value.length>6;
            },
            message : 'password should be of  atleast 6 char',
        } 
    }
})

const user = mongoose.model("user",userscema);
module.exports = user;