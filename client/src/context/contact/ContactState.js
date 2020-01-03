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
    FILTER_CONTACT,
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
        ]
    };

    const [state, dispatch] = useReducer(contactReducer, initialState)

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )
};


export default ContactState;
