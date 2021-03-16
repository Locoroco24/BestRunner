import React, { useState } from 'react'
import ReactModal from 'react-modal'

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

            let radioElements = document.getElementsByName('type')

            let checkedRadio = () => {
                for (let i = 0; i < radioElements.length; i++) {
                    if (radioElements[i].checked) {
                        return radioElements[i].value
                    }
                }
            }

            let workoutData = {
                type: checkedRadio(),
                date: document.getElementById('date').value,
                distance: +document.getElementById('distance').value,
                description: document.getElementById('description').value,
                id: Date.now()
            }

            localStorage.setItem('workoutData', JSON.stringify(workoutData))

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
                        {props.typeList.map( (type, index) => {
                            if (index > 0) {
                                return (
                                    <label key={index} htmlFor={type.id}>
                                        <input value={type.value} type="radio" id={type.id} name="type" />{type.value}
                                    </label>
                                )
                            }
                            return null
                            }
                        )}
                    </div>
                    <div>
                        <h3>Дата тренировки</h3>
                        <label htmlFor="date">
                            <input type="date" id="date" name="date" />
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