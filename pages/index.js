import { useState, useEffect } from 'react';

import Layout from '../components/layout';

import WithPrivateRoute from '../components/WithPrivateRoute.js'

import LoadingSpinner from '@/components/LoadingSpinner/index.js';

import Cookie from '@/utils/Cookie';

import companyService from '@/services/CompanyService';

export default function Home() {

  const [ company, setCompany ] = useState();
  const [ isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const user = Cookie.getUser()
    handleInit(user.company)
  }, [])

  const handleInit = async (companyId) => {
    try {
      setIsSearching(true)
      const company = await companyService.findById(companyId)
      setCompany(company)
    } catch(e) {
      toast.error(e.message);
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <>
      <Layout>
        <p>Empresa: {company?.name}</p>
        <p>Cuotas: {company?.subscription}</p>
        {isSearching && <LoadingSpinner/>}
      </Layout>
    </>
  );
}

Home.Auth = WithPrivateRoute