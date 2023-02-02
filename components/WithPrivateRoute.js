import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Cookie from '../utils/Cookie';

export default function WithPrivateRoute({ children }) {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const user = Cookie.getUser()
    if(user && user.logged) {
      setAuth(true)
    } else {
      router.push('/login');
    }
  }, []);

  return !auth ? <></>:<>{children}</>;
};