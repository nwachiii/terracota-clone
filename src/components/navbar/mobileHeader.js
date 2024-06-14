import React from 'react';
import { Flex, Text, Icon } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { BiMenu } from 'react-icons/bi';

const MobileHeader = ({ activePage, onDrawerOpen, onDrawerClose }) => {
  return (
    <Flex
      display={{ base: 'flex', md: 'none' }}
      mb='10px' px={'48px'} w='full' bg={'card_bg'}
      justify={'space-between'}
      align={'center'} p='20px' direction={'row'}
    >
      <Flex align={'center'} gap='10px' justify={'center'}>
        <ChevronLeftIcon cursor={'pointer'} onClick={onDrawerClose} fontSize={'30px'} color={'text'} />
        <Text color='text' fontSize={'18px'} fontWeight={500}>{activePage}</Text>
      </Flex>
      <Icon as={BiMenu} color='text' onClick={onDrawerOpen} fontSize={'30px'} />
    </Flex>
  )
}

export default MobileHeader