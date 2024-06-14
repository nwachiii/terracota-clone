import React from 'react'
import { Box, Flex, Text, Image, VStack, useDisclosure, Center, Divider } from '@chakra-ui/react'
import { CustomizableButton, Spinner } from '../../../ui-lib/ui-lib.components'
import LayoutView from '../../../components/layout'
import homeOwner from '../../../images/home-owner.svg'
import homeOwnerLight from '../../../images/home-owner-light.svg'
import giveFeedback from '../../../images/give-feedback.svg'
import giveFeedbackLight from '../../../images/give-feedback-light.svg'
import { useQuery } from 'react-query';
import { fetchEquity } from '../../../api/listing';
import { useRouter } from 'next/router';
import { formatToCurrency } from '../../../utils';
import { formatDateToString } from '../../../utils/formatDate';
import MakeDepositModal from '../sections/MakeDeposit';
import HomeOwnersPacket from '../sections/HomeOwnersPacket';
import ErrorState from '../../../components/appState/error-state';
import RecurringModal from '../sections/recurringModal';
import Auth from '../../../hoc/Auth';
import SelectAllocation from '../allocations/SelectAllocation';
import PurchaseFeedback from '../../../components/drawers/purchaseFeedback';
import Mobile from './mobile'
import AssetCarousel from '../../../components/assetCarousel';
import { appCurrentTheme } from '../../../utils/localStorage';
import { LIGHT } from '../../../constants/names';


const Allocations = () => {
  const { query } = useRouter();
  const recurringModal = useDisclosure();
  const depositModal = useDisclosure();
  const PICK_ALLOCATION_MODAL = useDisclosure()
  const homeOwnersPacketModal = useDisclosure();
  const { data, isLoading, isError, refetch } = useQuery(['fetchUserEquity', query?.id], () => fetchEquity(query?.id));
  const info = data?.data;
  const feedModal = useDisclosure();

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
                      <VStack
                        bg='rgba(255, 255, 255, 0.85)'
                        border='1px solid #E4E4E4 !important'
                        boxShadow={'0px 1px 2px 0px rgba(16, 24, 40, 0.05)'}
                        py='24px' px='32px'
                        align='stretch' spacing={'30px'} w='full'
                      >
                        <Box>
                          <Text textAlign={'center'} fontSize={'16px'} fontWeight={400} color='#191919' opacity={0.6}>Unit price</Text>
                          <Text textAlign={'center'} fontSize={'40px'} className='gilda-display-regular' mt='5px'>{formatToCurrency(info?.total_unit_price)}</Text>
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