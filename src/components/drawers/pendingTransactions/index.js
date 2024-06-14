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
        p="16px"
        maxW={'500px'}
        maxH={'711px'}
        bg="#FBFCFC"
        px="0"
      >
        <Box px="24px" pt={'8px'}>
          <Flex w="full" h="20px" justify={'space-between'} align={'center'}>
            {type === 'list' ? (
              <Text
                color="text"
                fontSize={'23px'}
                fontWeight={600}
                className="gilda-display-regular"
              >
                Pending Transaction
              </Text>
            ) : type === 'breakdown' ? (
              <HStack align={'center'}>
                <Icon
                  color="text"
                  as={BsArrowLeft}
                  fontSize={'27px'}
                  style={{cursor: 'pointer'}}
                  onClick={handleBackFromBreakdown}
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
            ) : type === 'coOwnersList' ? (
              <HStack align={'center'}>
                <Icon
                  color="text"
                  as={BsArrowLeft}
                  fontSize={'27px'}
                  style={{cursor: 'pointer'}}
                  onClick={() => setType('coOwn')}
                />
                <Text
                  color="text"
                  fontSize={'23px'}
                  fontWeight={600}
                  className="gilda-display-regular"
                >
                  Co-owners {asset?.offer_started ? '(payment)' : '(acceptance)'}
                </Text>
              </HStack>
            ) : type === 'summary' || type === 'coOwn' ? (
              <HStack align={'center'}>
                <Icon
                  color="text"
                  as={BsArrowLeft}
                  fontSize={'27px'}
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
            ) : (
              <HStack align={'center'}>
                <Icon
                  color="text"
                  as={BsArrowLeft}
                  fontSize={'27px'}
                  style={{cursor: 'pointer'}}
                  onClick={() => setType('list')}
                />
                <Text
                  color="text"
                  fontSize={'23px'}
                  fontWeight={600}
                  className="gilda-display-regular"
                >
                  Payment Method
                </Text>
              </HStack>
            )}
            <Icon
              as={RxCross1}
              style={{cursor: 'pointer'}}
              fontSize={22}
              color="text"
              onClick={drawer?.onClose}
            />
          </Flex>
        </Box>
        <Box w="full" borderBottom="1px solid" borderColor={'shade'} mb="21px" mt={'14px'} />

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
      </DrawerContent>
    </Drawer>
  );
};

export default PendingTransactions;
