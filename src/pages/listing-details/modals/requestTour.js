import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Text,
  Box,
  FormControl,
  FormLabel,
  useToast,
  Image,
  Center,
  Stack,
  ModalCloseButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import { Button, Checkbox } from '../../../ui-lib';
import {
  CustomSingleDatePicker,
  SelectTime
} from '../../../components/common/Calendar/forDateAndTime';
import { useMutation } from 'react-query';
import { requestATour } from '../../../api/listing';
import { storeName } from '../../../constants/routes';
import processingLoader from '../../../images/processing-transaction.gif';
import successfulLoader from '../../../images/successful-transaction.gif';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

export const RequestTourContent = ({ info }) => {
  const toast = useToast();
  const [time, setTime] = useState('');
  const [tourMode, setTourMode] = useState(null);
  const [mainDate, setmainDate] = useState('');

  const proceedRequest = useMutation((body) => requestATour(body, info.id), {
    onSuccess: async (res) => {
      toast({
        description: `Inspection Schedule Successful`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    },
    onError: (err) => {
      toast({
        title: 'An error occured',
        description: `${
          err?.response?.data?.message || 'Something went wrong, try again'
        }`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    }
  });

  const handleSelectedDate = (date) => {
    return setmainDate(date);
  };

  const handleRequest = () => {
    if (mainDate && time && tourMode) {
      const realTime = time.split(' ');
      const surfix = realTime[1];
      const hours =
        surfix === 'PM'
          ? Number(realTime[0]?.split(':')[0]) + 12
          : Number(realTime[0]?.split(':')[0]);
      const mins = Number(realTime[0]?.split(':')[1]);
      const dateToUse = new Date(mainDate);
      dateToUse.setUTCHours(hours - 1);
      dateToUse.setUTCMinutes(mins);
      proceedRequest.mutate({
        time: dateToUse?.toISOString(),
        store_name: storeName,
        type: tourMode ? 'in-Person' : 'video',
        mode: tourMode ? 'in-Person' : 'video'
      });
    } else
      toast({
        description: `Please select a date, time and a tour mode`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
  };
  return (
    <>
      {proceedRequest.isSuccess ? (
        <Center mt='20px' w='full' h='full' flexDirection={'column'}>
          <Image alt='loader' w='150px' h='150px' src={successfulLoader.src} />
          <Text
            color='text'
            textAlign={'center'}
            fontWeight={{ base: 600, md: 500 }}
            fontSize={'28px'}
            my={{ base: '12px', md: '25px' }}
            className='gilda-display-regular'
          >
            Inspection Schedule Successful
          </Text>
          <Text
            color='text'
            fontSize={{ base: '14px', md: '16px' }}
            fontWeight='400'
          >
            We’ll get back to you as soon as possilble
          </Text>
        </Center>
      ) : proceedRequest.isLoading ? (
        <Center mt='20px' w='full' h='full' flexDirection={'column'}>
          <Image alt='loader' w='150px' h='150px' src={processingLoader.src} />
          <Text
            color='text'
            textAlign={'center'}
            fontWeight={{ base: 600, md: 500 }}
            fontSize={'28px'}
            my={{ base: '12px', md: '25px' }}
            className='gilda-display-regular'
          >
            Processing Request
          </Text>
          <Text
            color='text'
            fontSize={{ base: '14px', md: '16px' }}
            fontWeight='400'
          >
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Box>
          <Flex
            direction='row'
            justify='space-between'
            align={'center'}
            mb={{ base: '25px', md: '25px' }}
            className='montserrat-regular'
          >
            <Text
              color='text'
              fontSize={'23px'}
              fontWeight={500}
              className='gilda-display-regular'
            >
              Schedule Inspection
            </Text>
            {/* <CloseIcon
              color='text'
              cursor='pointer'
              fontSize='17px'
              // onClick={requestModal?.onClose}
            /> */}
          </Flex>

          <Flex direction={'column'} align={'stretch'} w='full' mb='27px'>
            <FormLabel
              mt='16px'
              color='text'
              fontSize={'19px'}
              className='montserrat-regular'
            >
              Inspection type
            </FormLabel>
            <Flex justify={{ md: 'space-between' }} gap={`16px`} mt='8px'>
              <Stack
                gap={'2px'}
                direction='row'
                align='center'
                className='request-checkbox'
                onClick={() => setTourMode('In-Person')}
              >
                <Center
                  cursor='pointer'
                  border={'1px solid'}
                  borderRadius={'full'}
                  borderColor={'shade'}
                  w='16px'
                  h='16px'
                >
                  {tourMode === 'In-Person' && (
                    <Box
                      bg={'#191919'}
                      w={'10px'}
                      h={'10px'}
                      borderRadius={'full'}
                    />
                  )}
                </Center>
                <Text
                  color='text'
                  fontWeight='500'
                  className='montserrat-regular'
                >
                  In-Person
                </Text>
              </Stack>
              <Stack
                gap={'2px'}
                direction='row'
                align='center'
                className='request-checkbox'
                onClick={() => setTourMode('Video')}
              >
                <Center
                  cursor='pointer'
                  border={'1px solid'}
                  borderRadius={'full'}
                  borderColor={'shade'}
                  w='16px'
                  h='16px'
                >
                  {tourMode === 'Video' && (
                    <Box
                      bg={'#191919'}
                      w={'10px'}
                      h={'10px'}
                      borderRadius={'full'}
                    />
                  )}
                </Center>
                <Text
                  color='text'
                  fontWeight='500'
                  className='montserrat-regular'
                >
                  Video Chat
                </Text>
              </Stack>
            </Flex>
          </Flex>

          <FormControl mb='15px'>
            <CustomSingleDatePicker
              mainDate={mainDate}
              handleSelectedDate={handleSelectedDate}
            />
          </FormControl>

          <FormControl mb='15px'>
            <SelectTime setTime={setTime} time={time} />
          </FormControl>

          <Button
            fontWeight='500'
            disabled={proceedRequest.isLoading}
            loading={proceedRequest.isLoading}
            onClick={handleRequest}
            w='full'
            color='white'
            bg='primary'
            mt='30px'
            p='26px'
          >
            <Text fontSize={`16px`} className='montserrat-regular'>
              Send Request
            </Text>
          </Button>
        </Box>
      )}
    </>
  );
};

const RequestTour = ({ requestModal, info }) => {
  const [screenWidth, setScreenWidth] = useState();

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  return screenWidth >= 768 ? (
    <Modal
      autoFocus={false}
      isCentered
      onClose={requestModal?.onClose}
      isOpen={requestModal?.isOpen}
    >
      <ModalOverlay />
      <ModalContent
        bg='card_bg'
        maxW='460px'
        minH='437px'
        px={{ base: '24px', md: '32px' }}
        py={{ base: '24px', md: '32px' }}
        borderRadius={{ base: '10px', md: '0px' }}
      >
        <ModalCloseButton />
        <RequestTourContent info={info} />
      </ModalContent>
    </Modal>
  ) : (
    <Drawer
      autoFocus={false}
      isCentered
      onClose={requestModal?.onClose}
      isOpen={requestModal?.isOpen}
      placement='bottom'
    >
      <DrawerOverlay />
      <DrawerContent
        bg='card_bg'
        px={{ base: '24px', md: '32px' }}
        py={{ base: '24px', md: '32px' }}
      >
        <DrawerCloseButton />
        <RequestTourContent info={info} />
      </DrawerContent>
    </Drawer>
  );
};

export default RequestTour;
