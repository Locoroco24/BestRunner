import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { css } from '@emotion/css';
import styled from "@emotion/styled";

const H2 = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`

const H3 = styled.h3`
    text-align: center;
    margin: 30px 0 25px;
`

const Button = styled.button`
    max-width: 100%;
    width: 300px;
    margin: 40px 0 30px;
    padding: 5px 15px;
    font-family: Calibri, sans-serif;
    font-size: 18px;
    text-transform: uppercase;
    color: #fff;
    background: #000;
    transition: opacity .4s;
    &:hover {
    cursor: pointer;
    opacity: 0.75;
    }
`

const Popup = props => {

    const [modalIsOpen,setIsOpen] = useState(false);

    const afterOpenModal = () => {

    };

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

            values.key = `${values.type}_${Date.now()}`

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
    })

    const style = {
        overlay: {
            // background: 'url("../../img/modalBackground.jpg") no-repeat center'
        }
    };

    return (
        <div className={css`
            text-align: center;
        `}>
            <Button onClick={openModal}>Добавить тренировку</Button>
            <ReactModal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={style}
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
                        <div>
                            <H3>Выберите тип тренировки</H3>
                            {props.typeList.map( (type, index) => {
                                if (index > 0) {
                                    return (
                                        <label
                                            key={index}
                                            htmlFor={type.id}
                                            className={css`
                                                font-family: Calibri, sans-serif;
                                                font-size: 18px;
                                            `}
                                        >
                                            <Field
                                                value={type.value}
                                                type="radio"
                                                id={type.id}
                                                name="type"
                                            />
                                            {type.value}
                                        </label>
                                    )
                                }
                                return null
                            }
                            )}
                        </div>
                        <div className={css`
                            max-width: 100%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        `}>
                            <H3>Дата тренировки</H3>
                            <label htmlFor="date"></label>
                            <Field
                                type="date"
                                id="date"
                                name="date"
                                className={css`
                                max-width: 100%;
                                width: 300px;
                                padding: 5px 15px;
                                font-family: Calibri, sans-serif;
                                font-size: 18px;
                                text-transform: uppercase;
                                `}
                            />
                            <ErrorMessage
                                name="date"
                                component="p"
                                className={css`
                                text-align: center;
                                line-height: 20px;
                                margin-bottom: -20px;
                                color: #f00;
                                `}
                            />
                        </div>
                        <div className={css`
                            max-width: 100%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        `}>
                            <H3>Километраж</H3>
                            <label htmlFor="distance"></label>
                            <Field
                                type="text"
                                id="distance"
                                name="distance"
                                className={css`
                                max-width: 100%;
                                width: 300px;
                                padding: 5px 15px;
                                font-size: 18px;
                                `}
                            />
                            <ErrorMessage
                                name="distance"
                                component="p"
                                className={css`
                                text-align: center;
                                line-height: 20px;
                                margin-bottom: -20px;
                                color: #f00;
                                `}
                            />
                        </div>
                        <div className={css`
                            max-width: 100%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        `}>
                            <H3>Комментарий</H3>
                            <label htmlFor="description"></label>
                            <Field
                                component="textarea"
                                id="description"
                                name="description"
                                placeholder="Заметки о тренировке"
                                maxlength="60"
                                className={css`
                                max-width: 100%;
                                width: 300px;
                                resize: none;
                                padding: 5px 15px;
                                font-family: Calibri, sans-serif;
                                font-size: 18px;
                                `}
                            />
                        </div>
                        <Button type='submit'>Добавить тренировку</Button>
                    </Form>
                </Formik>
            </ReactModal>
        </div>
    )
}

export default Popup;