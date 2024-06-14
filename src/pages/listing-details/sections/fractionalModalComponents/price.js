import React, {useEffect, useState} from 'react';
import {
  ModalContent,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  Box,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Image,
  VStack,
  Input,
  DrawerCloseButton,
} from '@chakra-ui/react';
import {Button} from '../../../../ui-lib';
import isMobile from '../../../../utils/extras';
import {CloseIcon} from '@chakra-ui/icons';
import {formatToCurrency} from '../../../../utils';
import FractionalDetailsMobile from './fractionalDetailsMobile';

const Price = ({
  fractionalData,
  onCloseModal,
  fractionalModal,
  fractions,
  setFractions,
  setStep,
}) => {
  const [error, setError] = useState('');
  const unitData = fractionalData?.fraction_data?.unit;
  const fractionalPercent = (
    (Number(unitData?.total_purchased_fractions) / Number(unitData?.total_fractions)) *
    100
  ).toFixed(2);
  const leftFractions =
    Number(unitData?.total_fractions) - Number(unitData?.total_purchased_fractions);

  const handleFractionInput = e => {
    setError('');
    const value = e.target.value;
    if (value > leftFractions)
      setError('Apologies, but you cannot purchase more fractions than are currently available.');
    setFractions(value);
  };
  const [screenWidth, setScreenWidth] = useState();

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  const mainContent = (
    <Box w="full">
      <Flex gap="20px">
        <Image w="170px" h="167px" src={unitData?.photos?.[0]?.photo} />
        <Box w="full">
          <Flex justify={'space-between'} w="full" align={'center'}>
            <Text className="gilda-display-regular" fontSize={'23px'}>
              {unitData?.project?.name}
            </Text>
            <CloseIcon cursor={'pointer'} onClick={fractionalModal?.onClose} />
          </Flex>
          <Text fontSize={'13px'} fontWeight={500} color="#949494">
            Price Per Fraction
          </Text>
          <Text fontSize={'33px'} className="gilda-display-regular" color="#191919">
            {formatToCurrency(unitData?.price_per_fraction)}
          </Text>

          <Box
            w="full"
            bg="#FBFCFC"
            border="0.2px solid #E4E4E4"
            borderRadius={'5px'}
            px="10px"
            pb="9px"
          >
            <Box
              mt="39px"
              bg="#19191933"
              w="full"
              h="10px"
              borderRadius={'full'}
              position={'relative'}
            >
              <Box
                position={'absolute'}
                h="20px"
                w="2px"
                bg="primary"
                left={`${fractionalPercent}%`}
                top="-5px"
              />
              <Text
                position={'absolute'}
                color="primary"
                left={`${fractionalPercent}%`}
                top="-30px"
              >
                {`${fractionalPercent}%`}
              </Text>
              <Box w={`${fractionalPercent}%`} h="full" bg="primary" borderRadius={'full'} />
            </Box>
            <HStack w="full" align="center" justify={'space-between'} mt="10px" px="4px">
              <Text fontSize={'11px'} fontWeight={400} color="#191919">
                {unitData?.total_purchased_fractions} fractions sold
              </Text>
              <Text fontSize={'11px'} fontWeight={400} color="#191919">
                {leftFractions} fractions left
              </Text>
            </HStack>
          </Box>
        </Box>
      </Flex>

      <HStack w="full" justify={'space-between'} mt="30px">
        <VStack>
          <Text fontSize={'13px'} fontWeight={500} color="#606060">
            Unit Type
          </Text>
          <Text fontSize={'19px'} fontWeight={500} color="#191919" textTransform="capitalize">
            {fractionalData?.extra_info?.deal_structure || '-'}
          </Text>
        </VStack>
        <VStack>
          <Text fontSize={'13px'} fontWeight={500} color="#606060">
            Dividend Payout Type
          </Text>
          <Text fontSize={'19px'} fontWeight={500} color="#191919" textTransform="capitalize">
            {fractionalData?.extra_info?.dividend_payout || '-'}
          </Text>
        </VStack>
        <VStack>
          <Text fontSize={'13px'} fontWeight={500} color="#606060">
            Dividend Payout Amount
          </Text>
          <Text fontSize={'19px'} fontWeight={500} color="#191919" textTransform="capitalize">
            {fractionalData?.extra_info?.dividend_amount
              ? formatToCurrency(fractionalData?.extra_info?.dividend_amount)
              : '-'}
          </Text>
        </VStack>
        <VStack>
          <Text fontSize={'13px'} fontWeight={500} color="#606060">
            No of Stakeholders
          </Text>
          <Text fontSize={'19px'} fontWeight={500} color="#191919" textTransform="capitalize">
            {fractionalData?.partners?.length || '-'}
          </Text>
        </VStack>
        <VStack>
          <Text fontSize={'13px'} fontWeight={500} color="#606060">
            Holding Period
          </Text>
          <Text fontSize={'19px'} fontWeight={500} color="#191919" textTransform="capitalize">
            {unitData?.holding_period || '-'}
          </Text>
        </VStack>
        <VStack>
          <Text fontSize={'13px'} fontWeight={500} color="#606060">
            Investor&apos;s Packet
          </Text>
          <Text
            fontSize={'19px'}
            fontWeight={500}
            color="primary"
            cursor={'pointer'}
            onClick={() =>
              window.open(
                `${
                  fractionalData?.packets?.[0]?.packet ? fractionalData?.packets?.[0]?.packet : ''
                }`,
                '_blank'
              )
            }
          >
            View
          </Text>
        </VStack>
      </HStack>

      <VStack align={'stretch'} mt="43px" w="full" spacing={'15px'}>
        <Text fontSize={'16px'} fontWeight={400} color="#191919">
          How many fraction would you like to purchase?
        </Text>
        <Flex gap="8px" w="full">
          <Input
            value={fractions}
            onChange={handleFractionInput}
            borderRadius={0}
            border="1px solid #E4E4E4 !important"
            h="48px"
            w="70%"
            type="number"
            placeholder="0"
          />
          <Button
            h="48px"
            w="30%"
            bg={'primary'}
            isDisabled={error || !Boolean(Number(fractions))}
            onClick={() => setStep('payment')}
          >
            Proceed to payment
          </Button>
        </Flex>
        {error ? (
          <Text fontSize={'16px'} fontWeight={400} color="red">
            {error}
          </Text>
        ) : (
          <Flex justify={'space-between'} w="full">
            <Text fontSize={'16px'} fontWeight={400} color="#191919">
              Total Price
            </Text>
            <Text fontSize={'16px'} fontWeight={400} color="#191919">
              {formatToCurrency(fractions * unitData?.price_per_fraction)}
            </Text>
          </Flex>
        )}
      </VStack>
    </Box>
  );

  return (
    <>
      {screenWidth < 768 ? (
        <Drawer
          autoFocus={false}
          blockScrollOnMount
          onCloseComplete={onCloseModal}
          isCentered
          onClose={fractionalModal?.onClose}
          isOpen={fractionalModal?.isOpen}
          placement="bottom"
        >
          <DrawerOverlay />
          <DrawerContent
            // bg="card_bg"
            maxW="full"
            w="full"
            h="full"
            maxH="80vh"
            // px={{base: '18px', md: '35px'}}
            // py={{base: '18px', md: '30px'}}
          >
            <DrawerCloseButton />
            {/* {mobileContent} */}
            <FractionalDetailsMobile
              setStep={setStep}
              // setAmountToPay={setAmountToPay}
              fractionalModal={fractionalModal}
              fractionalData={fractionalData}
              onCloseModal={onCloseModal}
              fractions={fractions}
              setFractions={setFractions}
            />
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          autoFocus={false}
          blockScrollOnMount
          onCloseComplete={onCloseModal}
          isCentered
          onClose={fractionalModal?.onClose}
          isOpen={fractionalModal?.isOpen}
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            maxW="953px"
            px={{base: '18px', md: '50px'}}
            py={{base: '18px', md: '40px'}}
            borderRadius={0}
          >
            {mainContent}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Price;
