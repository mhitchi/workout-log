const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  //declare data types for fields
  name:
    {
      type: String,
      required: "Name is required."
    },
  type:
    {
      type: String,
      required: "Type is required"
    },
  weight: Number,
  sets: 
    {
      type: Number,
      required: "Sets are required"
    },
  reps:
    {
      type: Number,
      required: "Sets are required"
    },
  duration: Number,
  isCardio: Boolean,
  distance: Number
});

const WorkoutSchema = new Schema({
  exercises: [ExerciseSchema],
  day: Date
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;