import {Button as ChakraButton, Text} from '@chakra-ui/react';
import {motion} from 'framer-motion';

export const Button = ({bg, background, bgColor, children, ...rest}) => {
  return (
    <ChakraButton
      borderRadius={0}
      fontWeight={500}
      as={motion.button}
      whileTap={{scale: 0.9}}
      whileHover={{scale: 1.04}}
      bg={bgColor || background || bg || '#191919'}
      _hover={''}
      _focus={''}
      _active={''}
      {...rest}
    >
      <Text
        fontSize={rest.fontSize || { base: '11px', md: '16px' }}
        color={rest.color || '#fff'}
      >
        {children}
      </Text>
    </ChakraButton>
  );
};
