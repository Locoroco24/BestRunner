import React, { useState} from 'react'
import './App.css';
import Table from "./SportTable/Table";
import Popup from "./SportTable/Popup/Popup";

function App() {

  const [workouts, setWorkout] = useState([
      {id: 1, date: new Date().toString().split(' ').slice(0, 4).join(' '), type: 'Плаванье', distance: '10км', description: 'Было легко', edit: 'Кнопка'},
      {id: 2, date: new Date().toString().split(' ').slice(0, 4).join(' '), type: 'Бег', distance: '12км', description: 'Было сложно', edit: 'Кнопка'}
      ])

  const addRow = () => {
      let copyRows = [...workouts]
      copyRows.push({id: 3, date: new Date().toString().split(' ').slice(0, 4).join(' '), type: 'Бег', distance: '14км', description: 'Было сложно', edit: 'Кнопка'})
      setWorkout(copyRows)
  }


  return (
      <div className="App">
          <Table
              workouts={workouts}
          />

              <Popup
                  addRow={addRow.bind(this)}
              />
      </div>
  )
}

export default App;
