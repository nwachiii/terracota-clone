import {HStack, Image, VStack, Text, useDisclosure, Box} from '@chakra-ui/react';
import React, {useState} from 'react';
import homeIcon from '../../images/icons/validateAssetHomeIcon.svg';
import {useQuery} from 'react-query';
import {fetchForCustomerEquityValidation} from '../../api/listing';
import CustomerEquityValidation from '../drawers/validateCustomerAssets';
import {Button} from '../../ui-lib';
import {CloseIcon} from '@chakra-ui/icons';
import cancelICon from '/src/images/icons/closeIcon.svg';

const ValidateCustomerEquity = () => {
  const [willDisplay, setWillDisplay] = useState(true);
  const fetchcustomeQuery = useQuery(
    ['fetchcustomervalidationEquity'],
    fetchForCustomerEquityValidation,
    {refetchOnMount: true}
  );
  const datasToUse = fetchcustomeQuery?.data?.data?.all_pending_requests;

  const drawerDisclosure = useDisclosure();

  return (
    <Box w="full">
      {datasToUse?.length ? (
        <>
          {willDisplay && (
            <HStack
              w="85%"
              bg="#101010"
              mx="auto"
              boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
              justify="space-between"
              p={{base: '16px', md: '12px'}}
              minH={{base: '48px', md: '72px'}}
              mb={{base: '8px', md: '15px'}}
            >
              <HStack w="80%" spacing={{base: '3px', md: '16px'}}>
                <HStack p={{base: '4px', md: '10px'}} justify="center" align="center">
                  <Image boxSize={{base: '24px', md: '40px'}} src={homeIcon.src} />
                </HStack>

                <VStack color="#FBFCFC" align={'flex-start'} spacing={0}>
                  <Text fontSize={{base: '12px', md: '16px'}} fontWeight={{base: 500, md: 600}}>
                    Welcome Onboard
                  </Text>
                  <Text fontSize={{base: '11px', md: '14px'}} fontWeight={300}>
                    Kindly validate your asset
                  </Text>
                </VStack>
              </HStack>

              <HStack spacing={{base: '8px', md: '18px'}} pr="4px">
                <Button
                  color="#FBFCFC"
                  bg="primary"
                  onClick={drawerDisclosure.onOpen}
                  _hover={{opacity: 1}}
                  _active={{opacity: 1}}
                  boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                  h={{base: '23px', md: '44px'}}
                  w={{base: '47px', md: '75px'}}
                  fontSize={{base: '13px', md: 'unset'}}
                  fontWeight={{base: '500', md: 'unset'}}
                  px="32px"
                  py="13px"
                >
                  View
                </Button>
                <CloseIcon
                  display={{base: 'none', md: 'block'}}
                  fontSize="11px"
                  color="#FBFCFC"
                  onClick={() => setWillDisplay(false)}
                  cursor="pointer"
                  src={cancelICon.src}
                />
              </HStack>
            </HStack>
          )}
          <CustomerEquityValidation
            equitiesData={datasToUse}
            drawer={drawerDisclosure}
            refetch={fetchcustomeQuery?.refetch}
            isLoading={fetchcustomeQuery?.isLoading}
          />
        </>
      ) : null}
    </Box>
  );
};

export default ValidateCustomerEquity;
