import React from 'react';
import {Flex, Box, Text, VStack} from '@chakra-ui/react';
import {Button, CustomizableButton} from '../../../ui-lib';
import {formatToCurrency} from '../../../utils';
import {useQuery} from 'react-query';
import {fetchInvestorPackets} from '../../../api/payment';
import ThreeDots from '../../loaders/ThreeDots';
import {formatDateToString} from '../../../utils/formatDate';

const SummaryDrawer = ({asset, setType, customScrollbarStyles}) => {
  const HOME__OWNERS__PACKETS = useQuery(['fetchInvestorPackets', asset?.id], () =>
    fetchInvestorPackets(asset?.id)
  );
  const packet =
    HOME__OWNERS__PACKETS?.data?.data?.received?.length &&
    HOME__OWNERS__PACKETS?.data?.data?.received[0];

  const handleProceed = () => {
    setType('payment');
  };

  return (
    <Box px="24px" pb="38px" h={'fit-content'} overflowY={'scroll'} __css={customScrollbarStyles}>
      <Box w="full">
        <Text fontWeight={600} fontSize={'20px'} color={'text'} mb="15px">
          {asset?.unit?.unit_title}
          {/* {asset?.project?.name} */}
        </Text>
        {/* <Image h="195px" w="full" src={asset?.project?.photos[0]?.photo} /> */}

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
            color="text"
            fontSize={{base: '14px', md: '18px'}}
            fontWeight={400}
            className="montserrat-regular"
          >
            {asset?.payment_plan ? 'Initial Deposit' : 'Offer Price'}
          </Text>
          <Text color="#4B4B4B" fontSize={{base: '28px', md: '34px'}} fontWeight={600}>
            {asset?.payment_plan
              ? formatToCurrency(asset?.payment_plan?.initial_deposit_in_value)
              : formatToCurrency(asset?.total_unit_price)}
          </Text>
        </Flex>

        <VStack
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
              {asset?.payment_plan?.plan_type === 'custom'
                ? 'Custom'
                : asset?.payment_plan
                ? `${asset?.payment_plan?.payment_period_in_months} months plan`
                : 'Outright'}
            </Text>
          </Flex>
          {asset?.payment_plan ? (
            <>
              {asset?.payment_plan?.bundle?.fees?.map(fee => (
                <Flex justify={'space-between'} align={'center'}>
                  <Text color="#606060" fontSize={'12px'}>
                    {fee.name}
                  </Text>
                  <Text color="#191919" fontSize={'13px'}>
                    {formatToCurrency(fee.amount)}
                  </Text>
                </Flex>
              ))}
            </>
          ) : (
            <>
              {asset?.unit?.fees?.map(fee => (
                <Flex justify={'space-between'} align={'center'}>
                  <Text color="#606060" fontSize={'12px'}>
                    {fee.name}
                  </Text>
                  <Text color="#191919" fontSize={'13px'}>
                    {formatToCurrency(fee.amount)}
                  </Text>
                </Flex>
              ))}
            </>
          )}

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
          {asset?.payment_plan && (
            <Flex justify={'space-between'} align={'center'}>
              <Text color="#606060" fontSize={'12px'}>
                Initial deposit percentage
              </Text>
              <Text color="#191919" fontSize={'13px'}>
                {Math.round(
                  (asset?.payment_plan?.initial_deposit_in_value / asset?.total_unit_price) * 100
                )}
                %
              </Text>
            </Flex>
          )}
          <Flex justify={'space-between'} align={'center'}>
            <Text color="#606060" fontSize={'13px'}>
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
        </VStack>

        {asset?.payment_plan?.plan_type === 'custom' && (
          <Button
            h="48px"
            fontSize="16px"
            fontWeight="500"
            w="full"
            mt="16px"
            bg="transparent"
            color="primary"
            border="1px solid !important"
            borderColor="primary"
            onClick={() => setType('breakdown')}
          >
            View Payment Breakdown
          </Button>
        )}

        <Button
          h="48px"
          fontSize="16px"
          fontWeight="500"
          w="full"
          mt="16px"
          bg="primary"
          color="white"
          onClick={handleProceed}
        >
          Proceed to Payment
        </Button>
      </Box>
    </Box>
  );
};

export default SummaryDrawer;
