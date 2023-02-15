
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';

import Cookie from '../../utils/Cookie'

import styles from './avatar.module.css'

export default function Avatar() {
	console.log('Avatar')

  const router = useRouter();
  const ref = useRef(null);

  const [ username, setUsername ] = useState()

  const [ showMenu, setShowMenu ] = useState(false)

  useEffect(function onFirstMount() {
    const user = Cookie.getUser()
    setUsername(user.email)
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log('handleClickOutside')
      if (ref.current && !ref.current.contains(event.target)) {
        setShowMenu(false)
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  function handleClick() {
    console.log('handleClick')
    setShowMenu(true)
  }

  function handleExit() {
    console.log('handleExit')
    setShowMenu(false)
    Cookie.remove()
    router.push('/login')
  }

  return (
    <>
      <div ref={ref} className={styles.avatar}>
        <span id="username" className={styles.title} onClick={ handleClick }>{username}</span>
        <ul className={styles.menu} style={{ display: showMenu ? 'block' : 'none'}}>
          <li className={styles.item} onClick={ handleExit }>Salir</li>
        </ul>
      </div>
    </>
  );
}