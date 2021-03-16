import React, { useState} from 'react'
import './App.css';
import Table from "./SportTable/Table";
import Popup from "./SportTable/Popup";

function App() {

    const config = () => {
        if(JSON.parse(localStorage.getItem('workouts')) === null) return []
        return JSON.parse(localStorage.getItem('workouts'))
    }

    const [workouts, setWorkout] = useState(config)

    const typeList = [
        {value: 'Без фильтра', id: 'noFilter'},
        {value: 'Бег', id: 'run'},
        {value: 'Велосипед', id: 'bike'},
        {value: 'Лыжи', id: 'ski'},
        {value: 'Хотьба', id: 'walking'},
        {value: 'Силовая', id: 'gym'}
    ]

    const addRow = () => {
        let copyRows = [...workouts]
        let newWorkout = JSON.parse(localStorage.getItem('workoutData'))
        copyRows.push(newWorkout)
        localStorage.setItem('workouts', JSON.stringify(copyRows))


        setWorkout(copyRows)
    }

    const filterType = (event) => {
        let targetFilter = event.target.value
        let filterWorkouts = JSON.parse(localStorage.getItem('workouts')).filter( item => {
            if (targetFilter !== 'Без фильтра') {
                return item.type === targetFilter
            }
            return workouts
        } )


        setWorkout(filterWorkouts)
    }


    return (
        <div className="App">
            <Table
                workouts={workouts}
                filterType={filterType.bind(this)}
                typeList={typeList}
             />
            <Popup
                addRow={addRow.bind(this)}
                typeList={typeList}
            />
        </div>
    )
}

export default App;
