import React, {useState} from 'react';
import {Text, Box, Image, Center, Textarea, useToast} from '@chakra-ui/react';
import processingLoader from '../../../images/processing-transaction.gif';
import successfulLoader from '../../../images/successful-transaction.gif';
import {Button} from '../../../ui-lib';
import {useMutation} from 'react-query';
import {PostForCustomerEquityValidationoOrDispute} from '../../../api/listing';
import {toastForError} from '../../../utils/toastForErrors';

const Dispute = ({equityData, setType, customScrollbarStyles, validation_requestsId, drawer}) => {
  const [message, setMessage] = useState('');
  const toast = useToast();

  const disputeEquity = useMutation(
    formData => PostForCustomerEquityValidationoOrDispute(formData),
    {
      onSuccess: res => {
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

  const handleDispute = () => {
    if (!isValid)
      return toast({
        description: 'Enter your message',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    const obj = {
      action: 'reject',
      reason: message,
      validation_request_id: validation_requestsId,
    };
    return disputeEquity.mutate(obj);
  };

  const isValid = !!message.trim();

  const handleResetModal = () => {
    disputeEquity.reset();
    drawer?.onClose();
  };

  return (
    <Box
      px={{base: '18px', md: '24px'}}
      pb="38px"
      h={'fit-content'}
      overflowY={'scroll'}
      __css={customScrollbarStyles}
    >
      <Box bg="background" p={{base: '12px', md: '25px'}}>
        <Text color="text" fontSize={{base: '13px', md: '16px'}} fontWeight={500} mb="10px">
          Is there any mistake in the information provided? Kindly let us know.
        </Text>

        <Textarea
          onChange={e => setMessage(e.target.value)}
          value={message}
          resize="none"
          placeholder="Tell us about the issue..."
          border="0.5px solid #D0D5DD !important"
          borderRadius={'2px'}
          w="full"
          h="155px"
        />

        <Button
          fontWeight="500"
          w="full"
          h="48px"
          disabled={disputeEquity.isLoading}
          loading={disputeEquity.isLoading}
          onClick={handleDispute}
          align="right"
          color="white"
          bg="primary"
          mt="30px"
          isLoading={disputeEquity.isLoading}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Dispute;
