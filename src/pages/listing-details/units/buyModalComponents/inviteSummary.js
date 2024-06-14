import React, {useState} from 'react';
import {
  ModalContent,
  Box,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Center,
  Image,
  Flex,
} from '@chakra-ui/react';
import {Button, CustomizableButton} from '../../../../ui-lib';
import isMobile from '../../../../utils/extras';
import {formatToCurrency} from '../../../../utils';
import {useAssetPayment} from '../../../../ui-lib/ui-lib.hooks';
import processingLoader from '../../../../images/processing-transaction.gif';
import successfulLoader from '../../../../images/successful-transaction.gif';
import moment from 'moment';

const Summary = ({
  onCloseModal,
  coOwnerDetails,
  setStep,
  paymentDetails,
  buyModal,
  amountToPay,
  setReturnedData,
}) => {
  const splitAmountToPay = `${
    (Number(coOwnerDetails?.split_ownership) / 100) * Number(amountToPay)
  }`;
  const coOwnPaymentDetails = {
    ...paymentDetails,
    invitees: [
      {email: coOwnerDetails?.email, equity_value: Number(coOwnerDetails?.split_ownership)},
    ],
    from_store: true,
    offer_expires: moment(coOwnerDetails?.exp_dat).format('YYYY-MM-DD'),
  };
  const {
    handleBankTransfer,
    handlePayFromWallet,
    handlePaywithCard,
    authUrl,
    setAuthUrl,
    isLoading,
    setLoading,
    paymentStep,
    setPaymentStep,
    trasferDetails,
    setTransferDetails,
    formattedAmount,
    isAboveLimit,
    paymentMutation,
    depositMutation,
    handleEndTransaction,
  } = useAssetPayment({
    paymentType: 'asset',
    amountToPay: splitAmountToPay,
    modal: buyModal,
    paymentDetails: coOwnPaymentDetails,
    onSuccessful: data => setReturnedData(data),
  });

  const mainContent = (
    <>
      {paymentMutation.isSuccess || depositMutation.isSuccess ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'}>
          <Image alt="loader" w="150px" h="150px" src={successfulLoader.src} />
          <Text
            color="text"
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            className="gilda-display-regular"
            fontSize={'28px'}
            mt={{base: '12px', md: '45px'}}
          >
            Co-ownership invitation sent successfully
          </Text>
          <Flex
            align={'center'}
            gap="16px"
            justify={'center'}
            mt="15px"
            w="full"
            px={{base: 'unset', md: '24px'}}
          >
            <CustomizableButton
              border="1px solid #DDB057 !important"
              bg="transparent"
              color="#DDB057"
              h="48px"
              w="50%"
              onClick={() => setStep('inviteMore')}
            >
              Invite Another User
            </CustomizableButton>
            <Button w="50%" h="48px" bg="primary" color="white" onClick={() => setStep('invitees')}>
              View Invited Users
            </Button>
          </Flex>
        </Center>
      ) : isLoading ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'}>
          <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
          <Text
            color="text"
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            className="gilda-display-regular"
            fontSize={'28px'}
            my={{base: '12px', md: '25px'}}
          >
            Processing...
          </Text>
          <Text color="text" opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Box w="full">
          <Text fontSize={'33px'} fontWeight={400} className="gilda-display-regular" mb="18px">
            Invitation summary
          </Text>
          <VStack spacing="27px" align="stretch">
            <VStack spacing="7px" align="stretch">
              <Text color="#919191" fontSize="19px">
                Full Name
              </Text>
              <Text className="gilda-display-regular" fontSize={'23px'}>
                {coOwnerDetails?.full_name}
              </Text>
            </VStack>
            <VStack spacing="7px" align="stretch">
              <Text color="#919191" fontSize="19px">
                Email Address
              </Text>
              <Text className="gilda-display-regular" fontSize={'23px'}>
                {coOwnerDetails?.email}
              </Text>
            </VStack>
            <VStack spacing="7px" align="stretch">
              <Text color="#919191" fontSize="19px">
                Split ownership
              </Text>
              <Text className="gilda-display-regular" fontSize={'23px'}>
                {coOwnerDetails?.split_ownership}%
              </Text>
            </VStack>
            <VStack spacing="7px" align="stretch">
              <Text color="#919191" fontSize="19px">
                Shared unit price
              </Text>
              <Text className="gilda-display-regular" fontSize={'23px'}>
                {formatToCurrency(splitAmountToPay)}
              </Text>
            </VStack>
            <VStack spacing="7px" align="stretch">
              <Text color="#919191" fontSize="19px">
                Offer expiration date
              </Text>
              <Text className="gilda-display-regular" fontSize={'23px'}>
                {new Date(coOwnerDetails?.exp_date).toDateString()}
              </Text>
            </VStack>
          </VStack>

          <Button
            w="full"
            mt="50px"
            h="48px"
            bg="primary"
            color="white"
            onClick={handlePaywithCard}
          >
            Proceed
          </Button>
        </Box>
      )}
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
            maxW="430px"
            px={{base: '15px', md: '32px'}}
            minH={{base: 'unset', md: '518px'}}
            py={{base: '28px', md: '38px'}}
            // borderTopRadius={{base: '10px', md: '16px'}}
          >
            {mainContent}
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
            maxW="558px"
            px={{base: '15px', md: '24px'}}
            minH="421px"
            py={{base: '28px', md: '38px'}}
            borderRadius={0}
          >
            {mainContent}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Summary;
