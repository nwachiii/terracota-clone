import React from 'react';
import {Box, Divider, Heading, Hide, Stack, Text} from '@chakra-ui/react';
import StaggeredSkeleton from '../../tables/assetTableSkeleton';
import AssetsTransactionTable from '../../tables/assetsTransactionTable';

const TransactionHistory = ({
  arrayData,
  shouldScroll,
  infiniteData,
  scrollToTop,
  isFetchingNextPage,
  numberOfTransactions,
  isLoading,
  Column,
  isError,
  error,
  children,
  ...rest
}) => {
  return (
    <Stack
      px={{base: '0px', xl: '18px'}}
      border={{base: 'none', xl: '1.125px solid #E4E4E4'}}
      p={{base: '0px', xl: '23.5px'}}
      bg={{base: 'transparent', xl: '#F5F5F5'}}
      spacing="none"
      h="fit-content"
      {...rest}
    >
      <Text
        as="header"
        // className="gilda-display-regular"
        position="sticky"
        bg="#F5F5F5"
        backdropFilter="blur(1.5px)"
        display={{base: 'none', xl: 'inline-block'}}
        zIndex={2}
        top="23px"
        _after={{
          content: '""',
          position: 'absolute',
          left: '0',
          bottom: '28px',
          w: 'full',
          h: '29px',
          bg: '#F5F5F5',
        }}
        fontSize="22.517px"
        fontWeight="600"
      >
        Transaction History
      </Text>
      {children}
      <Divider border="none" h="0.95px" bg="#E4E4E4" />
      <Box>
        <StaggeredSkeleton isLoading={isLoading}>
          <AssetsTransactionTable
            shouldScroll={shouldScroll}
            scrollToTop={scrollToTop}
            isFetchingNextPage={isFetchingNextPage}
            forData={[isFetchingNextPage, infiniteData]}
            isLoading={isLoading}
            isError={isError}
            error={error}
            forColumn={[isFetchingNextPage, infiniteData]}
            pageSize={numberOfTransactions}
            DATA={arrayData}
            COLUMNS={Column}
          />
        </StaggeredSkeleton>
      </Box>
    </Stack>
  );
};

export default TransactionHistory;
