import React from 'react';
import { Flex, Icon, Image, Text } from '@chakra-ui/react';
import {
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Divider
} from '@chakra-ui/react';
import logoMobile from '../../images/mobile-logo-white.png';
import { Button } from '../../ui-lib';
import { RxCross1 } from 'react-icons/rx';
import { useRouter } from 'next/router';
import ProfileIcon from '../../images/icons/user-profile.svg';

import feedbackIcon from '../../images/navar/feedback.svg';
import suggestIcon from '../../images/navar/suggest.svg';
import reportBugIcon from '../../images/navar/reportBug.svg';
import termsIcon from '../../images/navar/terms.svg';
import logoutIcon from '../../images/navar/logout.svg';
import settingIcon from '../../images/navar/settings.svg';

import homeIcon from '../../images/navbar/home.svg'
import watchlistIcon from '../../images/navbar/watchlist.svg'
import walletIcon from '../../images/navbar/wallet.svg'
import notificationIcon from '../../images/navbar/notification-white.svg'

import homeIconLight from '../../images/navbar/home-light.svg'
import watchlistIconLight from '../../images/navbar/watchlist-light.svg'
import walletIconLight from '../../images/navbar/wallet-light.svg'
import notificationIconLight from '../../images/navbar/notification.svg'
import { appCurrentTheme } from '../../utils/localStorage';
import { LIGHT } from '../../constants/names';
import { LoggedinUser } from '../../constants/routes';



