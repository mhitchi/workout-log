const express = require("express");
const logger = require("morgan")
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const dbName = "workouts";

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/${dbName}`, { useNewUrlParser: true });

//get main page
app.get("/", (req, res) => {
  res.sendFile("./public/index.html");
});

//get form page
app.get("/exercise", (req, res) => {
  res.sendFile(`${__dirname}/public/exercise.html`);
});

//add workouts to plan
//POST `/api/workouts/${id}`
//TODO get id
app.post("/api/workouts", ({body}, res) => {
  db.Workout.create({body})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//add new workouts to new plan
//POST `/api/workouts`

//view combined weight on stats page

//Start server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
});