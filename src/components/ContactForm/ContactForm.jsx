import PropTypes from 'prop-types';
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";

import css from './ContactForm.module.css';

// Определение схемы валидации с использованием Yup
const addContactSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Слишком короткое имя")
        .max(50, "Слишком длинное имя")
        .required("Обязательное поле"),
    number: Yup.string()
        .matches(/^[0-9]+$/, "Должен содержать только цифры")
        .min(10, "Должен содержать ровно 10 цифр")
        .max(10, "Должен содержать ровно 10 цифр")
        .required("Обязательное поле"),
});

export default function ContactForm({ onAdd }) {
    const nameFieldId = useId();
    const numberFieldId = useId();

    const initValues = { name: "", number: "" };

    const handleSubmit = (contact, actions) => {
        onAdd({ ...contact, id: nanoid() });
        actions.resetForm();
    };

    return (
        <Formik
            initialValues={initValues}
            onSubmit={handleSubmit}
            validationSchema={addContactSchema}
        >
            <Form className={css.form}>
                <div className={css.div}>
                    <label className={css.label} htmlFor={nameFieldId}>Имя</label>
                    <Field id={nameFieldId} name="name" type="text" className={css.field} />
                    <ErrorMessage name="name" component="span" className={css.error} />
                </div>
                <div className={css.div}>
                    <label className={css.label} htmlFor={numberFieldId}>Номер телефона</label>
                    <Field id={numberFieldId} name="number" type="text" className={css.field} />
                    <ErrorMessage name="number" component="span" className={css.error} />
                </div>
                <button className={css.button} type="submit">Добавить контакт</button>
            </Form>
        </Formik>
    );
}

ContactForm.propTypes = {
    onAdd: PropTypes.func.isRequired,
};

