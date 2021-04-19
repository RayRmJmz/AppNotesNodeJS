const fs = require("fs")
const chalk = require("chalk")
const { timeEnd } = require("console")

const addNote = function(title, body){
    console.log(chalk.green.bold("Function addNote"))
    let notes = loadNotes()
    console.log("Notes before push ", notes)

    const duplicatedNotes = notes.filter(function(note){
        return note.title === title
    })

    if(duplicatedNotes.length === 0){
        note = {
            title : title,
            body : body
        }
        notes.push(note)
        console.log("Notes after push ", notes)
        saveNotes(notes)
    }else{
        console.log(chalk.keyword('orange').bold("Note already exist!"))
    }
}

const saveNotes = function(notes){
    //JSON.stringify convert a JavaScript object to JSON string
    //JSON.parse convert a JSON string to JavaScript objec
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", notesJSON)
}

const loadNotes = function(){
    try{
        dataBuffer = fs.readFileSync("notes.json")
        data = dataBuffer.toString()
        notesJSON = JSON.parse(data)
        return notesJSON
    }catch(e){
        console.log("File doesn't exist!")
        return []
    }
}

const removeNote = function(title){
    console.log(chalk.red.bold("Removing note"))
    let notes = loadNotes()
    //console.log(chalk.blue("Notes before remove ", notes))
    console.log("Notes before remove ", notes)
    const notesToKeep = notes.filter(function(note){
        return note.title != title
    })

    if(notesToKeep.length != notes.length){
        saveNotes(notesToKeep)
        console.log(chalk.red.bold("Note removed ", title))
        console.log(chalk.green.bold("Updated notes "))
        console.log(notes = loadNotes())
    }else{
        console.log(chalk.keyword('orange').bold("Title", chalk.red.underline("%s") + " doesn´t exist!"),title)
        console.log(notes = loadNotes())
    }
}

const listNotes = function(){
    console.log(chalk.green.bold("Listing notes"))
    const notes = loadNotes()
    notes.forEach(function(elemento){
        console.log(chalk.blue("Title: ") + elemento.title +  chalk.blue(" Body: ") + elemento.body)
    })
}

const readNote = function(title){
    console.log(chalk.green.bold("Searching note with title ") + chalk.yellow.bold(title))
    const notes = loadNotes()

    const findNote = notes.find(function(elemento){
        return elemento.title === title
    })

    if(!findNote){
        console.log(chalk.keyword('orange').bold("Note not found ") + chalk.yellowBright.bold(title))
    }else{
        console.log(findNote)
    }



}

const alterTitle = function(title, newTitle){
    console.log(chalk.green.bold("Searching note with title ") + chalk.yellow.bold(title))
    let notes = loadNotes()

    notes.forEach(function(elemento){
        if (elemento.title === title){
            elemento.title = newTitle
            console.log(chalk.green.bold("Title updated to ") + chalk.yellow.bold(newTitle))
        }
    })
    const oldNotes = loadNotes()
    if (JSON.stringify(notes) !== JSON.stringify(oldNotes)){
        saveNotes(notes)
        console.log(loadNotes())
    }else{
        console.log(chalk.yellow.bold("Title not found"))
    }

}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote,
    alterTitle : alterTitle
}