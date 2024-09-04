const express= require("express");
const router= express.Router();

const Note=require("./../models/Note");

router.post("/list", async function(req,res){
    var notes=await Note.find({userId:req.body.userId});
    res.json(notes);

});

router.post("/add", async function(req,res){
    await Note.deleteOne({id:req.body.id});

    const newNotes= new  Note({
        id: req.body.id,
        userId:req.body.userId,
        title:req.body.title,
        content:req.body.content

     });
     await newNotes.save();

     const reponse= {message:"new notes created"+ `id: ${req.body.id}`};
     res.json(reponse);
    
});

router.post("/delete",async function(req,res){
   await Note.deleteOne({id:req.body.id});

    const reponse= {message:"Notes deleted"+ `id${req.body.id}`}
      res.json(reponse);
});
module.exports=router;