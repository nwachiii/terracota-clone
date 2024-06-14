import React from 'react';
import {Box, VStack, Flex, Text, Image, HStack} from '@chakra-ui/react';
import {formatToCurrency} from '../../../utils';
import {Spinner} from '../../../ui-lib';
import {calculateSharedValue} from '../../../utils/calculateFee';
import {fetchCustomersInfo} from '../../../api/co_owners';
import {BUSINESS_ID} from '../../../constants/routes';
import {useQuery} from 'react-query';

const CoOwnersList = ({asset, customScrollbarStyles, coowners, theHost, coOwnerLoading}) => {
  const totalValue = asset?.payment_plan?.initial_deposit_in_value ?? asset?.total_unit_price;
  const excludeHostFromCoowners = coowners?.filter(info => info?.id !== theHost?.id);

  const queryForCustomersInfo = `${coowners
    .map(element => {
      return `user[]=${element?.invitee?.id}`;
    })
    .join('&')}&business_id=${BUSINESS_ID()}`;

  const customersFetch = useQuery(['users', queryForCustomersInfo], () =>
    fetchCustomersInfo(queryForCustomersInfo)
  );

  const findCustomerObjOfCoowner = (email, key) =>
    customersFetch?.data?.data?.user.find(item => item.email === email)?.[key] ?? '-';

  return (
    <Box px="24px" pb="38px" h={'fit-content'} overflowY={'scroll'} __css={customScrollbarStyles}>
      <Box w="full">
        <VStack w="full" spacing={'20px'}>
          {coOwnerLoading ? (
            <Spinner />
          ) : (
            <>
              <Flex w="full" justify={'space-between'} className="montserrat-regular">
                <HStack align={'center'} justify={'flex-start'} spacing={'13px'}>
                  <Box w="40px" h="40px" position={'relative'}>
                    <Image
                      w="full"
                      h="full"
                      src={findCustomerObjOfCoowner(theHost?.invitee?.email, 'avatar')}
                      borderRadius={'full'}
                    />
                    <Box
                      borderRadius={'full'}
                      p="2.5px 7.5px"
                      bg={'#CDCED0'}
                      position={'absolute'}
                      bottom={0}
                      right={'-10px'}
                    >
                      <Text fontSize={'8px'} fontWeight={500} color={'#191919'}>
                        {theHost?.equity_value}%
                      </Text>
                    </Box>
                  </Box>
                  <VStack align={'stretch'} spacing={'2px'}>
                    <Text fontSize={'16px'} fontWeight={500}>
                      {`${findCustomerObjOfCoowner(
                        theHost?.invitee?.email,
                        'first_name'
                      )} ${findCustomerObjOfCoowner(theHost?.invitee?.email, 'last_name')}`}
                    </Text>
                    <Text fontSize={'11px'} fontWeight={400}>
                      {theHost.invitee?.email}
                    </Text>
                  </VStack>
                </HStack>

                <VStack align={'flex-end'} spacing={'12px'}>
                  <Text fontSize={'13px'} fontWeight={400}>
                    {formatToCurrency(calculateSharedValue(theHost.equity_value, totalValue))}
                  </Text>
                  <Box px="10px" py="3px" bg={'#F0F0F0'}>
                    <Text
                      fontWeight="500"
                      fontSize={'13px'}
                      color={'#191919'}
                      textTransform={'uppercase'}
                    >
                      {theHost?.status}
                    </Text>
                  </Box>
                </VStack>
              </Flex>
              {excludeHostFromCoowners?.map(user => (
                <Flex w="full" justify={'space-between'} className="montserrat-regular">
                  <HStack align={'center'} justify={'flex-start'} spacing={'13px'}>
                    <Box w="40px" h="40px" position={'relative'}>
                      <Image
                        w="full"
                        h="full"
                        src={findCustomerObjOfCoowner(user?.invitee?.email, 'avatar')}
                        borderRadius={'full'}
                      />
                      <Box
                        borderRadius={'full'}
                        p="2.5px 7.5px"
                        bg={'#CDCED0'}
                        position={'absolute'}
                        bottom={0}
                        right={'-10px'}
                      >
                        <Text fontSize={'8px'} fontWeight={500} color={'#191919'}>
                          {user?.equity_value}%
                        </Text>
                      </Box>
                    </Box>
                    <VStack align={'stretch'} spacing={'2px'}>
                      <Text fontSize={'16px'} fontWeight={500}>
                        {`${findCustomerObjOfCoowner(
                          user?.invitee?.email,
                          'first_name'
                        )} ${findCustomerObjOfCoowner(user?.invitee?.email, 'last_name')}`}
                      </Text>
                      <Text fontSize={'11px'} fontWeight={400}>
                        {user.invitee?.email}
                      </Text>
                    </VStack>
                  </HStack>

                  <VStack align={'flex-end'} spacing={'12px'}>
                    <Text fontSize={'13px'} fontWeight={400}>
                      {formatToCurrency(calculateSharedValue(user.equity_value, totalValue))}
                    </Text>
                    <Box px="10px" py="3px" bg={'#F0F0F0'}>
                      <Text
                        fontWeight="500"
                        fontSize={'13px'}
                        color={'#191919'}
                        textTransform={'uppercase'}
                      >
                        {user?.status}
                      </Text>
                    </Box>
                  </VStack>
                </Flex>
              ))}
            </>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default CoOwnersList;
