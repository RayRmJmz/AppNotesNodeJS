const express = require("express");
const notes = require("./notes");

//create server
//create an application object that represents my web application using a server
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
    response.render("index", {
        message : "Welcome to app notes"
    });
});

app.post("/add_note", function(request, response){
    const title = request.body.title;
    const body = request.body.body;
    notes.addNote(title, body);
    response.redirect("/notes_created");
});

app.get("/notes_created", function(request, response){
    response.render("notes_created");
});

app.listen(port, function(){
    console.log("Listenning at http://localhost:3000");
});