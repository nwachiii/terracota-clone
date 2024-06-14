import {GridItem, HStack, Text, Stack, Box, Divider, useMediaQuery} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {formatToCurrency} from '../../utils';
import {changeDateFormat} from '../../utils/formatDate';
import TransactionHistory from './components/assetsTransactionHistory';
import FRACTIONTRANSACTIONHISTORYCOLUMN from '../../constants/tables/fractionsTransactionHistoryColumns';
import {useInfiniteQuery, useMutation} from 'react-query';
import {fractionalEquityTransactionHistory} from '../../api/listing';
import {useRouter} from 'next/router';
import {fetchAllPurchaseHistory, fetchPurchaseHistory} from '../../api/payment';
import {COOWNERSHIPTRANSACTIONHISTORYCOLUMN} from '../../constants/tables/coownerShipTransactionHistoryColumn';
import useLocalStorage from '../../utils/hooks/useLocalStorage';

const OutrightTransactionInfo = ({displayTab}) => {
  const [user] = useLocalStorage('LoggedinUser');
  const customScrollbarStyles = (trackColor = '#fff', thumbColor = '#cbcbcb') => ({
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: `inset 0 0 6px ${trackColor}`,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: thumbColor,
    },
  });
  const {query} = useRouter();
  const equityId = query?.id;

  const TRANSACTIONS_HISTORY = useMutation(() => fetchPurchaseHistory(equityId, user?.user?.id), {
    onError: err => {
      toastForError(err, true, toast);
    },
    mutationKey: ['transaction_history', equityId, user?.user?.id],
    retry: 0,
  });
  useEffect(() => {
    TRANSACTIONS_HISTORY?.mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arrayData = TRANSACTIONS_HISTORY?.data?.data ?? [];
  console.log({arrayData});
  return (
    <Stack
      sx={customScrollbarStyles()}
      id="tnxsHistory"
      overflowY="auto"
      scrollBehavior="smooth"
      maxH={{base: 'full', xl: '486.5px'}}
      maxW={{base: 'full', xl: '627.54px'}}
      w={{base: 'full', xl: '627.54px'}}
      spacing={{base: 'none', xl: '18px'}}
      display={{
        base: displayTab === 'transaction' ? 'block' : 'none',
        xl: 'block',
      }}
    >
      <TransactionHistory
        arrayData={arrayData}
        isLoading={TRANSACTIONS_HISTORY?.isLoading}
        Column={COOWNERSHIPTRANSACTIONHISTORYCOLUMN}
        isError={TRANSACTIONS_HISTORY?.isError}
        error={TRANSACTIONS_HISTORY?.error}
        numberOfTransactions={arrayData?.length}
        spacing={{xl: '15.66px', base: '10.68px'}}
      />
    </Stack>
  );
};

export default OutrightTransactionInfo;
