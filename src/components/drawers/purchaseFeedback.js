import React, { useState } from 'react'
import { Drawer, DrawerOverlay, DrawerContent, DrawerBody, Flex, Text, Box, Image, Center, Textarea, HStack, useToast, Icon } from '@chakra-ui/react'
import processingLoader from '../../images/processing-transaction.gif';
import successfulLoader from '../../images/successful-transaction.gif';
import { CloseIcon } from '@chakra-ui/icons';
import { feedbackPurchase, getfeedbackHistory } from '../../api/navbarMenu';
import { Button } from '../../ui-lib';
import { useMutation, useQuery } from 'react-query';
import { RiStarFill } from 'react-icons/ri';
import { MdHistory } from 'react-icons/md';
import FeedbackHistory from './feedback/feedbackHistory';
import { scrollBarStyles } from '../common/ScrollBarStyles';
import { BsArrowLeft } from 'react-icons/bs';

const PurchaseFeedback = ({ feedModal, equity }) => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [screen, setScreen] = useState('');
  const toast = useToast();
  const feedbackQuery = useQuery(['feedbackhistory', equity?.id], () => getfeedbackHistory(equity?.id));
  const feedbackData = feedbackQuery?.data?.data?.message;

  const submitFeedback = useMutation(formData => feedbackPurchase(formData, equity?.id), {
    onSuccess: async res => {
      await feedbackQuery.refetch();
    },
    onError: err => {
      toast({
        title: 'Oops...',
        description: `${err?.response?.data?.message ?? err?.response?.message ?? err?.response?.data[0] ?? 'Something went wrong'}`,
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
      rating: rating.toFixed(1),
    };
    return submitFeedback.mutate(body);
  };

  const handleResetModal = () => {
    setMessage('')
    setRating(0)
    submitFeedback.reset();
    feedModal.onClose()
  }

  const isValid = !!message.trim();

  return (
    <Drawer autoFocus={false} isCentered onCloseComplete={handleResetModal} blockScrollOnMount={true} onClose={feedModal?.onClose} isOpen={feedModal?.isOpen}>
      <DrawerOverlay />
      <DrawerContent bg='background' maxW={{ base: 'full', md: '450px' }} minH='437px' px='0' py='0'>
        <Box py='20px'>
          <Box px="25px">
            {screen === 'history' ? (
              <Flex direction='row' justify='space-between' align={'center'}>
                <HStack spacing={'10px'}>
                  <Icon color='text' as={BsArrowLeft} style={{ cursor: 'pointer' }} onClick={() => setScreen('')} fontSize={'25px'} />
                  <Text color='text' fontSize={{ base: '18px', md: '20px' }} fontWeight={{ base: 500, md: 600 }}>Feedback History</Text>
                </HStack>
                <CloseIcon color='text' cursor='pointer' fontSize='17px' onClick={feedModal?.onClose} />
              </Flex>
            ) : (
              <Flex direction='row' justify='space-between' align={'flex-start'}>
                <Text color='text' fontSize={{ base: '18px', md: '20px' }} fontWeight={{ base: 500, md: 600 }}>Feedback</Text>
                <HStack gap='5px'>
                  {feedbackData?.length && (
                    <Center w='36px' h='36px' borderRadius={'8px'} border={'0.672px solid'} borderColor={'text'}>
                      <Icon as={MdHistory} color='text' size={20} cursor='pointer' onClick={() => setScreen('history')} />
                    </Center>
                  )}
                  <CloseIcon color='text' cursor='pointer' fontSize='17px' onClick={feedModal?.onClose} />
                </HStack>
              </Flex>
            )}
          </Box>


          <Box my={{ base: '20px', md: '21px' }}>
            <Box display={{ base: 'none', md: 'flex' }} w='full' borderBottom='1px solid' borderColor={'shade'} />
          </Box>

          {screen === 'history' ? (
            <FeedbackHistory setScreen={setScreen} feedbacks={feedbackData} />
          ) : (
            <Box overflowY={'scroll'} css={scrollBarStyles}>
              {submitFeedback.isSuccess ? (
                <Center px='30px' mt='20px' w='full' h='full' flexDirection={'column'} textAlign={'center'}>
                  <Image alt='success' w='150px' h='150px' src={successfulLoader.src} mx='auto' />
                  <Text color='text' fontWeight={500} fontSize={'28px'} my='25px' className='gilda-display-regular'>Thank you</Text>
                  <Text color='text' fontSize={'16px'} fontWeight='400'> We appreciate your feedback</Text>
                  <Button

                    fontWeight='500'
                    disabled={submitFeedback.isLoading}
                    loading={submitFeedback.isLoading}
                    onClick={handleResetModal} w='full' align='right'
                    color='white' bg='primary' mt='50px'
                  >
                    OK
                  </Button>
                </Center>
              ) : submitFeedback.isLoading ? (
                <Center mt='20px' w='full' h='full' flexDirection={'column'}>
                  <Image alt='success' w='150px' h='150px' src={processingLoader.src} mx='auto' />
                  <Text color='text' fontWeight={500} fontSize={'28px'} my='25px' className='gilda-display-regular'>Sending feedback</Text>
                  <Text color='text' fontSize={'16px'} fontWeight='400'>Wait a moment</Text>
                </Center>
              ) : (
                <Box px={{ base: '12px', md: '25px' }} mt={{ base: '10px', md: '0px' }}>
                  <Box bg='card_bg' p={{ base: '12px', md: "25px" }}>
                    <Text color='text' mb='20px' fontSize={'15px'} fontWeight={600}>Kindly give feedback on this listing.</Text>
                    <HStack align={'center'} gap='-2px'>
                      {[1, 2, 3, 4, 5].map(index => (
                        <>
                          {rating >= index ?
                            <Icon as={RiStarFill} onClick={() => setRating(index)} style={{ cursor: 'pointer' }} color='#2F2F2F' fontSize={'32px'} /> :
                            <Icon as={RiStarFill} onClick={() => setRating(index)} style={{ cursor: 'pointer' }} color='#DDDDDD' fontSize={'32px'} />
                          }
                        </>
                      ))}
                    </HStack>
                    <Text color='text' fontSize='14px' fontWeight={500} mb='10px' mt='29px'>Comment</Text>
                    <Textarea
                      onChange={e => setMessage(e.target.value)}
                      value={message} resize='none'
                      border='0.5px solid #D0D5DD !important'
                      borderRadius={'5px'}
                      w='full' h='155px2'
                    />
                    <Button

                      fontWeight='500'
                      disabled={submitFeedback.isLoading}
                      loading={submitFeedback.isLoading}
                      onClick={handleSubmit} w='108.053px' align='right'
                      color='white' bg='primary' mt='30px'
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </DrawerContent>
    </Drawer>
  )
}

export default PurchaseFeedback