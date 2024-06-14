import React, {useEffect, useRef} from 'react';
import {
  ModalContent,
  Flex,
  Box,
  Text,
  VStack,
  Center,
  Modal,
  ModalOverlay,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import {ArrowBackIcon, ArrowForwardIcon, CloseIcon} from '@chakra-ui/icons';
import {formatToCurrency} from '../../../../utils';
import Carousel from 'react-elastic-carousel';
import {CustomizableButton, Spinner} from '../../../../ui-lib';
import isMobile from '../../../../utils/extras';

const Plan = ({
  PAYMENT_PLAN_DATA,
  planLoading,
  onCloseModal,
  setSelectedPlan,
  selectedPlan,
  setStep,
  buyModal,
}) => {
  const carouselRef = useRef();

  useEffect(() => {
    if (PAYMENT_PLAN_DATA?.length === 1) {
      setSelectedPlan(PAYMENT_PLAN_DATA[0]);
      setStep('terms');
    }
  }, [PAYMENT_PLAN_DATA]);

  const breakPoint = [
    {
      width: 1,
      itemsToShow: 2,
    },
  ];

  const mainContent = (
    <Box w="full">
      <Flex direction="row" justify="space-between" align={'center'} mb="15px">
        <Text
          fontSize={{base: '23px', md: '25px'}}
          fontWeight={400}
          color="text"
          className="gilda-display-regular"
        >
          Payment Plans
        </Text>
        <CloseIcon
          fontWeight={600}
          alignSelf={'flex-start'}
          fontSize={'13px'}
          style={{color: '#667085', cursor: 'pointer'}}
          onClick={buyModal?.onClose}
        />
      </Flex>
      {planLoading ? (
        <Spinner />
      ) : (
        <Carousel
          ref={carouselRef}
          breakPoints={breakPoint}
          pagination={false}
          verticalMode
          // isRTL
          showArrows={false}
        >
          {PAYMENT_PLAN_DATA?.map((item, i) => (
            <Box w="full" h={{base: '170px', md: '180px'}} my={{base: '4px', md: '8px'}}>
              <VStack
                bg="#FBFCFC"
                px="12px"
                align={'stretch'}
                gap={'12px'}
                border={'2px solid'}
                cursor="pointer"
                borderColor={'shade'}
                key={i}
                w="full"
                h="full"
                onClick={() => {
                  setSelectedPlan(item);
                  setStep('terms');
                }}
                py="24px"
              >
                <Text
                  className="gilda-display-regular"
                  textAlign={'center'}
                  color="text"
                  fontWeight={400}
                  fontSize={{base: '28px', md: '28px'}}
                >
                  {item?.payment_period_in_months} Months
                </Text>
                <Box borderBottom={'1px solid #E4E4E4'} />
                <HStack justify={'space-between'} align={'center'}>
                  <Flex direction={'column'} w="32%" align={'flex-start'}>
                    <Text color="#606060" fontWeight={500} fontSize={'13px'}>
                      Purchase Price
                    </Text>
                    <Text color="#191919" fontWeight={600} fontSize={'11px'}>
                      {formatToCurrency(item?.purchase_price)}
                    </Text>
                  </Flex>
                  <Flex direction={'column'} w="32%" align={'flex-start'}>
                    <Text color="#606060" fontWeight={500} fontSize={'13px'}>
                      Initial Deposit
                    </Text>
                    <Text color="#191919" fontWeight={600} fontSize={'11px'}>
                      {formatToCurrency(item?.initial_deposit_in_value)}
                    </Text>
                  </Flex>
                  {item?.plan_type === 'manual' && item?.payment_frequency !== 'flexible' ? (
                    <Flex direction={'column'} w="32%" align={'flex-start'}>
                      <Text color="#606060" fontWeight={500} fontSize={'13px'}>
                        {item?.payment_frequency
                          ? item?.payment_frequency?.charAt(0).toUpperCase() +
                            item?.payment_frequency?.slice(1) +
                            ' Payment'
                          : 'Periodic Payment'}
                      </Text>
                      <Text color="#191919" fontWeight={600} fontSize={'11px'}>
                        {formatToCurrency(item?.periodic_payment)}
                      </Text>
                    </Flex>
                  ) : (
                    <Box w="30%" />
                  )}
                </HStack>
              </VStack>
            </Box>
          ))}
        </Carousel>
      )}

      {PAYMENT_PLAN_DATA?.length > 2 && (
        <HStack spacing={'15px'} justify={'flex-end'} mt="12px">
          <Center
            cursor={'pointer'}
            onClick={() => carouselRef.current?.slidePrev()}
            h="36px"
            w="36px"
            borderRadius={'full'}
            border="1px solid"
            borderColor={'shade'}
            bg="transparent"
          >
            <ArrowBackIcon color="#191919" fontWeight={700} />
          </Center>

          <Center
            cursor={'pointer'}
            onClick={() => carouselRef.current?.slideNext()}
            h="36px"
            w="36px"
            borderRadius={'full'}
            border="1px solid"
            borderColor={'shade'}
            bg="transparent"
          >
            <ArrowForwardIcon color="#191919" fontWeight={700} />
          </Center>
        </HStack>
      )}
    </Box>
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
            maxW={'998px'}
            px={{base: '18px', md: '35px'}}
            minH="383px"
            py={{base: '24px', md: '42px'}}
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
            maxW={'437px'}
            px={{base: '18px', md: '24px'}}
            h="fit-content"
            py={{base: '24px', md: '28px'}}
            borderRadius={0}
          >
            {mainContent}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Plan;
