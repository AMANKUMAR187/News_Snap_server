const express  = require('express');
const user = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../midware/auth');

const authrouter = express.Router();

authrouter.get('/',(req,res)=>{
  res.send("hello world!");
});

authrouter.post('/api/signup', async(req,res)=>{
       
         try{
            const {name,email,password} = req.body;
          const existing = await user.findOne({email});
         if(existing){
           return res.status(400).json({msg : "user with same email already exists"});
         }

         const hashedpass = await bcrypt.hash(password,8);

         let u  = new user({
            name,
            email,
            password : hashedpass,
         }); 
         
         u  = await u.save();
          res.json(u);
         }
         catch (err){
            return res.status(500).send({error : err.message});
         }

});
authrouter.post('/api/signin',async (req,res) => {
 try{
  const {email,password} = req.body;
  const userr  = await user.findOne({email});
  if(!userr)
    return res.status(400).json({msg : "user not found"});
  const ismatch = await bcrypt.compare(password,userr.password);
  if(!ismatch){
    return res.status(400).json({msg: 'wrong password entered! '});
       }
       const  token  = jwt.sign({id:userr._id},"passwordkey");
       res.json({token, ...userr._doc});  

 }
 catch(err){
       res.status(500).json({msg : err.message});
 } 
})

authrouter.post('/tokenisvalid',async(req,res) =>{
    try{
       const token = req.header('x-auth-token');
       if(!token)return res.json(false);
       const verified = jwt.verify(token,'passwordkey');
       if(!verified)return res.json(false);

       const userr = await user.findById(verified.id);
       if(!userr)return res.json(false);
       return res.json(true);

    }
    catch(err){
       res.status(500).json({msg : err.message});
    }
});

authrouter.get('/u',auth ,async (req,res)=>{
    console.log(req.user);
    const u  = await user.findById(req.u);
    console.log(user);
    res.json({...u._doc, token : req.token});
});

module.exports = authrouter;