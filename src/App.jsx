import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { changeFilter } from 'redux/filterSlice';
import { addContact, deleteContact } from 'redux/contactsSlice';
import { getContacts, getFilter } from 'redux/selectors';

import { toastOptions } from 'utils/toastOptions';

import { Phonebook, Title, Subtitle, Wrapper, ErrorMessage } from 'App.styled';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';

const getFilteredContacts = (contacts, filter) => {
  if (filter) {
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
    return filterContacts;
  }
  return contacts;
};

export function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const addNewContact = values => {
    for (const contact of contacts) {
      if (contact.name.toLowerCase() === values.name.toLowerCase()) {
        return toast.error(
          `${contact.name} is already in contacts`,
          toastOptions
        );
      }
    }
    dispatch(addContact(values));
  };

  const removeContact = e => {
    dispatch(deleteContact({ id: e.target.dataset.id }));
  };

  const handleFilter = e => {
    dispatch(changeFilter({ filter: e.target.value.toLowerCase().trim() }));
  };

  const filteredContacts = getFilteredContacts(contacts, filter);

  return (
    <Wrapper>
      <Phonebook>
        <Title>Phonebook</Title>
        <ContactForm addContact={addNewContact} />
        <ToastContainer />
        <Subtitle>Contacts</Subtitle>
        <Filter handleFilter={handleFilter} />
      </Phonebook>
      {filteredContacts.length !== 0 ? (
        <ContactList
          contacts={filteredContacts}
          deleteContact={removeContact}
        />
      ) : (
        <ErrorMessage>No Results</ErrorMessage>
      )}
    </Wrapper>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
