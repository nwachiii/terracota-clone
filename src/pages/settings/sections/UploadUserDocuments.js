import { Flex, Text, useToast } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { encodeFileToBase64 } from "../../../utils";
import { Button } from "../../../ui-lib";

export const UploadUserDocuments = ({ handleDocument, displayText }) => {
  const extractBase64 = (arr) => arr.map((file) => file.image);
  const [files, setFiles] = useState([]);
  const toast = useToast();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: { "image/*": [] },
    maxSize: 2 * 1024 * 1024,
    multiple: false,
    onDrop: useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) =>
        encodeFileToBase64(file).then((res) => {
          setFiles((prevValue) => [
            ...prevValue,
            Object.assign({ image: res }, file, {
              preview: URL.createObjectURL(file),
            }),
          ]);
        })
      );
    }),
  });

  useEffect(() => {
    if (fileRejections.length) {
      toast({
        description: `${fileRejections[0].errors[0].code}: file is larger than 2MB`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [fileRejections, acceptedFiles]);

  useEffect(() => {
    if (files.length) {
      handleDocument(extractBase64(files));
    }
  }, [files]);

  useEffect(() => {
    return () =>
      files && files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Flex
      w="full"
      px="12px"
      py="8px"
      border="1px solid #E4E4E4"
      align={"center"}
      gap="7px"
      justify="space-between"
      {...getRootProps({ className: "dropzone" })}
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <Text
          color="#191919"
          letterSpacing="0.52px"
          fontWeight={500}
          fontSize={13}
        >
          Drop the files here ...
        </Text>
      ) : (
        <Text
          color="#191919"
          letterSpacing="0.52px"
          fontWeight={500}
          fontSize={13}
        >
          {displayText}
        </Text>
      )}
      <Button bg="#919191" color="#fff" borderRadius="0">
        Choose file
      </Button>
    </Flex>
  );
};

export default UploadUserDocuments;
