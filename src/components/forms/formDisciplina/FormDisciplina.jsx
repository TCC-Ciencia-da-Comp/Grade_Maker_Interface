import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
} from "@chakra-ui/react";
import useFormDisciplinaLogic from "./FormDisciplinaLogic";
import { DeleteIcon } from '@chakra-ui/icons';

const FormDisciplina = ({ isOpen, onClose, disciplinaId, initialNome, onSuccess }) => {
  const {
    nome,
    setNome,
    handleSubmit,
    handleCancelar,
    isLoading,
    hasChanges,
    handleDelete,
  } = useFormDisciplinaLogic({ isOpen, onClose, disciplinaId, initialNome, onSuccess });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {disciplinaId ? 'Editar Disciplina' : 'Adicionar Disciplina'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={4}>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired mb={4}>
                <FormLabel>Nome da Disciplina</FormLabel>
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome da disciplina"
                />
              </FormControl>

              <Flex gap={4} justify="space-between" mt={4}>
                {disciplinaId && (
                  <Button 
                    colorScheme="red"
                    onClick={handleDelete}
                    isLoading={isLoading}
                    leftIcon={<DeleteIcon />}
                  >
                    Excluir
                  </Button>
                )}
                <Flex gap={2} ml="auto">
                  <Button 
                    colorScheme="purple" 
                    variant="outline"
                    onClick={handleCancelar}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    colorScheme="purple"
                    isLoading={isLoading}
                    isDisabled={!hasChanges}
                  >
                    {disciplinaId ? 'Atualizar' : 'Salvar'}
                  </Button>
                </Flex>
              </Flex>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FormDisciplina; 