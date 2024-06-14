import {Icon, useDisclosure} from '@chakra-ui/react';
import React from 'react';
import {BiMenu} from 'react-icons/bi';
import MobileDrawer from './MobileDrawer';
import Notification from '../drawers/Notification';
import Wallet from '../drawers/wallet';
import Feedback from '../drawers/feedback/feedback';
import ReportBug from '../drawers/ReportBug';
import SuggestIdea from '../drawers/SuggestIdea';
import MyAssets from '../drawers/MyAssets';
import Watchlist from '../drawers/Watchlist';
import {LoggedinUser} from '../../constants/routes';
import {useQuery} from 'react-query';
import {getSettingsData} from '../../api/Settings';
import {fetchAgentTerms} from '../../api/agents';

const MobileHamburger = ({isAssetOpen, onAssetClose, onAssetOpen}) => {
  const settingsQuery = useQuery(
    ['getSettingsData', 'profile'],
    () => getSettingsData({profile: true}),
    {
      enabled: !!LoggedinUser,
    }
  );
  const avatar = settingsQuery?.data?.data?.data?.avatar;
  const TERMS = useQuery(['Terms'], fetchAgentTerms, {enabled: !!LoggedinUser});

  const {isOpen: isNotOpen, onOpen: onNotOpen, onClose: onNotClose} = useDisclosure();
  const {isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose} = useDisclosure();
  const {isOpen: isWalOpen, onOpen: onWalOpen, onClose: onWalClose} = useDisclosure();
  const {isOpen: isWatchOpen, onOpen: onWatchOpen, onClose: onWatchClose} = useDisclosure();
  const feedBackModal = useDisclosure();
  const reportBugModal = useDisclosure();
  const suggestModal = useDisclosure();
  return (
    <>
      <Icon as={BiMenu} color="text" onClick={onDrawerOpen} fontSize={'30px'} />
      <MobileDrawer
        TERMS={TERMS}
        feedBackModal={feedBackModal}
        reportBugModal={reportBugModal}
        suggestModal={suggestModal}
        onNotOpen={onNotOpen}
        onAssetOpen={onAssetOpen}
        onWatchOpen={onWatchOpen}
        onWalOpen={onWalOpen}
        avatar={avatar}
        isDrawerOpen={isDrawerOpen}
        onDrawerClose={onDrawerClose}
        onDrawerOpen={onDrawerOpen}
      />
      <Notification onDrawerOpen={onDrawerOpen} isNotOpen={isNotOpen} onNotClose={onNotClose} />
      <Wallet
        onDrawerOpen={onDrawerOpen}
        avatar={avatar}
        isWalOpen={isWalOpen}
        onWalClose={onWalClose}
      />
      <Feedback onDrawerOpen={onDrawerOpen} feedModal={feedBackModal} />
      <ReportBug onDrawerOpen={onDrawerOpen} reportBugModal={reportBugModal} />
      <SuggestIdea onDrawerOpen={onDrawerOpen} suggestModal={suggestModal} />
      <MyAssets onDrawerOpen={onDrawerOpen} isAssetOpen={isAssetOpen} onAssetClose={onAssetClose} />
      <Watchlist
        onDrawerOpen={onDrawerOpen}
        isWatchOpen={isWatchOpen}
        onWatchClose={onWatchClose}
      />
    </>
  );
};

export default MobileHamburger;
