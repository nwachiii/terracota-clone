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

            <VStack borderRadius={'10px'} align='stretch' mt='38px'>

              <Flex borderRadius='6px' w='full' h='86px' px='16px' py='13px' bg='primary' direction={'column'} color='white' justifyContent={'space-between'} alignItems={'center'}>
                <Text color='text' fontWeight='400' fontSize='10px'>
                  {info?.project?.fraction_is_available ? 'Purchase price' : 'Total paid'}
                </Text>
                <Text color='text' fontSize={{ base: '16px', md: '32px' }} fontWeight='600'>
                  {info?.project?.fraction_is_available ? formatToCurrency(info?.total_unit_price) : formatToCurrency(info?.amount_paid)}
                </Text>
                <Flex w='full' justifyContent={'space-between'} alignItems='center' direction={'row'}>
                  <Text color='text' fontWeight='400' fontSize='10px'>Progress</Text>
                  <Text color='text' fontWeight='400' fontSize='10px'>
                    {AMOUNT_PAID_IN_PERCENTAGE + '%'}
                  </Text>
                </Flex>
                <Box width='100%' bg='#8F8F8F' h='8px' borderRadius='full' overflowX={'hidden'}>
                  <Box width={AMOUNT_PAID_IN_PERCENTAGE + '%'} bg='white' h='full' borderRadius='full' />
                </Box>
              </Flex>
            </VStack>

            <VStack py='10px' px='0px' borderRadius={'10px'} align='stretch' spacing={'30px'} w='full'>
              <Flex bg='card_bg' p='18px' direction='row' w='full' justify={'space-between'}>
                <Flex direction='column'>
                  <Text color='text' fontSize='12px' fontWeight='400' className={'montserrat-regular'}>Due Balance</Text>
                  <Text color='text' fontSize='14px' fontWeight='700' className='montserrat-bold'>
                    {info?.next_due_balance ? `${formatToCurrency(info?.next_due_balance)}` : 'Null'}
                  </Text>
                  <Text color='text' fontSize='13px' fontWeight='400' className={'montserrat-regular'}>Due Date</Text>
                </Flex>
                <Divider orientation='vertical' h='60px' color='text' />
                <Flex direction='column'>
                  <Text textAlign={'right'} color='text' fontSize='12px' fontWeight='400' className={'montserrat-regular'}>Outstanding Balance</Text>
                  <Text textAlign={'right'} color='text' fontSize='14px' fontWeight='700' className='montserrat-bold'>
                    {formatToCurrency(parseInt(info?.current_outstanding_balance))}
                  </Text>
                  <Text textAlign={'right'} color='text' fontSize='13px' fontWeight='400' className={'montserrat-regular'}>
                    {info?.next_due_date && formatDateToString(info?.next_due_date)}
                  </Text>
                </Flex>
              </Flex>

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

              <Flex
                px='10px' py='8px' color='text'
                align='center' gap='10px'
                border={'1px solid'}
                cursor={'pointer'}
                onClick={depositModal.onOpen}
              >
                <Image alt='next_image' src={appCurrentTheme === LIGHT ? deposit.src : depositLight.src} w='20px' h='20px' />
                <VStack spacing='4px' align={'flex-start'}>
                  <Text fontSize='14px' fontWeight='600'>Make a Deposit</Text>
                  <Text fontSize='11px' textAlign='left' fontWeight='400'>Make a Deposit by transfer or card payment</Text>
                </VStack>
              </Flex>
              {info?.auto_debit ? (
                <Flex
                  border={'1px solid'} align='center'
                  px='10px' py='8px' color='text'
                  gap='16px' cursor={'pointer'}
                >
                  <Image alt='next_image' src={appCurrentTheme === LIGHT ? share.src : shareLight.src} w='20px' h='20px' />
                  <VStack spacing='4px' align={'flex-start'}>
                    <Text fontSize='14px' fontWeight='600'>Auto-Pay</Text>
                    <Text fontSize='11px' textAlign='left' fontWeight='400'>
                      By disabling your auto-pay, you  won’t automatically be debited from your fund source.
                    </Text>
                  </VStack>
                  {DisableAutoDebit.isLoading ? <ThreeDots /> : (
                    <ToggleButton
                      inactiveLabel={""}
                      activeLabel={""}
                      colors={{
                        activeThumb: { base: color.primary },
                        inactiveThumb: { base: "rgba(147, 33, 40, 0.05)" },
                        active: { bsase: "rgba(147, 33, 40, 0.05)" },
                        inactive: { base: "#D9D9D9" },
                      }}
                      trackStyle={{ height: "12px", width: "30px" }}
                      thumbStyle={{ height: "20px", width: "20px" }}
                      thumbAnimateRange={[8, 20]}
                      value={info?.auto_debit}
                      disabled={DisableAutoDebit.isLoading}
                      onToggle={() => DisableAutoDebit.mutate({ auto_debit: false, })}
                    />
                  )}
                </Flex>
              ) : (
                <Flex
                  onClick={recurringModal.onOpen}
                  px='10px' py='8px' color='text'
                  align='center' gap='10px'
                  border={'1px solid'}
                  cursor={'pointer'}
                >
                  <Image alt='next_image' src={appCurrentTheme === LIGHT ? share.src : shareLight.src} w='20px' h='20px' />
                  <VStack spacing='4px' align={'flex-start'}>
                    <Text fontSize='14px' fontWeight='600'>Set Recurring Deposit</Text>
                    <Text fontSize='11px' textAlign='left' fontWeight='400'>
                      By enabling  recurring deposit, you would automatically be debited from your fund source.
                    </Text>
                  </VStack>
                </Flex>
              )}
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