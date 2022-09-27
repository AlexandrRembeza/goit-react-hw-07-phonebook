import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactsInitialState = {
  allContacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, { payload: { newContact } }) {
        return { allContacts: [newContact, ...state.allContacts] };
      },
      prepare({ name, number }) {
        return {
          payload: {
            newContact: {
              id: nanoid(),
              name: name,
              number: number,
            },
          },
        };
      },
    },
    deleteContact(state, { payload }) {
      return {
        allContacts: state.allContacts.filter(
          contact => contact.id !== payload.id
        ),
      };
    },
  },
});

const persistConfig = {
  key: 'contacts',
  version: 1,
  storage,
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);
export const { addContact, deleteContact } = contactsSlice.actions;
