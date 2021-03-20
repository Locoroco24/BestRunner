import React, { useState } from 'react';
import ReactModal from 'react-modal';
import {Button} from "../Styled";

const ConfirmModal = props => {

    const [modalIsOpen,setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <Button
                type="button"
                className="addWorkout"
                onClick={openModal}
            >
                Добавить тренировку
            </Button>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                <p>Сохранить тренировку?</p>
                <Button
                    className="addWorkout"
                    type="button"
                    onClick={props.onSubmit}
                >Да
                </Button>
                <Button
                    className="addWorkout"
                    type="submit"
                    onClick={closeModal}
                >Нет
                </Button>
            </ReactModal>
        </div>
    );
}

export default ConfirmModal