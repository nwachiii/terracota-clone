import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';
import { Spinner } from '../ui-lib';
import { storeDetails } from '../api/auth';
import { useQuery } from 'react-query';
import { LoggedinUser } from '../constants/routes';

function LandingWrapper(Component) {
  const AuthCheck = () => {
    const router = useRouter()
    const [checked, setChecked] = useState(false)
    const STOREINFO = useQuery(['storeInfo'], storeDetails);
    const business_id = STOREINFO.data?.data?.business;

    useEffect(() => {
      localStorage.setItem('businessId', JSON.stringify(business_id));
    }, [STOREINFO.data]);


    useEffect(() => {
      if (LoggedinUser) {
        router.push('/properties')
      } else {
        setChecked(true)
      }
    }, [])

    return (
      <div>
        {checked ? (
          <Component />
        ) : (
          <Flex justify='center' align='center' h='100vh' w='100vw'>
            <Spinner />
          </Flex>
        )}
      </div>
    )
  }
  return AuthCheck
};


export default LandingWrapper
