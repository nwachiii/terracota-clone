import React, {useEffect, useState} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  VStack,
  Flex,
  Text,
  Box,
  HStack,
  useClipboard,
  Textarea,
  useToast,
  Image,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  ModalCloseButton,
} from '@chakra-ui/react';
import {Button} from '../../../ui-lib';
import {messageContactPerson} from '../../../api/listing';
import {useMutation} from 'react-query';
import {RxCross1} from 'react-icons/rx';
import contactPersonImg from '../../../images/icons/contact-person.svg';

const ContactPersonContent = ({info}) => {
  const toast = useToast();
  const [message, setMessage] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const {onCopy} = useClipboard(selectedPerson);

  const proceedContact = useMutation(messageContactPerson, {
    onSuccess: async res => {
      toast({
        description: 'Message sent successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      contactModal.onClose();
      setMessage('');
    },
    onError: err => {
      toast({
        title: 'An error occured',
        description: `${err?.code} : ${err?.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleContact = () => {
    if (message) proceedContact.mutate({message, project_id: info?.id});
    else
      toast({
        description: `Please enter a message`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
  };

  const handleCopy = person => {
    setSelectedPerson(person);
    onCopy();
    toast({
      title: 'Contact Copied!',
      status: 'info',
      duration: 1500,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <Box px="30px" py="20px">
      <Flex
        direction="row"
        justify="space-between"
        align={'center'}
        mb={{base: '25px', md: '25px'}}
        className="montserrat-regular"
      >
        <Text color="text" fontSize={'23px'} fontWeight={500} className="gilda-display-regular">
          Contact Agent
        </Text>
        {/* <CloseIcon 
              color='text'
              cursor='pointer'
              fontSize='17px'
              // onClick={requestModal?.onClose}
            /> */}
      </Flex>

      <VStack align={'stretch'} spacing={{base: '16px', md: '10px'}}>
        {info?.contact_persons?.map(person => (
          <HStack
            onClick={handleCopy}
            key={person?.id}
            spacing={'10px'}
            cursor="pointer"
            color={'#000'}
            mt="10px"
            borderRadius={'5px'}
            w="full"
            py={{base: '8px', md: '12px'}}
            // px={{ base: '10px', md: '20px' }}
            justify={'space-between'}
          >
            <HStack align={'center'} spacing={'10px'}>
              <Image src={contactPersonImg.src} boxSize={23} />
              <Text color="text" fontSize={'16px'} fontWeight={400}>
                {person?.name}
              </Text>
            </HStack>
            <Text color="text" fontSize={'16px'} fontWeight={500}>
              {person?.phone_number}
            </Text>
          </HStack>
        ))}
      </VStack>
      <Text
        color="text"
        fontSize={{base: '15px', md: '19px'}}
        fontWeight={{base: 500, md: 500}}
        mt={{base: '18px', md: '25px'}}
        mb={{md: '20px'}}
      >
        Make enquiry
      </Text>
      <div>
        <Textarea
          color="text"
          autoFocus={false}
          placeholder="Enter your message"
          outline={'none'}
          size="sm"
          border="0.5px solid #747474 !important"
          mt="7px"
          h="90px"
          onChange={e => setMessage(e.target.value)}
        />
      </div>

      <Button
        isLoading={proceedContact.isLoading}
        onClick={handleContact}
        w="full"
        color="white"
        bg="primary"
        mt="30px"
        p="26px"
      >
        <Text fontSize={`16px`} className="montserrat-regular">
          Send Message
        </Text>
      </Button>
    </Box>
  );
};
const ContactPerson = ({contactModal, info}) => {
  const [screenWidth, setScreenWidth] = useState();

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  return screenWidth >= 768 ? (
    <Modal
      autoFocus={false}
      isCentered
      onClose={contactModal?.onClose}
      isOpen={contactModal?.isOpen}
    >
      <ModalOverlay />
      <ModalContent
        bg="card_bg"
        maxW="500px"
        minH="301px"
        px="0"
        py="0"
        borderRadius={{base: '10px', md: '2px'}}
      >
        <ModalCloseButton />
        <ContactPersonContent info={info} />
      </ModalContent>
    </Modal>
  ) : (
    <Drawer
      autoFocus={false}
      isCentered
      onClose={contactModal?.onClose}
      isOpen={contactModal?.isOpen}
      placement="bottom"
    >
      <DrawerOverlay />
      <DrawerContent bg="card_bg" px="0" py="0">
        <DrawerCloseButton />
        <ContactPersonContent info={info} />
      </DrawerContent>
    </Drawer>
  );
};

export default ContactPerson;
