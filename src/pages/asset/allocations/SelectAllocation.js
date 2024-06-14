import {
  Center,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  Flex,
  HStack,
  useToast,
  RadioGroup,
  Radio,
  ModalCloseButton,
  VStack,
  Heading,
  Icon,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { fetchUnitAllocationImages, fetchUnitAllocations, addAllocationToEquity } from '../../../api/allocations';
import { BsExclamationCircle, BsThreeDots } from 'react-icons/bs';
import { toastForError } from '../../../utils/toastForErrors';
import { Button, CustomizableButton, Spinner } from '../../../ui-lib';
import AllocationImageGallery from './Gallery';
import isMobile from '../../../utils/extras';
import { CloseIcon } from '@chakra-ui/icons';



export const SelectAllocation = ({ PICK_ALLOCATION_MODAL, equity, refetch }) => {
  const toast = useToast();
  const [uploads, setUploads] = useState([]);
  const [confirmBox, setConfirmBox] = useState(false);
  const [allocationVal, setAllocationVal] = useState('');
  const [activeImg, setActiveImg] = useState(uploads[0]?.image_file);
  const FETCH_UNIT_ALLOCATIONS = useQuery(['fetchUnitAllocations'], () => fetchUnitAllocations(equity?.unit?.id));
  const FETCH_UNIT_ALLOCATION_IMAGES = useQuery(['fetchUnitAllocationImages'], () => fetchUnitAllocationImages(equity?.unit?.id));

  const mutation = useMutation(formData => addAllocationToEquity(formData), {
    onSuccess: async res => {
      await refetch();
      PICK_ALLOCATION_MODAL?.onClose();
      setConfirmBox(false)
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const handleSubmitAallocations = () => {
    mutation.mutate({ equity_id: equity?.id, allocation: allocationVal });
  };

  useEffect(() => {
    FETCH_UNIT_ALLOCATION_IMAGES?.data?.data?.length > 0
      ? (setUploads(FETCH_UNIT_ALLOCATION_IMAGES?.data?.data),
        setActiveImg(FETCH_UNIT_ALLOCATION_IMAGES?.data?.data?.[0]?.image_file))
      : null;
  }, [FETCH_UNIT_ALLOCATION_IMAGES.data]);

  const ALLOCATIONS = FETCH_UNIT_ALLOCATIONS?.data?.data?.data;

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      height: '0px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
    },
  };

  const mainContent = (
    <>
      {!confirmBox ? (
        <>
          <HStack justify={'space-between'}>
            <Text fontSize={{ base: '18px', md: '32px' }} fontWeight={'600'} color="text">
              Unit Allocation
            </Text>

            <CloseIcon onClick={PICK_ALLOCATION_MODAL?.onClose} color="text" />
          </HStack>
          <Box overflowY={'scroll'} sx={customScrollbarStyles} px="0" pt="27px" pb="0px" pr="3px">
            {FETCH_UNIT_ALLOCATIONS?.isLoading || FETCH_UNIT_ALLOCATION_IMAGES.isLoading ? (
              <Center h="50vh">
                <Spinner color="text" />
              </Center>
            ) : FETCH_UNIT_ALLOCATIONS?.isError ? (
              <Center h="50vh">
                <Text fontSize={{ base: '11px', md: "14px" }} color="text" fontWeight="400" textAlign="'center">
                  Oops something went wrong fetching allocations,please try again later.
                </Text>
              </Center>
            ) : (
              <Stack spacing={'0px'}>
                <AllocationImageGallery
                  activeImg={activeImg}
                  uploads={uploads}
                  setActiveImg={setActiveImg}
                />

                {ALLOCATIONS?.length ? (
                  <RadioGroup pb={{ base: '30px', md: "44px" }} onChange={setAllocationVal} value={allocationVal}>
                    <Heading mt={{ base: '10px', md: 'unset' }} pb={{ base: '15px', md: "31px" }} fontSize={{ base: '18px', md: "24px" }} color="text" fontWeight="500">
                      Select a unit
                    </Heading>
                    <Flex
                      gap={{ base: '6px', md: "10px" }} justifyContent="start" wrap="wrap"
                      w="full" sx={customScrollbarStyles}
                      overflowY="auto" maxH="300px"
                    >
                      {ALLOCATIONS?.map((allocation, index) => (
                        <Radio key={index} value={allocation?.name} hidden>
                          <HStack
                            cursor={'pointer'}
                            color={allocationVal == allocation?.name ? 'text' : 'inverse_text'}
                            bg={allocationVal == allocation?.name ? 'inverse_text' : 'text'}
                            borderRadius="28px"
                            justify="center"
                            p={{ base: '6px 10px', md: "14px 18px" }}
                          >
                            <Text fontSize={{ base: '12px', md: "16px" }} fontweight="500">
                              {allocation?.name}
                            </Text>
                          </HStack>
                        </Radio>
                      ))}
                    </Flex>
                  </RadioGroup>
                ) : (
                  <Center h="50vh">
                    <Text fontSize={{ base: '12px', md: "14px" }} color="text" fontWeight="400" textAlign="'center">
                      No Allocation has been created for this unit.
                    </Text>
                  </Center>
                )}
                <HStack w="full" justify="flex-end" pt="0px" pb={{ base: '30px', md: "53px" }}>
                  <Button
                    h={{ base: '35px', md: "49px" }} w={{ base: '120px', md: "218px" }} bg="primary"
                    color="#fff" borderRadius="5px"
                    isDisabled={!allocationVal}
                    onClick={() => setConfirmBox(true)}
                  >
                    Proceed
                  </Button>
                </HStack>
              </Stack>
            )}
          </Box>
        </>
      ) : (
        <Box px="0" pt="27px" pb="0px">
          <VStack spacing="43px" justify="center" px="41px" h="full" w="full">
            <Text fontSize={{ base: '20px', md: "32px" }} fontWeight="600" color="text" textAlign={'center'}>
              Are you sure you want {allocationVal}?
            </Text>
            <HStack w="full" gap='5%'>
              <Button
                w="full" h={{ base: '35px', md: "60px" }}
                _hover={{ opacity: '1', }}
                border='1px solid' borderColor='primary'
                color='primary' bg='white' fontWeeight="400"
                fontSize={{ base: '14px', md: "18px" }} borderRadius="5px"
                onClick={() => setConfirmBox(false)}
              >
                No, go back
              </Button>
              <Button
                w="full" h={{ base: '35px', md: "60px" }}
                _hover={{ opacity: '1', }} color='white'
                bg='primary' borderRadius="5px"
                fontSize={{ base: '14px', md: "18px" }} fontWeight="400"
                onClick={handleSubmitAallocations}
              >
                {mutation.isLoading ? <BsThreeDots /> : 'Yes'}
              </Button>
            </HStack>
          </VStack>
        </Box>
      )}
    </>
  )

  return (
    <>
      {equity?.unit?.allocation_type === 'manual' && equity?.allocation ? (
        <HStack justify="space-between">
          <Text color="text" fontWeight={400} fontSize="14px" lineHeight="18px">
            Allocated unit
          </Text>

          <CustomizableButton
            cursor={'pointer'}
            onClick={PICK_ALLOCATION_MODAL.onOpen}
            w="auto" h="30px" borderRadius={'0'}
            fontWeight={500} fontSize="14px"
            lineHeight="18px"
            border={'1px solid #E4E4E4 !important'}
            color='#111926'
            bg='transparent'

          >
            {equity?.allocation}
          </CustomizableButton>
        </HStack>
      ) : equity?.unit?.allocation_type === 'auto' ? (
        <HStack justify="space-between">
          <Text color="text" fontWeight={400} fontSize="14px" lineHeight="18px">
            Allocated unit
          </Text>
          {equity?.allocation ? (
            <Text fontSize='16px' fontWeight='500' color='text'>
              {equity?.allocation}
            </Text>
          ) : equity?.can_allocate ? (
            <CustomizableButton
              onClick={ALLOCATIONS?.length ? PICK_ALLOCATION_MODAL.onOpen : null}
              cursor={'pointer'}
              w="auto" h="30px" borderRadius={'0'}
              fontWeight={500} fontSize="14px"
              lineHeight="18px"
              border={'1px solid #E4E4E4 !important'}
              color='#111926'
              bg='transparent'

            >
              Select allocation
            </CustomizableButton>
          ) : (
            <HStack spacing="8px">
              <Icon color='text' as={BsExclamationCircle} fontSize={'16px'} />
              <Text fontSize='16px' fontWeight='500' color='text'>
                Allocation not available
              </Text>
            </HStack>
          )}
        </HStack>
      ) : (
        <HStack justify="space-between">
          <Text color="text" fontWeight={400} fontSize="14px" lineHeight="18px">
            Allocated unit
          </Text>

          <CustomizableButton
            cursor={'pointer'}
            w="auto" h="30px" borderRadius={'0'}
            fontWeight={500} fontSize="14px"
            lineHeight="18px"
            border={'1px solid #E4E4E4 !important'}
            color='#111926'
            bg='transparent'
          >
            Not Eligible for Allocation
          </CustomizableButton>
        </HStack>
      )}


      {isMobile ? (
        <Drawer
          isCentered scrollBehavior="inside"
          onClose={PICK_ALLOCATION_MODAL?.onClose}
          isOpen={PICK_ALLOCATION_MODAL.isOpen}
          px='45px' mx='auto'
          minH='fit-content'
          minW={{ base: '90%', lg: '276px' }}
          placement='bottom'
        >
          <DrawerOverlay />
          <DrawerContent
            maxW='622px' maxH='80vh' bg='card_bg'
            p={{ base: '20px', md: '30px' }}
            borderTopRadius={{ base: '8px', md: '12px' }}
          >
            {mainContent}
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          isCentered scrollBehavior="inside"
          onClose={PICK_ALLOCATION_MODAL?.onClose}
          isOpen={PICK_ALLOCATION_MODAL.isOpen}
        >
          <ModalOverlay />
          <ModalContent
            maxH="96vh" py="36px" pb="33px"
            h="fit-content" maxW={!confirmBox ? '1124px' : '604px'}
            borderRadius="16px" w="full"
            px="54px" pr="51px" bg='card_bg'
          >
            {mainContent}
          </ModalContent>
        </Modal>

      )}
    </>
  );
};

export default SelectAllocation;
