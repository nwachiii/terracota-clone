import React from 'react';
import {Box, Flex, Image, Text, useToast, VStack} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {useMutation} from 'react-query';
import {toggleWatchlist} from '../../api/watchlist';
import WatchlistBookmark from './watchlistBookmark';

export const CardThree = ({
  id,
  title,
  ownerMsg,
  image,
  onClickCard,
  subtitle,
  is_watchlist,
  refetch,
  startingFrom,
  fraction_is_available,
  ...rest
}) => {
  const toast = useToast();
  const toggleWatchlistMutation = useMutation(body => toggleWatchlist(body.id), {
    onSuccess: async res => {
      toast({
        description: `${title} in your watchlist has been updated`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      return await refetch();
    },
    onError: err => {
      toast({
        title: 'An error occured',
        description: `${err?.code} : ${err?.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleWatchlist = e => {
    if (toggleWatchlistMutation?.isLoading) return;
    e.stopPropagation();
    return toggleWatchlistMutation.mutate({id});
  };

  return (
    <Box
      shadow={'sm'}
      as={motion.div}
      maxWidth={'597.45px'}
      cursor={'pointer'}
      whileTap={{scale: 0.98}}
      whileHover={{scale: 1.01}}
      // style={{aspectRatio: '38 / 36'}}
      aspectRatio={{base: `1 / 1`, lg: '387  / 490'}}
      bg="card_bg"
      mx={'auto'}
      h={{base: '350px', lg: `490`}}
      w="full"
      {...rest}
      bgImage={image}
      bgSize={'cover'}
      borderRadius={'5px'}
      position={'relative'}
    >
      <Box
        onClick={onClickCard}
        bg="black"
        opacity={0.6}
        position={'absolute'}
        h="full"
        w="full"
        zIndex={0}
      />

      {fraction_is_available && (
        <Box
          position={'absolute'}
          top="20px"
          right="20px"
          px="16px"
          py="8px"
          borderRadius={'4px'}
          bg="primary"
        >
          <Text className="gilda-display-regular" fontSize={'12px'} color="#191919">
            FRACTIONAL
          </Text>
        </Box>
      )}

      <VStack
        bottom="30px"
        position={'absolute'}
        px={{base: '12px', lg: '24px'}}
        align={'stretch'}
        spacing={'8px'}
        w="full"
      >
        <Flex w="full" justify={'space-between'} align={'center'}>
          <Text
            color="white"
            className="gilda-display-regular"
            fontWeight={400}
            fontSize={{base: '19px', lg: '32px'}}
          >
            {title}
          </Text>
          {/* <WatchlistBookmark
            is_watchlist={is_watchlist}
            handleWatchlist={handleWatchlist}
          /> */}
        </Flex>
        <Text
          color="white"
          fontWeight={400}
          fontSize={{base: '18px', lg: '32px'}}
          className="gilda-display-regular"
        >
          {subtitle || (
            <Box as="span" color={`#FAB702`} className="montserrat-regular">
              Contact for Price
            </Box>
          )}
        </Text>
      </VStack>
    </Box>
  );
};
