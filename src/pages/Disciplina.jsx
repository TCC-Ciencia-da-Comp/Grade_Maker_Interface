import React, { useEffect, useState } from "react";
import "../styles/global.css";
import { Heading, Box, Flex, Text, Circle, Button, SimpleGrid } from "@chakra-ui/react";
import { getDisciplina, getDisciplinaOrderByNome } from "../service/DisciplinaService";
import { getCurso } from "../service/CursoService";
import FormDisciplina from "../components/forms/formDisciplina/FormDisciplina";
import ViewDisciplina from "../components/forms/formDisciplina/ViewDisciplina";

const DisciplinaPage = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDisciplina, setSelectedDisciplina] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const openView = (disciplina) => {
    setSelectedDisciplina(disciplina);
    setIsModalOpen(true);
  };

  const closeView = () => {
    setIsModalOpen(false);
    setSelectedDisciplina(null);
  };

  const openForm = () => {
    setSelectedDisciplina(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedDisciplina(null);
  };

  const fetchDisciplinas = async () => {
    try {
      const data = await getDisciplinaOrderByNome();
      setDisciplinas(data);
    } catch (error) {
      console.error('Erro ao carregar disciplinas:', error);
    }
  };

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  const handleFormSuccess = () => {
    fetchDisciplinas();
  };

  const handleViewDisciplina = (disciplina) => {
    setSelectedDisciplina(disciplina);
    setIsViewOpen(true);
  };

  const handleViewClose = () => {
    setIsViewOpen(false);
    setSelectedDisciplina(null);
    fetchDisciplinas();
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
          Disciplinas
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
          Adicionar Disciplina
        </Button>
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
              {disciplinas.map((disciplina, index) => (
                <Button
                  key={index}
                  as="div"
                  variant="unstyled"
                  w="100%"
                  mb={1}
                  onClick={() => handleViewDisciplina(disciplina)}
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
                        {disciplina.nome}
                      </Text>
                      <Text
                        fontSize={{ base: "xs", md: "sm", lg: "md" }}
                        maxW="200px"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {disciplina.curso?.nome}
                      </Text>
                    </Box>
                  </Box>
                </Button>
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>

        <FormDisciplina 
          isOpen={isFormOpen} 
          onClose={closeForm} 
          disciplinaId={selectedDisciplina?.id}
          onSuccess={handleFormSuccess}
        />
        <ViewDisciplina 
          isOpen={isViewOpen}
          onClose={handleViewClose}
          disciplina={selectedDisciplina}
        />
      </div>
    </div>
  );
};

export default DisciplinaPage;
