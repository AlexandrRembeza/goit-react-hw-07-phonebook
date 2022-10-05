export const getFilteredContacts = (contacts, filter) => {
  if (filter) {
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
    return filterContacts;
  }
  return contacts;
};
