import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';

import React, {useState} from 'react';
import {
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  Box,
  Center,
  useToast,
  useClipboard,
  ModalCloseButton,
} from '@chakra-ui/react';
import {Button, CustomizableButton, FormInput} from '../../../ui-lib/ui-lib.components';
import depositIcon from '../../../images/icons/mainstone-wallet-card.svg';
import bank from '../../../images/icons/payment-with-bank.svg';
import wallet from '../../../images/icons/debit-card.svg';
import {CheckIcon, CopyIcon} from '@chakra-ui/icons';
import {useAssetPayment} from '../../../ui-lib/ui-lib.hooks';
import mainstoneBG from '../../../images/just-logo.svg';
import processingLoader from '../../../images/processing-transaction.gif';
import successfulLoader from '../../../images/successful-transaction.gif';
import {calculateFee} from '../../../utils/calculateFee';
import isMobile from '../../../utils/extras';
import {BsExclamationCircle} from 'react-icons/bs';

const MakeDepositModal = ({depositModal, info}) => {
  const toast = useToast();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [step, setStep] = useState('method');
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const {hasCopied, onCopy} = useClipboard('2012737438');
  const amountToPay = amount?.replaceAll(',', '');

  const paymentDetails = {
    equity_id: info && info?.id,
    amount_to_pay: amountToPay,
    is_coown: false,
    pending: true,
  };

  const paymentType = 'deposit';

  const {
    handleBankTransfer,
    handlePayFromWallet,
    handlePaywithCard,
    authUrl,
    setAuthUrl,
    isLoading,
    setLoading,
    paymentStep,
    setPaymentStep,
    trasferDetails,
    setTransferDetails,
    formattedAmount,
    isAboveLimit,
    paymentMutation,
    depositMutation,
    handleEndTransaction,
  } = useAssetPayment({paymentType, amountToPay, modal: depositModal, paymentDetails});

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

  const methods = [
    {
      id: '1',
      title: 'Debit Card',
      desc: 'NGN3,000,000 deposit limit',
      img: depositIcon.src,
    },
    {
      id: '2',
      title: 'Wallet',
      desc: 'Make payment from your wallet',
      img: wallet.src,
    },
    {
      id: '3',
      title: 'Bank Transfer',
      desc: 'Transfer into designated account',
      img: bank.src,
    },
  ];

  const handleSelect = () => {
    if (!amount) return setAmountError('Enter an amount to proceed');
    if (selectedMethod?.id === '1') {
      setStep('card');
      setSelectedMethod(null);
    } else if (selectedMethod?.id === '2') {
      setStep('wallet');
      setSelectedMethod(null);
    } else if (selectedMethod?.id === '3') {
      handleBankTransfer();
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
    const formatNumber = parseInt(e.target.value.replace(/,/g, '')).toLocaleString();
    setAmountError('');
    if (formatNumber !== 'NaN') {
      setAmount(formatNumber);
    } else {
      setAmount('');
    }
  };

  const success = paymentMutation.isSuccess || depositMutation.isSuccess;

  const mainContent = (
    <Box px={{base: 0, md: '23px'}} py={{base: '0', md: '18px'}}>
      <ModalCloseButton
        color="text"
        top={{base: '12px', md: '25px'}}
        right={{base: '15px', md: '30px'}}
        fontSize={{base: '15px', md: '20px'}}
        onClick={depositModal?.onClose}
      />

      {step === 'method' && (
        <>
          <Text
            mb={{base: '25px', md: '40px'}}
            color="text"
            fontSize={{base: '16px', md: '25px'}}
            fontWeight={{base: 500, md: 500}}
            className="gilda-display-semibold"
          >
            Make a Deposit
          </Text>
          <FormInput
            leftAddon={
              <Text color="text" fontSize={'20px'}>
                ₦
              </Text>
            }
            label="Amount to deposit"
            onChange={handleInput}
            value={amount}
            error={amountError}
          />

          <Text
            color="text"
            mt="16px"
            fontSize={{base: '13px', md: '16px'}}
            fontWeight={{base: 400, md: 400}}
          >
            Select Payment Method
          </Text>
          <VStack spacing="6px" mt="16px" align={'stretch'}>
            {methods.map(method => (
              <Flex
                key={method.id}
                cursor="pointer"
                onClick={() => setSelectedMethod(method)}
                border={selectedMethod?.id === method.id ? '1px solid' : '1px solid'}
                borderColor={selectedMethod?.id === method.id ? '#E4E4E4' : 'shade'}
                _hover={{border: '1px solid', borderColor: '#E4E4E4'}}
                direction={'row'}
                px="14px"
                py="16px"
                justify="space-between"
              >
                <HStack spacing={'14px'}>
                  <Image alt="next_image" src={method.img} />
                  <VStack align={'stretch'} spacing={0}>
                    <Text
                      color="text"
                      fontSize={{base: '13px', md: '16px'}}
                      fontWeight={{base: 500, md: 500}}
                    >
                      {method.title}
                    </Text>
                    <Text
                      color="text"
                      fontSize={{base: '13px', md: '16px'}}
                      fontWeight={{base: 400, md: 400}}
                    >
                      {method.desc}
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
                  {selectedMethod?.id === method.id && (
                    <CheckIcon color={'text'} fontSize={'10px'} />
                  )}
                </Center>
              </Flex>
            ))}
          </VStack>
          <Button onClick={handleSelect} w="full" color="white" mt="40px" bg="primary">
            Proceed
          </Button>
        </>
      )}

      {step === 'card' && (
        <Box my="30px">
          {success ? (
            <Center mt="20px" w="full" h="full" flexDirection={'column'} textAlign={'center'}>
              <Image alt="loader" w="150px" h="150px" src={successfulLoader.src} />
              <Text
                color="text"
                textAlign={'center'}
                fontWeight={{base: 600, md: 400}}
                className="gilda-display-regular"
                fontSize={'28px'}
                my={{base: '12px', md: '25px'}}
              >
                Transaction Successful
              </Text>
              <Text
                color="text"
                opacity={0.8}
                fontSize={{base: '14px', md: '16px'}}
                fontWeight="400"
              >
                Your payment has been successfully processed
              </Text>
            </Center>
          ) : isLoading ? (
            <Center mt="20px" w="full" h="full" flexDirection={'column'} textAlign={'center'}>
              <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
              <Text
                color="text"
                textAlign={'center'}
                fontWeight={{base: 600, md: 400}}
                className="gilda-display-regular"
                fontSize={'28px'}
                my={{base: '12px', md: '25px'}}
              >
                Processing payment
              </Text>
              <Text
                color="text"
                opacity={0.8}
                fontSize={{base: '14px', md: '16px'}}
                fontWeight="400"
              >
                Wait a moment
              </Text>
            </Center>
          ) : (
            <Flex
              w="full"
              h="full"
              direction="column"
              justify={'center'}
              align={'center'}
              gap="20px"
            >
              <Text
                color="text"
                fontWeight={500}
                fontSize={{base: '18px', md: '28px'}}
                className="gilda-display-semibold"
                lineHeight={{base: '24px', md: '36px'}}
              >
                Continue with card
              </Text>
              <Text
                color="text"
                textAlign={'center'}
                fontWeight={400}
                fontSize={{base: '13px', md: '16px'}}
                lineHeight={{base: '18px', md: '25px'}}
              >
                In order to finish the payment process, you will be charged through your
                debit/credit card.
              </Text>
              <Flex mt="27px" gap="26px" justify="space-between" align="center" w="full">
                <CustomizableButton
                  border="1px solid"
                  color="#191919"
                  borderColor="#191919"
                  bg="white"
                  h="49px"
                  w={{base: '50%', md: '250px'}}
                  onClick={() => setStep('method')}
                >
                  Cancel
                </CustomizableButton>
                <Button
                  onClick={handlePaywithCard}
                  color="white"
                  w={{base: '50%', md: '250px'}}
                  bg="primary"
                  h="49px"
                >
                  Proceed
                </Button>
              </Flex>
            </Flex>
          )}
        </Box>
      )}

      {step === 'wallet' && (
        <Box my="30px">
          {success ? (
            <Center mt="20px" w="full" h="full" flexDirection={'column'} textAlign={'center'}>
              <Image alt="loader" w="150px" h="150px" src={successfulLoader.src} />
              <Text
                color="text"
                textAlign={'center'}
                fontWeight={{base: 600, md: 400}}
                className="gilda-display-regular"
                fontSize={'28px'}
                my={{base: '12px', md: '25px'}}
              >
                Transaction Successful
              </Text>
              <Text
                color="text"
                opacity={0.8}
                fontSize={{base: '14px', md: '16px'}}
                fontWeight="400"
              >
                Your payment has been successfully processed
              </Text>
            </Center>
          ) : isLoading ? (
            <Center mt="20px" w="full" h="full" flexDirection={'column'} textAlign={'center'}>
              <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
              <Text
                color="text"
                textAlign={'center'}
                fontWeight={{base: 600, md: 400}}
                className="gilda-display-regular"
                fontSize={'28px'}
                my={{base: '12px', md: '25px'}}
              >
                Processing payment
              </Text>
              <Text
                color="text"
                opacity={0.8}
                fontSize={{base: '14px', md: '16px'}}
                fontWeight="400"
              >
                Wait a moment
              </Text>
            </Center>
          ) : (
            <Flex
              w="full"
              h="full"
              direction="column"
              justify={'center'}
              align={'center'}
              gap="20px"
            >
              <Text
                color="text"
                fontWeight={500}
                fontSize={{base: '18px', md: '28px'}}
                className="gilda-display-semibold"
                lineHeight={{base: '24px', md: '36px'}}
              >
                Continue with your wallet
              </Text>
              <Text
                color="text"
                textAlign={'center'}
                fontWeight={400}
                fontSize={{base: '13px', md: '16px'}}
                lineHeight={{base: '18px', md: '25px'}}
              >
                In order to finish the payment process, you will be charged through your wallet.
              </Text>
              <Flex mt="27px" gap="26px" justify="space-between" align="center" w="full">
                <CustomizableButton
                  border="1px solid"
                  color="#191919"
                  borderColor="#191919"
                  bg="white"
                  h="49px"
                  w={{base: '50%', md: '250px'}}
                  onClick={() => setStep('method')}
                >
                  Cancel
                </CustomizableButton>
                <Button
                  onClick={handlePayFromWallet}
                  color="white"
                  w={{base: '50%', md: '250px'}}
                  bg="primary"
                  h="49px"
                >
                  Proceed
                </Button>
              </Flex>
            </Flex>
          )}
        </Box>
      )}

      {step === 'bank' && (
        <>
          {isLoading ? (
            <Center mt="20px" w="full" h="full" flexDirection={'column'}>
              <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
              <Text
                color="text"
                textAlign={'center'}
                fontWeight={{base: 600, md: 400}}
                className="gilda-display-regular"
                fontSize={'28px'}
                my={{base: '12px', md: '25px'}}
              >
                Fetching bank details
              </Text>
              <Text
                color="text"
                opacity={0.8}
                fontSize={{base: '14px', md: '16px'}}
                fontWeight="400"
              >
                Wait a moment
              </Text>
            </Center>
          ) : (
            <Box w="full">
              <Flex mb="24px" direction="row" justify="space-between" align={'center'}>
                <Text
                  className="gilda-display-regular"
                  fontSize={{base: '18px', md: '28px'}}
                  fontWeight={400}
                >
                  Bank Transfer
                </Text>
              </Flex>

              <Flex
                my="12px"
                h="130px"
                w="full"
                color="white"
                border="1px solid"
                borderColor={'shade'}
                bg="card_bg"
                align={'center'}
                justify={'center'}
                direction="column"
              >
                <Text color="primary" fontSize={{base: '14px', md: '18px'}} fontWeight={400}>
                  You will Pay
                </Text>
                <Text color="primary" fontSize={{base: '28px', md: '34px'}} fontWeight={500}>
                  {calculateFee(amount)}
                </Text>
              </Flex>

              <Flex
                w="full"
                color="text"
                direction={'column'}
                my="22px"
                minH="260px"
                fontSize={'14px'}
                fontWeight={400}
                justify={'space-between'}
                align="stretch"
                gap="23px"
              >
                <Box>
                  <Text
                    color="text"
                    fontSize={{base: '12px', md: '13px'}}
                    fontWeight={500}
                    textAlign={'center'}
                    mb="12px"
                  >
                    {
                      'Kindly proceed with the payment to the provided account number , and please be aware that there is a fee associated with transfer.'
                    }
                  </Text>
                  <Text
                    color="text"
                    fontSize={{base: '12px', md: '13px'}}
                    fontWeight={500}
                    textAlign={'center'}
                  >
                    {trasferDetails?.data?.note}
                  </Text>
                </Box>
                <Box>
                  <Flex
                    w="80%"
                    mx="auto"
                    bg="shade"
                    p="10px 35px"
                    justify={'space-between'}
                    align={'center'}
                  >
                    <Box w="25px" />
                    <Box color="black" textAlign={'center'}>
                      <Text color="black" fontSize={{base: '12px', md: '13px'}} fontWeight={500}>
                        {trasferDetails?.data?.bank_name}
                      </Text>
                      <Text
                        color="black"
                        fontSize={{base: '20px', md: '25px'}}
                        fontWeight={400}
                        className="gilda-display-regular"
                      >
                        {trasferDetails?.data?.account_number}
                      </Text>
                    </Box>
                    {hasCopied ? (
                      showToast(true)
                    ) : (
                      <CopyIcon
                        onClick={onCopy}
                        fontSize={'25'}
                        color="black"
                        cursor="pointer"
                        h={8}
                        w={8}
                      />
                    )}
                  </Flex>
                </Box>
                <Flex gap="5px" w="full">
                  <Icon mt="2px" color="text" as={BsExclamationCircle} fontSize={'13px'} />
                  <Text fontSize={{base: '12px', md: '11px'}} fontWeight={400} color="#4B4B4B">
                    While most transfers are processed almost immediately, please note that it may
                    take longer in some cases. Be rest assured that we will notify you via email as
                    soon as the transfer is complete.
                  </Text>
                </Flex>
              </Flex>
              <Button
                onClick={() => setStep('method')}
                color="white"
                w="full"
                bg="primary"
                h="49px"
              >
                Done
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          onCloseComplete={() => {
            setAmount('');
            handleEndTransaction();
            setStep('method');
            setSelectedMethod(null);
          }}
          px="45px"
          mx="auto"
          minH="fit-content"
          minW={{base: '90%', lg: '276px'}}
          isOpen={depositModal?.isOpen}
          onClose={depositModal?.onClose}
          placement="bottom"
        >
          <DrawerOverlay />
          <DrawerContent
            maxW="622px"
            minH="322px"
            bg="card_bg"
            p={{base: '20px', md: '30px'}}
            borderTopRadius={{base: '8px', md: '12px'}}
          >
            {mainContent}
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          onCloseComplete={() => {
            setAmount('');
            handleEndTransaction();
            setStep('method');
            setSelectedMethod(null);
          }}
          px="45px"
          mx="auto"
          minH="fit-content"
          minW={{base: '90%', lg: '276px'}}
          isOpen={depositModal?.isOpen}
          onClose={depositModal?.onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            maxW="622px"
            minH="322px"
            p={{base: '20px', md: '30px'}}
            borderRadius={{base: '8px', md: '0px'}}
          >
            {mainContent}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
export default MakeDepositModal;
