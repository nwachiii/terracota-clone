import React from 'react';
import {Box, Center, Divider, HStack, Text, useDisclosure, VStack} from '@chakra-ui/react';
import {Button, Spinner} from '../../../ui-lib';
import {useRouter} from 'next/router';
import {formatToCurrency} from '../../../utils';
import AssetCarouselMobile from '../../../components/assetCarousel/mobile';
import LayoutView from '../../../components/layout';
import {useQuery} from 'react-query';
import {fetchFractionalInfo} from '../../../api/listing';
import ErrorState from '../../../components/appState/error-state';
import FractionalMobileModal from './fractionalMobileModal';

const FractionalDetailsMobile = ({setStep}) => {
  const router = useRouter();
  const fractionalId = router.query.id;
  const fractionalModal = useDisclosure();

  const {
    data: fractionalDetail,
    isLoading,
    isError,
  } = useQuery(['fractional', fractionalId], () => fetchFractionalInfo(fractionalId), {
    enabled: !!fractionalId,
  });
  const fractionalData = fractionalDetail?.data;
  const unitData = fractionalData?.fraction_data?.unit;

  const slideImages =
    unitData?.photos?.map(image => ({
      original: image.photo,
      thumbnail: image.photo,
    })) || [];

  const fractionalPercent = (
    (Number(unitData?.total_purchased_fractions) / Number(unitData?.total_fractions)) *
    100
  ).toFixed(2);

  const leftFractions =
    Number(unitData?.total_fractions) - Number(unitData?.total_purchased_fractions);

  return (
    <LayoutView noPadding h="full" display={{base: 'block', md: 'none'}}>
      <Box w="full" h="full" minH={'90vh'}>
        {isLoading ? (
          <Center w="full" h="80vh">
            <Spinner noAbsolute />
          </Center>
        ) : isError ? (
          <ErrorState />
        ) : (
          <Box h="full" px={{base: '16px', lg: '24px'}} pt="20px" w="full">
            <AssetCarouselMobile noBorderRadius slideImages={slideImages} />
            <Text
              mt="16px"
              className="gilda-display-medium"
              fontSize={'28px'}
              lineHeight={'140%'}
              textTransform={'uppercase'}
              color="matador_text.100"
            >
              {unitData?.project?.name}
            </Text>

            <Text
              mt="16px"
              className="montserrat-regular"
              fontSize={'13px'}
              fontWeight={500}
              color="#606060"
            >
              Price per fraction {formatToCurrency(unitData?.price_per_fraction)}
            </Text>

            <Box
              mt="16px"
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

            <Button
              mt="20px"
              h="48px"
              w="full"
              color="white"
              bg={'primary'}
              zIndex="100"
              onClick={fractionalModal.onOpen}
            >
              Buy Fraction
            </Button>

            <VStack w="full" justify={'space-between'} mt="20px" gap="10px" divider={<Divider />}>
              <HStack justify="space-between" w="full">
                <Text fontSize={'13px'} fontWeight={500} color="#606060">
                  Unit Type
                </Text>
                <Text fontSize={'16px'} fontWeight={500} color="#191919" textTransform="capitalize">
                  {fractionalData?.fraction_data?.unit?.unit_title || '-'}
                </Text>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize={'13px'} fontWeight={500} color="#606060">
                  Holding Period
                </Text>
                <Text fontSize={'16px'} fontWeight={500} color="#191919" textTransform="capitalize">
                  {unitData?.holding_period || '-'}
                </Text>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize={'13px'} fontWeight={500} color="#606060">
                  Investor's Packet
                </Text>
                <Text
                  border={'1px solid #000'}
                  p="4px 16px"
                  fontSize={'16px'}
                  fontWeight={500}
                  color="text"
                  cursor={'pointer'}
                  onClick={() =>
                    window.open(
                      `${
                        fractionalData?.packets?.[0]?.packet
                          ? fractionalData?.packets?.[0]?.packet
                          : ''
                      }`,
                      '_blank'
                    )
                  }
                >
                  View
                </Text>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize={'13px'} fontWeight={500} color="#606060">
                  Fractional Investors
                </Text>
                <Text fontSize={'16px'} fontWeight={500} color="#191919" textTransform="capitalize">
                  {fractionalData?.partners?.length || '-'}
                </Text>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize={'13px'} fontWeight={500} color="#606060">
                  Dividend Payout Type
                </Text>
                <Text fontSize={'16px'} fontWeight={500} color="#191919" textTransform="capitalize">
                  {fractionalData?.extra_info?.dividend_payout || '-'}
                </Text>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize={'13px'} fontWeight={500} color="#606060">
                  Dividend Payout Amount
                </Text>
                <Text fontSize={'16px'} fontWeight={500} color="#191919" textTransform="capitalize">
                  {fractionalData?.extra_info?.dividend_amount
                    ? formatToCurrency(fractionalData?.extra_info?.dividend_amount)
                    : '-'}
                </Text>
              </HStack>
            </VStack>
          </Box>
        )}
      </Box>
      <FractionalMobileModal fractionalModal={fractionalModal} fractionalData={fractionalData} />
    </LayoutView>
  );
};

export default FractionalDetailsMobile;
