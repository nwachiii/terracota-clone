import React, {useState} from 'react';
import {Box, Center, Flex, HStack, Image, Text, VStack} from '@chakra-ui/react';
import GetStarted from './sections/getStarted';
import SuccessLink from './sections/successLink';
import RegisterForm from './sections/registerForm';
import ThankYou from './sections/thankYou';
import {storeDetails} from '../../api/auth';
import {useQuery} from 'react-query';
import {useEffect} from 'react';
import {RiBuilding4Fill} from 'react-icons/ri';

const Register = ({onAuthClose}) => {
  const [page, setPage] = useState('getStarted');
  const [email, setEmail] = useState('');

  const STOREINFO = useQuery(['storeInfo'], storeDetails);
  const store_data = STOREINFO.data?.data?.data;
  const business_id = STOREINFO.data?.data?.business;

  useEffect(() => {
    localStorage.setItem('businessId', JSON.stringify(business_id));
  }, [STOREINFO.data]);

  return (
    <Flex
      w="full"
      h="full"
      justify={'flex-end'}
      px={{base: '1rem', md: `170px`}}
      py={`20px`}
      pt={{base: `40px`, md: `20px`}}
      align={{base: `flex-start`, md: 'center'}}
      className="montserrat-regular"
      zIndex={2}
    >
      <Flex
        flexDir={`column`}
        w={`100%`}
        gap={`40px`}
        align={{base: `center`, md: 'flex-end'}}
        h={`100%`}
      >
        <HStack
          gap={{base: '16px', md: '9px'}}
          display={{base: `flex`}}
          justify={`center`}
          position={{md: 'absolute'}}
          top={{md: '48px'}}
          left={{md: '48px'}}
          cursor={`pointer`}
          p={{base: `17px`, md: `0px`}}
        >
          {store_data?.company_image ? (
            <Center w="48px" h="48px" minWidth={`48px`} maxWidth={`48px`} position={`relative`}>
              <Image
                src={store_data?.company_image}
                alt={'Company Image'}
                w="100%"
                height="100%"
                minWidth={`100%`}
                minHeight={`100%`}
              />
            </Center>
          ) : (
            <RiBuilding4Fill fontSize={`48px`} />
          )}
          <VStack alignItems={'flex-start'}>
            {/* <Text
              fontSize={`20px`}
              textTransform={`uppercase`}
              // className="montserrat-regular"
              m={`0px !important`}
              fontWeight={{base: 400, md: 700}}
              fontFamily={{md: 'inter'}}
              textAlign={{base: `center`, md: `left`}}
            >
              {store_data?.business_name || `Your Logo`}
            </Text> */}
            {/* <Text
              fontWeight={{base: 400, md: 400}}
              fontFamily={{md: 'inter'}}
              m={`0px !important`}
              display={{base: `none`, md: `block`}}
            >
              {store_data?.location || `Business Bio`}
            </Text> */}
          </VStack>
        </HStack>
        {page === 'getStarted' && (
          <GetStarted setEmail={setEmail} setPage={setPage} onAuthClose={onAuthClose} />
        )}
        {page === 'successLink' && (
          <SuccessLink email={email} setEmail={setEmail} setPage={setPage} />
        )}
        {page === 'register' && (
          <RegisterForm
            email={email}
            setEmail={setEmail}
            setPage={setPage}
            onAuthClose={onAuthClose}
          />
        )}
        {page === 'thankYou' && (
          <ThankYou email={email} setEmail={setEmail} setPage={setPage} onAuthClose={onAuthClose} />
        )}
      </Flex>
    </Flex>
  );
};

export default Register;
