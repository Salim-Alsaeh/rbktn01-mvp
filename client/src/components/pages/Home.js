import React from 'react';
import PropTypes from 'prop-types';
import Contacts from "../contacts/Contacts";
import ContactsForm from "../contacts/ContactsForm";
import ContactFilter from "../contacts/ContactFilter";

const Home = props => {
    return (
        <div className="grid-2">
            <div>
                <ContactsForm/>
            </div>
            <div>
                <ContactFilter/>
                <Contacts/>
            </div>
        </div>
    );
};

Home.propTypes = {

};

export default Home;
