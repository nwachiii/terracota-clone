import {useState} from 'react';
import TransactionsList from './TransactionsList';
import SummaryDrawer from './Summary';
import PaymwntDrawer from './payment';
import Breakdown from './Breakdown';
import {RxCross1} from 'react-icons/rx';
import {
  DrawerContent,
  Flex,
  Box,
  Text,
  Drawer,
  DrawerOverlay,
  HStack,
  Icon,
} from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import isMobile from '../../../utils/extras';

const PendingTransactions = ({assetData, drawer, isError, isLoading}) => {
  const [type, setType] = useState('list');
  const [asset, setAsset] = useState(null);
  const [amountToPay, setAmountToPay] = useState('');

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const handleClose = () => {
    setType('list');
    setAsset(null);
    setAmountToPay('');
  };

  return (
    <Drawer
      onCloseComplete={handleClose}
      blockScrollOnMount
      scrollBehavior="inside"
      onClose={drawer?.onClose}
      isOpen={drawer?.isOpen}
      placement={isMobile ? 'bottom' : 'right'}
    >
      <DrawerOverlay />
      <DrawerContent
        top="unset !important"
        bottom={{base: 'unset', md: '24px !important'}}
        right={{base: 'unset', md: '24px !important'}}
        w="full"
        minH="20vh"
        h={'fit-content'}
        p="16px"
        maxW={'500px'}
        maxH={'711px'}
        bg="#FBFCFC"
        px="0"
      >
        <Box px="24px" pt={'8px'} mb="38px">
          <Flex w="full" h="20px" justify={'space-between'} align={'center'}>
            {type === 'list' ? (
              <Text
                color="text"
                fontSize={'23px'}
                fontWeight={600}
                className="gilda-display-regular"
              >
                Offers
              </Text>
            ) : type === 'payment_plan' ? (
              <HStack align={'center'}>
                <Icon
                  color={'text'}
                  as={BsArrowLeft}
                  fontSize={'25px'}
                  style={{cursor: 'pointer'}}
                  onClick={() => setType('list')}
                />
                <Text
                  color="text"
                  fontSize={'23px'}
                  fontWeight={600}
                  className="gilda-display-regular"
                >
                  Summary
                </Text>
              </HStack>
            ) : type === 'breakdown' ? (
              <HStack align={'center'}>
                <Icon
                  color={'text'}
                  as={BsArrowLeft}
                  fontSize={'25px'}
                  style={{cursor: 'pointer'}}
                  onClick={() => setType('payment_plan')}
                />
                <Text
                  color="text"
                  fontSize={'23px'}
                  fontWeight={600}
                  className="gilda-display-regular"
                >
                  Payment Breakdown
                </Text>
              </HStack>
            ) : (
              <HStack align={'center'}>
                <Icon
                  color={'text'}
                  as={BsArrowLeft}
                  fontSize={'25px'}
                  style={{cursor: 'pointer'}}
                  onClick={() => setType('payment_plan')}
                />
                <Text
                  color="text"
                  fontSize={'23px'}
                  fontWeight={600}
                  className="gilda-display-regular"
                >
                  Payment
                </Text>
              </HStack>
            )}
            <Icon
              color="text"
              as={RxCross1}
              style={{cursor: 'pointer'}}
              fontSize={'22px'}
              onClick={drawer?.onClose}
            />
          </Flex>
        </Box>
        {/* <Box w="full" borderBottom="1px solid" mb="21px" mt={'14px'} borderColor="shade" /> */}

        {type === 'list' ? (
          <TransactionsList
            assetData={assetData}
            drawer={drawer}
            isError={isError}
            isLoading={isLoading}
            type={type}
            setType={setType}
            asset={asset}
            setAsset={setAsset}
            customScrollbarStyles={customScrollbarStyles}
            setAmountToPay={setAmountToPay}
            amountToPay={amountToPay}
          />
        ) : type === 'payment_plan' ? (
          <SummaryDrawer
            assetData={assetData}
            drawer={drawer}
            isError={isError}
            isLoading={isLoading}
            type={type}
            setType={setType}
            asset={asset}
            setAsset={setAsset}
            customScrollbarStyles={customScrollbarStyles}
            setAmountToPay={setAmountToPay}
            amountToPay={amountToPay}
          />
        ) : type === 'breakdown' ? (
          <Breakdown
            assetData={assetData}
            drawer={drawer}
            isError={isError}
            isLoading={isLoading}
            type={type}
            setType={setType}
            asset={asset}
            setAsset={setAsset}
            customScrollbarStyles={customScrollbarStyles}
            setAmountToPay={setAmountToPay}
            amountToPay={amountToPay}
          />
        ) : (
          <PaymwntDrawer
            assetData={assetData}
            drawer={drawer}
            isError={isError}
            isLoading={isLoading}
            type={type}
            setType={setType}
            asset={asset}
            setAsset={setAsset}
            customScrollbarStyles={customScrollbarStyles}
            setAmountToPay={setAmountToPay}
            amount={amountToPay}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default PendingTransactions;
