import React from 'react';
import {Image, Flex, Box, Text, VStack, Divider} from '@chakra-ui/react';
import card from '../../../../images/icons/mainstone-wallet-card.svg';
import bank from '../../../../images/icons/asset-payment-with-bank.svg';
import wallet from '../../../../images/icons/debit-card.svg';
import {formatToCurrency} from '../../../../utils';
import BankAccountModal from './BankAccountModal';
import ConfirmWallet from './ConfirmWallet';
import {ChevronRightIcon} from '@chakra-ui/icons';
import ConfirmCard from './ConfirmCard';
import mainstoneBG from '../../../../images/just-logo.svg';
import {useAssetPayment} from '../../../../ui-lib/ui-lib.hooks';

const PaymentDrawer = ({asset, drawer, setType, customScrollbarStyles, setStep, amount}) => {
  const paymentType = 'deposit';

  const paymentDetails = {
    amount_to_pay: Number(amount),
    equity_id: asset?.id,
    is_coown: false,
    pending: true,
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
  } = useAssetPayment({paymentType, amountToPay: amount, modal: drawer, paymentDetails});

  return (
    <>
      {paymentStep === 'index' ? (
        <Box
          px="24px"
          pb="38px"
          h={'fit-content'}
          overflowY={'scroll'}
          __css={customScrollbarStyles}
        >
          <Flex
            my="12px"
            h="130px"
            w="full"
            color="white"
            border="1px solid"
            borderColor={'shade'}
            bg="card_bg"
            align={'center'}
            justify={'center'}
            direction="column"
          >
            <Text color="text" fontSize={{base: '14px', md: '18px'}} fontWeight={400}>
              You will Pay
            </Text>
            <Text
              color="text"
              fontSize={{base: '28px', md: '34px'}}
              fontWeight={500}
              className="gilda-display-regular"
            >
              {formatToCurrency(formattedAmount)}
            </Text>
          </Flex>

          <Text color="text" mt="30px" fontSize={'16px'}>
            Select payment method
          </Text>

          <VStack
            border="1px solid #CBCBCB"
            borderRadius={'4px'}
            spacing="16px"
            mt="17px"
            direction={'column'}
            divider={<Divider w="full" color="##CBCBCB" />}
            align={'stretch'}
            py="17px"
            px="17px"
          >
            {!isAboveLimit && (
              <Flex
                cursor={isAboveLimit ? 'not-allowed' : 'pointer'}
                onClick={() => setPaymentStep('confirmCard')}
                justify={'space-between'}
                align={'center'}
                w="full"
              >
                <Flex py="5px" gap="17px" align="center">
                  <Image alt="next_image" h="30px" w="30px" src={card.src} />
                  <Flex direction={'column'}>
                    <Text color="text" fontWeight={500} fontSize={'16px'}>
                      Debit Card
                    </Text>
                    <Text color="text" fontWeight={400} fontSize={'10px'}>
                      Use a debit card to complete your payment
                    </Text>
                  </Flex>
                </Flex>
                <ChevronRightIcon fontSize={'20px'} />
              </Flex>
            )}

            <Flex
              cursor={'pointer'}
              onClick={() => setPaymentStep('confirmWallet')}
              justify={'space-between'}
              align={'center'}
              w="full"
            >
              <Flex py="5px" gap="17px" align="center">
                <Image alt="next_image" h="30px" w="30px" src={wallet.src} />
                <Flex direction={'column'}>
                  <Text color="text" fontWeight={500} fontSize={'16px'}>
                    Wallet
                  </Text>
                  <Text color="text" fontWeight={400} fontSize={'10px'}>
                    Make payment from your wallet
                  </Text>
                </Flex>
              </Flex>
              <ChevronRightIcon fontSize={'20px'} />
            </Flex>

            <Flex
              cursor={'pointer'}
              onClick={handleBankTransfer}
              justify={'space-between'}
              align={'center'}
              w="full"
            >
              <Flex py="5px" gap="17px" align="center">
                <Image alt="next_image" h="30px" w="30px" src={bank.src} />
                <Flex direction={'column'}>
                  <Text color="text" fontWeight={500} fontSize={'16px'}>
                    Bank Transfer
                  </Text>
                  <Text color="text" fontWeight={400} fontSize={'10px'}>
                    Transfer payment to a designated account
                  </Text>
                </Flex>
              </Flex>
              <ChevronRightIcon fontSize={'20px'} />
            </Flex>
          </VStack>
        </Box>
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
          modal={drawer}
        />
      ) : paymentStep === 'confirmWallet' ? (
        <ConfirmWallet
          amountToPay={amount}
          loading={isLoading}
          success={paymentMutation.isSuccess || depositMutation.isSuccess}
          proceed={handlePayFromWallet}
          setPaymentStep={setPaymentStep}
        />
      ) : paymentStep === 'confirmCard' ? (
        <ConfirmCard
          amountToPay={amount}
          loading={isLoading}
          success={paymentMutation.isSuccess || depositMutation.isSuccess}
          proceed={handlePaywithCard}
          setPaymentStep={setPaymentStep}
        />
      ) : null}
    </>
  );
};

export default PaymentDrawer;
