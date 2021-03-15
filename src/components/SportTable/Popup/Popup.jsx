import React from 'react'
import ReactModal from 'react-modal'
import Calendar from "./Calendar";

const Popup = props => {

    const [modalIsOpen,setIsOpen] = React.useState(false);

    function afterOpenModal() {

    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
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
            >
                <h2 >Информация о тренировке</h2>
                <form>
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
                        <Calendar />
                    </div>
                    <div>
                        <h3>Километраж</h3>
                        <label htmlFor="distance">
                            <input type="number" id="distance" name="distance" />
                        </label>
                    </div>
                    <div>
                        <h3>Комментарий</h3>
                        <label htmlFor="description">
                            <input type="text" id="description" name="description" placeholder="Заметки о тренировке"/>
                        </label>
                    </div>
                    <button onClick={closeModal}>Добавить тренировку</button>
                </form>
            </ReactModal>
        </div>
    )
}

export default Popup