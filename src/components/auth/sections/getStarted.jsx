import React from 'react';
import {Box, Flex, Link, Stack, Text, useToast} from '@chakra-ui/react';
import {Button, FormInput} from '../../../ui-lib/ui-lib.components';
import {themeStyles} from '../../../theme';
import {AttemptLogin} from '../../../api/auth';
import {STORENAMEFROMDOMAIN} from '../../../constants/routes';
import {useMutation} from 'react-query';
import {useFormik} from 'formik';

const storeName = STORENAMEFROMDOMAIN;

const GetStarted = ({onAuthClose, setPage, setEmail, ...rest}) => {
  const toast = useToast();

  const validateForm = values => {
    const errors = {};

    if (!values.email) errors.email = 'Please enter the email address';
    else if (!values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      errors.email = 'Please enter valid email address';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      mutate({
        email: values?.email,
        store_name: storeName,
      });
    },
    validateOnChange: true,
    validate: validateForm,
  });

  const {mutate, isLoading} = useMutation(formData => AttemptLogin(formData), {
    onSuccess: res => {
      if (
        res?.response?.data?.action == 'signup' ||
        res?.response?.data?.action == 'not_customer'
      ) {
        setPage('register');
        setEmail(formik.values.email);
      } else if (res?.data?.action == 'login') {
        setPage('successLink');
        setEmail(formik.values.email);
      } else {
        return toast({
          title: `Oops...`,
          description: `${
            res?.response?.data?.message ??
            res?.response?.message ??
            res?.message ??
            'Something went wrong,we are working to resolve it'
          }`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    },
    onError: err => {
      const data = err?.response?.data;
      if (data?.action == 'signup' || data?.action == 'not_customer') {
        setPage('register');
        setEmail(formik.values.email);
      } else if (data?.action == 'login') {
        setPage('successLink');
        setEmail(formik.values.email);
      } else {
        return toast({
          title: `Oops...`,
          description: `${data?.message || 'Something went wrong,we are working to resolve it'}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    },
  });

  return (
    <Box
      maxW="440px"
      w={`100%`}
      bg="card_bg"
      maxH={'358px'}
      px={{base: `24px`, md: '40px'}}
      py="32px"
      borderRadius={5}
      {...rest}
      boxShadow={'0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)'}
    >
      <Flex h="full" direction="column" justify={'center'} align="center">
        <Text fontSize={'23px'} fontWeight={600} color="text" className="gilda-display-regular">
          Get Started
        </Text>
        <Stack
          w={`100%`}
          gap={{base: `24px`, md: `16px`}}
          mt={`8px`}
          textAlign={`center`}
          align={`center`}
        >
          <Text
            {...themeStyles.textStyles.sl5}
            color="matador_text.500"
            // mt="8px"
            fontSize={{base: '13px', lg: '16px'}}
            lineHeight={`140%`}
          >
            Enter your email address
          </Text>
          <FormInput
            // mt="24px"
            type="email"
            name="email"
            id="email"
            lable={'Email address'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
            placeholder="Email Address"
            _placeholder={{fontSize: '13px'}}
            fontSize="16px"
            padding={{base: `12px 14px`, md: '14px 15px'}}
            height="100%"
            lineHeight="140%"
            // border={`1px solid`}
            // borderColor={`matador_text.400`}
            // borderColor={`teal`}
          />
          <Button
            // mt="24px"
            type="submit"
            color="white"
            bg="primary"
            w="full"
            fontSize={'18px'}
            onClick={formik.handleSubmit}
            isLoading={isLoading}
            border={`1px solid`}
            p="26px"
            // borderColor={`text`}
          >
            <Text lineHeight={'28px'} fontWeight={'500'} fontSize={'18px'}>
              Proceed
            </Text>
          </Button>
        </Stack>
        {/* <Text color='text' textAlign={'center'} fontSize={'16px'} mt='12px'>
          Already have an account?{` `}
          <Link as='span' color='primary'>
            Login
          </Link>
        </Text>
        <Text color='text' textAlign={'center'} fontSize={'16px'} mt='12px'>
          Are you an agent?{` `}
          <Link as='span' color='primary'>
            Signup as an agent
          </Link>
        </Text> */}
      </Flex>
    </Box>
  );
};

export default GetStarted;
