import {
  Flex,
  RadioGroup,
  HStack,
  Text,
  Tooltip,
  Radio,
} from "@chakra-ui/react";
import React from "react";

const SelectUnit = ({ ALLOCATIONS, setAllocationVal, allocationVal }) => {
  const css = { ".chakra-radio__label": { marginLeft: "0px" } };

  return ALLOCATIONS?.length ? (
    <RadioGroup onChange={setAllocationVal} value={allocationVal}>
      <Text fontSize="17.25px" fontWeight="400" color="#191919">
        Select a Unit
      </Text>
      <Flex
        mt="18px"
        rowGap="20.101px"
        columnGap="12px"
        justifyContent="start"
        wrap="wrap"
        sx={css}
        w="full"
      >
        {ALLOCATIONS.map((allocation, idx) => {
          return (
            <Radio
              w="fit-content"
              minW="fit-content"
              key={idx}
              isDisabled={allocation?.allocated}
              value={allocation?.name}
              hidden
            >
              <Tooltip
                borderRadius="3px"
                fontSize="12px"
                hasArrow
                isDisabled={!allocation.allocated}
                placement="auto"
                label="This unit has been allocated"
              >
                <HStack
                  cursor={allocation.allocated ? "not-allowed" : "pointer"}
                  bg={allocationVal == allocation?.name ? "#191919" : "#E4E4E4"}
                  justify="center"
                  p={{ base: "10.5px 13.5px;", md: "7.875px 10.125px" }}
                  minH="33.27px"
                  minW="54.5px"
                >
                  <Text
                    fontSize={{ base: "12px", md: "9px" }}
                    color={
                      allocationVal == allocation?.name ? "#fff" : "#191919"
                    }
                    fontweight="400"
                  >
                    {allocation?.name}
                  </Text>
                </HStack>
              </Tooltip>
            </Radio>
          );
        })}
      </Flex>
    </RadioGroup>
  ) : null;
};

export default SelectUnit;
