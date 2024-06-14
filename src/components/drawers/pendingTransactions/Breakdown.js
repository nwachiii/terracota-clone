import React from 'react';
import {Box, VStack, Flex, Text, Center} from '@chakra-ui/react';
import {fetchCustomPlanSummary, fetchUpcomingPayments} from '../../../api/payment';
import {useQuery} from 'react-query';
import {formatToCurrency} from '../../../utils';
import {Spinner} from '../../../ui-lib';

const Breakdown = ({asset, customScrollbarStyles}) => {
  const customPlanBreakDown = useQuery(
    ['customPLansummary', asset?.payment_plan?.id],
    () => fetchCustomPlanSummary(asset?.payment_plan?.id),
    {
      enabled: !!asset?.payment_plan,
    }
  );

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
    <Box px="24px" pb="38px" h={'fit-content'} overflowY={'scroll'} __css={customScrollbarStyles}>
      <Box w="full">
        <VStack w="full" spacing={'20px'}>
          <Flex
            w="full"
            direction="column"
            mt="20px"
            py="23px"
            bg="background"
            px="15px"
            align={'center'}
            justify={'center'}
            borderRadius={'5px'}
            border="1px solid"
            borderColor={'shade'}
          >
            <Text color="#191919" fontSize={'13px'} fontWeight={500}>
              Initial Deposit
            </Text>
            <Text color="text" fontSize={'19px'} fontWeight={500}>
              {formatToCurrency(asset?.payment_plan?.initial_deposit_in_value)}
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
                  mt="20px"
                  py="23px"
                  bg="background"
                  px="15px"
                  align={'center'}
                  justify={'center'}
                  borderRadius={'2px'}
                  border="1px solid"
                  borderColor={'shade'}
                  position={'relative'}
                >
                  <Box position={'absolute'} p="2.316px 4.631px" bg="#E4E4E4" top={0} right={0}>
                    <Text fontSize={'10px'} fontWeight={400} color={'#606060'}>
                      {`Due After ${item?.period_in_months} month${
                        Number(item?.period_in_months) > 1 ? 's' : ''
                      }`}
                    </Text>
                  </Box>

                  <Text color="#191919" fontSize={'13px'} fontWeight={500}>
                    {getOrdinal(idx + 1)} payment
                  </Text>
                  <Text color="#191919" fontSize={'19x'} fontWeight={500}>
                    {item?.amount ? formatToCurrency(item?.amount) : '-'}
                  </Text>
                </Flex>
              ))}
            </>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default Breakdown;
