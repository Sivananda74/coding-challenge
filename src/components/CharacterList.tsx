import { useEffect, useState } from 'react';
import { Box, Grid, Button, Center, Image, Text, VStack, Container, Heading, Badge } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { Character } from '../types/character';
import { api } from '../services/api';

export const CharacterList = () => {
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['characters', page],
    queryFn: () => api.getCharacters(page),
  });

  useEffect(() => {
    localStorage.setItem('currentPage', page.toString());
  }, [page]);

  if (isLoading) {
    return <Center h="100vh">Loading...</Center>;
  }

  if (isError) {
    return <Center h="100vh">Error loading characters</Center>;
  }

  return (
    <Container maxW="1200px" py={8}>
      <VStack spacing={8}>
        <Heading>Rick and Morty Characters</Heading>
        
        <Grid 
          templateColumns={{
            base: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          }}
          gap={6}
          w="100%"
        >
          {data?.results.map((character: Character) => (
            <Link to={`/character/${character.id}`} key={character.id}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: 'xl',
                }}
                bg="white"
              >
                <Image 
                  src={character.image} 
                  alt={character.name}
                  w="100%"
                  h="auto"
                />
                <Box p={4}>
                  <Text 
                    fontWeight="bold" 
                    fontSize="lg" 
                    noOfLines={1}
                    mb={2}
                  >
                    {character.name}
                  </Text>
                  <Badge 
                    colorScheme={character.status.toLowerCase() === 'alive' ? 'green' : 
                               character.status.toLowerCase() === 'dead' ? 'red' : 'gray'}
                    mb={2}
                  >
                    {character.status}
                  </Badge>
                  <Text fontSize="sm" color="gray.600">
                    {character.species}
                  </Text>
                </Box>
              </Box>
            </Link>
          ))}
        </Grid>
        
        <Center gap={4} w="100%" mt={6}>
          <Button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            isDisabled={page === 1}
            colorScheme="blue"
          >
            Previous
          </Button>
          <Text fontWeight="bold">Page {page}</Text>
          <Button
            onClick={() => setPage(p => p + 1)}
            isDisabled={!data?.info.next}
            colorScheme="blue"
          >
            Next
          </Button>
          <Button 
            onClick={() => refetch()} 
            ml={4}
            colorScheme="green"
          >
            Refresh
          </Button>
        </Center>
      </VStack>
    </Container>
  );
}; 