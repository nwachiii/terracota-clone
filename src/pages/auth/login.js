import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Center } from '@chakra-ui/react';
import { verifyMagicToken } from '../../api/auth';
import { useQuery } from 'react-query';
import { Spinner } from '../../ui-lib';
import RegisterPage from '../../components/auth/register_page';

const Login = () => {
  const [err, setError] = useState(null);
  const router = useRouter();
  const { magic } = router.query;

  const magicQuery = useQuery(['verifyMagicToken', magic], () => verifyMagicToken({ token: magic }), {
    onSuccess: (res) => {
      if (res?.data?.valid === 'true' || res?.data?.valid === true) {
        if (typeof window !== null) {
          localStorage.setItem('LoggedinUser', JSON.stringify(res?.data?.user));
          localStorage.setItem('userToken', res?.data?.user_tokens?.token);
          localStorage.setItem('userRefreshToken', res?.data?.user_tokens?.refresh);
          localStorage.setItem('storeDetails', JSON.stringify(res?.data?.store));
          window.location = `${window.location.origin}/properties`;
        }
      } else {
        setError(res?.data?.message);
        setTimeout(() => router.push('/'), 3000);
      }
    },
    onError: (err) => {
      setError(err?.response?.data?.message || 'Opps, Something went wrong !');
      setTimeout(() => router.push('/'), 3000);
    },
    enabled: Boolean(magic)
  })

  return (
    <Box w='full' h='full'>
      {magic ? (
        <Box h={'50vh'}>
          {magicQuery?.isLoading && (
            <Center h='full' w='full'>
              <Spinner color={err ? 'red' : '#191919'} />
            </Center>
          )}
        </Box>
      ) : (
        <RegisterPage />
      )}
    </Box>
  );
};

export default Login;
