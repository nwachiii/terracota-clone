import { Box, HStack, Stack, Text, chakra, shouldForwardProp } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';

import React, { useCallback } from 'react';
import { formatToCurrency } from '../../../utils';
import { LoggedinUser } from '../../../constants/routes';
import { calculateSharedValue } from '../../../utils/calculateFee';

const FirstDepositProgress = ({ equity }) => {
  const loggedInCoownerInfo = LoggedinUser
  const percentagePaid = (totalAmount, amountPaid) => {
    let percentPaid;
    try {
      percentPaid = ((Number(amountPaid) / Number(totalAmount)) * 100).toFixed(2);
      return `${percentPaid}%`;
    } catch (error) {
      return '-';
    }
  };

  const groupsTotalInitialAmount =
    equity?.payment_plan?.initial_deposit_in_value ?? equity?.total_unit_price;

  const groupsTotalAmountPaid = equity?.amount_paid;

  const individualAmountToBePaid = calculateSharedValue(
    equity?.payment_plan?.initial_deposit_in_value ?? equity?.total_unit_price,
    loggedInCoownerInfo?.equity_value
  );

  const individualAmountPaid = loggedInCoownerInfo?.user_amount_paid;

  const progressInfoData = [
    {
      header: `Total${equity?.payment_plan ? ' Initial Deposit' : ''} Paid`,
      amount: formatToCurrency(groupsTotalAmountPaid),
      progressHead: 'Group progress',
      progressValue: percentagePaid(groupsTotalInitialAmount, groupsTotalAmountPaid),
    },
    {
      header: `Total${equity?.payment_plan ? ' Initial Deposit' : ''} Paid`,
      amount: formatToCurrency(individualAmountPaid),
      progressHead: 'Individual Payment',
      progressValue: percentagePaid(individualAmountToBePaid, individualAmountPaid),
    },
  ];

  const ChakraBox = useCallback(
    chakra(motion.div, {
      shouldForwardProp: prop => isValidMotionProp(prop) || shouldForwardProp(prop),
    }),
    []
  );
  return progressInfoData.map((info, idx) => (
    <Stack
      key={idx}
      p="10px"
      py="15.2px"
      w="full"
      borderRadius=" 3.781px"
      bg="#242526"
      justify="center"
      align="center"
      spacing="12px"
    >
      <Stack spacing="4px" w="full">
        <Text fontSize="10.586px;" textAlign="center" fontWeight="400" color="#fff">
          {info.header}
        </Text>
        <Text fontSize="15.123px" textAlign="center" fontWeight="600" color="#fff">
          {info.amount}
        </Text>
      </Stack>
      <Stack spacing="4px" w="full">
        <HStack w="full" justifyContent="space-between">
          <Text fontSize="8px" fontWeight="300" color="#DDDDDD">
            {info.progressHead}
          </Text>
          <Text fontSize="8px" fontWeight="300" color="#DDDDDD">
            {info.progressValue}
          </Text>
        </HStack>
        <Box borderRadius="48px" h="5px" bg="#FFFFFF33" w="full">
          <ChakraBox
            borderRadius="48px"
            h="full"
            position="relative"
            bg="#FFFFFF"
            initial={{ width: '0%', }}
            animate={{ width: `${info.progressValue}`, }}
            transition={{ duration: 1.5, delay: 0.4 * idx, ease: 'easeInOut', }}
            maxW="100%"
          />
        </Box>
      </Stack>
    </Stack>
  ));
};

export default FirstDepositProgress;
