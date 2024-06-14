import {Box, Tag, TagLabel} from '@chakra-ui/react';
import React from 'react';

const PaymentTypeTag = ({type, tagStyle}) => {
  const transactionType = key => {
    switch (key) {
      case 'outright':
        return {case: 'outright', text: 'Outright'};
      case 'equity_outright':
        return {case: 'outright', text: 'Outright Payment'};
      case 'shared_equity_outright':
        return {
          case: 'shared_equity_outright',
          text: 'Outright Payment',

          bg: '#DDDDDD',
          color: '#000000',
        };
      case 'initial_deposit':
        return {
          case: 'initial_deposit',
          text: 'Initial deposit',

          bg: '#DDDDDD',
          color: '#000000',
        };
      case 'shared_equity_plan_initial':
        return {
          case: 'Initial deposit',
          text: 'Initial deposit',

          bg: '#DDDDDD',
          color: '#000000',
        };
      case 'installment':
        return {case: 'installment', text: 'Top up'};

      case 'equity_plan_deposit':
        return {
          case: 'shared_installment',
          text: 'Top up',

          bg: '#DDDDDD',
          color: '#000000',
        };
      case 'equity_plan_initial':
        return {
          case: 'shared_installment',
          text: 'Initial deposit',

          bg: '#DDDDDD',
          color: '#000000',
        };
      case 'recurring':
        return {
          case: 'recurring',
          text: 'Recurring',

          bg: '#DDDDDD',
          color: '#000000',
        };
      case 'fraction':
        return {case: 'fraction', text: 'Fractional', colorScheme: 'yellow'};

      default:
        return {case: 'default', text: 'Other', colorScheme: 'gray'};
    }
  };

  const displayTag = () => {
    return (
      <Box display={'flex'} {...tagStyle?.box}>
        <Tag
          minW={{base: '97.3px', md: '106px'}}
          // bg={transactionType(type)?.bg}
          border="0.8px solid #606060"
          bg="transparent"
          h={{base: '22px', md: '31.35px'}}
          p={{base: '6.013px 12.026px', md: '9px 17.633px'}}
          borderRadius="0px"
          {...tagStyle?.tag}
        >
          <TagLabel
            mx="auto"
            color={transactionType(type)?.color}
            fontSize={{base: '12px', md: '15.1px'}}
            fontWeight="400"
            {...tagStyle?.label}
          >
            {transactionType(type).text}
          </TagLabel>
        </Tag>
      </Box>
    );
  };

  return displayTag();
};

export default PaymentTypeTag;
