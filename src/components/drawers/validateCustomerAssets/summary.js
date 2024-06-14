import orangeAlertIcon from '../../../images/icons/orange-alert-icon.svg';
import {Flex, Box, Text, VStack, Divider, HStack, Image, Spinner, Center} from '@chakra-ui/react';
import {Button, CustomizableButton} from '../../../ui-lib';
import {formatToCurrency} from '../../../utils';
import {useEffect} from 'react';
import planIcon from '../../../images/icons/pending_transaction_plan.svg';
import {
  fetchAllPurchaseHistory,
  fetchInvestorPackets,
  fetchUpcomingPayments,
} from '../../../api/payment';
import {useQuery} from 'react-query';
import {changeDateFormat, formatDateToString} from '../../../utils/formatDate';
import ThreeDots from '../../loaders/ThreeDots';

const Summary = ({equityData, setType, customScrollbarStyles}) => {
  const HOME__OWNERS__PACKETS = useQuery(['fetchInvestorPackets', equityData?.id], () =>
    fetchInvestorPackets(equityData?.id)
  );
  const packet =
    HOME__OWNERS__PACKETS?.data?.data?.received?.length &&
    HOME__OWNERS__PACKETS?.data?.data?.received[0];

  const TRANSACTIONS_HISTORY = useQuery(['fetchAllPurchaseHistory', equityData?.id], () =>
    fetchAllPurchaseHistory(equityData?.id)
  );
  const UpcomingPayment = useQuery(['fetchUpcomingPayments', equityData?.id], () =>
    fetchUpcomingPayments(equityData?.id)
  );

  function getOrdinal(number) {
    if (typeof number !== 'number') {
      return ''; // Return an empty string for invalid inputs
    }

    const suffixes = ['th', 'st', 'nd', 'rd'];
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    // Special cases for 11, 12, and 13, as they don't follow the usual pattern
    if (lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13) {
      return number + 'th';
    }

    // Use the appropriate suffix based on the last digit
    const suffix = suffixes[lastDigit] || 'th';

    return number + suffix;
  }

  return (
    <Box
      px={{base: '18px', md: '24px'}}
      pb="38px"
      h={'fit-content'}
      overflowY={'scroll'}
      __css={customScrollbarStyles}
    >
      <HStack
        align="start"
        spacing="7.42px"
        p="10px"
        w="full"
        borderRadius="2px"
        border="0.5px solid #DD4449"
        bg="rgba(221, 68, 73, 0.1)"
      >
        <Image src={orangeAlertIcon.src} alt="orange alert icon" />
        <Text mt="-2px" fontSize="11.448px" fontWeight="300" color="#DD4449">
          We kindly request your confirmation regarding the property, amount paid, transaction date,
          and the ownership of the uploaded documents. If any information is inaccurate, please
          initiate a dispute. However, if all details are accurate, we kindly ask you to proceed
          with validation.
        </Text>
      </HStack>

      {equityData && (
        <Box mt="18px" w="full">
          <Text fontWeight={600} fontSize={'20px'} color={'text'} mb="15px">
            {equityData?.unit?.unit_title}
            {/* {equityData?.project?.name} */}
          </Text>

          {/* <Image h='195px' w='full' src={equityData?.project?.photos[0]?.photo} /> */}

          <Flex
            mt="20px"
            h="130px"
            w="full"
            color="white"
            border="1px solid"
            borderColor={'shade'}
            align={'center'}
            justify={'center'}
            direction="column"
          >
            <Text
              color="#606060"
              fontSize={{base: '13px', md: '18px'}}
              fontWeight={500}
              className="montserrat-regular"
            >
              {equityData?.payment_plan ? 'Offer Price' : 'Purchase price'}
            </Text>
            <Text color="text" fontSize={{base: '24px', md: '34px'}} fontWeight={600}>
              {equityData?.payment_plan
                ? formatToCurrency(equityData?.payment_plan?.purchase_price)
                : formatToCurrency(equityData?.unit?.price)}
            </Text>
          </Flex>

          {equityData?.payment_plan && (
            <Box w="full">
              {TRANSACTIONS_HISTORY?.isLoading ? (
                <Center w="full" h="20vh" gap="10px">
                  <Spinner color="primary" />
                  <Text>Fetching past payments</Text>
                </Center>
              ) : (
                <Box mt="10px">
                  <Text color="text" fontSize={'13px'} fontWeight={500}>
                    Previous payment
                  </Text>
                  <VStack align={'stretch'} divider={<Divider />} mt="10px" gap={'10px'}>
                    {TRANSACTIONS_HISTORY?.data?.data?.length &&
                      TRANSACTIONS_HISTORY?.data?.data?.map((item, idx) => (
                        <Flex
                          w="full"
                          direction="column"
                          py="23px"
                          bg="background"
                          px="15px"
                          align={'center'}
                          justify={'center'}
                          borderRadius={'2px'}
                          border="1px solid"
                          borderColor={'shade'}
                          position={'relative'}
                        >
                          <Box
                            position={'absolute'}
                            p="2.316px 4.631px"
                            bg="#E4E4E4"
                            top={0}
                            right={0}
                          >
                            <Text fontSize={'10px'} fontWeight={400} color={'#606060'}>
                              Paid on {item?.created_at ? changeDateFormat(item.created_at) : '-'}
                            </Text>
                          </Box>

                          <Text color="#191919" fontSize={'13px'} fontWeight={500}>
                            {getOrdinal(idx + 1)} payment
                          </Text>
                          <Text color="#191919" fontSize={'19x'} fontWeight={500}>
                            {item?.amount ? formatToCurrency(item?.amount) : '-'}
                          </Text>
                        </Flex>
                      ))}
                  </VStack>
                </Box>
              )}

              {UpcomingPayment.isLoading ? (
                <Center w="full" h="20vh" gap="10px">
                  <Spinner color="primary" />
                  <Text>Fetching upcoming payments</Text>
                </Center>
              ) : (
                <Box mt="10px">
                  <Text color="text" fontSize={'14px'} fontWeight={500}>
                    Upcoming payment
                  </Text>
                  <VStack align={'stretch'} mt="10px" gap={'10px'}>
                    {UpcomingPayment.data?.data?.data?.length &&
                      UpcomingPayment.data?.data?.data?.map((item, idx) => (
                        <Flex
                          w="full"
                          direction="column"
                          py="23px"
                          bg="background"
                          px="15px"
                          align={'center'}
                          justify={'center'}
                          borderRadius={'2px'}
                          border="1px solid"
                          borderColor={'shade'}
                          position={'relative'}
                        >
                          <Box
                            position={'absolute'}
                            p="2.316px 4.631px"
                            bg="#E4E4E4"
                            top={0}
                            right={0}
                          >
                            <Text fontSize={'10px'} fontWeight={400} color={'#606060'}>
                              Due date: {item?.created_at ? changeDateFormat(item.due_date) : '-'}
                            </Text>
                          </Box>

                          <Text color="#191919" fontSize={'13px'} fontWeight={500}>
                            {getOrdinal(idx + 1 + TRANSACTIONS_HISTORY?.data?.data?.length)} payment
                          </Text>
                          <Text color="#191919" fontSize={'19x'} fontWeight={500}>
                            {item?.amount ? formatToCurrency(item?.amount) : '-'}
                          </Text>
                        </Flex>
                      ))}
                  </VStack>
                </Box>
              )}
            </Box>
          )}

          <VStack
            pb="80px"
            align={'stretch'}
            mt="20px"
            spacing={'24px'}
            fontWeight={500}
            className="montserrat-regular"
          >
            <Flex justify={'space-between'} align={'center'}>
              <Text color="#606060" fontSize={'12px'}>
                Payment Type
              </Text>
              <Text color="#191919" fontSize={'13px'}>
                {equityData?.payment_plan?.plan_type === 'custom'
                  ? 'Custom'
                  : equityData?.payment_plan
                  ? `${equityData?.payment_plan?.payment_period_in_months} months plan`
                  : 'Outright'}
              </Text>
            </Flex>

            <Flex justify={'space-between'} align={'center'}>
              <Text color="#606060" fontSize={'12px'}>
                Unit Size
              </Text>
              <Text color="#191919" fontSize={'13px'}>
                {equityData?.unit?.unit_size}sqm
              </Text>
            </Flex>

            <Flex justify={'space-between'} align={'center'}>
              <Text color="#606060" fontSize={'13px'}>
                Home owner’s packet
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
          </VStack>

          <Flex
            position={'fixed'}
            bottom={0}
            right={0}
            py="27px"
            gap="8px"
            align="center"
            mx={'auto'}
            w="full"
            bg="white"
            px={{base: '18px', md: '24px'}}
          >
            <CustomizableButton
              h="48px"
              fontSize="16px"
              fontWeight="500"
              border="1px solid #DD4449 !important"
              bg="transparent"
              w="50%"
              color="#DD4449"
              onClick={() => setType('dispute')}
            >
              Dispute
            </CustomizableButton>
            <Button
              h="48px"
              fontSize="16px"
              fontWeight="500"
              onClick={() => setType('validate')}
              bg="primary"
              borderColor="primary"
              color="white"
              w="50%"
            >
              Validate
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Summary;
