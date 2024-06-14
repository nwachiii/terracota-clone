import {Box, Center, Flex, Hide, Image, Show, SimpleGrid, Text, VStack} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {fetchAllUnits} from '../../../api/listing';
import {CardTwo} from '../../../components/cards';
import {Spinner} from '../../../ui-lib';
import {useRouter} from 'next/router';
import ErrorState from '../../../components/appState/error-state';
import {formatToCurrency} from '../../../utils';

const OtherUnits = ({info, excludingId}) => {
  const router = useRouter();
  const projectId = info?.id;
  const {data, isError, isLoading} = useQuery(
    ['fetchAllUnits', projectId],
    () => fetchAllUnits(parseInt(projectId)),
    {enabled: !!projectId}
  );

  const filteredData = data?.data?.results?.filter(unit => unit.id !== excludingId) || [];

  const Units = () =>
    filteredData?.map(
      ({
        price,
        unit_size,
        photos,
        total_quantity,
        total_purchased_units,
        unit_title,
        id,
        is_fraction_sale_available,
      }) => (
        <>
          <Show below="md">
            <Flex
              key={id}
              p={`16px 12px`}
              gap={`12px`}
              border={`1px solid`}
              borderColor={`matador_text.500`}
              onClick={() =>
                router.push({
                  pathname: `/listing-details/units/${id}`,
                  query: {projectId: projectId},
                })
              }
            >
              <Center
                h={{base: '60px', md: '100px'}}
                w={{base: '60px', md: '100px'}}
                minH={{base: '60px', md: '100px'}}
                minW={{base: '60px', md: '100px'}}
                borderRadius={`2px`}
                position="relative"
                overflow={`hidden`}
              >
                <Image src={photos[0]?.photo || '/'} alt="image" minH={`100%`} minW={`100%`} />
              </Center>
              <VStack alignItems={'flex-start'}>
                <Text
                  color="matador_text.100"
                  /* terracota/Title 2 bold */
                  className="montserrat-regular"
                  fontSize="16px"
                  fontWeight={`500`}
                  lineHeight={`140%`}
                  letterSpacing={`0.16px`}
                >
                  {unit_title}
                </Text>
                <Text
                  color="matador_text.400"
                  /* terracota/Title 2 bold */
                  className="montserrat-regular"
                  fontSize="13px"
                  fontWeight={`500`}
                  lineHeight={`135%`}
                  letterSpacing={`0.5px`}
                >
                  {formatToCurrency(price)}
                </Text>
              </VStack>
            </Flex>
          </Show>
          <Hide below="md">
            <CardTwo
              key={id}
              is_fraction_sale_available={is_fraction_sale_available}
              title={unit_title}
              image={photos[0]?.photo}
              subtitle={formatToCurrency(price)}
              onClickCard={() =>
                router.push({
                  pathname: `/listing-details/units/${id}`,
                  query: {projectId: projectId},
                })
              }
            />
          </Hide>
        </>
      )
    );

  return (
    <>
      {Boolean(filteredData?.length) && (
        <Box mt={{base: '20px', md: '50px'}} w={{base: '100%', md: '100%'}} mx="auto">
          {/* <Text
            fontSize={{ base: '16px', md: '24px' }}
            fontWeight={400}
            color='text'
            className='gilda-display-bold'
          >
            People also viewed
          </Text>
          <Box w='150px' mt='15px' borderBottom='1.8px solid #191919' /> */}

          <Text
            fontSize={{base: '16px', lg: '24px'}}
            fontWeight={400}
            color="matador_text.100"
            className="gilda-display-bold"
          >
            People also viewed
          </Text>
          <Box
            w={{base: `43px`, md: '70px'}}
            mt="4px"
            borderBottom="1.8px solid"
            borderColor={`matador_text.200` || `#191919`}
          />

          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <ErrorState />
          ) : (
            <SimpleGrid
              mt={{base: '15px', md: '26px'}}
              gap={{base: '16px', md: '24px', '2xl': '54px'}}
              columns={{base: 1, md: 2, lg: 3}}
              justify={'center'}
              alignItems={'center'}
            >
              <Units />
            </SimpleGrid>
          )}
        </Box>
      )}
    </>
  );
};

export default OtherUnits;
