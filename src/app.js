const express = require("express");
const notes = require("./notes");

//create server
//create an application object that represents my web application using a server

//to run app node src/app.js
const app = express();

// difene server listening port
const port = 3000;

app.set("view engine", "ejs");
//app.use(express.static(__dirname+"/views"));

app.use(express.static("public"))

//middleware 
app.use(express.urlencoded({
    extended : true
}));

app.get("/", function(request, response){
  //response.send("Hello world");
  const notes_array = notes.listNotes();
  message = "";
  response.render("index",{
    notes_array : notes_array,
    message : message
  });
});

app.post("/add_note", function(request, response){
  const title = request.body.title;
  const body = request.body.body;
  const addNote = notes.addNote(title, body);
  const notes_array = notes.listNotes();
  if(addNote){
    console.log("true");
    response.render("index",{
      notes_array : notes_array
    });
  }else{
    message = "Note already exist  " + title + " " + body;
    response.render("error",{
      message : message
    });
  }
  response.redirect("/");
});

app.post("/deleteNote", function(request, response){
  const title = request.body.title;
  const retrieve = notes.removeNote(title);
  if(retrieve){
    const notes_array = notes.listNotes();
    response.render("index",{
      notes_array : notes_array
    });
  }else{
    message = "Note could not be deleted: " + title ;
    response.render("error",{
      message : message
    });
  }
});

app.post("/updateNote", function(request, response){
  const title = request.body.title;
  const body = request.body.body;
  response.render("updateNote",{
    title : title,
    body : body
  });
});


app.post("/update", function(request, response){
  const title = request.body.title;
  const body = request.body.body;
  const retrieve = notes.updateNote(title,body);
  if(retrieve){
    const notes_array = notes.listNotes();
    response.render("index",{
      notes_array : notes_array
    });
  }else{
    message = "Note could not be updated: " + title ;
    response.render("error",{
      message : message
    });
  }
});

app.post("/search", function(request, response){
  const title = request.body.title;
  const retrieve = notes.readNote(title);
  if(retrieve === false){
    message = "Note not foud " + title ;
    response.render("error",{
      message : message
    });
  }else{
    response.render("search",{
      retrieve : retrieve
    });
  }
});


app.get("/list_notes", function(request, response){
  const notes_array = notes.listNotes();
  response.render("list_notes",{
      notes_array : notes_array
  });
});


  



app.listen(port, function(){
    console.log("Listenning at http://localhost:3000");
});