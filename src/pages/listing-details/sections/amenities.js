import {Box, Flex, Image, Text} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {AMENITIES} from '../../../constants/icon_images';
import {theme} from '../../../theme';
import {appCurrentTheme} from '../../../utils/localStorage';
import {LIGHT} from '../../../constants/names';

const Amenities = ({info}) => {
  const amenities = info?.amenities;

  const getIcon = name => {
    const amenName = name
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll('/', '_')
      .replaceAll('  ', '_');
    const amenity = AMENITIES[amenName];
    return amenity?.src;
  };

  return (
    <Box mt={{base: '20px', lg: '39px'}}>
      <Text
        fontSize={{base: '16px', lg: '24px'}}
        fontWeight={400}
        className="gilda-display-bold"
        color="matador_text.100"
      >
        Amenities
      </Text>
      <Box
        w={{base: `43px`, md: '70px'}}
        mt="4px"
        borderBottom="1.8px solid"
        borderColor={`matador_text.200` || `#191919`}
      />
      <Flex
        mt={{base: '10px', lg: '36px'}}
        flexWrap={'wrap'}
        justifyContent={'start'}
        alignItems={'center'}
        columnGap={{base: '16px', lg: '26px'}}
        rowGap={{base: '14px', lg: '21px'}}
      >
        {amenities?.map(amen => (
          <Flex
            key={amen.name}
            gap={{base: '10px', lg: '8px'}}
            direction={{base: 'row', lg: 'column'}}
            alignItems={'center'}
            px={{base: '18px', lg: '32px'}}
            py={{base: '12px', lg: '16px'}}
            justify={'flex-start'}
          >
            <Image
              boxSize={{base: '20px', lg: '50px'}}
              alt="next_image"
              src={getIcon(amen.name)}
              // filter={appCurrentTheme !== LIGHT ? `invert(1)` : ``}
            />
            <Text
              fontWeight={500}
              color="text"
              className="montserrat-regular"
              fontSize={{base: '12px', lg: '13px'}}
              textAlign={'center'}
              textTransform={'uppercase'}
            >
              {amen.name}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default Amenities;
