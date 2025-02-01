import { extendTheme } from '@chakra-ui/react';

const ThemeDark = extendTheme({
  config: {
    initialColorMode: 'dark', // Define o modo inicial como escuro
    useSystemColorMode: false, // Ignora a preferência do sistema
  },
  colors: {
    brand: {
      50: '#f3e8ff',
      100: '#d9b3ff',
      200: '#bf80ff',
      300: '#a64dff',
      400: '#8c1aff',
      500: '#7300e6', // Tom principal do roxo
      600: '#5900b3',
      700: '#400080',
      800: '#26004d',
      900: '#130026',
    },
  },
  styles: {
    global: {
      'html, body': {
        bg: 'gray.800', // Usa uma cor existente para o fundo escuro
        color: 'white', // Texto branco para melhor contraste
      },
    },
  },
});

export default ThemeDark;
