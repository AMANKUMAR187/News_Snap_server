const express = require('express');
const note = require('../model/notes');
const mongodb = require('mongodb');
const noterouter = express.Router();

noterouter.post('/api/save_note',async(req,res)=>{
 try{
   const {user_id,headline,des,date } = req.body;
   let n = new note({
    user_id,
    headline,
    des,
    date,
   });

   n = await n.save();
   res.json(n);

 }
 catch(err){
    res.status(500).send({msg : err.message});
 }

});

noterouter.post('/api/fetch_notes',async (req,res)=>{
  try{
    const {user_id} = req.body;
    let notes =await note.find({user_id});
    res.status(200).json({"success":notes});
  }
  catch(err){
      res.status(500).send({msg : err.message});
  }
});

noterouter.delete('/api/deletenotes:id', async (req,res) =>{
   try{
     const result = await note.deleteOne({_id :new mongodb.ObjectId(req.params.id)});
     res.status(200).send({msg : "Note deleted successfully"}); 

   } 
   catch(err){
        res.status(500).send({msg : err.message});
   }
});



module.exports  = noterouter;