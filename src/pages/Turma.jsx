import React, { useEffect, useState } from 'react';
import { Heading, Button, Flex, SimpleGrid, Box, Text, useToast } from '@chakra-ui/react'
import { getTurma, getTurmaById } from "../service/TurmaService";
import { getCurso } from "../service/CursoService";
import { getTurno } from "../service/TurnoService";
import FormTurma from '../components/forms/formTurma/FormTurma';
import ViewTurma from "../components/forms/formTurma/ViewTurma";

function Turma() {
  const [turmas, setTurmas] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const toast = useToast();
  const [isViewOpen, setIsViewOpen] = useState(false);

  useEffect(() => {
    fetchTurmas();
    fetchCursos();
    fetchTurnos();
  }, []);

  const fetchTurmas = async () => {
    try {
      const data = await getTurma();
      setTurmas(data);
    } catch (error) {
      console.error("Erro ao carregar turmas:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as turmas",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const fetchCursos = async () => {
    try {
      const data = await getCurso();
      setCursos(data);
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os cursos",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const fetchTurnos = async () => {
    try {
      const response = await getTurno();
      setTurnos(response.data);
    } catch (error) {
      console.error("Erro ao carregar turnos:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os turnos",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleSuccess = () => {
    fetchTurmas();
    setIsFormOpen(false);
    setSelectedTurma(null);
  };

  const openForm = () => {
    setSelectedTurma(null);
    setIsFormOpen(true);
  };

  const handleViewTurma = async (turma) => {
    try {
      if (!turma?.id) {
        throw new Error("Turma inválida");
      }
      
      const turmaCompleta = await getTurmaById(turma.id);
      if (!turmaCompleta) {
        throw new Error("Turma não encontrada");
      }
      
      setSelectedTurma(turmaCompleta);
      setIsViewOpen(true);
    } catch (error) {
      console.error("Erro ao carregar turma:", error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível carregar os dados da turma",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleViewClose = () => {
    setIsViewOpen(false);
    setSelectedTurma(null);
    fetchTurmas();
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
          Turmas
        </Heading>
        <Button 
          onClick={openForm}
          backgroundColor="purple.500"
          color="white"
          borderRadius="lg"
          mb={10}
          _hover={{
            backgroundColor: "purple.600",
            cursor: "pointer",
          }}
        >
          Adicionar Turma
        </Button>

        {/* Form Modal */}
        <FormTurma
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedTurma(null);
            fetchTurmas();
          }}
          turmaId={selectedTurma?.id}
          initialData={selectedTurma}
          onSuccess={fetchTurmas}
          cursos={cursos}
          turnos={turnos}
        />

        {/* Add ViewTurma component */}
        <ViewTurma 
          isOpen={isViewOpen}
          onClose={handleViewClose}
          turma={selectedTurma}
          cursos={cursos}
          turnos={turnos}
        />

        <Flex justify="center" align="center" p={5}>
          <Flex
            wrap="wrap"
            maxW="1200px"
            marginBottom={10}
            justify="center"
            gap={4}
            rowGap={20}
          >
            <SimpleGrid columns={[2, null, 3]} spacing='50px 20px' width="100%">
              {turmas.map((turma, index) => (
                <Button
                  key={turma.id || index}
                  as="div"
                  variant="unstyled"
                  w="100%"
                  mb={1}
                  onClick={() => handleViewTurma(turma)}
                  _hover={{
                    backgroundColor: "purple.600",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    bg="purple.800"
                    color="white"
                    p={5}
                    borderRadius="lg"
                    display="flex"
                    alignItems="center"
                    h="auto"
                    overflow="hidden"
                  >
                    <Box>
                      <Text
                        fontSize={{ base: "xs", md: "sm", lg: "md" }}
                        fontWeight="bold"
                        maxW="250px"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {turma.nome}
                      </Text>
                      <Text
                        fontSize={{ base: "xs", md: "sm", lg: "md" }}
                        maxW="200px"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {turma.curso?.nome} - {turma.ano}
                      </Text>
                    </Box>
                  </Box>
                </Button>
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
      </div>
    </div>
  );
}

export default Turma;