import React from "react";
import useProvideAuth from "../hooks/useProvideAuth";
import authContext from "../contexts/auth";

// context.probidr component available on the context instance is used to provide the context to is child components, no matter how deep they are
//this is how we make sure we don't have to pass routes from parent to child
/* for instanceof, in <h1>hello</h1> the "hello" is the child, so whatever is the child will have access to this value */
// so in this case, any child will have access to this auth
export default function AuthProvider({ children }) {
    //create a variable that calls this useProvideAuth, auth is a returning object (isLoggedIn, login, and signout) as provided as a result of the useProvideAuth hook
  const auth = useProvideAuth();
  //this value is what I want to share in this AuthProvider, and it will be the context which you are sharing 
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
