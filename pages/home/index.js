import { useState, useEffect } from 'react';

import { toast } from 'react-toastify'

import WithPrivateRoute from '@/components/WithPrivateRoute.js'
import Layout from '@/components/layout/index.js';
import LoadingSpinner from '@/components/LoadingSpinner/index.js';

import Cookie from '@/utils/Cookie';

import companyService from '@/services/CompanyService';
import testPostulantService from '@/services/TestPostulantService';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import useTranslation from 'next-translate/useTranslation'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
	console.log('Home')

  const [ company, setCompany ] = useState();
  const [ tests, setTests ] = useState([]);
  const [ totalTests, setTotalTests ] = useState(0);
  const [ isSearching, setIsSearching] = useState(false);

  const { t, lang } = useTranslation('page')

  useEffect(() => {
    const user = Cookie.getUser()
    handleInit(user.company)
  }, [])

  const handleInit = async (companyId) => {
    try {
      setIsSearching(true)
      const company = await companyService.findById(companyId)
      const testsPostulants = await testPostulantService.findByMonth(companyId)
      let aTests = [0, 0, 0]
      for (const testPostulant of testsPostulants) {
        aTests[testPostulant.test.id - 1] = aTests[testPostulant.test.id - 1] + 1
      }
      setCompany(company)
      setTests(aTests)
      setTotalTests(testsPostulants.length)
    } catch(e) {
      toast.error(e.message);
    } finally {
      setIsSearching(false)
    }
  }

  const data = {
    labels: [
      t('home.Tests'),
      t('home.Total'),
    ],
    datasets: [{
      label: 'Test',
      data: [totalTests, company?.subscription],
      backgroundColor: [
        'rgb(76 148 221)',
        'rgb(199 213 226)',
      ],
      hoverOffset: 4
    }]
  }

  const dataTest = {
    labels: [
      t('home.IC'),
      t('home.DISC'),
      t('home.Ceal')
    ],
    datasets: [{
      label: t('home.test'),
      data: [tests[0], tests[1], tests[2]],
      backgroundColor: [
        'rgb(59 169 147)',
        'rgb(201 221 54)',
        'rgb(89 160 209)'
      ],
      hoverOffset: 4
    }]
  }

  const options = {
    responsive: true,
    cutout: '70%',
    animation: {
      animateScale: true,
    }
  }

  return (
    <>
      <Layout>
        <p>{t('home.empresa')}: {company?.name}</p>
        <p>{t('home.cuotas')}: {company?.subscription}</p>
        <section style={{display: 'flex'}}>
          <div style={{position: 'relative'}}>
            <div className="chart-title" style={{position: 'absolute',
                                              width: '100%',
                                              height: '100%',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center'}}>
              <div style={{textAlign: 'center'}}>
                <b>{t('home.tests-creados')}</b>
                <br />
                <small>{totalTests} {t('home.total')}</small>
              </div>
            </div>
            <Doughnut data={data} options={options} style={{height: '20%', width: '20%'}}/>
          </div>
          <div style={{position: 'relative'}}>
            <Doughnut data={dataTest} options={options} style={{height: '20%', width: '20%'}}/>
            <div className="chart-title" style={{position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'}}>
            </div>
          </div>
        </section>
        {isSearching && <LoadingSpinner/>}
      </Layout>
    </>
  );
}

Home.Auth = WithPrivateRoute
