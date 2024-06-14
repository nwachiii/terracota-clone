import { AbsoluteCenter, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { motion } from 'framer-motion';

const Custom400 = () => {
  return (
    <VStack w="100%" h="100vh">
      <motion.p
        style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Text as="span" fontSize="600px" fontWeight="600" color="#F0F0F0">
          404
        </Text>
      </motion.p>
      <AbsoluteCenter maxW="80%" w="full">
        <Stack spacing="36px" w="full">
          <Stack
            textAlign="center"
            fontSize="72px"
            fontWeight="600"
            color="#2C2C2C"
            lineHeight="60px"
            overflowY="hidden"
          >
            <motion.span
              initial={{ y: '70px' }}
              animate={{ y: '0px' }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Store does not exist
            </motion.span>
          </Stack>
          <Stack
            textAlign="center"
            fontSize="20px"
            overflowY="hidden"
            fontWeight="400"
            color="#89898B"
            lineHeight="23px"
          >
            <motion.span
              initial={{ y: '30px' }}
              animate={{ y: '0px' }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Please confirm the web address or check your email for info concerning the
              store&apos;s link
            </motion.span>
          </Stack>
        </Stack>
      </AbsoluteCenter>
    </VStack>
  );
};

export default Custom400;
