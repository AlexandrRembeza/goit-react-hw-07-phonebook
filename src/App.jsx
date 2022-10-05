import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner';

import { changeFilter } from 'redux/filterSlice';
import {
  useAddContactMutation,
  useDeleteContactMutation,
  useGetContactsQuery,
} from 'redux/contactsSlice';
import { selectFilter } from 'redux/selectors';

import { toastOptions } from 'utils/toastOptions';
import { getFilteredContacts } from 'utils/getFilteredContacts';

import {
  Phonebook,
  Title,
  Subtitle,
  Wrapper,
  List,
  ErrorMessage,
  SpinnerWrap,
} from 'App.styled';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';

export function App() {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const { data: contacts, isFetching } = useGetContactsQuery();
  const [addContact, { isLoading: addContactLoading }] =
    useAddContactMutation();
  const [deleteContact, { isLoading: deleteContactLoading }] =
    useDeleteContactMutation();

  const addNewContact = async values => {
    for (const contact of contacts) {
      if (contact.name.toLowerCase() === values.name.toLowerCase()) {
        return toast.error(
          `${contact.name} is already in contacts`,
          toastOptions
        );
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
    const response = await deleteContact(id);
    if (response.error)
      return toast.error(
        `Happen mistake while deleting a contact, Please reload the page`,
        toastOptions
      );
    return toast.success(`${contactName} deleted from contacts`, toastOptions);
  };

  const handleFilter = e => {
    dispatch(changeFilter({ filter: e.target.value.toLowerCase().trim() }));
  };

  const filteredContacts = getFilteredContacts(contacts, filter);

  return (
    <Wrapper>
      <Phonebook>
        <Title>Phonebook</Title>
        <ContactForm
          addContact={addNewContact}
          isLoading={isFetching || addContactLoading || deleteContactLoading}
        />
        <Subtitle>Contacts</Subtitle>
        <Filter handleFilter={handleFilter} />
      </Phonebook>

      {!isFetching && filteredContacts && filteredContacts.length === 0 ? (
        <ErrorMessage>No Contacts</ErrorMessage>
      ) : (
        <List>
          {isFetching || addContactLoading || deleteContactLoading ? (
            <SpinnerWrap>
              <RotatingLines
                strokeColor="#596dff"
                strokeWidth="3.5"
                animationDuration="0.80"
                width="80"
                visible={true}
              />
            </SpinnerWrap>
          ) : (
            <ContactList
              contacts={filteredContacts}
              deleteContact={removeContact}
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
};
