import React, { useRef } from 'react';
import { Spinner } from '../../../ui-lib/ui-lib.components';
import {
  AbsoluteCenter,
  Box,
  Flex,
  Image,
  Modal,
  TabList,
  ModalContent,
  ModalOverlay,
  Tabs,
  Stack,
  Text,
  VStack,
  HStack,
  Tab,
  TabIndicator,
  TabPanel,
  TabPanels,
  Input,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Icon
} from '@chakra-ui/react';
import warning_icon from '/src/images/icons/warning-alert.svg';
import { fetchInvestorPackets, sendInvestorPackets } from '../../../api/payment';
import { useMutation, useQuery } from 'react-query';
import { formatDateToString } from '../../../utils/formatDate';
import homeOnwersImage from '../../../images/home-owners-packet.svg';
import { CloseIcon } from '@chakra-ui/icons';
import { BiCaretRight } from 'react-icons/bi';
import uploadIcon from '../../../images/icons/uploadForHomeOwnerPacket.svg';
import { encodeFileToBase64 } from '../../../utils';
import { toastForError } from '../../../utils/toastForErrors';
import isMobile from '../../../utils/extras';
import EmptyState from '../../../components/appState/empty-state';

export const HomeOwnersPacket = ({ equityId, modal }) => {
  const HOME__OWNERS__PACKETS = useQuery(['fetchInvestorPackets', equityId], () => fetchInvestorPackets(equityId));
  const inputRef = useRef(null);
  const toast = useToast();
  const packetData = HOME__OWNERS__PACKETS?.data?.data;

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const { mutate, isLoading } = useMutation(
    formData => sendInvestorPackets(equityId, formData),
    {
      onSuccess: async res => {
        await HOME__OWNERS__PACKETS.refetch();
        toast({
          description: `Packet Uploaded successfully`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        inputRef.current.value = '';
      },
      onError: err => {
        inputRef.current.value = '';
        toastForError(err, true, toast);
      },
    }
  );


  const handleUpload = e => {
    let based = [];
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      encodeFileToBase64(files[i]).then(filed => {
        const body = {
          packet: filed.replace('data:', '').replace(/^.+,/, ''),
          packet_name: files[i]?.name,
        };
        based.push(body);
        if (files.length === based.length) {
          return mutate(based);
        }
      });
    }
  };

  const ReceivedPacket = () => {
    return (
      <>
        {packetData?.received?.length ? (
          <VStack mt='20px' align={'stretch'} mx='auto' w='full' height={'80%'} overflowY={'scroll'}>
            {packetData?.received?.map((item, index) => (
              <Flex key={index} align={'center'} justify={'space-between'} w='full' px='20px' py='18px' shadow={'md'} borderRadius={'12px'} border='1px solid #E4E4E4 !important'>
                <Flex align={'center'} gap='10px'>
                  <Image src={homeOnwersImage.src} />
                  <VStack align={'flex-start'} spacing='0'>
                    <Text color='text' fontSize={'15px'} fontWeight={500} >Project report</Text>
                    <Text color='text' fontSize={'11px'} fontWeight={400} >
                      {item?.added_at ? `Uploaded: ${formatDateToString(item?.added_at)}` : 'n/a'}
                    </Text>
                  </VStack>
                </Flex>
                <a rel='noreferrer' target='_blank' href={item?.packet} >
                  <Flex align={'center'} gap='10px'>
                    <Text fontSize={'14px'} color='#000' fontWeight={400} >View</Text>
                    <Icon as={BiCaretRight} fontSize={'24px'} color='#000' />
                  </Flex>
                </a>
              </Flex>
            ))}
          </VStack>
        ) : (
          <EmptyState text='No received packet yet' />
        )}
      </>
    )
  }

  const SentPacket = () => {
    return (
      <>
        {packetData?.sent?.length ? (
          <VStack mt='20px' align={'stretch'} mx='auto' w='full' height={'80%'} overflowY={'scroll'}>
            {packetData?.sent?.map((item, index) => (
              <Flex
                key={index} align={'center'}
                justify={'space-between'}
                w='full' px='20px' py='18px'
                shadow={'md'} borderRadius={'12px'}
                border='1px solid'
                borderColor='text'
              >
                <Flex align={'center'} gap='10px'>
                  <Image src={homeOnwersImage.src} />
                  <VStack align={'flex-start'} spacing='0'>
                    <Text color='text' fontSize={'15px'} fontWeight={500} >Project report</Text>
                    <Text color='text' fontSize={'11px'} fontWeight={400} >
                      {item?.added_at ? `Uploaded: ${formatDateToString(item?.added_at)}` : 'n/a'}
                    </Text>
                  </VStack>
                </Flex>
                <a rel='noreferrer' target='_blank' href={item?.packet} >
                  <Flex align={'center'} gap='10px'>
                    <Text fontSize={'14px'} color='#000' fontWeight={400} >View</Text>
                    <Icon as={BiCaretRight} fontSize={'24px'} color='#000' />
                  </Flex>
                </a>
              </Flex>
            ))}
          </VStack>
        ) : (
          <EmptyState text='No sent packet yet' />
        )}
      </>
    )
  }


  const packetTabs = [
    {
      tablist: 'Received',
      component: <ReceivedPacket />,
    },
    {
      tablist: 'Sent',
      component: <SentPacket />,
    },
  ];

  const mainContent = (
    <>
      {HOME__OWNERS__PACKETS?.isLoading ? (
        <AbsoluteCenter>
          <Spinner />
        </AbsoluteCenter>
      ) : HOME__OWNERS__PACKETS?.isError ? (
        <Stack mb='40px' align='center' spacing={'14px'} direction={'column'} w='full' h='full'>
          <Image boxSize='68px' src={warning_icon.src} alt='' />
          <Text fontWeight='600' fontSize='28px' lineHeight='36px' color='#191919'>
            {`No Documents found`}
          </Text>
          <Text fontWeight='400' fontSize='16px' lineHeight='20px' color='#191919'>
            {`You'll need to make a successful payment before getting homes owner's packets`}
          </Text>
        </Stack>
      ) : (
        <Box w='full' h='full'>
          <Flex align={'flex-start'} justify={'space-between'} w='full' px='22px'>
            <VStack align={'stretch'} maxW={'80%'}>
              <Text
                className='gilda-display-regular'
                color='text'
                fontSize={'24px'}
                letterSpacing={'-0.719px'}
                fontWeight={500}
              >Home owner’s packet</Text>

            </VStack>
            <CloseIcon cursor={'pointer'} onClick={modal.onClose} fontSize={'16px'} />
          </Flex>

          <Tabs isFitted variant='enclosed' align="center" isLazy h='full'>
            <TabList
              bg="transparent"
              boxShadow="none" fontWeight="600"
              fontSize="18px" lineHeight="23px"
              color="#191919" maxW="100%"
              px="0px" py="0px" mt="30px"
            >
              <HStack
                px='70px'
                borderBottom="0.5px solid "
                borderBottomColor={'shade'}
                borderRadius="0px" w="full"
                justify="space-between" align="center"
              >
                {packetTabs.map((item, index) => (
                  <Tab
                    width={'100%'}
                    key={index} wordBreak="keep-all"
                    maxW="56px" w="56px" pb="3px"
                    color='text'
                    _selected={{ color: 'text', border: 'none', fontWeight: '500' }}
                  >
                    <Text color='text' w="56px" fontWeight="400" fontSize={{ base: "12.826px", md: '16px' }} whiteSpace="nowrap">
                      {item.tablist}
                    </Text>
                  </Tab>
                ))}
              </HStack>
            </TabList>
            <TabIndicator mt="-2px" height="4px" bg="#191919" borderRadius="27px" />
            <TabPanels sx={customScrollbarStyles} h="45vh" overflow="auto">
              {packetTabs.map((item, index) => (
                <TabPanel key={index} px='22px' h="full">
                  {item.component}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      )}

      <Box px='22px'>
        <HStack
          py='10px' h="44.89px" bg="#191919" mx='auto'
          borderRadius="4px" position="relative"
          w="full" mb='20px' align="center"
          cursor="pointer" justify="center" spacing="8px"
        >
          <Input
            type="file" w="full" opacity="0"
            bg="red" h="full"
            position="absolute" ref={inputRef}
            onChange={handleUpload}
            top="0" cursor="pointer"
            left="0" accept=".pdf"
            multiple isDisabled={isLoading}
            _disabled={{ bg: 'transparent', opacity: '0' }}
          />
          <Image boxSize="19.238px" src={uploadIcon.src} alt="upload icon" />
          <Text color="#fff" fontSize="14.429px" fontWeight="400">
            {isLoading ? 'Uploading...' : 'Upload'}
          </Text>
        </HStack>
      </Box>
    </>
  )


  return (
    <>
      {isMobile ? (
        <Drawer autoFocus={false} placement='bottom' color='#191919' isOpen={modal?.isOpen} onClose={modal?.onClose}>
          <DrawerOverlay />
          <DrawerContent bg='card_bg' h='80vh !important' w='450px' borderTopRadius={{ base: '8px', md: '16px' }} py='24px'>
            {mainContent}
          </DrawerContent>
        </Drawer>
      ) : (
        <Drawer autoFocus={false} color='#191919' isOpen={modal?.isOpen} onClose={modal?.onClose}>
          <DrawerOverlay />
          <DrawerContent bg='card_bg' maxW='500px' borderRadius={{ base: '8px', md: '0px' }} py='24px'>
            {mainContent}
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};


export default HomeOwnersPacket;