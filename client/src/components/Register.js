import React, { useState } from "react";
//import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../register.css";
import { Link } from "react-router-dom";
 import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
}
from 'mdb-react-ui-kit'; 


function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    profile_pic: "",
    address: "",
    city: "",
    zipcode: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios("/users/register", {
        method: "POST",
        data: user,
      });
      //redirect the user to the login page
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

    <MDBContainer fluid className='h-custom'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12' className='m-5'>

          <MDBCard className='card-registration card-registration-2' style={{borderRadius: '15px'}}>

            <MDBCardBody className='p-0'>

              <MDBRow>

                <MDBCol md='6' className='p-5 bg-white'>

                  <h3 className="fw-normal mb-5" style={{color: '#668835'}}>Login Information</h3>

                  <MDBInput wrapperClass='mb-4' labelClass='text-black' value={user.email} onChange={handleChange} name = "email" label='Email' size='lg' id='form3' type='text'/>

                  <MDBInput wrapperClass='mb-4' labelClass='text-black' value={user.password}
          onChange={handleChange} name="password" label='Password' size='lg' id='form3' type='text'/>

                </MDBCol>


                <MDBCol md='6' className='bg-indigo p-5'>

                  <h3 className="fw-normal mb-5 text-white" style={{color: '#4835d4'}}>Profile Setup</h3>

                
                  <MDBRow>

                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' labelClass='text-white' value={user.firstname}
          onChange={handleChange} name="firstname" label='First Name' size='lg' id='form1' type='text'/>
                    </MDBCol>

                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' labelClass='text-white' value={user.lastname}
          onChange={handleChange} name="lastname" label='Last Name' size='lg' id='form2' type='text'/>
                    </MDBCol>

                  </MDBRow>

                  <MDBInput wrapperClass='mb-4' labelClass='text-white' value={user.profile_pic}
          onChange={handleChange} name="profile_pic" label='Profile image URL' size='lg' id='form5' type='url'/>
                  <MDBInput wrapperClass='mb-4' value={user.address}
          onChange={handleChange} name="address" labelClass='text-white' label='Nr + Street' size='lg' id='form5' type='text'/>

                  <MDBRow>

                    <MDBCol md='5'>
                      <MDBInput wrapperClass='mb-4' value={user.city}
          onChange={handleChange} name="city" labelClass='text-white' label='City' size='lg' id='form6' type='text'/>
                    </MDBCol>

                    <MDBCol md='7'>
                      <MDBInput wrapperClass='mb-4' value={user.zipcode}
          onChange={handleChange} name="zipcode" labelClass='text-white' label='Zipcode' size='lg' id='form7' type='text'/>
                    </MDBCol>

                  </MDBRow>

                  <MDBCheckbox name='flexCheck' id='flexCheckDefault' labelClass='text-white mb-4' label='I accept the Terms and Conditions.' />
                  <MDBBtn  onClick={login} color="warning" size='lg'>Register</MDBBtn>

                </MDBCol>
              </MDBRow>

            </MDBCardBody>

          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>


{/*       <form>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input value={user.email}
          onChange={handleChange} type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
    </div>
    <div className="form-group col-md-6">
      <label for="inputPassword4">Password</label>
      <input value={user.password}
          onChange={handleChange} type="password" className="form-control" id="inputPassword4" placeholder="Password"/>
    </div>
  </div>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="inputEmail4">First name</label>
      <input value={user.firstname}
          onChange={handleChange} type="text" className="form-control" id="firstname" placeholder="firstname"/>
    </div>
    <div className="form-group col-md-6">
      <label for="inputPassword4">Last name</label>
      <input value={user.lastname}
          onChange={handleChange} type="text" className="form-control" id="lastname" placeholder="Last name"/>
    </div>
  </div>
  <div className="form-group">
    <label for="inputAddress2">Profile image URL</label>
    <input value={user.profile_pic}
          onChange={handleChange} type="url" className="form-control" id="profilepic" placeholder="Profile image URL"/>
  </div>
  <div className="form-group">
    <label for="inputAddress">Address</label>
    <input value={user.address}
          onChange={handleChange} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
  </div>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="inputCity">City</label>
      <input value={user.city}
          onChange={handleChange} type="text" className="form-control" id="inputCity"/>
    </div>
    <div className="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input value={user.zipcode}
          onChange={handleChange} type="text" className="form-control" id="inputZip"/>
    </div>
  </div>
  <button type="submit" className="btn btn-primary">Signup</button>
</form> */}
{/*       <div>
        <input
          value={user.username}
          onChange={handleChange}
          name="username"
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
        <button className=" btn btn-primary" onClick={login}>
          Sign up
        </button>
      </div> */}
    </div>
  )
}

export default Register