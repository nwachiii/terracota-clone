import {Box, HStack, Image, Stack, Text, useDisclosure, useMediaQuery} from '@chakra-ui/react';

import React from 'react';
import ChakraBox from '../../components/chakraBox';
import HoverText from '../../../../ui-lib/ui-lib.components/hover/hoverOnText';
import rightconLightShade from '/src/images/icons/rightconLightShade.svg';
import CustomPaymentBreakdownForAssets from './paymentBreakDown';

const TransactionInfo = ({equityInfo, transactionInfo}) => {
  const [isBelowXl] = useMediaQuery('(max-width: 535px)');
  const drawerDisclosure = useDisclosure();

  return (
    <>
      <Stack spacing="14px" w="full">
        <Stack
          // p={{ md: "21.461px 24.894px", base: "16px 17.501px" }}
          py={{base: '16px', md: '21.461px'}}
          pb={{md: '20px', base: '16px'}}
          px={{base: '17.501px', md: '24.894px'}}
          spacing="none"
          justifyContent="center"
          w="full"
          bg="#DDB057"
          h={{md: '129.88px', base: '101.578px'}}
          boxShadow="0px 3.434px 8.584px 0px rgba(0, 0, 0, 0.03)"
        >
          <Stack align="center" spacing={{base: '9.5px', md: '12.88px'}} alignSelf="center">
            <Text fontSize="12.018px" fontWeight="400" color={'#ffffff'}>
              {transactionInfo.amount_paid_heading}
            </Text>
            <Text
              fontSize={{base: '16px', md: '24px'}}
              fontWeight="400"
              lineHeight={{base: '19px', md: '26px'}}
              color="#ffffff"
            >
              {transactionInfo.amountPaid}
            </Text>
          </Stack>

          <Stack spacing="4px" mt={{base: '9.05px', md: '12.88px'}} w="full">
            <HStack w="full" justifyContent="space-between">
              <Text fontSize={{md: '12px', base: '10px'}} fontWeight="400" color="#ffffff">
                My progress
              </Text>
              <Text fontSize={{md: '12px', base: '10px'}} fontWeight="400" color="#ffffff">
                {transactionInfo.progress}
              </Text>
            </HStack>
            <Box borderRadius="48px" h="8px" bg="#FFFFFF99" w="full">
              <ChakraBox
                borderRadius="48px"
                h="full"
                position="relative"
                bg="#ffffff"
                initial={{
                  width: '0%',
                }}
                animate={{
                  width: `${transactionInfo.progress}`,
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.4,
                  ease: 'easeInOut',
                }}
                maxW="100%"
              />
            </Box>
          </Stack>
        </Stack>
        {equityInfo?.payment_plan ? (
          <HStack w="full" spacing={{base: '12.33px', md: '21.84px'}}>
            <HStack
              w="full"
              justify="space-between"
              border=" 0.858px solid #C3C3C3"
              p={{md: '19.744px 12.876px', base: ' 13.88px 9.052px'}}
              maxH="81.68px"
              alignSelf="stretch"
              align="center"
            >
              <Stack justify="center" h="full" spacing={{base: '2.41px', md: '3.43px'}}>
                <Text
                  textTransform="capitalize"
                  color="#4B4B4B"
                  fontSize={{md: '10.347px', base: '9px'}}
                  fontWeight="400"
                >
                  Due Balance
                </Text>

                <HoverText
                  lens={isBelowXl ? 8 : 18}
                  text={transactionInfo.due_balance}
                  fontSize={{md: '10.347px', base: '10px'}}
                  fontWeight={{base: '700', md: '400'}}
                  color="#000"
                />
              </Stack>
              <Stack h="full" justify="center" spacing={{base: '2.41px', md: '3.43px'}} align="end">
                <Text
                  textTransform="capitalize"
                  color="#4B4B4B"
                  fontSize={{md: '10.347px', base: '9px'}}
                  fontWeight="400"
                >
                  Due Date
                </Text>

                <HoverText
                  text={transactionInfo.due_date}
                  fontSize={{md: '10.347px', base: '9px'}}
                  fontWeight={{base: '700', md: '400'}}
                  color="#000"
                />
              </Stack>
            </HStack>

            <HStack
              w="full"
              justify="center"
              border=" 0.858px solid #C3C3C3"
              maxH="81.68px"
              h="full"
              p={{base: '12.019px 10.094px', md: '17.096px 15.48px'}}
            >
              <Stack spacing={{base: '2.41px', md: '3.43px'}} align="center">
                <Text
                  textTransform="capitalize"
                  color="#4B4B4B"
                  fontSize={{md: '10.347px', base: '9px'}}
                  fontWeight="400"
                >
                  Outstanding Balance
                </Text>
                <Text
                  fontSize={{md: '16px', base: '10px'}}
                  fontWeight={{base: '700', md: '400'}}
                  color="#000"
                >
                  {transactionInfo.outStanding_balance}
                </Text>
                {equityInfo?.payment_plan?.plan_type === 'custom' ? (
                  <HStack role="button" onClick={drawerDisclosure.onOpen} spacing="3px">
                    <Text
                      textTransform="capitalize"
                      color="#4B4B4B"
                      fontSize={{md: '7px', base: '8px'}}
                      fontWeight="400"
                    >
                      View Payment Breakdown
                    </Text>
                    <Image src={rightconLightShade.src} alt="right Icon" boxSize="12px" />
                  </HStack>
                ) : null}
              </Stack>
            </HStack>
          </HStack>
        ) : null}
      </Stack>
      <CustomPaymentBreakdownForAssets modalDisclosure={drawerDisclosure} equityInfo={equityInfo} />
    </>
  );
};

export default TransactionInfo;
