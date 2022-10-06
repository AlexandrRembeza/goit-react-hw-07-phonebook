import { DeleteButton } from './Contact.styled';
import { CgClose } from 'react-icons/cg';
import PropTypes from 'prop-types';

export const Contact = ({ name, number, id, deleteContact }) => {
  return (
    <>
      {name}: {number}
      <DeleteButton
        onClick={() => deleteContact(id, name)}
        aria-label={`delete ${name} from contacts`}
      >
        <CgClose size={17} />
      </DeleteButton>
    </>
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
