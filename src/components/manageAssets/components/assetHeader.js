import { Box, Heading, Skeleton, Text, VStack } from "@chakra-ui/react";
import React from "react";

const AssetHeader = ({ bgImg, listingName, unitName, ...rest }) => {
  return (
    <Skeleton w="full" isLoaded={bgImg}>
      <VStack
        w="full"
        position="relative"
        h={{ xl: "152px", base: "129px" }}
        bgImage={`${bgImg}`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        justify="center"
        align="center"
        spacing={{ base: "13.38", xl: "11px" }}
        {...rest}
      >
        <Box
          position="absolute"
          left="0"
          w="full"
          h="full"
          bg="rgba(0,0,0,0.3)"
        />
        <Text
          as="header"
          fontSize="40px"
          position="relative"
          zIndex={1}
          fontWeight="400"
          color="#ffffff"
          textAlign="center"
          lineHeight="28px"
          className="gilda-display-regular"
        >
          {listingName}
        </Text>
        <Text
          fontSize={{ md: "16px", base: "14px" }}
          fontWeight="400"
          color="#ffffff"
          position="relative"
          zIndex={1}
          textAlign="center"
          lineHeight={{ md: "22px", base: "20px" }}
        >
          {unitName}
        </Text>
      </VStack>
    </Skeleton>
  );
};

export default AssetHeader;
