import React, { useEffect, useState } from "react";
import "../styles/global.css";
import { Heading, Box, Flex, Text, Button, SimpleGrid } from "@chakra-ui/react";
import { getCursoOrderByNome } from "../service/CursoService";
import FormCurso from "../components/forms/formCurso/FormCurso";
import ViewCurso from "../components/forms/formCurso/ViewCurso";

const Curso = () => {
  const [cursos, setCursos] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const openForm = () => {
    setSelectedCurso(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedCurso(null);
  };

  const fetchCursos = async () => {
    try {
      const data = await getCursoOrderByNome();
      setCursos(data);
    } catch (error) {
      console.error('Erro ao carregar cursos:', error);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const handleFormSuccess = () => {
    fetchCursos();
  };

  const handleViewCurso = (curso) => {
    setSelectedCurso(curso);
    setIsViewOpen(true);
  };

  const handleViewClose = () => {
    setIsViewOpen(false);
    setSelectedCurso(null);
    fetchCursos();
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
          Cursos
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
          Adicionar Curso
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
            <SimpleGrid columns={[2, null, 3]} spacing='60px 20px' width="100%">
              {cursos.map((curso, index) => (
                <Button
                  key={index}
                  as="div"
                  variant="unstyled"
                  w="100%"
                  mb={1}
                  onClick={() => handleViewCurso(curso)}
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
                        {curso.nome}
                      </Text>
                      <Text
                        fontSize={{ base: "xs", md: "sm", lg: "md" }}
                        maxW="200px"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {curso.disciplinas?.length || 0} disciplinas
                      </Text>
                    </Box>
                  </Box>
                </Button>
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>

        <FormCurso 
          isOpen={isFormOpen} 
          onClose={closeForm} 
          cursoId={selectedCurso?.id}
          onSuccess={handleFormSuccess}
        />
        <ViewCurso 
          isOpen={isViewOpen}
          onClose={handleViewClose}
          curso={selectedCurso}
        />
      </div>
    </div>
  );
};

export default Curso;
