import React from 'react';
import { ChakraProvider, Container } from '@chakra-ui/react';
import theme from './Theme';
import './App.css';
import Main from './Main';

function App() {
  return (
    <Container maxW="400px" maxH="500px" py={4}>
      <ChakraProvider theme={theme}>
        <Main />
      </ChakraProvider>
    </Container>
  );
}

export default App;
