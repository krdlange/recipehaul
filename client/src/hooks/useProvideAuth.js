import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";


//useProvideAuth is a custom hook that when you use it you can access the login state, the signin, and signout
//have my context, I use my context, I am providing this useProvideAuth, which is the data I'd like to be able to share with all the components, globally shared data, 
//anywhere I need to use this data (this context), will need to be wrapped by a component that will be aware of the information we share 

//this is a custom hook that will be used to provide a state to check if the user is logged in or not and 2 functions to login and logout
// "!!" converts an object to boolean, this prevents against the object being translated into "null", so much easier to read, w/o this, no one will be aware of it
export default function useProvideAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
  
    //receiving a user object and a callback function (cb)
    const signin = async (user, cb) => {
        console.log('from signin function', user);
      try {
        const { data } = await axios("/users/login", {
          method: "POST",
          //I need to receive the user here, because I don't have it in this component.
          //That means that every time you call the signin function from this context, 
          //you need to pass 
          data: user,
        });
        //save the token in local storage when the user logs in
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        if (data.isAdmin) {
          setIsAdmin(true)
          navigate("/ordersdash")
          console.log(data.isAdmin);
        } else {
          setIsAdmin(false)
          navigate("/profile")
        }

      } catch (err) {
          console.log(err);
        throw err.response.data.message;
      }
    };
  
    const signout = (cb) => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setIsAdmin(false);
      cb();
    };
    return { isLoggedIn, signin, signout, isAdmin };
  }

  
