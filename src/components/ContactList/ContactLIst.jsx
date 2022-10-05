import PropTypes from 'prop-types';
import { Item } from './ContactList.styled';
import { Contact } from 'components/Contact';

export const ContactList = ({ contacts, deleteContact }) => {
  const reverseContacts = [...contacts].reverse();
  return (
    <>
      {reverseContacts.map(({ name, id, number }) => (
        <Item key={id}>
          <Contact
            id={id}
            name={name}
            number={number}
            deleteContact={deleteContact}
          />
        </Item>
      ))}
    </>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
