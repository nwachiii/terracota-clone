import React, {useState} from 'react';
import {
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  Box,
  Center,
  useClipboard,
  useToast,
  Spinner,
  Icon,
  Stack,
  Grid,
} from '@chakra-ui/react';
import {Button, FormInput} from '../../../ui-lib/ui-lib.components';
import depositIcon from '../../../images/icons/credit-card-shield.svg';
import cardImg from '../../../images/icons/card.svg';
import bank from '../../../images/icons/payment-with-bank.svg';
import checkIcon from '../../../images/icons/checkIcon.svg';
import {CheckIcon, CopyIcon, ArrowBackIcon, CloseIcon} from '@chakra-ui/icons';
import {BiPlus} from 'react-icons/bi';
import {useMutation, useQuery} from 'react-query';
import {fetchVirtualAccountNumber, makeeDepositToWallet} from '../../../api/Wallet';
import EmptyState from '../../appState/empty-state';
import {BUSINESS_ID, storeName} from '../../../constants/routes';
import {formatAmount, formatToCurrency} from '../../../utils';
import {RegularSpinner} from '../../../ui-lib/ui-lib.components/Spinner/spinner';
import {scrollBarStyles} from '../../common/ScrollBarStyles';
import {fetchSavedCards, makePaymentWithSavedCard} from '../../../api/payment';
import {BsExclamationCircle} from 'react-icons/bs';
import openExternalUrl from '../../../utils/openExternalLink';

