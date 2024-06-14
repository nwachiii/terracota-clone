import React, {useState} from 'react';
import {Flex, VStack, Text, useToast, Image, Box, Stack} from '@chakra-ui/react';
import {Button, FormTextarea, Radio} from '../../../ui-lib/ui-lib.components';
import {STORENAMEFROMDOMAIN} from '../../../constants/routes';
import {useMutation} from 'react-query';
import {AttemptLogin, outreach} from '../../../api/auth';
import justLogo from '../../../images/just-logo.svg';
import {themeStyles} from '../../../theme';
import {CloseIcon} from '@chakra-ui/icons';
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from 'react-icons/md';

const ThankYou = ({onAuthClose, setEmail, setPage, email, ...rest}) => {
  const toast = useToast();
  const [select, setSelect] = useState(null);
  const [other, setOther] = useState(null);
  const [collapse, setCollapse] = useState(true);
  const storeName = STORENAMEFROMDOMAIN;

  const loginForRegister = useMutation(formData => AttemptLogin(formData), {
    onSuccess: res => {
      if (res?.response?.data?.action == 'signup') {
        formik.resetForm();
        setEmail(email);
        setPage('successLink');
      } else if (res?.data?.action == 'login') {
        setPage('successLink');
      } else {
        return toast({
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
      toast({
        title: `${err.response.data.resolve ?? 'Oops...'}`,
        description: `${err.message ?? err.response.data.message ?? err}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const {mutate, isLoading} = useMutation(
    () => {
      return outreach({
        outreach: other || select,
        store_name: storeName,
      });
    },
    {
      onSuccess: res => {
        return loginForRegister.mutate({
          email: email,
          store_name: storeName,
        });
      },
      onError: error => {
        return toast({
          title: 'Oops ...',
          description: `${
            error?.response?.data?.message ??
            error?.response?.message ??
            error?.message ??
            'Something went wrong,we are working to resolve it'
          }`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const list = ['Facebook', 'Linkedin', 'Instagram', 'Via an Agent', 'Others'];

  const handleFinish = () => {
    mutate();
  };

  return (
    <Box
      bg="card_bg"
      maxW="440px"
      w={`100%`}
      px={{base: `16px`, md: '40px'}}
      pt="32px"
      pb="50px"
      borderRadius={'0px'}
      {...rest}
    >
      <Flex
        h="full"
        direction="column"
        justify={'center'}
        align="center"
        gap={{base: '24px', md: `16px`}}
      >
        <Stack align={`center`} gap="8px">
          <Text
            color="text"
            fontSize={'23px'}
            fontWeight={600}
            mt="0px"
            lineHeight={`140%`}
            className="gilda-display-regular"
          >
            Thank You!
          </Text>
          <Text
            {...themeStyles.textStyles.sl5}
            fontSize={'13px'}
            fontWeight={'300'}
            mt="0px !important"
            lineHeight={`140%`}
            color={`matador_text.500`}
          >
            Where did you hear about us?
          </Text>
        </Stack>
        {/* <Flex
          cursor={'pointer'}
          justify={'space-between'}
          align={'center'}
          px="14px"
          borderRadius={'0px'}
          onClick={() => setCollapse(!collapse)}
          py="10px"
          mt="20px"
          border="1px solid #D0D5DD"
          w="full"
        >
          <Text color="text">{select || 'Where did you here about us?'}</Text>
          <Box>
            {collapse ? (
              <MdKeyboardArrowDown size={30} color="#292D32" />
            ) : (
              <MdKeyboardArrowUp size={30} color="#292D32" />
            )}
          </Box>
        </Flex> */}
        <VStack
          mt="0px"
          align="start"
          w="full"
          // display={collapse ? 'none' : 'block'}
          transition={`.5s`}
          // h={collapse ? '0px' : '250px'}
          overflow={`hidden`}
        >
          {list.map(ref => (
            <Radio
              key={ref}
              px="2px"
              py="12px"
              onClick={() => {
                setSelect(ref);
                // setCollapse(true);
              }}
              isActive={select === ref}
            >
              <Text
                color="matador_text.300"
                key={ref}
                cursor={'pointer'}
                fontSize={'14px'}
                fontWeight={500}
              >
                {ref}
              </Text>
            </Radio>
          ))}
          {/* {select === 'Others' && ( */}
          <Box w="100%" h={select === 'Others' ? '92px' : `0px`} transition=".5s" overflow="hidden">
            <FormTextarea
              p="10px 14px"
              w="100%"
              h="84px"
              mt="0px"
              resize="none"
              border="1px solid "
              borderColor="matador_border_color.100"
              onChange={e => setOther(e.target.value)}
              placeholder="Where did you hear about us?"
              color={`matador_text.300`}
              fontSize={`14px`}
              borderRadius={`none`}
              _placeholder={{
                color: `matador_text.300`,
                fontSize: `14px`,
                fontWeight: `300`,
              }}
            />
          </Box>
          {/* )} */}
        </VStack>

        <Button
          isDisabled={!(other || select)}
          isLoading={isLoading || loginForRegister.isLoading}
          onClick={handleFinish}
          type="submit"
          bg="primary"
          w="full"
          color="white"
          fontSize={`16px`}
          fontWeight={`500`}
        >
          Finish
        </Button>
      </Flex>
    </Box>
  );
};

export default ThankYou;
