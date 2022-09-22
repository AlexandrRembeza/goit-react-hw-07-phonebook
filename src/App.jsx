import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes, { arrayOf } from 'prop-types';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useLocalStorage } from 'hooks';
import { Phonebook, Title, Subtitle, Wrapper, ErrorMessage } from 'App.styled';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';

export function App() {
  const [contacts, setContacts] = useLocalStorage();
  const [filter, setFilter] = useState('');

  const addContact = values => {
    for (const contact of contacts) {
      if (contact.name.toLowerCase() === values.name.toLowerCase()) {
        return toast.error(`${contact.name} is already in contacts`, {
          position: 'top-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    setContacts(state => [
      { id: nanoid(), name: values.name, number: values.number },
      ...state,
    ]);
  };

  const deleteContact = e => {
    const buttonId = e.target.dataset.id;
    const filterContacts = contacts.filter(contact => buttonId !== contact.id);
    setContacts([...filterContacts]);
  };

  const handleFilter = e => {
    const inputValue = e.target.value.toLowerCase().trim();
    setFilter(inputValue);
  };

  const renderContacts = () => {
    if (filter) {
      const filterContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter)
      );
      return filterContacts;
    }
    return contacts;
  };

  const currentContacts = renderContacts();

  return (
    <Wrapper>
      <Phonebook>
        <Title>Phonebook</Title>
        <ContactForm addContact={addContact} />
        <ToastContainer />
        <Subtitle>Contacts</Subtitle>
        <Filter handleFilter={handleFilter} />
      </Phonebook>
      {currentContacts.length !== 0 ? (
        <ContactList contacts={currentContacts} deleteContact={deleteContact} />
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
  contacts: arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
