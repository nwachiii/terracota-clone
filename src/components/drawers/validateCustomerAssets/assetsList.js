import {Image, VStack, Text, Flex, Box} from '@chakra-ui/react';
import EmptyState from '../../appState/empty-state';
import {formatToCurrency} from '../../../utils';
import {Spinner} from '../../../ui-lib';

const AssetsList = ({equitiesData, setEquityData, setType, customScrollbarStyles, isLoading}) => {
  const handleManageAssets = property => {
    setEquityData(property);
    setType('summary');
  };

  return (
    <Box px="24px" pb="38px" h={'fit-content'} overflowY={'scroll'} __css={customScrollbarStyles}>
      {isLoading ? (
        <VStack w="80vw">
          <Spinner />
        </VStack>
      ) : (
        <>
          {equitiesData?.length > 0 ? (
            <VStack align="stretch" spacing={'12px'}>
              {(equitiesData || [])?.map(equity => (
                <Flex
                  onClick={() => handleManageAssets(equity)}
                  cursor="pointer"
                  w="full"
                  px="24px"
                  bg="background"
                  py="16px"
                  gap="12px"
                  align={'center'}
                  border="1px solid"
                  borderRadius="4px"
                  borderColor="shade"
                >
                  <Image
                    h="60px"
                    w="60px"
                    borderRadius={'5px'}
                    alt="next_image"
                    src={equity?.project?.photos[0]?.photo}
                  />
                  <VStack align="stretch" spacing={'8px'} maxW="330px">
                    <Text fontSize={'15px'} fontWeight="500" color="text">
                      {equity?.project?.name}
                    </Text>
                    <Text fontSize={'12px'} fontWeight="500" color="text">
                      {`${formatToCurrency(equity?.total_unit_price)}`}
                    </Text>
                  </VStack>
                </Flex>
              ))}
            </VStack>
          ) : (
            <EmptyState text={`You haven't purchased any property yet`} />
          )}
        </>
      )}
    </Box>
  );
};

export default AssetsList;
