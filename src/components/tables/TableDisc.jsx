import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import "../tables/Table.css";
import FormDisc from '../Forms/FormDisc';
import axios from 'axios';


const TableDisc = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [erro, setErro] = useState(null);
  const [disciplinaToDelete, setDisciplinaToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDisciplina, setSelectedDisciplina] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const resposta = await fetch("http://localhost:8080/api/disciplina");
        if (!resposta.ok) {
          throw new Error(`HTTP error! status: ${resposta.status}`);
        }
        const dadosJson = await resposta.json();
        if (Array.isArray(dadosJson)) {
          setDisciplinas(dadosJson);
        } else if (typeof dadosJson === 'object' && dadosJson !== null) {
          const arrayDisciplinas = Object.values(dadosJson).find(Array.isArray);
          if (arrayDisciplinas) {
            setDisciplinas(arrayDisciplinas);
          } else {
            throw new Error("Não foi possível encontrar um array de disciplinas nos dados");
          }
        } else {
          throw new Error("Formato de dados inesperado");
        }
      } catch (erro) {
        console.error("Erro ao buscar as disciplinas:", erro);
        setErro(erro.message);
      }
    };

    fetchDisciplinas();
  }, []);

  const handleDeleteClick = (id) => {
    setDisciplinaToDelete(id);
    onOpen();
  };

  const handleDelete = async () => {
    if (disciplinaToDelete) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/disciplina/${disciplinaToDelete}`);
        if (response.status === 200) {
          setDisciplinas(disciplinas.filter(disciplina => disciplina.id !== disciplinaToDelete));
          onClose();
          toast({
            title: 'Sucesso',
            description: 'Disciplina deletada com sucesso.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } else {
          throw new Error('Resposta inesperada do servidor');
        }
      } catch (erro) {
        console.error("Erro ao deletar a disciplina:", erro);
        toast({
          title: 'Erro',
          description: 'Não foi possível deletar a disciplina.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleEditClick = (disciplina) => {
    setSelectedDisciplina(disciplina);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedDisciplina(null);
  };

  const handleDisciplinaUpdated = () => {
    const fetchDisciplinas = async () => {
      // ... (same as the fetchDisciplinas function in useEffect)
    };
    fetchDisciplinas();
  };

  return (
    <div className="page-container">
      {erro && <div className="error-message">Erro: {erro}</div>}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="table-header">ID</th>
              <th className="table-header">Nome</th>
              <th className="table-header"></th>
            </tr>
          </thead>
          <tbody>
            {disciplinas.map((disciplina, index) => (
              <tr key={disciplina.id} className={index % 2 === 0 ? "table-row-even" : "table-row-odd"}>
                <td className="table-cell">{disciplina.id}</td>
                <td className="table-cell">{disciplina.nome}</td>
                <td className="table-cell" style={{ textAlign: 'right' }}>
                  <Button colorScheme="blue" onClick={() => handleEditClick(disciplina)} mr={2}>
                    Editar
                  </Button>
                  <Button colorScheme="red" onClick={() => handleDeleteClick(disciplina.id)}>
                    Deletar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar Disciplina
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza? Esta ação não pode ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <FormDisc
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        disciplina={selectedDisciplina}
        onDisciplinaAdded={handleDisciplinaUpdated}
      />
    </div>
  );
};

export default TableDisc;
