import React from 'react';
import {
  Flex,
  Box,
  Text,
  VStack,
  Divider,
  Image,
  HStack,
  Icon,
  useToast,
  Center,
} from '@chakra-ui/react';
import {Button, CustomizableButton, Spinner} from '../../../ui-lib';
import {formatToCurrency} from '../../../utils';
import {BiCaretRight} from 'react-icons/bi';
import {useQuery} from 'react-query';
import {fetchInvestorPackets} from '../../../api/payment';
import ThreeDots from '../../loaders/ThreeDots';
import {formatDateToString} from '../../../utils/formatDate';
import {calculateSharedValue} from '../../../utils/calculateFee';
import {LoggedinUser} from '../../../constants/routes';
import orangeAlertIcon from '../../../images/icons/orange-alert-icon.svg';
import FirstDepositProgress from './firstDepositProgress';
import {fetchIndividualCoOwnershipData} from '../../../api/co_owners';

const CoOwnSummary = ({
  asset,
  setType,
  coowners,
  coOwnerLoading,
  customScrollbarStyles,
  isTheHost,
  setAmountToPay,
}) => {
  const toast = useToast();
  const HOME__OWNERS__PACKETS = useQuery(['fetchInvestorPackets', asset?.id], () =>
    fetchInvestorPackets(asset?.id)
  );
  const packet =
    HOME__OWNERS__PACKETS?.data?.data?.received?.length &&
    HOME__OWNERS__PACKETS?.data?.data?.received[0];
  const coownerInfo = coowners?.length
    ? coowners.find(item => item?.invitee?.id == LoggedinUser?.user?.id)
    : null;
  const sharedUnitPrice = calculateSharedValue(asset?.total_unit_price, coownerInfo?.equity_value);
  const sharedInitialDeposit = calculateSharedValue(
    asset?.payment_plan?.initial_deposit_in_value,
    coownerInfo?.equity_value
  );

  const loggedInCoownerInfo = useQuery(['coownerInfo', LoggedinUser?.user?.id, asset?.id], () =>
    fetchIndividualCoOwnershipData(asset?.id, LoggedinUser?.user?.id)
  );
  const loggedInCoownerData = loggedInCoownerInfo?.data?.data;

  const paymentPlanIndividualPercentage =
    (Number(loggedInCoownerData?.user_amount_paid) /
      Number(asset?.payment_plan?.initial_deposit_in_value)) *
    100;
  const paymentPlanGroupPercentage =
    (Number(asset?.amount_paid) / Number(asset?.payment_plan?.initial_deposit_in_value)) * 100;
  const outrightIndividualPercentage =
    (Number(loggedInCoownerData?.user_amount_paid) / Number(asset?.total_unit_price)) * 100;
  const outrightGroupPercentage =
    (Number(asset?.amount_paid) / Number(asset?.total_unit_price)) * 100;

  const toaster = msg =>
    toast({
      description: msg,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });

  const handleProceed = () => {
    if (!asset?.offer_started && asset?.owner?.id !== LoggedinUser?.user?.id) {
      toaster(`Before you can proceed, the Host needs to initialize a payment.`);
    } else if (!asset?.all_invitees_accepted) {
      toaster(
        'Before starting the payment process, all invitees are expected to respond to the invite'
      );
    } else {
      setAmountToPay(asset?.payment_plan ? sharedInitialDeposit : sharedUnitPrice);
      setType('payment');
    }
  };

  return (
    <Box px="24px" pb="38px" h={'fit-content'} overflowY={'scroll'} __css={customScrollbarStyles}>
      {coOwnerLoading ? (
        <Center w="full" h="full">
          <Spinner noAbsolute />
        </Center>
      ) : asset?.payment_plan ? (
        <Box w="full">
          {asset?.offer_started ? (
            <HStack
              mb="10px"
              align="start"
              spacing="7.42px"
              p="10px"
              w="full"
              borderRadius="7.42px"
              border="0.5px solid #F57403"
              bg="rgba(245, 116, 3, 0.10)"
            >
              <Image src={orangeAlertIcon.src} alt="orange alert icon" />
              <Text color="text" mt="-2px" fontSize="11.448px" fontWeight="300">
                The payment made is still below the required initial deposit If the payment is not
                made by other co-owners before the exp. date or in the event of a price change, the
                amount already paid will be refunded.
              </Text>
            </HStack>
          ) : null}

          <Text
            fontWeight={500}
            fontSize={'22px'}
            color={'text'}
            mb="15px"
            className="gilda-display-regular"
          >
            {asset?.project?.name}
          </Text>
          {/* <Image h='195px' w='full' src={asset?.project?.photos[0]?.photo} /> */}

          {asset?.offer_started ? (
            <>
              <Flex
                mt="20px"
                h="130px"
                w="full"
                border="1px solid"
                borderColor={'shade'}
                bg="card_bg"
                align={'center'}
                justify={'center'}
                direction="column"
                px="10px"
              >
                <Text
                  color="text"
                  fontSize={{base: '14px', md: '18px'}}
                  fontWeight={400}
                  className="montserrat-regular"
                >
                  {`Total${asset?.payment_plan ? ' Initial Deposit' : ''} Paid`}
                </Text>
                <Text
                  color="text"
                  fontSize={{base: '28px', md: '34px'}}
                  fontWeight={500}
                  className="gilda-display-regular"
                >
                  {formatToCurrency(asset?.amount_paid)}
                </Text>

                <Flex
                  px="10px"
                  alignSelf={'flex-end'}
                  w="full"
                  justify={'space-between'}
                  align={'flex-end'}
                >
                  <Text fontSize={'11px'} fontWeight={400}>
                    Group progress
                  </Text>
                  <Text fontSize={'11px'} fontWeight={400}>
                    {paymentPlanGroupPercentage}%
                  </Text>
                </Flex>
                <Box bg="fill" w="full" h="5.4px" borderRadius={'full'} mt="4px" p="0">
                  <Box
                    h="5.4px"
                    w={`${paymentPlanGroupPercentage}%`}
                    borderRadius={'full'}
                    bg="text"
                  />
                </Box>
              </Flex>

              <Flex
                mt="20px"
                h="130px"
                w="full"
                border="1px solid"
                borderColor={'shade'}
                bg="card_bg"
                align={'center'}
                justify={'center'}
                direction="column"
                px="10px"
              >
                <Text
                  color="text"
                  fontSize={{base: '14px', md: '18px'}}
                  fontWeight={400}
                  className="montserrat-regular"
                >
                  {`Total${asset?.payment_plan ? ' Initial Deposit' : ''} Paid`}
                </Text>
                <Text
                  color="text"
                  fontSize={{base: '28px', md: '34px'}}
                  fontWeight={500}
                  className="gilda-display-regular"
                >
                  {formatToCurrency(loggedInCoownerData?.user_amount_paid)}
                </Text>

                <Flex alignSelf={'flex-end'} w="full" justify={'space-between'} align={'flex-end'}>
                  <Text fontSize={'11px'} fontWeight={400}>
                    Individual Payment
                  </Text>
                  <Text fontSize={'11px'} fontWeight={400}>
                    {paymentPlanIndividualPercentage}%
                  </Text>
                </Flex>
                <Box bg="fill" w="full" h="5.4px" borderRadius={'full'} mt="4px" p="0">
                  <Box
                    h="5.4px"
                    w={`${paymentPlanIndividualPercentage}%`}
                    borderRadius={'full'}
                    bg="text"
                  />
                </Box>
              </Flex>
            </>
          ) : (
            <>
              <Flex
                mt="20px"
                h="130px"
                w="full"
                border="1px solid"
                borderColor={'shade'}
                bg="card_bg"
                align={'center'}
                justify={'center'}
                direction="column"
              >
                <Text
                  color="text"
                  fontSize={{base: '14px', md: '18px'}}
                  fontWeight={400}
                  className="montserrat-regular"
                >
                  Initial deposit
                </Text>
                <Text
                  color="text"
                  fontSize={{base: '28px', md: '34px'}}
                  fontWeight={500}
                  className="gilda-display-regular"
                >
                  {formatToCurrency(asset?.payment_plan?.initial_deposit_in_value)}
                </Text>
              </Flex>

              <Flex
                mt="20px"
                h="130px"
                w="full"
                border="1px solid"
                borderColor={'shade'}
                bg="card_bg"
                align={'center'}
                justify={'center'}
                direction="column"
              >
                <Text
                  color="text"
                  fontSize={{base: '14px', md: '18px'}}
                  fontWeight={400}
                  className="montserrat-regular"
                >
                  Shared Initial Deposit
                </Text>
                <Text
                  color="text"
                  fontSize={{base: '28px', md: '34px'}}
                  fontWeight={500}
                  className="gilda-display-regular"
                >
                  {formatToCurrency(sharedInitialDeposit)}
                </Text>
              </Flex>
            </>
          )}

          <VStack
            align={'stretch'}
            mt="20px"
            spacing={'24px'}
            fontWeight={500}
            className="montserrat-regular"
          >
            <Flex justify={'space-between'} align={'center'}>
              <Text color="#606060" fontSize={'12px'}>
                Split Ownership
              </Text>
              <Text color="#191919" fontSize={'13px'}>{`${
                coownerInfo?.equity_value ?? '-'
              }%`}</Text>
            </Flex>
            <Flex justify={'space-between'} align={'center'}>
              <Text color="#606060" fontSize={'12px'}>
                Unit Size
              </Text>
              <Text color="#191919" fontSize={'13px'}>{`${asset?.unit?.unit_size}sqm`}</Text>
            </Flex>
            <Flex justify={'space-between'} align={'center'}>
              <Text color="#606060" fontSize={'12px'}>
                Unit Type
              </Text>
              <Text color="#191919" fontSize={'13px'}>
                {asset?.unit?.unit_title ?? '-'}
              </Text>
            </Flex>
            <Flex justify={'space-between'} align={'center'}>
              <Text color="#606060" fontSize={'12px'}>
                Purchase Agreement
              </Text>
              {HOME__OWNERS__PACKETS?.isLoading ? (
                <ThreeDots />
              ) : (
                <a rel="noreferrer" target="_blank" href={packet?.packet}>
                  <CustomizableButton
                    border="1px solid"
                    h="22px"
                    w="50px"
                    bg="transparent"
                    borderColor="text"
                  >
                    <Text color={'text'} fontWeight={300} fontSize={'12px'}>
                      View
                    </Text>
                  </CustomizableButton>
                </a>
              )}
            </Flex>
            <Flex justify={'space-between'} align={'center'}>
              <Text color="#606060" fontSize={'12px'}>
                Offer Date
              </Text>
              <Text color="#191919" fontSize={'13px'}>
                {formatDateToString(asset?.created_at)}
              </Text>
            </Flex>
            <Flex justify={'space-between'} align={'center'}>
              <Text color="#606060" fontSize={'12px'}>
                Offer Expiration Date
              </Text>
              <Text color="#191919" fontSize={'13px'}>
                {formatDateToString(asset?.offer_expires)}
              </Text>
            </Flex>

            {isTheHost && (
              <Flex justify={'space-between'} align={'center'}>
                <Text color="#606060" fontSize={'12px'}>
                  Co-owners
                </Text>
                <CustomizableButton
                  border="1px solid"
                  h="22px"
                  w="50px"
                  bg="transparent"
                  borderColor="text"
                  onClick={() => setType('coOwnersList')}
                >
                  <Text color={'text'} fontWeight={300} fontSize={'12px'}>
                    View
                  </Text>
                </CustomizableButton>
              </Flex>
            )}
          </VStack>

          {asset?.payment_plan?.plan_type === 'custom' && (
            <Flex
              mt="8px"
              py="12px"
              px="16px"
              align={'center'}
              justify={'space-between'}
              borderRadius={'2px'}
              cursor={'pointer'}
              border="1px solid #E4E4E4"
              onClick={() => setType('breakdown')}
            >
              <Text color="#0D0D0D" fontSize={'14px'} fontWeight={400}>
                Payment Breakdown
              </Text>
              <HStack align={'center'} justify={'center'} spacing={0}>
                <Text color="#0D0D0D" fontSize={'14px'} fontWeight={500}>
                  View
                </Text>
                <Icon as={BiCaretRight} color="text" fontSize={'25px'} />
              </HStack>
            </Flex>
          )}

          <Button w="full" mt="30px" bg="primary" color="white" onClick={handleProceed}>
            Proceed to Payment
          </Button>
        </Box>
      ) : (
        <Box w="full">
          <Text
            fontWeight={500}
            fontSize={'15px'}
            color={'text'}
            mb="15px"
            className="gilda-display-regular"
          >
            {asset?.project?.name}
          </Text>
          {/* <Image h="195px" w="full" src={asset?.project?.photos[0]?.photo} /> */}

          {asset?.offer_started ? (
            <>
              <Flex
                mt="20px"
                h="130px"
                w="full"
                border="1px solid"
                borderColor={'shade'}
                bg="card_bg"
                align={'center'}
                justify={'center'}
                direction="column"
                px="10px"
              >
                <Text
                  color="text"
                  fontSize={{base: '14px', md: '18px'}}
                  fontWeight={400}
                  className="montserrat-regular"
                >
                  {`Total${asset?.payment_plan ? ' Initial Deposit' : ''} Paid`}
                </Text>
                <Text
                  color="text"
                  fontSize={{base: '28px', md: '34px'}}
                  fontWeight={500}
                  className="gilda-display-regular"
                >
                  {formatToCurrency(asset?.amount_paid)}
                </Text>

                <Flex alignSelf={'flex-end'} w="full" justify={'space-between'} align={'flex-end'}>
                  <Text fontSize={'11px'} fontWeight={400}>
                    Group progress
                  </Text>
                  <Text fontSize={'11px'} fontWeight={400}>
                    {outrightGroupPercentage}%
                  </Text>
                </Flex>
                <Box bg="fill" w="full" h="5.4px" borderRadius={'full'} mt="4px" p="0">
                  <Box
                    h="5.4px"
                    w={`${outrightGroupPercentage}%`}
                    borderRadius={'full'}
                    bg="text"
                  />
                </Box>
              </Flex>

              <Flex
                mt="20px"
                h="130px"
                w="full"
                border="1px solid"
                borderColor={'shade'}
                bg="card_bg"
                align={'center'}
                justify={'center'}
                direction="column"
                px="10px"
              >
                <Text
                  color="text"
                  fontSize={{base: '14px', md: '18px'}}
                  fontWeight={400}
                  className="montserrat-regular"
                >
                  {`Total${asset?.payment_plan ? ' Initial Deposit' : ''} Paid`}
                </Text>
                <Text
                  color="text"
                  fontSize={{base: '28px', md: '34px'}}
                  fontWeight={500}
                  className="gilda-display-regular"
                >
                  {formatToCurrency(loggedInCoownerData?.user_amount_paid)}
                </Text>

                <Flex alignSelf={'flex-end'} w="full" justify={'space-between'} align={'flex-end'}>
                  <Text fontSize={'11px'} fontWeight={400}>
                    Individual Payment
                  </Text>
                  <Text fontSize={'11px'} fontWeight={400}>
                    {outrightIndividualPercentage}%
                  </Text>
                </Flex>
                <Box bg="fill" w="full" h="5.4px" borderRadius={'full'} mt="4px" p="0">
                  <Box
                    h="5.4px"
                    w={`${outrightIndividualPercentage}%`}
                    borderRadius={'full'}
                    bg="text"
                  />
                </Box>
              </Flex>
            </>
          ) : (
            <>
              <Flex
                mt="20px"
                h="130px"
                w="full"
                border="1px solid"
                borderColor={'shade'}
                bg="card_bg"
                align={'center'}
                justify={'center'}
                direction="column"
              >
                <Text
                  color="text"
                  fontSize={{base: '14px', md: '18px'}}
                  fontWeight={400}
                  className="montserrat-regular"
                >
                  Total unit price
                </Text>
                <Text
                  color="text"
                  fontSize={{base: '28px', md: '34px'}}
                  fontWeight={500}
                  className="gilda-display-regular"
                >
                  {formatToCurrency(asset?.total_unit_price)}
                </Text>
              </Flex>

              <Flex
                mt="20px"
                h="130px"
                w="full"
                border="1px solid"
                borderColor={'shade'}
                bg="card_bg"
                align={'center'}
                justify={'center'}
                direction="column"
              >
                <Text
                  color="text"
                  fontSize={{base: '14px', md: '18px'}}
                  fontWeight={400}
                  className="montserrat-regular"
                >
                  Shared Unit price
                </Text>
                <Text
                  color="text"
                  fontSize={{base: '28px', md: '34px'}}
                  fontWeight={500}
                  className="gilda-display-regular"
                >
                  {formatToCurrency(sharedUnitPrice)}
                </Text>
              </Flex>
            </>
          )}

          <VStack
            align={'stretch'}
            mt="20px"
            spacing={'24px'}
            fontWeight={500}
            className="montserrat-regular"
          >
            <Flex justify={'space-between'} align={'center'}>
              <Text color="#606060" fontSize={'12px'}>
                Split Ownership
              </Text>
              <Text color="#191919" fontSize={'13px'}>{`${
                coownerInfo?.equity_value ?? '-'
              }%`}</Text>
            </Flex>
            <Flex justify={'space-between'} align={'center'}>
              <Text color="#606060" fontSize={'12px'}>
                Unit Size
              </Text>
              <Text color="#191919" fontSize={'13px'}>{`${asset?.unit?.unit_size}sqm`}</Text>
            </Flex>
            <Flex justify={'space-between'} align={'center'}>
              <Text color="#606060" fontSize={'12px'}>
                Unit Type
              </Text>
              <Text color="#191919" fontSize={'13px'}>
                {asset?.unit?.unit_title ?? '-'}
              </Text>
            </Flex>
            <Flex justify={'space-between'} align={'center'}>
              <Text color="#606060" fontSize={'12px'}>
                Purchase Agreement
              </Text>
              {HOME__OWNERS__PACKETS?.isLoading ? (
                <ThreeDots />
              ) : (
                <a rel="noreferrer" target="_blank" href={packet?.packet}>
                  <CustomizableButton
                    border="1px solid"
                    h="22px"
                    w="50px"
                    bg="transparent"
                    borderColor="text"
                  >
                    <Text color={'text'} fontWeight={300} fontSize={'12px'}>
                      View
                    </Text>
                  </CustomizableButton>
                </a>
              )}
            </Flex>
            <Flex justify={'space-between'} align={'center'}>
              <Text color="#606060" fontSize={'12px'}>
                Offer Date
              </Text>
              <Text color="#191919" fontSize={'13px'}>
                {formatDateToString(asset?.created_at)}
              </Text>
            </Flex>
            <Flex justify={'space-between'} align={'center'}>
              <Text color="#606060" fontSize={'12px'}>
                Offer Expiration Date
              </Text>
              <Text color="#191919" fontSize={'13px'}>
                {formatDateToString(asset?.offer_expires)}
              </Text>
            </Flex>

            {isTheHost && (
              <Flex justify={'space-between'} align={'center'}>
                <Text color="#606060" fontSize={'12px'}>
                  Co-owners
                </Text>
                <CustomizableButton
                  border="1px solid"
                  h="22px"
                  w="50px"
                  bg="transparent"
                  borderColor="text"
                  onClick={() => setType('coOwnersList')}
                >
                  <Text color={'text'} fontWeight={300} fontSize={'12px'}>
                    View
                  </Text>
                </CustomizableButton>
              </Flex>
            )}
          </VStack>

          <Button w="full" mt="30px" bg="primary" color="white" onClick={handleProceed}>
            Proceed to Payment
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CoOwnSummary;
