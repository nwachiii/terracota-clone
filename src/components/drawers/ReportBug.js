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
import {reportABug} from '../../api/navbarMenu';
import {Button} from '../../ui-lib';
import {useMutation} from 'react-query';
import {scrollBarStyles} from '../common/ScrollBarStyles';
import UploadImages from './uploadImages';
import MobileHeader from '../navbar/mobileHeader';

const ReportBug = ({reportBugModal, onDrawerOpen}) => {
  const [message, setMessage] = useState('');
  const toast = useToast();
  const [document, setDocument] = useState([]);

  const reportMutation = useMutation(reportABug, {
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
    return reportMutation.mutate(body);
  };

  const handleResetModal = () => {
    setMessage('');
    setDocument([]);
    reportMutation.reset();
    reportBugModal.onClose();
  };

  const isValid = !!message.trim();

  return (
    <Drawer
      autoFocus={false}
      isCentered
      onCloseComplete={handleResetModal}
      blockScrollOnMount={true}
      onClose={reportBugModal?.onClose}
      isOpen={reportBugModal?.isOpen}
    >
      <DrawerOverlay />
      <DrawerContent
        top="unset !important"
        bottom={{base: '0', md: '24px !important'}}
        right={{base: '0', md: '24px !important'}}
        w="full"
        h={'full'}
        p="16px"
        px={0}
        maxW={{base: '100vw', md: '500px'}}
        maxH={'515px'}
        bg={{base: '#FFF', md: '#FBFCFC'}}
        boxShadow={{base: 'none', md: 'md'}}
      >
        <Box pt="20px">
          <Box p={4} borderBottom="1px solid #E4E4E4">
            <Box>
              <Flex direction="row" justify="space-between" align={'center'}>
                <Stack>
                  <Text className="gilda-display-regular" color={'text'} fontSize={'24px'}>
                    Report a Bug
                  </Text>
                  <Text fontSize={{base: '13px', md: '16px'}} fontWeight={400} color="text">
                    Encountered a bug? Let us know! Our team will investigate and work to resolve
                    the issue ASAP.
                  </Text>
                </Stack>
                <CloseIcon
                  color={'text'}
                  cursor="pointer"
                  fontSize="17px"
                  onClick={reportBugModal?.onClose}
                />
              </Flex>
            </Box>
          </Box>

          {/* <MobileHeader onDrawerClose={reportBugModal.onClose} activePage={'Report a Bug'} onDrawerOpen={onDrawerOpen} /> */}

          <Box h="full" overflowY={'scroll'} css={scrollBarStyles}>
            {reportMutation.isSuccess ? (
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
                  color={'text'}
                  fontWeight={500}
                  fontSize={'28px'}
                  my="25px"
                  className="gilda-display-regular"
                >
                  Thank you
                </Text>
                <Text color={'text'} fontSize={'16px'} fontWeight="400">
                  Our technical team will review and get back to you as soon as possible
                </Text>
                <Button
                  fontWeight="500"
                  disabled={reportMutation.isLoading}
                  loading={reportMutation.isLoading}
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
            ) : reportMutation.isLoading ? (
              <Center mt="20px" w="full" h="full" flexDirection={'column'}>
                <Image alt="success" w="150px" h="150px" src={processingLoader.src} mx="auto" />
                <Text
                  color={'text'}
                  fontWeight={500}
                  fontSize={'28px'}
                  my="25px"
                  className="gilda-display-regular"
                >
                  Sending feedback
                </Text>
                <Text color={'text'} fontSize={'16px'} fontWeight="400">
                  Wait a moment
                </Text>
              </Center>
            ) : (
              <Stack flex={1} p={4} h="full">
                <Text fontSize={{base: '12px', md: '14px'}} fontWeight={500} color="text">
                  Comment
                </Text>
                <Textarea
                  color={'text'}
                  onChange={e => setMessage(e.target.value)}
                  value={message}
                  resize="none"
                  border="0.3px solid #747474"
                  borderRadius={'5px'}
                  w="full"
                  bg='rgba(217, 217, 217, 0.10)'
                  h="105px"
                />

                <Text
                  color={'text'}
                  fontSize={{base: '12px', md: '14px'}}
                  fontWeight={500}
                  mb="10px"
                  mt="29px"
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
                  mt={0}
                />

                <Flex justify={'flex-end'} alignSelf={'flex-end'} align={'center'} w="full">
                  <Button
                    h="45px"
                    fontWeight="500"
                    disabled={reportMutation.isLoading}
                    loading={reportMutation.isLoading}
                    onClick={handleSubmit}
                    w="full"
                    align="right"
                    color="white"
                    bg="primary"
                    mt="30px"
                    rounded="5px"
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

export default ReportBug;
