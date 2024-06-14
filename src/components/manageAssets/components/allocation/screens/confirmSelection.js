import React from 'react';
import {Morph} from '../../../../../ui-lib/ui-lib.components/morph';
import {Button, HStack, Image, Stack, Text, useMediaQuery} from '@chakra-ui/react';
import drawerArrow from '/src/images/icons/drawerArrow.svg';
import homeGif from '/src/images/animated_icons/home.gif';

const ConfirmSelection = ({handleScreen, mutation, allocationVal, handleSubmitAllocation}) => {
  const [isBelowMd] = useMediaQuery('(max-width: 913px)');

  const Morphed = Morph[isBelowMd ? 'drawer' : 'modal'];

  return (
    <>
      <HStack
        p={{base: '22px 17px 22px 16px', md: '32px 32px 0px'}}
        w="full"
        justify={{md: 'end', base: 'space-between'}}
      >
        <HStack
          role="button"
          onClick={handleScreen('select allocation')}
          display={{md: 'none', base: 'flex'}}
          spacing="14px"
        >
          <Image src={drawerArrow.src} boxSize="20px" />{' '}
          <Text
            as="h1"
            fontSize={{base: '23px', md: '17.25px'}}
            lineHeight={{base: '32px', md: '24px'}}
            fontWeight="400"
            color="#000"
          >
            Unit Allocation
          </Text>
        </HStack>
        <Morphed.closeBtn position="initial" />
      </HStack>
      <Morphed.body minW={{md: '477px'}} p={{base: '43px 16px 271px', md: '40px 32px'}}>
        <Stack w="full" spacing={{md: '40px', base: 'none'}}>
          <Image
            mb={{base: '7px', md: '0px'}}
            src={homeGif.src}
            mx="auto"
            alt="home gif"
            boxSize={{base: '100px', md: '150px'}}
          />
          <Text fontSize="19px" fontWeight="500" textAlign="center" color="#191919">
            Are you sure you want {allocationVal}?
          </Text>
          <HStack mt={{base: '28px', md: '0px'}} justify="space-between" spacing="20px" w="full">
            <Button
              p="13px 32px"
              border="0.75px solid #606060"
              borderRadius="0px"
              h="48px"
              fontSize="16px"
              fontWeight="500"
              color="#606060"
              _hover={{
                bg: 'transparent',
              }}
              onClick={handleScreen('select allocation')}
              _focus={{
                bg: 'transparent',
                border: '0.75px solid #606060 !important',
              }}
              _active={{
                bg: 'transparent',
                border: '0.75px solid #606060 !important',
              }}
              variant="outline"
              w="full"
            >
              No
            </Button>{' '}
            <Button
              p="13px 32px"
              border="0.75px solid #DDB057"
              borderRadius="0px"
              h="48px"
              fontSize="16px"
              fontWeight="500"
              color="#DDB057"
              isLoading={mutation.isLoading}
              onClick={handleSubmitAllocation}
              _hover={{
                bg: 'transparent',
              }}
              _focus={{
                bg: 'transparent',
                border: '0.75px solid #DDB057 !important',
              }}
              _active={{
                bg: 'transparent',
                border: '0.75px solid #DDB057 !important',
              }}
              variant="outline"
              w="full"
            >
              Yes
            </Button>
          </HStack>
        </Stack>
      </Morphed.body>
    </>
  );
};

export default ConfirmSelection;
