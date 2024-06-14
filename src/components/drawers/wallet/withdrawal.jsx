import React, { useState } from 'react'
import { Flex, HStack, Image, Text, VStack, Box, Select, useToast, FormControl, Spinner, Center, Textarea, Stack } from '@chakra-ui/react';
import { themeStyles } from '../../../theme';
import { Button, FormInput, FormSelect } from '../../../ui-lib/ui-lib.components';
import depositIcon from '../../../images/icons/credit-card-shield.svg';
import { useFormik } from 'formik';
import { storeName } from '../../../constants/routes';
import { useMutation, useQuery } from 'react-query';
import { fetchSupportedBanks, walletWithdrawal } from '../../../api/Wallet';
import * as Yup from 'yup';
import { scrollBarStyles } from '../../common/ScrollBarStyles';
import { ArrowBackIcon, CloseIcon } from '@chakra-ui/icons';

const formSchema = Yup.object().shape({
  account_number: Yup.string()
    .min(10, 'Account number should be 10 digits')
    .max(10, 'Account number should be 10 digits')
    .required('Please enter your account number'),
  amount: Yup.string()
    .required('Please enter an amount'),
  bank_code: Yup.string()
    .required('Please select a bank')
});


const WithdrawalWallet = ({ setPage, onWalClose }) => {
  const toast = useToast()
  const [bankName, setBank] = useState('')
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const LIST_ALL_BANKS = useQuery(['fetchSupportedBanks'], fetchSupportedBanks);

  const SUPPORTED_OFFICIAL_BANKS = LIST_ALL_BANKS?.data?.data?.message?.length ? LIST_ALL_BANKS?.data?.data?.message : [];

  const mutation = useMutation((formData) => walletWithdrawal(formData), {
    onSuccess: (res) => {
      onWalClose();
      toast({
        description: `Withdrawal successful`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: (err) => {
      toast({
        description: `${err?.response?.data?.message ?? err?.response?.message ?? err?.response?.data[0] ?? 'Something went wrong'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });


  const formik = useFormik({
    initialValues: {
      store_name: storeName,
      account_number: '',
      amount: '',
      description: '',
      bank_code: '',
    },
    validationSchema: formSchema,
    // validateOnChange: false,
    onSubmit: (values) => {
      let withdrawalPayload = { ...values, account_number: `${values.account_number}`, amount: Number(values.amount.replace(',', '')) };
      mutation.mutate(withdrawalPayload);
    }
  })


  const handleSelectBank = e => {
    const bank_ = SUPPORTED_OFFICIAL_BANKS?.find(bank => bank?.code === e.target.value)
    if (bank_) {
      setBank(bank_?.name)
      formik.setFieldValue('bank_code', bank_?.code)
    }
  }

  const handleInput = e => {
    const formatNumber = parseInt(e.target.value.replace(/,/g, '')).toLocaleString();
    if (formatNumber !== 'NaN')
      formik.setFieldValue('amount', formatNumber)
    else
      formik.setFieldValue('amount', '')
  };

  return (
    <Box
      px={{ base: '15px', lg: '24px' }}
      py={{ base: '10px', lg: '20px' }}
      // overflowY={'scroll'}
      css={scrollBarStyles}
      // h='90vh'
      bg='background'
    >
      <Flex display={{ base: 'none', lg: 'flex' }} justify={'space-between'} align={'center'}>
        <HStack spacing='8px' onClick={() => setPage('wallet')} cursor='pointer'>
          <ArrowBackIcon fontSize={'22px'} cursor='pointer' color='text' />
          <Text fontSize={'23px'} fontWeight={500} color='text' className='gilda-display-regular'>Make a withdrawal</Text>
        </HStack>
        <CloseIcon display={{ base: 'none', md: 'flex' }} fontSize={'15px'} cursor='pointer' color='text' onClick={onWalClose} />
      </Flex>

      <form onSubmit={formik.handleSubmit}>
        <Flex gap='8px' direction='column' align={'start'} my='28px'>
          <FormControl>
          <Stack align="center" justify="center" py={8} w="full" bg="#F6F6F6">
            <Text
              className="montserrat-bold"
              textAlign={'center'}
              color="text"
              fontSize={{base: '11px', md: '13px'}}
              fontWeight={{base: '400', md: '600'}}
            >{`Enter Amount to withdraw`}</Text>
            <FormInput
              color="text"
              bg="white"
              textAlign="center"
              leftAddon={
                <Text top="10px" fontSize={'28px'} color={amount ? "text" : '#606060'}>
                  ₦
                </Text>
              }
              onChange={handleInput}
              value={amount ? formatToCurrency(amount).replace('₦', '') : ''}
              error={amountError}
              maxW="75%"
              justify="center"
              w="100%"
              h="60px"
              boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
              fontSize={28}
              leftAddonStyle={{
                top: '10px',
                left: {base: '75px', sm: '120px', lg: '60px'},
              }}
              group={{
                justifyContent: 'center',
              }}
              placeholder='0.00'
              _placeholder={{
                fontSize: 28,
                color: '#606060'
              }}
            />
          </Stack>
          <Text
            className='montserrat-regular' mt={'10px'}
            color='text'
            fontSize={12}
            fontWeight={500}
          >{`Account Number`}</Text>
          <FormInput
            color='text' bg='card_bg' 
            error={formik.touched.account_number && formik.errors.account_number}
            onChange={formik.handleChange('account_number')}
            value={formik.values.account_number} h='48px'
            placeholder='Enter Account Number' rounded='5px' border='1px solid #E4E4E4'
          />
            <Text
              className='montserrat-regular'
              color='text' mt={'15px'}
              fontSize={12}
              fontWeight={500}
            >{`Select Bank`}</Text>
            <Select
              border={formik.touched.bank_code && formik.errors.bank_code ? `2px solid ${themeStyles.color.matador__red} !important` : '1px solid #D0D5DD !important'}
              placeholder={bankName || 'Select bank name'}
              color='text' bg='card_bg'
              value={bankName} onChange={handleSelectBank}
              rounded='5px'
              h='48px'
              fontSize={13}
              _placeholder={{
                letterSpacing: '0.52px',
                fontWeight: 500,
              }}
            >
              {SUPPORTED_OFFICIAL_BANKS?.length ? (
                SUPPORTED_OFFICIAL_BANKS.map((bank, index) => (
                  <option key={index} value={bank?.code}>
                    {bank?.name}
                  </option>
                ))
              ) : (
                <option value={''}>Fetching supported banks...</option>
              )}
            </Select>
            <Text
              color={themeStyles.color.matador__red}
              my={"5px"}
              fontSize={"11px"}
            >
              {formik.touched.bank_code && formik.errors.bank_code}
            </Text>
          </FormControl>
          <Text
            className='montserrat-regular' mt={'8px'}
            textAlign={'center'} color='text'
            fontSize={12}
            fontWeight={500}
          >{`Description (optional)`}</Text>
          <Textarea
            color='text' bg='card_bg' 
            type='text' onChange={formik.handleChange('description')}
            value={formik.values.description} h='95px'
            rounded='5px' border='1px solid #E4E4E4' resize='none'
          />
        </Flex>
        <Button w='full' color='white' mt='40px' type='submit' bg='#DDB057' h='50px'>
          {mutation?.isLoading ? <Spinner color='white' /> : 'Proceed'}
        </Button>
      </form>
    </Box>
  );
}

export default WithdrawalWallet