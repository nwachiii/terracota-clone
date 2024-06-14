import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, Flex, Text, ModalCloseButton } from '@chakra-ui/react'
import { themeStyles } from '../../../theme';
import { Button } from '../../../ui-lib';


const ConfirmAlloc = ({ confirmModal }) => {
  return (
    <Modal autoFocus={false} isCentered onClose={confirmModal?.onClose} isOpen={confirmModal?.isOpen}>
      <ModalOverlay />
      <ModalContent maxW="638px" h='431px' px='41px'>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={'column'} justify={'center'} h='full'>
            <Text {...themeStyles.textStyles.sb3} textAlign='center'>Are you sure you want BN23?</Text>
            <Flex gap='20px' mt='48px' direction={'row'}>
              <Button
                w='213px' h='60px'
                border='1px solid #E6192A'
                color='#E6192A' bg='white'
                onClick={confirmModal?.onClose}
              >No, go back</Button>
              <Button
                w='213px' h='60px' color='white'
                bg='#E6192A'>Yes</Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmAlloc