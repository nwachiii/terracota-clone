import React from 'react';
import {Box, Flex, HStack, Text, VStack} from '@chakra-ui/react';
import LayoutView from '../../../components/layout';
import {Spinner} from '../../../ui-lib';
import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import {fetchAllUnits, fetchProjectsById} from '../../../api/listing';
import BuyProperties from './buyProperty';
import {formatToCurrency} from '../../../utils';
import ErrorState from '../../../components/appState/error-state';
import Auth from '../../../hoc/Auth';
import Mobile from './mobile';
import AssetCarousel from '../../../components/assetCarousel';
import OtherUnits from '../sections/otherUnits';
import BookmarkProperty from '../sections/bookmark';
import ViewBrochure from '../sections/viewBrochure';

const Unit = () => {
  const router = useRouter();
  const {unit, projectId} = router.query;

  const {data, isError, isLoading} = useQuery(
    ['fetchAllUnits', unit],
    () => fetchAllUnits(parseInt(projectId)),
    {
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
    <>
      <Mobile />
      <LayoutView display={{base: 'none', lg: 'flex'}}>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <ErrorState />
        ) : (
          <>
            {unitData && (
              <Box mt="20px">
                <AssetCarousel slideImages={slideImages} />
                <Box w="100%" mx="auto" borderRadius={'10px'}>
                  <VStack mt="43px" spacing={'24px'} align={'stretch'}>
                    <HStack justify={'space-between'}>
                      <Text
                        className="gilda-display-regular"
                        fontWeight={400}
                        fontSize={'48px'}
                        lineHeight={'72px'}
                        textTransform={'uppercase'}
                      >
                        {unitData?.unit_title}
                      </Text>
                      <BuyProperties unitData={unitData} show_co_owner_button={false} />

                      {/* <HStack gap={`16px`}>
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
                      </HStack> */}
                      {/* <BookmarkProperty info={info} refetch={refetch} /> */}
                    </HStack>

                    <Text
                      fontWeight={400}
                      fontSize={'19px'}
                      textTransform={`uppercase`}
                      className="montserrat-regular"
                      lineHeight={'140%'}
                      color="matador_text.200"
                    >
                      STARTING FROM{' '}
                      <Text as="span" fontWeight={400}>
                        {formatToCurrency(unitData?.price)}
                      </Text>
                    </Text>

                    <Text
                      fontSize={'19px'}
                      fontWeight={400}
                      color="text"
                      lineHeight={'200%'}
                      className="montserrat-regular"
                    >
                      {unitData?.unit_description}
                    </Text>
                  </VStack>
                </Box>

                {/* <BuyProperties unitData={unitData} /> */}

                {/* <Box w='85%' mx='auto' mt='40px' minH={{ base: '15vh', lg: '20vh' }}>
                  <Text color='text' className='gilda-display-bold' fontSize='24px' fontWeight='700'>
                    Description
                  </Text>
                  <Text color='text' mt='16px'>
                    {unitData?.unit_description}
                  </Text>
                </Box> */}
                <OtherUnits info={info} excludingId={unitData?.id} />
              </Box>
            )}
          </>
        )}
      </LayoutView>
    </>
  );
};

export default Auth(Unit);
