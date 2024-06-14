import React from 'react';
import {Stack, Box, Image} from '@chakra-ui/react';
import {CheckIcon} from '@chakra-ui/icons';

export const Checkbox = ({isChecked, onClick, children}) => {
  return (
    <Stack gap={'5px'} direction="row">
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        h={'23px !important'}
        w={'43px !important'}
        bgPosition={'center'}
        bgSize={'cover'}
        onClick={onClick}
        border={'0.5px solid'}
        borderColor={'primary'}
        borderRadius={'5px'}
        bg={isChecked ? 'primary' : null}
      >
        <CheckIcon color={isChecked ? 'text' : 'primary'} />
      </Box>
      {children}
    </Stack>
  );
};

export const Checkbox2 = ({isChecked, onClick, children}) => {
  return (
    <Stack gap={'8px'} direction="row">
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        h={'24px !important'}
        w={'24px !important'}
        minW={'24px !important'}
        bgPosition={'center'}
        bgSize={'cover'}
        onClick={onClick}
        border={'1px solid'}
        borderColor={isChecked ? 'primary' : 'matador_border_color.100'}
        borderRadius={'0px'}
        // bg={isChecked ? 'primary' : null}
        bg={isChecked ? 'primary' : `transparent`}
        cursor={`pointer`}
      >
        {/* <CheckIcon color={isChecked ? 'text' : 'primary'} /> */}
        <CheckIcon color={isChecked ? 'text' : 'transparent'} />
      </Box>
      {children}
    </Stack>
  );
};
