import { Box, ChakraProvider, DarkMode } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import './themes/filepond-plugin-image-preview.css';
import './themes/filepond.min.css';
import './themes/style.css';
import { dark } from './themes/theme';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const queryClient = new QueryClient();

root.render(
  <ChakraProvider theme={dark}>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <DarkMode>
          <Box bg="bg.stand" color="white" className="anek" fontSize={'lg'}>
            <App />
          </Box>
        </DarkMode>
      </QueryClientProvider>
    </StrictMode>
  </ChakraProvider>
);
