import React from 'react';
import {Box, Flex, Image, Text, VStack} from '@chakra-ui/react';
import {motion} from 'framer-motion';

export const CardTwo = ({
  title,
  image,
  onClickCard,
  subtitle,
  is_fraction_sale_available,
  ...rest
}) => {
  return (
    <Box
      shadow={'sm'}
      as={motion.div}
      maxWidth={'597.45px'}
      cursor={'pointer'}
      whileTap={{scale: 0.98}}
      whileHover={{scale: 1.01}}
      style={{aspectRatio: '397  / 490'}}
      bg="card_bg"
      mx={'auto'}
      // aspectRatio={{base: `1 / 1`, md: `38 / 36'`}}
      h={{base: 'auto', md: '540px'}}
      w="full"
      {...rest}
      bgImage={image}
      bgSize={'cover'}
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

      {is_fraction_sale_available && (
        <Box
          position={'absolute'}
          top="20px"
          right="20px"
          px="16px"
          py="8px"
          borderRadius={'4px'}
          bg="primary"
          h={`max-content`}
        >
          <Text className="gilda-display-regular" fontSize={'12px'} color="#191919">
            FRACTIONAL
          </Text>
        </Box>
      )}

      <VStack
        bottom="30px"
        position={'absolute'}
        px={{base: '12px', md: '24px'}}
        align={'stretch'}
        spacing={'8px'}
        w="full"
      >
        <Text color="white" className="gilda-display-regular" fontWeight={400} fontSize={'24px'}>
          {title}
        </Text>
        <Text color="white" fontWeight={400} fontSize={'16px'} className="montserrat-regular">
          {subtitle}
        </Text>
      </VStack>
    </Box>
  );
};
