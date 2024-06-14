import React, { useEffect, useState } from "react";
import { Morph } from "../../../../../ui-lib/ui-lib.components/morph";
import {
  Button,
  HStack,
  Input,
  Image,
  Stack,
  useMediaQuery,
  Text,
  AspectRatio,
  Box,
  VStack,
  Flex,
  Tooltip,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react";
import drawerArrow from "/src/images/icons/drawerArrow.svg";

import AllocationGallery from "../components/allocationGallery";

import SelectUnit from "../components/selectUnit";

const SelectAllocation = ({
  handleScreen,
  uploads,
  handleClose,
  ALLOCATIONS,
  setAllocationVal,
  allocationVal,
  FETCH_UNIT_ALLOCATIONS,
  FETCH_UNIT_ALLOCATION_IMAGES,
}) => {
  const [isBelowMd] = useMediaQuery("(max-width: 48em)");

  const customScrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "4px",
      borderRadius: "16px",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: "16px",
      WebkitBoxShadow: "inset 0 0 6px #ffffff",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "16px",
      backgroundColor: "#cbcbcb",
    },
  };

  // switch component depending on the screen size
  const Morphed = Morph[isBelowMd ? "drawer" : "modal"];
  return FETCH_UNIT_ALLOCATIONS.isLoading ||
    FETCH_UNIT_ALLOCATION_IMAGES.isLoading ? (
    <Center h="50vh">
      <Spinner color="#0D0D0D" />
    </Center>
  ) : FETCH_UNIT_ALLOCATIONS?.isError ? (
    <Center h="50vh">
      <Text
        fontSize="11px"
        color="#191919"
        fontWeight="400"
        textAlign="'center"
      >
        Oops something went wrong fetching allocations,please try again later.
      </Text>
    </Center>
  ) : (
    <>
      <HStack
        p={{ base: "22px 17px 22px 16px", md: "12px 18px 0px" }}
        w="full"
        justify="space-between"
      >
        <HStack role="button" onClick={handleClose} spacing="14px">
          <Image
            src={drawerArrow.src}
            boxSize="20px"
            display={{ md: "none", base: "inline-block" }}
          />{" "}
          <Text
            as="h1"
            fontSize={{ base: "23px", md: "17.25px" }}
            lineHeight={{ base: "32px", md: "24px" }}
            fontWeight="400"
            color="#000"
          >
            Unit Allocation
          </Text>
        </HStack>
        <Morphed.closeBtn position="initial" />
      </HStack>

      <Morphed.body
        sx={customScrollbarStyles}
        maxH={{ base: "432.25px", md: "404.25px" }}
        w="full"
        minW={{ lg: "525px" }}
        maxW={{ lg: "525px" }}
        p={{ base: "30px 18px 0px", md: "18px 18px 0px" }}
      >
        <Stack w="full" spacing="18px">
          <AllocationGallery uploads={uploads} />
          <SelectUnit
            ALLOCATIONS={ALLOCATIONS}
            setAllocationVal={setAllocationVal}
            allocationVal={allocationVal}
          />
        </Stack>
      </Morphed.body>
      <Morphed.footer
        p={{ md: "30px 18px 22.25px", base: "18px 18px 55.25px" }}
      >
        <Button
          p={{ base: "9.75px 24px", base: "" }}
          border="0.75px solid #DDB057"
          borderRadius="0px"
          fontSize="12px"
          fontWeight="500"
          color="#DDB057"
          isDisabled={!allocationVal}
          onClick={handleScreen("confirm selection")}
          _hover={{
            bg: "transparent",
          }}
          _focus={{
            bg: "transparent",
            border: "0.75px solid #DDB057 !important",
          }}
          _active={{
            bg: "transparent",
            border: "0.75px solid #DDB057 !important",
          }}
          variant="outline"
          w="full"
        >
          Proceed
        </Button>
      </Morphed.footer>
    </>
  );
};

export default SelectAllocation;
