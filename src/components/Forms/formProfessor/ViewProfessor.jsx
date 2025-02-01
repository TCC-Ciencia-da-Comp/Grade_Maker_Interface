import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  Input,
} from "@chakra-ui/react";
import useViewProfessorLogic from "./ViewProfessorLogic";

const ViewProfessor = ({ isOpen, onClose, professor }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchDisciplina, setSearchDisciplina] = useState("");
  
  const {
    disponibilidades,
    disponibilidadesAgrupadas,
    anoSelecionado,
    setAnoSelecionado,
    semestreSelecionado,
    setSemestreSelecionado,
    diasSemana,
    turnos,
    anosDisponiveis,
    cursos,
    professores,
  } = useViewProfessorLogic(professor);

  // Filtra apenas dias da semana ativos
  const diasSemanaAtivos = diasSemana.filter(dia => dia.ativo === 1);
  // Filtra apenas turnos ativos
  const turnosAtivos = turnos.filter(turno => turno.ativo === 1);

  const filteredDisciplinas = disponibilidades
    .map(d => d.disciplina)
    .filter((d, index, self) => 
      index === self.findIndex((t) => t.id === d.id) && 
      d.nome.toLowerCase().includes(searchDisciplina.toLowerCase())
    );

  const handleFormClose = () => {
    setIsFormOpen(false);
    // Atualizar os dados após fechar o formulário
    // Isso será implementado no ViewProfessorLogic
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent maxW="1200px" borderRadius="lg">
          <ModalHeader 
            borderBottom="1px solid" 
            borderColor="gray.200" 
            bg="purple.500" 
            color="white"
            borderTopRadius="lg"
            py={4}
          >
            {professor?.nome}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
            <Flex gap={4} mb={6}>
              <Select
                value={anoSelecionado}
                onChange={(e) => setAnoSelecionado(Number(e.target.value))}

                borderColor="purple.200"
                _hover={{ borderColor: "purple.300" }}
                flex={1}
              >
                {anosDisponiveis.map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
              </Select>
              <Select
                value={semestreSelecionado}
                onChange={(e) => setSemestreSelecionado(Number(e.target.value))}

                borderColor="purple.200"
                _hover={{ borderColor: "purple.300" }}
                flex={1}
              >
                <option value={1}>1º Semestre</option>
                <option value={2}>2º Semestre</option>
              </Select>
            </Flex>

            <Flex gap={6}>
              {/* Tabela de Disponibilidade */}
              <Box 
                flex={1}
                borderRadius="md" 
                borderWidth="1px" 
                borderColor="gray.200" 
                overflow="hidden"
              >
                <Text 
                  fontSize="lg" 
                  fontWeight="bold" 
                  p={4} 
                  bg="purple.50"
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  color='gray'
                >
                  Grade de Disponibilidade
                </Text>
                <Table variant="simple">
                  <Thead bg="gray.50">
                    <Tr>
                      <Th>Dia/Turno</Th>
                      {turnosAtivos.map(turno => (
                        <Th key={turno.id}>{turno.descricao}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {diasSemanaAtivos.map(dia => (
                      <Tr key={dia.id}>
                        <Td fontWeight="semibold">{dia.descricao}</Td>
                        {turnosAtivos.map(turno => {
                          const hasDisponibilidade = disponibilidades.some(
                            d => d.diaSemana.id === dia.id && d.turno.id === turno.id
                          );
                          return (
                            <Td key={turno.id}>
                              <Box 
                                w="20px" 
                                h="20px" 
                                borderRadius="full"
                                bg={hasDisponibilidade ? "green.400" : "gray.200"}
                              />
                            </Td>
                          );
                        })}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>

              {/* Lista de Disciplinas */}
              <Box 
                w="350px"
                borderRadius="md" 
                borderWidth="1px" 
                borderColor="gray.200" 
                overflow="hidden"
              >
                <Text 
                  fontSize="lg" 
                  fontWeight="bold" 
                  p={4} 
                  bg="purple.50"
                  borderBottom="1px solid"
                  borderColor="gray.600"
                  color='gray'
                >
                  Disciplinas
                </Text>
                <Box p={4}>
                  <Input
                    placeholder="Pesquisar disciplina..."
                    value={searchDisciplina}
                    onChange={(e) => setSearchDisciplina(e.target.value)}
                    mb={4}
                    borderColor="purple.200"
                    _hover={{ borderColor: "purple.300" }}
                  />
                  <Box 
                    maxH="400px" 
                    overflowY="auto"
                    sx={{
                      '&::-webkit-scrollbar': {
                        width: '8px',
                      },
                      '&::-webkit-scrollbar-track': {
                        bg: 'gray.100',
                        borderRadius: 'full',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        bg: 'purple.200',
                        borderRadius: 'full',
                      },
                    }}
                  >
                    {filteredDisciplinas.map((disciplina) => (
                      <Box
                        key={disciplina.id}
                        p={3}
                        borderBottom="1px solid"
                        borderColor="gray.100"
                        _hover={{ bg: "purple.50" }}
                        transition="background 0.2s"
                      >
                        <Text>{disciplina.nome}</Text>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter 
            borderTop="1px solid" 
            borderColor="gray.200"
            gap={3}
          >
            <Button 
              variant="outline" 
              colorScheme="purple" 
              onClick={onClose}
            >
              Fechar
            </Button>
            <Button 
              colorScheme="purple" 
              onClick={onClose}
            >
              Editar Disponibilidade
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewProfessor;
