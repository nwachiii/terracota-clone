import {Box, HStack, Stack, Text} from '@chakra-ui/react';
import Navbar from '../navbar';
import {Footer} from './footer';
import Link from 'next/link';

const LayoutView = ({
  children,
  noPadding,
  navBarStyle,
  transluscent,
  activePage,
  isLandingPage,
  noFooter,

  ...rest
}) => {
  return (
    <Stack
      bg="background"
      h={'100%'}
      minH="100vh"
      minInlineSize={'fit-content'}
      justify="space-between"
      color={`text`}
      {...rest}
    >
      <Navbar
        navBarStyle={navBarStyle}
        activePage={activePage}
        transluscent={transluscent}
        isLandingPage={isLandingPage}
      />
      <Box
        flex={1}
        h="full"
        w={'100%'}
        px={noPadding ? '0' : {base: '20px', lg: '100px'}}
        pb={{base: '50px', xl: '51.5px'}}
      >
        {children}
      </Box>
      {!noFooter && (
        <HStack
          pb="3.44vh"
          w="full"
          justify="space-between"
          borderTop="1px solid #E4E4E4"
          px={{base: '18px', md: '100px'}}
          py="14px"
          fontSize={{base: 12, md: 15}}
          mt="2rem !important"
          alignSelf="end"
          justifySelf="end"
          position="fixed"
          bottom={0}
          bg="background"
          color={`matador_text.400`}
          zIndex={1}
        >
          <Text fontWeight="400" opacity={`.8`}>
            Powered by myxellia.io
          </Text>
          <HStack gap={{base: '16px', md: '40px'}}>
            <Text
              onClick={() =>
                window.open(`${TERMS?.data ? TERMS.data?.data?.message?.document : ''}`, '_blank')
              }
              cursor="pointer"
              fontWeight="400"
            >
              Terms of service
            </Text>
            <Link
              href="https://veerge-support.myxellia.io/privacy"
              target="_blank"
              fontWeight="400"
            >
              Privacy Policy
            </Link>{' '}
          </HStack>
        </HStack>
      )}
    </Stack>
  );
};

export default LayoutView;
