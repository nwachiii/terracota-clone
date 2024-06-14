import React, {useState} from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Flex,
  Text,
  Box,
  Image,
  Center,
  Textarea,
  useToast,
  HStack,
  Stack,
} from '@chakra-ui/react';
import processingLoader from '../../images/processing-transaction.gif';
import successfulLoader from '../../images/successful-transaction.gif';
import {CloseIcon} from '@chakra-ui/icons';
import {suggestAFeature} from '../../api/navbarMenu';
import {Button} from '../../ui-lib';
import {useMutation} from 'react-query';
import {scrollBarStyles} from '../common/ScrollBarStyles';
import UploadImages from './uploadImages';
import MobileHeader from '../navbar/mobileHeader';

export const SuggestIdea = ({suggestModal, onDrawerOpen}) => {
  const [message, setMessage] = useState('');
  const toast = useToast();
  const [document, setDocument] = useState([]);

  const suggestMutation = useMutation(suggestAFeature, {
    onSuccess: async res => {},
    onError: err => {
      toast({
        title: 'Oops...',
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.response?.data[0] ??
          'Something went wrong'
        }`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleSubmit = () => {
    if (!isValid)
      return toast({
        description: `Please leave a comment`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    const image = document.map(item => item?.image.replace('data:', '').replace(/^.+,/, ''));
    const body = {image, message, error: ''};
    return suggestMutation.mutate(body);
  };

  const handleResetModal = () => {
    setMessage('');
    setDocument([]);
    suggestMutation.reset();
    suggestModal.onClose();
  };

  const isValid = !!message.trim();

  return (
    <Drawer
      autoFocus={false}
      isCentered
      onCloseComplete={handleResetModal}
      blockScrollOnMount={true}
      onClose={suggestModal?.onClose}
      isOpen={suggestModal?.isOpen}
    >
      <DrawerOverlay />
      <DrawerContent
        top="unset !important"
        bottom={{base: '0', md: '24px !important'}}
        right={{base: '0', md: '24px !important'}}
        w="full"
        h={'full'}
        maxW={{base: '100vw', md: '500px'}}
        maxH={'515px'}
        bg={{base: '#FFF', md: '#FBFCFC'}}
        boxShadow={{base: 'none', md: 'md'}}
      >
        <Box>
          <Box p="25px" borderBottom="1px solid #E4E4E4">
            <Flex direction="row" justify="space-between" align={'center'}>
              <Text className="gilda-display-regular" color="text" fontSize={'24px'}>
                Suggest an idea
              </Text>
              <CloseIcon
                color="text"
                cursor="pointer"
                fontSize="17px"
                onClick={suggestModal?.onClose}
              />
            </Flex>
            <Text
              fontSize={{base: '13px', md: '16px'}}
              fontFamily="Roboto"
              fontWeight={400}
              color="text"
              pt='4px'
            >
              Do you have any new ideas or desired enhancements for our app.
            </Text>
          </Box>

          <Box h="full" overflowY={'scroll'} css={scrollBarStyles}>
            {suggestMutation.isSuccess ? (
              <Center
                px="30px"
                mt="20px"
                w="full"
                h="full"
                flexDirection={'column'}
                textAlign={'center'}
              >
                <Image alt="success" w="150px" h="150px" src={successfulLoader.src} mx="auto" />
                <Text
                  color="text"
                  fontWeight={500}
                  fontSize={'28px'}
                  my="25px"
                  className="gilda-display-regular"
                >
                  Thank you
                </Text>
                <Text color="text" fontSize={'16px'} fontWeight="400">
                  We appreciate your contribution and we’d reach out to you if we need more clarity
                </Text>
                <Button
                  fontWeight="500"
                  disabled={suggestMutation.isLoading}
                  loading={suggestMutation.isLoading}
                  onClick={handleResetModal}
                  w="full"
                  align="right"
                  color="white"
                  bg="primary"
                  mt="50px"
                >
                  OK
                </Button>
              </Center>
            ) : suggestMutation.isLoading ? (
              <Center mt="10px" w="full" h="full" flexDirection={'column'}>
                <Image alt="success" w="150px" h="150px" src={processingLoader.src} mx="auto" />
                <Text
                  color="text"
                  fontWeight={500}
                  fontSize={'28px'}
                  my="25px"
                  className="gilda-display-regular"
                >
                  Sending feedback
                </Text>
                <Text color="text" fontSize={'16px'} fontWeight="400">
                  Wait a moment
                </Text>
              </Center>
            ) : (
              <Stack flex={1} p={4} h="full">
                <Text fontSize={{base: '12px', md: '14px'}} fontWeight={500} color="text" mb="10px">
                  Comment
                </Text>
                <Textarea
                  color="text"
                  onChange={e => setMessage(e.target.value)}
                  value={message}
                  resize="none"
                  border="0.3px solid #747474"
                  borderRadius={'5px'}
                  w="full"
                  h="105px"
                  bg="rgba(217, 217, 217, 0.10)"
                />

                <Text
                  fontSize={{base: '12px', md: '14px'}}
                  fontWeight={500}
                  color="text"
                  mb="10px"
                  mt={{base: '22px', md: '29px'}}
                >
                  Upload Image
                </Text>
                <UploadImages
                  maxFiles={5}
                  id="document"
                  name="document"
                  files={document}
                  setFiles={setDocument}
                  lable={'Upload image'}
                  message="Upload image"
                  border={'0.3px solid #D0D5DD'}
                  w="full"
                  h="80px"
                />

                <Flex justify={'flex-end'} align={'center'} w="full">
                  <Button
                    fontWeight="500"
                    disabled={suggestMutation.isLoading}
                    loading={suggestMutation.isLoading}
                    onClick={handleSubmit}
                    w="full"
                    align="right"
                    color="white"
                    bg="#DDB057"
                    mt="30px"
                    h="50px"
                    rounded="4px"
                  >
                    Submit
                  </Button>
                </Flex>
              </Stack>
            )}
          </Box>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default SuggestIdea;
