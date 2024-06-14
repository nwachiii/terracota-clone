import {useState} from 'react';
import TransactionsList from './TransactionsList';
import SummaryDrawer from './Summary';
import PaymentDrawer from './payment';
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
import Breakdown from './Breakdown';
import CoOwnSummary from './CoOwnSummary';
import CoOwnersList from './CoOwnersList';
import {useQuery} from 'react-query';
import {fetchListOfCoowners} from '../../../api/co_owners';
import {LoggedinUser} from '../../../constants/routes';
import {ChevronLeftIcon, CloseIcon} from '@chakra-ui/icons';

const PendingTransactions = ({assetData, drawer, isError, isLoading}) => {
  const [type, setType] = useState('list');
  const [asset, setAsset] = useState(null);
  const [amount, setAmountToPay] = useState('');

  const {data, isLoading: coOwnerLoading} = useQuery(
    ['coowners', asset?.id],
    () => fetchListOfCoowners(asset?.id),
    {enabled: !!asset?.id}
  );

  const coowners = data?.data?.data ?? [];
  const theHost = coowners?.length
    ? coowners.find(item => item?.host?.id === item?.invitee?.id)
    : null;
  const isTheHost = coowners?.length
    ? coowners.find(item => item?.host?.id == LoggedinUser?.user?.id)
    : null;

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

  const handleBackFromBreakdown = () => {
    if (asset?.co_owners?.length) setType('coOwn');
    else setType('summary');
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
        maxW={'500px'}
        bg="#FBFCFC"
        px="0"
        position={'relative'}
      >
        <Box
          px="14px"
          py={'18px'}
          mb="38px"
          position={'absolute'}
          top="0"
          bg="white"
          right={0}
          w="full"
          zIndex={200}
        >
          <Flex w="full" h="20px" justify={'space-between'} align={'center'}>
            {type === 'list' ? (
              <Text
                color="text"
                fontSize={'23px'}
                fontWeight={400}
                className="gilda-display-regular"
              >
                Pending Transaction
              </Text>
            ) : type === 'breakdown' ? (
              <HStack align={'center'}>
                <ChevronLeftIcon
                  cursor={'pointer'}
                  onClick={handleBackFromBreakdown}
                  fontSize={'35px'}
                  color={'text'}
                />
                <Text
                  color="text"
                  fontSize={'23px'}
                  fontWeight={400}
                  className="gilda-display-regular"
                >
                  Payment Breakdown
                </Text>
              </HStack>
            ) : type === 'coOwnersList' ? (
              <HStack align={'center'}>
                <ChevronLeftIcon
                  cursor={'pointer'}
                  onClick={() => setType('coOwn')}
                  fontSize={'35px'}
                  color={'text'}
                />
                <Text
                  color="text"
                  fontSize={'23px'}
                  fontWeight={400}
                  className="gilda-display-regular"
                >
                  Co-owners {asset?.offer_started ? '(payment)' : '(acceptance)'}
                </Text>
              </HStack>
            ) : type === 'summary' || type === 'coOwn' ? (
              <HStack align={'center'}>
                <ChevronLeftIcon
                  cursor={'pointer'}
                  onClick={() => setType('list')}
                  fontSize={'35px'}
                  color={'text'}
                />
                <Text
                  color="text"
                  fontSize={'23px'}
                  fontWeight={400}
                  className="gilda-display-regular"
                >
                  Summary
                </Text>
              </HStack>
            ) : (
              <HStack align={'center'}>
                <ChevronLeftIcon
                  cursor={'pointer'}
                  onClick={() => setType('list')}
                  fontSize={'35px'}
                  color={'text'}
                />
                <Text
                  color="text"
                  fontSize={'23px'}
                  fontWeight={400}
                  className="gilda-display-regular"
                >
                  Payment Method
                </Text>
              </HStack>
            )}
            <CloseIcon
              cursor={'pointer'}
              fontSize={'14px'}
              color="text"
              onClick={drawer?.onClose}
            />
          </Flex>
        </Box>
        {/* <Box w="full" borderBottom="1px solid" borderColor={'shade'} mb="21px" mt={'14px'} /> */}

        <Box minH="45vh" maxH="65vh" pt="68px" w="full" h={'fit-content'} overflowY={'scroll'}>
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
              amount={amount}
              coowners={coowners}
              coOwnerLoading={coOwnerLoading}
            />
          ) : type === 'summary' ? (
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
              amount={amount}
              coowners={coowners}
              coOwnerLoading={coOwnerLoading}
            />
          ) : type === 'coOwn' ? (
            <CoOwnSummary
              isTheHost={isTheHost}
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
              amount={amount}
              coowners={coowners}
              coOwnerLoading={coOwnerLoading}
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
              amountToPay={amount}
              coowners={coowners}
              coOwnerLoading={coOwnerLoading}
            />
          ) : type === 'coOwnersList' ? (
            <CoOwnersList
              theHost={theHost}
              isTheHost={isTheHost}
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
              amountToPay={amount}
              coowners={coowners}
              coOwnerLoading={coOwnerLoading}
            />
          ) : (
            <PaymentDrawer
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
              amount={amount}
              coowners={coowners}
              coOwnerLoading={coOwnerLoading}
            />
          )}
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default PendingTransactions;
