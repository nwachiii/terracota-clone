import {DrawerBody, Flex, Text, Center, Image} from '@chakra-ui/react';
import {Button, CustomizableButton} from '../../../../ui-lib';
import processingLoader from '../../../../images/processing-transaction.gif';
import successfulLoader from '../../../../images/successful-transaction.gif';
import ExistingCard from '../../../payment/ExistingCard';
import {formatToCurrency} from '../../../../utils';

const ConfirmCard = ({
  selectedCard,
  setSelectedCard,
  loading,
  success,
  proceed,
  amountToPay,
  setPaymentStep,
}) => {
  return (
    <DrawerBody>
      {success ? (
        <Center
          mt="20px"
          w="full"
          h="full"
          maxH={'450px'}
          flexDirection={'column'}
          textAlign={'center'}
        >
          <Image alt="loader" w="150px" h="150px" src={successfulLoader.src} />
          <Text
            color="text"
            fontWeight={500}
            fontSize={'28px'}
            my="25px"
            className="gilda-display-regular"
          >
            Transaction Successful
          </Text>
          <Text color="text" fontSize={'16px'} fontWeight="400">
            Your payment has been successfully processed
          </Text>
        </Center>
      ) : loading ? (
        <Center
          mt="20px"
          w="full"
          h="full"
          maxH={'450px'}
          flexDirection={'column'}
          textAlign={'center'}
        >
          <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
          <Text
            color="text"
            fontWeight={500}
            fontSize={'28px'}
            my="25px"
            className="gilda-display-regular"
          >
            Processing payment
          </Text>
          <Text color="text" fontSize={'16px'} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Flex
          w="full"
          h="fit-content"
          direction="column"
          justify={'center'}
          align={'center'}
          gap="20px"
        >
          <Flex
            my="12px"
            h="130px"
            w="full"
            color="white"
            border="1px solid"
            borderColor={'shade'}
            bg="card_bg"
            align={'center'}
            justify={'center'}
            direction="column"
          >
            <Text color="text" fontSize={{base: '14px', md: '16px'}} fontWeight={400}>
              You will Pay
            </Text>
            <Text
              color="text"
              fontSize={{base: '28px', md: '33px'}}
              fontWeight={500}
              className="gilda-display-regular"
            >
              {formatToCurrency(amountToPay)}
            </Text>
          </Flex>

          <ExistingCard
            proceed={proceed}
            amountToPay={amountToPay}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />

          <Flex mt="27px" gap="26px" justify="space-between" align="center" w="full">
            <CustomizableButton
              border="1px solid black"
              color="black"
              bg="white"
              h="49px"
              w={{base: '50%', md: '250px'}}
              onClick={() => setPaymentStep('index')}
            >
              Cancel
            </CustomizableButton>
            <Button
              disabled={!selectedCard}
              isDisabled={!selectedCard}
              onClick={proceed}
              color="white"
              w={{base: '50%', md: '250px'}}
              bg="primary"
              h="49px"
            >
              Proceed
            </Button>
          </Flex>
        </Flex>
      )}
    </DrawerBody>
  );
};

export default ConfirmCard;
