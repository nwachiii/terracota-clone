import {Box, Flex, Text, Center, Image, HStack} from '@chakra-ui/react';
import {Button, CustomizableButton} from '../../../ui-lib';
import processingLoader from '../../../images/processing-transaction.gif';
import successfulLoader from '../../../images/successful-transaction.gif';
import orangeAlertIcon from '../../../images/icons/orange-alert-icon.svg';
import {useMutation} from 'react-query';
import {PostForCustomerEquityValidationoOrDispute} from '../../../api/listing';
import {toastForError} from '../../../utils/toastForErrors';

const ConfirmValidate = ({validation_requestsId, refetch, setType, customScrollbarStyles}) => {
  const validateEquity = useMutation(
    formData => PostForCustomerEquityValidationoOrDispute(formData),
    {
      onSuccess: async res => {
        await refetch();
        toast({
          title: `Thank you for the feedback`,
          description: 'We’ll get back to you as soon as possible.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  const handleValidation = () => {
    const obj = {
      action: 'accept',
      validation_request_id: validation_requestsId,
    };

    return validateEquity.mutate(obj);
  };

  return (
    <Box
      px={{base: '18px', md: '24px'}}
      pb="38px"
      h={'fit-content'}
      overflowY={'scroll'}
      __css={customScrollbarStyles}
    >
      <Flex
        bg="background"
        p="12px"
        w="full"
        direction="column"
        justify={'center'}
        align={'center'}
        gap="20px"
      >
        <Text
          color="text"
          fontWeight={500}
          fontSize="18px"
          lineHeight={'36px'}
          className="gilda-display-regular"
        >
          Are you sure?
        </Text>
        <HStack
          align="start"
          spacing="7.42px"
          p="10px"
          w="full"
          borderRadius="2px"
          border="0.5px solid #DD4449"
          bg="rgba(221, 68, 73, 0.1)"
        >
          <Image src={orangeAlertIcon.src} alt="orange alert icon" />
          <Text mt="-2px" fontSize="11.448px" fontWeight="300" color="#DD4449">
            We kindly request your confirmation regarding the property, amount paid, transaction
            date, and the ownership of the uploaded documents. If any information is inaccurate,
            please initiate a dispute. However, if all details are accurate, we kindly ask you to
            proceed with validation.
          </Text>
        </HStack>

        <Flex mt="10px" gap="8px" align="center" mx={'auto'} w="full">
          <CustomizableButton
            border="1px solid !important"
            borderColor="primary"
            bg="transparent"
            h="49px"
            w="50%"
            color="primary"
            onClick={() => setType('summary')}
          >
            No, Go back
          </CustomizableButton>
          <Button
            onClick={handleValidation}
            bg="primary"
            borderColor="primary"
            color="white"
            h="49px"
            w="50%"
            isLoading={validateEquity.isLoading}
          >
            Yes, Validate
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ConfirmValidate;
