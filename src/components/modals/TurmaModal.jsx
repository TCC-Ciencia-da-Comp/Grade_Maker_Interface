import React from "react";
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
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  SimpleGrid,
  Divider,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/react";

const TurmaModal = ({ 
  isOpen, 
  onClose, 
  turma, 
  matricesSemDisponibilidade 
}) => {
  // Helper functions
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

  const diasSemanaOrder = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
  const diasSemanaLabels = {
    seg: "Segunda",
    ter: "Terça",
    qua: "Quarta",
    qui: "Quinta",
    sex: "Sexta",
    sab: "Sábado",
    dom: "Domingo"
  };

  // Função para obter a alocação para um dia específico
  const getAlocacaoPorDia = (alocacoes, dia) => {
    return alocacoes.filter(alocacao => 
      alocacao.diasSemana && alocacao.diasSemana[dia]
    );
  };

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
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="purple.700" color="white">
          {turma?.nome} - {turma?.curso?.nome}
          <Text fontSize="sm" mt={1}>
            {turma?.turno?.descricao} - {turma?.semestre}º Semestre / {turma?.ano}
          </Text>
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody p={4}>
          <Tabs variant="enclosed" colorScheme="purple" isFitted>
            <TabList>
              <Tab>Tabela Semanal</Tab>
              <Tab>Lista de Disciplinas</Tab>
              <Tab>Pendentes</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box overflowX="auto">
                  <Table variant="simple" colorScheme="purple" size="md">
                    <Thead>
                      <Tr bg="purple.100">
                        <Th color="gray.800">Dia</Th>
                        <Th color="gray.800">Disciplinas e Professores</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {diasSemanaOrder.map(dia => {
                        const alocacoesDia = turma ? getAlocacaoPorDia(turma.alocacoes, dia) : [];
                        if (alocacoesDia.length === 0) return null;
                        
                        return (
                          <Tr key={dia}>
                            <Td fontWeight="bold" width="150px" color="gray.100">{diasSemanaLabels[dia]}</Td>
                            <Td>
                              {alocacoesDia.map((alocacao, idx) => (
                                <Box 
                                  key={idx} 
                                  p={2} 
                                  mb={2} 
                                  bg="purple.50" 
                                  borderRadius="md"
                                  borderLeft="4px solid"
                                  borderColor="purple.500"
                                >
                                  <Text fontWeight="bold" color="gray.800">{getDisciplinaNome(alocacao)}</Text>
                                  <Text fontSize="sm" color="gray.700">Professor: {alocacao.professor?.nome}</Text>
                                </Box>
                              ))}
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>
              <TabPanel>
                <SimpleGrid columns={[1, 2]} spacing={4}>
                  {turma?.alocacoes.map((alocacao, idx) => (
                    <Box 
                      key={idx} 
                      p={3} 
                      bg="purple.50" 
                      borderRadius="md"
                      borderLeft="4px solid"
                      borderColor="purple.500"
                    >
                      <Text fontWeight="bold" fontSize="lg" color="gray.800">{getDisciplinaNome(alocacao)}</Text>
                      <Divider my={2} />
                      <Text fontSize="sm" color="gray.700"><b>Professor:</b> {alocacao.professor?.nome}</Text>
                      <Text fontSize="sm" color="gray.700"><b>Dia:</b> {getDiaSemana(alocacao.diasSemana)}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </TabPanel>
              <TabPanel>
                {/* Tab panel para pendentes da turma específica */}
                {turma && (
                  <>
                    {matricesSemDisponibilidade.filter(item => 
                      item.turma && item.turma.id === turma.id
                    ).length === 0 ? (
                      <Alert
                        status="success"
                        variant="subtle"
                        borderRadius="md"
                        p={4}
                      >
                        <AlertIcon />
                        <AlertTitle mr={2} color="gray.800">Perfeito!</AlertTitle>
                        <AlertDescription color="gray.700">
                          Todas as disciplinas desta turma foram alocadas.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <SimpleGrid columns={[1, 2]} spacing={4}>
                        {matricesSemDisponibilidade
                          .filter(item => item.turma && item.turma.id === turma.id)
                          .map((alocacao, idx) => (
                            <Box 
                              key={idx} 
                              p={3} 
                              bg="red.50" 
                              borderRadius="md"
                              borderLeft="4px solid"
                              borderColor="red.500"
                            >
                              <Text fontWeight="bold" fontSize="lg" color="gray.800">{getDisciplinaNome(alocacao)}</Text>
                              <Divider my={2} />
                              <Text fontSize="sm" color="gray.700"><b>Professor:</b> {alocacao.professor?.nome || "Não definido"}</Text>
                              <Badge colorScheme="red" mt={2}>Sem disponibilidade</Badge>
                            </Box>
                        ))}
                      </SimpleGrid>
                    )}
                  </>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TurmaModal;
