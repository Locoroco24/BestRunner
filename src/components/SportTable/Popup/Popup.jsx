import React, { useState } from 'react'
import ReactModal from 'react-modal'
import Calendar from "./Calendar"

const Popup = props => {

    const [modalIsOpen,setIsOpen] = useState(false)

    const afterOpenModal = () => {

    }

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const confirmWorkout = event => {
        if (window.confirm('Сохранить тренировку?')) {
            closeModal()
            props.addRow()
        }
        event.preventDefault()
    }

    const style = {
        content: {
        }
    }

    return (
        <div>
            <button onClick={openModal}>Добавить тренировку</button>
            <ReactModal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                ariaHideApp={false}
                contentLabel="Example Modal"
                style={style}
            >
                <h2>Информация о тренировке</h2>
                <form action="/#" method="get">
                    <div>
                        <h3>Выберите тип тренировки</h3>
                        <label htmlFor="run">
                            <input value="run" type="radio" id="run" name="type" defaultChecked />Бег
                        </label>
                        <label htmlFor="bike">
                            <input value="bike" type="radio" id="bike" name="type" />Велосипед
                        </label>
                        <label htmlFor="ski">
                            <input value="ski" type="radio" id="ski" name="type" />Лыжи
                        </label>
                        <label htmlFor="walking">
                            <input value="walking" type="radio" id="walking" name="type" />Хотьба
                        </label>
                    </div>
                    <div>
                        <h3>Дата тренировки</h3>
                        <label htmlFor="date">
                            <Calendar />
                        </label>
                    </div>
                    <div>
                        <h3>Километраж</h3>
                        <label htmlFor="distance">
                            <input type="number" id="distance" name="distance" min="0" />
                        </label>
                    </div>
                    <div>
                        <h3>Комментарий</h3>
                        <label htmlFor="description">
                            <input type="text" id="description" name="description" placeholder="Заметки о тренировке"/>
                        </label>
                    </div>
                    <button onClick={confirmWorkout}>Добавить тренировку</button>
                </form>
            </ReactModal>
        </div>
    )
}

export default Popup