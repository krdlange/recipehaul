/* import React, { useEffect } from 'react'

export default function Home() {
    const[user, setUser] = useState()
    useEffect(()=>
    //getUserById ... setUser, fill in this elipses 
        getUserById
    }, [])
  return (
    //make Admin and profile buttons
    <div>Home
        {user.role === 'admin' ? <h1>Admin</h1> : <h1>profile</h1>}
    </div>
  )
} */

import React from "react";

export default function Home() {
  return (
    <div>
      Home
      <h1>this is very private</h1>
    </div>
  );
}
