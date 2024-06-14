import React, {useEffect, useState} from 'react';
import {
  ModalContent,
  Image,
  Flex,
  Box,
  Text,
  Modal,
  ModalOverlay,
  VStack,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  HStack,
  Center,
  Button,
} from '@chakra-ui/react';
import mainstoneWallet from '../../images/icons/mainstone-wallet-card.svg';
import bank from '../../images/icons/asset-payment-with-bank.svg';
import paymentCard from '../../images/icons/debit-card.svg';
import {formatToCurrency} from '../../utils';
import BankAccountModal from './BankAccountModal';
import ConfirmWallet from './ConfirmWallet';
import {CloseIcon} from '@chakra-ui/icons';
import ConfirmCard from './ConfirmCard';
import {useAssetPayment} from '../../ui-lib/ui-lib.hooks';
import processingLoader from '../../images/processing-transaction.gif';
import successfulLoader from '../../images/successful-transaction.gif';

import isMobile from '../../utils/extras';
const PaymentModal = ({
  setStep,
  paymentType,
  amountToPay,
  modal,
  paymentDetails,
  onCloseModal,
  isFractional,
}) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const [screenWidth, setScreenWidth] = useState();

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

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
    paymentType,
    amountToPay,
    modal,
    paymentDetails,
    auth_code: selectedCard?.authorization_code,
  });

  const handlePaymentModalClose = () => {
    setStep && setStep('type');
    setPaymentStep('index');
    handleEndTransaction();
    setSelectedCard(null);
    onCloseModal();
  };

  const innerContent = (
    <>
      {paymentMutation.isSuccess || depositMutation.isSuccess ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'} textAlign={'center'}>
          <Image alt="loader" w="150px" h="150px" src={successfulLoader.src} />
          <Text
            color="text"
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            className="gilda-display-regular"
            fontSize={'28px'}
            my={{base: '12px', md: '25px'}}
          >
            Transaction Successful
          </Text>
          <Text color="text" opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Your payment has been successfully processed
          </Text>
          <Button
            borderRadius={'2px'}
            onClick={onCloseModal}
            color="white"
            w={'full'}
            maxW={'100%'}
            bg="primary"
            h="49px"
            mt="40px"
          >
            Finish
          </Button>
        </Center>
      ) : isLoading ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'} textAlign={'center'}>
          <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
          <Text
            color="text"
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            className="gilda-display-regular"
            fontSize={'28px'}
            my={{base: '12px', md: '25px'}}
          >
            Processing payment
          </Text>
          <Text color="text" opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Box w="full">
          <Flex direction="row" justify="space-between" align={'center'} mb="10px">
            <Text
              color="text"
              fontSize={{base: '16px', md: '28px'}}
              fontWeight={400}
              className="gilda-display-regular"
            >
              Payment Method
            </Text>
            <CloseIcon
              color="text"
              style={{cursor: 'pointer'}}
              size="20"
              onClick={modal?.onClose}
            />
          </Flex>
          <Flex
            h="135px"
            bg="#FBFCFC"
            borderColor={'shade !important'}
            mt="12px"
            border="1px solid"
            direction="column"
            w="full"
            align={'center'}
            justify={'center'}
          >
            <Text color="text" fontWeight={400} fontSize={{base: '14px', md: '16px'}}>
              You will Pay
            </Text>
            <Text
              className="gilda-display-regular"
              color="text"
              fontWeight={500}
              fontSize={{base: '34px', md: '34px'}}
            >
              {formatToCurrency(formattedAmount)}
            </Text>
          </Flex>

          <Text
            color="text"
            mt={{base: '24px', md: '24px'}}
            fontSize={{base: '14px', md: '16px'}}
            fontWeight={500}
            opacity={0.7}
          >
            Select payment method
          </Text>

          <VStack mt={{base: '10px', md: '14px'}} spacing={'16px'}>
            <Flex
              border="1px solid"
              borderColor={'shade'}
              p="16px"
              cursor={'pointer'}
              onClick={handlePayFromWallet}
              w="full"
              pt="15px"
              pb="21px"
              gap="17px"
            >
              <Image mt="5px" alt="next_image" h="30px" w="30px" src={mainstoneWallet.src} />
              <Flex direction={'column'} gap="6px">
                <HStack spacing="10px">
                  <Text fontWeight={500} fontSize={'16px'} color="#000">
                    Wallet
                  </Text>
                  <Center
                    w="fit-content"
                    px="8px"
                    py="4px"
                    border={'1px solid #606060'}
                    color="#606060"
                    h="20px"
                    borderRadius={'4px'}
                  >
                    <Text fontSize={'12px'} fontWeight={400}>
                      Free
                    </Text>
                  </Center>
                </HStack>
                <Text fontWeight={500} color="#606060" fontSize={'13px'}>
                  Make payment from your wallet
                </Text>
              </Flex>
            </Flex>

            {!isAboveLimit && (
              <Flex
                border="1px solid"
                borderColor={'shade'}
                p="16px"
                cursor={isAboveLimit ? 'not-allowed' : 'pointer'}
                onClick={() => setPaymentStep('confirmCard')}
                w="full"
                pt="15px"
                pb="21px"
                gap="17px"
              >
                <Image mt="5px" alt="next_image" h="30px" w="30px" src={paymentCard.src} />
                <Flex direction={'column'} gap="6px">
                  <HStack spacing="10px">
                    <Text fontWeight={500} fontSize={'16px'} color="#000">
                      Debit/Credit Card
                    </Text>
                    <Center
                      w="fit-content"
                      px="8px"
                      py="4px"
                      border={'1px solid #606060'}
                      color="#606060"
                      h="20px"
                      borderRadius={'4px'}
                    >
                      <Text fontSize={'12px'} fontWeight={400}>
                        Charges applies
                      </Text>
                    </Center>
                  </HStack>

                  <Text fontWeight={500} color="#606060" fontSize={'13px'}>
                    Use a debit card to complete your payment
                  </Text>
                </Flex>
              </Flex>
            )}

            {!isFractional && (
              <Flex
                border="1px solid"
                borderColor={'shade'}
                p="16px"
                cursor={'pointer'}
                onClick={handleBankTransfer}
                w="full"
                pt="15px"
                pb="21px"
                gap="17px"
              >
                <Image mt="5px" alt="next_image" h="30px" w="30px" src={bank.src} />
                <Flex direction={'column'} gap="6px">
                  <HStack spacing="10px">
                    <Text fontWeight={500} fontSize={'16px'} color="#000">
                      Bank Transfer
                    </Text>
                    <Center
                      w="fit-content"
                      px="8px"
                      py="4px"
                      border={'1px solid #606060'}
                      color="#606060"
                      h="20px"
                      borderRadius={'4px'}
                    >
                      <Text fontSize={'12px'} fontWeight={400}>
                        Charges applies
                      </Text>
                    </Center>
                  </HStack>
                  <Text fontWeight={500} color="#606060" fontSize={'13px'}>
                    Transfer payment to a designated account
                  </Text>
                </Flex>
              </Flex>
            )}
          </VStack>
        </Box>
      )}
    </>
  );

  const mainContent = (
    <>
      {paymentStep === 'index' ? (
        <>
          {isMobile ? (
            <DrawerContent
              bg="card_bg"
              maxW="560px"
              px={{base: '20px', md: '35px'}}
              minH="401px"
              pt={{base: '18px', md: '30px'}}
              pb={{base: '20px', md: '53px'}}
              // borderTopRadius={{base: '10px', md: '16px'}}
            >
              {innerContent}
            </DrawerContent>
          ) : (
            <ModalContent
              bg="card_bg"
              maxW="500px"
              px={{base: '20px', md: '35px'}}
              minH="401px"
              pt={{base: '18px', md: '30px'}}
              pb={{base: '20px', md: '53px'}}
              borderRadius={{base: '10px', md: '5px'}}
            >
              {innerContent}
            </ModalContent>
          )}
        </>
      ) : paymentStep === 'bankDetails' ? (
        <BankAccountModal
          handleEndTransaction={handleEndTransaction}
          authUrl={authUrl}
          amount={formattedAmount}
          paymentType={paymentType}
          loading={isLoading}
          success={paymentMutation.isSuccess || depositMutation.isSuccess}
          trasferDetails={trasferDetails}
          setPaymentStep={setPaymentStep}
          modal={modal}
        />
      ) : paymentStep === 'confirmWallet' ? (
        <ConfirmWallet
          amountToPay={amountToPay}
          loading={isLoading}
          success={paymentMutation.isSuccess || depositMutation.isSuccess}
          proceed={handlePayFromWallet}
          setPaymentStep={setPaymentStep}
        />
      ) : paymentStep === 'confirmCard' ? (
        <ConfirmCard
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          amountToPay={amountToPay}
          loading={isLoading}
          success={paymentMutation.isSuccess || depositMutation.isSuccess}
          proceed={handlePaywithCard}
          setPaymentStep={setPaymentStep}
        />
      ) : null}
    </>
  );

  return (
    <>
      {screenWidth < 768 ? (
        <Drawer
          onCloseComplete={handlePaymentModalClose}
          isCentered
          onClose={modal?.onClose}
          isOpen={modal?.isOpen}
          placement="bottom"
          borderRadius={{base: '10px', md: '16px'}}
        >
          <DrawerOverlay />
          {mainContent}
        </Drawer>
      ) : (
        <Modal
          autoFocus={false}
          onCloseComplete={handlePaymentModalClose}
          isCentered
          onClose={modal?.onClose}
          isOpen={modal?.isOpen}
          borderRadius={{base: '10px', md: '16px'}}
        >
          <ModalOverlay />
          {mainContent}
        </Modal>
      )}
    </>
  );
};

export default PaymentModal;
