import React, {useRef} from 'react';
import {Box, Flex, HStack, Image, Text, VStack} from '@chakra-ui/react';
import {themeStyles} from '../../theme';
import LayoutView from '../../components/layout';
import {Spinner} from '../../ui-lib';
import {useRouter} from 'next/router';
import {fetchProjectsById} from '../../api/listing';
import {useQuery} from 'react-query';
import Amenities from './sections/amenities';
import MapViewBox from './sections/mapView';
import PropertyInfo from './sections/propertyInfo';
import AllUnits from './sections/allUnits';
import {formatToCurrency} from '../../utils';
import ErrorState from '../../components/appState/error-state';
import Auth from '../../hoc/Auth';
import Mobile from './mobile';
import AssetCarousel from '../../components/assetCarousel';
import BookmarkProperty from './sections/bookmark';
import ViewBrochure from './sections/viewBrochure';

const ListingDetails = () => {
  const router = useRouter();
  const id = router.query.id;
  const allUnitsRef = useRef();

  const {data, isError, isLoading, refetch} = useQuery(
    ['fetchProjectById', id],
    () => fetchProjectsById(parseInt(id)),
    {enabled: !!id}
  );

  const info = data?.data?.project;

  const slideImages =
    info?.photos?.map(image => ({
      original: image.photo,
      thumbnail: image.photo,
    })) || [];

  return (
    <>
      <Mobile />
      <LayoutView display={{base: 'none', lg: 'flex'}}>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <ErrorState />
        ) : (
          <>
            {info && (
              <Box mt="20px">
                <AssetCarousel slideImages={slideImages} />

                <Box w="100%" mx="auto" py="28px" borderRadius={'10px'}>
                  <VStack mt="43px" spacing={'24px'} align={'stretch'}>
                    <HStack justify={'space-between'}>
                      <Text
                        className="gilda-display-regular"
                        fontWeight={400}
                        fontSize={'80px'}
                        lineHeight={'72px'}
                        textTransform={'uppercase'}
                      >
                        {info.name}
                      </Text>
                      <HStack gap={`16px`}>
                        <BookmarkProperty
                          pColor="#191919"
                          bg="#fff"
                          refetch={refetch}
                          info={info}
                        />
                        <ViewBrochure
                          file={`${
                            info?.property_document ? info?.property_document[0]?.document_url : ''
                          }`}
                        />
                      </HStack>
                    </HStack>

                    <Text
                      fontSize={'19px'}
                      textTransform={`uppercase`}
                      color="matador_text.500"
                      fontWeight={`500`}
                    >
                      STARTING FROM <Text as="span">{formatToCurrency(info?.starting_from)}</Text>
                    </Text>
                    <Text
                      lineHeight={'140%'}
                      className="montserrat-regular"
                      color="matador_text.500"
                      fontSize={'19px'}
                      fontWeight={400}
                      letterSpacing={`.2px`}
                    >
                      {info?.description}
                    </Text>
                  </VStack>

                  <PropertyInfo allUnitsRef={allUnitsRef} refetch={refetch} info={info} />

                  <Amenities info={info} />
                  {/* <Divider my='40px' w='100%' /> */}
                  <Box my="40px">
                    <Text
                      fontSize={{base: '16px', lg: '24px'}}
                      fontWeight={400}
                      color="matador_text.100"
                      className="gilda-display-bold"
                    >
                      Map View
                    </Text>
                    <Box
                      w={{base: `43px`, md: '70px'}}
                      mt={{base: '4px', md: `15px`}}
                      borderBottom="1.8px solid"
                      borderColor={`matador_text.200` || `#191919`}
                      mb={{base: '16px', lg: '36px'}}
                    />
                    <MapViewBox
                      lat={info?.latitude}
                      lng={info?.longitude}
                      width="full"
                      height="391px"
                    />
                  </Box>
                </Box>
                <Box w="full" ref={allUnitsRef}>
                  <AllUnits info={info} />
                </Box>
              </Box>
            )}
          </>
        )}
      </LayoutView>
    </>
  );
};

export default Auth(ListingDetails);
