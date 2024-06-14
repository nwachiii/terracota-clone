import React, {useEffect} from 'react';
import {
  ModalContent,
  Box,
  ModalBody,
  VStack,
  Image,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Center,
} from '@chakra-ui/react';
import {CloseIcon} from '@chakra-ui/icons';
import stack from '../../../../images/payment-plan-img.svg';
import rhombus from '../../../../images/outright-purchase-img.svg';
import isMobile from '../../../../utils/extras';

const Type = ({onCloseModal, setFullPayment, setStep, buyModal, fullPayment}) => {
  useEffect(() => {
    if (fullPayment) {
      setStep('terms');
    }
  }, [fullPayment]);

  const types = [
    {
      header: 'Outright Payment ',
      subHeader: 'Complete payment with lump-sum payment.',
      onClick: () => {
        setStep('terms');
        setFullPayment(true);
      },
    },
    {
      header: 'Payment plan ',
      subHeader: 'Pay in instalments instead of a lump-sum payment.',
      onClick: () => {
        setStep('plan');
        setFullPayment(false);
      },
    },
  ];

  const mainContent = (
    <>
      <Box px="10px">
        <Flex w="full" justify="space-between" align="center">
          <Text
            color="#000"
            fontSize={{base: '23px', md: '23px'}}
            mb="7px"
            fontWeight={400}
            className="gilda-display-regular"
          >
            How would you like to pay?
          </Text>
          <Center p="8px">
            <CloseIcon
              color="text"
              cursor={'pointer'}
              onClick={buyModal?.onClose}
              fontSize={'15px'}
            />
          </Center>
        </Flex>
        <Flex
          mt={{base: '24px', md: '24px'}}
          gap={{base: '18px', md: '16px'}}
          justify="space-between"
          align="stretch"
          direction={{base: 'column', md: 'row'}}
        >
          {types.map(typeToUse => (
            <Flex
              // _hover={{ bg: '#747474' }}
              onClick={typeToUse.onClick}
              cursor="pointer"
              w="full"
              px={'24px'}
              pb={{base: '24px', md: '40px'}}
              pt={{base: '24px', md: '30px'}}
              gap="16px"
              align={'center'}
              border="1px solid"
              borderRadius="2px"
              borderColor={'#747474'}
            >
              <VStack align="stretch" spacing={'8px'}>
                <Text
                  fontSize={'23px'}
                  fontWeight="400"
                  color="text"
                  className="gilda-display-regular"
                >
                  {typeToUse.header}
                </Text>
                <Text fontSize={{base: '13px', md: '15px'}} fontWeight="500" color="#4B4B4B">
                  {typeToUse.subHeader}
                </Text>
              </VStack>
            </Flex>
          ))}
        </Flex>
      </Box>
    </>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          autoFocus={false}
          onCloseComplete={onCloseModal}
          isCentered
          onClose={buyModal?.onClose}
          isOpen={buyModal?.isOpen}
          placement="bottom"
        >
          <DrawerOverlay />
          <DrawerContent
            bg="card_bg"
            maxW="716px"
            pt={{base: '20px', md: '35px'}}
            pb={{base: '25px', md: '50px'}}
            px={{base: '12px', md: '37px'}}
            // borderTopRadius={{base: '10px', md: '16px'}}
          >
            <DrawerBody px="0">{mainContent}</DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          autoFocus={false}
          onCloseComplete={onCloseModal}
          isCentered
          onClose={buyModal?.onClose}
          isOpen={buyModal?.isOpen}
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            maxW="716px"
            pt={{base: '20px', md: '35px'}}
            pb={{base: '25px', md: '50px'}}
            px={{base: '12px', md: '37px'}}
            borderRadius={0}
          >
            <ModalBody px="0">{mainContent}</ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Type;
