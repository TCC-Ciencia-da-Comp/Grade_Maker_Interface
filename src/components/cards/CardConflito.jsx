import React from 'react';
import {
  Box,
  Flex,
  Circle,
  Text,
  Badge
} from "@chakra-ui/react";

const CardConflito = ({ conflito, index }) => {
  return (
    <Box
      bg="orange.600"
      color="white"
      p={5}
      borderRadius="lg"
      h="auto"
      overflow="hidden"
      boxShadow="md"
    >
      <Flex mb={3} align="center">
        <Circle size="50px" bg="orange.400" mr={4} flexShrink={0}>
          <Text
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            fontWeight="bold"
          >
            {index + 1}
          </Text>
        </Circle>
        <Box>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="bold"
            mb={1}
          >
            Conflito de Horário
          </Text>
          <Badge colorScheme="orange" whiteSpace="normal">
            {conflito}
          </Badge>
        </Box>
      </Flex>
    </Box>
  );
};

export default CardConflito;
