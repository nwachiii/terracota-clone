import { Box, Flex, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';
import React from 'react'

export const ThreeDots = ({ bgColor, color, width, height }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const keyframe_dot1 = keyframes`
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1.5);
  }
  50% {
    transform: scale(1, 0.67);
  }
  75% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
`;

  const keyframe_dot2 = keyframes`
 0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 1.5);
  }
  75% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
`;

  const keyframe_dot3 = keyframes`
 0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 0.67);
  }
  75% {
    transform: scale(1, 1.5);
  }
  100% {
    transform: scale(1, 1);
  }
`;

  const animation1 = prefersReducedMotion ? undefined : `${keyframe_dot1} infinite 1s linear`;
  const animation2 = prefersReducedMotion ? undefined : `${keyframe_dot2} infinite 1s linear`;
  const animation3 = prefersReducedMotion ? undefined : `${keyframe_dot3} infinite 1s linear`;

  const styles = {
    dot1: {
      position: 'relative',
      borderRadius: '5px',
      backgroundColor: color || '#000',
      display: ' inline-block',
      margin: '0 2px',
    },
    dot2: {
      borderRadius: '5px',
      backgroundColor: color || '#000',
      display: 'inline-block',
      margin: '0 2px',
    },

    dot3: {
      borderRadius: '5px',
      backgroundColor: color || '#000',
      display: 'inline-block',
      margin: '0 2px',
    },
  };

  return (
    <Flex direction='row' align='center' justify={'center'}>
      <Box height={height || { base: '8px', md: '8px' }} width={width || { base: '8px', md: '8px' }} style={styles.dot1} animation={animation1} />
      <Box height={height || { base: '8px', md: '8px' }} width={width || { base: '8px', md: '8px' }} style={styles.dot2} animation={animation2} />
      <Box height={height || { base: '8px', md: '8px' }} width={width || { base: '8px', md: '8px' }} style={styles.dot3} animation={animation3} />
    </Flex>
  );
}

export default ThreeDots

