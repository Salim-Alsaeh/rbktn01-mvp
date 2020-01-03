import React, { useReducer } from "react";
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types.js'


const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Salim Alsaeh',
                email: 'salem@yahoo.com',
                phone: '444-666-1231',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Usb',
                email: 'usb@yahoo.com',
                phone: '000-666-1231',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Ala',
                email: 'ala@yahoo.com',
                phone: '696-666-1231',
                type: 'professional'
            },
        ],
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Add Contact
    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    //Delete Contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id})
    };

    //clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT})
    };

    //set Current Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact})
    };

    //update Contact
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact})
    };

    //filter Contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text})
    };

    //clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER})
    };

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            setCurrent,
            clearCurrent,
            addContact,
            deleteContact,
            updateContact,
            filterContacts,
            clearFilter
        }}>
            {props.children}
        </ContactContext.Provider>
    )
};


export default ContactState;
