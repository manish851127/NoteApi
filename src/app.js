// Intializing
const express= require("express");
const app= express();
const port= process.env.PORT || 3000;

// connect mongodb
const mongoose=require("mongoose");

const Note= require("./models/Note");

const bodyParse=require("body-parser");
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());


mongoose.connect("mongodb+srv://manishk07:Manish%40%23123@cluster0.ykwmg.mongodb.net/?retryWrites=true&w=majority&appName=Notesdb").then(function(){

app.get("/",async function(req, res){
    const response= {message:"Welcome to our api"};
    res.json(response);
});

app.post("/notes/list", async function(req,res){
    var notes=await Note.find({userId:req.body.userId});
    res.json(notes);

});

app.post("/notes/add", async function(req,res){
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

app.post("/notes/delete",async function(req,res){
   await Note.deleteOne({id:req.body.id});

    const reponse= {message:"Notes deleted"+ `id${req.body.id}`}
      res.json(reponse);
});


});




// Starting the server on a root
app.listen(port, () => {
    console.log('connection is live at port no. ${port}');
})