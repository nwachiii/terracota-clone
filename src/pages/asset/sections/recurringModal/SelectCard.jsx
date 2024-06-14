import {
  Text,
  useToast,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Flex,
  VStack,
  HStack,
  Center,
  Image,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import {Button, CustomizableButton} from '../../../../ui-lib';
import {ArrowBackIcon, CheckIcon, CloseIcon} from '@chakra-ui/icons';
import {themeStyles} from '../../../../theme';
import EmptyState from '../../../../components/appState/empty-state';
import {useQuery} from 'react-query';
import {fetchSavedCards} from '../../../../api/payment';
import debitCard from '../../../../images/icons/debit-card.svg';
import emptyCard from '../../../../images/icons/credit-card-duotone.svg';
import {useMutation} from 'react-query';
import {BiPlus} from 'react-icons/bi';
import {appWindow, storeName} from '../../../../constants/routes';
import {makeeDepositToWallet} from '../../../../api/Wallet';
import {formatToCurrency} from '../../../../utils';
import isMobile from '../../../../utils/extras';

const PaymentMethod = ({
  recurringModal,
  setStep,
  setSelectedCard,
  selectedCard,
  amountToPay,
  autoDebitFrequency,
  onCloseModal,
  startDate,
}) => {
  const toast = useToast();
  const {data} = useQuery(['cardSaved'], fetchSavedCards);

  const MAKE_DEPOSITS_MUTATION = useMutation(formData => makeeDepositToWallet(formData), {
    onSuccess: res => {
      const link = res?.data?.data?.data?.link;
      if (link) openExternalUrl(link, '_blank');
    },
    onError: err => {
      toast({
        title: 'Oops...',
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.response?.data[0] ??
          'Something went wrong'
        }`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleAddNewCard = () => {
    const body = {
      amount: Number(50),
      channel: 'card',
      store: storeName,
    };
    MAKE_DEPOSITS_MUTATION.mutate(body);
  };

  const handleSelectACArd = () => {
    if (selectedCard) {
      setStep('type');
    } else {
      return toast({
        title: 'Cannot Initiate Deposit',
        description: `Please select a card to use`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
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
      <Flex
        display={{base: 'none', md: 'flex'}}
        justify={'space-between'}
        align={'center'}
        mb="20px"
      >
        <HStack spacing="12px" onClick={() => setStep('type')} cursor="pointer">
          <ArrowBackIcon fontSize={'25px'} cursor="pointer" color="text" />
          <Text fontSize={'28px'} fontWeight={500} color="text" className="gilda-display-semibold">
            Recurring Deposit
          </Text>
        </HStack>
        <CloseIcon
          fontSize={'15px'}
          cursor="pointer"
          color="text"
          onClick={recurringModal?.onClose}
        />
      </Flex>
      {amountToPay && (
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
      )}

      <Text
        color="text"
        fontSize={{base: '12px', md: '16px'}}
        mt={{base: '12px', md: '16px'}}
        mb={{base: '8px', md: '10px'}}
      >
        Select fund source
      </Text>
      <VStack spacing={{base: '12px', md: '16px'}} mt="6px" align={'stretch'}>
        {data?.data?.results?.length ? (
          <>
            {data?.data?.results?.map((card, index) => (
              <Flex
                key={card?.id}
                onClick={() => setSelectedCard(card)}
                cursor="pointer"
                gap="5px"
                justify="space-between"
                direction={'row'}
                px={{base: '10px', md: '14px'}}
                py={{base: '12px', md: '16px'}}
                w="full"
                p={{base: '12px', md: '16px'}}
                border={selectedCard?.id === card.id ? '1px solid' : '1px solid'}
                borderColor={selectedCard?.id === card.id ? '#191919' : '#E4E4E4'}
                _hover={{border: '1px solid', borderColor: '#E4E4E4'}}
                bg="#FBFCFC"
              >
                <HStack spacing={{base: '10px', md: '14px'}}>
                  <Image w={{base: '25px', md: 'auto'}} alt="next_image" src={debitCard.src} />
                  <VStack align={'stretch'} spacing={0}>
                    <Text color="text" {...themeStyles.textStyles.sl5}>
                      {card?.bank}
                    </Text>
                    <Text color="text" {...themeStyles.textStyles.sl5}>
                      **** ****{card?.last4}
                    </Text>
                  </VStack>
                </HStack>

                <Center
                  w="16px"
                  h="16px"
                  borderRadius={'full'}
                  border="1px solid"
                  borderColor={'#E4E4E4'}
                >
                  {selectedCard?.id === card.id && <CheckIcon color={'text'} fontSize={'10px'} />}
                </Center>
              </Flex>
            ))}
          </>
        ) : (
          <EmptyState
            icon={<Image w={{base: '25px', md: 'auto'}} alt="next_image" src={emptyCard.src} />}
            noHeader
            text={'No card has been added yet˙'}
            height="100px"
          />
        )}
      </VStack>

      {selectedCard ? (
        <>
          <Button onClick={handleSelectACArd} w="full" color="white" mt="30px" bg="primary">
            Proceed
          </Button>
          <CustomizableButton
            mt="15px"
            bg="white"
            border="1px solid"
            w="full"
            onClick={() => setStep('customizeRecurring')}
            borderColor="#191919"
            color="#191919"
          >
            Customise Recurring Deposit
          </CustomizableButton>
        </>
      ) : (
        <CustomizableButton
          mt="20px"
          border="1px solid !important"
          borderColor="#191919"
          leftIcon={<BiPlus size={20} />}
          onClick={handleAddNewCard}
          w="150px"
          bg="transparent"
          color="#191919"
        >
          {MAKE_DEPOSITS_MUTATION?.isLoading ? <Spinner /> : 'Add Card'}
        </CustomizableButton>
      )}
    </>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          autoFocus={false}
          onCloseComplete={onCloseModal}
          mx="auto"
          isOpen={recurringModal?.isOpen}
          onClose={recurringModal?.onClose}
          placement="bottom"
        >
          <DrawerOverlay />
          <DrawerContent
            bg="card_bg"
            maxW="560px"
            minH="302px"
            px={{base: '20px', md: '50px'}}
            py="25px"
            borderTopRadius={{base: '10px', md: '16px'}}
          >
            {mainContent}
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          autoFocus={false}
          onCloseComplete={onCloseModal}
          mx="auto"
          isOpen={recurringModal?.isOpen}
          onClose={recurringModal?.onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            maxW="560px"
            minH="302px"
            px={{base: '20px', md: '35px'}}
            pt="25px"
            pb="35px"
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
