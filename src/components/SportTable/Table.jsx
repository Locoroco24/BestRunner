import React from 'react';
import {connect} from 'react-redux';
import { css } from '@emotion/css';
import PropTypes from 'prop-types';
import {Table, Td, Th, Button, H1, P, Select, deleteBtn, editBtn, addWorkoutBtn} from "../Styled";
import Popup from "../Popup/Popup";
import useSortableData from "./SortableData";
import {addWorkout, deleteWorkout, editWorkout, filterWorkout} from "../../redux/actions";

const WorkoutTable = ({workouts, modal}) => {

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
        addWorkout(JSON.parse(localStorage.getItem('workouts')));
    };

    const deleteRow = (key) => {
        const index = workouts.findIndex(row => row.key === key);
        workouts.splice(index, 1);
        localStorage.setItem('workouts', JSON.stringify(workouts));
        deleteWorkout(JSON.parse(localStorage.getItem('workouts')));
    };

    const editRow = (key) => {
        const rowIndex = workouts.findIndex( row => row.key === key );
        workouts[rowIndex] = JSON.parse(localStorage.getItem('workoutData'));
        localStorage.setItem('workouts', JSON.stringify(workouts));
        editWorkout(JSON.parse(localStorage.getItem('workouts')));
    };

    const filterType = (event) => {
        const targetFilter = event.target.value;
        const filteredWorkouts = JSON.parse(localStorage.getItem('workouts')).filter( item => {
            if (targetFilter !== 'Без фильтра') {
                return item.type === targetFilter;
            }
            return workouts;
        } );
        filterWorkout(filteredWorkouts);
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
                    {items.map((item, index) => (
                        <tr key={item.key}>
                            <Td>{item.date}</Td>
                            <Td>{item.type}</Td>
                            <Td>{item.distance}</Td>
                            <Td>{item.description}</Td>
                            <Td>
                                <Popup
                                    manageRow={editRow}
                                    typeList={typeList}
                                    modal={modal}
                                    AcceptBtnType='Редактировать тренировку'
                                    defaultValues={items[index]}
                                    class={editBtn}
                                    id={item.key + ' Popup'}
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
                modal={modal}
                class={addWorkoutBtn}
                modalBtnType='Добавить тренировку'
                AcceptBtnType='Добавить тренировку'
                id='NewWorkout'
            />
        </div>
    )
}

WorkoutTable.propTypes = {
    workouts: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = state => ({
    workouts: state.workouts.workouts,
    modal: state.modal
})


export default connect(mapStateToProps)(WorkoutTable)