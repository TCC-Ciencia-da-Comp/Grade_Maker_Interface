import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  Heading,
  List,
  ListItem,
  ModalFooter,
  Divider,
  Flex,
  Badge,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { FaUsers, FaBook } from "react-icons/fa";
import useViewTurmaLogic from "./ViewTurmaLogic";
import FormTurma from "./FormTurma";

const ViewTurma = ({ isOpen, onClose, turma, cursos, turnos }) => {
  const { turma: turmaData, disciplinas, isLoading } = useViewTurmaLogic(turma);
  const [isFormOpen, setIsFormOpen] = useState(false);


  const handleEdit = () => {
    setIsFormOpen(true);
    onClose();
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleFormSuccess = () => {
    handleFormClose();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="purple.500" color="white" borderTopRadius="md">
            <Flex align="center" gap={2}>
              <Icon as={FaUsers} />
              <Text>{turmaData.nome}</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton color="white" />
          
          <ModalBody py={6}>
            <Stack spacing={6}>
              {/* Informações Gerais */}
              <Box>
                <Text fontSize="md" mb={2}>
                  <strong>Curso:</strong> {turmaData.curso?.nome}
                </Text>
                <Text fontSize="md" mb={2}>
                  <strong>Turno:</strong> {turmaData.turno?.descricao}
                </Text>
                <Text fontSize="md" mb={4}>
                  <strong>Ano/Semestre:</strong> {turmaData.ano} - {turmaData.semestre}º Semestre
                </Text>
              </Box>

              {/* Disciplinas */}
              <Box>
                <Flex align="center" mb={4}>
                  <Icon as={FaBook} color="purple.500" mr={2} />
                  <Heading size="md" color="purple.700">
                    Disciplinas da Turma
                  </Heading>
                </Flex>
                <Badge colorScheme="purple" mb={4}>
                  Total: {disciplinas.length} disciplinas
                </Badge>
                
                <List spacing={3}>
                  {disciplinas.map((disciplina) => (
                    <ListItem key={disciplina.id}>
                      <Box
                        p={3}
                        bg="gray.50"
                        borderRadius="md"
                        borderLeft="4px"
                        borderLeftColor="purple.500"
                        _hover={{
                          bg: "purple.50",
                          transform: "translateX(5px)",
                          transition: "all 0.2s",
                        }}
                      >
                        <Text fontSize="md" color="gray.700">
                          {disciplina.nome}
                        </Text>
                      </Box>
                    </ListItem>
                  ))}
                </List>
                
                {disciplinas.length === 0 && (
                  <Box p={4} bg="gray.50" borderRadius="md" textAlign="center">
                    <Text color="gray.500">
                      Nenhuma disciplina vinculada a esta turma
                    </Text>
                  </Box>
                )}
              </Box>
            </Stack>
          </ModalBody>

          <Divider />
          
          <ModalFooter borderBottomRadius="md">
            <Button
              colorScheme="purple"
              mr="auto"
              onClick={onClose}
              size="md"
            >
              Fechar
            </Button>
            <Button
              colorScheme="purple"
              onClick={handleEdit}
              size="md"
              leftIcon={<Icon as={FaUsers} />}
            >
              Editar Turma
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <FormTurma
        isOpen={isFormOpen}
        onClose={handleFormClose}
        turmaId={turmaData.id}
        initialData={turmaData}
        onSuccess={handleFormSuccess}
        cursos={cursos}
        turnos={turnos}
      />
    </>


  );
};

export default ViewTurma;
