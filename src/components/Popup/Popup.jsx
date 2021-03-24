import React from 'react';
import ReactModal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { css } from '@emotion/css';
import {Button, H2, H3, Div, addWorkoutBtn, formField, errorMassage} from "../Styled";
import {openModal, closeModal} from "../../redux/actions";

const Popup = (props) => {

    // const [modalIsOpen,setIsOpen] = useState(false);
    //
    // const openModal = () => {
    //     setIsOpen(true);
    // };
    //
    // const closeModal = () => {
    //     setIsOpen(false);
    // };

    let defaultValues = {
        type: '',
        date: '',
        distance: '',
        description: '',
        key: ''
    };

    if (props.defaultValues) {
        defaultValues = props.defaultValues;
    }

    const onSubmit = values => {
        if (window.confirm('Сохранить тренировку?')) {

            if (!values.key) {
                values.key = `${values.type}_${Date.now()}`;
            }

            localStorage.setItem('workoutData', JSON.stringify(values));

            closeModal();
            props.manageRow(values.key);
        }
    };

    const validationSchema = Yup.object({
        date: Yup.string()
            .required('Заполните поле'),
        distance: Yup.number()
            .positive('Введите значение больше 0')
            .required('Заполните поле')
    });

    return (
        <div className={css`
            display: inline;
        `}>
            <button
                onClick={openModal}
                className={props.class}
            >
                {props.modalBtnType}
            </button>
            <ReactModal
                isOpen={props.modal.isOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                <H2>Информация о тренировке</H2>
                <Formik
                    initialValues={defaultValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form className={css`
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    `}>
                        <Div>
                            <H3>Выберите тип тренировки</H3>
                            <Div className='workoutType'>
                            {props.typeList.map( (type, index) => {
                                if (index > 0) {
                                    return (
                                        <label
                                            key={index}
                                            htmlFor={type.id}
                                        >
                                            <Field
                                                value={type.value}
                                                type='radio'
                                                id={type.id}
                                                name='type'
                                            />
                                            {type.value}
                                        </label>
                                    )
                                }
                                return null
                            }
                            )}
                            </Div>
                        </Div>
                        <Div>
                            <H3>Дата тренировки</H3>
                            <label htmlFor='date'></label>
                            <Field
                                type='date'
                                id='date'
                                name='date'
                                className={formField}
                            />
                            <ErrorMessage
                                name='date'
                                component='p'
                                className={errorMassage}
                            />
                        </Div>
                        <Div>
                            <H3>Километраж</H3>
                            <label htmlFor='distance'></label>
                            <Field
                                type='number'
                                id='distance'
                                name='distance'
                                className={formField}
                            />
                            <ErrorMessage
                                name='distance'
                                component='p'
                                className={errorMassage}
                            />
                        </Div>
                        <Div>
                            <H3>Комментарий</H3>
                            <label htmlFor='description'></label>
                            <Field
                                component='textarea'
                                id='description'
                                name='description'
                                placeholder='Заметки о тренировке'
                                maxLength='60'
                                className={formField}
                            />
                        </Div>
                        <button
                            className={addWorkoutBtn}
                            type='submit'
                        >
                            {props.AcceptBtnType}
                        </button>
                        <Button
                            type='button'
                            className='closePopup'
                            onClick={closeModal}
                        >
                            Закрыть
                        </Button>
                    </Form>
                </Formik>
            </ReactModal>
        </div>
    )
}


export default Popup;