const DrawerComp = ({ feedBackModal, reportBugModal, suggestModal, onNotOpen, onAssetOpen, onWatchOpen, onWalOpen, isDrawerOpen, onDrawerClose, avatar, TERMS }) => {
  const router = useRouter();

  const auth_data = [
    {
      key: 'myAssets',
      title: 'Portfolio',
      // image: appCurrentTheme === LIGHT ? homeIcon : homeIconLight,
      onClick: () => { onDrawerClose(); onAssetOpen(); }
    },
    {
      key: 'watchlist',
      title: 'My watchlist',
      // image: appCurrentTheme === LIGHT ? watchlistIcon : watchlistIconLight,
      onClick: () => { onDrawerClose(); onWatchOpen(); }
    },
    {
      key: 'wallet',
      title: 'Wallet',
      // image: appCurrentTheme === LIGHT ? walletIcon : walletIconLight,
      onClick: () => { onDrawerClose(); onWalOpen(); }
    },
    {
      key: 'notifications',
      title: 'Notifications',
      // image: appCurrentTheme === LIGHT ? notificationIcon : notificationIconLight,
      onClick: () => { onDrawerClose(); onNotOpen(); }
    }
  ];

  const dropdown_data = [
    {
      key: 'settings',
      title: 'Settings',
      image: settingIcon,
      onClick: () => { onDrawerClose(); router.push('/settings'); }
    },
    {
      key: 'feedback',
      title: 'Feedback',
      image: feedbackIcon,
      onClick: () => { onDrawerClose(); feedBackModal.onOpen(); }
    },
    {
      key: 'terms',
      title: 'Terms & conditions',
      image: termsIcon,
      onClick: () => window.open(`${TERMS?.data ? TERMS.data?.data?.message?.document : ''}`, '_blank')
    },
    {
      key: 'suggest',
      title: 'Suggest an idea',
      image: suggestIcon,
      onClick: () => { onDrawerClose(); suggestModal.onOpen(); }
    },
    {
      key: 'report',
      title: 'Report a bug',
      image: reportBugIcon,
      onClick: () => { onDrawerClose(); reportBugModal.onOpen(); }
    }
  ];

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };


  return (
    <Drawer
      placement='right'
      isCentered={false}
      scrollBehavior='inside'
      isOpen={isDrawerOpen}
      onClose={onDrawerClose}
    >
      <DrawerOverlay />
      <DrawerContent bg='card_bg' maxW='300px'>
        {LoggedinUser ? (
          <DrawerBody px='24px' py='38px'>
            <Flex w='full' h='50px' justify={'space-between'}>
              <Flex
                gap={'12px'} cursor={'pointer'}
                align={'center'} justifyContent={'center'}
              >
                <Image
                  alt='profile_icon' w='64px' h='64px' borderRadius='full'
                  src={avatar ? avatar : ProfileIcon.src}
                  color={'black'} size={'22px'}
                />
                <VStack gap='0px' align={'stretch'}>
                  <Text color='text' fontSize={'16px'} fontWeight={500}>{LoggedinUser?.first_name}</Text>
                  <Text color='text' fontSize={'12px'} fontWeight={400}>Profile</Text>
                </VStack>
              </Flex>
              <Icon as={RxCross1} fontSize={'20px'} color='text' onClick={onDrawerClose} />
            </Flex>
            <VStack
              align={'flex-start'}
              mt='60px'
              spacing={'43px'}
            >
              {auth_data.map(data => (
                <Flex align={'center'} gap='12px' key={data.key}>
                  {/* <Image w='18px' h='18px' src={data.image?.src} /> */}
                  <Text className='gilda-display-regular' onClick={data.onClick} key={data.key} color='text' fontSize={'16px'} fontWeight={400}>
                    {data.title}
                  </Text>
                </Flex>
              ))}
            </VStack>
            <Divider my='40px' />
            <VStack
              align={'flex-start'}
              spacing={'43px'}
            >
              {dropdown_data.map(data => (
                <Flex align={'center'} gap='12px' key={data.key}>
                  <Image src={data.image?.src} />
                  <Text onClick={data.onClick} key={data.key} color='text' fontSize={'16px'} fontWeight={400}>
                    {data.title}
                  </Text>
                </Flex>
              ))}

              <Flex align={'center'} gap='12px' mt='50px'>
                <Image h='full' src={reportBugIcon?.src} />
                <Text
                  cursor={'pointer'} onClick={() => router.push('/theme-toggler')}
                  color='text' fontSize={'16px'} fontWeight={400}
                >
                  Change Theme
                </Text>
              </Flex>

            </VStack>

            <Flex align={'center'} gap='12px' mt='50px'>
              <Image h='full' src={logoutIcon?.src} />
              <Text
                cursor={'pointer'} onClick={handleLogout}
                color='#E6192A' fontSize={'16px'}
                fontWeight={400}
              >
                Sign Out
              </Text>
            </Flex>
          </DrawerBody>
        ) : (
          <DrawerBody px='24px' py='38px'>
            <Flex
              w='full'
              h='50px'
              bg={'white'}
              justify={'space-between'}
              align={'center'}
            >
              <Image
                cursor={'pointer'}
                src={logoMobile.src}
                maxH={'45.882px'}
                h='full'
                w='full'
                maxW={'120px'}
                alt={'app-logo'}
              />
              <RxCross1 size={25} color='text' onClick={onDrawerClose} />
            </Flex>
            <VStack
              align={'flex-start'}
              mt='60px'
              spacing={'33px'}

            >
              <Text color='text' fontSize={'20px'} fontWeight={500}>
                Home
              </Text>
              <Text color='text' fontSize={'20px'} fontWeight={500}>
                Our Projects
              </Text>
              <Text color='text' fontSize={'20px'} fontWeight={500}>
                About{' '}
              </Text>
              <Text color='text' fontSize={'20px'} fontWeight={500}>
                Contact
              </Text>
            </VStack>

            <Button
              mt='50px'
              borderRadius='6px'
              color='white'
              bg='primary'
              px='28px'
              py='24px'
              onClick={() => router.push('/auth/login')}
            >
              <Text
                lineHeight={'28px'}
                fontWeight={'600'}

                fontSize={'18px'}
              >
                Get Started
              </Text>
            </Button>
          </DrawerBody>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComp;
