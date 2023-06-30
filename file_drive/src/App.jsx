import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import MainRoutes from './Routes/Routes.js';

import { AuthProvider } from './contexts/authAPI.jsx';
import { DataProvider } from './contexts/dataAPI.jsx';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <MainRoutes />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
