import {GridItem, HStack, Text, Stack, Box, Divider, useMediaQuery} from '@chakra-ui/react';
import React, {useState} from 'react';
import {formatToCurrency} from '../../utils';
import {changeDateFormat} from '../../utils/formatDate';
import TransactionHistory from './components/assetsTransactionHistory';
import FRACTIONTRANSACTIONHISTORYCOLUMN from '../../constants/tables/fractionsTransactionHistoryColumns';
import {useInfiniteQuery} from 'react-query';
import {fractionalEquityTransactionHistory} from '../../api/listing';
import {useRouter} from 'next/router';

const FractionalTransactionInfo = ({displayTab, dividendObj}) => {
  const [isBelowXl] = useMediaQuery('(max-width: 1270px)');
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

  const [shouldScroll, setScrollDirection] = useState('down');

  const {
    data: infiniteData,
    error,
    isError,

    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fraction transaction', query.id],
    queryFn: ({pageParam = `${query.id}&page=1`}) => {
      return fractionalEquityTransactionHistory(pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      const maxPageNumber = Math.ceil(lastPage?.data?.count / 10);
      const nextPageNumber = pages.length + 1;

      return nextPageNumber <= maxPageNumber ? `${query.id}&page=${nextPageNumber}` : undefined;
    },
  });

  const scrollToTop = () => {
    const wrap = document?.getElementById('tnxsHistory');

    wrap.scrollTop = 0;
  };
  const numberOfTransactions =
    infiniteData?.pages?.flatMap(trnx => trnx?.data?.results?.map(() => 0))?.length ?? 0;

  const handleAnimation = wrap => {
    const currentScrollY = wrap?.scrollTop;

    if (currentScrollY > 840 && numberOfTransactions > 10) {
      setScrollDirection('up');
    } else {
      setScrollDirection !== 'down' ? setScrollDirection('down') : null;
    }
  };

  const handleScroll = () => {
    const wrap = document?.getElementById('tnxsHistory');

    handleAnimation(wrap);

    if (
      !isFetchingNextPage &&
      numberOfTransactions >= 10 &&
      wrap?.clientHeight + wrap?.scrollTop >= wrap?.scrollHeight
    ) {
      return hasNextPage ? fetchNextPage() : null;
    }
  };
  const arrayData = infiniteData?.pages?.flatMap(transHistory =>
    transHistory?.data?.results?.map(item => item)
  );

  return (
    <Stack
      onScroll={handleScroll}
      sx={customScrollbarStyles()}
      id="tnxsHistory"
      overflowY="auto"
      scrollBehavior="smooth"
      maxH={{base: '530px', xl: '486.5px'}}
      maxW={{base: 'full', xl: '627.54px'}}
      w={{base: 'full', xl: '627.54px'}}
      spacing={{base: 'none', xl: '18px'}}
      display={{
        base: displayTab === 'transaction' ? 'block' : 'none',
        xl: 'block',
      }}
    >
      {dividendObj?.enable_dividend && isBelowXl ? (
        <Divider
          border="none"
          display={{xl: 'none'}}
          my={{base: '10.68px', xl: '0px'}}
          h="0.95px"
          bg="#e4e4e4"
        />
      ) : null}

      {dividendObj?.enable_dividend ? (
        <HStack
          h={{xl: '81.681px', base: '58px'}}
          minH={{xl: '81.681px', base: '58px'}}
          px={{base: '16px', xl: '18px'}}
          border="1.125px solid #E4E4E4"
          bg={{base: 'transparent', xl: '#F5F5F5'}}
          w="full"
          justify="space-between"
        >
          <Stack spacing={{base: '3.43px', xl: '2.41px'}}>
            <Text
              fontSize={{base: '9px', xl: '13.664px'}}
              lineHeight={{base: '13px', xl: '17px'}}
              fontWeight="400"
              color="#606060"
              textAlign="start"
              textTransform="capitalize"
            >
              {dividendObj?.dividend_payout} Income
            </Text>
            <Text
              textAlign="start"
              fontSize={{base: '10px', xl: '13.664px'}}
              lineHeight={{base: '14px', xl: '17px'}}
              fontWeight={{base: '400', xl: '700'}}
              color="#606060"
            >
              {formatToCurrency(dividendObj?.dividend_amount)}
            </Text>
          </Stack>

          <Stack justify="end" spacing="3.43px">
            <Text
              fontSize={{base: '9px', xl: '13.664px'}}
              lineHeight={{base: '13px', xl: '17px'}}
              fontWeight="400"
              color="#606060"
              textAlign="end"
            >
              Income Date
            </Text>
            <Text
              textAlign="end"
              fontSize={{base: '10px', xl: '13.664px'}}
              lineHeight={{base: '14px', xl: '17px'}}
              fontWeight={{base: '400', xl: '700'}}
              color="#606060"
            >
              {dividendObj?.dividend_start_date ?? '-'}
            </Text>
          </Stack>
        </HStack>
      ) : null}

      <TransactionHistory
        arrayData={arrayData || []}
        isLoading={isLoading}
        Column={FRACTIONTRANSACTIONHISTORYCOLUMN}
        isError={isError}
        error={error}
        infiniteData={infiniteData}
        shouldScroll={shouldScroll}
        scrollToTop={scrollToTop}
        isFetchingNextPage={isFetchingNextPage}
        numberOfTransactions={numberOfTransactions}
        spacing={{xl: '15.66px', base: '10.68px'}}
      />
    </Stack>
  );
};

export default FractionalTransactionInfo;
