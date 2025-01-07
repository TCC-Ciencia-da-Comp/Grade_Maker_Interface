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
import FormDispo from '../Forms/FormDispo';

const TableDispo = () => {
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [erro, setErro] = useState(null);
  const [disponibilidadeToDelete, setDisponibilidadeToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDisponibilidade, setSelectedDisponibilidade] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  useEffect(() => {
    const fetchDisponibilidades = async () => {
      try {
        const resposta = await fetch("http://localhost:8080/api/disponibilidade");
        if (!resposta.ok) {
          throw new Error(`HTTP error! status: ${resposta.status}`);
        }
        const dadosJson = await resposta.json();
        if (Array.isArray(dadosJson)) {
          setDisponibilidades(dadosJson);
        } else if (typeof dadosJson === 'object' && dadosJson !== null) {
          const arrayDisponibilidades = Object.values(dadosJson).find(Array.isArray);
          if (arrayDisponibilidades) {
            setDisponibilidades(arrayDisponibilidades);
          } else {
            throw new Error("Não foi possível encontrar um array de disponibilidades nos dados");
          }
        } else {
          throw new Error("Formato de dados inesperado");
        }
      } catch (erro) {
        console.error("Erro ao buscar as disponibilidades:", erro);
        setErro(erro.message);
      }
    };

    fetchDisponibilidades();
  }, []);

  const handleDeleteClick = (id) => {
    setDisponibilidadeToDelete(id);
    onOpen();
  };

  const handleDelete = async () => {
    if (disponibilidadeToDelete) {
      try {
        const resposta = await fetch(`http://localhost:8080/api/disponibilidade/${disponibilidadeToDelete}`, {
          method: 'DELETE',
        });
        if (!resposta.ok) {
          throw new Error(`Erro ao deletar disponibilidade! status: ${resposta.status}`);
        }
        setDisponibilidades(disponibilidades.filter(disponibilidade => disponibilidade.id !== disponibilidadeToDelete));
        onClose();
      } catch (erro) {
        console.error("Erro ao deletar a disponibilidade:", erro);
        setErro(erro.message);
      }
    }
  };

  const handleEditClick = (disponibilidade) => {
    setSelectedDisponibilidade(disponibilidade);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedDisponibilidade(null);
  };

  const handleDisponibilidadeUpdated = () => {
    const fetchDisponibilidades = async () => {
      // ... (same as the fetchDisponibilidades function in useEffect)
    };
    fetchDisponibilidades();
  };

  return (
    <div className="page-container">
      {erro && <div className="error-message">Erro: {erro}</div>}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="table-header">ID</th>
              <th className="table-header">Professor</th>
              <th className="table-header">Dia da Semana</th>
              <th className="table-header">Horário</th>
              <th className="table-header"></th>
            </tr>
          </thead>
          <tbody>
            {disponibilidades.map((disponibilidade, index) => (
              <tr key={disponibilidade.id} className={index % 2 === 0 ? "table-row-even" : "table-row-odd"}>
                <td className="table-cell">{disponibilidade.id}</td>
                <td className="table-cell">{disponibilidade.professor}</td>
                <td className="table-cell">{disponibilidade.diaSemana}</td>
                <td className="table-cell">{disponibilidade.horario}</td>
                <td className="table-cell" style={{ textAlign: 'right' }}>
                  <Button colorScheme="blue" onClick={() => handleEditClick(disponibilidade)} mr={2}>
                    Editar
                  </Button>
                  <Button colorScheme="red" onClick={() => handleDeleteClick(disponibilidade.id)}>
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
              Deletar Disponibilidade
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

      <FormDispo
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        disponibilidade={selectedDisponibilidade}
        onDisponibilidadeAdded={handleDisponibilidadeUpdated}
      />
    </div>
  );
};

export default TableDispo;
