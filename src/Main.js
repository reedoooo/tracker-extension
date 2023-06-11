import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Container,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';

function Main() {
  const [stats, setStats] = useState({});
  const borderColor = useColorModeValue('primary.500', 'secondary.500');
  const borderRadius = '15px'; // set the desired border radius here

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Load mock data during development
      const mockStats = {
        'https://example.com': { timeSpent: 5000, interactions: 10 },
        'https://example.org': { timeSpent: 2000, interactions: 5 },
        // more mock data...
      };
      setStats(mockStats);
    } else {
      // Load real data in production
      chrome.runtime.sendMessage('getStats', (response) => {
        setStats(response || {});
      });
    }
  }, []);

  return (
    <Box width="400px" height="500px" overflowY="auto" borderColor={borderColor} borderWidth="2px" borderRadius={borderRadius}>
      <Container py={4}>
        <Heading mb={4}>Browsing stats</Heading>
        <Accordion allowMultiple>
          {Object.entries(stats).map(([url, { timeSpent, interactions, favicon, description }]) => (
            <AccordionItem key={url}>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading size="md">{url}</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Image src={favicon} alt={url} boxSize="50px" />
                <Text>
                  Time spent: <b>{timeSpent / 1000}</b> seconds
                </Text>
                <Text>
                  Interactions: <b>{interactions}</b>
                </Text>
                <Text>
                  Description: <b>{description}</b>
                </Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Box>
  );
}


export default Main;
