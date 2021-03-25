import express from 'express';
import fs from 'fs';
// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + '/public'));

const filePath = 'workouts.json';
app.get('/api/workouts', function(req, res) {

    const content = fs.readFileSync(filePath,"utf8");
    const workouts = JSON.parse(content);
    res.send(workouts);
});

app.get('/api/workouts/:key', function(req, res) {

    const key = req.params.key;
    const content = fs.readFileSync(filePath, "utf8");
    const workouts = JSON.parse(content);
    let workout = null;
    for (let i = 0; i < workouts.length; i++) {
        if (workouts[i].key == key){
            workout = workouts[i];
            break;
        }
    }

    if (workout) {
        res.send(workout);
    }
    else {
        res.status(404).send();
    }
});

app.post('/api/workouts', jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const workoutType = req.body.type;
    const workoutDate = req.body.date;
    const workoutDistance = req.body.distance;
    const workoutDescription = req.body.description;
    let workout = {
        type: workoutType,
        date: workoutDate,
        distance: workoutDistance,
        description: workoutDescription,
        key: `${type}_${Date.now()}`
    };

    let data = fs.readFileSync(filePath, "utf8");
    let workouts = JSON.parse(data);

    workouts.push(workout);
    data = JSON.stringify(workouts);

    fs.writeFileSync('workouts.json', data);
    res.send(workout);
});

app.delete('/api/workouts/:key', function(req, res) {

    const key = req.params.key;
    let data = fs.readFileSync(filePath, "utf8");
    let workouts = JSON.parse(data);
    let index = -1;

    for (let i = 0; i < workouts.length; i++) {
        if (workouts[i].key == key){
            index=i;
            break;
        }
    }
    if (index > -1) {

        const workout = workouts.splice(index, 1)[0];
        data = JSON.stringify(workouts);
        fs.writeFileSync("users.json", data);

        res.send(workout);
    }
    else {
        res.status(404).send();
    }
});

app.put('/api/workouts', jsonParser, function(req, res) {

    if (!req.body) return res.sendStatus(400);

    const workoutType = req.body.type;
    const workoutDate = req.body.date;
    const workoutDistance = req.body.distance;
    const workoutDescription = req.body.description;
    const workoutKey = req.body.key;

    let data = fs.readFileSync(filePath, "utf8");
    const workouts = JSON.parse(data);
    let workout;
    for (let i = 0; i < workouts.length; i++) {
        if (workouts[i].key == workoutKey) {
            workout = workouts[i];
            break;
        }
    }

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

app.listen(3000, function() {
    console.log("Сервер ожидает подключения...");
});