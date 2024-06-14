import {useEffect, useState} from 'react';
import {Image, Modal, ModalContent, ModalOverlay, useToast} from '@chakra-ui/react';
import {useMutation, useQuery} from 'react-query';

import {
  fetchSupportChats,
  fetchSupportEvents,
  getSupportInitiation,
  initiateSupport,
  sendMessage,
} from '../../api/support';
import {encodeFileToBase64} from '../../utils';
import {toastForError} from '../../utils/toastForErrors';
import InitiateChatBody from './InitiateChatBody';
import ChatWindow from './ChatWindow';

import supportIcon from '../../images/icons/support-icon.svg';
import supportCloseIcon from '../../images/icons/support-cancel.svg';
import {BUSINESS_ID} from '../../constants/routes';

const SupportMenu = ({isOpen, onClose, onOpen}) => {
  const toast = useToast();

  const [initiateChat, setInitiateChat] = useState(true);
  const [supportType, setSupportType] = useState('');
  const [supportId, setSupportId] = useState(0);
  const [message, setMessage] = useState('');
  const [fetchChatsApi, setFetchChatsApi] = useState(false);
  const [goBack, setGoBack] = useState(true);
  // useState for upload result
  const [attachment, setAttachment] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null || undefined);
  const [uploadedImage, setUploadedImage] = useState(null || undefined);

  // get logged in user
  const loggedInUserObject =
    typeof window !== 'undefined' &&
    localStorage.getItem('LoggedinUser') !== 'undefined' &&
    JSON?.parse(localStorage.getItem('LoggedinUser'));

  const loggedInUserId = loggedInUserObject?.user?.id;

  const supportMutation = useMutation(value => initiateSupport(value), {
    onSuccess: async res => {
      setInitiateChat(false);

      if (res?.data?.data?.title === 'transaction_issues') {
        setSupportType('Transaction Issues');
      } else if (res?.data?.data?.title === 'bug_report') {
        setSupportType('Bug Report');
      } else if (res?.data?.data?.title === 'enquiries') {
        setSupportType('Enquiries');
      } else if (res?.data?.data?.title === 'something_else') {
        setSupportType('Something Else');
      }

      setSupportId(res?.data?.data?.id);
    },
    onError: err => {
      return toast({
        title: err?.message === 'Network Error' ? 'Network Error' : 'Oops something went wrong',
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.message ??
          'Something went wrong,we are working on resolving it.'
        }`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleSupportType = value => {
    const body = {
      title: value,
    };

    supportMutation.mutate(body);
  };

  const GET_SUPPORT_INITIATION = useQuery(
    ['support-initiated', BUSINESS_ID()],
    () => getSupportInitiation(BUSINESS_ID()),
    {enabled: !!BUSINESS_ID()}
  );

  // get all the chats
  const {data, error, isError, isLoading, refetch} = useQuery(
    ['get-chats', supportId],
    () => fetchSupportChats(supportId),
    {
      enabled: !!GET_SUPPORT_INITIATION?.data?.data?.data?.id || fetchChatsApi,
    }
  );

  const messageMutation = useMutation(formData => sendMessage(supportId, formData), {
    onSuccess: async res => {
      setFetchChatsApi(true);
      await refetch();
      setGoBack(false);
    },
    onError: err => {
      return toast({
        title: err?.message === 'Network Error' ? 'Network Error' : 'Oops something went wrong',
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.message ??
          'Something went wrong,we are working on resolving it.'
        }`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleChange = e => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  // attachment part
  // file part
  const addFile = file => {
    let fileType = file.type;
    let validExtensions = ['application/pdf'];

    if (validExtensions.includes(fileType)) {
      setUploadedFile(file);
    }
  };

  const handleFileChange = e => {
    const file = e.target.files[0];

    if (file?.size > 2000000) {
      return toast({
        title: 'hmm...',

        description: `File too large: file is larger than 2MB`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    }

    const result = e.target.files[0];
    addFile(result);
    setAttachment(true);
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  // image part
  const addImage = image => {
    let imageType = image.type;
    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

    if (validExtensions.includes(imageType)) {
      setUploadedImage(image);
    }
  };

  const handleImageChange = e => {
    if (e.target.files !== null) {
      let image = e.target.files[0];
      addImage(image);
    }
    setAttachment(true);
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  const handleSubmit = async () => {
    if (message.trim() === '') {
      return toast({
        title: 'Empty Message',

        description: `Message cannot be empty`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    }

    const body = {
      content: message,
    };

    // Check if an uploaded file exists
    if (uploadedFile) {
      try {
        // Encode the uploaded file to base64
        const fileBase64 = await encodeFileToBase64(uploadedFile);
        body.attachment = fileBase64;
      } catch (error) {
        toastForError(error, true, toast);
      }
    }

    // Check if an uploaded image exists
    if (uploadedImage) {
      try {
        // Encode the uploaded image to base64
        const ImageBase64 = await encodeFileToBase64(uploadedImage);
        body.image = ImageBase64;
      } catch (error) {
        console.error('Error encoding image to base64:', error);
      }
    }

    messageMutation.mutate(body);

    setMessage('');
    setUploadedFile(null);
    setUploadedImage(null);
  };

  // for enter key to trigger the submit button
  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (
      GET_SUPPORT_INITIATION?.data?.data !== undefined &&
      GET_SUPPORT_INITIATION?.error === null
    ) {
      setSupportId(GET_SUPPORT_INITIATION?.data?.data?.data?.id);
    }
  }, [GET_SUPPORT_INITIATION]);

  return (
    <>
      {!isOpen ? (
        <Image
          w="60px"
          h="60px"
          src={supportIcon.src}
          alt="support icon"
          borderRadius={50}
          position="fixed"
          bottom="30"
          right={{base: '3%', md: '90'}}
          onClick={onOpen}
          cursor="pointer"
        />
      ) : (
        <Image
          w="60px"
          h="60px"
          src={supportCloseIcon.src}
          alt="close icon"
          borderRadius={50}
          position="fixed"
          bottom="30"
          right={{base: '3%', md: '90'}}
          onClick={onClose}
          cursor="pointer"
          zIndex={10000}
        />
      )}
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        {/* <ModalOverlay /> */}
        <ModalContent
          position={'absolute'}
          right={{base: '6%', md: '7%'}}
          bottom={'4%'}
          borderRadius="16px"
          height={{base: '530px', md: '572px'}}
          width={{base: '350px', md: '400px'}}
        >
          {initiateChat &&
          GET_SUPPORT_INITIATION?.data?.data === undefined &&
          GET_SUPPORT_INITIATION?.error?.response?.status === 404 ? (
            <InitiateChatBody handleSupportType={handleSupportType} />
          ) : (
            <ChatWindow
              data={data}
              supportType={supportType}
              loggedInUserId={loggedInUserId}
              handleFileChange={handleFileChange}
              handleImageChange={handleImageChange}
              removeFile={removeFile}
              removeImage={removeImage}
              message={message}
              handleChange={handleChange}
              handleKeyDown={handleKeyDown}
              uploadedFile={uploadedFile}
              uploadedImage={uploadedImage}
              handleSubmit={handleSubmit}
              attachment={attachment}
              goBack={goBack}
              altSupportType={GET_SUPPORT_INITIATION?.data?.data?.data?.title}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SupportMenu;
