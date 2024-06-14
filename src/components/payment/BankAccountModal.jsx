import React from 'react';
import {
  Flex,
  Center,
  Box,
  ModalContent,
  Image,
  Text,
  useClipboard,
  useToast,
  DrawerContent,
  HStack,
  Icon,
} from '@chakra-ui/react';
import {ArrowBackIcon, CloseIcon, CopyIcon} from '@chakra-ui/icons';
import processingLoader from '../../images/processing-transaction.gif';
import {calculateFee} from '../../utils/calculateFee';
import isMobile from '../../utils/extras';
import {Button} from '../../ui-lib';
import {BsExclamationCircle} from 'react-icons/bs';

export const BankAccountModal = ({
  handleEndTransaction,
  loading,
  amount,
  setPaymentStep,
  trasferDetails,
}) => {
  const toast = useToast();
  const {hasCopied, onCopy} = useClipboard(trasferDetails?.data?.account_number);

  const showToast = () => {
    toast({
      title: 'Account Number Copied! 👍🏻',
      status: 'info',
      duration: 1500,
      isClosable: true,
      position: 'top-right',
    });
    return <CopyIcon fontSize={'25'} color="primary" cursor="pointer" h={8} w={8} />;
  };

  const mainContent = (
    <>
      {loading ? (
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
          <Text color="text" opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Box w="full">
          <Flex mb="24px" justify={'space-between'} align={'center'}>
            <HStack
              spacing="12px"
              onClick={() => {
                setPaymentStep('index');
                handleEndTransaction();
              }}
              cursor="pointer"
            >
              <ArrowBackIcon fontSize={'25px'} cursor="pointer" color="text" />
              <Text
                className="gilda-display-regular"
                fontSize={{base: '18px', md: '28px'}}
                fontWeight={400}
              >
                Bank Transfer
              </Text>
            </HStack>
            <CloseIcon
              color="text"
              style={{cursor: 'pointer'}}
              size={20}
              onClick={() => {
                setPaymentStep('index');
                handleEndTransaction();
              }}
            />
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
            <Text color="text" fontSize={{base: '14px', md: '16px'}} fontWeight={400}>
              You will Pay
            </Text>
            <Text
              color="text"
              fontSize={{base: '28px', md: '33px'}}
              fontWeight={500}
              className="gilda-display-regular"
            >
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
                While most transfers are processed almost immediately, please note that it may take
                longer in some cases. Be rest assured that we will notify you via email as soon as
                the transfer is complete.
              </Text>
            </Flex>
          </Flex>
          <Button
            onClick={() => {
              setPaymentStep('index');
              handleEndTransaction();
            }}
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
  );

  return (
    <>
      {isMobile ? (
        <DrawerContent
          bg="card_bg"
          maxW="513px"
          px={{base: '20px', md: '34px'}}
          minH="383px"
          py={{base: '25px', md: '34px'}}
          // borderTopRadius={{base: '10px', md: '16px'}}
        >
          {mainContent}
        </DrawerContent>
      ) : (
        <ModalContent
          bg="card_bg"
          maxW="513px"
          px={{base: '20px', md: '34px'}}
          minH="383px"
          py={{base: '25px', md: '34px'}}
          borderRadius={{base: '10px', md: '5px'}}
        >
          {mainContent}
        </ModalContent>
      )}
    </>
  );
};
export default BankAccountModal;
