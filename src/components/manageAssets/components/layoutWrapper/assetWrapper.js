import {Box, HStack, Hide, Image, Stack, Text, useDisclosure} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import angledArrow from '/src/images/icons/angledArrow.svg';
import React from 'react';
import MobileHamburger from '../../../navbar/mobileHamburger';

const AssetWrapper = ({children}) => {
  const router = useRouter();
  const {isOpen: isAssetOpen, onOpen: onAssetOpen, onClose: onAssetClose} = useDisclosure();

  return (
    <>
      <Stack w="full" spacing={{base: '13px', xl: '0px'}} py={{base: '16px', xl: '21.88px'}}>
        {/* <Hide above="lg"> */}{' '}
        <HStack px="20px" display={{base: 'flex', xl: 'none'}} justify="space-between">
          <HStack
            role="button"
            w="fit-content"
            onClick={router.back}
            // onClick={onAssetOpen}
            spacing="14px"
          >
            <Image src={angledArrow.src} alt="back arrow" boxSize="24px" />
            <Text fontSize="20px" fontWeight="500" className="gilda-display-regular" color="#000">
              Portfolio
            </Text>
          </HStack>
          <MobileHamburger
            onAssetClose={onAssetClose}
            onAssetOpen={onAssetOpen}
            isAssetOpen={isAssetOpen}
          />
        </HStack>
        {/* </Hide> */}
        <Stack w="full" align="center" spacing={{base: '16px', xl: '0px'}}>
          {children}
        </Stack>
      </Stack>
    </>
  );
};

export default AssetWrapper;
