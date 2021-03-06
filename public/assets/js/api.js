const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
      // const data = await res.json();
      // console.log(res.text());
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    //TODO returning nothing
    console.log(json);
    //returning last in array
    return json[json.length - 1];
  },
  async addExercise(data) {
    const id = location.search.split("=")[1];

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  //wtf is this? what's range?
  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
