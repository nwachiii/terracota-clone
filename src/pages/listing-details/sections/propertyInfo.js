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
          {/* <Flex direction="row" alignItems={'center'} gap="8px">
            <CustomizableButton
              w="33%"
              py="25px"
              px="15px"
              bg="white"
              color="black"
              leftIcon={<Image src={brochure.src} fontSize={20} />}
              border="0.5px solid"
              _focus={{border: '0.5px solid !important'}}
              fontWeight="500"
              onClick={() =>
                window.open(`${projectDoc.data?.data?.results?.[0]?.document_url || ''}`, '_blank')
              }
            >
              View Brochure
            </CustomizableButton>
            <CustomizableButton
              w="33%"
              py="25px"
              px="15px"
              bg="white"
              color="black"
              border="0.5px solid"
              _focus={{border: '0.5px solid !important'}}
              leftIcon={<Image alt="next_image" src={callOutgoing.src} />}
              onClick={contactModal.onOpen}
              fontWeight="500"
            >
              Contact Person
            </CustomizableButton>
            <CustomizableButton
              w="33%"
              py="25px"
              px="15px"
              bg="white"
              color="black"
              border="0.5px solid"
              _focus={{border: '0.5px solid !important'}}
              leftIcon={<Image src={calendarBlack.src} fontSize="20" />}
              onClick={requestModal.onOpen}
              fontWeight="500"
            >
              Request a tour
            </CustomizableButton>
          </Flex> */}
          <Flex
            direction="row"
            alignItems={'center'}
            gap="12px"
            justify={'space-between'}
            className="montserrat-regular"
          >
            <Button
              flex={`1`}
              py="25px"
              px="15px"
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
            >
              <HStack>
                <Text fontSize={`13px`}>Own a Fraction</Text>
              </HStack>
            </Button>
            <HStack gap="12px" flex={`1`}>
              <Button
                flex={`1`}
                py="25px"
                px="15px"
                bg="transparent"
                color="primary"
                border="0.5px solid"
                borderColor="primary"
                _hover={{
                  bg: 'transparent',
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
                py="25px"
                px="15px"
                // bg='primary'
                bg="transparent"
                color="primary"
                border="0.5px solid"
                borderColor="primary"
                _hover={{
                  bg: 'transparent',
                }}
                leftIcon={<BiPhoneCall color={'matador_text.100'} fontSize={`18px`} />}
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
        // <Flex mt="48px" direction="row" alignItems={'center'} gap="8px">
        //   <CustomizableButton
        //     w="33%"
        //     py="25px"
        //     px="15px"
        //     bg="white"
        //     color="black"
        //     leftIcon={<Image src={brochure.src} fontSize={20} />}
        //     border="0.5px solid"
        //     _focus={{border: '0.5px solid !important'}}
        //     fontWeight="500"
        //     onClick={() =>
        //       window.open(`${projectDoc.data?.data?.results?.[0]?.document_url || ''}`, '_blank')
        //     }
        //   >
        //     View Brochure
        //   </CustomizableButton>
        //   <CustomizableButton
        //     w="33%"
        //     py="25px"
        //     px="15px"
        //     bg="white"
        //     color="black"
        //     border="0.5px solid"
        //     _focus={{border: '0.5px solid !important'}}
        //     leftIcon={<Image alt="next_image" src={callOutgoing.src} />}
        //     onClick={contactModal.onOpen}
        //     fontWeight="500"
        //   >
        //     Contact Person
        //   </CustomizableButton>
        //   <CustomizableButton
        //     w="33%"
        //     py="25px"
        //     px="15px"
        //     bg="black"
        //     color="white"
        //     border="0.5px solid"
        //     _focus={{border: '0.5px solid !important'}}
        //     leftIcon={<Image src={calendar.src} fontSize="20" />}
        //     onClick={requestModal.onOpen}
        //     fontWeight="500"
        //   >
        //     Request a tour
        //   </CustomizableButton>
        // </Flex>
        <Flex
          direction="row"
          alignItems={'center'}
          gap="12px"
          justify={'space-between'}
          className="montserrat-regular"
          mt={`24px`}
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

export default PropertyInfo;
