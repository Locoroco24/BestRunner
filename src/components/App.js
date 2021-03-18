import React, { useState} from 'react';
import './App.css';
import Table from "./SportTable/Table";
import Popup from "./SportTable/Popup";

function App() {

    const config = () => {
        if(JSON.parse(localStorage.getItem('workouts')) === null) return [];
        return JSON.parse(localStorage.getItem('workouts'));
    };

    const [workouts, setWorkout] = useState(config);

    const typeList = [
        {value: 'Без фильтра', id: 'noFilter'},
        {value: 'Бег', id: 'run'},
        {value: 'Велосипед', id: 'bike'},
        {value: 'Лыжи', id: 'ski'},
        {value: 'Хотьба', id: 'walking'},
    ];

    const addRow = () => {
        const copyRows = [...workouts];
        const newWorkout = JSON.parse(localStorage.getItem('workoutData'));
        copyRows.push(newWorkout);
        localStorage.setItem('workouts', JSON.stringify(copyRows));

        setWorkout(copyRows);
    };

    const deleteRow = (key) => {
        const copyRows = [...workouts];
        const index = copyRows.findIndex(row => row.key === key);
        copyRows.splice(index, 1);
        localStorage.setItem('workouts', JSON.stringify(copyRows));

        setWorkout(copyRows);
    };

    const editRow = (key) => {
        const editRow = workouts.findIndex( row => row.key === key )
        console.log(workouts[editRow])
    }

    const filterType = (event) => {
        const targetFilter = event.target.value;
        const filterWorkouts = JSON.parse(localStorage.getItem('workouts')).filter( item => {
            if (targetFilter !== 'Без фильтра') {
                return item.type === targetFilter;
            }
            return workouts;
        } );

        setWorkout(filterWorkouts);
    };


    return (
        <div className="container">
                <Table
                    workouts={workouts}
                    filterType={filterType.bind(this)}
                    typeList={typeList}
                    deleteRow={deleteRow}
                    editRow={editRow}
                 />
                <Popup
                    addRow={addRow.bind(this)}
                    typeList={typeList}
                />
        </div>
    )
}

export default App;
