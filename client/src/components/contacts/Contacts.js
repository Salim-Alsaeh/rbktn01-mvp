import React, {Fragment, useContext} from 'react';
import PropTypes from 'prop-types';
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts, filtered } = contactContext;

    if (contacts.length === 0) {
        return <h4> Please add any contacts </h4>
    }

    return (
        <Fragment>
            <TransitionGroup>
                {filtered !== null ? filtered.map(contact =>
                        (
                            <CSSTransition key={contact.id} timeout={500} className="item">
                                <ContactItem  contact={contact}/>
                            </CSSTransition>
                        )
                    )
                    : contacts.map((contact) =>
                            <CSSTransition key={contact.id} timeout={500} className="item">
                                <ContactItem  contact={contact}/>
                            </CSSTransition>
                        )
                }
            </TransitionGroup>
        </Fragment>
    );
};

Contacts.propTypes = {

};

export default Contacts;
