import React from 'react';
import {Box, Divider, HStack, Text, VStack} from '@chakra-ui/react';
import {Button} from '../../../../ui-lib';
import {useRouter} from 'next/router';
import {formatToCurrency} from '../../../../utils';
import AssetCarouselMobile from '../../../../components/assetCarousel/mobile';
import LayoutView from '../../../../components/layout';

const FractionalDetailsMobile = ({
  fractionalData,
  onCloseModal,
  fractionalModal,
  fractions,
  setFractions,
  setStep,
}) => {
  const router = useRouter();
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
    <Box w="full" display={{base: 'block', lg: 'none'}}>
      {/* <LayoutView noPadding h="full" noFooter> */}
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
          // lineHeight={'140%'}
          color="#606060"
          textTransform={`uppercase`}
        >
          STARTING from {formatToCurrency(unitData?.price_per_fraction)}
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
            <Text position={'absolute'} color="primary" left={`${fractionalPercent}%`} top="-30px">
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
          <HStack justify="space-between" w="full">
            <Text fontSize={'13px'} fontWeight={500} color="#606060">
              No of Stakeholders
            </Text>
            <Text fontSize={'16px'} fontWeight={500} color="#191919" textTransform="capitalize">
              {fractionalData?.partners?.length || '-'}
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
              Investor&apos;s Packet
            </Text>
            <Text
              fontSize={'16px'}
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
          </HStack>
        </VStack>

        <Button
          mt="24px"
          h="48px"
          w="full"
          color="white"
          bg={'primary'}
          zIndex="100"
          mb="50px"
          // isDisabled={error || !Boolean(Number(fractions))}
          onClick={() => setStep('enterFraction')}
        >
          Proceed
        </Button>
      </Box>
      {/* </LayoutView> */}
    </Box>
  );
};

export default FractionalDetailsMobile;
