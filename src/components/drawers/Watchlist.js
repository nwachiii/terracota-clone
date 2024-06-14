import {
  Image,
  VStack,
  HStack,
  Text,
  useToast,
  Flex,
  Center,
  Stack,
  useMediaQuery,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import {useRef, useState} from 'react';
import EmptyState from '../appState/empty-state';
import {formatToCurrency} from '../../utils';
import ErrorState from '../appState/error-state';
import {Spinner} from '../../ui-lib';
import {Drawer, DrawerOverlay, DrawerContent, Box} from '@chakra-ui/react';
import {ArrowBackIcon, ArrowForwardIcon, CloseIcon} from '@chakra-ui/icons';
import {fetchWatchlist} from '../../api/watchlist';

const Watchlist = ({isWatchOpen, onWatchClose, onDrawerOpen}) => {
  const router = useRouter();
  const toast = useToast();
  const [scrollPosition1, setScrollPosition1] = useState(0);
  const {data, isError, isLoading} = useQuery(['waitlistipoiid'], fetchWatchlist);
  const dataToUse = data?.data?.watchlist;
  const readScollToRef1 = useRef();

  const handleMostReadScroll = scrollAmount => {
    const newScrollPosition = scrollPosition1 + scrollAmount;
    setScrollPosition1(newScrollPosition);
    readScollToRef1.current.scrollLeft = newScrollPosition;
  };

  if (data?.code === 'ERR_NETWORK') {
    toast({
      title: `${data?.message}`,
      description: ` please check your network connection`,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  }

  const [isNotMobile] = useMediaQuery('(min-width: 768px)');

  return (
    <Drawer
      autoFocus={false}
      placement="right"
      isCentered={false}
      scrollBehavior="inside"
      isOpen={isWatchOpen}
      onClose={onWatchClose}
    >
      <DrawerOverlay />
      <DrawerContent
        top="unset !important"
        bottom={{base: '0', md: '24px !important'}}
        right={{base: '0', md: '24px !important'}}
        w="full"
        h={'full'}
        p="16px"
        maxW={{base: '100vw', md: '500px'}}
        maxH={{base: '620px', md: '515px'}}
        bg={{base: '#FFF', md: '#FBFCFC'}}
        boxShadow={{base: 'none', md: 'md'}}
        minH={'320px'}
      >
        <Flex
          p="10px"
          w="full"
          minH={{md: '115.698px !important'}}
          bg={{md: '#0E0E0E'}}
          justify={'space-between'}
          align={'center'}
        >
          {isNotMobile && <Box />}
          <Text
            fontSize={'25px'}
            fontWeight={400}
            display={{base: 'flex', md: 'none'}}
            className="gilda-display-regular"
          >
            Watchlist
          </Text>

          <Center display={{base: 'none', md: 'flex'}} flexDirection={'column'}>
            <Text fontSize={'14px'} fontWeight={400} color="#fff" className="gilda-display-regular">
              {isNotMobile ? '' : 'My'} Watchlist
            </Text>
            <Box borderBottom={'1px solid #fff'} w="140px" mt="12px" />
          </Center>

          <CloseIcon
            alignSelf={'flex-start'}
            cursor="pointer"
            fontSize={{base: 16, md: 12}}
            color={{base: '#000', md: '#fff'}}
            onClick={onWatchClose}
            mt={{base: 2, md: 0}}
          />
        </Flex>

        {isLoading ? (
          <VStack w="80vw">
            <Spinner noAbsolute />
          </VStack>
        ) : isError ? (
          <ErrorState />
        ) : (
          <Box alignItems={'center'} mt="24px">
            {dataToUse?.length > 0 ? (
              <>
                <Stack
                  direction={{base: 'column', md: 'row'}}
                  overflowX={'scroll'}
                  overflowY={{base: 'scroll', md: 'hidden'}}
                  scrollBehavior={'smooth'}
                  className="hide_scroll"
                  ref={readScollToRef1}
                >
                  <Stack
                    direction={{base: 'column', md: 'row'}}
                    h={{base: '600px', md: '278px'}}
                    spacing="16px"
                    alignItems={'center'}
                  >
                    {(dataToUse || [])?.map(data => (
                      <Flex
                        boxShadow={{md: '0px 3.138px 6.276px 0px rgba(0, 0, 0, 0.07)'}}
                        w={{base: 'full', md: '202px'}}
                        h={{base: '98px', md: '275px'}}
                        bg="white"
                        onClick={() => router.push(`/listing-details/${data?.project?.id}`)}
                        cursor="pointer"
                        direction={{base: 'row', md: 'column'}}
                        align={{base: 'center', md: 'start'}}
                        gap={{base: 4, md: 'unset'}}
                        rounded={{base: '2px', md: 0}}
                        border={{base: '1px solid #E4E4E4', md: 'none !important'}}
                        p={{base: '16px', md: '0'}}
                      >
                        <Image
                          boxSize={{base: '64px', md: '200px'}}
                          alt="next_image"
                          src={data?.project.photos[0].photo}
                        />
                        <VStack align="stretch" spacing={'4px'} px="8px" py="9px">
                          <Text
                            fontSize={{base: '18px', md: '12px'}}
                            fontWeight="400"
                            className="gilda-display-regular"
                            color="text"
                          >
                            {data?.project?.name}
                          </Text>
                          <Text
                            fontSize={{base: 14, md: 12}}
                            fontWeight="400"
                            fontFamily={{base: 'Montserrat', md: 'Gilda Display'}}
                            color="text"
                          >
                            {isNotMobile ? 'Starting from' : ''}{' '}
                            {`${formatToCurrency(data?.project.starting_from)}`}
                          </Text>
                        </VStack>
                      </Flex>
                    ))}
                  </Stack>
                </Stack>

                {isNotMobile && (
                  <HStack spacing={'15px'} justify={'flex-end'}>
                    <Center
                      cursor={'pointer'}
                      onClick={() => handleMostReadScroll(-202)}
                      h="36px"
                      w="36px"
                      borderRadius={'full'}
                      bg="#191919"
                      color="white"
                    >
                      <ArrowBackIcon fontWeight={700} />
                    </Center>

                    <Center
                      cursor={'pointer'}
                      onClick={() => handleMostReadScroll(202)}
                      h="36px"
                      w="36px"
                      borderRadius={'full'}
                      bg="#191919"
                      color="white"
                    >
                      <ArrowForwardIcon fontWeight={700} />
                    </Center>
                  </HStack>
                )}
              </>
            ) : (
              <EmptyState
                height="300px"
                text={`Looks like you haven't bought anything yet.`}
              />
            )}
          </Box>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default Watchlist;
