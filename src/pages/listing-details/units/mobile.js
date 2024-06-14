import React from 'react';
import {Box, Flex, HStack, Image, Text, VStack} from '@chakra-ui/react';
import {Spinner} from '../../../ui-lib';
import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import {fetchAllUnits, fetchProjectsById} from '../../../api/listing';
import BuyProperties from './buyProperty';
import {formatToCurrency} from '../../../utils';
import ErrorState from '../../../components/appState/error-state';
import Auth from '../../../hoc/Auth';
import AssetCarouselMobile from '../../../components/assetCarousel/mobile';
import OtherUnits from '../sections/otherUnits';
import LayoutView from '../../../components/layout';
import BookmarkProperty from '../sections/bookmark';
import ViewBrochure from '../sections/viewBrochure';

const UnitDetailsMobile = () => {
  const router = useRouter();
  const {unit, projectId} = router.query;

  const {data, isError, isLoading, error} = useQuery(
    ['fetchAllUnits', unit],
    () => fetchAllUnits(parseInt(projectId)),
    {
      // The query will not execute until the projectId exists
      enabled: !!unit,
    }
  );

  const {data: projectData, refetch} = useQuery(
    ['fetchProjectById', projectId],
    () => fetchProjectsById(parseInt(projectId)),
    {enabled: !!projectId}
  );

  const info = projectData?.data?.project;
  const unitData = data?.data?.results?.find(item => parseInt(item.id) == parseInt(unit));

  const slideImages =
    unitData?.photos?.map(image => ({
      original: image.photo,
      thumbnail: image.photo,
    })) || [];

  return (
    <LayoutView display={{base: 'block', lg: 'none'}} noPadding>
      <Box
        pb={{base: '20px', lg: '50px'}}
        bg="background"
        h={'100%'}
        minH="100vh"
        minInlineSize={'fit-content'}
        color="black"
        px="16px"
        pt="20px"
        display={{base: 'block', lg: 'none'}}
      >
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <ErrorState />
        ) : (
          <>
            {unitData && (
              <Flex direction="column" gap="24px">
                <AssetCarouselMobile
                  // leftItem={
                  //   <VStack spacing={'8px'} align={'stretch'}>
                  //     <Text fontSize={'12px'} fontWeight={600} color='#fff'>
                  //       {unitData?.unit_title}
                  //     </Text>
                  //     <Text fontSize={'12px'} fontWeight={400} color='#fff'>
                  //       Starting from: {formatToCurrency(unitData?.price)}
                  //     </Text>
                  //   </VStack>
                  // }
                  noBorderRadius
                  rightItem={null}
                  slideImages={slideImages}
                />
                <HStack justify={`space-between`}>
                  <Text
                    className="gilda-display-medium"
                    fontSize={'28px'}
                    lineHeight={'140%'}
                    textTransform={'uppercase'}
                    color="matador_text.200"
                  >
                    {unitData?.unit_title}
                  </Text>
                  <HStack gap={`16px`}>
                    <BookmarkProperty
                      pColor="#191919"
                      bg="#fff"
                      refetch={refetch}
                      info={unitData}
                    />
                    <ViewBrochure
                      file={`${
                        unitData?.property_document
                          ? unitData?.property_document[0]?.document_file
                          : ''
                      }`}
                    />
                  </HStack>
                </HStack>

                <Text
                  className="montserrat-regular"
                  // fontSize={'20px'}
                  lineHeight={'140%'}
                  textTransform={'uppercase'}
                  color="matador_text.500"
                  fontWeight={`500`}
                >
                  STARTING from {formatToCurrency(unitData?.price)}
                </Text>

                <Text
                  fontSize={'13px'}
                  fontWeight={300}
                  color="matador_text.300"
                  className="montserrat-regular"
                  lineHeight={'135%'}
                >
                  {unitData?.unit_description}
                </Text>
                <BuyProperties unitData={unitData} show_co_owner_button={false} />
                <OtherUnits info={info} excludingId={unitData?.id} />
              </Flex>
            )}
          </>
        )}

        {/* <Box
          position={'fixed'}
          bottom={0}
          right={0}
          bg='card_bg'
          w='full'
          px='24px'
          py='15px'
        >
          <BuyProperties unitData={unitData} />
        </Box> */}
      </Box>
    </LayoutView>
  );
};

export default Auth(UnitDetailsMobile);
