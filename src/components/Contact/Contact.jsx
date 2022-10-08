import { DeleteButton } from './Contact.styled';
import { CgClose } from 'react-icons/cg';
import PropTypes from 'prop-types';
import { Spinner } from 'components/Spinner/Spinner';

export const Contact = ({
  name,
  number,
  id,
  props: { isDeleteContactLoading, deleteContact, deletedContactId, isLoading },
}) => {
  return (
    <>
      {name}: {number}
      {isDeleteContactLoading && id === deletedContactId ? (
        <Spinner size={'37'} />
      ) : (
        <DeleteButton
          onClick={() => deleteContact(id, name)}
          disabled={isLoading}
          aria-label={`delete ${name} from contacts`}
        >
          <CgClose size={17} />
        </DeleteButton>
      )}
    </>
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
