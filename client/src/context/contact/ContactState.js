import React, { useReducer } from "react";
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types.js'


const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);


    //Get contacts
    const getContacts = async () => {

        try {
            const res = await axios.get('/api/contacts');
            dispatch({ type: GET_CONTACTS, payload: res.data});

        } catch (e) {
            dispatch({ type: CONTACT_ERROR, payload: e.response.msg});

        }

    };
    //Add Contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
           const res = await axios.post('/api/contacts', contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data});

        } catch (e) {
            dispatch({ type: CONTACT_ERROR, payload: e.response.msg});

        }

    };

    //Delete Contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id})
    };

    //clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT})
    };

    //clear contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS})
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
            error: state.error,
            setCurrent,
            clearCurrent,
            addContact,
            deleteContact,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )
};


export default ContactState;
