import React, {useState} from 'react';
import {Flex, Image, DrawerCloseButton, Text, useMediaQuery, useTheme} from '@chakra-ui/react';
import {VStack, Center, Drawer, DrawerOverlay, DrawerContent, Box} from '@chakra-ui/react';
import {FaArrowRight} from 'react-icons/fa';
import {useMutation, useQuery} from 'react-query';
import {fetchNotifs, fetchSpace, UpdateSingleNotif, UpdateStatus} from '../../api/FetchNotif';
import EmptyState from '../appState/empty-state';
import {NOTIFICATION} from '../../constants/icon_images';
import MobileHeader from '../navbar/mobileHeader';
import {Spinner} from '../../ui-lib';

const Notification = ({isNotOpen, onNotClose, onDrawerOpen}) => {
  const [isSpace, setIsSpace] = useState(false);
  const {data, isLoading: notificationLoading, refetch} = useQuery(['notifs'], fetchNotifs);
  const {data: spaceData, isLoading: spaceLoading} = useQuery(['spaces'], fetchSpace);
  const theme = useTheme();

  const store_name =
    typeof window !== 'undefined' &&
    localStorage.getItem('storeDetails') &&
    JSON?.parse(localStorage?.getItem('storeDetails'))['store_name'];

  const mutation = useMutation(data => UpdateStatus(data), {
    onSuccess: async res => {
      await refetch();
    },
    onError: err => {
      toast({
        title: 'An error occured',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleStatus = prop =>
    mutation.mutate({
      mark_all_read: true,
      store: store_name,
      [prop]: true,
    });

  const dateOrTimeAgo = (ts, data) => {
    const d = new Date(); // Gets the current time
    const nowTs = Math.floor(d.getTime() / 1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
    const seconds = nowTs - Math.floor(new Date(ts).getTime() / 1000);

    // more that two days
    if (seconds >= 2 * 24 * 3600) {
      let datee = '';
      data
        ? (datee = data)
        : (datee = `${new Date(ts).getDate().toString().padStart(2, '0')}/${(
            new Date(ts).getMonth() + 1
          )
            .toString()
            .padStart(2, '0')}/${new Date(ts).getFullYear().toString()}`);
      return datee;
    }
    // a day
    if (seconds > 24 * 3600) {
      return 'Yesterday';
    }

    if (seconds > 3600) {
      const h = seconds / 3600;
      return `${Math.floor(h)} hour${h > 1 ? 's' : ''} ago`;
    }

    if (seconds > 60) {
      const m = seconds / 60;
      return `${Math.floor(m)} minute${m > 1 ? 's' : ''} ago`;
    }
  };

  const mutationForSingleNotif = useMutation(data => UpdateSingleNotif(data), {
    onSuccess: async res => {
      await refetch();
    },
    onError: err => {
      toast({
        title: 'An error occured',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const markSingleAsRead = (id, prop) => {
    mutationForSingleNotif.mutate({
      store: store_name,
      [prop]: true,
      id,
    });
  };

  const [isNotMobile] = useMediaQuery('(min-width: 768px)');

  return (
    <Drawer
      autoFocus={false}
      scrollBehavior="inside"
      isOpen={isNotOpen}
      onClose={onNotClose}
      blockScrollOnMount={true}
      placement="right"
    >
      {isNotMobile && <DrawerOverlay />}
      <DrawerContent
        maxW={{base: 'full', md: '400px'}}
        bg={{base: '#FFF', md: '#FBFCFC'}}
        top={{base: 'unset !important', md: '32px !important'}}
        bottom={{base: '0', md: 'unset'}}
        right={{base: '0', md: '24px !important'}}
        w="full"
        h={'full'}
        maxH={{base: '92.5vh', md: '720px'}}
        overflowY={'scroll'}
      >
        {isNotMobile && <DrawerCloseButton />}
        <Flex
          direction={'row'}
          w="full"
          borderBottom={'1px solid #F2F4F7'}
          mb="20px"
          mt="50px"
          justify={'space-around'}
        >
          <Text
            pb="8px"
            fontWeight={500}
            w="110px"
            textAlign={'center'}
            fontSize={'16px'}
            color={'#101828'}
            borderBottom={!isSpace && '2px solid #101828'}
            opacity={isSpace ? 0.5 : 1}
            cursor={'pointer'}
            onClick={() => setIsSpace(false)}
          >
            Notifications
          </Text>
          <Text
            pb="8px"
            fontWeight={500}
            w="110px"
            textAlign={'center'}
            fontSize={'16px'}
            color={'#101828'}
            borderBottom={isSpace && '2px solid #101828'}
            opacity={!isSpace ? 0.5 : 1}
            cursor={'pointer'}
            onClick={() => setIsSpace(true)}
          >
            Space
          </Text>
        </Flex>

        <VStack
          spacing={'15px'}
          align={{base: 'center', md: 'stretch'}}
          h={{base: '100%', md: '5vh'}}
        >
          {notificationLoading ? (
            <Spinner />
          ) : (
            <>
              {!isSpace && (
                <>
                  {data?.data?.data?.length ? (
                    <>
                      {data?.data?.data?.map(notif => (
                        <Flex
                          bg="background"
                          onClick={() => markSingleAsRead(notif.id, 'notify')}
                          cursor="pointer"
                          w="100%"
                          px="15px"
                          py="10px"
                          gap="20px"
                          key={notif.title}
                          opacity={notif.status ? 1 : 0.7}
                        >
                          <Center w="24px" h="24px" borderRadius={'full'}>
                            <Image
                              justifySelf="flex-end"
                              src={
                                NOTIFICATION[notif.topic.toLowerCase().replace(' ', '_')]?.src ||
                                NOTIFICATION.wallet_transaction.src
                              }
                              h={'16px'}
                              w={'16px'}
                              fontSize="7px"
                              alt={`${notif.topic} icon`}
                              filter={theme.theme_name !== 'light' ? '' : 'invert(1)'}
                            />
                          </Center>
                          <Box w="100%" pr={'26px'} color={'text'}>
                            <Flex align="center" color={'text'}>
                              <Text fontSize="14px" fontWeight={600} as="h2" noOfLines={1}>
                                {notif.topic}
                              </Text>
                              <Text fontSize={'14px'} ml="8px" lineHeight="16px" noOfLines={1}>
                                {dateOrTimeAgo(notif.time_ago)}
                              </Text>
                            </Flex>
                            <Flex justify="space-between" align="flex-end" mb="10px">
                              <Text fontSize={'12px'} fontWeight={400}>
                                {notif.message}
                              </Text>
                            </Flex>
                          </Box>
                        </Flex>
                      ))}
                    </>
                  ) : (
                    <EmptyState
                      icon
                      fontFamily="Euclid Circular B"
                      text="No notification yet"
                      textSize={16}
                      headerStyle={{fontSize: 18, fontWeight: 700}}
                    />
                  )}
                </>
              )}
            </>
          )}

          {spaceLoading ? (
            <Spinner />
          ) : (
            <>
              {isSpace && (
                <>
                  {spaceData?.data?.data?.length ? (
                    <>
                      {spaceData?.data?.data?.map(notif => (
                        <Flex
                          onClick={() => markSingleAsRead(notif.id, 'notify')}
                          cursor="pointer"
                          px="15px"
                          w="100%"
                          gap="20px"
                          mb="4"
                          key={notif.title}
                          opacity={notif.status ? 1 : 0.7}
                        >
                          <Image
                            justifySelf="flex-end"
                            src={
                              NOTIFICATION[notif.topic.toLowerCase().replace(' ', '_')]?.src ??
                              NOTIFICATION.wallet_transaction.src
                            }
                            h={'30px'}
                            w={'30px'}
                            fontSize="7px"
                            alt={`${notif.topic} icon`}
                          />
                          <Box w="100%" pr={'26px'}>
                            <Flex align="center">
                              <Text fontSize="14px" fontWeight={600} as="h2" noOfLines={1}>
                                {notif.topic}
                              </Text>
                              <Text fontSize={'14px'} ml="8px" lineHeight="16px" noOfLines={1}>
                                {dateOrTimeAgo(notif.time_ago)}
                              </Text>
                            </Flex>
                            <Flex justify="space-between" align="flex-end" mb="10px">
                              <Text fontSize={'12px'} fontWeight={400}>
                                {notif.message}
                              </Text>
                            </Flex>
                          </Box>
                        </Flex>
                      ))}
                    </>
                  ) : (
                    <EmptyState
                      icon
                      fontFamily="Euclid Circular B"
                      text="Looks like there is nothing on space"
                      textSize={16}
                      headerStyle={{fontSize: 18, fontWeight: 700}}
                    />
                  )}
                </>
              )}
            </>
          )}
        </VStack>
      </DrawerContent>
    </Drawer>
  );
};

export default Notification;
