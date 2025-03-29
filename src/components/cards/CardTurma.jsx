import React from 'react';
import {
  Box,
  Flex,
  Circle,
  Text,
  Badge,
  Divider
} from "@chakra-ui/react";

const turnos = [
  { id: 1, cor: "yellow" },
  { id: 2, cor: "orange" },
  { id: 3, cor: "blue" },
];

const CardTurma = ({ turma, onClick }) => {
  return (
    <Box
      bg="purple.700"
      color="white"
      p={5}
      borderRadius="lg"
      h="auto"
      overflow="hidden"
      boxShadow="lg"
      cursor="pointer"
      _hover={{ bg: "purple.600" }}
      onClick={() => onClick(turma)}
    >
      <Flex mb={3} align="center">
        <Circle size="50px" bg="purple.500" mr={4} flexShrink={0}>
          <Text
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            fontWeight="bold"
          >
            {turma.nome[0]}
          </Text>
        </Circle>
        <Box>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            mb={1}
          >
            {turma.nome}
          </Text>
          <Badge colorScheme={turnos.find(t => t.id === turma.turno?.id)?.cor || "purple"} mb={2}>
            {turma.turno?.descricao || "Sem turno"}
          </Badge>
        </Box>
      </Flex>
      
      <Divider my={3} />
      
      <Text fontSize="sm" mb={1}>
        <Text as="span" fontWeight="bold">Curso:</Text>{" "}
        {turma.curso?.nome || "Não definido"}
      </Text>
      
      <Text fontSize="sm" mb={1}>
        <Text as="span" fontWeight="bold">Semestre:</Text>{" "}
        {turma.semestre || "Não definido"}
      </Text>
      
      <Text fontSize="sm" mb={3}>
        <Text as="span" fontWeight="bold">Ano:</Text>{" "}
        {turma.ano || "Não definido"}
      </Text>
      
      {turma.alocacoes && turma.alocacoes.length > 0 && (
        <Badge colorScheme="green" fontSize="sm">
          {turma.alocacoes.length} disciplinas alocadas
        </Badge>
      )}
    </Box>
  );
};

export default CardTurma;
