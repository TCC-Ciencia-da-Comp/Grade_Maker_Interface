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
} from "@chakra-ui/react";
import useViewDisciplinaLogic from "./ViewDisciplinaLogic";
import FormDisciplina from "./FormDisciplina";

const ViewDisciplina = ({ isOpen, onClose, disciplina }) => {
  const { disciplina: disciplinaData, cursos, isLoading } = useViewDisciplinaLogic(disciplina);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEdit = () => {
    // Passando a disciplina completa para o form
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
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{disciplinaData.nome}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Box>
              <Heading size="sm" mb={2}>Cursos Vinculados:</Heading>
              <List spacing={2}>
                  {cursos.map((curso) => (
                  <ListItem key={curso.id}>
                      <Text>{curso.nome}</Text>
                  </ListItem>
                  ))}
              </List>
              </Box>
          </ModalBody>
          <ModalFooter>
              <Button colorScheme="purple" onClick={onClose} mr="auto">Fechar</Button>
              <Button colorScheme="purple" onClick={handleEdit} ml="auto">Editar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <FormDisciplina
        isOpen={isFormOpen}
        onClose={handleFormClose}
        disciplinaId={disciplinaData.id}
        initialNome={disciplinaData.nome}
        onSuccess={handleFormSuccess}
      />
    </>
  );
};

export default ViewDisciplina;