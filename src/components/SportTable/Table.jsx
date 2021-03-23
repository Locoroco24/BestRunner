import React, {useState} from 'react';
import {connect} from 'react-redux';
import useSortableData from "./SortableData";
import { css } from '@emotion/css';
import {Table, Td, Th, Button, H1, P, Select, deleteBtn, editBtn, addWorkoutBtn} from "../Styled";
import Popup from "../Popup/Popup";
import {addWorkout, deleteWorkout, editWorkout, filterWorkout} from "../../redux/actions";

const WorkoutTable = ({workouts}) => {

    // const config = () => {
    //     if(JSON.parse(localStorage.getItem('workouts')) === null) return [];
    //     return JSON.parse(localStorage.getItem('workouts'));
    // };

    // const [workouts, setWorkout] = useState(config);

    const typeList = [
        {value: 'Без фильтра', id: 'noFilter'},
        {value: 'Бег', id: 'run'},
        {value: 'Велосипед', id: 'bike'},
        {value: 'Лыжи', id: 'ski'},
        {value: 'Хотьба', id: 'walking'},
    ];

    const addRow = () => {
        const newWorkout = JSON.parse(localStorage.getItem('workoutData'));
        workouts.push(newWorkout);
        localStorage.setItem('workouts', JSON.stringify(workouts));
        addWorkout(JSON.parse(localStorage.getItem('workouts')))
    };


    // localStorage.clear()

    const deleteRow = (key) => {
        const copyRows = [...workouts];
        const index = copyRows.findIndex(row => row.key === key);
        copyRows.splice(index, 1);
        localStorage.setItem('workouts', JSON.stringify(copyRows));

        deleteWorkout(copyRows);
    };

    const editRow = (key) => {
        let rowIndex = workouts.findIndex( row => row.key === key );
        console.log(rowIndex)
        workouts[rowIndex] = JSON.parse(localStorage.getItem('workoutData'))
        const copyRows = [...workouts]
        localStorage.setItem('workouts', JSON.stringify(copyRows));

        editWorkout(copyRows)
    };

    const filterType = (event) => {
        const targetFilter = event.target.value;
        const filterWorkouts = JSON.parse(localStorage.getItem('workouts')).filter( item => {
            if (targetFilter !== 'Без фильтра') {
                return item.type === targetFilter;
            }
            return workouts;
        } );

        filterWorkout(filterWorkouts);
    };

    const { items, requestSort, sortConfig } = useSortableData(workouts);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <div>
            <H1>BestRunner</H1>
            <div
                className={css`
                margin-top: 30px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
            `}>
                <P>Фильтрация по типу тренировки</P>
                <Select onChange={filterType}>
                    {typeList.map( (type, index) => (
                        <option
                            key={index}
                            value={type.value}
                        >
                            {type.value}
                        </option>
                    ))}
                </Select>
            </div>
            <Table>
                <thead>
                <tr>
                    <Th>
                        <Button
                            type='button'
                            onClick={() => requestSort('date')}
                            className={getClassNamesFor('date')}
                        >
                            Дата тренировки
                        </Button>
                    </Th>
                    <Th>
                        <Button
                            type='button'
                            onClick={() => requestSort('type')}
                            className={getClassNamesFor('type')}
                        >
                            Тип тренировки
                        </Button>
                    </Th>
                    <Th>
                        <Button
                            type='button'
                            onClick={() => requestSort('distance')}
                            className={getClassNamesFor('distance')}
                        >
                            Километраж
                        </Button>
                    </Th>
                    <Th>
                        Комментарии
                    </Th>
                    <Th>
                        Управление
                    </Th>
                </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.key}>
                            <Td>{item.date}</Td>
                            <Td>{item.type}</Td>
                            <Td>{item.distance}</Td>
                            <Td>{item.description}</Td>
                            <Td>
                                <Popup
                                    manageRow={editRow}
                                    typeList={typeList}
                                    AcceptBtnType='Редактировать тренировку'
                                    defaultValues={workouts[workouts.findIndex(workout => workout.key === item.key)]}
                                    class={editBtn}
                                />
                                <button
                                    onClick={() => deleteRow(item.key)}
                                    className={deleteBtn}
                                >
                                </button>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Popup
                manageRow={addRow}
                typeList={typeList}
                class={addWorkoutBtn}
                modalBtnType='Добавить тренировку'
                AcceptBtnType='Добавить тренировку'
            />
        </div>
    )
}



const mapStateToProps = state => {
    return {
        workouts: state.workouts.workouts,
    }}

const mapDispatchToProps = {
    addWorkout
}


export default connect(mapStateToProps, mapDispatchToProps)(WorkoutTable)