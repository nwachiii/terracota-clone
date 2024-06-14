import React, {useEffect, useState} from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  VStack,
  SimpleGrid,
  useDisclosure,
  GridItem,
  Center,
  Divider,
  HStack,
  Hide,
  useMediaQuery,
  Button,
} from '@chakra-ui/react';

import LayoutView from '../../../components/layout';
import homeOwner from '../../../images/home-owner.svg';
import homeOwnerLight from '../../../images/home-owner-light.svg';
import giveFeedback from '../../../images/give-feedback.svg';
import giveFeedbackLight from '../../../images/give-feedback-light.svg';
import {useQuery} from 'react-query';
import {fetchEquity, fetchFractionalInfo} from '../../../api/listing';
import {useRouter} from 'next/router';

import MakeDepositModal from '../sections/MakeDeposit';
import HomeOwnersPacket from '../sections/HomeOwnersPacket';
import ErrorState from '../../../components/appState/error-state';
import RecurringModal from '../sections/recurringModal';
import Auth from '../../../hoc/Auth';
import SelectAllocation from '../allocations/SelectAllocation';
import PurchaseFeedback from '../../../components/drawers/purchaseFeedback';
import Mobile from './mobile';
import AssetCarousel from '../../../components/assetCarousel';
import {appCurrentTheme} from '../../../utils/localStorage';
import {LIGHT} from '../../../constants/names';
import AssetHeader from '../../../components/manageAssets/components/assetHeader';
import AssetWrapper from '../../../components/manageAssets/components/layoutWrapper/assetWrapper';
import AssetInfoWrapper from '../../../components/manageAssets/components/layoutWrapper/assetInfoWrapper';
import AssetOverviewWrapper from '../../../components/manageAssets/components/layoutWrapper/assetOverviewWrapper';
import OutrightTransactionInfo from '../../../components/manageAssets/outrightTransactionInfo';

import Allocations from '../../../components/manageAssets/components/allocation';
import {Spinner} from '../../../ui-lib';

const absoluteStyle = {
  top: '20vh',
};

