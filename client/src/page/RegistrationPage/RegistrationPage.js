import React, { useState } from "react";

import "./RegistrationPage.css";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';
export default (props) => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);
    const [passwordRetype, setPasswordRetype] = useState('');


    const [errorL, setErrorL] = useState(false)



    const onSubmit = (e) => {
        e.preventDefault()

        if (username && password && passwordRetype) {
            if (username.length < 7 || username.length > 20) {
                username.length < 7 ? setErrorL('Register failed Username is too short!') : setErrorL('Register failed Username is too long!')
            }
            else if (password === passwordRetype) {
                axios.post('/api/register', { username, password })
                    .then(doc => {
                        toast.error('🦄 register seccess!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true
                        });
                        if (doc.data) {
                            setIsRedirect(true)
                        } else {
                            setErrorL('Register failed \n Username is exist')
                        }

                    })
            } else {

                setErrorL("Register failed \n Password doesn't match ")
            }
        }
        else {

        }
    }


    if (isRedirect) {
        return (<Redirect to="/" />)
    }
    return (
        <div className="limiter">
            <div className="container-login100">
                <p style={{ ...{ marginTop: '25px', color: 'red', textAlign: 'center', cursor: 'default' }, opacity: `${errorL ? 1 : 0}` }}>
                    {errorL}
                </p>
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img src="images/img-01.png" alt="IMG" />
                    </div>
                    <form className="login100-form validate-form" method="post">
                        <span className="login100-form-title">
                            Member Registration
                            </span>
                        <div
                            className="wrap-input100 validate-input"
                            data-validate="Valid email is required: ex@abc.xyz"
                        >
                            <input
                                className="input100"
                                type="text"
                                name="username"
                                placeholder="username"
                                onChange={e => {
                                    setUsername(e.currentTarget.value);
                                    setIsRedirect('');
                                    setErrorL('')
                                }
                                }
                            />
                            <span className="focus-input100" />
                            <span className="symbol-input100">
                                <i
                                    className="fa fa-envelope"
                                    aria-hidden="true"
                                />
                            </span>
                        </div>
                        <div
                            className="wrap-input100 validate-input"
                            data-validate="Password is required"
                        >
                            <input
                                className="input100"
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={e => {
                                    setPassword(e.currentTarget.value)
                                    setIsRedirect('');
                                    setErrorL('')
                                }}
                            />
                            <span className="focus-input100" />
                            <span className="symbol-input100">
                                <i
                                    className="fa fa-lock"
                                    aria-hidden="true"
                                />
                            </span>
                        </div>
                        <div
                            className="wrap-input100 validate-input"
                            data-validate="Password is required"
                        >
                            <input
                                className="input100"
                                type="password"
                                name="passwordRetype"
                                placeholder="passwordRetype"
                                onChange={e => {
                                    setPasswordRetype(e.currentTarget.value)
                                    setIsRedirect('');
                                    setErrorL('')
                                }}
                            />
                            <span className="focus-input100" />
                            <span className="symbol-input100">
                                <i
                                    className="fa fa-lock"
                                    aria-hidden="true"
                                />
                            </span>
                        </div>

                        <div className="container-login100-form-btn">
                            <button onClick={onSubmit} className="login100-form-btn">
                                onRegister
                                </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );

}

