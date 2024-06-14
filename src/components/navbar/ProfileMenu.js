import React from 'react'
import { Flex, Image, Text, MenuList, Menu, MenuButton, MenuItem, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaCaretDown } from 'react-icons/fa';
import ProfileIcon from '../../images/icons/user-profile.svg';
import ProfileIconLight from '../../images/icons/user-profile-light.png';
import { motion } from 'framer-motion';
import feedbackIcon from '../../images/icons/feedback.svg';
import feedbackIconLight from '../../images/icons/feedback-light.svg';
import suggestIcon from '../../images/icons/suggest.svg';
import suggestIconLight from '../../images/icons/suggest-light.svg';
import reportBugIcon from '../../images/icons/reportBug.svg';
import reportBugIconLight from '../../images/icons/reportBug-light.svg';
import termsIcon from '../../images/icons/terms.svg';
import termsIconLight from '../../images/icons/terms-light.svg';
import logoutIcon from '../../images/icons/logout.svg';
import settingIcon from '../../images/icons/settings.svg'
import settingIconLight from '../../images/icons/settings-light.svg'
import { appCurrentTheme } from '../../utils/localStorage';
import { LIGHT } from '../../constants/names';
import { TriangleDownIcon } from '@chakra-ui/icons';

const ProfileMenu = ({ feedBackModal, reportBugModal, suggestModal, LoggedinUser, useLightItems, avatar, TERMS }) => {
  const router = useRouter();

  const handleSettings = () => {
    router.push('/settings');
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload()
  };

  return (
    <Menu h="fit-content" bg='card_bg'>
      <MenuButton alignItems='center' pb="10px">
        <Button
          borderRadius={0}
          color={'#000'} className='gilda-display-regular'
          bg='primary' py='26px' px='21px'
          gap={'8px'} as={motion.div}
          align={'center'} justifyContent={'center'}
          cursor={'pointer'}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          leftIcon={
            <Image
              alt='profile_icon' w='20px' h='20px' borderRadius='full'
              src={avatar ? avatar : useLightItems ? ProfileIconLight.src : ProfileIcon.src}
              color={useLightItems ? 'white' : 'black'}
            />
          }
          rightIcon={
            <TriangleDownIcon color={useLightItems ? 'white' : 'black'} size={25} />
          }
        >
          {LoggedinUser?.first_name}
        </Button>
      </MenuButton>
      <MenuList className='gilda-display-regular' zIndex={200} bg='card_bg'>
        <MenuItem onClick={() => router.push('/settings')} bg='card_bg'>
          <Flex gap={3} align='center' py='5px' onClick={handleSettings}>
            <img w='30px' h='30px' src={appCurrentTheme === LIGHT ? settingIcon.src : settingIconLight.src} />
            <Text color='text' fontWeight='400'>Settings</Text>
          </Flex>
        </MenuItem>
        <MenuItem onClick={() => window.open(`${TERMS?.data ? TERMS.data?.data?.message?.document : ''}`, '_blank')} bg='card_bg'>
          <Flex gap={3} align='center' py='5px'>
            <img w='30px' h='30px' src={appCurrentTheme === LIGHT ? termsIcon.src : termsIconLight.src} />
            <Text color='text' fontWeight='400'>
              Terms & Conditions
            </Text>
          </Flex>
        </MenuItem>
        <MenuItem onClick={feedBackModal?.onOpen} bg='card_bg'>
          <Flex gap={3} align='center' py='5px'>
            <img w='30px' h='30px' src={appCurrentTheme === LIGHT ? feedbackIcon.src : feedbackIconLight.src} />
            <Text color='text' fontWeight='400'>
              Feedback
            </Text>
          </Flex>
        </MenuItem>
        <MenuItem onClick={suggestModal?.onOpen} bg='card_bg'>
          <Flex gap={3} align='center' py='5px'>
            <img w='30px' h='30px' src={appCurrentTheme === LIGHT ? suggestIcon.src : suggestIconLight.src} />
            <Text color='text' fontWeight='400'>
              Suggest an Idea
            </Text>
          </Flex>
        </MenuItem>
        <MenuItem onClick={reportBugModal?.onOpen} bg='card_bg'>
          <Flex gap={3} align='center' py='5px'>
            <img w='30px' h='30px' src={appCurrentTheme === LIGHT ? reportBugIcon.src : reportBugIconLight.src} />
            <Text color='text' fontWeight='400'>
              Report a bug
            </Text>
          </Flex>
        </MenuItem>

        <MenuItem onClick={() => router.push('/theme-toggler')} bg='card_bg'>
          <Flex gap={3} align='center' py='5px'>
            <img w='30px' h='30px' src={appCurrentTheme === LIGHT ? reportBugIcon.src : reportBugIconLight.src} />
            <Text color='text' fontWeight='400'>
              Change Theme
            </Text>
          </Flex>
        </MenuItem>

        <MenuItem onClick={handleLogout} bg='card_bg'>
          <Flex gap={3} align='center'>
            <img w='30px' h='30px' src={logoutIcon.src} />
            <Text color='#E6192A' fontWeight='400'>
              Sign Out
            </Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default ProfileMenu