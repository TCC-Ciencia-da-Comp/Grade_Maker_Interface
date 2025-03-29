import React from 'react';
import {
  Box,
  Flex,
  Circle,
  Text,
  Badge,
  Divider
} from "@chakra-ui/react";

const CardErro = ({ item, index }) => {
  // Helper function to get the discipline name from possible nested structures
  const getDisciplinaNome = (item) => {
    if (item.disciplina?.nome) {
      return item.disciplina.nome;
    } else if (item.matriz?.disciplina?.nome) {
      return item.matriz.disciplina.nome;
    }
    return "Sem disciplina";
  };

  return (
    <Box
      bg="red.600"
      color="white"
      p={5}
      borderRadius="lg"
      h="auto"
      overflow="hidden"
      boxShadow="md"
    >
      <Flex mb={3} align="center">
        <Circle size="50px" bg="red.400" mr={4} flexShrink={0}>
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
            {getDisciplinaNome(item)}
          </Text>
          <Badge colorScheme="red">
            Sem disponibilidade
          </Badge>
        </Box>
      </Flex>
      
      <Divider my={3} />
      
      <Text fontSize="sm" mb={1}>
        <Text as="span" fontWeight="bold">Professor:</Text>{" "}
        {item.professor?.nome || "Não atribuído"}
      </Text>
      
      <Text fontSize="sm" mb={1}>
        <Text as="span" fontWeight="bold">Turma:</Text>{" "}
        {item.turma?.nome || "Não definida"} - {item.turma?.curso?.nome || ""}
      </Text>
      
      <Text fontSize="sm">
        <Text as="span" fontWeight="bold">Semestre:</Text>{" "}
        {item.turma?.semestre || "Não definido"}
      </Text>
    </Box>
  );
};

export default CardErro;
