import React from 'react';
import useSortableData from "./SortableData";
import { css } from '@emotion/css';
import styled from "@emotion/styled";


const Th = styled.th`
        border: 3px #222 solid;
        color: #fff;
        background: linear-gradient(0deg, #555, #000);
        &:first-of-type {
        width: 15%;
        }
        `

const Td = styled.td`
        border: 2px #222 solid;
        background: #fff;
        text-align: center;
        `

const Button = styled.button`
        margin: 0 10px;
`

const Table = props => {
    const { items, requestSort, sortConfig } = useSortableData(props.workouts);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <div>
            <h1
                className={css`
                margin-top: 30px;
                text-align: center;
            `}>
                BestRunner
            </h1>
            <div
                className={css`
                margin-top: 30px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
            `}>
                <p
                    className={css`
                    margin-right: 20px;
                `}>
                    Фильтрация по типу тренировки
                </p>
                <select
                    className={css`
                    padding: 5px 10px;
                    &:hover {
                    cursor: pointer;
                    }
                    `}
                    onChange={props.filterType}
                >
                    {props.typeList.map( (type, index) => (
                        <option
                            key={index}
                            value={type.value}
                        >
                            {type.value}
                        </option>
                    ))}
                </select>
            </div>
            <table
                className={css`
                margin-top: 20px;
                width: 100%;
                border: 3px #222 solid;
                border-collapse: collapse;
            `}>
                <thead>
                <tr>
                    <Th>
                        <button
                            type="button"
                            onClick={() => requestSort('date')}
                            className={getClassNamesFor('date')}
                        >
                            Дата тренировки
                        </button>
                    </Th>
                    <Th>
                        <button
                            type="button"
                            onClick={() => requestSort('type')}
                            className={getClassNamesFor('type')}
                        >
                            Тип тренировки
                        </button>
                    </Th>
                    <Th>
                        <button
                            type="button"
                            onClick={() => requestSort('distance')}
                            className={getClassNamesFor('distance')}
                        >
                            Километраж
                        </button>
                    </Th>
                    <Th>
                        Комментарии
                    </Th>
                    <Th>
                        Редактирование
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
                                <Button
                                    onClick={() => props.editRow(item.key)}
                                >
                                    Редактировать
                                </Button>
                                <Button
                                    onClick={() => props.deleteRow(item.key)}
                                >
                                    Удалить
                                </Button>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table