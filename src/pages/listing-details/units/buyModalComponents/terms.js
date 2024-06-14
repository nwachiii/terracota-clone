import React, {useEffect, useState} from 'react';
import {
  ModalContent,
  ModalBody,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  Box,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  VStack,
  Image,
  Center,
} from '@chakra-ui/react';
import {Button, CustomizableButton, Spinner} from '../../../../ui-lib';
import {useQuery} from 'react-query';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter} from 'next/router';
import {fetchPaymentPlanDoc} from '../../../../api/listings';
import isMobile from '../../../../utils/extras';
import {ArrowBackIcon, CloseIcon} from '@chakra-ui/icons';
import purchaseAgreement from '../../../../images/icons/purchase-agreement.svg';

const Terms = ({
  fullPayment,
  onCloseModal,
  setStep,
  PAYMENT_PLAN_DATA,
  buyModal,
  selectedPlan,
  setAmountToPay,
  unitData,
  setFullPayment,
}) => {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const param = fullPayment
    ? `unit=${router.query?.unit}&purpose=outright`
    : `plan=${selectedPlan?.id}&purpose=paymentplan`;
  const projectDocQuery = useQuery(['fetchPaymentPlanDoc', param], () =>
    fetchPaymentPlanDoc(param)
  );
  const projectDocument =
    projectDocQuery.data?.data?.results?.[0]?.document_file ||
    projectDocQuery.data?.data?.results?.[0]?.document_url;

  useEffect(() => {
    if (fullPayment) {
      let totalFee = Number(unitData?.price);
      unitData?.fees?.forEach(fee => {
        totalFee = totalFee + Number(fee?.amount);
      });
      setAmountToPay(totalFee);
    } else {
      setAmountToPay(selectedPlan?.initial_deposit_in_value || unitData?.price);
    }
  }, [fullPayment]);

  const handleBack = () => {
    if (selectedPlan) setStep('plan');
    else {
      setFullPayment(false);
      setStep('type');
    }
  };

  const isSafari =
    typeof window !== 'undefined' &&
    !window.navigator?.userAgent.includes('Chrome') &&
    window.navigator?.userAgent.includes('Safari');

  const mainContent = (
    <>
      <Flex align={'center'} justify={'space-between'}>
        <HStack align={'center'} spacing={'10px'}>
          {PAYMENT_PLAN_DATA?.length > 1 && (
            <ArrowBackIcon
              color="text"
              fontSize={'25px'}
              onClick={handleBack}
              style={{cursor: 'pointer'}}
            />
          )}
          <Text
            color="text"
            fontSize={{base: '23px', md: '28px'}}
            fontWeight={400}
            className="gilda-display-regular"
          >
            Purchase Agreement
          </Text>
        </HStack>
        <CloseIcon fontSize={'15px'} onClick={onCloseModal} />
      </Flex>

      <Box overflowY={'scroll'} my="22px">
        {projectDocQuery?.isLoading ? (
          <Center h="full">
            <Spinner size={40} noAbsolute />
          </Center>
        ) : (
          <VStack spacing={'20px'} h="full">
            <Image src={purchaseAgreement.src} />
            <a href={projectDocument} target="_blank">
              <Button
                border="1px solid !important"
                color="primary"
                bg="white"
                h="35px"
                w="164px"
                borderColor="primary"
              >
                View Document
              </Button>
            </a>
            <HStack
              w="full"
              spacing="10px"
              onClick={() => setAccepted(!accepted)}
              cursor={'pointer'}
              align={'flex-start'}
            >
              <Center
                mt="2px"
                w="20px"
                h="20px"
                borderRadius={'full'}
                border={'1px solid'}
                borderColor="primary"
              >
                {accepted && <Box w="12px" h="12px" borderRadius={'full'} bg="primary" />}
              </Center>
              <Text w="fit-content" fontSize={'14px'} fontWeight={300} color={'#333'}>
                By checking this box, I acknowledge that I’ve read and accept the terms of the
                agreement.
              </Text>
            </HStack>
          </VStack>
        )}
      </Box>

      <Flex my="20px" justify="center" align="center" gap="20px">
        <CustomizableButton
          border="1px solid !important"
          color="primary"
          borderColor="primary"
          bg="white"
          h="49px"
          w="302px"
          onClick={buyModal?.onClose}
        >
          Cancel
        </CustomizableButton>
        <Button
          disabled={!accepted}
          isDisabled={!accepted}
          onClick={() => setStep('summary')}
          color="white"
          w="302px"
          bg="primary"
          h="49px"
        >
          Accept & Continue
        </Button>
      </Flex>
    </>
  );
  return (
    <>
      {isMobile ? (
        <Drawer
          autoFocus={false}
          blockScrollOnMount
          onCloseComplete={onCloseModal}
          isCentered
          onClose={buyModal?.onClose}
          isOpen={buyModal?.isOpen}
          placement="bottom"
        >
          <DrawerOverlay />
          <DrawerContent
            bg="card_bg"
            maxW="944px"
            px={{base: '18px', md: '35px'}}
            py={{base: '18px', md: '30px'}}
            h="fit-content"
            // borderTopRadius={{base: '10px', md: '16px'}}
          >
            {mainContent}
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          autoFocus={false}
          blockScrollOnMount
          onCloseComplete={onCloseModal}
          isCentered
          onClose={buyModal?.onClose}
          isOpen={buyModal?.isOpen}
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            maxW="470px"
            px={{base: '18px', md: '35px'}}
            py={{base: '18px', md: '30px'}}
            h="fit-content"
            borderRadius={0}
          >
            {mainContent}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Terms;
