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

const TableProf = () => {
  const [professores, setProfessores] = useState([]);
  const [erro, setErro] = useState(null);
  const [professorToDelete, setProfessorToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const resposta = await fetch("http://localhost:8080/api/professor");
        if (!resposta.ok) {
          throw new Error(`HTTP error! status: ${resposta.status}`);
        }
        const dadosJson = await resposta.json();
        if (Array.isArray(dadosJson)) {
          setProfessores(dadosJson);
        } else if (typeof dadosJson === 'object' && dadosJson !== null) {
          const arrayProfessores = Object.values(dadosJson).find(Array.isArray);
          if (arrayProfessores) {
            setProfessores(arrayProfessores);
          } else {
            throw new Error("Não foi possível encontrar um array de professores nos dados");
          }
        } else {
          throw new Error("Formato de dados inesperado");
        }
      } catch (erro) {
        console.error("Erro ao buscar os professores:", erro);
        setErro(erro.message);
      }
    };

    fetchProfessores();
  }, []);

  const handleDeleteClick = (id) => {
    setProfessorToDelete(id);
    onOpen();
  };

  const handleDelete = async () => {
    if (professorToDelete) {
      try {
        const resposta = await fetch(`http://localhost:8080/api/professor/${professorToDelete}`, {
          method: 'DELETE',
        });
        if (!resposta.ok) {
          throw new Error(`Erro ao deletar professor! status: ${resposta.status}`);
        }
        // Atualiza a lista de professores após a exclusão
        setProfessores(professores.filter(professor => professor.id !== professorToDelete));
        onClose();
      } catch (erro) {
        console.error("Erro ao deletar o professor:", erro);
        setErro(erro.message);
      }
    }
  };

  const handleEditClick = (professor) => {
    setSelectedProfessor(professor);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedProfessor(null);
  };

  const handleProfessorUpdated = () => {
    // Refresh the professor list after an update
    const fetchProfessores = async () => {
      try {
        const resposta = await fetch("http://localhost:8080/api/professor");
        if (!resposta.ok) {
          throw new Error(`HTTP error! status: ${resposta.status}`);
        }
        const dadosJson = await resposta.json();
        if (Array.isArray(dadosJson)) {
          setProfessores(dadosJson);
        } else if (typeof dadosJson === 'object' && dadosJson !== null) {
          const arrayProfessores = Object.values(dadosJson).find(Array.isArray);
          if (arrayProfessores) {
            setProfessores(arrayProfessores);
          } else {
            throw new Error("Não foi possível encontrar um array de professores nos dados");
          }
        } else {
          throw new Error("Formato de dados inesperado");
        }
      } catch (erro) {
        console.error("Erro ao buscar os professores:", erro);
        setErro(erro.message);
      }
    };
    fetchProfessores();
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
            {professores.map((professor, index) => (
              <tr key={professor.id} className={index % 2 === 0 ? "table-row-even" : "table-row-odd"}>
                <td className="table-cell">{professor.id}</td>
                <td className="table-cell">{professor.nome}</td>
                <td className="table-cell" style={{ textAlign: 'right' }}>
                  <Button colorScheme="blue" onClick={() => handleEditClick(professor)} mr={2}>
                    Editar
                  </Button>
                  <Button colorScheme="red" onClick={() => handleDeleteClick(professor.id)}>
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
              Deletar Professor
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


    </div>
  );
};

export default TableProf;
