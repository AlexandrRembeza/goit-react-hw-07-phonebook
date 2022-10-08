import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { Label, Text, AddButton, Thumb, Form, Input } from './ContactForm.styled';
import { FormError } from 'components/FormError';
import { ErrorElem } from 'components/FormError/FormError.styled';

const schema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)/,
      'Имя может содержать только буквы, апостроф, тире и пробелы.'
    )
    .required('Это поле обязательное'),
  number: Yup.string()
    .matches(
      /[0-9]{3}-[0-9]{2}-[0-9]{2}/,
      'Номер должен содержать только числа и тире. Формат: (123-45-67)'
    )
    // .min(9, 'Номер должен состоять из 9 символов')
    // .max(9, 'Номер должен состоять из 9 символов')
    .required('Это поле обязательное'),
});

export function ContactForm({ addContact, isLoading }) {
  const initialValues = {
    name: '',
    number: '',
  };

  const [unvalidNum, setUnvalidNum] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    if (values.number.trim().length !== 9) {
      setUnvalidNum(true);
      return setTimeout(() => {
        setUnvalidNum(false);
      }, 3000);
    }

    const formValues = {
      name: values.name.trim(),
      number: values.number.trim(),
    };
    resetForm();
    addContact(formValues);
  };

  const resetErrors = setErrors => {
    setTimeout(() => setErrors({}), 3000);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
      {({ errors, touched, setErrors }) => (
        <Form autoComplete="off">
          <Label>
            <Text>Name</Text>
            <Thumb>
              <Input type="text" name="name" placeholder="Name Surname" />
              {errors.name && touched.name ? <FormError name="name" /> : null}
              {errors.name && touched.name && resetErrors(setErrors)}
            </Thumb>
          </Label>

          <Label>
            <Text>Number {`(xxx-xx-xx)`}</Text>
            <Thumb>
              <Input type="tel" name="number" placeholder="123-45-67" />
              {errors.number && touched.number ? <FormError name="number" /> : null}
              {errors.number && touched.number && resetErrors(setErrors)}
              {unvalidNum && <ErrorElem>Номер должен состоять из девяти символов</ErrorElem>}
            </Thumb>
          </Label>

          <AddButton type="submit" disabled={isLoading}>
            Add contact
          </AddButton>
        </Form>
      )}
    </Formik>
  );
}

Formik.propTypes = {
  initialValues: PropTypes.exact({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
};

FormError.propTypes = {
  name: PropTypes.string.isRequired,
};
