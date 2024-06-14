import { Box, HStack, Icon, Image, Stack, Text, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import chatIcon from '../../../images/icons/chatIconForInspectionFeedback.svg';
import { useQuery } from 'react-query';
import { fetchpendingInspectionFeedbaack } from '../../../api/navbarMenu';
import FeedbackEquity from './feedbackEquity';
import { Button } from '../../../ui-lib';
import cancelICon from '/src/images/icons/closeIcon.svg';
import { CloseIcon } from '@chakra-ui/icons';


export const InspectionFeedBack = () => {
  const [willDisplay, setWillDisplay] = useState(true);
  const drawerDisclosure = useDisclosure();

  const { data, refetch } = useQuery(
    ['fetchpendingInspectionFeedbaack'],
    fetchpendingInspectionFeedbaack
  );


  return (
    <Box w='full'>
      {data?.data?.data?.length ? (
        <>
          {willDisplay && (
            <HStack
              w="85%" bg='#101010' mx='auto'
              boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
              justify="space-between" p={{ base: '4px', md: "12px" }}
              minH={{ base: '48px', md: "72px" }} mb={{ base: '8px', md: "15px" }}
            >
              <HStack w='80%' spacing={{ base: '3px', md: "16px" }}>
                <HStack
                  p={{ base: '3px', md: "10px" }}
                  justify="center" align="center"
                >
                  <Image boxSize={{ base: '30px', md: 'unset' }} src={chatIcon.src} alt="home Icon" />
                </HStack>


                <Text color={'#FBFCFC'} fontSize={{ base: '10px', md: '14px' }} fontWeight={300}>
                  <Text as='span' fontSize={{ base: '10px', md: "16px" }} fontWeight={600}> How was your inspection? {' '}</Text>
                  {"We'll"} like to know how it was. Kindly give feedback.
                </Text>

              </HStack>


              <HStack spacing={{ base: '8px', md: "18px" }} pr='4px'>
                <Button
                  color="#FBFCFC" bg="transparent"
                  border="1px solid !important" borderColor='primary'
                  boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                  onClick={drawerDisclosure.onOpen}
                  h={{ base: '23px', md: "44px" }} w={'fit-content'}
                  _hover={{ opacity: 1, }}
                  _active={{ opacity: 1, }}
                >
                  <Text wordBreak={'break-word'} fontSize={{ base: '10px', md: '16px' }}>Give Feedback</Text>
                </Button>
                <CloseIcon
                  fontSize='11px'
                  color='#FBFCFC'
                  onClick={() => setWillDisplay(false)}
                  cursor="pointer"
                  src={cancelICon.src}
                />
              </HStack>
            </HStack>
          )}
        </>
      ) : null}
      <FeedbackEquity
        equity={data?.data?.data?.[0]}
        refetch={refetch}
        feedModal={drawerDisclosure}
      />
    </Box>
  );
};

export default InspectionFeedBack;
