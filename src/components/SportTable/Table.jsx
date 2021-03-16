import React from 'react'
import useSortableData from "./SortableData"

const Table = props => {
    const { items, requestSort, sortConfig } = useSortableData(props.workouts)
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return
        }
        return sortConfig.key === name ? sortConfig.direction : undefined
    }

    return (
        <div>
            <h1>BestRunner</h1>
            Фильтрация по типу тренировки
            <select onChange={props.filterType}>
                {props.typeList.map( (type, index) => (
                    <option key={index} value={type.value}>{type.value}</option>
                ))}
            </select>
            <table>
                <thead>
                <tr>
                    <th>
                        Дата тренировки
                        <button
                            type="button"
                            onClick={() => requestSort('date')}
                            className={getClassNamesFor('date')}
                        ></button>
                    </th>
                    <th>
                        Тип тренировки
                        <button
                            type="button"
                            onClick={() => requestSort('type')}
                            className={getClassNamesFor('type')}
                        ></button>
                    </th>
                    <th>
                        Километраж
                        <button
                            type="button"
                            onClick={() => requestSort('distance')}
                            className={getClassNamesFor('distance')}
                        ></button>
                    </th>
                    <th>
                        Комментарии
                    </th>
                    <th>
                        Редактирование
                    </th>
                </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.date}</td>
                            <td>{item.type}</td>
                            <td>{item.distance}</td>
                            <td>{item.description}</td>
                            <td>{item.edit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table