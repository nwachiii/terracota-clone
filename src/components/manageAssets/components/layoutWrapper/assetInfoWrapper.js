import {Box, Flex, HStack, Show, SimpleGrid, Stack, Text} from '@chakra-ui/react';
import React from 'react';

const AssetInfoWrapper = ({displayTab, handleDisplaySwitch, children, ...rest}) => {
  return (
    <Box maxW={{base: '700px', xl: 'initial'}} w={{base: 'full', xl: 'full'}}>
      <HStack
        h="54px"
        //   mb="36px"
        mx="24px"
        bg="#EFEDED"
        p="8px"
        align="center"
        spacing="9px"
        justify="space-between"
        position="relative"
        display={{base: 'flex', xl: 'none'}}
      >
        <HStack
          onClick={handleDisplaySwitch('transaction')}
          h="full"
          justify="center"
          w="full"
          role="button"
          bg={displayTab === 'transaction' ? '#262626' : 'transparent'}
        >
          <Text
            fontSize="16px"
            textAlign="center"
            fontWeight="400"
            color={displayTab === 'transaction' ? '#ffffff' : '#191919'}
          >
            TRANSACTION
          </Text>
        </HStack>
        <HStack
          onClick={handleDisplaySwitch('overview')}
          justify="center"
          h="full"
          w="full"
          role="button"
          bg={displayTab === 'overview' ? '#262626' : 'transparent'}
        >
          <Text
            fontSize="16px"
            textAlign="center"
            fontWeight="400"
            color={displayTab === 'overview' ? '#ffffff' : '#191919'}
          >
            OVERVIEW
          </Text>
        </HStack>
      </HStack>

      <Flex
        w="full"
        gap="24px"
        wrap={{base: 'wrap', xl: 'nowrap'}}
        position="relative"
        px={{base: '24px'}}
        mx="auto"
        maxW="1259.66px"
        {...rest}
      >
        {children}
      </Flex>
    </Box>
  );
};

export default AssetInfoWrapper;
