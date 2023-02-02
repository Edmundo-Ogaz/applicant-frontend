
import { useState, useEffect } from "react";

import Cookie from '../../utils/Cookie'

export default function Avatar() {
	console.log('Avatar')

  const [ username, setUsername ] = useState()

  useEffect(function onFirstMount() {
    const user = Cookie.getUser()
    setUsername(user.email)
  }, []);

  return (
    <span id="username">{username}</span>
  );
}