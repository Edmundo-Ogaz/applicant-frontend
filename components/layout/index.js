import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookie from '../../utils/Cookie';
import Menu from '../menu';
import LoadingSpinner from '../LoadingSpinner';

export default function Layout({ children }) {
  console.log('Layout')

  const router = useRouter();

  const [ isLoading, setIsLoading ] = useState(false)

  function handleMenu(info) {
    console.log('handleMenu')
    switch (info.key) {
      case '1':
        navigate('/')
        break;
      case '2-2':
        navigate('/search')
        break;
      case '2-3':
        navigate('/test/ic/list')
        break;
      case '3-3':
        navigate('/test/assign')
        break;
      case '4-1-1':
        navigate('/user/list')
        break;
      case '4-1-2':
        navigate('/user/create')
        break;
      case '4-2-1':
        navigate('/postulant/list')
        break;
      case '4-2-2':
        navigate('/postulant/create')
        break;
      case '5-2':
        Cookie.remove()
        navigate('/login')
        break;
      default:
        break;
    }

    function navigate(pathname) {
      if (router.pathname !== pathname) {
        router.push(pathname)
        setIsLoading(true)
      }
    }
  }

  useEffect(() => {
    const handleRouteChange = () => { setIsLoading(false) }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
      <>
       <Menu
          mode="horizontal"
          openAnimation="slide-up"
          handleMenu={handleMenu}
        />
        <main>{children}</main>
        {isLoading && <LoadingSpinner/>}
        <ToastContainer />
      </>
  )
}