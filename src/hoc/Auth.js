import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Flex} from '@chakra-ui/react';
import {Spinner} from '../ui-lib';
import {useQuery} from 'react-query';
import {storeDetails} from '../api/auth';
import {LoggedinUser} from '../constants/routes';

function Auth(Component, rest) {
  const AuthCheck = () => {
    const router = useRouter();
    const [checked, setChecked] = useState(false);
    const STOREINFO = useQuery(['storeInfo'], storeDetails);
    const business_id = STOREINFO.data?.data?.business;

    useEffect(() => {
      localStorage.setItem('businessId', JSON.stringify(business_id));
    }, [STOREINFO.data]);

    useEffect(() => {
      if (LoggedinUser) {
        setChecked(true);
      } else {
        router.push('/');
      }
    }, []);

    return (
      <div>
        {checked ? (
          <Component />
        ) : (
          <Flex justify="center" align="center" h="100vh" w="100vw">
            <Spinner {...rest} />
          </Flex>
        )}
      </div>
    );
  };
  return AuthCheck;
}

export default Auth;
