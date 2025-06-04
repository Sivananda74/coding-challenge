import { useParams, Link } from 'react-router-dom';
import { Box, Image, Text, VStack, Button, Grid, GridItem } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: character, isLoading, isError } = useQuery({
    queryKey: ['character', id],
    queryFn: () => api.getCharacter(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return <Box p={4}>Loading...</Box>;
  }

  if (isError || !character) {
    return <Box p={4}>Error loading character details</Box>;
  }

  return (
    <Box p={8}>
      <Link to="/">
        <Button mb={6}>Back to List</Button>
      </Link>
      
      <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={8}>
        <GridItem>
          <Image
            src={character.image}
            alt={character.name}
            borderRadius="lg"
            w="100%"
          />
        </GridItem>
        
        <GridItem>
          <VStack alignItems="start" gap={4}>
            <Text fontSize="2xl" fontWeight="bold">{character.name}</Text>
            <Grid templateColumns="auto 1fr" gap={4} width="100%">
              <Text fontWeight="bold">Status:</Text>
              <Text>{character.status}</Text>
              
              <Text fontWeight="bold">Species:</Text>
              <Text>{character.species}</Text>
              
              <Text fontWeight="bold">Gender:</Text>
              <Text>{character.gender}</Text>
              
              <Text fontWeight="bold">Origin:</Text>
              <Text>{character.origin.name}</Text>
              
              <Text fontWeight="bold">Location:</Text>
              <Text>{character.location.name}</Text>
              
              <Text fontWeight="bold">Type:</Text>
              <Text>{character.type || 'Unknown'}</Text>
            </Grid>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
}; 