import React from 'react'
import { Box, Flex, Text, Image, VStack, SimpleGrid, useDisclosure, useToast, GridItem, Center, Divider } from '@chakra-ui/react'
import { CustomizableButton, Spinner } from '../../../ui-lib/ui-lib.components'
import share from '../../../images/share.svg';
import shareLight from '../../../images/share-light.svg';
import deposit from '../../../images/make-a-depo-img.svg';
import depositLight from '../../../images/make-a-depo-img-light.svg';
import LayoutView from '../../../components/layout'
import homeOwner from '../../../images/home-owner.svg'
import homeOwnerLight from '../../../images/home-owner-light.svg'
import giveFeedback from '../../../images/give-feedback.svg'
import giveFeedbackLight from '../../../images/give-feedback-light.svg'
import { useMutation, useQuery } from 'react-query';
import { fetchEquity } from '../../../api/listing';
import { useRouter } from 'next/router';
import { formatToCurrency } from '../../../utils';
import { formatDateToString } from '../../../utils/formatDate';
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
import Mobile from './mobile'
import AssetCarousel from '../../../components/assetCarousel';
import { appCurrentTheme } from '../../../utils/localStorage';
import { LIGHT } from '../../../constants/names';
import { color } from '../../../theme/colors';


const Allocations = () => {
  const { query } = useRouter();
  const recurringModal = useDisclosure();
  const depositModal = useDisclosure();
  const PICK_ALLOCATION_MODAL = useDisclosure()
  const toast = useToast()
  const homeOwnersPacketModal = useDisclosure();
  const { data, isLoading, isError, refetch } = useQuery(['fetchUserEquity', query?.id], () => fetchEquity(query?.id));
  const info = data?.data;
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
    <>
      <Mobile />
      <LayoutView noPadding display={{ base: 'none', md: 'flex' }}>

        <Text mt='30px' textAlign={'center'} className='gilda-display-regular' color='#232323' fontSize={'48px'} fontWeight={400}>{info?.project?.name}</Text>
        <Text textAlign={'center'} fontSize={'20px'} fontWeight={500} color={'#232323B2'} className='montserrat-regular'>{info?.unit?.unit_title}</Text>

        <Box w='full' px={{ base: '20px', md: "80px" }} py={{ base: '20px', md: "30px" }}>
          {isLoading ? <Spinner /> : isError ? <ErrorState /> : (
            <>
              <Box w={'100%'} mx='auto'>

                <Box position={'relative'} w='full'>
                  <Center w='full' h='full' position={'absolute'} zIndex={20} mx='auto'>
                    <Box w='526px' h='auto'>
                      <Flex
                        py='23px' alignItems={'center'}
                        w='full' h='170px' px='30px'
                        bg='rgba(255, 255, 255, 0.85)' direction={'column'} color='#191919'
                        justifyContent={'space-evenly'}
                      >
                        <Box>
                          <Text fontWeight='400' textAlign='center' fontSize='13px' color='#191919'>
                            {'Total paid'}
                          </Text>
                          <Text fontSize='40px' fontWeight='400' textAlign='center' color='#191919' className='gilda-display-medium'>
                            {formatToCurrency(info?.amount_paid)}
                          </Text>
                        </Box>
                        <Flex w='full' justifyContent={'space-between'} alignItems='center' direction={'row'}>
                          <Text fontWeight='500' fontSize='13px'>Payment progress</Text>
                          <Text fontWeight='500' fontSize='13px'>
                            {AMOUNT_PAID_IN_PERCENTAGE + '%'}
                          </Text>
                        </Flex>
                        <Box width='100%' bg='#E4E4E4' h='12px' borderRadius='full' overflowX={'hidden'}>
                          <Box width={AMOUNT_PAID_IN_PERCENTAGE + '%'} bg='#0D0D0D' h='full' borderRadius='full' />
                        </Box>
                      </Flex>


                      <Flex bg='rgba(255, 255, 255, 0.85)' p='24px' mt='12px' flexDirection={'column'} gap='16px' justify={'stretch'}>
                        <Flex direction='row' w='full' justify={'space-between'}>
                          <Flex direction='column'>
                            <Text color='#111' fontSize='13px' fontWeight='500'>Next due Balance</Text>
                            <Text color='text' fontSize='23px' fontWeight='400' className='gilda-display-medium'>
                              {info?.next_due_balance ? `${formatToCurrency(info?.next_due_balance)}` : 'Null'}
                            </Text>
                            <Text color='#111111' opacity={0.8} fontSize='11px' fontWeight='400' mt='4px'>Next due Balance</Text>
                            <Text color='#111111' fontSize='13px' fontWeight='500'>
                              {info?.next_due_date && formatDateToString(info?.next_due_date)}
                            </Text>
                          </Flex>

                          <Box h='100px' borderRight={'1px solid #111111'} opacity={0.3} />

                          <Flex direction='column'>
                            <Text color='#111' fontSize='13px' fontWeight='500'>Total Outstanding Balance</Text>
                            <Text color='text' fontSize='23px' fontWeight='400' className='gilda-display-medium'>
                              {formatToCurrency(parseInt(info?.current_outstanding_balance))}
                            </Text>
                            <Text color='#111111' opacity={0.8} fontSize='11px' fontWeight='400' mt='4px'>Next due Balance</Text>
                            <Text color='#111111' fontSize='13px' fontWeight='500'>
                              {info?.next_due_date && formatDateToString(info?.next_due_date)}
                            </Text>
                          </Flex>
                        </Flex>

                        <Flex direction={'row'} justify={'center'} align={'center'} gap='18px'>
                          <CustomizableButton
                            w='50%' className='inter-semibold'
                            borderRadius='0' borderColor='#E4E4E4'
                            border={'1px solid #191919 !important'}
                            fontSize={{ base: '', md: '14px' }}
                            onClick={depositModal.onOpen}
                            color='#111926' h='50px' bg='transparent'
                            leftIcon={<Image alt='next_image' src={appCurrentTheme === LIGHT ? deposit.src : depositLight.src} w='24px' h='24px' />}
                          >Make a Deposit</CustomizableButton>

                          {info?.auto_debit ? (
                            <CustomizableButton
                              w='50%' className='inter-semibold'
                              borderRadius='0' borderColor='#E4E4E4'
                              border={'1px solid #191919 !important'}
                              fontSize={{ base: '', md: '14px' }}
                              color='#111926' h='50px' bg='transparent'
                              onClick={() => DisableAutoDebit.mutate({ auto_debit: false, })}
                              leftIcon={<Image alt='next_image' src={appCurrentTheme === LIGHT ? share.src : shareLight.src} w='24px' h='24px' />}
                            // rightIcon={DisableAutoDebit.isLoading ? <ThreeDots /> : (
                            //   <ToggleButton
                            //     inactiveLabel={""}
                            //     activeLabel={""}
                            //     colors={{
                            //       activeThumb: { base: color.primary },
                            //       inactiveThumb: { base: "rgba(147, 33, 40, 0.05)" },
                            //       active: { bsase: "rgba(147, 33, 40, 0.05)" },
                            //       inactive: { base: "#D9D9D9" },
                            //     }}
                            //     trackStyle={{ height: "7px", width: "25px" }}
                            //     thumbStyle={{ height: "10px", width: "10px" }}
                            //     thumbAnimateRange={[18, 18]}
                            //     value={info?.auto_debit}
                            //     disabled={DisableAutoDebit.isLoading}
                            //     onToggle={() => DisableAutoDebit.mutate({ auto_debit: false, })}
                            //   />
                            // )}
                            >Disable Auto-pay</CustomizableButton>
                          ) : (
                            <CustomizableButton
                              w='50%' className='inter-semibold'
                              borderRadius='0' borderColor='#E4E4E4'
                              border={'1px solid #191919 !important'}
                              fontSize={{ base: '', md: '14px' }}
                              onClick={recurringModal.onOpen}
                              color='#111926' h='50px' bg='transparent'
                              leftIcon={<Image alt='next_image' src={appCurrentTheme === LIGHT ? share.src : shareLight.src} w='24px' h='24px' />}
                            >Set Recurring Deposit</CustomizableButton>
                          )}

                        </Flex>
                      </Flex>
                    </Box>

                  </Center>
                  <AssetCarousel
                    top='0'
                    right='0'
                    leftItem={(
                      <Text fontWeight={600} fontSize={'26px'} className='gilda-display-semibold'>{info?.unit?.unit_title}</Text>
                    )}
                    rightItem={(
                      <Text fontWeight={500} fontSize={'26px'} className='gilda-display-medium'>
                        Offer Price: {' '}{formatToCurrency(info?.total_unit_price)}
                      </Text>
                    )}
                    slideImages={slideImages}
                  />
                </Box>

                <SimpleGrid px='60px' columns={{ base: 1, md: 5 }} gap='84px' mt='48px' w='97%' mx='auto' bg='background'>
                  <GridItem colSpan={2}>
                    <VStack
                      border='1px solid #E4E4E4 !important'
                      boxShadow={'0px 1px 2px 0px rgba(16, 24, 40, 0.05)'}
                      py='24px' px='32px'
                      align='stretch' spacing={'30px'} w='full'
                    >
                      <Box>
                        <Text fontSize={'16px'} fontWeight={400} color='#191919' opacity={0.6}>Unit price</Text>
                        <Text fontSize={'40px'} className='gilda-display-regular' mt='5px'>{formatToCurrency(info?.total_unit_price)}</Text>
                      </Box>
                      <VStack w='full' divider={<Divider />} spacing={'16px'}>
                        <Flex direction='row' w='full' justify={'space-between'}>
                          <Text fontSize='16px' fontWeight='400' w='60%' color='text'>Unit title</Text>
                          <Text fontSize='16px' fontWeight='500' color='text'>
                            {info?.unit && info?.unit?.unit_title}
                          </Text>
                        </Flex>
                        <Flex direction='row' w='full' justify={'space-between'}>
                          <Text fontSize='16px' fontWeight='400' w='60%' color='text'>Unit size</Text>
                          <Text fontSize='16px' fontWeight='500' color='text'>
                            {info?.unit && info?.unit?.unit_size} SQM
                          </Text>
                        </Flex>
                        <Flex direction='row' w='full' justify={'space-between'}>
                          <Text fontSize='16px' fontWeight='400' w='60%' color='text'>Investment Date</Text>
                          <Text fontSize='16px' fontWeight='500' color='text'>
                            {info?.unit?.created_at && formatDateToString(info?.created_at)}
                          </Text>
                        </Flex>
                      </VStack>


                      <SelectAllocation
                        PICK_ALLOCATION_MODAL={PICK_ALLOCATION_MODAL}
                        equity={info}
                        refetch={refetch}
                      />


                      <Flex gap='10px' mt='35px'>
                        <CustomizableButton
                          w='50%' className='inter-semibold'
                          borderRadius='0' borderColor='#E4E4E4'
                          border={'1px solid #E4E4E4 !important'}
                          fontSize={{ base: '', md: '14px' }}
                          onClick={homeOwnersPacketModal.onOpen}
                          color='#111926' h='50px' bg='#F0F0F0'
                          leftIcon={<Image alt='next_image' src={appCurrentTheme === LIGHT ? homeOwner.src : homeOwnerLight.src} />}
                        >Home Owners Packet</CustomizableButton>
                        <CustomizableButton
                          w='50%' className='inter-semibold'
                          borderRadius='0' borderColor='#E4E4E4'
                          border={'1px solid #E4E4E4 !important'}
                          fontSize={{ base: '', md: '14px' }}
                          onClick={feedModal.onOpen}
                          color='#111926' h='50px' bg='#F0F0F0'
                          leftIcon={<Image alt='next_image' src={appCurrentTheme === LIGHT ? giveFeedback.src : giveFeedbackLight.src} />}
                        >Give Feedback</CustomizableButton>
                      </Flex>
                    </VStack>
                  </GridItem>

                  <GridItem colSpan={3}>
                    <Transactions equityId={info?.id} />
                  </GridItem>

                </SimpleGrid>
              </Box>
              <RecurringModal refetch={refetch} equity={info} recurringModal={recurringModal} />
              <HomeOwnersPacket equityId={info?.id} modal={homeOwnersPacketModal} />
              <PurchaseFeedback equity={info} feedModal={feedModal} />
            </>
          )}
        </Box>

        <MakeDepositModal info={info} depositModal={depositModal} />
      </LayoutView>
    </>
  )
}

export default Auth(Allocations)