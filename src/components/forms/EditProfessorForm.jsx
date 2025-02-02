import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

const EditProfessorForm = () => {
  const [professor, setProfessor] = useState({ id: '', nome: '' });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.professor) {
      setProfessor(location.state.professor);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/professor/${professor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(professor),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Redirect back to the professor list after successful edit
      navigate('/professors');
    } catch (error) {
      console.error('Error updating professor:', error);
    }
  };

  const handleChange = (e) => {
    setProfessor({ ...professor, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>ID</FormLabel>
          <Input name="id" value={professor.id} isReadOnly />
        </FormControl>
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input name="nome" value={professor.nome} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="blue">Salvar</Button>
      </VStack>
    </form>
  );
};

export default EditProfessorForm;
