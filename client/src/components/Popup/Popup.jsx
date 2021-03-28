import React from 'react';
import ReactModal from 'react-modal';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {css}  from '@emotion/css';
import {H2, H3, Div, formField, errorMassage, closePopupBtn, addWorkoutBtn} from '../Styled';

const Popup = (props) => {

    const [modalIsOpen,setIsOpen] = React.useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

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

    const onSubmit = (value) => {
        if (window.confirm('Сохранить тренировку?')) {
            props.manageRow(value)
            closeModal();
        }
    };

    const initialValues = {
        type: defaultValues.type,
        date: defaultValues.date,
        distance: defaultValues.distance,
        description: defaultValues.description,
        key: defaultValues.key
    };

    const validationSchema = Yup.object({
        type: Yup.string()
            .required('Выберите тип тренировки'),
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
                            <ErrorMessage
                                name='type'
                                component='p'
                                className={errorMassage}
                            />
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
                        <button
                            type='button'
                            className={closePopupBtn}
                            onClick={closeModal}
                        >
                            Закрыть
                        </button>
                    </Form>
                </Formik>
            </ReactModal>
        </div>
    )
}


export default Popup;