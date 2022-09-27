import { ErrorMessage } from 'formik';
import { ErrorElem } from './FormError.styled';

export const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={msg => {
        return <ErrorElem>{msg}</ErrorElem>;
      }}
    />
  );
};
