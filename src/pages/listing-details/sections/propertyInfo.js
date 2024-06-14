import React from 'react';
import {Box, Button, Flex, HStack, Image, Text, useDisclosure} from '@chakra-ui/react';
import callOutgoing from '../../../images/call-outgoing.svg';
import calendar from '../../../images/Calendar.svg';
import calendarBlack from '../../../images/Calendar-black.svg';
import fractionalImg from '../../../images/icons/fractional-btn.svg';
import RequestTourModal from '../modals/requestTour';
import ContactPerson from '../modals/contactPerson';
import {useQuery} from 'react-query';
import {fetchProjectDocument} from '../../../api/listing';
import {CustomizableButton} from '../../../ui-lib';
import brochure from '../../../images/icons/view-brochure.svg';
import FractionalModal from './fractionalModal';
import {BiPhoneCall} from 'react-icons/bi';
import request_inspection from '../../../images/call-outgoing.svg';
import {MdOutlineSignpost} from 'react-icons/md';

const PropertyInfo = ({info, allUnitsRef}) => {
  const requestModal = useDisclosure();
  const contactModal = useDisclosure();
  const projectDoc = useQuery(['projectDoc', info?.id], () => fetchProjectDocument(info?.id));
  const fractionalModal = useDisclosure();

  return (
    <Box>
      {info.is_fractionalized ? (
        <Box w="full" mt="48px">
          <Flex
            direction="row"
            alignItems={'center'}
            gap="12px"
            justify={'space-between'}
            className="montserrat-regular"
          >
            <Button
              flex={`1`}
              py="16px"
              px="24px"
              h={`100%`}
              // bg='primary'
              bg="primary"
              color="#fff"
              borderRadius={`0px`}
              border="0.5px solid"
              borderColor={`primary`}
              _hover={{
                bg: 'primary',
              }}
              leftIcon={<Image src={fractionalImg.src} fontSize="20" />}
              onClick={fractionalModal?.onOpen}
              fontWeight="500"
            >
              <HStack>
                <Text fontSize={`16px`}>Buy Fraction</Text>
              </HStack>
            </Button>
            <HStack gap="12px" flex={`1`}>
              <Button
                flex={`1`}
                py="16px"
                px="24px"
                h={`100%`}
                bg="transparent"
                color="primary"
                borderRadius={`0px`}
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
                  <Text fontSize={`16px`}>Request Inspection</Text>
                </HStack>
              </Button>
              <Button
                flex={`1`}
                py="16px"
                px="24px"
                h={`100%`}
                // bg='primary'
                bg="transparent"
                color="primary"
                borderRadius={`0px`}
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
                leftIcon={<BiPhoneCall color={'matador_text.100'} fontSize={`18px`} />}
                onClick={contactModal.onOpen}
                fontWeight="500"
              >
                <HStack>
                  <Text fontSize={`16px`}>Contact Person</Text>
                </HStack>
              </Button>
            </HStack>
          </Flex>
        </Box>
      ) : (
        <Flex
          direction="row"
          alignItems={'center'}
          gap="24px"
          justify={'space-between'}
          className="montserrat-regular"
          mt={`24px`}
        >
          <Button
            flex={`1`}
            py="16px"
            px="24px"
            h={`100%`}
            // bg='primary'
            bg="primary"
            color="#fff"
            borderRadius={`0px`}
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
              <Text fontSize={`16px`}>Request Inspection</Text>
            </HStack>
          </Button>
          <Button
            flex={`1`}
            py="16px"
            px="24px"
            h={`100%`}
            // bg='primary'
            bg="transparent"
            color="primary"
            borderRadius={`0px`}
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
            leftIcon={<BiPhoneCall color={'matador_text.100'} fontSize={`18px`} />}
            onClick={contactModal.onOpen}
            fontWeight="500"
          >
            <HStack>
              <Text fontSize={`16px`}>Contact Person</Text>
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

export default PropertyInfo;