const DepositWallet = ({step, setStep, setPage, onWalClose}) => {
  const toast = useToast();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const {hasCopied, onCopy} = useClipboard('2012737438');
  const [selectedCard, setSelectedCard] = useState(null);
  const VIRTUAL_ACCOUNT_NUMBER = useQuery(['fetchVirtualAccountNumber'], fetchVirtualAccountNumber);
  const bankDetails = VIRTUAL_ACCOUNT_NUMBER?.data?.data?.data?.data;

  const MAKE_DEPOSITS_MUTATION = useMutation(formData => makeeDepositToWallet(formData), {
    onSuccess: res => {
      const link = res?.data?.data?.data?.link;
      if (link) openExternalUrl(link, '_blank');
    },
    onError: err => {
      toast({
        title: 'Oops...',
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.response?.data[0] ??
          'Something went wrong'
        }`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const payWithSavedCardMutation = useMutation(formData => makePaymentWithSavedCard(formData), {
    onSuccess: res => {
      toast({
        title: 'Deposit successful👍🏻',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setPage('wallet');
    },
    onError: err => {
      toast({
        title: 'Oops...',
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.response?.data[0] ??
          'Something went wrong'
        }`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const {data: savedCards} = useQuery(['cardSaved'], fetchSavedCards);

  const handleAddNewCard = () => {
    const body = {
      amount: Number(50),
      channel: 'card',
      store: storeName,
    };
    MAKE_DEPOSITS_MUTATION.mutate(body);
  };

  const showToast = () => {
    toast({
      title: 'Account Number Copied!',
      status: 'info',
      duration: 1500,
      isClosable: true,
      position: 'top-right',
    });
    return (
      <CopyIcon onClick={onCopy} fontSize={'25'} color="primary" cursor="pointer" h={8} w={8} />
    );
  };

  const handleMakeDeposits = () => {
    if (!BUSINESS_ID) return;

    if (!selectedCard?.authorization_code)
      return toast({
        description: 'Please select a card',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });

    const paymentDetailsObj = {
      auth_code: selectedCard?.authorization_code,
      amount: Number(amount.replaceAll(',', '')),
      payment_data: {payment_type: 'wallet'},
      business_id: BUSINESS_ID(),
    };

    payWithSavedCardMutation.mutate(paymentDetailsObj);
  };

  const methods = [
    {
      id: 1,
      title: 'Debit Card',
      desc: 'NGN3,000,000 deposit limit',
      img: depositIcon.src,
    },
    {
      id: 2,
      title: 'Bank Transfer',
      desc: 'Transfer into designated account',
      img: bank.src,
    },
  ];

  const handleSelect = () => {
    if (selectedMethod?.id === 1) {
      if (!amount) return setAmountError('Enter an amount to proceed');
      setStep('card');
      setSelectedMethod(null);
    } else if (selectedMethod?.id === 2) {
      setStep('bank');
      setSelectedMethod(null);
    } else {
      toast({
        title: 'Select a payment method',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleInput = e => {
    const input = e.target;
    let val = input.value;

    const cleanedString = val.replace(/[^\d]/g, ''); // Remove non-numeric characters
    val = cleanedString.replace(/^0+(?=\d)/, '');

    const length = val.length;

    if (length <= 2) {
      val = '0.' + val.padStart(2, '0');
    } else {
      const integerPart = val.slice(0, length - 2);
      const decimalPart = val.slice(-2);
      val = integerPart + '.' + decimalPart;
    }

    setAmount(val);
  };

  const handleBack = () => {
    if (step !== 'method') setStep('method');
    else setPage('wallet');
  };

  return (
    <Stack
      h="full"
      // px={{ base: '15px', md: '23px' }}
      // py={{ base: '10px', md: '38px' }}
      bg="background"
      overflowY={'scroll'}
      css={scrollBarStyles}
    >
      <Flex
        justify={'space-between'}
        display={{base: 'none', lg: 'flex'}}
        bg="#FFF"
        borderBottom="1px solid #E4E4E4"
        align={'center'}
        p={4}
      >
        <HStack spacing="12px" onClick={handleBack} cursor="pointer">
          <ArrowBackIcon fontSize={'25px'} cursor="pointer" color="text" />
          <Text fontSize={'23px'} fontWeight={500} color="text" className="gilda-display-regular">
            Make a deposit
          </Text>
        </HStack>
        <CloseIcon
          display={{base: 'none', md: 'flex'}}
          fontSize={'12px'}
          cursor="pointer"
          color="text"
          onClick={onWalClose}
        />
      </Flex>
      {step === 'method' && (
        <>
          <Stack align="center" justify="center" py={8} w="full" bg="#F6F6F6">
            <Text
              fontFamily='Myriad Pro'
              textAlign={'center'}
              color="text"
              fontSize={16}
            >{`Enter Amount to deposit`}</Text>
            <FormInput
              color="text"
              bg="white"
              textAlign="center"
              leftAddon={
                <Text top="10px" fontSize={'28px'} color={amount ? 'text' : '#606060'}>
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
              placeholder="0.00"
              _placeholder={{
                fontSize: 28,
                color: '#606060',
              }}
              rounded='8px'
            />
          </Stack>
          <Stack justify="space-between" px={8} gap="12px">
            <Text
              fontFamily={'Montserrat'}
              mt="25px"
              color="#4B4B4B"
              fontSize={{base: '11px', md: '13px'}}
            >
              Select Payment Method
            </Text>
            <VStack
              spacing={{base: '10px', md: '14px'}}
              align={'stretch'}
            >
              {methods.map(method => (
                <Flex
                  key={method.id}
                  justify="space-between"
                  onClick={() => setSelectedMethod(method)}
                  cursor="pointer"
                  gap="5px"
                  direction={'row'}
                  px={{base: '10px', md: '14px'}}
                  py={{base: '11px', md: '16px'}}
                  w="full"
                  border={'1px solid'}
                  borderColor={selectedMethod?.id === method?.id ? '#DDB057' : '#E4E4E4'}
                  _hover={{border: '1px solid', borderColor: '#E4E4E4'}}
                  bg="#FBFCFC"
                  align="center"
                  rounded="12px"
                  fontFamily="Montserrat"
                >
                  <HStack spacing={'14px'}>
                    <Image alt="next_image" src={method.img} />
                    <VStack align={'stretch'} spacing={0}>
                      <Text
                        color="text"
                        fontSize={{base: '13px', md: '14px'}}
                        fontWeight={{base: '400', md: '600'}}
                      >
                        {method.title}
                      </Text>
                      <Text color="text" fontSize={{base: '13px', md: '14px'}} fontWeight={400}>
                        {method.desc}
                      </Text>
                    </VStack>
                  </HStack>
                  {selectedMethod?.id === method?.id ? (
                    <Image src={checkIcon.src} />
                  ) : (
                    <Center
                      w="16px"
                      h="16px"
                      borderRadius={'full'}
                      border="1px solid"
                      borderColor={'#E4E4E4'}
                    />
                  )}
                </Flex>
              ))}
            </VStack>
            <Button
              isDisabled={!amount && selectedMethod?.id === 1}
              onClick={handleSelect}
              w="full"
              color="white"
              mt="25px !important"
              h="50px"
              fontFamily="Montserrat"
              fontWeight={400}
              bg="#DDB057"
            >
              Proceed
            </Button>
          </Stack>
        </>
      )}
      {step === 'card' && (
        <Stack px={4} w="full">
          <Stack align="center" justify="center" py={8} w="full" bg="#F6F6F6">
            <Text
              fontFamily='Myriad Pro'
              textAlign={'center'}
              color="text"
              fontSize={16}
            >{`Enter Amount to deposit`}</Text>
            <FormInput
              color="text"
              bg="white"
              textAlign="center"
              leftAddon={
                <Text top="10px" fontSize={'28px'} color="text">
                  ₦
                </Text>
              }
              value={amount}
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
              disabled
              _disabled={{
                color: '#191919',
              }}
              rounded='8px'
            />
          </Stack>
          <Text pt={4} my={{base: '12px', md: '16px'}}>
            Select Card
          </Text>
          <VStack spacing="10px" mt="6px" align={'stretch'}>
            <Box mb={{base: '16px', md: '40px'}}>
              {savedCards?.data?.results?.length ? (
                <VStack spacing={{base: '6px', md: '10px'}} align={'stretch'}>
                  {savedCards?.data?.results?.map(card => (
                    <Flex
                      key={card?.id}
                      onClick={() => setSelectedCard(card)}
                      cursor="pointer"
                      gap="5px"
                      justify="space-between"
                      direction={'row'}
                      px={{base: '10px', md: '14px'}}
                      py={{base: '12px', md: '16px'}}
                      w="full"
                      p={{base: '12px', md: '16px'}}
                      border={selectedCard?.id === card.id ? '1px solid' : '1px solid'}
                      borderColor={selectedCard?.id === card.id ? '#191919' : '#E4E4E4'}
                      bg="#FBFCFC"
                    >
                      <HStack spacing={{base: '10px', md: '14px'}}>
                        <Image w={{base: '25px', md: 'auto'}} alt="next_image" src={cardImg.src} />
                        <VStack align={'stretch'} spacing={0}>
                          <Text
                            fontSize={{base: '14px', md: '18px'}}
                            fontWeight={{base: '400', md: '500'}}
                            color="text"
                          >
                            {card?.bank}
                          </Text>
                          <Text
                            fontSize={{base: '14px', md: '18px'}}
                            fontWeight={{base: '400', md: '500'}}
                            color="text"
                          >
                            **** ****{card?.last4}
                          </Text>
                        </VStack>
                      </HStack>

                      <Center
                        w="16px"
                        h="16px"
                        borderRadius={'full'}
                        border="1px solid"
                        borderColor={'#E4E4E4'}
                      >
                        {selectedCard?.id === card.id && (
                          <CheckIcon color={'text'} fontSize={'10px'} />
                        )}
                      </Center>
                    </Flex>
                  ))}
                </VStack>
              ) : (
                <EmptyState
                  icon={<Image w="auto" h="50px" opacity={0.5} src={cardImg.src} />}
                  noHeader
                  text={'No card has been added yet'}
                  height={{base: '90px', md: '150px'}}
                />
              )}
            </Box>
          </VStack>

          <Stack gap="16px">
            {savedCards?.data?.results?.length && (
              <Button
                mt={{base: '19px', lg: '36px'}}
                onClick={handleMakeDeposits}
                w="full"
                color="white"
                bg="primary"
                h="50px"
                fontWeight={400}
              >
                {payWithSavedCardMutation?.isLoading ? <Spinner /> : 'Proceed'}
              </Button>
            )}
            <Button
              disabled={MAKE_DEPOSITS_MUTATION?.isLoading}
              isLoading={MAKE_DEPOSITS_MUTATION?.isLoading}
              alignSelf="flex-end"
              bg="transparent"
              border="1px solid #DDB057"
              h="50px"
              leftIcon={<BiPlus color="#DDB057" size={20} />}
              onClick={handleAddNewCard}
              w="full"
              color="#DDB057"
              fontWeight={400}
            >
              {MAKE_DEPOSITS_MUTATION?.isLoading ? <Spinner /> : 'Add New Card'}
            </Button>
          </Stack>
        </Stack>
      )}
      {step === 'bank' && (
        <>
          {VIRTUAL_ACCOUNT_NUMBER.isLoading ? (
            <RegularSpinner />
          ) : (
            <Stack px={4}>
              <Box border="1px solid #E4E4E4" mt="22px" fontFamily="Montserrat">
                <Flex
                  color="text"
                  direction={'column'}
                  p="22px"
                  w="full"
                  minH="260px"
                  fontSize={'14px'}
                  fontWeight={400}
                  justify={'space-between'}
                  align="stretch"
                  gap="23px"
                >
                  <Text fontSize={{base: '12px', md: '14px'}} fontWeight={500}>
                    To add funds to your wallet, simply transfer from your bank account using the
                    details provided below.
                  </Text>
                  <Box>
                    <Text
                      fontSize={{base: '12px', md: '14px'}}
                      fontWeight={500}
                      textAlign={'center'}
                      mb="11px"
                    >
                      Your wallet account number
                    </Text>
                    <Flex
                      bg="#E4E4E4"
                      p="10px 35px"
                      justify={'space-between'}
                      align={'center'}
                      h="85px"
                    >
                      <Box color="black" textAlign={'center'} flex={1}>
                        <Text fontSize={{base: '12px', md: '14px'}} fontWeight={600}>
                          {bankDetails?.bank_name}
                        </Text>
                        <Text
                          fontSize={{base: '20px', md: '26px'}}
                          fontWeight={600}
                        >
                          {bankDetails?.account_number}
                        </Text>
                      </Box>
                      {hasCopied ? (
                        showToast(true)
                      ) : (
                        <CopyIcon
                          onClick={onCopy}
                          fontSize={'10'}
                          color="black"
                          cursor="pointer"
                          h={5}
                          w={5}
                        />
                      )}
                    </Flex>
                  </Box>
                  <Flex gap="5px" w="full">
                    <Icon mt="2px" color="text" as={BsExclamationCircle} fontSize={'13px'} />
                    <Text fontSize={12} fontWeight={400} color="#4B4B4B">
                      While most transfers are processed almost immediately, please note that it may
                      take longer in some cases. Be rest assured that we will notify you via email
                      as soon as the transfer is complete.
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
};

export default DepositWallet;
