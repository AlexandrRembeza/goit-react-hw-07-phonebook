import { changeFilter } from 'redux/filterSlice';
import {
  useAddContactMutation,
  useDeleteContactMutation,
  useGetContactsQuery,
} from 'redux/contactsSlice';
import { selectFilter } from 'redux/selectors';

import { toastOptions } from 'utils/toastOptions';
import { getFilteredContacts } from 'utils/getFilteredContacts';

import { Phonebook, Header, Subtitle, Wrapper, List, ErrorMessage, Title } from 'App.styled';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
import { Spinner } from 'components/Spinner/Spinner';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [deletedContactId, setDeletedContactId] = useState(null);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const { data: contacts, isLoading } = useGetContactsQuery();
  const [addContact, { isLoading: addContactLoading }] = useAddContactMutation();
  const [deleteContact, { isLoading: deleteContactLoading }] = useDeleteContactMutation();

  const addNewContact = async values => {
    for (const contact of contacts) {
      if (contact.name.toLowerCase() === values.name.toLowerCase()) {
        return toast.error(`${contact.name} is already in contacts`, toastOptions);
      }
    }
    const response = await addContact(values);
    if (response.error)
      return toast.error(
        `Happen mistake while adding a contact, Please reload the page`,
        toastOptions
      );
    return toast.success(`${values.name} added to contacts`, toastOptions);
  };

  const removeContact = async (id, contactName) => {
    setDeletedContactId(id);
    const response = await deleteContact(id);
    if (response.error)
      return toast.error(
        `Happen mistake while deleting a contact, Please reload the page`,
        toastOptions
      );
    toast.success(`${contactName} deleted from contacts`, toastOptions);
    return setDeletedContactId(null);
  };

  const handleFilter = e => {
    dispatch(changeFilter({ filter: e.target.value.toLowerCase().trim() }));
  };

  const filteredContacts = getFilteredContacts(contacts, filter);
  const isLoadingContacts = isLoading || addContactLoading || deleteContactLoading;
  const isShowingError = !isLoading && filteredContacts && filteredContacts.length === 0;

  return (
    <Wrapper>
      <Phonebook>
        <Header>Phonebook</Header>
        <ContactForm addContact={addNewContact} isLoading={isLoadingContacts} />
        <Subtitle>Find Contact</Subtitle>
        <Filter handleFilter={handleFilter} />
      </Phonebook>

      {isShowingError && !addContactLoading && <ErrorMessage>No Contacts</ErrorMessage>}

      {isShowingError && addContactLoading && (
        <List>
          <Title>Contacts</Title>
          <Spinner size={'65'} />
        </List>
      )}

      {!isShowingError && (
        <List>
          <Title>Contacts</Title>
          {(addContactLoading || isLoading) && <Spinner size={isLoading ? '100' : '65'} />}

          {contacts && (
            <ContactList
              contacts={filteredContacts}
              deleteContact={removeContact}
              deletedContactId={deletedContactId}
              isDeleteContactLoading={deleteContactLoading}
              isLoading={isLoadingContacts}
            />
          )}
        </List>
      )}
      <ToastContainer />
    </Wrapper>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
  deletedContactId: PropTypes.string,
  isDeleteContactLoading: PropTypes.bool,
  isLoading: PropTypes.bool,
};
