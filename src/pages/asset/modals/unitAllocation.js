import React from 'react'
import { Modal, ModalOverlay, ModalContent, Tag, TagLabel, ModalBody, Flex, Text, Image, Box, ModalCloseButton } from '@chakra-ui/react'
import { themeStyles } from '../../../theme';
import planImg from '../../../images/unit-allocation.png';
import { Button } from '../../../ui-lib';


const UnitAllocation = ({ allocationModal, confirmModal }) => {
  return (
    <Modal autoFocus={false} blockScrollOnMount={true} onClose={allocationModal?.onClose} isOpen={allocationModal?.isOpen}>
      <ModalOverlay />
      <ModalContent maxW="800px" px='0' py='0'>
        <ModalCloseButton />
        <ModalBody>

          <Text {...themeStyles.textStyles.sb3}>Unit Allocation</Text>
          <Image alt='next_image' border='1.5px solid #E4E4E4' src={planImg.src} mt='32px' maxH='150px' borderRadius={'24px'} w='full' />

          <Flex gap='18px' my='33px' direction={'row'}>
            <Image alt='next_image'
              w='117.86px' h='120px'
              _hover={{ borderColor: '#E6192A' }}
              border='1px solid #E4E4E4 !important'
              borderRadius='16px' src={planImg.src} />
            <Image alt='next_image'
              w='117.86px' h='120px'
              _hover={{ borderColor: '#E6192A' }}
              border='1px solid #E4E4E4 !important'
              borderRadius='16px' src={planImg.src} />
            <Image alt='next_image'
              w='117.86px' h='120px'
              _hover={{ borderColor: '#E6192A' }}
              border='1px solid #E4E4E4 !important'
              borderRadius='16px' src={planImg.src} />
          </Flex>

          <Text {...themeStyles.textStyles.sl3}>Select a unit</Text>

          <Flex gap='18px' my='27px' direction={'row'}>
            <Tag cursor='pointer' _hover={{ color: '#E4E4E4', background: '#E6192A' }} color='#E6192A' bg='#E4E4E4' p={3} w='93px' size='lg' borderRadius='full'>
              <TagLabel mx='auto' fontWeight='500'>BN23</TagLabel>
            </Tag>
            <Tag cursor='pointer' _hover={{ color: '#E4E4E4', background: '#E6192A' }} color='#E6192A' bg='#E4E4E4' p={3} w='93px' size='lg' borderRadius='full'>
              <TagLabel mx='auto' fontWeight='500'>BN23</TagLabel>
            </Tag>
            <Tag cursor='pointer' _hover={{ color: '#E4E4E4', background: '#E6192A' }} color='#E6192A' bg='#E4E4E4' p={3} w='93px' size='lg' borderRadius='full'>
              <TagLabel mx='auto' fontWeight='500'>BN23</TagLabel>
            </Tag>
          </Flex>

          <Button
            w='213px' mt='41px' float='right'
            color='white' bg='#E6192A'
            onClick={confirmModal?.onOpen}
          >Proceed</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default UnitAllocation