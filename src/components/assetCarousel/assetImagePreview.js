import React from 'react'
import { Box, HStack, Image, Icon, Center } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import thinArrow from '../../images/icons/thin-arrow.svg';
import { IoMdClose } from 'react-icons/io';


const buttonStyles = {
  zIndex: 2,
  top: '50%',
  display: 'flex',
  aspectRatio: 1 / 1,
  position: 'absolute',
  borderRadius: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 'xl',
  border: '1px solid #EAEAEA',
  backgroundColor: '#FFFFFFB2',
};

const AssetImagePreview = ({ showPreview, setShowPreview, slideImages }) => {

  return (
    <>
      {showPreview && (
        <HStack
          position="fixed" top="0" left="0px"
          w="100vw" zIndex={200} h="100vh"
          bg="rgba(0,0,0,0.8)" justify="center" align="center"
        >
          <Icon
            onClick={() => setShowPreview(false)}
            color="#fff" top="3vh" right="3vw" zIndex={200}
            position="fixed" fontSize="45px" width="45px"
            height="45px" cursor="pointer" as={IoMdClose}
          />
          <HStack
            css={{ '.carousel .slider-wrapper.axis-horizontal .slider .slide': { display: 'flex', }, }}
            maxW="100vw" justify="center" align="center"
          >
            <Carousel
              showThumbs={false} showStatus={false} useKeyboardArrows
              renderArrowPrev={(clickHandler, hasPrev) => (
                <>
                  {hasPrev && (
                    <Box
                      {...buttonStyles}
                      onClick={clickHandler} cursor={'pointer'}
                      right={{ base: '90%', md: '94%' }} position='fixed' width={{ base: 'unset', md: '5%' }}
                    >
                      <Center w='full' h='full' p={{ base: '5px', md: '18px' }}>
                        <Image transform="rotate(180deg)" src={thinArrow.src} alt="left arrow" />
                      </Center>
                    </Box>
                  )}
                </>
              )}
              renderArrowNext={(clickHandler, hasNext) => (
                <>
                  {hasNext && (
                    <Box
                      {...buttonStyles}
                      onClick={clickHandler} cursor={'pointer'}
                      left={{ base: '90%', md: '94%' }} position='fixed' width={{ base: 'unset', md: '5%' }}
                    >
                      <Center w='full' h='full' p={{ base: '5px', md: '18px' }}>
                        <Image src={thinArrow.src} alt="right arrow" />
                      </Center>
                    </Box>
                  )}
                </>
              )}
            >
              {slideImages?.map((photo, id) => (
                <HStack
                  key={id} justify="center" align="center"
                  w="fit-content" position="relative" margin="auto auto"
                >
                  <Image src={photo?.original} alt="ues" maxW="90vw" maxH="90vh" minW="80vw" />
                </HStack>
              ))}
            </Carousel>
          </HStack>
        </HStack>
      )}
    </>
  )
}

export default AssetImagePreview



