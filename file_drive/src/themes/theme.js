import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '768px',
  md: '960px',
  lg: '1200px',
  xl: '1920px',
});

export const dark = extendTheme({
  breakpoints: breakpoints,
  fonts: {
    heading: 'Open Sans',
    body: 'Inter, sans-serif',
  },
  colors: {
    ash: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    tomato: {
      100: '#ffb1a3',
      200: '#ffa191',
      300: '#ff927e',
      400: '#ff7359',
      500: '#e65940',
      600: '#cc4f39',
      700: '#b34532',
      800: '#993b2b',
      900: '#803224',
    },
    logo:{
      100: '#e0ebf7',
      200: '#c1d7ef',
      300: '#b6d1ec',
      400: '#accae9',
      500: '#97bde4',
      600: '#88aacd',
      700: '#7997b6',
      800: '#5b7189',
      900: '#3c4c5b',
    },
    bg: {
      lighter: '#373d49',
      light: '#212735',
      medium: '#181c28',
      dark: '#131720',
      stand:"#1A202C"
    },
    border: {
      light: '#4B5563',
      medium: '#374151',
      dark: '#1F2937',
      logo:"#88aacd"
    },
    darkText: {
      light: '#4B5563',
      medium: '#374151',
      dark: '#1F2937',
    },
    text: {
      light: '#FFFFFF',
      medium: '#F3F4F6',
      dark: '#D1D5DB',
    },
    brand: '#484954',
  },
});
