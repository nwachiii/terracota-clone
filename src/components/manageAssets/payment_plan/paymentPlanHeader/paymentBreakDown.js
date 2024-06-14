import React from 'react';
import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Spinner,
  Stack,
  Text,
  VStack,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';

import {fetchCustomPlanSummary, fetchCustomPlanSummaryForAssets} from '../../../../api/payment';
import {useQuery} from 'react-query';
import {toastForError} from '../../../../utils/toastForErrors';
import {formatToCurrency} from '../../../../utils';
import {changeDateFormat} from '../../../../utils/formatDate';

const CustomPaymentBreakdownForAssets = ({equityInfo, modalDisclosure}) => {
  const customPlanBreakDown = useQuery(
    ['customPLansummaryAsset', equityInfo?.id],
    () => fetchCustomPlanSummaryForAssets(equityInfo?.id),
    {isenabled: equityInfo?.payment_plan?.id, retry: 0}
  );

  const [isMobile] = useMediaQuery('(max-width: 540px)');

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const toast = useToast();

  toastForError(customPlanBreakDown.error, customPlanBreakDown.isError, toast);

  function getOrdinal(number) {
    if (typeof number !== 'number') {
      return ''; // Return an empty string for invalid inputs
    }

    const suffixes = ['th', 'st', 'nd', 'rd'];
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    // Special cases for 11, 12, and 13, as they don't follow the usual pattern
    if (lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13) {
      return number + 'th';
    }

    // Use the appropriate suffix based on the last digit
    const suffix = suffixes[lastDigit] || 'th';

    return number + suffix;
  }

  return (
    <Drawer
      placement={isMobile ? 'bottom' : 'right'}
      onClose={modalDisclosure.onClose}
      isOpen={modalDisclosure.isOpen}
    >
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />
      <DrawerContent
        top="unset !important"
        bottom={{base: '0px !important', md: '10vh !important'}}
        right={{base: 'unset', md: '24px !important'}}
        w="full"
        minH="40vh"
        h={'fit-content'}
        p="36px"
        pt="0px"
        maxW={'400px'}
        bg="#ffffff"
        px="0"
      >
        <HStack
          borderBottom="1px solid #EAECF0"
          p="24px"
          justify="space-between"
          align="center"
          position="relative"
        >
          <HStack align={'center'}>
            <Text
              color="text"
              fontSize={'21.34px'}
              fontWeight={400}
              className="gilda-display-regular"
            >
              Payment Breakdown
            </Text>
          </HStack>

          <DrawerCloseButton
            right="0px"
            left="0px"
            color="#101828"
            position="initial"
            my="auto"
            top="0"
            bottom="0"
          />
        </HStack>
        <DrawerBody maxH={{base: '50vh', md: '50.5vh'}} sx={customScrollbarStyles} p="0">
          <Box px="24px" h={'fit-content'}>
            <VStack w="full" spacing={'20px'}>
              <Flex
                w="full"
                direction="column"
                mt="19px"
                py="23px"
                minH="100px"
                bg="transparent"
                px="15px"
                align={'center'}
                justify={'center'}
                border="1px solid"
                borderColor={'shade'}
              >
                <Text color="text" fontSize={'13px'} fontWeight={500}>
                  Initial Deposit
                </Text>
                <Text color="text" fontSize={'19px'} fontWeight={500}>
                  {formatToCurrency(equityInfo?.payment_plan?.initial_deposit_in_value)}
                </Text>
              </Flex>
              {customPlanBreakDown?.isLoading ? (
                <Center w="full" h="full">
                  <Spinner noAbsolute />
                </Center>
              ) : (
                <>
                  {customPlanBreakDown.data?.data?.data?.map((item, idx) => (
                    <Flex
                      w="full"
                      direction="column"
                      minH="100px"
                      py="23px"
                      bg="transparent"
                      position="relative"
                      px="15px"
                      align={'center'}
                      justify={'center'}
                      border="1px solid"
                      borderColor={'shade'}
                    >
                      <Text color="#191919" fontSize={'13px'} fontWeight={500}>
                        {getOrdinal(idx + 1)} payment
                      </Text>
                      <Text color="#191919" fontSize={'19x'} fontWeight={500}>
                        {item?.amount ? formatToCurrency(item?.amount) : '-'}
                      </Text>

                      <VStack
                        bg="#E4E4E4"
                        justify="center"
                        position="absolute"
                        top="0px"
                        right="0px"
                        h="16.4px"
                        align="center"
                        p="2.316px 4.631px"
                      >
                        <Text fontSize="9px" color="#606060" fontWeight="400">
                          {changeDateFormat(item?.due_date)}
                        </Text>
                      </VStack>
                    </Flex>
                  ))}
                </>
              )}
            </VStack>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomPaymentBreakdownForAssets;
