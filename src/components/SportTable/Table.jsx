import React from 'react';
import useSortableData from "./SortableData";
import { css } from '@emotion/css';
import {Table, Td, Th, Button, H1, P, Select, deleteBtn, editBtn} from "../Styled";
import Popup from "../Popup/Popup";

const WorkoutTable = props => {
    const { items, requestSort, sortConfig } = useSortableData(props.workouts);
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
                <Select onChange={props.filterType}>
                    {props.typeList.map( (type, index) => (
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
                                    manageRow={props.editRow.bind(this)}
                                    typeList={props.typeList}
                                    AcceptBtnType='Редактировать тренировку'
                                    defaultValues={props.workouts[index]}
                                    class={editBtn}
                                />
                                <button
                                    onClick={() => props.deleteRow(item.key)}
                                    className={deleteBtn}
                                >
                                </button>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default WorkoutTable