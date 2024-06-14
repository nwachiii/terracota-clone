import React from 'react';
import {Stack, Box, Image, Center} from '@chakra-ui/react';

export const Radio = ({isActive, onClick, children, ...rest}) => {
  return (
    <Stack gap={'8px'} direction="row" onClick={onClick} {...rest}>
      <Center
        h={'24px !important'}
        w={'24px !important'}
        minW={'24px !important'}
        border={isActive ? '2px solid' : `3px solid`}
        borderColor={isActive ? 'primary' : 'matador_text.300'}
        borderRadius={'50%'}
        bg={`transparent`}
        cursor={`pointer`}
      >
        <Center
          bg={isActive ? 'primary' : `transparent`}
          h={'14px !important'}
          w={'14px !important'}
          minW={'14px !important'}
          borderRadius={'50%'}
        ></Center>
      </Center>
      {children}
    </Stack>
  );
};
