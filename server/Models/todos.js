const  mongoose = require("mongoose");

const TodoSchema= new mongoose.Schema({
    task: String,
    done: {
        type: Boolean,
        default: false
    }
});

const Modellist= mongoose.model("Modellist" , TodoSchema);
module.exports= Modellist;