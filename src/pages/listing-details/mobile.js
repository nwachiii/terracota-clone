import React from 'react';
import {Box, Flex, HStack, Image, Text, VStack} from '@chakra-ui/react';
import {Spinner} from '../../ui-lib';
import {useRouter} from 'next/router';
import {fetchProjectDocument, fetchProjectsById} from '../../api/listing';
import {useQuery} from 'react-query';
import Amenities from './sections/amenities';
import MapViewBox from './sections/mapView';
import AllUnits from './sections/allUnits';
import {formatToCurrency} from '../../utils';
import ErrorState from '../../components/appState/error-state';
import Auth from '../../hoc/Auth';
import BookmarkProperty from './sections/bookmark';
import brochure from '../../images/icons/view-brochure.svg';
import PropertyInfoMobile from './sections/propertyInfoMobile';
import AssetCarouselMobile from '../../components/assetCarousel/mobile';
import LayoutView from '../../components/layout';
import ViewBrochure from './sections/viewBrochure';

const ListingDetailsMobile = () => {
  const router = useRouter();
  const id = router.query.id;

  const {data, isError, isLoading, error, refetch} = useQuery(
    ['fetchProjectById', id],
    () => fetchProjectsById(parseInt(id)),
    {enabled: !!id}
  );
  const info = data?.data?.project;
  const projectDoc = useQuery(['projectDoc', info?.id], () => fetchProjectDocument(info?.id));

  const slideImages =
    info?.photos?.map(image => ({
      original: image.photo,
      thumbnail: image.photo,
    })) || [];

  return (
    <LayoutView display={{base: 'block', lg: 'none'}} noPadding>
      <Box
        pb={{base: '100px', lg: '50px'}}
        bg="background"
        h={'100%'}
        minH="100vh"
        minInlineSize={'fit-content'}
        color="black"
        px={{base: '16px', lg: '24px'}}
        pt="20px"
        display={{base: 'block', lg: 'none'}}
      >
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <ErrorState />
        ) : (
          <>
            {info && (
              <Flex direction="column" gap="24px">
                <AssetCarouselMobile
                  // leftItem={
                  //   <VStack spacing={'8px'} align={'stretch'}>
                  //     <Text fontSize={'12px'} fontWeight={600} color='#fff'>
                  //       {info.name}
                  //     </Text>
                  //     <Text fontSize={'12px'} fontWeight={400} color='#fff'>
                  //       Starting from: {formatToCurrency(info?.starting_from)}
                  //     </Text>
                  //   </VStack>
                  // }
                  // rightItem={
                  //   <BookmarkProperty
                  //     pColor='#191919'
                  //     bg='#fff'
                  //     refetch={refetch}
                  //     info={info}
                  //   />
                  // }
                  noBorderRadius
                  slideImages={slideImages}
                />
                <HStack justify={`space-between`}>
                  <Text
                    className="gilda-display-medium"
                    fontSize={'28px'}
                    lineHeight={'140%'}
                    textTransform={'uppercase'}
                    color="matador_text.100"
                  >
                    {info.name}
                  </Text>
                  <HStack gap={`16px`}>
                    <BookmarkProperty pColor="#191919" bg="#fff" refetch={refetch} info={info} />
                    <ViewBrochure
                      file={`${
                        info?.property_document ? info?.property_document[0]?.document_url : ''
                      }`}
                    />
                  </HStack>
                </HStack>

                <Text
                  className="montserrat-regular"
                  lineHeight={'140%'}
                  textTransform={'uppercase'}
                  color="matador_text.500"
                  fontWeight={`500`}
                >
                  STARTING from {formatToCurrency(info?.starting_from)}
                </Text>

                <Box>
                  {/* <Text
                      color='text'
                      className='gilda-display-medium'
                      fontSize='16px'
                      fontWeight='500'
                    >
                      Description
                    </Text> */}
                  <Text
                    fontSize={'13px'}
                    fontWeight={300}
                    className="montserrat-regular"
                    lineHeight={'150%'}
                    color="matador_text.300"
                  >
                    {info?.description}
                  </Text>
                </Box>

                {/* <Flex
                    gap='8px'
                    mt='20px'
                    align={'center'}
                    onClick={() =>
                      window.open(
                        `${
                          projectDoc?.data
                            ? projectDoc.data?.data?.results?.[0]?.document_file
                            : ''
                        }`,
                        '_blank'
                      )
                    }
                  >
                    <Image src={brochure.src} boxSize={'22px'} />
                    <Text fontSize={'13px'} color='primary' fontWeight='500'>
                      View Brochure
                    </Text>
                  </Flex> */}
                <PropertyInfoMobile info={info} />

                <Amenities info={info} />
                <Box my="20px">
                  <Text
                    fontSize={{base: '16px', lg: '24px'}}
                    fontWeight={600}
                    color="matador_text.100"
                    className="gilda-display-bold"
                  >
                    Map View
                  </Text>
                  <Box
                    w={{base: `43px`, md: '70px'}}
                    mt="4px"
                    mb={`16px`}
                    borderBottom="1.8px solid"
                    borderColor={`matador_text.200` || `#191919`}
                  />
                  <MapViewBox
                    lat={info?.latitude}
                    lng={info?.longitude}
                    width="full"
                    height="222px"
                  />
                </Box>
                <AllUnits info={info} />
              </Flex>
            )}
          </>
        )}
      </Box>
    </LayoutView>
  );
};

export default Auth(ListingDetailsMobile);
