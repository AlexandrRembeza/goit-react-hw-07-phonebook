import { DeleteButton } from './Contact.styled';
import { CgClose } from 'react-icons/cg';
import PropTypes from 'prop-types';

export const Contact = ({ name, number, id, deleteContact }) => {
  return (
    <>
      {name}: {number}
      <DeleteButton
        data-id={id}
        onClick={() => deleteContact(id, name)}
        aria-label="delete contact"
      >
        <CgClose size={17} />
      </DeleteButton>
    </>
  );
};

DeleteButton.propTypes = {
  'data-id': PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
