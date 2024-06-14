import React, { useState } from 'react';
import { Flex, DrawerCloseButton, Text, Center, Box } from '@chakra-ui/react';
import { VStack, Drawer, DrawerOverlay, DrawerContent } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { fetchNotifs, fetchSpace } from "../../../api/FetchNotif";
import MobileHeader from '../../navbar/mobileHeader';
import { Spinner } from '../../../ui-lib';
import NotificationList from './notificationList';
import Space from './space';

const Main = ({ onNotClose, onDrawerOpen, setRequestInfo, setType, isSpace, setIsSpace }) => {
  const { data, isLoading: notificationLoading, refetch } = useQuery(["notifs"], fetchNotifs);
  const { data: spaceData, isLoading: spaceLoading } = useQuery(["spaces"], fetchSpace);

  const dateOrTimeAgo = (ts, data) => {
    const d = new Date(); // Gets the current time
    const nowTs = Math.floor(d.getTime() / 1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
    const seconds = nowTs - Math.floor(new Date(ts).getTime() / 1000);

    // more that two days
    if (seconds >= 2 * 24 * 3600) {
      let datee = "";
      data
        ? (datee = data)
        : (datee = `${new Date(ts).getDate().toString().padStart(2, "0")}/${(
          new Date(ts).getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${new Date(ts).getFullYear().toString()}`);
      return datee;
    }
    // a day
    if (seconds > 24 * 3600) {
      return "yesterday";
    }

    if (seconds > 3600) {
      const h = seconds / 3600;
      return `${Math.floor(h)} hour${h > 1 ? "s" : ""} ago`;
    }

    if (seconds > 60) {
      const m = seconds / 60;
      return `${Math.floor(m)} minute${m > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <Box w='full' h='70vh' >
      <DrawerCloseButton display={{ base: 'none', md: 'flex' }} />
      <Flex direction={'row'} w='full' borderBottom={'1px solid #F2F4F7'} mb='20px' mt='50px' justify={'space-around'}>
        <Text
          pb='8px' fontWeight={500} w='110px' textAlign={'center'}
          fontSize={'16px'} color={'#101828'}
          borderBottom={!isSpace && '2px solid #101828'}
          opacity={isSpace ? 0.5 : 1} cursor={'pointer'}
          onClick={() => setIsSpace(false)}
        >Notifications</Text>
        <Text
          pb='8px' fontWeight={500} w='110px' textAlign={'center'}
          fontSize={'16px'} color={'#101828'}
          borderBottom={isSpace && '2px solid #101828'}
          opacity={!isSpace ? 0.5 : 1} cursor={'pointer'}
          onClick={() => setIsSpace(true)}
        >Space</Text>
      </Flex>

      {/* <MobileHeader onDrawerClose={onNotClose} activePage={'Notification'} onDrawerOpen={onDrawerOpen} /> */}

      {/* <Flex
        display={{ base: 'flex', md: 'none' }}
        cursor={'pointer'} mt='-20px' mb='20px'
        borderRadius={'16px'} shadow={'sm'}
        px='14px' py='6px' align={'center'} ml='15px'
        onClick={() => setIsSpace(!isSpace)}
        w='fit-content'
      >
        <Text fontWeight={500} fontSize='12px' color={'text'}>
          {isSpace ? 'Go to my Notification' : 'Go to my spaceeeee'}
        </Text>
        <FaArrowRight size={14} color='text' style={{ marginLeft: 4 }} />
      </Flex> */}

      <VStack spacing={'15px'} stretch h='5vh'>
        {isSpace ? (
          <>
            {spaceLoading ? (
              <Spinner />
            ) : (
              <Space setType={setType} setRequestInfo={setRequestInfo} dateOrTimeAgo={dateOrTimeAgo} spaceData={spaceData} />
            )}
          </>
        ) : (
          <>
            {notificationLoading ? (
              <Spinner />
            ) : (
              <NotificationList dateOrTimeAgo={dateOrTimeAgo} data={data} />
            )}
          </>
        )}
      </VStack>
    </Box>
  )
}

export default Main