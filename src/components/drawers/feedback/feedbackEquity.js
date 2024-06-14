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
  HStack,
  useToast,
  Icon,
} from '@chakra-ui/react';
import processingLoader from '../../../images/processing-transaction.gif';
import successfulLoader from '../../../images/successful-transaction.gif';
import {CloseIcon} from '@chakra-ui/icons';
import {feedbackEquity, getfeedbackHistory} from '../../../api/navbarMenu';
import {Button} from '../../../ui-lib';
import {useMutation, useQuery} from 'react-query';
import {MdHistory} from 'react-icons/md';
import FeedbackHistory from './feedbackHistory';
import {scrollBarStyles} from '../../common/ScrollBarStyles';
import {BsArrowLeft} from 'react-icons/bs';

import terrible from '../../../images/feedbacks/terrible.svg';
import bad from '../../../images/feedbacks/bad.svg';
import okay from '../../../images/feedbacks/okay.svg';
import good from '../../../images/feedbacks/good.svg';
import awesome from '../../../images/feedbacks/awesome.svg';

import terribleSelect from '../../../images/feedbacks-select/terrible.svg';
import badSelect from '../../../images/feedbacks-select/bad.svg';
import okaySelect from '../../../images/feedbacks-select/okay.svg';
import goodSelect from '../../../images/feedbacks-select/good.svg';
import awesomeSelect from '../../../images/feedbacks-select/awesome.svg';

const reactions = [
  {
    img: terrible.src,
    imgSelect: terribleSelect.src,
    text: 'Terrible',
  },
  {
    img: bad.src,
    imgSelect: badSelect.src,
    text: 'Bad',
  },
  {
    img: okay.src,
    imgSelect: okaySelect.src,
    text: 'Okay',
  },
  {
    img: good.src,
    imgSelect: goodSelect.src,
    text: 'Good',
  },
  {
    img: awesome.src,
    imgSelect: awesomeSelect.src,
    text: 'Awesome',
  },
];

