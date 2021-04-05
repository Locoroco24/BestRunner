import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {Table, Td, Th, Button, H1, P, Select, deleteBtn, editBtn, addWorkoutBtn, Wrapper} from '../Styled';
import Popup from '../Popup/Popup';
import useSortableData from './SortableData';
import {typeList} from '../../store/types';
import {addWorkout, deleteWorkout, editWorkout, filterWorkouts} from '../../store/actions';

const WorkoutTable = () => {
    const workouts = useSelector(store => store.workouts);
    const filterType = useSelector(store => store.filterType);

    const filteredWorkouts = workouts.filter( item => {
        if (filterType !== 'Без фильтра') {
            return item.type === filterType;
        }
        return workouts;
    });

    const { items, requestSort, sortConfig } = useSortableData(filteredWorkouts);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const toggleSortType = (value) => {
        requestSort(value.target.value)
    }

    return (
        <div>
            <H1>BestRunner</H1>
            <Wrapper>
                <P>Фильтрация по типу тренировки</P>
                <Select onChange={filterWorkouts}>
                    {typeList.map( (type, index) => (
                        <option
                            key={index}
                            value={type.value}
                        >
                            {type.value}
                        </option>
                    ))}
                </Select>
            </Wrapper>
            <Table>
                <thead>
                <tr>
                    <Th>
                        <Button
                            type='button'
                            value='date'
                            onClick={toggleSortType}
                            className={getClassNamesFor('date')}
                        >
                            Дата тренировки
                        </Button>
                    </Th>
                    <Th>
                        <Button
                            type='button'
                            value='type'
                            onClick={toggleSortType}
                            className={getClassNamesFor('type')}
                        >
                            Тип тренировки
                        </Button>
                    </Th>
                    <Th>
                        <Button
                            type='button'
                            value='distance'
                            onClick={toggleSortType}
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
                                    manageRow={editWorkout}
                                    typeList={typeList}
                                    AcceptBtnType='Редактировать тренировку'
                                    defaultValues={items[index]}
                                    class={editBtn}
                                />
                                <button
                                    onClick={() => deleteWorkout(item.key)}
                                    className={deleteBtn}
                                >
                                </button>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Popup
                manageRow={addWorkout}
                typeList={typeList}
                class={addWorkoutBtn}
                modalBtnType='Добавить тренировку'
                AcceptBtnType='Добавить тренировку'
            />
        </div>
    )
}

WorkoutTable.propTypes = {
    workouts: PropTypes.arrayOf(PropTypes.object)
}

export default WorkoutTable;