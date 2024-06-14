import React, { useState } from 'react'
import { Flex, Box, Text, HStack, Icon, Textarea, Center, Image, } from '@chakra-ui/react'
import { Button } from '../../../ui-lib';
import { BsArrowLeft } from 'react-icons/bs';
import { CloseIcon } from '@chakra-ui/icons';
import processingLoader from '../../../images/processing-transaction.gif'
import successfulLoader from '../../../images/successful-transaction.gif'


const InviteRejection = ({ mutation, setType, onNotClose, customScrollbarStyles, handleReject }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    handleReject(message)
  }

  return (
    <>
      <Flex w='full' justify={'space-between'} align={'center'} px='24px' pt={'28px'}>
        <HStack align={'center'}>
          <Icon color='text' as={BsArrowLeft} fontSize={'27px'} style={{ cursor: 'pointer' }} onClick={() => setType('inviteesReaction')} />
          <Text color='text' fontSize={'20px'} fontWeight={500} className='gilda-display-regular'>Reject offer</Text>
        </HStack>

        <CloseIcon fontSize={'17px'} onClick={onNotClose} cursor={'pointer'} />
      </Flex>

      {mutation?.isSuccess ? (
        <Center mt='20px' w='full' h='full' maxH={'450px'} flexDirection={'column'}>
          <Image alt='loader' w='150px' h='150px' src={successfulLoader.src} />
          <Text color='text' fontWeight={500} fontSize={'28px'} my='25px' className='gilda-display-regular'>Response sent</Text>
          <Text color='text' fontSize={'16px'} fontWeight='400'>Your response has been successfully sent</Text>
        </Center>
      ) : mutation?.isLoading ? (
        <Center mt='20px' w='full' h='full' maxH={'450px'} flexDirection={'column'}>
          <Image alt='loader' w='150px' h='150px' src={processingLoader.src} />
          <Text color='text' fontWeight={500} fontSize={'28px'} my='25px' className='gilda-display-regular'>Sending response</Text>
          <Text color='text' fontSize={'16px'} fontWeight='400'>Wait a moment</Text>
        </Center>
      ) : (
        <>
          <Box w='full' borderBottom='1px solid' borderColor={'shade'} mb='21px' mt={'14px'} />

          <Box px='24px' pb='38px' h={'fit-content'} overflowY={'scroll'} __css={customScrollbarStyles}>
            <Text fontSize={{ base: '12px', md: '16px' }} fontWeight={400} color='#344054' mb='6px' mt={{ base: '22px', md: '6px' }}>
              Why are you rejecting this offer?
            </Text>
            <Textarea
              boxShadow={'0px 1px 2px 0px rgba(16, 24, 40, 0.05)'}
              onChange={e => setMessage(e.target.value)}
              value={message} resize='none'
              border='0.5px solid !important'
              borderColor={'#E4E4E4'}
              borderRadius={'0 !important'}
              w='full' h='201px'
              placeholder='Kindly let us know why you are rejecting this offer...'
            />

            <Button
              w='full' mt='30px'
              bg='primary' color='white'
              onClick={handleSubmit}
            >Submit</Button>

          </Box>
        </>
      )}
    </>
  )
}

export default InviteRejection