const FeedbackEquity = ({feedModal, equity, refetch}) => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [screen, setScreen] = useState('');
  const toast = useToast();
  const feedbackQuery = useQuery(['feedbackhistory', equity?.id], () =>
    getfeedbackHistory(equity?.id)
  );
  const feedbackData = feedbackQuery?.data?.data?.message;

  const submitFeedback = useMutation(formData => feedbackEquity(formData, equity?.id), {
    onSuccess: async res => {
      await feedbackQuery.refetch();
      await refetch();
    },
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
    const body = {
      feedback: message,
      type: 'inspection',
      rating: rating.toFixed(1),
    };
    return submitFeedback.mutate(body);
  };

  const handleResetModal = () => {
    setMessage('');
    setRating(0);
    submitFeedback.reset();
    feedModal.onClose();
  };

  const isValid = !!message.trim();

  return (
    <Drawer
      autoFocus={false}
      isCentered
      onCloseComplete={handleResetModal}
      blockScrollOnMount={true}
      onClose={feedModal?.onClose}
      isOpen={feedModal?.isOpen}
    >
      <DrawerOverlay />
      <DrawerContent
        top="unset !important"
        bottom={{base: 'unset', md: '24px !important'}}
        right={{base: 'unset', md: '24px !important'}}
        w="full"
        minH="20vh"
        h={'fit-content'}
        p="16px"
        maxW={'500px'}
        maxH={'530px'}
        bg="#FBFCFC"
        px="0"
      >
        <Box py="20px">
          <Box px={{base: '15px', md: '25px'}}>
            {screen === 'history' ? (
              <Flex direction="row" justify="space-between" align={'center'}>
                <HStack spacing={'15px'}>
                  <BsArrowLeft
                    style={{cursor: 'pointer'}}
                    onClick={() => setScreen('')}
                    size={25}
                  />
                  <Text
                    color="text"
                    fontSize={{base: '18px', md: '20px'}}
                    fontWeight={{base: 500, md: 600}}
                    className="gilda-display-regular"
                  >
                    Feedback History
                  </Text>
                </HStack>
                <CloseIcon
                  color="red"
                  cursor="pointer"
                  fontSize="17px"
                  onClick={feedModal?.onClose}
                />
              </Flex>
            ) : (
              <Flex direction="row" justify="space-between" align={'flex-start'}>
                <Text
                  color="text"
                  fontSize={{base: '18px', md: '20px'}}
                  fontWeight={{base: 500, md: 600}}
                  className="gilda-display-regular"
                >
                  Inspection Feedback
                </Text>
                <HStack gap="5px">
                  {feedbackData?.length && (
                    <Center
                      w="36px"
                      h="36px"
                      borderRadius={'8px'}
                      border={'0.672px solid'}
                      borderColor={'text'}
                    >
                      <Icon
                        as={MdHistory}
                        color="text"
                        fontSize={'20px'}
                        cursor="pointer"
                        onClick={() => setScreen('history')}
                      />
                    </Center>
                  )}
                  <CloseIcon
                    color="text"
                    cursor="pointer"
                    fontSize="17px"
                    onClick={feedModal?.onClose}
                  />
                </HStack>
              </Flex>
            )}
          </Box>

          <Box my={{base: '30px', md: '21px'}}>
            <Box display={{base: 'none', md: 'flex'}} w="full" borderBottom="1px solid #EAECF0" />
          </Box>

          {screen === 'history' ? (
            <FeedbackHistory setScreen={setScreen} feedbacks={feedbackData} />
          ) : (
            <Box overflowY={'scroll'} css={scrollBarStyles}>
              {submitFeedback.isSuccess ? (
                <Center
                  px="30px"
                  mt="20px"
                  w="full"
                  h="400px"
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
                    {' '}
                    We appreciate your feedback
                  </Text>
                  <Button
                    fontWeight="500"
                    disabled={submitFeedback.isLoading}
                    loading={submitFeedback.isLoading}
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
              ) : submitFeedback.isLoading ? (
                <Center mt="20px" w="full" h="400px" flexDirection={'column'}>
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
                <Box px={{base: '12px', md: '25px'}} mt={{base: '10px', md: '0px'}}>
                  <Box bg="card_bg" p={{base: '12px', md: '15px'}}>
                    <Text
                      color="text"
                      mb="20px"
                      fontSize={'15px'}
                      fontWeight={600}
                      className="gilda-display-regular"
                    >
                      {equity?.project?.name}
                    </Text>
                    <Box>
                      <Text
                        color="text"
                        fontSize={{base: '13px', md: '16px'}}
                        fontWeight={400}
                        className="gilda-display-regular"
                      >
                        How was your tour?
                      </Text>

                      <Flex justify={'space-between'} mt="17px">
                        {reactions.map((reaction, index) => (
                          <>
                            {rating === index + 1 ? (
                              <Center
                                onClick={() => setRating(index + 1)}
                                cursor={'pointer'}
                                bg="#3D3D3D"
                                w="58px"
                                h="48px"
                                alignItems={'center'}
                                justifyContent={'center'}
                                key={reaction.text}
                                gap="auto"
                                flexDirection={'column'}
                                border={'1px solid #E4E4E4'}
                              >
                                <Image alt="reaction" w="24px" h="24px" src={reaction.imgSelect} />
                                <Text fontSize={'10px'} fontWeight={400} color={'#fff'}>
                                  {reaction.text}
                                </Text>
                              </Center>
                            ) : (
                              <Center
                                onClick={() => setRating(index + 1)}
                                cursor={'pointer'}
                                bg="#FBFCFC"
                                w="58px"
                                h="48px"
                                alignItems={'center'}
                                justifyContent={'center'}
                                key={reaction.text}
                                gap="auto"
                                flexDirection={'column'}
                                border={'1px solid #E4E4E4'}
                              >
                                <Image alt="reaction" w="24px" h="24px" src={reaction.img} />
                                <Text fontSize={'10px'} fontWeight={400} color={'#606060'}>
                                  {reaction.text}
                                </Text>
                              </Center>
                            )}
                          </>
                        ))}
                      </Flex>

                      <Text
                        color="text"
                        fontSize={{base: '12px', md: '14px'}}
                        fontWeight={300}
                        mb="10px"
                        mt="29px"
                      >
                        Tell us more about your experience (Optional)
                      </Text>
                      <Textarea
                        color="text"
                        onChange={e => setMessage(e.target.value)}
                        value={message}
                        resize="none"
                        border="0.5px solid !important"
                        borderColor={'shade'}
                        borderRadius={'2px'}
                        w="full"
                        h="90px"
                      />

                      <Flex justify={'flex-end'} align={'center'} w="full">
                        <Button
                          fontWeight="500"
                          h="48px"
                          disabled={submitFeedback.isLoading}
                          loading={submitFeedback.isLoading}
                          onClick={handleSubmit}
                          w="full"
                          align="right"
                          color="white"
                          bg="primary"
                          mt="30px"
                        >
                          Submit
                        </Button>
                      </Flex>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default FeedbackEquity;
