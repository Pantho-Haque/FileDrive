import React from 'react';
import { Box } from '@chakra-ui/react';
import Lottie from 'react-lottie';

export default function LottieMaking({ animationData, h, w }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData, 
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Box pointerEvents={'none'}>
      <Lottie options={defaultOptions} height={h} width={w} />
    </Box>
  );
}
