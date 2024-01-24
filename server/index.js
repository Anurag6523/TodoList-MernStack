const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Modellist = require("./Models/todos");

const app = express();
app.use(cors());
app.use(express.json());

main()
  .then(() => {
    console.log("DB is working perfectly");
  })
  .catch((err) => console.error(err));

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/todos2');
    console.log("DB connection successful");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err; // Propagate the error to the caller
  }
}

app.get("/get", (req, res) => {
    Modellist.find()
    .then((results) => res.json(results))
    .catch((err) => res.json(err));
});

app.post("/add", async (req, res) => {
    const task = req.body.task;
    try {
      let newTask = new Modellist({
        task: task,
      });
      const result = await newTask.save();
      res.json(result);
    } catch (err) {
      console.error("Error adding task:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.put("/update/:id", async(req,res)=>{
    try{
        const {id}= req.params;
        let updateTask= await Modellist.findByIdAndUpdate({_id:id}, {done:true});
        console.log(updateTask);      
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
});

app.delete("/delete/:id", async(req, res)=>{
    try{
        const {id}= req.params;
        let deleteTask= await Modellist.findByIdAndDelete({_id:id});
        console.log(deleteTask);      
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
})

app.listen(8080, () => {
  console.log("Server is working on port 8080");
});
