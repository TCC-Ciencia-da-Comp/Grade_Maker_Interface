import React, { useState, useEffect } from "react";
import "../styles/global.css";
import { 
  Heading, 
  Box, 
  Flex, 
  Text, 
  Circle, 
  Button, 
  SimpleGrid,
  useToast,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/react";
import { gerarGrade, gerarGradeNor } from "../service/GerarGradeService";
import TurmaModal from "../components/modals/TurmaModal";
import CardTurma from "../components/cards/CardTurma";
import CardGrade from "../components/cards/CardAlocacao";
import CardErro from "../components/cards/CardErro";
import CardConflito from "../components/cards/CardConflito";

const GeradorGrade = () => {
  const [gradeData, setGradeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tipoGrade, setTipoGrade] = useState("");
  const [resumo, setResumo] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" ou "map"
  const [turmas, setTurmas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matricesSemDisponibilidade, setMatricesSemDisponibilidade] = useState([]);
  const toast = useToast();

  // Agrupar horários por turma quando gradeData mudar
  useEffect(() => {
    if (gradeData.length > 0) {
      // Criar um mapa de turmas únicas
      const turmasMap = new Map();
      
      gradeData.forEach(item => {
        if (item.turma) {
          const turmaId = item.turma.id;
          if (!turmasMap.has(turmaId)) {
            turmasMap.set(turmaId, {
              id: turmaId,
              nome: item.turma.nome,
              curso: item.turma.curso,
              semestre: item.turma.semestre,
              turno: item.turma.turno,
              ano: item.turma.ano,
              alocacoes: []
            });
          }
          
          // Adicionar esta alocação à turma
          turmasMap.get(turmaId).alocacoes.push(item);
        }
      });
      
      // Converter o mapa em array
      setTurmas(Array.from(turmasMap.values()));
    } else {
      setTurmas([]);
    }
  }, [gradeData]);

  const handleGerarGrade = async () => {
    try {
      setIsLoading(true);
      setTipoGrade("Padrão");
      const response = await gerarGrade({});
      
      // Verifica se a resposta contém o objeto com a grade
      if (response && response.grade) {
        setGradeData(response.grade);
        setResumo({
          qtdErros: response.qtdErros,
          conflitos: response.conflitos || []
        });
        
        // Verificar matrizes sem disponibilidade
        const semDisponibilidade = [];
        if (response.status === "ok" && response.matricesSemDisponibilidade) {
          semDisponibilidade.push(...response.matricesSemDisponibilidade);
        } else if (response.grade) {
          // Caso não tenha a propriedade específica, vamos inferir dos dados da grade
          // Procurar itens com status 'vazio' ou sem diasSemana definidos
          const semAlocacao = response.grade.filter(item => 
            item.status === 'vazio' || 
            !item.diasSemana || 
            (item.diasSemana && Object.values(item.diasSemana).every(dia => !dia))
          );
          semDisponibilidade.push(...semAlocacao);
        }
        
        setMatricesSemDisponibilidade(semDisponibilidade);
      } else {
        setGradeData([]);
        setResumo(null);
        setMatricesSemDisponibilidade([]);
      }
      
      toast({
        title: "Grade gerada com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erro ao gerar grade:", error);
      toast({
        title: "Erro ao gerar grade",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGerarGradeNormal = async () => {
    try {
      setIsLoading(true);
      setTipoGrade("Normal");
      const response = await gerarGradeNor({});
      
      // Verifica se a resposta contém o objeto com a grade
      if (response && response.grade) {
        setGradeData(response.grade);
        setResumo({
          qtdErros: response.qtdErros,
          conflitos: response.conflitos || []
        });
        
        // Verificar matrizes sem disponibilidade
        const semDisponibilidade = [];
        if (response.status === "ok" && response.matricesSemDisponibilidade) {
          semDisponibilidade.push(...response.matricesSemDisponibilidade);
        } else if (response.grade) {
          // Caso não tenha a propriedade específica, vamos inferir dos dados da grade
          // Procurar itens com status 'vazio' ou sem diasSemana definidos
          const semAlocacao = response.grade.filter(item => 
            item.status === 'vazio' || 
            !item.diasSemana || 
            (item.diasSemana && Object.values(item.diasSemana).every(dia => !dia))
          );
          semDisponibilidade.push(...semAlocacao);
        }
        
        setMatricesSemDisponibilidade(semDisponibilidade);
      } else {
        setGradeData([]);
        setResumo(null);
        setMatricesSemDisponibilidade([]);
      }
      
      toast({
        title: "Grade normal gerada com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erro ao gerar grade normal:", error);
      toast({
        title: "Erro ao gerar grade normal",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  const openTurmaModal = (turma) => {
    setSelectedTurma(turma);
    setIsModalOpen(true);
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
    <div className="page-container">
      <div className="content-wrapper">
        <Heading
          className="page-title"
          as="h2"
          fontSize="4xl"
          position="relative"
          textAlign="center"
          mb={10}
          _after={{
            content: '""',
            display: "block",
            width: "100%",
            height: "7px",
            backgroundColor: "purple.500",
            position: "absolute",
            bottom: "-5px",
            left: 0,
          }}
        >
          Gerador de Grade
        </Heading>

        <Flex justify="center" gap={4} mb={6}>
          <Button
            onClick={handleGerarGrade}
            backgroundColor="purple.500"
            color="white"
            borderRadius="lg"
            isLoading={isLoading && tipoGrade === "Padrão"}
            loadingText="Gerando..."
            _hover={{
              backgroundColor: "purple.600",
              cursor: "pointer",
            }}
          >
            Gerar Grade Genético
          </Button>

          <Button
            onClick={handleGerarGradeNormal}
            backgroundColor="purple.700"
            color="white"
            borderRadius="lg"
            isLoading={isLoading && tipoGrade === "Normal"}
            loadingText="Gerando..."
            _hover={{
              backgroundColor: "purple.800",
              cursor: "pointer",
            }}
          >
            Gerar Grade Normal
          </Button>
        </Flex>

        {resumo && (
          <Box mb={6} p={4} borderRadius="lg" bg="purple.50">
            <StatGroup textAlign="center">
              <Stat>
                <StatLabel>Erros</StatLabel>
                <StatNumber>{resumo.qtdErros}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Conflitos de Horário</StatLabel>
                <StatNumber>{resumo.conflitos.length}</StatNumber>
              </Stat>
            </StatGroup>
          </Box>
        )}

        {gradeData.length > 0 && (
          <>
            <Flex justify="center" mb={4}>
              <Tabs variant="soft-rounded" colorScheme="purple" align="center">
                <TabList>
                  <Tab onClick={() => setViewMode("list")} ml={10}>Lista de Alocações</Tab>
                  <Tab onClick={() => setViewMode("map")} ml={10}>Turmas</Tab>
                  <Tab onClick={() => setViewMode("pendentes")} ml={10}>Pendentes</Tab>
                </TabList>
              </Tabs>
            </Flex>

            {viewMode === "list" && (
              <>
                <Heading as="h3" fontSize="2xl" mb={5} textAlign="center">
                  Resultados da Grade {tipoGrade}
                </Heading>
                <Flex justify="center" align="center" p={5}>
                  <Flex
                    wrap="wrap"
                    maxW="1000px"
                    marginBottom={10}
                    justify="center"
                    gap={4}
                    rowGap={20}
                  >
                    <SimpleGrid columns={[1, null, 2, 3]} spacing='40px' width="100%">
                      {gradeData.map((item, index) => (
                        <CardGrade key={index} item={item} index={index} />
                      ))}
                    </SimpleGrid>
                  </Flex>
                </Flex>
              </>
            )}

            {viewMode === "map" && (
              <>
                <Heading as="h3" fontSize="2xl" mb={5} textAlign="center">
                  Mapa de Alocação por Turma
                </Heading>
                <Flex justify="center" align="center" p={5}>
                  <SimpleGrid columns={[1, null, 2, 3]} spacing='40px' width="100%" maxW="1000px">
                    {turmas.map((turma, index) => (
                      <CardTurma key={index} turma={turma} onClick={openTurmaModal} />
                    ))}
                  </SimpleGrid>
                </Flex>
              </>
            )}

            {viewMode === "pendentes" && (
              <>
                <Heading as="h3" fontSize="2xl" mb={5} textAlign="center">
                  Matrizes Sem Disponibilidade e Conflitos
                </Heading>
                
                {matricesSemDisponibilidade.length === 0 && (!resumo?.conflitos || resumo.conflitos.length === 0) ? (
                  <Alert
                    status="success"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    borderRadius="lg"
                    p={6}
                  >
                    <AlertIcon boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                      Tudo em ordem!
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                      Não há disciplinas pendentes de alocação e não existem conflitos.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Flex justify="center" align="center" p={5}>
                    <Flex
                      wrap="wrap"
                      maxW="1000px"
                      marginBottom={10}
                      justify="center"
                      gap={4}
                      rowGap={20}
                    >
                      {/* Seção de Matrizes Sem Disponibilidade */}
                      {matricesSemDisponibilidade.length > 0 && (
                        <Box width="100%">
                          <Heading as="h4" fontSize="xl" mb={4} color="gray.700">
                            Matrizes Sem Disponibilidade
                          </Heading>
                          <SimpleGrid columns={[1, null, 2]} spacing='40px' width="100%">
                            {matricesSemDisponibilidade.map((item, index) => (
                              <CardErro key={index} item={item} index={index} />
                            ))}
                          </SimpleGrid>
                        </Box>
                      )}

                      {/* Seção de Conflitos */}
                      {resumo?.conflitos && resumo.conflitos.length > 0 && (
                        <Box width="100%" mt={8}>
                          <Heading as="h4" fontSize="xl" mb={4} color="gray.700">
                            Conflitos de Horário
                          </Heading>
                          <SimpleGrid columns={[1, null, 2]} spacing='40px' width="100%">
                            {resumo.conflitos.map((conflito, index) => (
                              <CardConflito key={index} conflito={conflito} index={index} />
                            ))}
                          </SimpleGrid>
                        </Box>
                      )}
                    </Flex>
                  </Flex>
                )}
              </>
            )}
          </>
        )}
      </div>

      <TurmaModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        turma={selectedTurma}
        matricesSemDisponibilidade={matricesSemDisponibilidade}
      />
    </div>
  );
};

export default GeradorGrade; 