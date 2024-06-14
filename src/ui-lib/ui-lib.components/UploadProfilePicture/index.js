import { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";
import { Image, Flex, Stack, Box } from "@chakra-ui/react";
import fallbackSrc from "../../../images/avatar.jpeg";
import Camera from "../../../images/icons/camera.png";
import { encodeFileToBase64 } from "../../../utils";
import { Spinner } from "../Spinner";

export const UploadProfilePicture = ({
  files,
  setFiles,
  profileFallback,
  containerStyle,
  isLoading,
  isAvatarLoading,
  avatar,
  numOfFiles,
  ...restProps
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: numOfFiles || "",
    onDrop: useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) =>
        encodeFileToBase64(file)
          .then((res) => {
            setFiles([
              Object.assign(
                { image: res },
                { preview: URL.createObjectURL(file), }
              ),
            ]);
          })
          .catch((err) => {
            return err;
          })
      );
    }, []),
  });

  return (
    <section className="container" style={containerStyle}>
      <Stack
        align="center" direction="row" as="div"
        {...getRootProps({ className: "dropzone" })}
        {...restProps}
      >
        {isAvatarLoading ? (
          <Spinner noAbsolute />
        ) : (
          <Flex align={"start"}>
            <Image
              src={profileFallback?.src || avatar || fallbackSrc.src}
              objectFit="cover" height={"128px"} width={"128px"}
              borderRadius="full" cursor="pointer" alt=""
            />
            <Box ml={"-40px"} mt='-20px'>
              <Image
                borderRadius="full" src={Camera.src}
                height={"46px"} width={"46px"} alt=""
              />
            </Box>
          </Flex>
        )}
        <input {...getInputProps()} />
      </Stack>
    </section>
  );
};
