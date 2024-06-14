import {color, colors_object} from './colors';
import {shadows} from './shadows';
import {typography} from './typography';
import {extendTheme} from '@chakra-ui/react';

export const theme = extendTheme({
  color,
  shadows,
  fonts: typography.fonts,
  textStyles: typography.textStyles,

  components: {
    Text: {
      baseStyle: {
        // color: 'text'
      },
      DrawerContent: {
        baseStyle: {
          bg: 'background',
        },
      },
    },
  },
  componentStyles: {
    cardOne: {
      pb: '.5em',
      mx: 'auto',
      my: '47px',
      px: '42px',
      h: '185px',
      bg: '#FFFFFF',
      spacing: 15,
      maxW: '1284px',
      justify: 'center',
      borderRadius: '16px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.02)',
    },
    imageFallback: {
      h: '110px',
      w: '114.06px',
      borderRadius: '14px',
      cursor: 'pointer',
    },
    bigContainer: {
      p: '12',
      marginBottom: '5em',
      maxW: '7xl',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.02)',
      color: 'gray.900',
      borderRadius: '2xl',
      background: '#FFFFFF',
    },
    tableContainer: {
      maxW: 'fit-content',
      background: '#FFFFFF',
      color: 'gray.900',
      borderRadius: '16px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.02)',
      display: 'table',
      tableLayout: 'fixed',
      width: 'max-content',
    },
  },
  containerStyles: {
    p: '12',
    maxW: '7xl',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.02)',
    color: 'gray.900',
    borderRadius: '2xl',
    background: '#FFFFFF',
    border: '1px solid #E4E4E4',
  },
  md_Box: {
    bg: '#FFF',
    align: 'center',
    color: '#191919',
    borderRadius: '12px',
    height: '120px',
    minWidth: {md: '290px'},
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid #F5F5F5',
  },
  transactionBox: {
    bg: '#FFF',
    borderRadius: '12px',
    height: '73px',
    width: '189px',
    textAlign: 'left',
    paddingX: '10px',
    paddingY: '8px',
    border: '1px solid #E4E4E4',
  },
  customerProfileCard: {
    spacing: 4,
    w: '100%',
    maxW: 371,
    h: 604,
    borderRadius: '16px',
    px: 17,
    boxShadow: 'sm',
    pt: 35,
    bg: '#FFFFFF',
    border: '1px solid #EEEEEE',
  },
});

export const themeStyles = extendTheme({...theme});

export const currentTheme = mode => {
  const theme_obj = {...themeStyles, theme_name: mode};
  return extendTheme({
    ...theme_obj,
    theme: {name: mode},
    colors: colors_object[mode] || colors_object.default,
  });
};
