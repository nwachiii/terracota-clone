import React, {useEffect, useState} from 'react';
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
import {Button, CustomizableButton} from '../../../../ui-lib';
import {useRouter} from 'next/router';

const Disclosure = ({
  onCloseModal,
  fractionalData,
  setFullPayment,
  setStep,
  fractionalModal,
  fullPayment,
}) => {
  const router = useRouter();

  const Disclosure = ({onCloseModal, setFullPayment, setStep, fractionalModal, fullPayment}) => {
    const [screenWidth, setScreenWidth] = useState();

    useEffect(() => {
      setScreenWidth(window.innerWidth);

      window.addEventListener('resize', () => {
        setScreenWidth(window.innerWidth);
      });
    }, []);

    const mainContent = (
      <Box w="full">
        <Flex w="full" justify="space-between" align="center">
          <Text
            color="#000"
            fontSize={{base: '23px', md: '33px'}}
            fontWeight={400}
            className="gilda-display-regular"
          >
            Fractional Disclosure
          </Text>
          <Center p="8px">
            <CloseIcon
              color="text"
              cursor={'pointer'}
              onClick={fractionalModal?.onClose}
              fontSize={'12px'}
            />
          </Center>
        </Flex>

        <Text fontSize="16px" fontWeight={400} mt="22px" color={'#4B4B4B'}>
          Fractional ownership is illiquid outside of our platform. For a comprehensive explanation
          of the conditions, restrictions, and limitations associated with fractional ownership,
          please refer to our terms of service on fractional ownership.
        </Text>

        <Flex justify="center" align="center" gap="20px" mt="42px">
          <CustomizableButton
            border="1px solid !important"
            color="primary"
            borderColor="primary"
            bg="white"
            h="49px"
            w="302px"
            onClick={fractionalModal?.onClose}
          >
            Cancel
          </CustomizableButton>
          <Button
            onClick={() =>
              isMobile
                ? router.push(
                    `/listing-details/fractional_details/${fractionalData?.fraction_data?.unit?.id}`
                  )
                : setStep('price')
            }
            color="white"
            bg="primary"
            h="49px"
            w="302px"
          >
            Accept & Continue
          </Button>
        </Flex>
      </Box>
    );

    return (
      <>
        {screenWidth < 768 ? (
          <Drawer
            autoFocus={false}
            onCloseComplete={onCloseModal}
            isCentered
            onClose={fractionalModal?.onClose}
            isOpen={fractionalModal?.isOpen}
            placement="bottom"
          >
            <DrawerOverlay />
            <DrawerContent
              bg="card_bg"
              maxW="716px"
              pt={{base: '20px', md: '35px'}}
              pb={{base: '40px', md: '50px'}}
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
            onClose={fractionalModal?.onClose}
            isOpen={fractionalModal?.isOpen}
          >
            <ModalOverlay />
            <ModalContent
              bg="card_bg"
              w="full"
              maxW="716px"
              py={{base: '20px', md: '35px'}}
              px={{base: '12px', md: '37px'}}
              borderRadius={0}
            >
              {mainContent}
            </ModalContent>
          </Modal>
        )}
      </>
    );
  };
};

export default Disclosure;
