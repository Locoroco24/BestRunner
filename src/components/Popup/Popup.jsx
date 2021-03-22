import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { css } from '@emotion/css';
import {Button, H2, H3, Div} from "../Styled";

const Popup = props => {

    const [modalIsOpen,setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const initialValues = {
            type: '',
            date: '',
            distance: '',
            description: '',
            key: ''
    };

    const onSubmit = values => {
        if (window.confirm('Сохранить тренировку?')) {

            values.key = `${values.type}_${Date.now()}`;

            localStorage.setItem('workoutData', JSON.stringify(values));

            closeModal();
            props.addRow();
        }
    };

    const validationSchema = Yup.object({
        date: Yup.string()
            .required('Заполните поле'),
        distance: Yup.number()
            .typeError('Введите числовое значение')
            .positive('Введите значение больше 0')
            .required('Заполните поле')
    });

    return (
        <div className={css`
            text-align: center;
        `}>
            <Button
                onClick={openModal}
                className='addWorkout'
            >
                Добавить тренировку
            </Button>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                <H2>Информация о тренировке</H2>
                <Formik
                    initialValues={initialValues}
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
                                className={css`
                                max-width: 100%;
                                width: 300px;
                                padding: 5px 15px;
                                font-family: inherit;
                                font-size: inherit;
                                text-transform: uppercase;
                                `}
                            />
                            <ErrorMessage
                                name='date'
                                component='p'
                                className={css`
                                text-align: center;
                                line-height: 20px;
                                margin-bottom: -20px;
                                color: #f00;
                                `}
                            />
                        </Div>
                        <Div>
                            <H3>Километраж</H3>
                            <label htmlFor='distance'></label>
                            <Field
                                type='text'
                                id='distance'
                                name='distance'
                                className={css`
                                max-width: 100%;
                                width: 300px;
                                padding: 5px 15px;
                                font-size: 18px;
                                `}
                            />
                            <ErrorMessage
                                name='distance'
                                component='p'
                                className={css`
                                text-align: center;
                                line-height: 20px;
                                margin-bottom: -20px;
                                color: #f00;
                                `}
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
                                className={css`
                                max-width: 100%;
                                width: 300px;
                                resize: none;
                                padding: 5px 15px;
                                font-family: inherit;
                                font-size: inherit;
                                `}
                            />
                        </Div>
                        <Button
                            className='addWorkout'
                            type='submit'
                        >
                            Добавить тренировку
                        </Button>
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