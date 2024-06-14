import {
  Flex,
  Image,
  Text,
  HStack,
  Menu,
  useDisclosure,
  Box,
  Center,
  Icon,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import {themeStyles} from '../../theme';
import logoWhite from '../../images/logo-white.svg';
import logo from '../../images/logo.svg';
import Notification from '../drawers/Notification';
import Wallet from '../drawers/wallet';
import ProfileMenu from './ProfileMenu';
import {Button} from '../../ui-lib/ui-lib.components';
import Register from '../auth/register';
import notificationWhite from '../../images/navbar/notification-white.svg';
import notification from '../../images/navbar/notification.svg';
import {useRouter} from 'next/router';
import logoMobile from '../../images/mobile-logo.png';
import MobileDrawer from './MobileDrawer';
import Feedback from '../drawers/feedback/feedback';
import ReportBug from '../drawers/ReportBug';
import SuggestIdea from '../drawers/SuggestIdea';
import MyAssets from '../drawers/MyAssets';
import Watchlist from '../drawers/Watchlist';
import {getSettingsData} from '../../api/Settings';
import {useQuery} from 'react-query';
import menuBurger from '../../images/navbar/menuBurger.svg';
import backIcon from '../../images/navar/backIcon.svg';
import {fetchAgentTerms} from '../../api/agents';
import {appCurrentTheme, getItemFromLS} from '../../utils/localStorage';
import {DARK_BLUE, LIGHT, LOGGED_IN_USER} from '../../constants/names';
import {colors_object} from '../../theme/colors';
import {ChevronLeftIcon} from '@chakra-ui/icons';
import {BiMenu} from 'react-icons/bi';
import {LoggedinUser} from '../../constants/routes';
import {RiBuilding4Fill} from 'react-icons/ri';

const Navbar = ({transluscent, isLandingPage, navBarStyle, activePage}) => {
  const settingsQuery = useQuery(
    ['getSettingsData', 'profile'],
    () => getSettingsData({profile: true}),
    {
      enabled: !!LoggedinUser,
    }
  );
  const avatar = settingsQuery?.data?.data?.data?.avatar;
  const TERMS = useQuery(['AgentsTerms'], fetchAgentTerms, {enabled: !!LoggedinUser});

  const useLightItems = appCurrentTheme !== LIGHT || (appCurrentTheme === LIGHT && transluscent);

  const router = useRouter();
  const {isOpen: isNotOpen, onOpen: onNotOpen, onClose: onNotClose} = useDisclosure();
  const {isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose} = useDisclosure();
  const {isOpen: isWalOpen, onOpen: onWalOpen, onClose: onWalClose} = useDisclosure();
  const {isOpen: isAssetOpen, onOpen: onAssetOpen, onClose: onAssetClose} = useDisclosure();
  const {isOpen: isWatchOpen, onOpen: onWatchOpen, onClose: onWatchClose} = useDisclosure();
  const feedBackModal = useDisclosure();
  const reportBugModal = useDisclosure();
  const suggestModal = useDisclosure();

  const auth_data = [
    {
      key: 'myAssets',
      title: 'Portfolio',
      onClick: () => onAssetOpen(),
    },
    {
      key: 'watchlist',
      title: 'Watchlist',
      onClick: () => onWatchOpen(),
    },
    {
      key: 'wallet',
      title: 'Wallet',
      onClick: () => onWalOpen(),
    },
    {
      key: 'notification',
      title: 'Notification',
      onClick: () => onNotOpen(),
    },
  ];

  return (
    <>
      {isLandingPage ? null : (
        <Flex
          display={{base: 'none', lg: 'flex'}}
          color="text"
          mr="auto"
          h={'100px'}
          alignItems={'center'}
          justify={'space-between'}
          w="full"
          bg={transluscent ? 'rgba(0, 0, 0, 0.5)' : 'card_bg'}
          position={transluscent && 'absolute'}
          px={'48px'}
          zIndex={100}
          {...navBarStyle?.desktop}
        >
          <Link href={LoggedinUser ? '/properties' : '/'}>
            {/* <Center>
              <Image
                cursor={'pointer'}
                src={useLightItems ? logoWhite.src : logo.src}
                maxH={'92px'}
                h="auto"
                maxW={'200px'}
                alt={'app-logo'}
              />{' '}
            </Center> */}

            <HStack gap={'20px'}>
              <RiBuilding4Fill fontSize={`48px`} />
              <Text
                fontSize={`20px`}
                textTransform={`uppercase`}
                className="gilda-display-regular"
                fontWeight={500}
              >
                Your Logo
              </Text>
            </HStack>
          </Link>
          {LoggedinUser && (
            <>
              <Flex justify="center" align="center" gap={'45px'}>
                <Flex gap="49px">
                  <Flex align={'center'} justify={'center'}>
                    {auth_data.map(item => (
                      <Text
                        ml="25px"
                        className="gilda-display-regular"
                        key={item.key}
                        pb="8px"
                        cursor="pointer"
                        onClick={item.onClick}
                        fontSize="14px"
                        textTransform={'uppercase'}
                        fontWeight={400}
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        color={
                          useLightItems ? colors_object.darkBlue.text : colors_object.light.text
                        }
                      >
                        {item.title}
                      </Text>
                    ))}
                  </Flex>
                </Flex>

                <ProfileMenu
                  TERMS={TERMS}
                  avatar={avatar}
                  suggestModal={suggestModal}
                  reportBugModal={reportBugModal}
                  feedBackModal={feedBackModal}
                  LoggedinUser={LoggedinUser}
                  useLightItems={useLightItems}
                />
              </Flex>
              <Notification
                onDrawerOpen={onDrawerOpen}
                isNotOpen={isNotOpen}
                onNotClose={onNotClose}
              />
              <Wallet
                onDrawerOpen={onDrawerOpen}
                avatar={avatar}
                isWalOpen={isWalOpen}
                onWalClose={onWalClose}
              />
              <Feedback onDrawerOpen={onDrawerOpen} feedModal={feedBackModal} />
              <ReportBug onDrawerOpen={onDrawerOpen} reportBugModal={reportBugModal} />
              <SuggestIdea onDrawerOpen={onDrawerOpen} suggestModal={suggestModal} />
              <MyAssets
                onDrawerOpen={onDrawerOpen}
                isAssetOpen={isAssetOpen}
                onAssetClose={onAssetClose}
              />
              <Watchlist
                onDrawerOpen={onDrawerOpen}
                isWatchOpen={isWatchOpen}
                onWatchClose={onWatchClose}
              />
            </>
          )}
        </Flex>
      )}
      <Box {...navBarStyle?.mobile} display={{base: 'flex', lg: 'none'}}>
        <Flex
          position={transluscent && 'absolute'}
          px={'20px'}
          zIndex={100}
          color={transluscent && 'text'}
          w="full"
          bg={transluscent ? 'rgba(0, 0, 0, 0.5)' : 'card_bg'}
          justify={'space-between'}
          align={'center'}
          pb="15px"
          pt="10px"
        >
          <Flex align={'center'} gap="20px">
            {isLandingPage || router.pathname === '/properties' || router.pathname === '/settings' ? (
              <Link href={LoggedinUser ? '/properties' : '/'}>
                <Image
                  cursor={'pointer'}
                  src={useLightItems ? logoWhite.src : logo.src}
                  maxH={'45px'}
                  h="full"
                  w="full"
                  maxW={'154px'}
                  alt={'app-logo'}
                />
                {/* <VStack gap={'0rem'}>
                  <RiBuilding4Fill fontSize={`24px`} />
                  <Text
                    fontSize={`10px`}
                    lineHeight={`22px`}
                    textTransform={`uppercase`}
                    className="montserrat-regular"
                    mt={`0px !important`}
                    fontWeight={600}
                  >
                    Your Logo
                  </Text>
                </VStack> */}
              </Link>
            ) : (
              <Box cursor={'pointer'} onClick={() => router.back()}>
                <ChevronLeftIcon fontSize={'38px'} color={'text'} />
              </Box>
            )}
            <Text color="text" fontSize={'20px'} fontWeight={500}>
              {activePage}
            </Text>
          </Flex>
          <Icon as={BiMenu} color="text" onClick={onDrawerOpen} fontSize={'30px'} />
        </Flex>
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
      </Box>
    </>
  );
};

export default Navbar;
