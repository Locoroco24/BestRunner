import React from 'react';
import useSortableData from "./SortableData";
import { css } from '@emotion/css';
import {Table, Td, Th, Button, H1, P, Select} from "../Styled";

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
                            type="button"
                            onClick={() => requestSort('date')}
                            className={getClassNamesFor('date')}
                        >
                            Дата тренировки
                        </Button>
                    </Th>
                    <Th>
                        <Button
                            type="button"
                            onClick={() => requestSort('type')}
                            className={getClassNamesFor('type')}
                        >
                            Тип тренировки
                        </Button>
                    </Th>
                    <Th>
                        <Button
                            type="button"
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
                    {items.map(item => (
                        <tr key={item.key}>
                            <Td>{item.date}</Td>
                            <Td>{item.type}</Td>
                            <Td>{item.distance}</Td>
                            <Td>{item.description}</Td>
                            <Td>
                                {/*<Popup*/}
                                {/*    editRow={props.editRow}*/}
                                {/*    typeList={props.typeList}*/}
                                {/*    btnType='Редактировать'*/}
                                {/*    btnClassName='editWorkout'*/}
                                {/*    onClick={() => props.editRow(item.key)}*/}
                                {/*/>*/}
                                <button
                                    className={css`
                                    margin: 0 5px;
                                    padding: 0;
                                    border: none;
                                    background: none;
                                    outline: none;
                                    &:hover {
                                    cursor: pointer;
                                    opacity: .75;
                                    }
                                    &:after {
                                    content: "\\270E";
                                    border-radius: 3px;
                                    padding: 3px 15px;
                                    color: #fff;
                                    background: #4b4;
                                    }
                                    `}
                                >
                                </button>
                                <button
                                    onClick={() => props.deleteRow(item.key)}
                                    className={css`
                                    margin: 0 5px;
                                    padding: 0;
                                    border: none;
                                    background: none;
                                    outline: none;
                                    transition: opacity .4s;
                                    &:hover {
                                    cursor: pointer;
                                    opacity: .75;
                                    }
                                    &:after {
                                    content: "\\2716";
                                    border-radius: 3px;
                                    padding: 3px 15px;
                                    color: #fff;
                                    background: #b44;
                                    }
                                    `}
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