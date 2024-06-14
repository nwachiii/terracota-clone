import React from 'react';
import {Box, Flex, VStack, Image, useDisclosure, Text, HStack} from '@chakra-ui/react';
import request_inspection from '../../../images/call-outgoing.svg';
import calendarMobile from '../../../images/Calendar-mobile.svg';
import RequestTourModal from '../modals/requestTour';
import ContactPerson from '../modals/contactPerson';
import {Button} from '../../../ui-lib';
import buyProperty from '../../../images/icons/buyProperty.svg';
import {IoMdCall} from 'react-icons/io';
import {BiPhoneCall} from 'react-icons/bi';
import FractionalModal from './fractionalModal';
import fractionalImg from '../../../images/icons/fractional-btn.svg';
import {MdOutlineSignpost} from 'react-icons/md';

const PropertyInfoMobile = ({info}) => {
  const requestModal = useDisclosure();
  const contactModal = useDisclosure();
  const fractionalModal = useDisclosure();

  return (
    <Box>
      {console.log('info', info)}
      {info.is_fractionalized ? (
        <Box
          w="full"
          //  mt="48px"
        >
          <Flex
            direction="column"
            alignItems={'center'}
            gap="8px"
            justify={'space-between'}
            className="montserrat-regular"
            w={`100%`}
          >
            <Button
              flex={`1`}
              p="16px"
              // bg='primary'
              bg="primary"
              color="#fff"
              border="0.5px solid"
              borderColor={`primary`}
              _hover={{
                bg: 'primary',
              }}
              leftIcon={<Image src={fractionalImg.src} fontSize="20" />}
              onClick={fractionalModal?.onOpen}
              fontWeight="500"
              w={`100%`}
              h="100%"
            >
              <HStack>
                <Text fontSize={`13px`}>Buy Fraction</Text>
              </HStack>
            </Button>
            <HStack gap="8px" flex={`1`} w={`100%`}>
              <Button
                flex={`1`}
                p="16px"
                h={`100%`}
                bg="transparent"
                color="primary"
                border="0.5px solid"
                borderColor="primary"
                _focus={{
                  bg: 'transparent',
                  border: '0.5px solid !important',
                  borderColor: 'primary',
                }}
                _hover={{
                  bg: 'transparent',
                  border: '0.5px solid !important',
                  borderColor: 'primary ',
                }}
                leftIcon={<MdOutlineSignpost fontSize={`18px`} />}
                onClick={requestModal.onOpen}
                fontWeight="500"
              >
                <HStack>
                  <Text fontSize={`13px`}>Request Inspection</Text>
                </HStack>
              </Button>
              <Button
                flex={`1`}
                p="16px"
                h={`100%`}
                ml={`0px !important`}
                // bg='primary'
                bg="transparent"
                color="primary"
                border="0.5px solid"
                borderColor="primary"
                _focus={{
                  bg: 'transparent',
                  border: '0.5px solid !important',
                  borderColor: 'primary',
                }}
                _hover={{
                  bg: 'transparent',
                  border: '0.5px solid !important',
                  borderColor: 'primary ',
                }}
                leftIcon={<BiPhoneCall fontSize={`18px`} />}
                onClick={contactModal.onOpen}
                fontWeight="500"
              >
                <HStack>
                  <Text fontSize={`13px`}>Contact Person</Text>
                </HStack>
              </Button>
            </HStack>
          </Flex>
        </Box>
      ) : (
        <Flex
          direction="row"
          alignItems={'center'}
          gap="12px"
          justify={'space-between'}
          className="montserrat-regular"
          // mt={`24px`}
        >
          <Button
            flex={`1`}
            py="25px"
            px="15px"
            // bg='primary'
            bg="primary"
            color="#fff"
            border="none"
            _focus={{
              bg: 'primary',
            }}
            _hover={{
              bg: 'primary',
            }}
            leftIcon={<Image src={request_inspection.src} fontSize="20" filter={`invert(1)`} />}
            onClick={requestModal.onOpen}
            fontWeight="500"
          >
            <HStack>
              <Text fontSize={`13px`}>Request Inspection</Text>
            </HStack>
          </Button>
          <Button
            flex={`1`}
            py="25px"
            px="15px"
            // bg='primary'
            bg="transparent"
            color="primary"
            border="0.5px solid"
            borderColor="primary"
            _focus={{
              bg: 'transparent',
              border: '0.5px solid',
              borderColor: 'primary',
            }}
            _hover={{
              bg: 'transparent',
              border: '0.5px solid !important',
              borderColor: 'primary ',
            }}
            leftIcon={<BiPhoneCall color={'matador_text.100'} fontSize={`18px`} />}
            onClick={contactModal.onOpen}
            fontWeight="500"
          >
            <HStack>
              <Text fontSize={`13px`}>Contact Person</Text>
            </HStack>
          </Button>
        </Flex>
      )}

      <RequestTourModal requestModal={requestModal} info={info} />
      <ContactPerson contactModal={contactModal} info={info} />
      <FractionalModal info={info} fractionalModal={fractionalModal} />
    </Box>
  );
};

export default PropertyInfoMobile;
