import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import '../Forms/Form.css';

const FormDisc = ({ isOpen, onClose, disciplina = null, onDisciplinaAdded }) => {
  const [formData, setFormData] = useState({
    nome: '',
  });
  const toast = useToast();

  useEffect(() => {
    if (disciplina) {
      setFormData({ nome: disciplina.nome });
    } else {
      setFormData({ nome: '' });
    }
  }, [disciplina]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.slice(0, 50) });
  };

  const handleSubmit = async () => {
    if (!formData.nome.trim()) {
      toast({
        title: 'Erro',
        description: 'O nome da disciplina não pode estar vazio.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      let response;
      if (disciplina) {
        response = await axios.put(`http://localhost:8080/api/disciplina/${disciplina.id}`, formData);
      } else {
        response = await axios.post('http://localhost:8080/api/disciplina', formData);
      }

      if (response.status === 200 || response.status === 201) {
        toast({
          title: 'Sucesso',
          description: disciplina ? 'Disciplina atualizada com sucesso.' : 'Disciplina cadastrada com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        if (onDisciplinaAdded) {
          onDisciplinaAdded();
        }
        onClose();
      } else {
        throw new Error('Resposta inesperada do servidor');
      }
    } catch (error) {
      console.error('Erro ao salvar disciplina:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar os dados da disciplina.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    setFormData({ nome: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} className="form-disc-modal">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{disciplina ? 'Editar Disciplina' : 'Cadastrar Disciplina'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                maxLength={50}
                className="form-disc-input"
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button className="form-disc-button primary" mr={3} onClick={handleSubmit}>
            {disciplina ? 'Atualizar' : 'Salvar'}
          </Button>
          <Button className="form-disc-button secondary" onClick={handleCancel}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FormDisc;
