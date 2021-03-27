const express = require('express');
const fs = require('fs');

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + '/public'));

const filePath = 'workouts.json';

app.get('/api/workouts', function(req, res) {
  const content = fs.readFileSync(filePath,'utf8');
  const workouts = JSON.parse(content);
  res.send(workouts);
});

app.post('/api/workouts', jsonParser, function (req, res) {

  if (!req.body) return res.sendStatus(400);

  const workoutType = req.body.type;
  const workoutDate = req.body.date;
  const workoutDistance = req.body.distance;
  const workoutDescription = req.body.description;
  const workout = {
    type: workoutType,
    date: workoutDate,
    distance: workoutDistance,
    description: workoutDescription,
    key: `${Date.now()}`,
  };

  let data = fs.readFileSync(filePath, 'utf8');
  const workouts = JSON.parse(data);

  workouts.push(workout);
  data = JSON.stringify(workouts);

  fs.writeFileSync('workouts.json', data);
  res.send(workout);
});

app.delete('/api/workouts/:key', function(req, res) {

  const key = req.params.key;

  if (!key) {
    res.status(404).send();
  }

  let data = fs.readFileSync(filePath, 'utf8');
  const workouts = JSON.parse(data);
  const index = workouts.findIndex(item => item.key == key);

  const workout = workouts.splice(index, 1)[0];

  data = JSON.stringify(workouts);
  fs.writeFileSync(filePath, data);

  res.send(workout);
});

app.put('/api/workouts', jsonParser, function(req, res) {

  if (!req.body) return res.sendStatus(400);

  const workoutType = req.body.type;
  const workoutDate = req.body.date;
  const workoutDistance = req.body.distance;
  const workoutDescription = req.body.description;
  const workoutKey = req.body.key;

  let data = fs.readFileSync(filePath, 'utf8');
  const workouts = JSON.parse(data);

  const index = workouts.findIndex(item => item.key === workoutKey);

  const workout = workouts[index];

  if (workout) {
    workout.type = workoutType;
    workout.date = workoutDate;
    workout.distance = workoutDistance;
    workout.description = workoutDescription;
    data = JSON.stringify(workouts);
    fs.writeFileSync('workouts.json', data);
    res.send(workout);
  }
  else {
    res.status(404).send(workout);
  }
});

const port = 3002;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

module.exports = app;
