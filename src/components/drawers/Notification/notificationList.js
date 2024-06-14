import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import { Center, Box } from '@chakra-ui/react';
import EmptyState from '../../appState/empty-state';
import { NOTIFICATION } from '../../../constants/icon_images';


const NotificationList = ({ data, dateOrTimeAgo }) => {
  return (
    <>
      {data?.data?.data?.length ? (
        <>
          {data?.data?.data?.map(notif => (
            <Flex
              bg='background'
              cursor="pointer" w='100%'
              px='15px' py='10px' gap='20px'
              key={notif.title}
              opacity={0.7}
            >
              <Center w='24px' h='24px' borderRadius={'full'} >
                <Image
                  justifySelf="flex-end"
                  src={NOTIFICATION[notif.topic.toLowerCase().replace(" ", "_")]?.src || NOTIFICATION.wallet_transaction.src}
                  h={"16px"} w={"16px"}
                  alt={`${notif.topic} icon`}
                />
              </Center>
              <Box w='100%' pr={'26px'} color={'text'}>
                <Flex align='center' color={'text'} gap={'10px'}>
                  <Text fontSize='14px' fontWeight={600} as='h2' noOfLines={1}>
                    {notif.topic}
                  </Text>
                  <Text fontSize={'11px'} ml='8px' lineHeight='16px' noOfLines={1}>
                    {dateOrTimeAgo(notif.time_ago)}
                  </Text>
                </Flex>
                <Flex justify='space-between' align='flex-end' mb='10px'>
                  <Text fontSize={'12px'} fontWeight={400}>
                    {notif.message}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          ))}
        </>
      ) : (
        <EmptyState text='No notification yet' />
      )}
    </>
  )
}

export default NotificationList