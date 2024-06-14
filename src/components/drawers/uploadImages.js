import { Box, Flex, Icon, Image, Stack, Text, VStack, useToast, Center } from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { encodeFileToBase64 } from './../../utils';
import uploadIcon from "./../../images/icons/Upload_settings.svg";
import { CloseIcon } from '@chakra-ui/icons';
import { FaPlus } from 'react-icons/fa';

const UploadImages = props => {
  const { setFieldValue, files, setFiles, values, maxFiles, index, ...rest } = props;

  const toast = useToast();

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxSize: 2 * 1024 * 1024,

    // maxFiles: maxFiles || 1,

    onDrop: useCallback(acceptedFiles => {
      acceptedFiles.forEach(file =>
        encodeFileToBase64(file).then(res => {
          setFiles(prevValue => [
            ...prevValue,
            Object.assign({ image: res }, file, {
              preview: URL.createObjectURL(file),
            }),
          ]);
        })
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  });
  const removeFile = index => {
    const copy = [...files];
    for (let i = 0; i < copy.length; i++) {
      if (i == index) {
        copy.splice(i, 1);
        i = copy.length;
      }
    }
    setFiles(copy);
  };

  useEffect(() => {
    if (files.length > maxFiles) {
      setFiles(files.slice(0, maxFiles));
      toast({
        description: `Sorry, you're limited to ${maxFiles} image uploads.`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [files, setFiles, toast, maxFiles]);

  const thumbs =
    files &&
    files?.slice(0, maxFiles)?.map((file, index) => (
      <Flex maxW="680px" wrap="flex-wrap" key={index} align="center" h="full">
        <Box pos="relative" h="full" pr="14.9px">
          {/* <Icon
            as={}
            cursor="pointer"
            onClick={() => removeFile(index)}
            pos="absolute"
            right="-20%"
            zIndex={1000}
            top="0"
            width="30px"
            height="30px"
            alt="cancel_icon"
            color="red"
          /> */}

          <Center
            pos="absolute" right="50%" mx="0 auto" left="50%"
            transform="translateX(-50%)" zIndex={1000} bottom="0"
            cursor='pointer' bg='#d1d1d1' w='25px'
            h='25px' borderRadius='full'
            onClick={() => removeFile(index)}
          >
            <CloseIcon fontSize={10} />
          </Center>

          <Image
            alt="image preview"
            w="70px"
            maxW="70px"
            objectFit="cover"
            maxH="70px" h="70px"
            borderRadius="10px"
            src={file.preview}
            onLoad={() => {
              URL.revokeObjectURL(file.image);
            }}
          />
        </Box>
      </Flex>
    ));


  useEffect(() => {
    return () => files && files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Box
      h="129px" w="full"
      border="0.5px solid #DADADA"
      borderRadius="5px"
      display="flex"
      justifyContent="start"
      alignItems="center"
      flexWrap="wrap"
      overflowY="scroll"
      sx={customScrollbarStyles}
      {...rest}
    >
      {files && files.length > 0 ? (
        <Flex flexWrap="wrap" rowGap="20px" align={'center'} py="13px" px="20px">
          {thumbs}
          <input
            disabled={files.length >= maxFiles}
            // accept=".jpg, .png"
            accept="image/*"
            {...getInputProps()}
          />
          {files.length >= maxFiles ? null : (
            <div {...getRootProps({ className: 'dropzone' })} style={{ height: 'fit-content' }}>
              <Center cursor='pointer' bg='#d1d1d1' w='25px' h='25px' borderRadius='full'>
                <FaPlus size={12} style={{ cursor: 'pointer' }} />
              </Center>
            </div>
          )}
        </Flex>
      ) : (
        <VStack
          w="full"
          align="center"
          cursor="pointer"
          h="100%"
          spacing={6}
          justify="center"
          pos="relative"
          {...getRootProps({ className: 'dropzone' })}
        >
          <input accept=".jpg, .png" {...getInputProps()} />

          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <Stack spacing="8px" align="center">
              <Image src={uploadIcon.src} alt="upload icon" boxSize="19.4px" />
              <Text w="full" textAlign="center" fontSize="8px" fontWeight="400" color="text">
                Upload image
              </Text>
            </Stack>
          )}
        </VStack>
      )}
    </Box>
  );
};

export default UploadImages;
