import {useEffect, useState} from 'react';
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
import Summary from './summary';
import ConfirmValidate from './confirmValidate';
import Dispute from './dispute';
import {BsArrowLeft} from 'react-icons/bs';
import isMobile from '../../../utils/extras';
import AssetsList from './assetsList';
import {CloseIcon} from '@chakra-ui/icons';

const PendingTransactions = ({equitiesData, drawer, refetch, isLoading}) => {
  const [type, setType] = useState('list');
  const [equityData, setEquityData] = useState(null);

  useEffect(() => {
    setEquityData(equitiesData?.[0]);
  }, [equitiesData]);

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
  };

  const validationRequestArray = equityData?.validation_requests || [];
  const validation_requestsId = validationRequestArray?.[validationRequestArray?.length - 1]?.id;

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
        maxH={'821px'}
        bg="#FBFCFC"
        px="0"
      >
        <Box px="24px" pt={'8px'} mb="38px">
          <Flex w="full" h="20px" justify={'space-between'} align={'center'}>
            {type === 'dispute' || type === 'validate' ? (
              <HStack align={'center'}>
                <Icon
                  color="text"
                  as={BsArrowLeft}
                  fontSize={'25px'}
                  style={{cursor: 'pointer'}}
                  onClick={() => setType('summary')}
                />
                <Text
                  color="text"
                  fontSize={'23px'}
                  fontWeight={600}
                  className="gilda-display-regular"
                >
                  Dispute
                </Text>
              </HStack>
            ) : type === 'summary' ? (
              <HStack align={'center'}>
                <Icon
                  color="text"
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
                  Validate Transaction
                </Text>
              </HStack>
            ) : (
              <Text
                color="text"
                fontSize={'23px'}
                fontWeight={600}
                className="gilda-display-regular"
              >
                Validate Transaction
              </Text>
            )}
            <CloseIcon
              color="text"
              style={{cursor: 'pointer'}}
              fontSize={'18px'}
              onClick={drawer?.onClose}
            />
          </Flex>
        </Box>
        {/* <Box w="full" borderBottom="1px solid" borderColor={'shade'} mb="21px" mt={'14px'} /> */}

        {type === 'summary' ? (
          <Summary
            equityData={equityData}
            setType={setType}
            customScrollbarStyles={customScrollbarStyles}
          />
        ) : type === 'validate' ? (
          <ConfirmValidate
            refetch={refetch}
            validation_requestsId={validation_requestsId}
            equityData={equityData}
            setType={setType}
            customScrollbarStyles={customScrollbarStyles}
          />
        ) : type === 'dispute' ? (
          <Dispute
            drawer={drawer}
            validation_requestsId={validation_requestsId}
            equityData={equityData}
            setType={setType}
            customScrollbarStyles={customScrollbarStyles}
          />
        ) : (
          <AssetsList
            equitiesData={equitiesData}
            equityData={equityData}
            setEquityData={setEquityData}
            isLoading={isLoading}
            drawer={drawer}
            validation_requestsId={validation_requestsId}
            setType={setType}
            customScrollbarStyles={customScrollbarStyles}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default PendingTransactions;
