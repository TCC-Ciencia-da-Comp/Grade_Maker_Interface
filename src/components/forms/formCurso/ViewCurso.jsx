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
import { FaGraduationCap, FaBook } from "react-icons/fa";
import useViewCursoLogic from "./ViewCursoLogic";
import FormCurso from "./FormCurso";

const ViewCurso = ({ isOpen, onClose, curso }) => {
  const { curso: cursoData, disciplinas, isLoading } = useViewCursoLogic(curso);
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
              <Icon as={FaGraduationCap} />
              <Text>{cursoData.nome}</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton color="white" />
          
          <ModalBody py={6}>
            <Stack spacing={6}>
              {/* Informações Gerais */}
              <Box>
                <Flex align="center" mb={4}>
                  <Icon as={FaBook} color="purple.500" mr={2} />
                  <Heading size="md" color="purple.700">
                    Disciplinas Vinculadas
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
                      Nenhuma disciplina vinculada a este curso
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
              leftIcon={<Icon as={FaGraduationCap} />}
            >
              Editar Curso
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <FormCurso
        isOpen={isFormOpen}
        onClose={handleFormClose}
        cursoId={cursoData.id}
        initialNome={cursoData.nome}
        onSuccess={handleFormSuccess}
      />
    </>
  );
};

export default ViewCurso;
