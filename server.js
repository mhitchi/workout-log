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

// app.get(`/exercise?id=${id}`, (req, res) => {

// });

//add workouts to plan
//POST `/api/workouts/${id}`
//TODO get id
app.put("/api/workouts/:id?", (req, res) => {
  //if cardio, get name, duration, distance
  if( req.body.type === "cardio" ) {
    db.Workout.create(
      {
        name: req.body.name,
        type: req.body.type,
        duration: req.body.duration,
        distance: req.body.distance,
      }
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
    //if resistance, get name, weight, sets, reps, duration
  } else {
    db.Workout.create(
      {
        name: req.body.name,
        type: req.body.type,
        weight: req.body.weight,
        sets: req.body.sets,
        reps: req.body.reps,
        duration: req.body.resistance-duration,
      }
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  }
});

//add new workouts to new plan
//POST `/api/workouts`

//view combined weight on stats page

//Start server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
});