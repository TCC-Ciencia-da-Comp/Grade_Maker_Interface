import React from 'react';
import {
  Box,
  Flex,
  Circle,
  Text,
  Badge,
  Divider
} from "@chakra-ui/react";

const CardAlocacao = ({ item, index }) => {
  // Helper function to get the discipline name from possible nested structures
  const getDisciplinaNome = (item) => {
    if (item.disciplina?.nome) {
      return item.disciplina.nome;
    } else if (item.matriz?.disciplina?.nome) {
      return item.matriz.disciplina.nome;
    }
    return "Sem disciplina";
  };

  // Helper function to get day of week display
  const getDiaSemana = (diasSemana) => {
    if (!diasSemana) return "Não definido";
    
    const dias = [];
    if (diasSemana.seg) dias.push("Segunda");
    if (diasSemana.ter) dias.push("Terça");
    if (diasSemana.qua) dias.push("Quarta");
    if (diasSemana.qui) dias.push("Quinta");
    if (diasSemana.sex) dias.push("Sexta");
    if (diasSemana.sab) dias.push("Sábado");
    if (diasSemana.dom) dias.push("Domingo");
    
    return dias.length > 0 ? dias.join(", ") : "Não definido";
  };

  const turnos = [
    { id: 1, cor: "yellow" },
    { id: 2, cor: "orange" },
    { id: 3, cor: "blue" },
  ];
  return (
    <Box
      bg="purple.800"
      color="white"
      p={5}
      borderRadius="lg"
      h="auto"
      overflow="hidden"
      boxShadow="md"
    >
      <Flex mb={3} align="center">
        <Circle size="50px" bg="purple.500" mr={4} flexShrink={0}>
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
          <Badge colorScheme={turnos.find(t => t.id === item.turma?.turno?.id)?.cor || "purple"}>
            {item.turma?.turno?.descricao || "Sem turno"}
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
      
      <Text fontSize="sm" mb={1}>
        <Text as="span" fontWeight="bold">Dia:</Text>{" "}
        {getDiaSemana(item.diasSemana)}
      </Text>
      
      <Text fontSize="sm">
        <Text as="span" fontWeight="bold">Semestre:</Text>{" "}
        {item.turma?.semestre || "Não definido"}
      </Text>
    </Box>
  );
};

export default CardAlocacao;
