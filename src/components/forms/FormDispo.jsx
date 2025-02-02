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

const FormDispo = ({ isOpen, onClose, disponibilidade = null, onDisponibilidadeAdded }) => {
  const [formData, setFormData] = useState({
    professor: '',
    diaSemana: '',
    horario: '',
  });
  const toast = useToast();

  useEffect(() => {
    if (disponibilidade) {
      setFormData({
        professor: disponibilidade.professor,
        diaSemana: disponibilidade.diaSemana,
        horario: disponibilidade.horario,
      });
    } else {
      setFormData({ professor: '', diaSemana: '', horario: '' });
    }
  }, [disponibilidade]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.professor.trim() || !formData.diaSemana.trim() || !formData.horario.trim()) {
      toast({
        title: 'Erro',
        description: 'Todos os campos são obrigatórios.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      let response;
      if (disponibilidade) {
        response = await axios.put(`http://localhost:8080/api/disponibilidade/${disponibilidade.id}`, formData);
      } else {
        response = await axios.post('http://localhost:8080/api/disponibilidade', formData);
      }

      if (response.status === 200 || response.status === 201) {
        toast({
          title: 'Sucesso',
          description: disponibilidade ? 'Disponibilidade atualizada com sucesso.' : 'Disponibilidade cadastrada com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        if (onDisponibilidadeAdded) {
          onDisponibilidadeAdded();
        }
        onClose();
      } else {
        throw new Error('Resposta inesperada do servidor');
      }
    } catch (error) {
      console.error('Erro ao salvar disponibilidade:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar os dados da disponibilidade.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    setFormData({ professor: '', diaSemana: '', horario: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} className="form-dispo-modal">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{disponibilidade ? 'Editar Disponibilidade' : 'Cadastrar Disponibilidade'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Professor</FormLabel>
              <Input
                name="professor"
                value={formData.professor}
                onChange={handleInputChange}
                className="form-dispo-input"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Dia da Semana</FormLabel>
              <Input
                name="diaSemana"
                value={formData.diaSemana}
                onChange={handleInputChange}
                className="form-dispo-input"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Horário</FormLabel>
              <Input
                name="horario"
                value={formData.horario}
                onChange={handleInputChange}
                className="form-dispo-input"
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button className="form-dispo-button primary" mr={3} onClick={handleSubmit}>
            {disponibilidade ? 'Atualizar' : 'Salvar'}
          </Button>
          <Button className="form-dispo-button secondary" onClick={handleCancel}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FormDispo;