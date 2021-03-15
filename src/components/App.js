import React, { Component } from 'react'
import './App.css';
import Table from "./SportTable/Table";
import Popup from "./SportTable/Popup/Popup";

class App extends Component {

  state = {
    workouts: [
      {id: 1, date: new Date().toString().split(' ').slice(0, 4).join(' '), type: 'Плаванье', distance: '10км', description: 'Было легко', edit: 'Кнопка'},
      {id: 2, date: new Date().toString().split(' ').slice(0, 4).join(' '), type: 'Бег', distance: '12км', description: 'Было сложно', edit: 'Кнопка'}
    ],

    addRow() {
      let newRows = this.state.workouts
      newRows.push({id: 3, date: new Date().toString().split(' ').slice(0, 4).join(' '), type: 'Бег', distance: '14км', description: 'Было сложно', edit: 'Кнопка'})
      this.setState({workouts: newRows})
    }
  }

  render() {

    return (
        <div className="App">
          <Table
              workouts={this.state.workouts}
          />

            <Popup />
        </div>
    )
  }
}

export default App;
