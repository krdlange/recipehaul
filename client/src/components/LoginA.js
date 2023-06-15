import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Noty from "noty";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';

import "noty/lib/themes/mint.css";
import "noty/lib/noty.css";

function Login() {
  const [user, setUser] = useState({
    email: "test",
    password: "test",
  });

  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const login = async () => {
    try {
      await auth.signin(user);
      signInWasOk();
    } catch (err) {
      console.log(err);
      signInWasNotOk(err);
    }
  };

   const signInWasOk = () => {
    console.log("signin was ok")
    new Noty({
      type: "success",
      text: "Welcome to Recipe Haul!",
      timeout: 2000,
    }).show();
  };

  const signInWasNotOk = (message) => {
    console.log("signin was not ok")
    new Noty({
      type: "error",
      text: message,
      timeout: 2000,
    }).show();
  }; 

  const logout = async () => {
    try {
      await auth.signout(() => {
        navigate("/recipes");
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const login = async () => {
  //   try {
  //     const { data } = await axios("/users/login", {
  //       method: "POST",
  //       data: user,
  //     });
  //     //save the token in local storage when the user logs in
  //     localStorage.setItem("token", data.token);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const requestData = async () => {
  //   try {
  //     const { data } = await axios("/users/profile", {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const logout = () => {
  //   localStorage.removeItem("token");
  // };

  return (
    <div>
     <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="carrot fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0">Recipe Haul</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' value={user.email}
          onChange={handleChange} name = "email" label='Email address' id='formControlLg' type='email' size="lg"/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' value={user.password}
          onChange={handleChange} name= "password" label='Password' id='2formControlLg' type='password' size="lg"/>

            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={login}>Login</MDBBtn>
            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={logout}>Logout</MDBBtn>
            <p className='ms-5'>Don't have an account? <a href="/register" className="link-info" >Register here</a></p>

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://cdn.pixabay.com/photo/2015/06/01/23/43/pasta-794464_960_720.jpg"
            alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
        </MDBCol>

      </MDBRow>

    </MDBContainer> 


{/*       <div>
        <input
          value={user.email}
          onChange={handleChange}
          name="email"
          type="text"
          className="form-control mb-2"
        />
        <input
          value={user.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <button className="btn btn-primary" onClick={login}>
          Log in
        </button>
        <button className="btn btn-outline-dark ml-2" onClick={logout}>
          Log out
        </button>
      </div>  */}
    </div>
  );
}

export default Login;
