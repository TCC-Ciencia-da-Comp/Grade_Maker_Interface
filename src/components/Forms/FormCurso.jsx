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

const FormCurso = ({ isOpen, onClose, curso = null, onCursoAdded }) => {
  const [formData, setFormData] = useState({
    nome: '',
  });
  const toast = useToast();

  useEffect(() => {
    if (curso) {
      setFormData({ nome: curso.nome });
    } else {
      setFormData({ nome: '' });
    }
  }, [curso]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.slice(0, 50) });
  };

  const handleSubmit = async () => {
    if (!formData.nome.trim()) {
      toast({
        title: 'Erro',
        description: 'O nome do curso não pode estar vazio.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      if (curso) {
        await axios.put(`http://localhost:8080/api/curso/${curso.id}`, formData);
        toast({
          title: 'Sucesso',
          description: 'Curso atualizado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await axios.post('http://localhost:8080/api/curso', formData);
        toast({
          title: 'Sucesso',
          description: 'Curso cadastrado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      if (onCursoAdded) {
        onCursoAdded();
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar curso:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar os dados do curso.',
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
    <Modal isOpen={isOpen} onClose={handleCancel} className="form-curso-modal">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{curso ? 'Editar Curso' : 'Cadastrar Curso'}</ModalHeader>
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
                className="form-curso-input"
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button className="form-curso-button primary" mr={3} onClick={handleSubmit}>
            {curso ? 'Atualizar' : 'Salvar'}
          </Button>
          <Button className="form-curso-button secondary" onClick={handleCancel}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FormCurso;