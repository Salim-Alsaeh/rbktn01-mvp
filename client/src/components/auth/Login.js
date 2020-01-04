import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const {setAlert} = alertContext;
    const {register, error, clearErrors, isAuthenticated, login} = authContext;

    useEffect(() => {
        if (isAuthenticated){
            props.history.push('/')
        }
        if (error === 'invalid Credentials') {
            setAlert(error, 'danger')
            clearErrors()
        }
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password} = user;

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('please fill in all fields', 'danger')
        }
        login({
            email,
            password
        })
    };

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange}/>
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block" required />
            </form>
        </div>
    );
};

Login.propTypes = {

};

export default Login;
