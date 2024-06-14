import React from 'react';
import {
  InputGroup,
  Input,
  FormControl,
  FormLabel,
  Text,
  SlideFade,
  InputRightElement,
  InputLeftElement,
  InputLeftAddon,
  HStack,
  Select,
  Box,
} from '@chakra-ui/react';
import {themeStyles} from '../../../theme';
import {PHONEPREFIX} from '../../../components/constants/settings/phoneprefix';
import {FaChevronDown} from 'react-icons/fa';

export const FormInput = ({
  label,
  leftAddon,
  rightAddon,
  error,
  group,
  leftAddonStyle,
  getDialCode,
  ...rest
}) => {
  const [countryCode, setCountryCode] = React.useState(PHONEPREFIX[0].code);
  return (
    <FormControl {...themeStyles.textStyles.sl5}>
      <Text fontSize={'13px'} color='#4B4B4B' fontWeight={500}>
        {label}
      </Text>
      <HStack w="full" gap={`12px`}>
        {rest.type === 'phone' ? (
          <Box
            position="relative"
            w="100px"
            height={rest?.h || rest?.height ? rest?.h || rest?.height : '44px'}
            // border={error ? '1px solid red !important' : `1px solid #E4E4E4 !important`}
            border={error ? '1px solid' : rest.border ? `${rest.border}` : `1px solid`}
            borderColor={
              error
                ? `red !important`
                : rest.border
                ? `${rest.borderColor} !important`
                : `matador_border_color.100 !important`
            }
          >
            <HStack spacing="10px" pl="16px" w="full" h="full">
              <Text fontSize="14px" color="#606060" fontWeight="400">
                {countryCode}
              </Text>
            </HStack>
            <Select
              name="country"
              overflowX="hidden"
              // hidden={true}
              opacity="0"
              onChange={e => {
                setCountryCode(e.target.value);
                getDialCode(e.target.value);
              }}
              // icon={<FaChevronDown size={14} />}
              w="70px"
              zIndex="2"
              position="absolute"
              p="0px"
              cursor="pointer"
              left="10px"
              top={'0px'}
              // bottom="3px"
              border="none"
              required
              // fontWeight="400"
              // fontSize="20px"
              // icon={<DropDown />}
              id="countryPhoneNumber"
              lineHeight="18px "
              color="#919191"
              fontSize="14px"
              height={rest?.h || rest?.height ? rest?.h || rest?.height : '44px'}
              fontWeight="300"
              _focus={{
                border: 'none',
              }}
              _active={{
                border: 'none',
              }}
              _focusVisible={
                {
                  // border: 'none',
                }
              }
            >
              {PHONEPREFIX.map((item, index) => {
                return (
                  <option key={index} value={item.code}>
                    {`${item.code}   ${item.name}`}
                  </option>
                );
              })}
            </Select>
          </Box>
        ) : null}
        <InputGroup borderColor={'text'} color="#E4E4E4" m="0px" {...group}>
          {leftAddon ? (
            <InputLeftElement ml="0" {...leftAddonStyle}>
              {leftAddon}
            </InputLeftElement>
          ) : null}
          <Input
            borderRadius={0}
            color="text"
            h={'44px'}
            fontSize={'18px'}
            isInvalid={error}
            border={error ? '1px solid' : rest.border ? `${rest.border} ` : `1px solid`}
            borderColor={
              error
                ? `red !important`
                : rest.border
                ? `${rest.borderColor} !important`
                : `matador_border_color.100 !important`
            }
            _placeholder={{
              fontSize: 13,
              letterSpacing: '0.52px',
              color: 'text',
              opacity: 0.8,
              fontWeight: 500,
            }}
            _focus={{
              border: error
                ? '1px solid !important'
                : rest.border
                ? `${rest.border} !important`
                : `1px solid !important`,
              borderColor: error
                ? `red !important`
                : rest.border
                ? `${rest.borderColor} !important`
                : `matador_border_color.100 !important`,
            }}
            _focusVisible={{
              border: error
                ? '1px solid !important'
                : rest.border
                ? `${rest.border} !important`
                : `1px solid !important`,
              borderColor: error
                ? `red !important`
                : rest.border
                ? `${rest.borderColor} !important`
                : `matador_border_color.100 !important`,
            }}
            {...rest}
          />
          {rightAddon ? <InputRightElement>{rightAddon}</InputRightElement> : null}
        </InputGroup>
      </HStack>
      <SlideFade in={error} offsetY="10px">
        <Text
          color={themeStyles.color.matador__red}
          my={{base: '3px', md: '5px'}}
          fontSize={{base: '10px', md: '14px'}}
        >
          {error}
        </Text>
      </SlideFade>
    </FormControl>
  );
};
