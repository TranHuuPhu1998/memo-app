import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import CallAPI from '../../utils/apiCaller';
import { toast } from "react-toastify";
import * as Config from "../../constants/Config";
import axios from 'axios';

export default (props) => {

    const [, setLoad] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);

    useEffect(() => {
        CallAPI('api/checkToken', 'POST').then(doc => {
            // console.log(doc);

            setIsRedirect(doc && doc.data ? doc.data : '')
        })

        return () => {
            setLoad(false)
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        if (username && password)
            axios.post(`${Config.API_URL}/api/login`, { username, password })
                .then(doc => {
                    if (doc.data.token) {
                        document.cookie = `authorization=${doc.data.token}; path=/`;
                    }
                    setIsRedirect(doc.data)
                    toast.error('🦄 login success!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                })
                .catch(() => {
                    toast.error('🦄 login error!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                })
        else {

        }
    }



    if (isRedirect) {
        return <Redirect to='/homepage' />
    }

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img src="images/img-01.png" alt="IMG" />
                    </div>
                    <form className="login100-form validate-form">
                        <span className="login100-form-title">
                            Member Login
                            </span>
                        <div
                            className="wrap-input100 validate-input"
                            data-validate="Valid email is required: ex@abc.xyz"
                        >
                            <input
                                className="input100"
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={e => {
                                    setUsername(e.currentTarget.value)
                                }}
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
                            <button onClick={(e) => onSubmit(e)} className="login100-form-btn">
                                Login
                                </button>
                        </div>
                        <div className="text-center p-t-136 center-account">
                            <Link to="/register">
                                Create your Account
                                    <i
                                    className="fa fa-long-arrow-right m-l-5"
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
