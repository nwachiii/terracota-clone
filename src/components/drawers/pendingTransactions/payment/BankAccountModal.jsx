import React from 'react';
import {Flex, Center, Box, Image, Text, useClipboard, useToast, Icon} from '@chakra-ui/react';
import {CopyIcon} from '@chakra-ui/icons';
import processingLoader from '../../../../images/processing-transaction.gif';
import {calculateFee} from '../../../../utils/calculateFee';
import {BsExclamationCircle} from 'react-icons/bs';

export const BankAccountModal = ({handleEndTransaction, loading, amount, trasferDetails}) => {
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

  return (
    <>
      {loading ? (
        <Center mt="20px" w="full" h="full" maxH="450px" flexDirection={'column'}>
          <Image alt="loader" w="50%" h="50%" src={processingLoader.src} />
          <Text
            color="text"
            fontWeight={500}
            fontSize={'28px'}
            my="25px"
            className="gilda-display-regular"
          >
            Fetching bank details
          </Text>
          <Text color="text" fontSize={'16px'} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Box px="24px" pb="38px" h={'fit-content'} overflowY={'scroll'}>
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
            <Text color="text" fontWeight={400} fontSize={{base: '16px', md: '16px'}}>
              You will Pay
            </Text>
            <Text color="#4B4B4B" fontWeight={600} fontSize={{base: '28px', md: '34px'}}>
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
                  <Text fontSize="14px" fontWeight={600}>
                    {trasferDetails?.data?.bank_name}
                  </Text>
                  <Text fontSize="25px" fontWeight={400} className="gilda-display-regular">
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
        </Box>
      )}
    </>
  );
};
export default BankAccountModal;
