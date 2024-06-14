import React from 'react'
import { Box, Flex, Text, Image, VStack, useDisclosure, useToast, Center, Divider } from '@chakra-ui/react'
import { Button, Spinner } from '../../../ui-lib/ui-lib.components'
import share from '../../../images/share.svg';
import shareLight from '../../../images/share-light.svg';
import deposit from '../../../images/make-a-depo-img.svg';
import depositLight from '../../../images/make-a-depo-img-light.svg';
import UnitAllocation from '../modals/unitAllocation'
import ConfirmAlloc from '../modals/confirm'
import dueBalance from '../../../images/due-balance.png'
import homeOwner from '../../../images/home-owner.svg'
import homeOwnerLight from '../../../images/home-owner-light.svg'
import giveFeedback from '../../../images/give-feedback.svg'
import giveFeedbackLight from '../../../images/give-feedback-light.svg'
import { useMutation, useQuery } from 'react-query';
import { fetchUserEquity } from '../../../api/listing';
import { useRouter } from 'next/router';
import { formatToCurrency } from '../../../utils';
import { formatDate, formatDateToString } from '../../../utils/formatDate';
import Transactions from '../sections/transactions';
import MakeDepositModal from '../sections/MakeDeposit';
import HomeOwnersPacket from '../sections/HomeOwnersPacket';
import ErrorState from '../../../components/appState/error-state';
import RecurringModal from '../sections/recurringModal';
import { setUpRecurring } from '../../../api/Settings';
import Auth from '../../../hoc/Auth';
import ThreeDots from '../../../components/loaders/ThreeDots';
import ToggleButton from "react-toggle-button";
import SelectAllocation from '../allocations/SelectAllocation';
import PurchaseFeedback from '../../../components/drawers/purchaseFeedback';
import AssetCarouselMobile from '../../../components/assetCarousel/mobile';
import { appCurrentTheme } from '../../../utils/localStorage';
import { LIGHT } from '../../../constants/names';
import { color } from '../../../theme/colors';

const AssetManagementMobile = () => {
  const { query } = useRouter();
  const recurringModal = useDisclosure();
  const allocationModal = useDisclosure();
  const confirmModal = useDisclosure();
  const depositModal = useDisclosure();
  const PICK_ALLOCATION_MODAL = useDisclosure()
  const toast = useToast()
  const homeOwnersPacketModal = useDisclosure();
  const { data, isLoading, isError, refetch } = useQuery(['fetchUserEquity', query?.status, query?.id], () => fetchUserEquity(query?.status));
  const USER_EQUITY = data && data?.data?.results;
  const FILTERED_EQUITY = USER_EQUITY?.length > 0 ? USER_EQUITY.filter((item) => item.id == query?.id) : null;
  const info = FILTERED_EQUITY && FILTERED_EQUITY[0];
  const AMOUNT_PAID_IN_PERCENTAGE = ((info?.amount_paid / info?.total_unit_price) * 100).toFixed(2);
  const feedModal = useDisclosure();

  const DisableAutoDebit = useMutation(
    (formData) => setUpRecurring(info?.id, formData),
    {
      onSuccess: (res) => {
        toast({
          title: `Recurring payments has been disabled!`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        refetch()
      },
      onError: (err) => {
        toast({
          title: `Faild to disable recurring payments...`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      },
    }
  );

  const slideImages = info?.project?.photos?.map(image => ({
    original: image.photo,
    thumbnail: image.photo,
  })) || []


  return (
    <Box
      pb={{ base: "200px", md: '50px' }} bg="background" h={"100%"} minH="100vh"
      minInlineSize={"fit-content"} color="black"
      px='1rem' pt='20px' display={{ base: 'block', lg: 'none' }}
    >
      {isLoading ? <Spinner /> : isError ? !USER_EQUITY?.length || !FILTERED_EQUITY?.length ? <Center>No equity</Center> : <ErrorState /> : (
        <>
          <Box>
            <AssetCarouselMobile
              leftItem={(
                <Text fontSize={'12px'} fontWeight={600} color='#fff'>
                  {info?.unit?.unit_title}
                </Text>
              )}
              rightItem={(
                <Text fontSize={'12px'} fontWeight={400} color='#fff'>
                  Offer Price: {' '}{formatToCurrency(info?.total_unit_price)}
                </Text>
              )}
              slideImages={slideImages}
            />

            <VStack mt='20px' py='10px' px='0px' borderRadius={'10px'} align='stretch' spacing={'30px'} w='full'>
              <VStack w='full' divider={<Divider />}>
                <Flex direction='row' w='full' justify={'space-between'}>
                  <Text fontSize='11px' fontWeight='400' w='60%' color='text'>Unit title</Text>
                  <Text fontSize='11px' fontWeight='500' color='text'>
                    {info?.unit && info?.unit?.unit_title}
                  </Text>
                </Flex>
                <Flex direction='row' w='full' justify={'space-between'}>
                  <Text fontSize='11px' fontWeight='400' w='60%' color='text'>Unit size</Text>
                  <Text fontSize='11px' fontWeight='500' color='text'>
                    {info?.unit && info?.unit?.unit_size} SQM
                  </Text>
                </Flex>
                <Flex direction='row' w='full' justify={'space-between'}>
                  <Text fontSize='11px' fontWeight='400' w='60%' color='text'>Investment Date</Text>
                  <Text fontSize='11px' fontWeight='500' color='text'>
                    {info?.unit?.created_at && formatDateToString(info?.created_at)}
                  </Text>
                </Flex>
              </VStack>

              <SelectAllocation
                PICK_ALLOCATION_MODAL={PICK_ALLOCATION_MODAL}
                equity={info}
                refetch={refetch}
              />

              <Flex gap='7px' mt='35px'>
                <Button
                  w='100%' fontSize='10px'
                  borderRadius='0' borderColor='text'
                  border={'1px solid !important'}
                  onClick={homeOwnersPacketModal.onOpen}
                  color='text' h='40px'
                  leftIcon={<Image w='15px' h='15px' alt='next_image' src={appCurrentTheme === LIGHT ? homeOwner.src : homeOwnerLight.src} />}
                >Home Owners Packet</Button>
                <Button
                  w='100%' fontSize='10px'
                  borderRadius='0' borderColor='text'
                  border={'1px solid !important'}
                  onClick={feedModal.onOpen}
                  color='text' h='40px'
                  leftIcon={<Image w='15px' h='15px' alt='next_image' src={appCurrentTheme === LIGHT ? giveFeedback.src : giveFeedbackLight.src} />}
                >Give Feedback</Button>
              </Flex>
            </VStack>

            <Box mt='25px'>
              <Transactions equityId={info?.id} />
            </Box>
          </Box>
          <RecurringModal refetch={refetch} equity={info} recurringModal={recurringModal} />
          <HomeOwnersPacket equityId={info?.id} modal={homeOwnersPacketModal} />
          <UnitAllocation allocationModal={allocationModal} confirmModal={confirmModal} />
          <ConfirmAlloc confirmModal={confirmModal} />
          <PurchaseFeedback equity={info} feedModal={feedModal} />
        </>
      )}

      <MakeDepositModal info={info} depositModal={depositModal} />
    </Box>
  );
}

export default Auth(AssetManagementMobile)