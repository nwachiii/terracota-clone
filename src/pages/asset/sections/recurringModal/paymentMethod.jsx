import {
  Text,
  useToast,
  Modal,
  ModalContent,
  ModalOverlay,
  Flex,
  VStack,
  HStack,
  Center,
  Image,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useMediaQuery,
} from '@chakra-ui/react';
import {Button, CustomizableButton} from '../../../../ui-lib';
import {CheckIcon, CloseIcon} from '@chakra-ui/icons';
import {formatToCurrency} from '../../../../utils';
import stars from '../../../../images/stars.svg';
import {scrollBarStyles} from '../../../../components/common/ScrollBarStyles';
import {useMutation} from 'react-query';
import {setRecurringPayment} from '../../../../api/listing';

const PaymentMethod = ({
  recurringModal,
  setSelectedMethod,
  selectedMethod,
  methods,
  setStep,
  autoDebitFrequency,
  startDate,
  setAutoDebitFrequency,
  setStartDate,
  setAmountToPay,
  amountToPay,
  equity,
  refetch,
  selectedCard,
  setSelectedCard,
  onCloseModal,
}) => {
  const toast = useToast();
  const [isMobile] = useMediaQuery('(max-width: 700px)');

  const errorToast = desc =>
    toast({
      description: desc,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });

  const setRecurringMutation = useMutation(formdata => setRecurringPayment(formdata, equity?.id), {
    onSuccess: async res => {
      setAutoDebitFrequency(null);
      setStartDate('');
      setAmountToPay('0');
      setSelectedCard(null);
      setSelectedMethod(null);
      await refetch();
      recurringModal.onClose();
      toast({
        title: `Auto pay successfully set`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: err => {
      toast({
        title: `${err.response.data.resolve ?? 'Oops...'}`,
        description: `${err.message ?? err.response.data.message ?? err}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleProceed = () => {
    const formatted =
      startDate &&
      new Date(new Date(startDate)?.toString()?.split('GMT')[0] + ' UTC')
        ?.toISOString()
        ?.split('.')[0];
    const formdata = {
      auto_debit: true,
      auto_debit_frequency: autoDebitFrequency,
      start_date: formatted,
      auto_debit_source: selectedMethod?.source,
      auto_debit_amount: amountToPay,
      ...(selectedCard?.authorization_code ? {auth_code: selectedCard?.authorization_code} : {}),
    };

    if (!selectedMethod?.source) return errorToast(`Please choose a fund source`);
    if (selectedMethod?.source === 'card' && !selectedCard?.authorization_code)
      return errorToast(`If your debit source is card then, a saved card needs to be set.`);
    if (!Number(amountToPay)) return errorToast(`Please enter a valid amount`);
    if (!startDate) return errorToast(`Please choose a start date`);
    if (!autoDebitFrequency) return errorToast(`Please choose a debit frequency`);
    setRecurringMutation.mutate(formdata);
  };

  const handleSelect = method => {
    setSelectedMethod(method);
    if (method?.id === '1') setStep('selectCard');
  };

  function getNumberWithOrdinal(n) {
    var s = ['th', 'st', 'nd', 'rd'],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const mainContent = (
    <>
      <Flex direction="row" justify="space-between" align={'center'} mb="20px">
        <Text
          color="text"
          fontSize={{base: '18px', md: '28px'}}
          fontWeight={{base: 500, md: 500}}
          className="gilda-display-semibold"
        >
          Set Up Auto-Pay
        </Text>
        <CloseIcon
          fontSize={'18px'}
          color={'text'}
          style={{cursor: 'pointer'}}
          onClick={recurringModal?.onClose}
        />
      </Flex>
      <Flex
        justify={'center'}
        gap="4px"
        align={'center'}
        bg="#FBFCFC"
        py={{base: '18px', md: '25px'}}
        direction={'column'}
        border={'0.5px solid #E4E4E4'}
      >
        <Text color="text" fontSize={{base: '16px', md: '16px'}} fontWeight={400}>
          You will pay
        </Text>
        <Text
          color="text"
          fontSize={{base: '20px', md: '33px'}}
          fontWeight={500}
          className="gilda-display-semibold"
        >
          {formatToCurrency(amountToPay)}
        </Text>
        <Text color="text" fontSize={{base: '16px', md: '16px'}} fontWeight={400}>
          {autoDebitFrequency || '-'}
        </Text>
        {autoDebitFrequency && (
          <Text
            fontSize={'12px'}
            color="text"
            maxW="85%"
            mx="auto"
            textAlign={'center'}
            mt={{base: '8px', md: '13px'}}
          >
            <Text color="text" as="span" textTransform={'capitalize'}>
              {autoDebitFrequency?.toLowerCase()}
            </Text>{' '}
            automated deductions will be made from your designated fund source starting from{' '}
            <Text color="text" as="b" fontWeight={600}>
              {getNumberWithOrdinal(new Date(startDate).getDate())}{' '}
              {months[new Date(startDate).getMonth()]}
            </Text>
          </Text>
        )}
      </Flex>

      <Text
        color="text"
        fontSize={{base: '12px', md: '16px'}}
        mt={{base: '12px', md: '24px'}}
        mb={{base: '8px', md: '12px'}}
        fontWeight={500}
      >
        Select fund source
      </Text>
      <VStack spacing={{base: '12px', md: '16px'}} align={'stretch'}>
        {methods?.map(method => (
          <Flex
            w="full"
            p={{base: '12px', md: '16px'}}
            direction={'row'}
            key={method.id}
            onClick={() => handleSelect(method)}
            cursor="pointer"
            border={selectedMethod?.id === method.id ? '1px solid' : '1px solid'}
            borderColor={selectedMethod?.id === method.id ? '#191919' : '#E4E4E4'}
            _hover={{border: '1px solid', borderColor: '#E4E4E4'}}
            bg="#FBFCFC"
            justify="space-between"
          >
            <HStack spacing={'14px'} w="90%">
              <Image
                w={{base: '20px', md: 'auto'}}
                h={{base: '20px', md: 'auto'}}
                alt="next_image"
                src={method.img}
              />
              <VStack align={'stretch'} spacing={0}>
                <Flex align="center" gap="4px">
                  <Text color="text" fontSize={{base: '12px', md: '16px'}} fontWeight={600}>
                    {method.title}
                  </Text>
                  {method?.recommended && (
                    <Flex
                      color={'#FF9103'}
                      bg={'rgba(255, 145, 3, 0.10)'}
                      py="2px"
                      px="6px"
                      borderRadius={'full'}
                      align="center"
                      gap="2px"
                    >
                      <Image
                        w={{base: '10px', md: 'auto'}}
                        h={{base: '10px', md: 'auto'}}
                        alt="next_image"
                        src={stars.src}
                      />
                      <Text color="text" fontSize={{base: '8px', md: '10px'}}>
                        Recommended
                      </Text>
                    </Flex>
                  )}
                </Flex>
                {method.desc}
              </VStack>
            </HStack>
            <Center
              w="16px"
              h="16px"
              borderRadius={'full'}
              border="1px solid"
              borderColor={'#E4E4E4'}
            >
              {selectedMethod?.id === method.id && <CheckIcon color={'text'} fontSize={'10px'} />}
            </Center>
          </Flex>
        ))}
      </VStack>

      <Button
        isLoading={setRecurringMutation.isLoading}
        w="full"
        color="white"
        mt={{base: '20px', md: '30px'}}
        bg="primary"
        onClick={handleProceed}
      >
        Proceed
      </Button>

      <CustomizableButton
        mt={{base: '10px', md: '15px'}}
        bg="white"
        border="1px solid"
        borderColor="#191919"
        color="#191919"
        w="full"
        onClick={() => setStep('customizeRecurring')}
      >
        Customise Recurring Deposit
      </CustomizableButton>
    </>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          onCloseComplete={onCloseModal}
          mx="auto"
          placement="bottom"
          isOpen={recurringModal?.isOpen}
          onClose={recurringModal?.onClose}
          overflowY="scroll"
          css={scrollBarStyles}
        >
          <DrawerOverlay />
          <DrawerContent
            bg="card_bg"
            maxW="560px"
            minH="322px"
            px={{base: '20px', md: '50px'}}
            py="25px"
            borderTopRadius={{base: '10px', md: '16px'}}
          >
            {mainContent}
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          onCloseComplete={onCloseModal}
          mx="auto"
          isCentered
          isOpen={recurringModal?.isOpen}
          onClose={recurringModal?.onClose}
          overflowY="scroll"
          css={scrollBarStyles}
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            maxW="560px"
            minH="322px"
            px={{base: '20px', md: '50px'}}
            py="25px"
            borderRadius={{base: '10px', md: '0px'}}
          >
            {mainContent}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
export default PaymentMethod;
