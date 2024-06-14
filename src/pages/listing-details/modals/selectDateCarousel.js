import {HStack, Text, VStack} from '@chakra-ui/react';
import React from 'react';

const SelectDateCarousel = ({mainDate, handleSelectedDate}) => {
  const getDatesArray = weeks => {
    const datesArray = [];
    const currentDate = new Date();
    const numberOfDays = weeks * 7;

    for (let i = 0; i <= numberOfDays; i++) {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + i);

      //create date array obj

      const dateArrayObj = {
        date: newDate.toISOString().split('T')[0],
        dayOfWeek: newDate.toLocaleString('en-US', {weekday: 'long'}),
        month: newDate.toLocaleString('en-US', {month: 'short'}),
        dayOfMonth: newDate.getDate(),
      };

      datesArray.push(dateArrayObj);
    }

    return datesArray;
  };
  const customScrollbarStyles = (trackColor = '#fff', thumbColor = '#cbcbcb') => ({
    '&::-webkit-scrollbar': {
      borderRadius: '16px',
      height: '2px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: `inset 0 0 6px ${trackColor}`,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: thumbColor,
    },
  });

  const listOfDates = getDatesArray(3);

  return (
    <HStack
      w="full"
      pb="2px"
      mb="26px"
      sx={customScrollbarStyles()}
      spacing="30px"
      overflowX="auto"
    >
      {listOfDates.map((info, idx) => (
        <VStack
          key={idx}
          role="button"
          transition="0.4s ease-in-out"
          border={`1px solid #${mainDate === info.date ? 'DDB057' : 'e4e4e4'}`}
          onClick={() => handleSelectedDate(info.date)}
          h="100px"
          opacity={mainDate === info.date ? '0.5' : '1'}
          minW="100px"
          maxW="100px"
          justify="center"
          p="16px"
        >
          <Text className="gilda-display-regular" fontSize="13px" fontWeight="300" color="#191919">
            {info.dayOfWeek}
          </Text>
          <Text className="gilda-display-regular" fontSize="23px" fontWeight="400" color="#191919">
            {info.dayOfMonth}
          </Text>
          <Text className="gilda-display-regular" fontSize="13px" fontWeight="300" color="#191919">
            {info.month}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
};

export default SelectDateCarousel;
