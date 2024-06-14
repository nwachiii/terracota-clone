import React from 'react';
import LayoutView from '../components/layout';
import LandingWrapper from '../hoc/LandingWrapper';
import Register from '../components/auth/register';
import landingImage from '../images/landing_page_bg.png';
import auth_background_mobile from '../images/auth_background_mobile.png';
import {Box, Center, Flex, HStack, Link, Text} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {fetchTerms} from '../api/agents';

function Home() {
  const TERMS = useQuery(['customersTerms'], fetchTerms);

  return (
    <Flex
      w="full"
      minH="100vh"
      // bgImage={{ base: auth_background_mobile.src, lg: landingImage.src }}
      bgImage={{base: auth_background_mobile.src}}
      position={`relative`}
      color={`matador_text.100`}
      direction={`column`}
      bgColor={`background`}
    >
      <Box
        position={`absolute`}
        top={`0`}
        left={`0`}
        width={`100%`}
        height={`100%`}
        bgColor={`matador_background.100`}
        opacity={`.95`}
        zIndex={1}
        // display={{lg: `none`}}
      ></Box>

      <Flex flex="1" h={`100%`} alignItems={{base: 'flex-start', md: `center`}}>
        <Register isAuthOpen={true} onAuthClose={() => {}} />
      </Flex>
      <HStack
        pb="3.44vh"
        w="full"
        justify="space-between"
        // flexDirection={{ base: "column", md: "row" }}
        borderTop="1px solid #E4E4E4"
        pt="16px"
        px={{base: '20px', md: '100px'}}
        fontSize={{base: 12, md: 15}}
        // mt="2rem !important"
        alignSelf="end"
        justifySelf="end"
        position="relative"
        zIndex={1}
        // bottom={0}
        color={`matador_text.400`}
        bg="background"
      >
        <Text fontWeight="400" opacity={'.4'}>
          Powered by myxellia.io
        </Text>
        <HStack gap={{base: '16px', md: '40px'}}>
          <Text
            onClick={() =>
              window.open(`${TERMS?.data ? TERMS.data?.data?.message?.document : ''}`, '_blank')
            }
            cursor="pointer"
            fontWeight="400"
            _hover={{textDecor: `underline`}}
          >
            Terms of service
          </Text>
          <Link href="https://veerge-support.myxellia.io/privacy" target="_blank" fontWeight="400">
            Privacy Policy
          </Link>{' '}
        </HStack>
      </HStack>
    </Flex>
  );
}

export default LandingWrapper(Home);
