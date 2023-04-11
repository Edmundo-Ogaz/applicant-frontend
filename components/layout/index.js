import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookie from '../../utils/Cookie';
import Menu from '../menu';
import LoadingSpinner from '../LoadingSpinner';

import companyService from '@/services/CompanyService';

export default function Layout({ children }) {
  console.log('Layout')

  const router = useRouter();

  const [ isLoading, setIsLoading ] = useState(false)

  async function handleMenu(info) {
    try {
      console.log('handleMenu')
      switch (info.key) {
        case '1':
          navigate('/')
          break;
        case '2-1':
          navigate('/search')
          break;
        case '2-2':
          const user = Cookie.getUser()
          const company = await companyService.findById(user.company)
          if (company.subscription < 1) {
            throw new Error('Sin cuotas')
          }
          navigate('/test/assign')
          break;
        case '3-1':
          navigate('/user/list')
          break;
        case '3-2':
          navigate('/user/create')
          break;
        case '4-1':
          navigate('/postulant/list')
          break;
        case '4-2':
          navigate('/postulant/create')
          break;
        case '6-1':
          Cookie.remove()
          navigate('/login')
          break;
        default:
          break;
      }
    } catch(e) {
      toast.error(e.message);
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