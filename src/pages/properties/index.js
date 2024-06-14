import {SimpleGrid, Skeleton, Stack, HStack, Box, Text, Flex, Image, Show} from '@chakra-ui/react';
import {CardThree} from '../../components/cards';
import {useRouter} from 'next/router';
import FilterList from './filters';
import {useEffect, useState} from 'react';
import LayoutView from '../../components/layout';
import {fetchProjectsWithFilters} from '../../api/listing';
import {storeName} from '../../constants/routes';
import {useQuery} from 'react-query';
import {fetchWatchlist} from '../../api/watchlist';
import {formatToCurrency} from '../../utils';
import EmptyState from '../../components/appState/empty-state';
import ErrorState from '../../components/appState/error-state';
import Auth from '../../hoc/Auth';
import InspectionFeedBack from '../../components/drawers/feedback';
import PendingTransactions from '../../components/pendingTransaction/pendingTransactionsBar';
import ValidateCustomerEquity from '../../components/validateCustomerAssets';
import OffersBar from '../../components/offers/offersBar';
import filterBG from '../../images/filter-bg.png';
import featuredListingLeft from '../../images/featured-listing-left.svg';
import featuredListingRight from '../../images/featured-listing-right.svg';
import {theme} from '../../theme';
import {appCurrentTheme} from '../../utils/localStorage';
import {LIGHT} from '../../constants/names';

const Properties = () => {
  const [queryString, setQueryString] = useState();
  const router = useRouter();

  useEffect(() => {
    storeName ?? location.reload();
  }, []);

  const {
    data: projectData,
    isError,
    isLoading,
  } = useQuery(['fetchProjectsWithFilters', queryString], () =>
    fetchProjectsWithFilters(queryString)
  );

  const {data: watchlistData, refetch: refetchForWatchlist} = useQuery(
    ['waitlistipoiid'],
    fetchWatchlist
  );

  const isIdWatchlisted = id =>
    watchlistData?.data?.watchlist
      ? watchlistData?.data?.watchlist?.some(item => item.project.id === id)
      : undefined;

  return (
    <LayoutView noPadding>
      <Box
        w="full"
        h={{base: `135px`, lg: '180px'}}
        bgImage={filterBG.src}
        bgPosition={'center'}
        bgSize={'cover'}
        position={'relative'}
      >
        <Box position={'absolute'} opacity={0.5} bg="#0E0E0E" h="full" w="full" />
        <Flex
          position={'absolute'}
          h="full"
          w="full"
          px="100px"
          py="40px"
          direction={'column'}
          zIndex={20}
          align={'center'}
          justify={{base: 'center', lg: 'space-between'}}
        >
          {/* <Box h="50px" display={{base: 'none', lg: 'block'}} /> */}
          <Text
            className="gilda-display-regular"
            fontSize={{base: `23px`, lg: '40px'}}
            pb={{base: `0px`, lg: '20px'}}
            px={`20px`}
            color="#FFF"
            borderBottom={'2.688px solid #FFF'}
            w={{base: 'max-width', lg: '403.188px'}}
            textAlign={'center'}
          >
            Our Offerings
          </Text>
          {/* <Box display={{base: 'none', lg: 'block'}}>
            <FilterList
              filtering={isLoading}
              onFilterChange={setQueryString}
              queryString={queryString}
            />
          </Box> */}
        </Flex>
      </Box>

      <Box
        w="full"
        px={{base: '16px', md: '80px'}}
        py={{base: '16px', md: '50px'}}
        position={'relative'}
      >
        <Box position={'fixed'} bottom={'0px'} zIndex={30} w="100%" right="0" left="0">
          <ValidateCustomerEquity />
          <OffersBar />
          <PendingTransactions />
          <InspectionFeedBack />
        </Box>

        {/* <Flex
          w="full"
          justify="space-between"
          align="center"
          mb="48px"
          display={{base: `none`, lg: `flex`}}
        >
          <Image
            src={featuredListingLeft.src}
            w="40%"
            filter={appCurrentTheme !== LIGHT ? `invert(1)` : ``}
          />
          <Text
            className="gilda-display-regular"
            fontSize="24px"
            fontWeight={400}
            textAlign={`center`}
          >
            Featured listings
          </Text>
          <Image
            src={featuredListingRight.src}
            w="40%"
            filter={appCurrentTheme !== LIGHT ? `invert(1)` : ``}
          />
        </Flex> */}

        {isLoading ? (
          <SimpleGrid
            columns={{base: 1, md: 2, lg: 3}}
            gap={{base: `16px`, md: '40px'}}
            w="full"
            px="auto"
            justify={'center'}
            placeItems="center"
            alignItems="stretch"
          >
            <>
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <Stack key={index} overflow="hidden" pb="23px" spacing="none" w="full">
                  <Skeleton w="full" h="350px" />
                  <HStack mt="20px" px="25px" justify="space-between">
                    <Skeleton spacing="4" w="128px" h="20px" />
                    <HStack>
                      <Skeleton w="20px" h="20px" />
                      <Skeleton w="20px" h="20px" />
                    </HStack>
                  </HStack>
                  <HStack mt="10px" px="25px" spacing="10px" align="end">
                    <Skeleton spacing="4" w="143px" h="45px" />
                    <Skeleton spacing="4" w="78px" h="30px" />
                  </HStack>
                </Stack>
              ))}
            </>
          </SimpleGrid>
        ) : isError ? (
          <ErrorState />
        ) : (
          <>
            {projectData?.data?.project?.length > 0 ? (
              <SimpleGrid
                gap={{base: `16px`, md: '40px'}}
                columns={{base: 1, md: 2, lg: 3}}
                justify={'center'}
                alignItems={'center'}
              >
                {projectData?.data?.project?.map(
                  ({id, name, starting_from, photos, fraction_is_available}) => (
                    <CardThree
                      justifyContent="center"
                      fraction_is_available={fraction_is_available}
                      key={id}
                      id={id}
                      title={name}
                      is_watchlist={isIdWatchlisted(id)}
                      image={photos[0]?.photo}
                      startingFrom={starting_from}
                      refetch={refetchForWatchlist}
                      subtitle={formatToCurrency(starting_from)}
                      onClickCard={() => router.push(`/listing-details/${id}`)}
                    />
                  )
                )}
              </SimpleGrid>
            ) : (
              <EmptyState heading={'Nothing found'} text={`No property was found`} />
            )}
          </>
        )}
      </Box>
    </LayoutView>
  );
};

export default Auth(Properties);
