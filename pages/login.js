import React, { useEffect, useState } from "react";
import AuthUser from "./components/AuthUser";
import { ToastContainer, toast } from 'react-toastify';
//import Layout from "./layouts/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import NewHeader from "./components/NewHeader";
import NewFooter from "./components/NewFooter";

const Login = () => {
  //const { http, saveToken } = AuthUser(); // Call AuthUser only once

  //const [ setToken ] = AuthUser();

  const [saveToken, token, user, http, logout] = AuthUser();
  const router = useRouter();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = () => {
    // api call
    // http.post('/login', { email: email, password: password }).then((res) => {   
    //   if(res.error) {
    //     toast.error('Unauthorized');
    //   } else {
    //     setToken(res.data.user, res.data.access_token);
    //   }
    // });

    // http.post('/login', { email: email, password: password })
    // .then((res) => {   
    //     if (res.status === 401) {
    //       console.error('Unauthorized'); // Log the error to the console
    //       toast.error('Unauthorized');    // Display an error message to the user
    //     } else {
    //     setToken(res.data.user, res.data.access_token);
    //     toast.success('Successfully Logged In.');
    //     }
    // })
    // .catch((error) => {
    //     console.error('An error occurred:', error); // Log any other errors to the console
    //     toast.error('An error occurred');             // Display a generic error message to the user
    // });

    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, { email, password })
    .then((response) => {
        if (response.status === 401) {
            console.error('Unauthorized');
            toast.error('Unauthorized');
        } else {
            //setToken(response.data.user, response.data.access_token);
            sessionStorage.setItem('token', JSON.stringify(response.data.access_token));
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
            toast.success('Successfully Logged In.');
            router.push('/dashboard');
        }
    })
    .catch((error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized');
            toast.error('Unauthorized');
        } else {
            console.error('An error occurred:', error);
            toast.error('An error occurred');
        }
    });


  }

  const formFieldStyle = {
    display: 'block',
    width: '100%',
    padding: '.375rem .75rem',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: 'var(--bs-body-color)',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    backgroundColor: 'var(--bs-body-bg)',
    backgroundClip: 'padding-box',
    border: 'var(--bs-border-width) solid var(--bs-border-color)',
    borderRadius: 'var(--bs-border-radius)',
    transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out'
  };
  

  return (
    <>
    <NewHeader />

    
    <div className="row  mt-5 py-5 bg-white mx-0 login-card-class">
      <div className="col-sm-6 mt-5 mx-auto">
        <div className="card p-4" style={{border: '1px solid rgba(0, 0, 0, 0.175)'}}>
          <h1 className="text-center mb-3" style={{fontSize: '2.5rem', color: 'rgb(51,51,51)'}}>Login </h1>
          <div className="form-group">
            <label style={{color: "#333"}}>Email address:</label>
            <input
              type="email"
              className="form-control custom-select"
              style={formFieldStyle}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
          <div className="form-group mt-3">
            <label style={{color: "#333"}}>Password:</label>
            <input
              type="password"
              className="form-control custom-select"
              placeholder="Enter password"
              style={formFieldStyle}
              onChange={(e) => setPassword(e.target.value)}
              id="pwd"
            />
          </div>
          <button
            type="button"
            onClick={submitForm}
            className="btn btn-dark mt-4"
            style={{borderRadius: '0px'}}
          >
            Login
          </button>
        </div>
      </div>
    </div>
    <NewFooter />
    </>  
  );
}

export default Login;