const OutrightAsset = () => {
  const {query} = useRouter();
  const [displayTab, setDisplayTab] = useState('transaction');

  const recurringModal = useDisclosure();

  const depositModal = useDisclosure();

  const homeOwnersPacketModal = useDisclosure();
  const {data, isLoading, isError, refetch} = useQuery(
    ['fetchUserEquity', query?.id],
    () => fetchEquity(query?.id),
    {enabled: !!query?.id}
  );
  const info = data?.data;
  const feedModal = useDisclosure();

  const handleDisplaySwitch = prop => () => setDisplayTab(prop);

  // useEffect(() => {

  //   if (isBelowMd) {
  //     setDisplayTab("transaction");
  //   } else {
  //     setDisplayTab("both");
  //   }
  // }, [isBelowMd]);

  const OVERVIEWINFO = [
    // {
    //   label: 'Property Type',
    //   value: info?.project?.building_type ?? '-',
    // },
    {
      label: 'Land Title',
      value: info?.project?.land_title ?? '-',
    },
    {
      label: 'Development Stage',
      value: info?.project?.status ?? '-',
    },
    {
      label: 'Unit size',
      value: `${info?.project?.land_size ?? '-'} sqm`,
    },

    {
      label: 'Allocated Unit',
      component: <Allocations equity={info} refetch={refetch} />,
    },
  ];

  const navBarStyle = {
    desktop: {
      display: {base: 'none', xl: 'flex'},
    },
    mobile: {
      display: 'none',
    },
  };

  return (
    <>
      <LayoutView spacing="0px" navBarStyle={navBarStyle} noPadding>
        <AssetWrapper>
          {isError ? (
            <ErrorState />
          ) : isLoading || !info ? (
            <Spinner absoluteStyle={absoluteStyle} color="#DDB057" />
          ) : (
            <>
              <AssetHeader
                listingName={info?.project?.name ?? '-'}
                unitName={info?.unit?.unit_title ?? '-'}
                bgImg={info?.project?.photos?.[0]?.photo}
              />

              <AssetInfoWrapper
                maxW="1305px"
                spacing="31.3px"
                pt={{base: '0px', xl: '42.75px'}}
                displayTab={displayTab}
                handleDisplaySwitch={handleDisplaySwitch}
              >
                <AssetOverviewWrapper
                  overviewInfo={OVERVIEWINFO}
                  spacing={{base: '24px', xl: '23.5px'}}
                  p={{xl: '23.5px'}}
                  maxH={{base: 'full', xl: '365px'}}
                  maxW={{base: 'full', xl: '646.13px'}}
                  w={{base: 'full', xl: 'full'}}
                  display={{
                    base: displayTab === 'overview' ? 'block' : 'none',
                    xl: 'block',
                  }}
                >
                  <Flex gap={{base: '16px', xl: '15.2px'}}>
                    <Button
                      w="50%"
                      className="inter-semibold"
                      _hover={{
                        bg: 'transparent',
                      }}
                      _focus={{
                        bg: 'transparent',
                        border: {
                          base: '0.648px solid #C3C3C3 !important',
                          xl: '0.95px solid #C3C3C3 !important',
                        },
                      }}
                      _active={{
                        bg: 'transparent',
                        border: {
                          base: '0.648px solid #C3C3C3 !important',
                          xl: '0.95px solid #C3C3C3 !important',
                        },
                      }}
                      borderRadius="0"
                      borderColor="#C3C3C3"
                      border={{base: '0.648px solid #C3C3C3', xl: '0.95px solid #C3C3C3'}}
                      fontSize={{base: '9.5px', sm: '12px', md: '13.197px'}}
                      onClick={homeOwnersPacketModal.onOpen}
                      color="#111926"
                      h={{base: '48px', xl: '41.79px'}}
                      bg="transparent"
                      fontWeight="400"
                      iconSpacing={{base: '10.68px', xl: '15.2px'}}
                      leftIcon={
                        <Image
                          alt="next_image"
                          boxSize={{base: '16px', xl: '22.795px'}}
                          src={appCurrentTheme === LIGHT ? homeOwner.src : homeOwnerLight.src}
                        />
                      }
                    >
                      Home Owners Packet
                    </Button>
                    <Button
                      w="50%"
                      className="inter-semibold"
                      _hover={{
                        bg: 'transparent',
                      }}
                      _focus={{
                        bg: 'transparent',
                        border: {
                          base: '0.648px solid #C3C3C3 !important',
                          xl: '0.95px solid #C3C3C3 !important',
                        },
                      }}
                      _active={{
                        bg: 'transparent',
                        border: {
                          base: '0.648px solid #C3C3C3 !important',
                          xl: '0.95px solid #C3C3C3 !important',
                        },
                      }}
                      borderRadius="0"
                      borderColor="#C3C3C3"
                      border={{base: '0.648px solid #C3C3C3', xl: '0.95px solid #C3C3C3'}}
                      fontSize={{base: '9.5px', sm: '12px', md: '13.197px'}}
                      onClick={feedModal.onOpen}
                      color="#111926"
                      fontWeight="400"
                      h={{base: '48px', xl: '41.79px'}}
                      bg="transparent"
                      leftIcon={
                        <Image
                          alt="next_image"
                          boxSize={{base: '16px', xl: '22.795px'}}
                          src={appCurrentTheme === LIGHT ? giveFeedback.src : giveFeedbackLight.src}
                        />
                      }
                    >
                      Give Feedback
                    </Button>
                  </Flex>
                </AssetOverviewWrapper>

                <OutrightTransactionInfo displayTab={displayTab} />
              </AssetInfoWrapper>

              <RecurringModal refetch={refetch} equity={info} recurringModal={recurringModal} />
              <HomeOwnersPacket equityId={info?.id} modal={homeOwnersPacketModal} />
              <PurchaseFeedback equity={info} feedModal={feedModal} />
            </>
          )}
        </AssetWrapper>

        <MakeDepositModal info={info} depositModal={depositModal} />
      </LayoutView>
    </>
  );
};

export default Auth(OutrightAsset, {color: '#DDB057', absoluteStyle});
