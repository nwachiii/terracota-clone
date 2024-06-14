import React from 'react';
import {useToast} from '@chakra-ui/react';
import {Box} from '@chakra-ui/react';
import {MdClose} from 'react-icons/md';
import {themeStyles} from '../../../theme';

export const CreateToast = () => {
  const toast = useToast();
  const toastIdRef = React.useRef();

  function close() {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }

  function addToast(msg) {
    toastIdRef.current = toast({
      position: 'bottom-right',
      duration: '3000',
      render: () => (
        <Box
          color="white"
          p={'20px'}
          bg="black"
          {...themeStyles.textStyles.sl5}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          pl={'40px'}
          pr={'25px'}
        >
          <Text color="#fff">{msg}</Text>
          <Box ml={'30px'}>
            <MdClose size={'20px'} onClick={close} cursor={'pointer'} />
          </Box>
        </Box>
      ),
    });
  }

  return addToast;
};
